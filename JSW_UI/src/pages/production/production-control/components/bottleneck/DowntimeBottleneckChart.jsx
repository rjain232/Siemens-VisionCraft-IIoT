import { ArrowLeft } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const BNI_OK_THRESHOLD = 1;
const OK_RGB = [52, 168, 118]; // soft-vivid emerald
const WARNING_RGB = [217, 149, 51]; // soft-vivid amber
const DANGER_RGB = [198, 66, 58]; // soft-vivid red
const NEUTRAL_SURFACE = "#FFFFFF"; // every panel/card background — pure white
const NEUTRAL_BORDER = "#E2E8F0"; // slate-200 — every panel/card border

function lerpColor(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}
function toRgba([r, g, b], alpha = 1) {
  return `rgba(${r},${g},${b},${alpha})`;
}

function safeBniValue(bni) {
  const n = Number.isFinite(bni) ? bni : 0;
  return Math.max(n, 0);
}

function getReadableTextColor([r, g, b]) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#1E293B" : "#FFFFFF"; // slate-800 or white
}

function getBniStyle(bni, maxBni, alpha = 0.9) {
  const value = safeBniValue(bni);
  let rgb = OK_RGB;
  if (value > BNI_OK_THRESHOLD) {
    const span = Math.max(maxBni - BNI_OK_THRESHOLD, 0.0001);
    const t = Math.min(Math.max((value - BNI_OK_THRESHOLD) / span, 0), 1);
    rgb = lerpColor(WARNING_RGB, DANGER_RGB, t);
  }
  return {
    fill: toRgba(rgb, alpha),
    textColor: getReadableTextColor(rgb),
  };
}
function getBniColor(bni, maxBni, alpha = 1) {
  return getBniStyle(bni, maxBni, alpha).fill;
}

function getBniSeverity(bni, maxBni) {
  const value = safeBniValue(bni);
  if (value <= BNI_OK_THRESHOLD) return "OK";
  const midpoint =
    BNI_OK_THRESHOLD + Math.max(maxBni - BNI_OK_THRESHOLD, 0.0001) / 2;
  return value <= midpoint ? "WARNING" : "CRITICAL";
}

