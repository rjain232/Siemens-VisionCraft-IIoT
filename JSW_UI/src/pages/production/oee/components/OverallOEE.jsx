import { useState, useMemo, useEffect, useCallback, useRef, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import FilterBar from "../../../../sharedComponents/FilterBar.jsx";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar.jsx";
import DataTable from "../../../../sharedComponents/DataTable.jsx";
import { masterApi, oeeApi } from "../../../../services/api.js";
import { OEEShimmer } from "../../../../sharedComponents/Shimmer.jsx";
import appConfig from "../../../../config/appConfig.js";
import {
  formatStationName,
  formatClusterName,
} from "../../../../utils/Formatters.js";
import {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState.jsx";
import { Activity } from "lucide-react";
import { generateExcel } from "../../../../utils/excelUtils.js";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext.jsx";
import { isBackgroundExportActive } from "../../../../utils/backgroundExportInterceptor.js";

function secsToMin(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r > 0 ? ` ${r}s` : ""}`.trim();
}

function formatDateYMD(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ── Excel download ─────────────────────────────────────────────────────────
async function downloadExcel(allRows) {
  const cols = [
    { label: "Sr. No.", accessor: "sr" },
    { label: "Date", accessor: "DateFormatted" },
    { label: "Shift", accessor: "Shift" },
    { label: "Line", accessor: "LineName" },
    { label: "Station", accessor: "StationName" },
    { label: "Availability (%)", accessor: "Availability" },
    { label: "Performance (%)", accessor: "Performance" },
    { label: "Quality (%)", accessor: "Quality" },
    { label: "OEE (%)", accessor: "OEE" },
    { label: "Downtime", accessor: "DowntimeFormatted" },
  ];
  generateExcel(cols, allRows, "OEE_Report");
}

function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {title && (
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

const METRIC_COLOR = {
  Availability: { hex: "#0891b2", track: "#cffafe", gradientHex: "#22d3ee" },
  Performance: { hex: "#7c3aed", track: "#ede9fe", gradientHex: "#a78bfa" },
  Quality: { hex: "#f97316", track: "#ffedd5", gradientHex: "#fb923c" },
  "Overall OEE": { hex: "#6366f1", track: "#e0e7ff", gradientHex: "#818cf8" },
};

// ─── SVG Ring Gauge ───────────────────────────────────────────────────────────
const RING_R = 66;
const RING_C = 2 * Math.PI * RING_R;

const RingGauge = memo(function RingGauge({ label, value }) {
  const { hex, track, gradientHex } =
    METRIC_COLOR[label] || METRIC_COLOR["Overall OEE"];
  const filled = (value / 100) * RING_C;
  const targetDash = RING_C - (70 / 100) * RING_C;
  const gradId = `ring-grad-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col items-center w-full px-4 pt-5 pb-4 gap-2">
      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label}
      </p>

      <div className="relative w-full max-w-[168px] aspect-square mx-auto">
        <svg viewBox="0 0 164 164" className="w-full h-full">
          <defs>
            {/* Diagonal top→right matches clockwise arc sweep from 12 o'clock */}
            <linearGradient
              id={gradId}
              x1="82"
              y1="16"
              x2="148"
              y2="82"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={gradientHex} />
              <stop offset="100%" stopColor={hex} />
            </linearGradient>
          </defs>
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke={track}
            strokeWidth="18"
          />
          {/* Progress arc */}
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${RING_C}`}
            transform="rotate(-90 82 82)"
          />
          {/* 70% target notch */}
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeDasharray={`2.5 ${RING_C - 2.5}`}
            strokeDashoffset={targetDash}
            transform="rotate(-90 82 82)"
          />
        </svg>
        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span className="text-[clamp(20px,7vw,30px)] font-extrabold text-gray-800 leading-none">
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
});

const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };
const SHIFT_GRADIENT_COLORS = { A: "#4a6cc7", B: "#6ea8f8", C: "#2dd4a0" };

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: `Shift ${s.value}` },
);

// ─── Shift-wise OEE ──────────────────────────────────────────────────────────
const SHIFT_DEFS = [
  {
    key: "A",
    label: "Shift A",
    color: SHIFT_COLORS.A,
    gradientColor: SHIFT_GRADIENT_COLORS.A,
  },
  {
    key: "B",
    label: "Shift B",
    color: SHIFT_COLORS.B,
    gradientColor: SHIFT_GRADIENT_COLORS.B,
  },
  {
    key: "C",
    label: "Shift C",
    color: SHIFT_COLORS.C,
    gradientColor: SHIFT_GRADIENT_COLORS.C,
  },
];

const ShiftWiseOEEChart = memo(function ShiftWiseOEEChart({
  shiftA,
  shiftB,
  shiftC,
  overall,
  activeShifts,
}) {
  const vals = { A: shiftA, B: shiftB, C: shiftC };
  const active = useMemo(
    () => SHIFT_DEFS.filter((s) => activeShifts.includes(s.key)),
    [activeShifts],
  );
  const series = useMemo(
    () => active.map((s) => vals[s.key]),
    [active, shiftA, shiftB, shiftC],
  );
  const colors = useMemo(() => active.map((s) => s.color), [active]);
  const gradientColors = useMemo(
    () => active.map((s) => s.gradientColor),
    [active],
  );
  const labels = useMemo(() => active.map((s) => s.label), [active]);

  const options = useMemo(
    () => ({
      chart: { type: "radialBar", toolbar: { show: false } },
      colors,
      plotOptions: {
        radialBar: {
          offsetY: 0,
          hollow: {
            size: "42%",
            background: "#ffffff",
          },
          track: {
            background: "#f1f5f9",
            strokeWidth: "100%",
            margin: 4,
          },
          dataLabels: {
            name: {
              fontSize: "13px",
              fontWeight: 700,
              color: "#374151",
              offsetY: -4,
            },
            value: {
              fontSize: "15px",
              fontWeight: 800,
              color: "#111827",
              offsetY: 4,
              formatter: (v) => `${v}%`,
            },
            total: {
              show: true,
              label: "Overall",
              color: "#374151",
              fontSize: "13px",
              fontWeight: 700,
              formatter: () => `${overall}%`,
            },
          },
        },
      },
      stroke: { lineCap: "round" },
      labels,
      legend: { show: false },
      grid: { show: false, padding: { top: -4, bottom: -4 } },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "diagonal2",
          shadeIntensity: 0.3,
          gradientToColors: gradientColors,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    }),
    [overall, labels, colors, gradientColors],
  );

  return (
    <div className="flex flex-col">
      {/* Chart */}
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={240}
      />

      {/* Custom legend footer */}
      <div className="flex flex-wrap items-center justify-center gap-4 pb-4">
        {active.map((s) => (
          <div key={s.key} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs font-bold text-gray-600">{s.label}</span>
            </div>
            <span className="text-sm font-extrabold text-gray-800">
              {vals[s.key]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── Available vs Downtime Donut ──────────────────────────────────────────────
const AvailabilityPie = memo(function AvailabilityPie({ net, breakdown }) {
  const total = net + breakdown;
  const options = useMemo(
    () => ({
      chart: { type: "donut" },
      labels: ["Net Available", "Downtime"],
      colors: ["#10b981", "#ef4444"],
      legend: {
        position: "bottom",
        fontSize: "13px",
        fontWeight: 600,
        labels: { colors: "#374151" },
        itemMargin: { horizontal: 8 },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "62%",
            labels: {
              show: true,
              name: {
                fontSize: "13px",
                fontWeight: 700,
                color: "#374151",
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "13px",
                fontWeight: 700,
                color: "#374151",
                formatter: () => secsToMin(total),
              },
              value: {
                fontSize: "16px",
                fontWeight: 800,
                color: "#111827",
                formatter: (v) => secsToMin(Number(v)),
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
      tooltip: { y: { formatter: (v) => secsToMin(v) } },
      stroke: { width: 2, colors: ["#fff"] },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "diagonal2",
          shadeIntensity: 0.3,
          gradientToColors: ["#6ee7b7", "#fca5a5"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    }),
    [total],
  );
  return (
    <ReactApexChart
      options={options}
      series={[net, breakdown]}
      type="donut"
      height={290}
    />
  );
});

// ─── OEE Radial Gauge ────────────────────────────────────────────────────────
const OEERadialGauge = memo(function OEERadialGauge({ value }) {
  const options = useMemo(
    () => ({
      chart: { type: "radialBar", toolbar: { show: false } },
      colors: ["#f59e0b"],
      plotOptions: {
        radialBar: {
          hollow: { margin: 2, size: "65%", background: "#fffbeb" },
          track: { background: "#f1f5f9", dropShadow: { enabled: false } },
          dataLabels: {
            name: {
              offsetY: -8,
              color: "#374151",
              fontSize: "13px",
              fontWeight: 700,
            },
            value: {
              color: "#111827",
              fontSize: "22px",
              show: true,
              fontWeight: 800,
              offsetY: 4,
            },
          },
        },
      },
      stroke: { lineCap: "round" },
      labels: ["Overall OEE"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "diagonal2",
          shadeIntensity: 0.3,
          gradientToColors: ["#fcd34d"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    }),
    [],
  );

  return (
    <ReactApexChart
      options={options}
      series={[value]}
      type="radialBar"
      height={230}
    />
  );
});

// ─── Station Shift Bar Chart ──────────────────────────────────────────────────
const StationShiftBarChart = memo(function StationShiftBarChart({ shiftData }) {
  const options = useMemo(
    () => ({
      chart: { type: "bar", toolbar: { show: false } },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "55%",
          borderRadius: 4,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        style: { fontSize: "13px", fontWeight: 700, colors: ["#fff"] },
      },
      xaxis: {
        categories: shiftData.map((d) => d.label),
        max: 100,
        labels: {
          formatter: (val) => `${val}%`,
          style: { fontSize: "12px", fontWeight: 600, colors: "#4b5563" },
        },
      },
      yaxis: {
        labels: {
          style: { fontSize: "13px", fontWeight: 700, colors: "#374151" },
        },
      },
      colors: shiftData.map((d) => d.color),
      fill: {
        type: "gradient",
        gradient: {
          type: "horizontal",
          shade: "light",
          shadeIntensity: 0.15,
          gradientToColors: shiftData.map((d) => d.color),
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      annotations: {
        xaxis: [
          {
            x: 70,
            borderColor: "#1f2937",
            strokeDashArray: 4,
            borderWidth: 2,
            label: {
              text: "Target 70%",
              position: "top",
              orientation: "horizontal",
              style: {
                color: "#fff",
                background: "#1f2937",
                fontSize: "12px",
                fontWeight: 700,
                padding: { left: 6, right: 6, top: 3, bottom: 3 },
              },
            },
          },
        ],
      },
      grid: {
        strokeDashArray: 4,
        borderColor: "#f1f5f9",
        padding: { left: 4, right: 10 },
      },
      tooltip: { y: { formatter: (val) => `${val}%` } },
      legend: { show: false },
    }),
    [shiftData],
  );

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "OEE %", data: shiftData.map((d) => d.value) }]}
      type="bar"
      height={230}
    />
  );
});

// ─── Metric Cell ─────────────────────────────────────────────────────────────
function MetricCell({ label, value, bg, hoverBg }) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bg;
      }}
      className="py-3 px-2 text-center transition-colors duration-150"
      style={{ backgroundColor: bg }}
    >
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-base font-bold mt-0.5 text-gray-800">{value}</p>
    </div>
  );
}

function DowntimeCell({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden group/dt py-3 px-2 text-center transition-all duration-150 hover:brightness-95"
      style={{
        background: "linear-gradient(160deg, #fff1f2 0%, #ffe4e6 100%)",
      }}
    >
      {/* Left accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-rose-400" />

      <p className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center justify-center gap-1">
        Downtime
        <svg
          className="w-3 h-3 text-rose-400 group-hover/dt:translate-x-0.5 group-hover/dt:-translate-y-0.5 transition-transform duration-150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </p>
      <p className="text-base font-bold mt-0.5 text-rose-700 tabular-nums group-hover/dt:underline underline-offset-2 decoration-rose-400">
        {value}
      </p>
    </div>
  );
}

// ─── Station Card ─────────────────────────────────────────────────────────────
const StationCard = memo(function StationCard({
  stationName,
  data,
  lineId,
  dateRange,
  activeShifts,
}) {
  const { ShiftwiseOEE, AvailableVsDowntime } = data;
  const APQ = data.APQ;
  const navigate = useNavigate();

  const overall = ShiftwiseOEE.Overall;

  const shiftData = useMemo(
    () =>
      [
        { key: "A", label: "Shift A", value: ShiftwiseOEE.ShiftA, color: SHIFT_COLORS.A },
        { key: "B", label: "Shift B", value: ShiftwiseOEE.ShiftB, color: SHIFT_COLORS.B },
        { key: "C", label: "Shift C", value: ShiftwiseOEE.ShiftC, color: SHIFT_COLORS.C },
      ].filter((s) => activeShifts.includes(s.key)),
    [ShiftwiseOEE.ShiftA, ShiftwiseOEE.ShiftB, ShiftwiseOEE.ShiftC, activeShifts],
  );

  const handleDowntimeClick = useCallback(
    () =>
      navigate("/maintenance", {
        state: {
          activeTab: "line-station-losses",
          lineId,
          stationName,
          dateRange,
        },
      }),
    [navigate, lineId, stationName, dateRange],
  );

  const apqMetrics = useMemo(
    () => [
      {
        label: "Availability",
        value: `${APQ.Availability}%`,
        bg: "#ecfeff",
        hoverBg: "#cffafe",
      },
      {
        label: "Performance",
        value: `${APQ.Performance}%`,
        bg: "#f5f3ff",
        hoverBg: "#ede9fe",
      },
      {
        label: "Quality",
        value: `${APQ.Quality}%`,
        bg: "#fff7ed",
        hoverBg: "#ffedd5",
      },
    ],
    [APQ.Availability, APQ.Performance, APQ.Quality],
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-base font-bold text-center text-gray-900">
          {formatStationName(stationName)}
        </h2>
      </div>

      {/* OEE Gauge + Shift Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        <OEERadialGauge value={overall} />
        <StationShiftBarChart shiftData={shiftData} />
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 border-t border-gray-100 text-center">
        {apqMetrics.map(({ label, value, bg, hoverBg }) => (
          <MetricCell
            key={label}
            label={label}
            value={value}
            bg={bg}
            hoverBg={hoverBg}
          />
        ))}
        <DowntimeCell
          value={secsToMin(AvailableVsDowntime.Breakdown)}
          onClick={handleDowntimeClick}
        />
      </div>
    </div>
  );
});

// ─── Loading ──────────────────────────────────────────────────────────────────
function LoadingState() {
  return <OEEShimmer />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OverallOEE({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const chartsRef = useRef(null);
  const stationsRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const location = useLocation();
  const navState = location.state ?? {};
  const incomingLineId = navState.lineId ? String(navState.lineId) : null;

  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [filters, setFilters] = useState({
    area: targetFilters?.area && targetFilters.area !== "All" ? String(targetFilters.area) : "",
    line: targetFilters?.line && targetFilters.line !== "All" ? String(targetFilters.line) : "",
    station: targetFilters?.station && targetFilters.station !== "All" ? String(targetFilters.station) : "",
    shifts: targetFilters?.shifts || (isBg ? ["All"] : navState.lineId ? ["All"] : ["A"]),
  });

  const today = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState(
    targetDateRange ?? navState.dateRange ?? { start: today, end: today },
  );

  useEffect(() => {
    if (targetDateRange?.start && targetDateRange?.end) {
      setDateRange(targetDateRange);
      setHasSearched(true);
    }
  }, [targetDateRange?.start, targetDateRange?.end]);

  const [masterClusters, setMasterClusters] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [oeeData, setOeeData] = useState(null);
  const [oeeLoading, setOeeLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(isBg || Boolean(navState.autoSearch));
  useEffect(() => {
    const loadMaster = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        if (targetFilters?.line && targetFilters.line !== "All") {
          const matchedCluster = clusters.find(
            (c) =>
              (targetFilters.area && targetFilters.area !== "All" && String(c.ClusterId) === String(targetFilters.area)) ||
              (c.Lines ?? []).some((l) => String(l.LineId) === String(targetFilters.line)),
          );
          const matchedLine = matchedCluster?.Lines?.find(
            (l) => String(l.LineId) === String(targetFilters.line),
          );
          const matchedStation =
            targetFilters.station && targetFilters.station !== "All"
              ? String(targetFilters.station)
              : matchedLine?.Stations?.[0]
                ? String(matchedLine.Stations[0].StationId)
                : "";

          setFilters({
            area: matchedCluster
              ? String(matchedCluster.ClusterId)
              : targetFilters.area && targetFilters.area !== "All"
                ? String(targetFilters.area)
                : "",
            line: String(targetFilters.line),
            station: matchedStation,
            shifts: targetFilters.shifts || ["All"],
          });
          setHasSearched(true);
        } else if (incomingLineId) {
          let matchedCluster = null;
          let matchedLine = null;
          for (const cluster of clusters) {
            const line = (cluster.Lines ?? []).find(
              (l) => String(l.LineId) === incomingLineId,
            );
            if (line) {
              matchedCluster = cluster;
              matchedLine = line;
              break;
            }
          }
          if (matchedCluster && matchedLine) {
            const firstStation = (matchedLine.Stations ?? [])[0];
            setFilters((prev) => ({
              ...prev,
              area: String(matchedCluster.ClusterId),
              line: incomingLineId,
              station: firstStation ? String(firstStation.StationId) : "",
            }));
            setHasSearched(true);
          } else {
            const firstCluster = clusters.find(c => (c.Lines || []).length > 0) || clusters[0];
            if (firstCluster) {
              const firstLine = (firstCluster.Lines ?? [])[0];
              const firstStation = (firstLine?.Stations ?? [])[0];
              setFilters((prev) => ({
                ...prev,
                area: String(firstCluster.ClusterId),
                line: firstLine ? String(firstLine.LineId) : "",
                station: firstStation ? String(firstStation.StationId) : "",
              }));
              if (isBg) setHasSearched(true);
            }
          }
        } else {
          const targetCluster = (targetFilters?.area && targetFilters.area !== "All")
            ? clusters.find(c => String(c.ClusterId) === String(targetFilters.area))
            : clusters.find(c => (c.Lines || []).length > 0) || clusters[0];
          if (targetCluster) {
            const firstLine = (targetCluster.Lines ?? [])[0];
            const firstStation = (firstLine?.Stations ?? [])[0];
            setFilters((prev) => ({
              ...prev,
              area: String(targetCluster.ClusterId),
              line: firstLine ? String(firstLine.LineId) : "",
              station: firstStation ? String(firstStation.StationId) : "",
              shifts: targetFilters?.shifts || ["All"],
            }));
            if (isBg) setHasSearched(true);
          }
        }
      } catch (err) {
        console.error("Master data fetch failed:", err);
      } finally {
        setMasterLoading(false);
      }
    };
    loadMaster();
  }, []);

  // ── Auto-fetch OEE data on filter / date change (300ms debounce) ──
  useEffect(() => {
    if (masterLoading || !filters.line || !hasSearched) return;
    let cancelled = false;

    const doFetch = async () => {
      setOeeLoading(true);
      try {
        const activeShiftKeys = Object.entries(filters.shifts)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(",");
        const res = await oeeApi.report({
          lineId: filters.line || null,
          stationId: filters.station || null,
          startDate: dateRange.start,
          endDate: dateRange.end,
          shifts: filters.shifts.includes("All") ? null : filters.shifts.join(","),
        });
        if (!cancelled) setOeeData(res);
      } catch (err) {
        console.error("OEE fetch failed:", err);
        if (!cancelled) setOeeData(null);
      } finally {
        if (!cancelled) setOeeLoading(false);
      }
    };

    const timer = setTimeout(doFetch, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters, dateRange, masterLoading, hasSearched]);

  // ── Dropdown options ──
  const areaOptions = useMemo(
    () =>
      masterClusters.map((c) => ({
        value: String(c.ClusterId),
        label: formatClusterName(c.ClusterName),
      })),
    [masterClusters],
  );

  const lineOptions = useMemo(() => {
    const cluster = masterClusters.find(
      (c) => String(c.ClusterId) === filters.area,
    );
    return (cluster?.Lines ?? []).map((l) => ({
      value: String(l.LineId),
      label: l.LineName,
    }));
  }, [filters.area, masterClusters]);

  const stationOptions = useMemo(() => {
    for (const cluster of masterClusters) {
      const line = (cluster.Lines ?? []).find(
        (l) => String(l.LineId) === filters.line,
      );
      if (line)
        return (line.Stations ?? []).map((s) => ({
          value: String(s.StationId),
          label: s.StationName,
        }));
    }
    return [];
  }, [filters.line, masterClusters]);

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "station",
        label: "Station",
        options: stationOptions,
      },
      { type: "divider" },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions, stationOptions],
  );

  const handleFilterChange = useCallback(
    (next) => {
      if (next.area !== filters.area) {
        const cluster = masterClusters.find(
          (c) => String(c.ClusterId) === next.area,
        );
        const firstLine = (cluster?.Lines ?? [])[0];
        const firstSt = (firstLine?.Stations ?? [])[0];
        next.line = firstLine ? String(firstLine.LineId) : "";
        next.station = firstSt ? String(firstSt.StationId) : "";
      } else if (next.line !== filters.line) {
        for (const cluster of masterClusters) {
          const line = (cluster.Lines ?? []).find(
            (l) => String(l.LineId) === next.line,
          );
          if (line) {
            next.station = String((line.Stations ?? [])[0]?.StationId ?? "");
            break;
          }
        }
      }

      const prevShifts = filters.shifts;
      const nextShifts = next.shifts ?? prevShifts;
      if (nextShifts.includes("All") && !prevShifts.includes("All")) {
        next.shifts = ["All"];
      } else if (!nextShifts.includes("All") && prevShifts.includes("All")) {
        next.shifts = nextShifts.filter((s) => s !== "All");
        if (next.shifts.length === 0) next.shifts = ["All"];
      } else if (
        !nextShifts.includes("All") &&
        INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
      ) {
        next.shifts = ["All"];
      } else if (nextShifts.includes("All") && nextShifts.length > 1) {
        next.shifts = nextShifts.filter((s) => s !== "All");
      }

      setFilters(next);
    },
    [filters.area, filters.line, filters.shifts, masterClusters],
  );

  const activeData = useMemo(() => {
    if (!oeeData) return null;
    const rows = oeeData.summary?.shiftWise ?? [];
    const avg = (key) =>
      rows.length
        ? +(rows.reduce((s, r) => s + (r[key] || 0), 0) / rows.length).toFixed(
          1,
        )
        : 0;
    const sum = (key) => rows.reduce((s, r) => s + (r[key] || 0), 0);
    const byShift = Object.fromEntries(rows.map((r) => [r.Shift, r]));
    return {
      ShiftwiseOEE: {
        ShiftA: byShift.A?.OEE ?? 0,
        ShiftB: byShift.B?.OEE ?? 0,
        ShiftC: byShift.C?.OEE ?? 0,
        Overall: avg("OEE"),
      },
      APQ: {
        Availability: avg("Availability"),
        Performance: avg("Performance"),
        Quality: avg("Quality"),
      },
      AvailableVsDowntime: {
        NetAvailableTime: sum("NetAvailableTime"),
        Breakdown: sum("Breakdown"),
      },
    };
  }, [oeeData]);

  const activeShifts = useMemo(
    () => (filters.shifts.includes("All") ? INDIVIDUAL_SHIFTS : filters.shifts),
    [filters.shifts],
  );

  const { shiftA, shiftB, shiftC } = useMemo(
    () => ({
      shiftA:
        activeData && activeShifts.includes("A")
          ? activeData.ShiftwiseOEE.ShiftA
          : 0,
      shiftB:
        activeData && activeShifts.includes("B")
          ? activeData.ShiftwiseOEE.ShiftB
          : 0,
      shiftC:
        activeData && activeShifts.includes("C")
          ? activeData.ShiftwiseOEE.ShiftC
          : 0,
    }),
    [activeData, activeShifts],
  );

  const stationEntries = useMemo(() => {
    if (!oeeData) return [];
    return (oeeData.subStations ?? []).map((ss) => {
      const rows = ss.shiftWise ?? [];
      const avg = (key) =>
        rows.length
          ? +(
            rows.reduce((s, r) => s + (r[key] || 0), 0) / rows.length
          ).toFixed(1)
          : 0;
      const sum = (key) => rows.reduce((s, r) => s + (r[key] || 0), 0);
      const byShift = Object.fromEntries(rows.map((r) => [r.Shift, r]));
      return {
        name: ss.SubStationName,
        ShiftwiseOEE: {
          ShiftA: byShift.A?.OEE ?? 0,
          ShiftB: byShift.B?.OEE ?? 0,
          ShiftC: byShift.C?.OEE ?? 0,
          Overall: avg("OEE"),
        },
        APQ: {
          Availability: avg("Availability"),
          Performance: avg("Performance"),
          Quality: avg("Quality"),
        },
        AvailableVsDowntime: {
          NetAvailableTime: sum("NetAvailableTime"),
          Breakdown: sum("Breakdown"),
        },
      };
    });
  }, [oeeData]);

  // ── Does the current OEE response actually contain any data? ──
  const hasOeeData = useMemo(() => {
    if (!oeeData) return false;
    const shiftRows = oeeData.summary?.shiftWise ?? [];
    const subStations = oeeData.subStations ?? [];
    const table = oeeData.tableData ?? [];
    return shiftRows.length > 0 || subStations.length > 0 || table.length > 0;
  }, [oeeData]);

  // ── Table ──
  const tableData = oeeData?.tableData ?? [];

  const tableColumns = useMemo(
    () => [
      { key: "sr", label: "Sr. No." },
      {
        key: "Date",
        label: "Date",
        sortable: true,
        render: (row) => formatDateYMD(row.Date),
        pdfValue: (row) => formatDateYMD(row.Date),
      },
      { key: "Shift", label: "Shift", sortable: true, type: "shift" },
      { key: "LineName", label: "Line", sortable: true },
      { key: "StationName", label: "Station", sortable: true },
      {
        key: "Availability",
        label: "Availability",
        sortable: true,
        render: (row) => `${row.Availability}%`,
        pdfValue: (row) => `${row.Availability}%`,
      },
      {
        key: "Performance",
        label: "Performance",
        sortable: true,
        render: (row) => `${row.Performance}%`,
        pdfValue: (row) => `${row.Performance}%`,
      },
      {
        key: "Quality",
        label: "Quality",
        sortable: true,
        render: (row) => `${row.Quality}%`,
        pdfValue: (row) => `${row.Quality}%`,
      },
      {
        key: "OEE",
        label: "OEE",
        sortable: true,
        render: (row) => `${row.OEE}%`,
        pdfValue: (row) => `${row.OEE}%`,
      },
      {
        key: "Breakdown",
        label: "Downtime",
        sortable: true,
        render: (row) => secsToMin(row.Breakdown ?? 0),
        pdfValue: (row) => secsToMin(row.Breakdown ?? 0),
      },
    ],
    [],
  );

  const lineLabel =
    lineOptions.find((o) => o.value === filters.line)?.label ?? "";

  const handleDateSearch = useCallback((start, end) => {
    setHasSearched(true);
    setDateRange({ start, end });
  }, []);

  const selectedStationLabel = useMemo(() => {
    for (const cluster of masterClusters) {
      const line = (cluster.Lines ?? []).find(
        (l) => String(l.LineId) === filters.line,
      );
      if (line) {
        const st = (line.Stations ?? []).find(
          (s) => String(s.StationId) === filters.station,
        );
        return st?.StationName ?? null;
      }
    }
    return null;
  }, [filters.line, filters.station, masterClusters]);

  // ── SVG → PNG capture helper ──
  const captureChartImages = async (containerEl) => {
    const apexEls = containerEl?.querySelectorAll("[id^='apexcharts']") ?? [];
    const images = [];
    for (const apexEl of apexEls) {
      try {
        const svg =
          apexEl.querySelector("svg.apexcharts-svg") ??
          apexEl.querySelector("svg");
        if (!svg) continue;
        const rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;

        const clone = svg.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        clone.setAttribute("width", rect.width);
        clone.setAttribute("height", rect.height);

        const bg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        bg.setAttribute("width", "100%");
        bg.setAttribute("height", "100%");
        bg.setAttribute("fill", "#ffffff");
        clone.insertBefore(bg, clone.firstChild);
        clone.querySelectorAll("image").forEach((el) => el.remove());

        const svgStr = new XMLSerializer().serializeToString(clone);
        const b64 = btoa(unescape(encodeURIComponent(svgStr)));
        const dataUrl = `data:image/svg+xml;base64,${b64}`;

        const imgData = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const cvs = document.createElement("canvas");
            cvs.width = Math.round(rect.width * 2);
            cvs.height = Math.round(rect.height * 2);
            cvs.width = Math.round(rect.width * 1.5);
            cvs.height = Math.round(rect.height * 1.5);
            const ctx = cvs.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            try {
              resolve(cvs.toDataURL("image/png"));
              resolve(cvs.toDataURL("image/jpeg", 0.88));
            } catch (e) {
              reject(e);
            }
          };
          img.onerror = reject;
          img.src = dataUrl;
        });
        images.push({ imgData, w: rect.width, h: rect.height });
      } catch (e) {
        console.warn("[PDF] SVG capture failed:", apexEl.id, e);
      }
    }
    return images;
  };
  const noLinesAvailable =
    !masterLoading && !!filters.area && lineOptions.length === 0;

  // ── PDF + Excel Download handler ──
  const handleDownload = useCallback(async () => {
    if (downloading || oeeLoading || !oeeData) return;
    setDownloading(true);
    try {
      // ── Excel ──
      const excelRows = tableData.map((row, i) => ({
        ...row,
        sr: i + 1,
        DateFormatted: formatDateYMD(row.Date),
        DowntimeFormatted: secsToMin(row.Breakdown ?? 0),
      }));
      await downloadExcel(excelRows);

      // ── PDF ──
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        buildAutoTableConfig,
      } = await import("../../../../utils/PdfUtils");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const FONT = await loadKarlaFont(doc);
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const HEADER_H = 40;
      const MARGIN = 14;
      const GAP = 4;

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      // Build filter info sub-lines
      const areaLabel =
        areaOptions.find((o) => o.value === filters.area)?.label ?? "";
      const activeShiftLabel =
        activeShifts.length === 3
          ? "All Shifts"
          : activeShifts.map((s) => `Shift ${s}`).join(", ");
      const subLines = [
        `Date Range: ${formatDateYMD(dateRange.start)}  to  ${formatDateYMD(dateRange.end)}`,
        `Area: ${areaLabel}   |   Line: ${lineLabel}   |   Station: ${selectedStationLabel ?? "All"}   |   Shifts: ${activeShiftLabel}`,
      ];
      const subH = subLines.length * 5.5 + 10;

      const topChartImages = await captureChartImages(chartsRef.current);
      const shiftwiseChart = topChartImages[0] ?? null;
      const availChart = topChartImages[1] ?? null;

      // Helper: draw titled chart image, returns bottom Y
      const drawChart = (title, chart, x, y, maxW, maxH) => {
        doc.setFont(FONT, "bold");
        doc.setFontSize(10);
        doc.setTextColor(22, 70, 161);
        doc.text(title, x, y + 4);
        y += 7;
        if (!chart) return y;
        const aspect = chart.w / chart.h;
        let imgW = maxW;
        let imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = x + (maxW - imgW) / 2;
        doc.addImage(chart.imgData, "PNG", cx, y, imgW, imgH);
        doc.addImage(chart.imgData, "JPEG", cx, y, imgW, imgH, undefined, "FAST");
        return y + imgH;
      };

      // Helper: draw a ring gauge directly as vector in PDF
      const drawPdfRing = (cx, cy, radius, value, label, hex, track) => {
        const TWO_PI = 2 * Math.PI;
        // Track circle
        doc.setDrawColor(...track);
        doc.setLineWidth(radius * 0.27);
        doc.circle(cx, cy, radius, "S");
        // Progress arc
        if (value > 0) {
          const startAngle = -Math.PI / 2;
          const endAngle = startAngle + (value / 100) * TWO_PI;
          doc.setDrawColor(...hex);
          doc.setLineWidth(radius * 0.18);
          // Draw arc as small line segments
          const steps = Math.max(36, Math.round(value * 0.72));
          const angleStep = (endAngle - startAngle) / steps;
          for (let i = 0; i < steps; i++) {
            const a1 = startAngle + angleStep * i;
            const a2 = startAngle + angleStep * (i + 1);
            const x1 = cx + radius * Math.cos(a1);
            const y1 = cy + radius * Math.sin(a1);
            const x2 = cx + radius * Math.cos(a2);
            const y2 = cy + radius * Math.sin(a2);
            doc.line(x1, y1, x2, y2);
          }
        }
        // Value text
        doc.setFont(FONT, "bold");
        doc.setFontSize(radius * 0.7);
        doc.setTextColor(31, 41, 55);
        doc.text(`${value}%`, cx, cy + radius * 0.15, { align: "center" });
        // Label
        doc.setFontSize(radius * 0.35);
        doc.setTextColor(55, 65, 81);
        doc.text(label.toUpperCase(), cx, cy - radius - radius * 0.35, {
          align: "center",
        });
      };

      // ── Page 1: Shift-wise OEE + APQ Average + Available vs Downtime ──
      const FOOTER = 18;
      const contentW = pageW - MARGIN * 2;
      const CARD_TITLE_H = 12;
      const LEGEND_H = 14;
      const ringRadius = 18;
      const ringStroke = 3;
      const RING_PAD = 4;
      const RING_LABEL_H = 6;
      const cardH =
        CARD_TITLE_H +
        RING_LABEL_H +
        (ringRadius + ringStroke) * 2 +
        RING_PAD * 2 +
        LEGEND_H;

      // Column widths: 25% | 50% | 25%
      const col1W = contentW * 0.25;
      const col2W = contentW * 0.5;
      const col3W = contentW * 0.25;
      const col1X = MARGIN;
      const col2X = MARGIN + col1W;
      const col3X = MARGIN + col1W + col2W;

      const apqCardW = col2W - GAP;
      const ringColW = apqCardW / 3;
      const cardContentH =
        RING_LABEL_H + (ringRadius + ringStroke) * 2 + RING_PAD * 2;

      const p1Top = HEADER_H + subH;
      const p1Available = pageH - p1Top - FOOTER;
      const cardY = p1Top + (p1Available - cardH) / 2;

      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.roundedRect(col1X, cardY, col1W - GAP, cardH, 2, 2, "S");
      doc.roundedRect(col2X, cardY, apqCardW, cardH, 2, 2, "S");
      doc.roundedRect(col3X, cardY, col3W, cardH, 2, 2, "S");

      // ── Column 1: Shift-wise OEE ──
      // Card title
      doc.setFont(FONT, "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("Shift-wise OEE", col1X + 4, cardY + 7);
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.2);
      doc.line(
        col1X,
        cardY + CARD_TITLE_H,
        col1X + col1W - GAP,
        cardY + CARD_TITLE_H,
      );
      // Chart image — bottom-aligned so it sits right above the legend
      if (shiftwiseChart) {
        const pad = 4;
        const maxW = col1W - GAP - pad * 2;
        const maxH = cardContentH;
        const aspect = shiftwiseChart.w / shiftwiseChart.h;
        let imgW = maxW,
          imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = col1X + (col1W - GAP - imgW) / 2;
        const cy = cardY + CARD_TITLE_H + cardContentH - imgH;
        doc.addImage(shiftwiseChart.imgData, "PNG", cx, cy, imgW, imgH);
      }
      // Shift-wise OEE legend
      const shiftLegendItems = [
        { label: "Shift A", value: `${shiftA}%`, color: [14, 165, 233] },
        { label: "Shift B", value: `${shiftB}%`, color: [16, 185, 129] },
        { label: "Shift C", value: `${shiftC}%`, color: [245, 158, 11] },
      ].filter((_, i) => activeShifts.includes(["A", "B", "C"][i]));
      const legendY1 = cardY + cardH - LEGEND_H + 2;
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(col1X + 2, legendY1 - 1, col1X + col1W - GAP - 2, legendY1 - 1);
      const slotW1 = (col1W - GAP) / shiftLegendItems.length;
      shiftLegendItems.forEach((item, i) => {
        const cx = col1X + slotW1 * i + slotW1 / 2;
        // Dot
        doc.setFillColor(...item.color);
        doc.circle(cx - 8, legendY1 + 3, 1.2, "F");
        // Label
        doc.setFont(FONT, "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(75, 85, 99);
        doc.text(item.label, cx - 5.5, legendY1 + 4);
        // Value
        doc.setFontSize(7.5);
        doc.setTextColor(31, 41, 55);
        doc.text(item.value, cx, legendY1 + 10, { align: "center" });
      });

      // ── Column 2: APQ Average ──
      const apqCardX = col2X;
      // Header
      doc.setFont(FONT, "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("APQ Average", apqCardX + 4, cardY + 7);

      // Overall OEE badge (top-right)
      const badgeW = 34;
      const badgeH = 10;
      const badgeX = apqCardX + apqCardW - badgeW - 4;
      const badgeY2 = cardY + 1;
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(186, 230, 253);
      doc.setLineWidth(0.3);
      doc.roundedRect(badgeX, badgeY2, badgeW, badgeH, 2, 2, "FD");
      doc.setFont(FONT, "bold");
      doc.setFontSize(6);
      doc.setTextColor(2, 132, 199);
      doc.text("OVERALL OEE", badgeX + badgeW / 2, badgeY2 + 3.5, {
        align: "center",
      });
      doc.setFontSize(10);
      doc.setTextColor(12, 74, 110);
      doc.text(
        `${activeData?.ShiftwiseOEE.Overall ?? 0}%`,
        badgeX + badgeW / 2,
        badgeY2 + 8.5,
        { align: "center" },
      );

      // Header divider
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.2);
      doc.line(
        apqCardX,
        cardY + CARD_TITLE_H,
        apqCardX + apqCardW,
        cardY + CARD_TITLE_H,
      );

      const apqMetrics = [
        {
          label: "Availability",
          value: activeData?.APQ?.Availability ?? 0,
          hex: [8, 145, 178],
          track: [207, 250, 254],
        },
        {
          label: "Performance",
          value: activeData?.APQ?.Performance ?? 0,
          hex: [124, 58, 237],
          track: [237, 233, 254],
        },
        {
          label: "Quality",
          value: activeData?.APQ?.Quality ?? 0,
          hex: [249, 115, 22],
          track: [255, 237, 213],
        },
      ];
      const ringContentTop = cardY + CARD_TITLE_H;
      apqMetrics.forEach((m, i) => {
        const cx = apqCardX + ringColW * i + ringColW / 2;
        const cy =
          ringContentTop + RING_PAD + RING_LABEL_H + ringRadius + ringStroke;
        drawPdfRing(cx, cy, ringRadius, m.value, m.label, m.hex, m.track);
      });

      // ── Column 3: Available vs Downtime ──
      doc.setFont(FONT, "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("Available vs Downtime", col3X + 4, cardY + 7);
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.2);
      doc.line(
        col3X,
        cardY + CARD_TITLE_H,
        col3X + col3W,
        cardY + CARD_TITLE_H,
      );
      if (availChart) {
        const pad = 4;
        const maxW = col3W - pad * 2;
        const maxH = cardContentH;
        const aspect = availChart.w / availChart.h;
        let imgW = maxW,
          imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = col3X + (col3W - imgW) / 2;
        const cy = cardY + CARD_TITLE_H + cardContentH - imgH;
        doc.addImage(availChart.imgData, "PNG", cx, cy, imgW, imgH);
      }
      // Available vs Downtime legend
      const legendY3 = cardY + cardH - LEGEND_H + 2;
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(col3X + 2, legendY3 - 1, col3X + col3W - 2, legendY3 - 1);
      const availLegend = [
        { label: "Net Available", color: [16, 185, 129] },
        { label: "Downtime", color: [239, 68, 68] },
      ];
      const slotW3 = col3W / 2;
      availLegend.forEach((item, i) => {
        const cx = col3X + slotW3 * i + slotW3 / 2;
        // Dot
        doc.setFillColor(...item.color);
        doc.circle(cx - 8, legendY3 + 4.5, 1.5, "F");
        // Label
        doc.setFont(FONT, "bold");
        doc.setFontSize(7);
        doc.setTextColor(55, 65, 81);
        doc.text(item.label, cx - 5.5, legendY3 + 5.5);
      });

      if (stationEntries.length > 0) {
        const stationChartImages = await captureChartImages(
          stationsRef.current,
        );

        const COLS = 2;
        const TITLE_BAND = 12;
        const CARD_GAP = 5;
        const METRIC_H = 10;
        const CARD_HDR_H = 9;
        const usableH = pageH - HEADER_H - 6 - FOOTER;
        const usableHFirst = usableH - TITLE_BAND;
        const cardW = (contentW - CARD_GAP * (COLS - 1)) / COLS;
        const totalCards = stationEntries.length;
        const totalRows = Math.ceil(totalCards / COLS);
        const calcCardH = (rows, avail) =>
          (avail - CARD_GAP * (rows - 1)) / rows;
        const rowsPerPage = Math.min(
          totalRows,
          Math.max(1, Math.floor((usableHFirst + CARD_GAP) / (50 + CARD_GAP))),
        );
        const cardH = Math.min(calcCardH(rowsPerPage, usableHFirst), 90);

        let curY;
        let isFirstStPage = true;

        const startNewStationPage = () => {
          doc.addPage();
          curY = HEADER_H + 6;
          if (isFirstStPage) {
            doc.setFont(FONT, "bold");
            doc.setFontSize(12);
            doc.setTextColor(22, 70, 161);
            doc.text("Sub-Station wise OEE", MARGIN, curY + 4);
            if (selectedStationLabel ?? lineLabel) {
              doc.setFontSize(9);
              doc.setTextColor(3, 105, 161);
              doc.text(
                selectedStationLabel ?? lineLabel,
                pageW - MARGIN,
                curY + 4,
                { align: "right" },
              );
            }
            curY += TITLE_BAND;
            isFirstStPage = false;
          }
        };

        startNewStationPage();

        stationEntries.forEach((stData, idx) => {
          const col = idx % COLS;
          if (idx > 0 && col === 0) curY += cardH + CARD_GAP;
          if (curY + cardH > pageH - FOOTER) {
            startNewStationPage();
          }

          const x = MARGIN + col * (cardW + CARD_GAP);
          const chartAreaH = cardH - CARD_HDR_H - METRIC_H - 2;

          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(229, 231, 235);
          doc.setLineWidth(0.3);
          doc.roundedRect(x, curY, cardW, cardH, 2, 2, "FD");
          doc.setFillColor(249, 250, 251);
          doc.roundedRect(x, curY, cardW, CARD_HDR_H, 2, 2, "F");
          doc.setDrawColor(229, 231, 235);
          doc.line(x, curY + CARD_HDR_H, x + cardW, curY + CARD_HDR_H);
          doc.setFont(FONT, "bold");
          doc.setFontSize(9);
          doc.setTextColor(17, 24, 39);
          doc.text(
            formatStationName(stData.name),
            x + cardW / 2,
            curY + CARD_HDR_H * 0.65,
            { align: "center" },
          );
          const stChartIdx = idx * 2;
          const gaugeChart = stationChartImages[stChartIdx] ?? null;
          const barChart = stationChartImages[stChartIdx + 1] ?? null;
          const chartY = curY + CARD_HDR_H + 1;
          const halfCardW = cardW / 2;

          [gaugeChart, barChart].forEach((chart, ci) => {
            if (!chart) return;
            const aspect = chart.w / chart.h;
            let imgH = chartAreaH;
            let imgW = imgH * aspect;
            if (imgW > halfCardW - 4) {
              imgW = halfCardW - 4;
              imgH = imgW / aspect;
            }
            const cx = x + halfCardW * ci + (halfCardW - imgW) / 2;
            const cy = chartY + (chartAreaH - imgH) / 2;
            doc.addImage(chart.imgData, "PNG", cx, cy, imgW, imgH);
          });

          const metY = curY + cardH - METRIC_H;
          const metW = cardW / 4;
          const metrics = [
            {
              label: "Availability",
              value: `${stData.APQ.Availability}%`,
              fill: [236, 254, 255],
            },
            {
              label: "Performance",
              value: `${stData.APQ.Performance}%`,
              fill: [245, 243, 255],
            },
            {
              label: "Quality",
              value: `${stData.APQ.Quality}%`,
              fill: [255, 247, 237],
            },
            {
              label: "Downtime",
              value: secsToMin(stData.AvailableVsDowntime.Breakdown),
              fill: [255, 241, 242],
            },
          ];
          metrics.forEach((m, mi) => {
            const mx = x + metW * mi;
            doc.setFillColor(...m.fill);
            doc.rect(mx, metY, metW, METRIC_H, "F");
            doc.setFont(FONT, "bold");
            doc.setFontSize(6);
            doc.setTextColor(75, 85, 99);
            doc.text(m.label.toUpperCase(), mx + metW / 2, metY + 3.5, {
              align: "center",
            });
            doc.setFontSize(8);
            doc.setTextColor(31, 41, 55);
            doc.text(m.value, mx + metW / 2, metY + 8, { align: "center" });
          });
        });
      }
      if (tableData.length > 0) {
        doc.addPage();

        const tblConfig = buildAutoTableConfig(
          tableColumns,
          tableData,
          doc,
          FONT,
        );
        autoTable(doc, {
          ...tblConfig,
          startY: HEADER_H + 8,
          margin: {
            left: MARGIN,
            right: MARGIN,
            top: HEADER_H + 8,
            bottom: 22,
          },
        });
      }
      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: total,
          fontFamily: FONT,
          title: "Overall OEE Report",
          subLines: i === 1 ? subLines : [],
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`OEE_Report_${dateRange.start ?? "report"}.pdf`);

      if ((isBg || isBackgroundExportActive()) && tableData.length > 0) {
        try {
          await downloadExcel(tableData);
        } catch (excelErr) {
          console.warn("[OverallOEE] Excel export failed:", excelErr);
        }
      }
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [
    oeeLoading,
    oeeData,
    areaOptions,
    filters,
    activeShifts,
    dateRange,
    lineLabel,
    selectedStationLabel,
    activeData,
    stationEntries,
    tableData,
    tableColumns,
    shiftA,
    shiftB,
    shiftC,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || oeeLoading || !oeeData || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, 1200);
    // Removed clearTimeout to prevent race condition canceling export
  }, [isBg, oeeLoading, oeeData]);

  if (masterLoading) return <LoadingState />;

  return (
    <div className="space-y-4 py-2">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        showDownload={true}
        reportName="Overall_OEE"
        onDownload={handleDownload}
        isDownloading={downloading}
        onSearch={handleDateSearch}
        selectedStartDate={dateRange.start}
        selectedEndDate={dateRange.end}
      />
      {noLinesAvailable ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
            <Activity size={22} className="text-sky-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            No line or station available for the selected area
          </p>
        </div>
      ) : !hasSearched ? (
        <SearchPromptState pageName="OEE" />
      ) : oeeLoading && !oeeData ? (
        <OEEShimmer />
      ) : !hasOeeData ? (
        <NoDataState />
      ) : (
        <div
          className={`space-y-6 transition-opacity duration-200 ${oeeLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <div
            ref={chartsRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4"
          >
            <div className="lg:col-span-3">
              <Card title="Shift-wise OEE" className="h-full">
                <div className="px-2 pb-2">
                  <ShiftWiseOEEChart
                    shiftA={shiftA}
                    shiftB={shiftB}
                    shiftC={shiftC}
                    overall={activeData?.ShiftwiseOEE.Overall ?? 0}
                    activeShifts={activeShifts}
                  />
                </div>
              </Card>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 shrink-0 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-gray-700">
                    APQ Average
                  </h2>
                  <div className="flex flex-col items-center bg-sky-50 border border-sky-100 rounded-lg px-4 py-1.5">
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                      Overall OEE
                    </span>
                    <span className="text-xl font-extrabold text-sky-900 leading-tight">
                      {activeData?.ShiftwiseOEE.Overall ?? 0}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-gray-100 flex-1">
                  {["Availability", "Performance", "Quality"].map((metric) => {
                    const apq = activeData?.APQ ?? {
                      Availability: 0,
                      Performance: 0,
                      Quality: 0,
                    };
                    return (
                      <div
                        key={metric}
                        className="flex flex-col items-center justify-center"
                      >
                        <RingGauge label={metric} value={apq[metric]} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <Card title="Available vs Downtime" className="h-full">
                <div className="px-2 pb-2">
                  <AvailabilityPie
                    net={activeData?.AvailableVsDowntime.NetAvailableTime ?? 0}
                    breakdown={activeData?.AvailableVsDowntime.Breakdown ?? 0}
                  />
                </div>
              </Card>
            </div>
          </div>
          {stationEntries.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-sky-500" />
                  <h2 className="text-base font-bold text-gray-800">
                    Sub-Station wise OEE
                  </h2>
                </div>
                {(selectedStationLabel ?? lineLabel) && (
                  <span className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    {selectedStationLabel ?? lineLabel}
                  </span>
                )}
              </div>
              <div
                ref={stationsRef}
                className="grid grid-cols-1 xl:grid-cols-2 gap-4"
              >
                {stationEntries.map((stData) => (
                  <StationCard
                    key={stData.name}
                    stationName={stData.name}
                    data={stData}
                    lineId={filters.line}
                    dateRange={dateRange}
                    activeShifts={activeShifts}
                  />
                ))}
              </div>
            </div>
          )}

          {tableData.length > 0 && (
            <DataTable
              columns={tableColumns}
              data={tableData}
              defaultRows={5}
              title="OEE Records"
            />
          )}
        </div>
      )}
    </div>
  );
}
