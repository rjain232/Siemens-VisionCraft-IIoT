import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import Chart from "react-apexcharts";

import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../sharedComponents/DataTable";
import { ChartShimmer, TableShimmer } from "../../../../sharedComponents/Shimmer";
import { useNavigate } from "react-router-dom";
import { formatClusterName } from "../../../../utils/Formatters";
import { masterApi, mtbfMttrApi } from "../../../../services/api";
import { SearchPromptState, NoDataState } from "../../../../sharedComponents/EmptyState";
import { generateExcel } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";


const DESIGN_MTTR = 30;
const DESIGN_MTBF = 600;

const secToHHMMSS = (sec) => {
  const s = Math.round(sec ?? 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

const secToHHMM = (sec) => {
  const s = Math.round(sec ?? 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const secToMMSS = (sec) => {
  const s = Math.round(sec ?? 0);
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

const METRIC_OPTIONS = [
  { value: "MTTR", label: "MTTR (Mean Time To Repair)" },
  { value: "MTBF", label: "MTBF (Mean Time Between Failures)" },
];
const SHIFT_OPTIONS = [
  { value: "ALL", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];
const INDIVIDUAL_SHIFTS = ["A", "B", "C"];
const CLEAN_CHART_BASE = {
  toolbar: { show: false },
  fontFamily: "inherit",
  background: "transparent",
  sparkline: { enabled: false },
};

const excelColumns = (isMTTR) => [
  { label: "Sr.No", accessor: "sr" },
  { label: "Area", accessor: "area" },
  { label: "Line", accessor: "lineName" },
  { label: "Station", accessor: "station" },
  { label: "Equipment", accessor: "subStation" },
  { label: isMTTR ? "Down Time" : "Up Time", accessor: "time" },
  { label: "Failures", accessor: "failures" },
  { label: isMTTR ? "MTTR" : "MTBF", accessor: "metricVal" },
  { label: "Shift", accessor: "shift" },
  { label: "Date", accessor: "date" },
];

const makeBarOpts = (categories, showDataLabels, color, overrides = {}, fmtVal = secToHHMMSS, yFmt = null) => ({
  chart: { ...CLEAN_CHART_BASE, type: "bar", ...overrides.chart },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 4,
      borderRadiusApplication: "end",
      dataLabels: { position: "top" },
      ...overrides.plotOptions?.bar,
    },
  },
  dataLabels: {
    enabled: showDataLabels,
    formatter: fmtVal,
    offsetY: -18,
    style: { fontSize: "11px", fontWeight: 700, colors: ["#374151"] },
  },
  xaxis: {
    categories,
    labels: {
      rotate: -45,
      rotateAlways: categories.length > 4,
      hideOverlappingLabels: false,
      trim: false,
      maxHeight: 80,
      style: { fontSize: "11px", fontWeight: 600, colors: "#6B7280" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { formatter: yFmt ?? secToHHMM, style: { colors: "#9CA3AF", fontSize: "11px" }, minWidth: 58 },
  },
  colors: overrides.colors || [color],
  fill: { type: "solid", opacity: 0.88 },
  grid: { borderColor: "#F3F4F6", strokeDashArray: 3, padding: { top: showDataLabels ? 20 : 8 } },
  legend: overrides.legend || { show: false },
});

// ── Tooltip builder ───────────────────────────────────────────────────────────
const buildBarTooltip = ({ cat, actual, design, color, label }) => `
  <div style="padding:10px 14px;font-size:12px;min-width:180px;border-radius:10px;background:#fff;border:1px solid ${color}22;box-shadow:0 8px 24px rgba(0,0,0,0.10);font-family:inherit;">
    <div style="font-weight:700;color:#111827;margin-bottom:8px;font-size:13px;border-bottom:1px solid #f3f4f6;padding-bottom:6px;">${cat}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:5px;">
      <span style="display:flex;align-items:center;gap:6px;color:#6B7280;font-size:11px;">
        <span style="width:8px;height:8px;border-radius:2px;background:${color};display:inline-block;"></span>
        ${label}
      </span>
      <span style="font-weight:700;color:#111827;font-size:13px;">${secToHHMMSS(actual)}</span>
    </div>
    ${design !== undefined ? `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
      <span style="display:flex;align-items:center;gap:6px;color:#6B7280;font-size:11px;">
        <span style="width:10px;height:2px;background:#000000;display:inline-block;border-radius:99px;"></span>
        Design
      </span>
      <span style="font-weight:600;color:#000000;font-size:12px;">${secToHHMMSS(design)}</span>
    </div>` : ""}
  </div>
`;

// ── Shared components ─────────────────────────────────────────────────────────
const SectionHeading = ({ metric }) => (
  <div className="flex items-center gap-3 py-1">
    <div className="h-8 w-1 bg-sky-500 rounded-full flex-shrink-0" />
    <h2 className="text-base font-bold text-gray-800">
      {metric === "MTTR" ? "Line Comparison – MTTR Analysis" : "Line Comparison – MTBF Analysis"}
    </h2>
  </div>
);

const ChartCard = ({ title, accentColor, icon: Icon, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100" style={{ borderLeft: `3px solid ${accentColor}` }}>
      {Icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0" style={{ background: `${accentColor}18` }}>
          <Icon size={14} style={{ color: accentColor }} />
        </span>
      )}
      <p className="text-xs font-bold text-gray-700 leading-tight">{title}</p>
    </div>
    <div className="px-2 pb-2 pt-1">{children}</div>
  </div>
);

// ── Page component ────────────────────────────────────────────────────────────
const MTBF_MTTR = ({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
  defaultMetric = null,
}) => {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;
  const initialMetric =
    defaultMetric ||
    (bgContext?.reportKey === "MTBF_Report"
      ? "MTBF"
      : "MTTR");

  const [filters, setFilters] = useState({
    areaId: targetFilters?.areaId || "",
    metric: initialMetric,
    shifts: targetFilters?.shifts || ["A"],
    lineId: targetFilters?.lineId || "",
    stationId: targetFilters?.stationId || "",
  });

  useEffect(() => {
    if (bgContext?.reportKey === "MTBF_Report") {
      setFilters((f) => (f.metric !== "MTBF" ? { ...f, metric: "MTBF" } : f));
    } else if (bgContext?.reportKey === "MTTR_Report") {
      setFilters((f) => (f.metric !== "MTTR" ? { ...f, metric: "MTTR" } : f));
    }
  }, [bgContext?.reportKey]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(null);
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [downloading, setDownloading] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });
  const [masterClusters, setMasterClusters] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  // ── Refs for PDF chart capture — visible on-screen refs ───────
  const downUpChartRef = useRef(null);
  const failureChartRef = useRef(null);
  const metricChartRef = useRef(null);
  const groupedChartRef = useRef(null);
  const pdfDownUpChartRef = useRef(null);
  const pdfFailureChartRef = useRef(null);
  const pdfMetricChartRef = useRef(null);

  useEffect(() => {
    masterApi.getMasterData()
      .then(res => {
        const clusters = res.data ?? [];
        setMasterClusters(clusters);
        const firstCluster = clusters[0];
        const firstLine = firstCluster?.Lines?.[0];
        const firstStation = firstLine?.Stations?.[0];
        if (firstCluster) {
          setFilters(f => ({
            ...f,
            areaId: firstCluster.ClusterId ?? "",
            lineId: firstLine?.LineId ?? "",
            stationId: firstStation?.StationId ?? "",
          }));
        }
      })
      .catch(err => console.error("[MTBF_MTTR] master fetch failed:", err))
      .finally(() => setMasterLoading(false));
  }, []);

  const areaOptions = useMemo(() =>
    masterClusters.map(c => ({ value: c.ClusterId, label: formatClusterName(c.ClusterName) })),
    [masterClusters]
  );

  const lineOptions = useMemo(() => {
    const cluster = masterClusters.find(c => c.ClusterId === filters.areaId);
    return (cluster?.Lines ?? []).map(l => ({ value: l.LineId, label: l.LineName }));
  }, [filters.areaId, masterClusters]);

  const stationOptions = useMemo(() => {
    for (const cluster of masterClusters) {
      const line = (cluster.Lines ?? []).find(l => l.LineId === filters.lineId);
      if (line) return (line.Stations ?? [])
        .map(s => ({ value: s.StationId, label: s.StationName }));
    }
    return [];
  }, [filters.lineId, masterClusters]);

  const filterConfig = useMemo(() => [
    { type: "select", key: "areaId", label: "Area", options: areaOptions },
    { type: "select", key: "metric", label: "Metric", options: METRIC_OPTIONS },
    {
      type: "select",
      key: "shifts",
      label: "Shift",
      multiple: true,
      searchable: false,
      options: SHIFT_OPTIONS,
    },
    { type: "divider" },
    { type: "select", key: "lineId", label: "Line", options: lineOptions },
    { type: "select", key: "stationId", label: "Station", options: stationOptions },
  ], [areaOptions, lineOptions, stationOptions]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(prev => {
      let updated = { ...newFilters };

      if (newFilters.areaId !== prev.areaId) {
        const cluster = masterClusters.find(c => c.ClusterId === newFilters.areaId);
        const firstLine = cluster?.Lines?.[0];
        const firstStation = firstLine?.Stations?.[0];
        updated.lineId = firstLine?.LineId ?? "";
        updated.stationId = firstStation?.StationId ?? "";
      } else if (newFilters.lineId !== prev.lineId) {
        const cluster = masterClusters.find(c => c.ClusterId === (newFilters.areaId ?? prev.areaId));
        const line = (cluster?.Lines ?? []).find(l => l.LineId === newFilters.lineId);
        const firstStation = line?.Stations?.[0];
        updated.stationId = firstStation?.StationId ?? "";
      }

      const prevShifts = prev.shifts ?? ["ALL"];
      let nextShifts = updated.shifts ?? prevShifts;
      if (nextShifts.includes("ALL") && !prevShifts.includes("ALL")) {
        nextShifts = ["ALL"];
      } else if (!nextShifts.includes("ALL") && prevShifts.includes("ALL")) {
        nextShifts = nextShifts.filter((s) => s !== "ALL");
        if (nextShifts.length === 0) nextShifts = ["ALL"];
      } else if (
        !nextShifts.includes("ALL") &&
        INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
      ) {
        nextShifts = ["ALL"];
      } else if (nextShifts.includes("ALL") && nextShifts.length > 1) {
        nextShifts = nextShifts.filter((s) => s !== "ALL");
      }
      updated.shifts = nextShifts;

      return updated;
    });
    setPage(1);
  }, [masterClusters]);

  const fetchReport = useCallback(async (params) => {
    setReportLoading(true);
    setReportError(null);
    try {
      const res = await mtbfMttrApi.report(params);
      setChartData(res.chartData ?? []);
      setTableData(res.tableData ?? []);
      setTotalRecords(res.pagination?.totalRecords ?? 0);
      setTotalPages(res.pagination?.totalPages ?? 1);
    } catch (err) {
      console.error("[MTBF_MTTR] report fetch failed:", err);
      setReportError(err.message);
      setChartData([]);
      setTableData([]);
    } finally {
      setReportLoading(false);
    }
  }, []);

  const handleSearch = useCallback((startDate, endDate) => {
    setHasSearched(true);
    setPage(1);
    setDateFilter({ startDate, endDate });
  }, []);

  // Sync date range in background mode & trigger initial search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e);
    }
  }, [isBg, targetDateRange, handleSearch]);

  useEffect(() => {
    if (!hasSearched) return;
    fetchReport({
      areaId: filters.areaId,
      lineId: filters.lineId,
      stationId: filters.stationId,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
      shifts: !filters.shifts.includes("ALL") ? filters.shifts.join(",") : "",
      page,
      pageSize,
    });
  }, [hasSearched, fetchReport, page, pageSize, dateFilter.startDate, dateFilter.endDate, filters.areaId, filters.lineId, filters.stationId, filters.shifts]);

  const isMTTR = filters.metric === "MTTR";

  const { categories, values } = useMemo(() => {
    if (!chartData.length) return { categories: [], values: [] };
    return { categories: chartData.map(item => item.groupName), values: chartData };
  }, [chartData]);

  const showDataLabels = useMemo(() => categories.length <= 8, [categories]);

  const barColors = useMemo(() =>
    values.map(v => {
      const a = isMTTR ? (v.avgMTTR || 0) : (v.avgMTBF || 0);
      return isMTTR ? (a > DESIGN_MTTR ? "#EF4444" : "#10B981") : (a < DESIGN_MTBF ? "#EF4444" : "#10B981");
    }),
    [values, isMTTR]
  );

  const CHART_COLORS = useMemo(() =>
    [isMTTR ? "#EF4444" : "#10B981", "#F97316", "#8B5CF6"],
    [isMTTR]
  );

  const handleBarClick = useCallback((_e, _ctx, config) => {
    const index = config.dataPointIndex;
    if (index < 0) return;
    const clicked = chartData[index];
    if (!clicked) return;
    if (!filters.lineId) setFilters(f => ({ ...f, lineId: clicked.groupId }));
    else if (!filters.stationId) setFilters(f => ({ ...f, stationId: clicked.groupId }));
  }, [chartData, filters.lineId, filters.stationId]);

  // ── Series ──────────────────────────────────────────────────────────────────
  const downUpSeries = useMemo(() => [{
    name: isMTTR ? "Down Time" : "Up Time",
    data: values.map(v => isMTTR ? (v.totalBreakDownTime || 0) : (v.totalNetAvailTime || 0)),
  }], [values, isMTTR]);

  const failureSeries = useMemo(() => [{
    name: "Failures",
    data: values.map(v => v.totalFailures || 0),
  }], [values]);

  const metricSeries = useMemo(() => [{
    name: filters.metric,
    data: values.map((v, i) => ({
      x: categories[i],
      y: isMTTR ? (v.avgMTTR || 0) : (v.avgMTBF || 0),
      goals: [{ name: "Design Time", value: isMTTR ? DESIGN_MTTR : DESIGN_MTBF, strokeHeight: 2, strokeDashArray: 4, strokeColor: "#000000" }],
    })),
  }], [values, isMTTR, categories, filters.metric]);

  const groupedSeries = useMemo(() => [
    { name: isMTTR ? "Down Time" : "Up Time", data: values.map(v => isMTTR ? (v.totalBreakDownTime || 0) : (v.totalNetAvailTime || 0)) },
    { name: "Failures", data: values.map(v => v.totalFailures || 0) },
    { name: filters.metric, data: values.map(v => isMTTR ? (v.avgMTTR || 0) : (v.avgMTBF || 0)) },
  ], [values, isMTTR, filters.metric]);

  // ── Chart options ───────────────────────────────────────────────────────────
  const downUpBarOpts = useMemo(() => ({
    ...makeBarOpts(categories, showDataLabels, isMTTR ? "#EF4444" : "#10B981"),
    tooltip: {
      custom: ({ dataPointIndex }) => buildBarTooltip({
        cat: categories[dataPointIndex],
        actual: isMTTR ? (values[dataPointIndex]?.totalBreakDownTime || 0) : (values[dataPointIndex]?.totalNetAvailTime || 0),
        color: isMTTR ? "#EF4444" : "#10B981",
        label: isMTTR ? "Down Time" : "Up Time",
      }),
    },
  }), [categories, showDataLabels, isMTTR, values]);

  const failureBarOpts = useMemo(() => ({
    ...makeBarOpts(categories, showDataLabels, "#F97316", {
      chart: {
        events: {
          dataPointSelection: (_e, _ctx, config) => {
            if (config.dataPointIndex < 0) return;
            navigate("/maintenance", { state: { activeTab: "line-station-losses" } });
          },
        },
      },
    }, (v) => Math.round(v).toString(), (v) => Math.round(v).toString()),
    tooltip: {
      custom: ({ dataPointIndex }) => `
        <div style="padding:10px 14px;font-size:12px;min-width:160px;border-radius:10px;background:#fff;border:1px solid #F9731622;box-shadow:0 8px 24px rgba(0,0,0,0.10);font-family:inherit;">
          <div style="font-weight:700;color:#111827;margin-bottom:8px;font-size:13px;border-bottom:1px solid #f3f4f6;padding-bottom:6px;">${categories[dataPointIndex]}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <span style="display:flex;align-items:center;gap:6px;color:#6B7280;font-size:11px;">
              <span style="width:8px;height:8px;border-radius:2px;background:#F97316;display:inline-block;"></span>Failures
            </span>
            <span style="font-weight:700;color:#111827;font-size:13px;">${values[dataPointIndex]?.totalFailures || 0}</span>
          </div>
        </div>`,
    },
  }), [categories, showDataLabels, values, navigate]);

  const metricBarOpts = useMemo(() => ({
    ...makeBarOpts(categories, showDataLabels, "#8B5CF6", {
      chart: { events: { dataPointSelection: handleBarClick } },
      colors: barColors,
      plotOptions: {
        bar: { distributed: true, horizontal: false, columnWidth: "55%", borderRadius: 4, borderRadiusApplication: "end", dataLabels: { position: "top" } },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: isMTTR ? ["Above Design", "Below Design"] : ["Below Design", "Above Design"],
        markers: { fillColors: ["#EF4444", "#10B981"], radius: 2 },
        fontSize: "11px",
        fontWeight: 500,
        labels: { colors: "#374151" },
      },
    }, secToMMSS, secToMMSS),
    tooltip: {
      custom: ({ dataPointIndex }) => buildBarTooltip({
        cat: categories[dataPointIndex],
        actual: isMTTR ? (values[dataPointIndex]?.avgMTTR || 0) : (values[dataPointIndex]?.avgMTBF || 0),
        design: isMTTR ? DESIGN_MTTR : DESIGN_MTBF,
        color: barColors[dataPointIndex] || "#8B5CF6",
        label: filters.metric,
      }),
    },
  }), [categories, showDataLabels, isMTTR, values, barColors, handleBarClick, filters.metric]);

  const groupedBarOpts = useMemo(() => ({
    chart: { ...CLEAN_CHART_BASE, type: "bar", animations: { enabled: true, speed: 600 } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "65%", borderRadius: 3, borderRadiusApplication: "end", dataLabels: { position: "top" } },
    },
      dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex }) => {
        if (seriesIndex === 0) return secToHHMMSS(val);
        if (seriesIndex === 1) return Math.round(val).toString();
        return secToHHMMSS(val);
      },
      offsetY: -18,
      style: { fontSize: "11px", fontWeight: 700, colors: ["#374151"] },
    },
    xaxis: {
      categories,
      labels: {
        rotate: -45,
        rotateAlways: categories.length > 4,
        hideOverlappingLabels: false,
        trim: false,
        maxHeight: 80,
        style: { fontSize: "11px", fontWeight: 600, colors: "#6B7280" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        seriesName: isMTTR ? "Down Time" : "Up Time",
        title: { text: isMTTR ? "Down Time" : "Up Time", style: { fontSize: "11px", fontWeight: 600, color: CHART_COLORS[0] } },
        labels: { formatter: v => secToHHMM(v), minWidth: 58, style: { colors: CHART_COLORS[0], fontSize: "11px" } },
        axisBorder: { show: true, color: CHART_COLORS[0], width: 2 },
      },
      {
        seriesName: "Failures",
        opposite: true,
        title: { text: "Failures", style: { fontSize: "11px", fontWeight: 600, color: CHART_COLORS[1] } },
        labels: { formatter: v => Math.round(v).toString(), style: { colors: CHART_COLORS[1], fontSize: "11px" } },
        axisBorder: { show: true, color: CHART_COLORS[1], width: 2 },
      },
      {
        seriesName: filters.metric,
        opposite: true,
        title: { text: `${filters.metric} (MM:SS)`, style: { fontSize: "11px", fontWeight: 600, color: CHART_COLORS[2] } },
        labels: { formatter: v => secToMMSS(v), minWidth: 58, style: { colors: CHART_COLORS[2], fontSize: "11px" } },
        axisBorder: { show: true, color: CHART_COLORS[2], width: 2 },
      },
    ],
    colors: CHART_COLORS,
    fill: { type: "solid", opacity: 0.88 },
    legend: { show: true, position: "top", horizontalAlign: "right", fontSize: "12px", fontWeight: 600, labels: { colors: "#374151" }, markers: { radius: 3 } },
    grid: { borderColor: "#F3F4F6", strokeDashArray: 4, padding: { left: 8, right: 8, top: 24, bottom: 0 } },
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        { formatter: v => secToHHMMSS(v) },
        { formatter: v => `${Math.round(v)} failures` },
        { formatter: v => secToHHMMSS(v) },
      ],
    },
  }), [categories, isMTTR, CHART_COLORS, filters.metric]);

  // ── Table ───────────────────────────────────────────────────────────────────
  const mappedTableData = useMemo(() =>
    tableData.map(row => ({
      sr: row.srNo,
      area: formatClusterName(row.area),
      lineName: row.line,
      station: row.station,
      subStation: row.subStation,
      time: secToHHMMSS(isMTTR ? row.breakDownTime : row.netAvailTime),
      failures: row.failures,
      metricVal: secToHHMMSS(isMTTR ? row.mttr : row.mtbf),
      shift: row.shift,
      date: row.date,
    })),
    [tableData, isMTTR]
  );

  const tableColumns = useMemo(() => [
    { key: "sr", label: "Sr. No.", sortable: false },
    { key: "area", label: "Area", type: "primary", sortable: true },
    { key: "lineName", label: "Line", sortable: true },
    { key: "station", label: "Station", sortable: true },
    { key: "subStation", label: "Equipment", type: "equipment", sortable: true },
    { key: "time", label: isMTTR ? "Down Time" : "Up Time", type: "mono", sortable: false },
    { key: "failures", label: "Failures", sortable: true },
    { key: "metricVal", label: isMTTR ? "MTTR" : "MTBF", type: "badge", isMTTR, sortable: true },
    { key: "shift", label: "Shift", type: "shift", sortable: true },
    { key: "date", label: "Date", type: "mono", sortable: false },
  ], [isMTTR]);

  const chartHeight = categories.length > 5 ? 320 : 280;

  // ── Download (Excel + PDF together — one click, one button) ──────────────
  const handleDownload = useCallback(async () => {
    if (!hasSearched || (categories.length === 0 && !isBg)) return;
    setDownloading(true);
    try {
      // ── Fetch the full (non-paginated) data set once, shared by both exports ──
      const res = await mtbfMttrApi.report({
        areaId: filters.areaId,
        lineId: filters.lineId,
        stationId: filters.stationId,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        shifts: !filters.shifts.includes("ALL") ? filters.shifts.join(",") : "",
        page: 1,
        pageSize: totalRecords > 0 ? totalRecords : 100000,
      });
      const fullRows = res.tableData ?? [];
      const fileTag = (d) => (d ? String(d).replaceAll("-", "") : "all");
      const fileBase = `${filters.metric}_Report_${fileTag(dateFilter.startDate)}_${fileTag(dateFilter.endDate)}`;

      // ── Excel ──────────────────────────────────────────────────────────────
      const excelRows = fullRows.map((row, idx) => ({
        sr: row.srNo ?? idx + 1,
        area: formatClusterName(row.area),
        lineName: row.line,
        station: row.station,
        subStation: row.subStation,
        time: secToHHMMSS(isMTTR ? row.breakDownTime : row.netAvailTime),
        failures: row.failures,
        metricVal: secToHHMMSS(isMTTR ? row.mttr : row.mtbf),
        shift: row.shift,
        date: row.date,
      }));
      generateExcel(excelColumns(isMTTR), excelRows, fileBase);

      // ── PDF ────────────────────────────────────────────────────────────────
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const {
        loadKarlaFont,
        loadBrandingLogos,
        drawPdfPageChrome,
        buildAutoTableConfig,
      } = await import("../../../../utils/PdfUtils"); 

      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      const FONT = await loadKarlaFont(doc);
      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 14;
      const HEADER_H = 40;
      const contentW = pageW - MARGIN * 2;

      const areaLabel = areaOptions.find(o => o.value === filters.areaId)?.label;
      const lineLabel = lineOptions.find(o => o.value === filters.lineId)?.label;
      const stationLabel = stationOptions.find(o => o.value === filters.stationId)?.label;

      const subLines = [
        `Metric: ${filters.metric}`,
        `Area: ${areaLabel || "All"}   |   Line: ${lineLabel || "All"}   |   Station: ${stationLabel || "All"}`,
        `Shift: ${!filters.shifts.includes("ALL") ? filters.shifts.join(", ") : "All"}   |   Date Range: ${dateFilter.startDate || "-"} to ${dateFilter.endDate || "-"}`,
      ];
      const subH = subLines.length * 5.5 + 10;

      // ── Capture the hidden off-screen 3-column clone — visible UI untouched ──
      const captureEl = async (ref) => {
        if (!ref.current) return null;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        try {
          const { toPng } = await import("html-to-image");
          const dataUrl = await toPng(el, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
            width: rect.width,
            height: rect.height,
          });
          return { dataUrl, w: rect.width * 2, h: rect.height * 2 };
        } catch (toPngErr) {
          console.warn("toPng failed, falling back to html2canvas:", toPngErr);
        }
        const { default: html2canvas } = await import("html2canvas-pro");
        const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        return { dataUrl: canvas.toDataURL("image/png"), w: canvas.width, h: canvas.height };
      };

      const [downUpImg, failureImg, metricImg, groupedImg] = await Promise.all([
        captureEl(pdfDownUpChartRef),
        captureEl(pdfFailureChartRef),
        captureEl(pdfMetricChartRef),
        captureEl(groupedChartRef),
      ]);

      const TITLE_H = 7;

      const drawChart = (title, img, x, y, maxW, maxH) => {
        doc.setFont(FONT, "bold");
        doc.setFontSize(10);
        doc.setTextColor(22, 70, 161);
        doc.text(title, x, y + 4);
        const top = y + TITLE_H;
        if (!img) return top;
        const aspect = img.w / img.h;
        let imgW = maxW;
        let imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = x + (maxW - imgW) / 2;
        doc.addImage(img.dataUrl, "PNG", cx, top, imgW, imgH, undefined, "FAST");
        return top + imgH;
      };

      // ── Line Comparison charts ────────────────────────────────────────
      let y = HEADER_H + subH;
      let availH = pageH - y - 22;

      doc.setFont(FONT, "bold");
      doc.setFontSize(11);
      doc.setTextColor(22, 70, 161);
      doc.text(
        isMTTR ? "MTTR Line Comparison Charts" : "MTBF Line Comparison Charts",
        MARGIN,
        y + 4,
      );
      y += TITLE_H + 2;

      const chartTitles = [
        isMTTR ? "Total Down Time" : "Total Up Time",
        "Number of Failures",
        filters.metric,
      ];
      const chartImgs = [downUpImg, failureImg, metricImg];

      if (categories.length > 5) {
        // Stacked layout — one chart per page (matches UI full-width layout)
        chartImgs.forEach((img, i) => {
          if (i > 0) {
            doc.addPage();
            y = HEADER_H + 6;
            availH = pageH - y - 22;
          }
          drawChart(chartTitles[i], img, MARGIN, y, contentW, availH - TITLE_H);
        });
      } else {
        // 3-column layout
        const colGap = 4;
        const colW = (contentW - colGap * 2) / 3;
        const rowMaxH = availH - TITLE_H - 2;

        const drawChartInCol = (title, img, x, colY, w, maxH) => {
          doc.setFont(FONT, "bold");
          doc.setFontSize(9);
          doc.setTextColor(55, 65, 81);
          doc.text(title, x, colY);
          const top = colY + 4;
          if (!img) return;
          const innerMaxH = maxH - 4;
          const aspect = img.w / img.h;
          let imgW = w;
          let imgH = imgW / aspect;
          if (imgH > innerMaxH) {
            imgH = innerMaxH;
            imgW = imgH * aspect;
          }
          const cx = x + (w - imgW) / 2;
          doc.addImage(img.dataUrl, "PNG", cx, top, imgW, imgH);
          doc.addImage(img.dataUrl, "JPEG", cx, top, imgW, imgH, undefined, "FAST");
        };

        drawChartInCol(chartTitles[0], downUpImg, MARGIN, y, colW, rowMaxH);
        drawChartInCol(chartTitles[1], failureImg, MARGIN + colW + colGap, y, colW, rowMaxH);
        drawChartInCol(chartTitles[2], metricImg, MARGIN + (colW + colGap) * 2, y, colW, rowMaxH);
      }

      // ── Page 2: Equipment Comparison chart (own page) ────────────────────
      doc.addPage();
      y = HEADER_H + 6;
      availH = pageH - y - 22;

      drawChart(
        `Equipment Comparison — ${filters.metric} Overview`,
        groupedImg,
        MARGIN,
        y,
        contentW,
        availH - TITLE_H,
      );

      // ── Page 3+: table ────────────────────────────────────────────────────
      const pdfData = fullRows.map((row, idx) => ({
        sr: row.srNo ?? idx + 1,
        area: row.area,
        lineName: row.line,
        station: row.station,
        subStation: row.subStation,
        downUpTime: isMTTR ? row.breakDownTime : row.netAvailTime,
        failures: row.failures,
        metricVal: isMTTR ? row.mttr : row.mtbf,
        designTarget: isMTTR ? DESIGN_MTTR : DESIGN_MTBF,
        shift: row.shift,
        date: row.date,
      }));

      const pdfColumns = [
        { key: "sr", label: "Sr. No." },
        { key: "area", label: "Area", type: "primary" },
        { key: "lineName", label: "Line" },
        { key: "station", label: "Station" },
        { key: "subStation", label: "Equipment" },
        {
          key: "downUpTime",
          label: isMTTR ? "Down Time" : "Up Time",
          pdfValue: (item) => secToHHMMSS(item.downUpTime),
        },
        { key: "failures", label: "Failures" },
        isMTTR
          ? { key: "metricVal", label: "MTTR", type: "cycleTime", targetKey: "designTarget" }
          : { key: "metricVal", label: "MTBF", type: "actual", targetKey: "designTarget" },
        { key: "shift", label: "Shift", type: "shift" },
        { key: "date", label: "Date" },
      ];

      doc.addPage();
      const tableConfig = buildAutoTableConfig(pdfColumns, pdfData, doc, FONT);
      autoTable(doc, {
        ...tableConfig,
        startY: HEADER_H + 8,
        margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
        rowPageBreak: "avoid",
      });

      // ── Chrome on every page ──────────────────────────────────────────────
      const totalPagesInDoc = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPagesInDoc; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: totalPagesInDoc,
          fontFamily: FONT,
          title: `${filters.metric} Report`,
          subLines: i === 1 ? subLines : [],
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${fileBase}.pdf`);
    } catch (err) {
      console.error("[MTBF_MTTR] download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [
    hasSearched,
    categories,
    filters,
    dateFilter,
    totalRecords,
    isMTTR,
    areaOptions,
    lineOptions,
    stationOptions,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || masterLoading || reportLoading || bgTriggeredRef.current) return;
    if (categories.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, categories.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, masterLoading, reportLoading, categories.length, hasSearched]);

  if (masterLoading) return <div className="p-4"><ChartShimmer /></div>;

  return (
    <div className="w-full p-4 bg-gray-50 space-y-3">
      <FilterBar config={filterConfig} filters={filters} onChange={handleFiltersChange} />
      <DateRangeBar
        reportName={isMTTR ? "MTTR_Report" : "MTBF_Report"}
        showDownload
        onSearch={handleSearch}
        onDownload={handleDownload}
        selectedStartDate={dateFilter.startDate}
        selectedEndDate={dateFilter.endDate}
        isDownloading={downloading}
      />
      <SectionHeading metric={filters.metric} />

      {!hasSearched ? (
        <SearchPromptState pageName={filters.metric} />
      ) : reportLoading ? (
        <div className="space-y-4">
          <ChartShimmer />
          <TableShimmer rows={pageSize} />
        </div>
      ) : reportError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-sm font-semibold text-red-600 mb-1">Failed to load report</p>
          <p className="text-xs text-red-400">{reportError}</p>
        </div>
      ) : categories.length === 0 ? (
        <NoDataState />
      ) : (
        <>
          <div className="space-y-4">
            <div className={`grid gap-4 ${categories.length > 5 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"} bg-gray-50`}>
              <div ref={downUpChartRef}>
                <ChartCard title={isMTTR ? "Total Down Time" : "Total Up Time"} accentColor={isMTTR ? "#EF4444" : "#10B981"} icon={isMTTR ? TrendingDown : TrendingUp}>
                  <Chart type="bar" height={chartHeight} options={downUpBarOpts} series={downUpSeries} />
                </ChartCard>
              </div>
              <div ref={failureChartRef}>
                <ChartCard title="Number of Failures" accentColor="#F97316" icon={Activity}>
                  <Chart type="bar" height={chartHeight} options={failureBarOpts} series={failureSeries} />
                </ChartCard>
              </div>
              <div ref={metricChartRef}>
                <ChartCard title={filters.metric} accentColor="#8B5CF6" icon={TrendingUp}>
                  <Chart type="bar" height={chartHeight} options={metricBarOpts} series={metricSeries} />
                </ChartCard>
              </div>
            </div>

            <div ref={groupedChartRef} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="w-1 h-10 rounded-full bg-sky-500 flex-shrink-0" />
                <p className="text-sm font-bold text-gray-800 tracking-wide">
                  Equipment Comparison — {filters.metric} Overview
                </p>
              </div>
              <div className="px-3 pt-2 pb-1">
                <Chart type="bar" height={categories.length > 5 ? 400 : 340} options={groupedBarOpts} series={groupedSeries} />
              </div>
            </div>
          </div>

          <DataTable
            title={`${filters.metric} Detail Records`}
            columns={tableColumns}
            data={mappedTableData}
            isMTTR={isMTTR}
            serverPagination={{
              page,
              pageSize,
              totalRecords,
              totalPages,
              onPageChange: (newPage) => setPage(newPage),
              onPageSizeChange: (newSize) => { setPageSize(newSize); setPage(1); },
            }}
          />
        </>
      )}

      {categories.length > 0 && (
        <div
          style={{ position: "fixed", top: 0, left: "-9999px", width: categories.length > 5 ? `${Math.max(1200, categories.length * 120)}px` : "1200px", zIndex: -1 }}
          aria-hidden="true"
        >
          <div className={`grid gap-4 bg-gray-50 ${categories.length > 5 ? "grid-cols-1" : "grid-cols-3"}`}>
            <div ref={pdfDownUpChartRef}>
              <ChartCard title={isMTTR ? "Total Down Time" : "Total Up Time"} accentColor={isMTTR ? "#EF4444" : "#10B981"} icon={isMTTR ? TrendingDown : TrendingUp}>
                <Chart type="bar" height={chartHeight} options={downUpBarOpts} series={downUpSeries} />
              </ChartCard>
            </div>
            <div ref={pdfFailureChartRef}>
              <ChartCard title="Number of Failures" accentColor="#F97316" icon={Activity}>
                <Chart type="bar" height={chartHeight} options={failureBarOpts} series={failureSeries} />
              </ChartCard>
            </div>
            <div ref={pdfMetricChartRef}>
              <ChartCard title={filters.metric} accentColor="#8B5CF6" icon={TrendingUp}>
                <Chart type="bar" height={chartHeight} options={metricBarOpts} series={metricSeries} />
              </ChartCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MTBF_MTTR;