function normalizeDateOnly(dateLike) {
  if (!dateLike) return null;
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function severityLabel(severity) {
  switch (severity) {
    case "OK":
      return "OK";
    case "WARNING":
      return "WARNING";
    case "CRITICAL":
      return "CRITICAL";
    default:
      return "—";
  }
}
function severityBadgeClass(severity) {
  switch (severity) {
    case "OK":
      return "bg-green-100 text-green-700";
    case "WARNING":
      return "bg-amber-100 text-amber-700";
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function collectAllBni(lines) {
  const values = [];
  for (const line of lines) {
    values.push(line.bni);
    for (const st of line.stations || []) {
      values.push(st.bni);
      for (const sub of st.substations || []) {
        values.push(sub.bni);
      }
    }
  }
  return values;
}

function toNode(item, sizeFloor, maxBni) {
  const { fill, textColor } = getBniStyle(item.bni, maxBni);
  const size = Number.isFinite(item.bni) ? item.bni * 10 : sizeFloor;
  return {
    name: item.id,
    bni: item.bni,
    severity: getBniSeverity(item.bni, maxBni),
    fill,
    textColor,
    size: Math.max(size, sizeFloor),
  };
}

const CustomCell = (props) => {
  const { x, y, width, height, name, bni, fill, textColor, onClick } = props;
  if (width < 6 || height < 6) return null;

  const GAP = 3;
  const rectX = x + GAP / 2;
  const rectY = y + GAP / 2;
  const rectW = Math.max(width - GAP, 0);
  const rectH = Math.max(height - GAP, 0);
  const isNarrowCell = width < 62;
  const minSide = Math.min(width, height);
  const titleFontSize = Math.max(8, Math.min(minSide / 5.5, 18));
  const subFontSize = Math.max(7, Math.min(minSide / 8, 12));
  const uid = `${name}`.replace(/[^a-zA-Z0-9]/g, "-");

  return (
    <g
      onClick={() => onClick && onClick(name, bni)}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <defs>
        <filter
          id={`shadow-${uid}`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.75"
            floodColor="#0F172A"
            floodOpacity="0.14"
          />
        </filter>
        <linearGradient id={`gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x={rectX}
        y={rectY}
        width={rectW}
        height={rectH}
        rx={10}
        ry={10}
        fill={fill}
        filter={`url(#shadow-${uid})`}
      />
      <rect
        x={rectX}
        y={rectY}
        width={rectW}
        height={rectH}
        rx={10}
        ry={10}
        fill={`url(#gloss-${uid})`}
      />

      {
        <>
          <text
            x={isNarrowCell ? x + width / 2 : x + width / 2}
            y={
              isNarrowCell ? y + height / 2 : y + height / 2 - titleFontSize / 2
            }
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize={titleFontSize}
            fontWeight="600"
            letterSpacing="0.2px"
            transform={
              isNarrowCell
                ? `rotate(-90 ${x + width / 2} ${y + height / 2})`
                : undefined
            }
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + subFontSize + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fillOpacity={0.9}
            fontSize={subFontSize}
            fontWeight="600"
            transform={
              isNarrowCell
                ? `rotate(-90 ${x + width / 2} ${y + height / 2})`
                : undefined
            }
          >
            {`BNI ${Number.isFinite(bni) ? bni : "—"}`}
          </text>
        </>
      }
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, bni, severity } = payload[0].payload;
  return (
    <div className="bg-white text-slate-900 text-xs rounded-lg px-3 py-2 shadow-xl border border-slate-200">
      <p className="font-bold font-mono">{name}</p>
      <p className="text-slate-600">
        BNI:{" "}
        <span className="text-slate-900 font-semibold">
          {Number.isFinite(bni) ? bni.toFixed(2) : "—"}
        </span>
      </p>
      <p className="mt-0.5">
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${severityBadgeClass(severity)}`}
        >
          {severityLabel(severity)}
        </span>
      </p>
    </div>
  );
};

const Legend = ({ maxBni, isLiveData }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 w-full">
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs font-medium text-slate-500">
      <div className="flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
          style={{ background: toRgba(OK_RGB) }}
        />
        <span className="tracking-tight">OK · BNI ≤ 1.0</span>
      </div>
      <div className="flex items-center gap-1.5 w-24 sm:w-36">
        <span
          className="h-2 sm:h-2.5 flex-1 rounded-full"
          style={{
            background: `linear-gradient(to right, ${toRgba(WARNING_RGB)}, ${toRgba(DANGER_RGB)})`,
          }}
        />
      </div>
      <span className="tracking-tight whitespace-nowrap">
        Bottleneck · 1.0 → {maxBni.toFixed(1)}
      </span>
    </div>

    <div
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold whitespace-nowrap ${
        isLiveData
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isLiveData ? "bg-red-500 animate-pulse" : "bg-slate-400"
        }`}
      />
      {isLiveData ? "Live data" : "Historical"}
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
// `data`: [{ id, name, bni, stations: [{ ..., substations: [...] }] }]
// `lockedLine` / `lockedStation`: same drill-locking behavior as before.
export default function DowntimeBottleneckChart({
  data,
  lockedLine = null,
  lockedStation = null,
  startDate = null,
  endDate = null,
}) {
  const treemapData = useMemo(() => data ?? [], [data]);

  const [drillLine, setDrillLine] = useState(lockedLine);
  const [drillStation, setDrillStation] = useState(lockedStation);

  useEffect(() => {
    setDrillLine(lockedLine);
    setDrillStation(lockedLine ? lockedStation : null);
  }, [lockedLine, lockedStation, treemapData]);

  const maxBni = useMemo(() => {
    const all = collectAllBni(treemapData).filter((v) => Number.isFinite(v));
    return all.length ? Math.max(BNI_OK_THRESHOLD, ...all) : BNI_OK_THRESHOLD;
  }, [treemapData]);

  const isLiveData = useMemo(() => {
    const selectedStartDate = normalizeDateOnly(startDate);
    const selectedEndDate = normalizeDateOnly(endDate);
    const today = normalizeDateOnly(new Date());

    const noRangeSelected = !selectedStartDate && !selectedEndDate;
    const bothCurrentDate =
      !!selectedStartDate &&
      !!selectedEndDate &&
      selectedStartDate.getTime() === today.getTime() &&
      selectedEndDate.getTime() === today.getTime();

    return noRangeSelected || bothCurrentDate;
  }, [startDate, endDate]);

  const topData = useMemo(
    () => treemapData.map((item) => toNode(item, 10, maxBni)),
    [treemapData, maxBni],
  );

  const drillData = useMemo(() => {
    if (!drillLine) return [];
    const line = treemapData.find((l) => l.id === drillLine);
    if (!line) return [];
    return (line.stations || []).map((st) => toNode(st, 10, maxBni));
  }, [treemapData, drillLine, maxBni]);

  const equipmentData = useMemo(() => {
    if (!drillLine || !drillStation) return [];
    const line = treemapData.find((l) => l.id === drillLine);
    const station = line?.stations?.find((s) => s.id === drillStation);
    if (!station) return [];
    return (station.substations || []).map((sub) => toNode(sub, 10, maxBni));
  }, [treemapData, drillLine, drillStation, maxBni]);

  const canGoBackToAllLines = !lockedLine;
  const canGoBackToLineView = !lockedStation;

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4">
      <div className="mb-6">
        <div className="mt-4">
          <Legend maxBni={maxBni} isLiveData={isLiveData} />
        </div>
      </div>

      {(drillLine || drillStation) && (
        <div className="flex items-center gap-2 text-sm mb-4">
          {((drillStation && canGoBackToLineView) ||
            (!drillStation && canGoBackToAllLines)) && (
            <button
              onClick={() => {
                if (drillStation) {
                  setDrillStation(null);
                  return;
                }
                setDrillLine(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft size={14} /> {drillStation ? "Line View" : "All Lines"}
            </button>
          )}
          {drillLine &&
            (canGoBackToAllLines || (drillStation && canGoBackToLineView)) && (
              <span className="text-slate-400">/</span>
            )}
          {drillLine && (
            <button
              onClick={() => {
                if (drillStation && canGoBackToLineView) setDrillStation(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 ${
                drillStation && canGoBackToLineView
                  ? "hover:bg-gray-100 transition-all"
                  : ""
              }`}
            >
              {drillLine}
            </button>
          )}
          {drillStation && (
            <>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-bold">{drillStation}</span>
            </>
          )}
        </div>
      )}

      {/*All lines Level */}
      {!drillLine && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-4">
            {topData.map((line, index) => {
              const lineObj = treemapData.find((l) => l.id === line.name);
              const stations = lineObj?.stations || [];
              const stationData = stations.map((st) => toNode(st, 10, maxBni));
              const accent = getBniColor(line.bni, maxBni, 1);
              return (
                <div
                  key={line.name}
                  onClick={() => setDrillLine(line.name)}
                  className="rounded-2xl overflow-hidden bg-white ring-1 ring-slate-200 cursor-pointer group transition-all duration-500 ease-out hover:shadow-lg hover:ring-slate-300"
                >
                  <div
                    className="h-[3px] w-full"
                    style={{ background: accent }}
                  />
                  <div className="px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white">
                    <span className="font-semibold text-lg text-slate-800 tracking-tight">
                      {line.name}
                    </span>
                    <div className="text-right">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide ${severityBadgeClass(line.severity)}`}
                      >
                        {severityLabel(line.severity)}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        BNI{" "}
                        {Number.isFinite(line.bni) ? line.bni.toFixed(2) : "—"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="h-56 sm:h-64 lg:h-72 p-2.5 sm:p-3 lg:p-3.5"
                    style={{ background: NEUTRAL_SURFACE }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <Treemap
                        data={stationData}
                        dataKey="size"
                        aspectRatio={1}
                        fill={NEUTRAL_SURFACE}
                        stroke="none"
                        content={
                          <CustomCell
                            onClick={(name) => setDrillStation(name)}
                          />
                        }
                        isAnimationActive={true}
                      >
                        <Tooltip content={<CustomTooltip />} />
                      </Treemap>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Station-level treemap: skipped entirely if a station is locked */}
      {drillLine && !drillStation && (
        <div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: NEUTRAL_SURFACE, borderColor: NEUTRAL_BORDER }}
          >
            <div
              style={{
                height: "clamp(300px, 50vh, 500px)",
                padding: 12,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={drillData}
                  dataKey="size"
                  aspectRatio={1}
                  fill={NEUTRAL_SURFACE}
                  stroke="none"
                  content={
                    <CustomCell onClick={(name) => setDrillStation(name)} />
                  }
                  isAnimationActive={true}
                >
                  <Tooltip content={<CustomTooltip />} />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Equipment/substation-level treemap */}
      {drillLine && drillStation && (
        <div className="mb-4">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: NEUTRAL_SURFACE, borderColor: NEUTRAL_BORDER }}
          >
            <div
              style={{
                height: "clamp(300px, 50vh, 480px)",
                padding: 12,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={equipmentData}
                  dataKey="size"
                  aspectRatio={1}
                  fill={NEUTRAL_SURFACE}
                  stroke="none"
                  isAnimationActive={true}
                  content={<CustomCell onClick={null} />}
                >
                  <Tooltip content={<CustomTooltip />} />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
