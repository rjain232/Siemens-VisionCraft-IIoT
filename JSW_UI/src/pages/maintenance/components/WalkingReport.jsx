
import {useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  AlertTriangle,
  Wrench,
  Clock,
  PlayCircle,

  Link2Off,
  PackageX,
  Hand,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

import DateRangeSelector from "../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../sharedComponents/FilterBar";
import { SearchPromptState, NoDataState } from "../../../sharedComponents/EmptyState";
import { ChartShimmer } from "../../../sharedComponents/Shimmer";
import { formatStationName, formatClusterName } from "../../../utils/Formatters";
import { masterApi } from "../../../services/api";
import { generateExcel } from "../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
} from "../../../utils/PdfUtils";

const REPORT_DATES = [
  "2026-06-01",
  "2026-06-02",
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
];

function getDatesInRange(startDate, endDate) {
  if (!startDate || !endDate) return REPORT_DATES;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return REPORT_DATES;
  }
  const dates = [];
  const current = new Date(start);
  let count = 0;
  while (current <= end && count < 31) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
    count++;
  }
  return dates.length > 0 ? dates : REPORT_DATES;
}

const CATEGORY_BASE_MINUTES = {
  Production: 340,
  "Stop Breakdown": 100,
  "Tip Change": 30,
  "Motion Timeout": 20,
  "Cycle Not Started": 14,
  "No External Enabling": 7,
  "Unloading Impossible": 6,
  "Losses for Congruity Check": 4,
  Manual: 5,
};

function dayVariation(seed) {
  return Math.round(Math.sin(seed * 12.9898) * 8);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function stopsForCategory(category, minutes) {
  if (category === "Production") return 0;
  return Math.max(1, Math.round(minutes / 5));
}

function buildDummyDowntimeData(masterData, dates = REPORT_DATES) {
  const rows = [];
  const activeDates = dates && dates.length > 0 ? dates : REPORT_DATES;
  (masterData || []).forEach((cluster) => {
    (cluster.Lines || []).forEach((lineObj) => {
      (lineObj.Stations || []).forEach((stationObj) => {
        const seed = hashString(stationObj.StationName || "");
        activeDates.forEach((date, dayIdx) => {
          Object.entries(CATEGORY_BASE_MINUTES).forEach(([category, baseMinutes], catIdx) => {
            const variation = dayVariation(seed + dayIdx * 7 + catIdx + 1);
            const minutes = Math.max(1, baseMinutes + variation + (seed % 15));
            rows.push({
              date,
              area: cluster.ClusterName,
              line: lineObj.LineName,
              station: stationObj.StationName,
              category,
              minutes,
              stops: stopsForCategory(category, minutes),
            });
          });
        });
      });
    });
  });
  return rows;
}

const LOSS_GROUP_MAP = {
  Production: "PRODUCTION",
  "Stop Breakdown": "FAULTED",
  "Motion Timeout": "OTHER",
  "Cycle Not Started": "FAULTED",
  "No External Enabling": "BLOCKED_UPSTREAM",
  "Unloading Impossible": "BLOCKED_DOWNSTREAM",
  "Losses for Congruity Check": "BLOCKED_DOWNSTREAM",
  "Tip Change": "BLOCKED_DOWNSTREAM",
  Manual: "OTHER",
};

const GROUP_COLORS = {
  PRODUCTION: "#22C55E", // Green
  FAULTED: "#EF4444", // Red
  BLOCKED_UPSTREAM: "#3B82F6", // Blue
  BLOCKED_DOWNSTREAM: "#F59E0B", // Amber
  OTHER: "#A855F7", // Purple
};

const CATEGORY_ICONS = {
  Production: CheckCircle2,
  "Stop Breakdown": AlertTriangle,
  "Tip Change": Wrench,
  "Motion Timeout": Clock,
  "Cycle Not Started": PlayCircle,
  "No External Enabling": Link2Off,
  "Unloading Impossible": PackageX,
  Manual: Hand,
};

const CATEGORY_ORDER = [
  "Production",
  "Stop Breakdown",
  "Tip Change",
  "Motion Timeout",
  "Cycle Not Started",
  "No External Enabling",
  "Unloading Impossible",
  "Manual",
];

const CATEGORY_SHORT_LABELS = {
  Production: "Production",
  "Stop Breakdown": "Breakdowns",
  "Tip Change": "Tip Chg",
  "Motion Timeout": "Timeout",
  "Cycle Not Started": "Not Started",
  "No External Enabling": "No Ext.",
  "Unloading Impossible": "Unload Imp.",
  Manual: "Manual",
};

const Y_AXIS_WIDTH = 56;
const CHART_MARGIN_LEFT = 4;
const CHART_MARGIN_RIGHT = 12;
const CHART_CHROME_WIDTH = Y_AXIS_WIDTH + CHART_MARGIN_LEFT + CHART_MARGIN_RIGHT;
const DENSE_THRESHOLD_PX = 78; // below this: rotated, abbreviated single-line labels
const ULTRA_DENSE_THRESHOLD_PX = 40; // below this: numeric index only, no text at all
const DENSE_FORCE_CATEGORY_COUNT = 7;

function opt(value, label) {
  return { value, label: label ?? value };
}

function CategoryTick({ x, y, payload, mode, index }) {
  const raw = payload.value === "Stop Breakdown" ? "Breakdowns" : payload.value;

  if (mode === "ultra") {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={14}
          textAnchor="middle"
          fill="#374151"
          fontSize={11}
          fontWeight={700}
        >
          {index + 1}
        </text>
      </g>
    );
  }

  if (mode === "dense") {
    const short = CATEGORY_SHORT_LABELS[payload.value] || raw;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={12}
          textAnchor="end"
          fill="#374151"
          fontSize={10}
          fontWeight={600}
          transform="rotate(-40)"
        >
          {short}
        </text>
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#374151"
        fontSize={12}
        fontWeight={600}
      >
        {raw}
      </text>
    </g>
  );
}

function WaterfallTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const bar = payload.find((p) => p.dataKey === "height");
  if (!bar) return null;
  const d = bar.payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 text-xs">
      <div className="font-semibold text-gray-800 mb-1">{d.category}</div>
      <div className="flex items-center gap-1.5 text-gray-600">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: d.color }}
        />
        {d.height} min
      </div>
      {d.category !== "Production" && (
        <div className="text-gray-400 mt-0.5">{d.loss}% of total</div>
      )}
    </div>
  );
}

function downloadWalkingExcel(bottomCards, dateFilter) {
  const headers = [
    { label: "Sr. No.", accessor: "sr" },
    { label: "Category", accessor: "label" },
    { label: "Time (min)", accessor: "time" },
    { label: "Stops", accessor: "stops" },
    { label: "Loss %", accessor: "loss" },
  ];
  const rows = bottomCards.map((c, idx) => ({ ...c, sr: idx + 1 }));
  const start = dateFilter.startDate || "all";
  const end = dateFilter.endDate || "all";
  generateExcel(headers, rows, `Walking_Report_${start}_to_${end}`);
}

async function downloadWalkingPDF(contentRef, areaLabel, line, stationLabel, dateFilter) {
  const { default: jsPDF } = await import("jspdf");
  const { toPng } = await import("html-to-image");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const MARGIN = 14;
  const HEADER_H = 40;
  const FOOTER_H = 22;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const start = dateFilter.startDate || "All";
  const end = dateFilter.endDate || "All";

  const subLines = [
    `Area: ${areaLabel}   |   Line: ${line}   |   Station: ${stationLabel}`,
    `Date Range: ${start}  to  ${end}`,
  ];

  drawPdfPageChrome(doc, {
    pageNum: 1,
    totalPages: 1,
    fontFamily,
    title: "Walking Report — Production Analysis",
    subLines,
    jswImg,
    schaefflerImg,
  });

  let contentImgData = null;
  let imgAspect = null;
  if (contentRef.current) {
    try {
      contentImgData = await toPng(contentRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const rect = contentRef.current.getBoundingClientRect();
      imgAspect = rect.width / rect.height;
    } catch (e) {
      console.warn("Chart capture failed:", e.message);
    }
  }

  if (contentImgData) {
    const subH = subLines.length * 5.5 + 10;
    const contentTop = HEADER_H + subH;
    const availW = pageW - 2 * MARGIN;
    const availH = pageH - contentTop - FOOTER_H;

    const aspect = imgAspect || availW / availH;
    let drawW = availW;
    let drawH = drawW / aspect;
    if (drawH > availH) {
      drawH = availH;
      drawW = drawH * aspect;
    }
    const x = MARGIN + (availW - drawW) / 2;
    const y = contentTop;
    doc.addImage(contentImgData, "PNG", x, y, drawW, drawH, undefined, "FAST");
  }

  doc.save(`Walking_Report_${start}_to_${end}.pdf`);
}

export default function WalkingReport({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState(false);

  const [filters, setFilters] = useState({ area: "", line: "", station: "" });
  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });
  const [showLoader, setShowLoader] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef(null);
  const chartWrapRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = chartWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setChartWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setMasterLoading(true);
    setMasterError(false);

    masterApi
      .getMasterData()
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || [];
        setMasterData(data);
        const firstCluster = data[0];
        const firstLine = firstCluster?.Lines?.[0];
        const firstStation = firstLine?.Stations?.[0];

        setFilters({
          area: firstCluster?.ClusterName ?? "",
          line: firstLine?.LineName ?? "",
          station: firstStation?.StationName ?? "",
        });
      })
      .catch((err) => {
        console.error("Failed to load master data:", err);
        if (!cancelled) setMasterError(true);
      })
      .finally(() => {
        if (!cancelled) setMasterLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { area, line, station } = filters;
  const areaOptions = useMemo(
    () => masterData.map((c) => opt(c.ClusterName, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const cluster = masterData.find((c) => c.ClusterName === area);
    return (cluster?.Lines || []).map((l) => opt(l.LineName, l.LineName));
  }, [masterData, area]);

  const stationOptions = useMemo(() => {
    const cluster = masterData.find((c) => c.ClusterName === area);
    const lineObj = cluster?.Lines?.find((l) => l.LineName === line);
    return (lineObj?.Stations || []).map((s) => opt(s.StationName, formatStationName(s.StationName)));
  }, [masterData, area, line]);

  const handleFilterChange = (next) => {
    if (next.area !== area) {
      const cluster = masterData.find((c) => c.ClusterName === next.area);
      const firstLine = cluster?.Lines?.[0];
      const firstStation = firstLine?.Stations?.[0];
      setFilters({
        area: next.area,
        line: firstLine?.LineName ?? "",
        station: firstStation?.StationName ?? "",
      });
      return;
    }
    if (next.line !== line) {
      const cluster = masterData.find((c) => c.ClusterName === area);
      const lineObj = cluster?.Lines?.find((l) => l.LineName === next.line);
      const firstStation = lineObj?.Stations?.[0];
      setFilters({ ...next, station: firstStation?.StationName ?? "" });
      return;
    }
    setFilters(next);
  };

  const filterConfig = [
    { key: "area", label: "Area", type: "select", options: areaOptions },
    { key: "line", label: "Line", type: "select", options: lineOptions },
    { key: "station", label: "Station", type: "select", options: stationOptions },
  ];

  const handleSearch = (startDate, endDate) => {
    setDateFilter({ startDate, endDate });
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 900);
  };

  const activeDates = useMemo(
    () => getDatesInRange(dateFilter.startDate, dateFilter.endDate),
    [dateFilter.startDate, dateFilter.endDate]
  );

  const dummyDowntimeData = useMemo(
    () => buildDummyDowntimeData(masterData, activeDates),
    [masterData, activeDates]
  );

  const filteredRows = useMemo(() => {
    const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
    const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

    const activeArea = area || masterData[0]?.ClusterName || "";
    const cluster = masterData.find((c) => c.ClusterName === activeArea) || masterData[0];
    const activeLine = line || cluster?.Lines?.[0]?.LineName || "";
    const lineObj = cluster?.Lines?.find((l) => l.LineName === activeLine) || cluster?.Lines?.[0];
    const activeStation = station || lineObj?.Stations?.[0]?.StationName || "";

    return dummyDowntimeData.filter((d) => {
      const recordDate = new Date(d.date);
      const inRange = (!start || recordDate >= start) && (!end || recordDate <= end);
      return inRange && d.area === activeArea && d.line === activeLine && d.station === activeStation;
    });
  }, [dummyDowntimeData, dateFilter, area, line, station, masterData]);

  const cumulativeCategoryData = useMemo(() => {
    const totals = {};
    filteredRows.forEach((d) => {
      if (d.category === "Losses for Congruity Check") return;
      totals[d.category] = (totals[d.category] || 0) + d.minutes;
    });

    return CATEGORY_ORDER.filter((c) => totals[c] !== undefined).map((category) => ({
      category,
      minutes: totals[category],
    }));
  }, [filteredRows]);

  const totalProductionMinutes = useMemo(
    () => cumulativeCategoryData.reduce((sum, item) => sum + item.minutes, 0),
    [cumulativeCategoryData]
  );

  const waterfallData = useMemo(() => {
    let running = totalProductionMinutes;
    return cumulativeCategoryData.map((item) => {
      const start = running;
      const end = running - item.minutes;
      running = end;
      const groupColor = GROUP_COLORS[LOSS_GROUP_MAP[item.category] ?? "OTHER"] ?? GROUP_COLORS.OTHER;
      return {
        category: item.category,
        start,
        end,
        base: Math.min(start, end),
        height: Math.abs(end - start),
        color: groupColor,
        loss:
          item.category === "Production"
            ? "0.0"
            : ((item.minutes / totalProductionMinutes) * 100).toFixed(1),
      };
    });
  }, [cumulativeCategoryData, totalProductionMinutes]);

  const bottomCards = useMemo(() => {
    return cumulativeCategoryData.map((item) => {
      const totalStops = filteredRows
        .filter((d) => d.category === item.category)
        .reduce((sum, d) => sum + d.stops, 0);

      const color = GROUP_COLORS[LOSS_GROUP_MAP[item.category] ?? "OTHER"] ?? GROUP_COLORS.OTHER;

      return {
        label: item.category,
        time: item.minutes,
        stops: totalStops,
        loss:
          item.category === "Production"
            ? "0.0"
            : ((item.minutes / totalProductionMinutes) * 100).toFixed(1),
        color,
        Icon: CATEGORY_ICONS[item.category] || ClipboardList,
      };
    });
  }, [cumulativeCategoryData, filteredRows, totalProductionMinutes]);

  const hasDateRange = Boolean(dateFilter.startDate && dateFilter.endDate);
  const categoryCount = waterfallData.length || 1;
  const plottableWidth = Math.max(0, chartWidth - CHART_CHROME_WIDTH);
  const widthPerCategory = plottableWidth / categoryCount;
  const longestLabelWidth = useMemo(() => {
    if (typeof document === "undefined") return 150; // SSR-safe fallback
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "600 12px sans-serif";
    const labels = CATEGORY_ORDER.map((c) => (c === "Stop Breakdown" ? "Breakdowns" : c));
    return Math.max(...labels.map((l) => ctx.measureText(l).width)) + 16; // + a little breathing room
  }, []);

  const labelMode = useMemo(() => {
    if (chartWidth === 0) return "dense";
    if (widthPerCategory < ULTRA_DENSE_THRESHOLD_PX) return "ultra";
    const denseCutoff =
      categoryCount >= DENSE_FORCE_CATEGORY_COUNT
        ? Math.max(longestLabelWidth, DENSE_THRESHOLD_PX)
        : DENSE_THRESHOLD_PX;
    if (widthPerCategory < denseCutoff) return "dense";
    return "normal";
  }, [chartWidth, categoryCount, widthPerCategory, longestLabelWidth]);

  const isDense = labelMode !== "normal"; // kept for the axis height/margin below
  const xAxisHeight = labelMode === "normal" ? 44 : labelMode === "dense" ? 64 : 30;
  const chartBottomMargin = labelMode === "normal" ? 8 : labelMode === "dense" ? 30 : 8;

  const handleDownload = useCallback(async () => {
    if (downloading || (cumulativeCategoryData.length === 0 && !isBg)) return;
    setDownloading(true);
    try {
      const activeArea = area || masterData[0]?.ClusterName || "";
      const cluster = masterData.find((c) => c.ClusterName === activeArea) || masterData[0];
      const activeLine = line || cluster?.Lines?.[0]?.LineName || "";
      const lineObj = cluster?.Lines?.find((l) => l.LineName === activeLine) || cluster?.Lines?.[0];
      const activeStation = station || lineObj?.Stations?.[0]?.StationName || "";

      const areaLabel = areaOptions.find((a) => a.value === activeArea)?.label ?? activeArea;
      const stationLabel = stationOptions.find((s) => s.value === activeStation)?.label ?? activeStation;

      await Promise.all([
        downloadWalkingPDF(contentRef, areaLabel, activeLine, stationLabel, dateFilter),
        Promise.resolve(downloadWalkingExcel(bottomCards, dateFilter)),
      ]);
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setDownloading(false);
    }
  }, [downloading, cumulativeCategoryData, bottomCards, areaOptions, stationOptions, area, line, station, dateFilter, masterData, isBg]);

  // Sync date range in background mode
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateFilter({ startDate: s, endDate: e });
    }
  }, [isBg, targetDateRange]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || masterLoading || showLoader || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, 1200);
    // Removed clearTimeout to prevent race condition canceling export
  }, [isBg, masterLoading, showLoader]);

  return (
    <div className="m-4">
      {/* Filters */}
      <FilterBar config={filterConfig} filters={filters} onChange={handleFilterChange} />

      {/* Date Range + Search/Download */}
      <DateRangeSelector
        reportName="Walking_Report"
        showDownload={true}
        onDownload={handleDownload}
        onSearch={handleSearch}
        showDateInputs={true}
        selectedStartDate={dateFilter?.startDate}
        selectedEndDate={dateFilter?.endDate}
        isDownloading={downloading}
      />

      {masterLoading ? (
        <div className="mt-4"><ChartShimmer /></div>
      ) : masterError ? (
        <NoDataState subtitle="Could not load filter data. Please try again." />
      ) : !hasDateRange ? (
        <SearchPromptState pageName="Walking Report" />
      ) : showLoader ? (
        <div className="mt-4"><ChartShimmer /></div>
      ) : cumulativeCategoryData.length === 0 ? (
        <NoDataState subtitle="Try widening the date range or clearing a filter." />
      ) : (
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div ref={contentRef} className="p-3 sm:p-6">
            {/* Waterfall Chart */}
            <div ref={chartWrapRef} className="h-[260px] sm:h-[320px] lg:h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={waterfallData}
                  margin={{ top: 16, right: CHART_MARGIN_RIGHT, left: CHART_MARGIN_LEFT, bottom: chartBottomMargin }}
                  barCategoryGap={0}
                  barGap={0}
                >
                  <CartesianGrid vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="category"
                    tick={(props) => <CategoryTick {...props} mode={labelMode} index={props.index} />}
                    interval={0}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                    height={xAxisHeight}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v} min`}
                    tick={{ fill: "#374151", fontSize: 11, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={Y_AXIS_WIDTH}
                  />
                  <Tooltip content={<WaterfallTooltip />} cursor={{ fill: "rgba(124, 58, 237, 0.06)" }} />
                  <Bar dataKey="base" stackId="waterfall" fill="transparent" isAnimationActive={false} />
                  <Bar dataKey="height" stackId="waterfall" animationDuration={700}>
                    {waterfallData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {labelMode === "ultra" && (
              <p className="text-[11px] text-gray-400 text-center mt-1">
                Bar numbers match the category order in the cards below
              </p>
            )}

            {/* Bottom Summary Cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
              {bottomCards.map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white border border-gray-100 rounded-xl p-4 pl-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span
                    className="absolute top-0 left-0 h-full w-1 rounded-l-xl"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}1A` }}
                    >
                      <item.Icon size={14} style={{ color: item.color }} />
                    </div>
                    <span
                      className="text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${item.color}1A`, color: item.color }}
                    >
                      {item.loss}%
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-700 leading-tight mb-1.5 truncate" title={item.label}>
                    {labelMode === "ultra" ? `${i + 1}. ${item.label}` : item.label}
                  </div>
                  <div className="text-lg font-bold text-gray-900 leading-none">
                    {item.time}
                    <span className="text-xs font-medium text-gray-400 ml-1">min</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">{item.stops} stops</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}