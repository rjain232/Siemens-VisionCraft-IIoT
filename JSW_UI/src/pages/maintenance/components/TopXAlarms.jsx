import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import {
  formatClusterName,
  formatStationName,
} from "../../../utils/Formatters";
import DataTable from "../../../sharedComponents/DataTable";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import { alarmApi, masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import { ChartShimmer, TableShimmer } from "../../../sharedComponents/Shimmer";
import { generateExcel } from "../../../utils/ExcelUtils";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../utils/PdfUtils";

const opt = (value, label) => ({ value, label: label ?? value });

function formatTime(value) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const VIEW_TYPE_MAP = {
  "By Equipment": "Equipment",
  "By Duration": "Duration",
  "By Frequency of Occurrence": "Frequency",
};

// ── Download helpers ──────────────────────────────────────────────────────

function downloadTopXExcel(apiData, filters, dateFilter, isFrequency, n) {
  const codeHeader =
    filters.viewType === "By Equipment"
      ? "Equipment Name"
      : "Alarm Description";
  const headers = [
    { label: "Sr. No.", accessor: "sr" },
    { label: "Date Range", accessor: "FromDate" },
    { label: codeHeader, accessor: "Code" },
    isFrequency
      ? { label: "Frequency (Count)", accessor: "Count" }
      : { label: "Total Duration (sec)", accessor: "Count" },
  ];
  const start = dateFilter.startDate || "all";
  const end = dateFilter.endDate || "all";
  generateExcel(
    headers,
    apiData,
    `Top_${n}_Alarms_${filters.viewType.replace(/\s+/g, "_")}_${start}_to_${end}`,
  );
}

async function downloadTopXPDF(
  contentRef,
  apiData,
  filters,
  dateFilter,
  isFrequency,
  summary,
  n,
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const MARGIN = 14;
  const HEADER_H = 40;
  const pageW = doc.internal.pageSize.getWidth();

  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const start = dateFilter.startDate || "All";
  const end = dateFilter.endDate || "All";

  const subLines = [
    `Area: ${formatClusterName(filters.area)}   |   Line: ${filters.line}   |   Station: ${filters.station}   |   Equipment: ${filters.equipment}`,
    `View By: ${filters.viewType}   |   Date Range: ${start}  to  ${end}   |   Total Records: ${(summary?.TotalRecords ?? 0).toLocaleString()}`,
  ];

  const drawPageChrome = (pageNum, totalPages) =>
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily,
      title: `Top ${n} Alarms — ${filters.viewType}`,
      subLines,
      jswImg,
      schaefflerImg,
    });

  // ── Page 1: chart captured as image ──────────────────
  let contentImgData = null;
  if (contentRef.current) {
    try {
      const { toPng } = await import("html-to-image");
      const _style = document.createElement("style");
      _style.textContent =
        "text.recharts-label-list { fill: #1e293b !important; }";
      document.head.appendChild(_style);
      try {
        contentImgData = await toPng(contentRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });
      } finally {
        document.head.removeChild(_style);
      }
    } catch (e) {
      console.warn("Content capture failed:", e.message);
    }
  }

  const pageH = doc.internal.pageSize.getHeight();
  const FOOTER_H = 22;
  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;
  const maxImgH = pageH - contentTop - FOOTER_H;

  if (contentImgData) {
    doc.addImage(contentImgData, "PNG", MARGIN, contentTop, contentW, maxImgH);
  }

  // ── Page 2+: Data table──────────────
  doc.addPage();

  const codeHeader =
    filters.viewType === "By Equipment"
      ? "Equipment Name"
      : "Alarm Description";
  const pdfColumns = [
    { key: "sr", label: "Sr. No." },
    { key: "FromDate", label: "Date Range" },
    { key: "Code", label: codeHeader, type: "primary" },
    isFrequency
      ? { key: "Count", label: "Frequency (Count)", type: "primary" }
      : { key: "Count", label: "Total Duration (sec)", type: "primary" },
  ];

  autoTable(doc, {
    startY: HEADER_H + 8,
    ...buildAutoTableConfig(pdfColumns, apiData, doc, fontFamily),
    tableWidth: "auto",
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`Top_${n}_Alarms_${start}_to_${end}.pdf`);
}

const BAR_COLORS = [
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  "#0284c7",
  "#0369a1",
  "#1e3a8a",
  "#1d4ed8",
  "#0c4a6e",
  "#164e63",
];

const CustomXAxisTickVertical = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      transform="rotate(-90)"
      x={0}
      y={0}
      dy="0.35em"
      textAnchor="end"
      fill="#374151"
      fontSize={12}
      fontWeight={600}
    >
      {payload.value}
    </text>
  </g>
);

const CustomXAxisTickWrapped = ({ x, y, payload }) => {
  const value = payload.value || "";
  const maxLen = 20;
  const words = value.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current && (current + " " + word).length > maxLen) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return (
    <g transform={`translate(${x},${y + 6})`}>
      {lines.map((line, i) => (
        <text
          key={i}
          y={i * 14}
          textAnchor="middle"
          fill="#374151"
          fontSize={12}
          fontWeight={i === 0 ? 600 : 400}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

function CustomTooltip({ active, payload, useFrequency }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-gray-800 mb-1">{d.Code}</p>
      <p className="text-sky-700">
        {useFrequency ? "Frequency" : "Duration"}:{" "}
        <span className="font-bold">
          {useFrequency ? d.Count?.toLocaleString() : formatTime(d.Count)}
        </span>
      </p>
    </div>
  );
}

const BarGraphSafetyAlarm = memo(function BarGraphSafetyAlarm({
  Top10alarmData = [],
  viewType = "",
}) {
  const useFrequency = viewType === "By Frequency of Occurrence";
  const dataKey = "Count";
  const yLabel = useFrequency ? "Frequency" : "Duration (HH:MM:SS)";
  const isWrapped = Top10alarmData.length <= 5;

  return (
    <div className="bg-white rounded-b-xl px-4 pt-6 pb-16 w-full">
      <div
        style={{
          width: "100%",
          height: isWrapped
            ? useFrequency
              ? 480
              : 440
            : useFrequency
              ? 600
              : 560,
          overflow: "visible",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={Top10alarmData}
            margin={{ top: 32, right: 30, left: 20, bottom: 20 }}
            style={{ overflow: "visible" }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="Code"
              tick={
                isWrapped ? (
                  <CustomXAxisTickWrapped />
                ) : (
                  <CustomXAxisTickVertical />
                )
              }
              interval={0}
              height={isWrapped ? 80 : 300}
            />
            <YAxis
              tickFormatter={(v) =>
                useFrequency ? v.toLocaleString() : formatTime(v)
              }
              tick={{ fontSize: 13, fill: "#6b7280" }}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                offset: -5,
                style: { fontSize: 13, fontWeight: 600, fill: "#0369a1" },
              }}
              width={80}
            />
            <Tooltip content={<CustomTooltip useFrequency={useFrequency} />} />
            <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} maxBarSize={60}>
              {Top10alarmData.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
              <LabelList
                dataKey={dataKey}
                position="top"
                formatter={(v) =>
                  useFrequency ? v?.toLocaleString() : formatTime(v)
                }
                style={{ fontSize: 12, fontWeight: 700, fill: "#1f2937" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

const VIEW_TYPE_OPTIONS = [
  "By Equipment",
  "By Duration",
  "By Frequency of Occurrence",
].map((v) => opt(v));

const TOP_COUNT_OPTIONS = [5, 10, 15, 20].map((n) => opt(String(n), String(n)));

const VIEW_META = {
  "By Equipment": {
    subtitle: "Shows faults generated by particular equipment",
    tableHeader: "Equipment Name",
    badge: "Equipment",
  },
  "By Duration": {
    subtitle: "Shows total duration for each fault type",
    tableHeader: "Alarm Description",
    badge: "Duration",
  },
  "By Frequency of Occurrence": {
    subtitle: "Shows most frequently occurring fault types",
    tableHeader: "Alarm Description",
    badge: "Frequency",
  },
};

export default function TopXAlarms({
  topCount = 10,
  setTopCount = () => { },
  setActiveTab = () => { },
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

  const abortRef = useRef(null);
  const contentRef = useRef(null);

  // Abort any in-flight request on unmount
  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);
  const [isDownloading, setIsDownloading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [summary, setSummary] = useState(null);

  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });
  const [masterData, setMasterData] = useState([]);

  const [filters, setFilters] = useState({
    area: "",
    line: "",
    station: "",
    equipment: "",
    viewType: VIEW_TYPE_OPTIONS[0].value,
    topCount: String(topCount || 10),
  });

  useEffect(() => {
    setActiveTab(`Top ${topCount} Alarms`);
  }, [topCount]);

  // Load master data and set initial filter defaults
  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);

        if (targetFilters) {
          let matchedArea = "";
          let matchedLine = "";
          let matchedStation = "";
          let matchedEquipment = "All";

          for (const cluster of data) {
            const areaMatches =
              !targetFilters.area && !targetFilters.areaId
                ? true
                : String(cluster.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                  String(cluster.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase();
            if (areaMatches) {
              matchedArea = cluster.ClusterName;
              for (const l of cluster.Lines ?? []) {
                const lineMatches =
                  !targetFilters.line && !targetFilters.lineId
                    ? true
                    : String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                      String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase();
                if (lineMatches) {
                  matchedLine = l.LineName;
                  for (const st of l.Stations ?? []) {
                    const stMatches =
                      !targetFilters.station && !targetFilters.stationId
                        ? true
                        : targetFilters.station === "All" || targetFilters.stationId === "All"
                        ? true
                        : String(st.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                          String(st.StationName).toLowerCase() === String(targetFilters.station).toLowerCase();
                    if (stMatches) {
                      matchedStation = st.StationName;
                      for (const sub of st.SubStations ?? []) {
                        const subMatches =
                          !targetFilters.equipment && !targetFilters.equipmentId && !targetFilters.substation
                            ? true
                            : targetFilters.equipment === "All" || targetFilters.substation === "All"
                            ? true
                            : String(sub.SubStationId) === String(targetFilters.equipmentId || targetFilters.equipment || targetFilters.substation) ||
                              String(sub.SubStationName).toLowerCase() === String(targetFilters.equipment || targetFilters.substation).toLowerCase();
                        if (subMatches) {
                          matchedEquipment = sub.SubStationName;
                          break;
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              }
              break;
            }
          }

          setFilters((prev) => ({
            ...prev,
            area: matchedArea || data[0]?.ClusterName || "",
            line: matchedLine || data[0]?.Lines?.[0]?.LineName || "",
            station: matchedStation || "",
            equipment: matchedEquipment,
          }));
          setHasSearched(true);
        } else {
          const firstCluster = data[0];
          const firstLine =
            firstCluster?.Lines?.find((l) => (l.Stations || []).length > 0) ||
            firstCluster?.Lines?.[0];
          const firstStation = firstLine?.Stations?.[0];
          setFilters((prev) => ({
            ...prev,
            area: prev.area || firstCluster?.ClusterName || "",
            line: prev.line || firstLine?.LineName || "",
            station: prev.station || firstStation?.StationName || "",
            equipment: prev.equipment || "All",
          }));
        }
      })
      .catch(console.error);
  }, []);

  const areaOptions = useMemo(
    () =>
      masterData.map((c) =>
        opt(c.ClusterName, formatClusterName(c.ClusterName)),
      ),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const cluster = masterData.find((c) => c.ClusterName === filters.area);
    const lines = cluster
      ? cluster.Lines || []
      : masterData.flatMap((c) => c.Lines || []);
    return lines.map((l) => opt(l.LineName, l.LineName));
  }, [masterData, filters.area]);

  const stationOptions = useMemo(() => {
    const line = masterData
      .flatMap((c) => c.Lines || [])
      .find((l) => l.LineName === filters.line);
    return (line?.Stations || []).map((s) =>
      opt(s.StationName, formatStationName(s.StationName)),
    );
  }, [masterData, filters.line]);

  const equipmentOptions = useMemo(() => {
    const station = masterData
      .flatMap((c) => c.Lines || [])
      .flatMap((l) => l.Stations || [])
      .find((s) => s.StationName === filters.station);
    const subStations = (station?.SubStations || []).map((ss) =>
      opt(ss.SubStationName, ss.SubStationName),
    );
    return [opt("All", "All Equipment"), ...subStations];
  }, [masterData, filters.station]);

  useEffect(() => {
    if (!lineOptions.length) return;
    const isValid = lineOptions.some((o) => o.value === filters.line);
    if (isValid) return;
    setFilters((prev) => ({
      ...prev,
      line: lineOptions[0].value,
      station: "",
      equipment: "All",
    }));
  }, [lineOptions]);

  useEffect(() => {
    if (!stationOptions.length) return;
    const isValid = stationOptions.some((o) => o.value === filters.station);
    if (isValid) return;
    setFilters((prev) => ({
      ...prev,
      station: stationOptions[0].value,
      equipment: "All",
    }));
  }, [stationOptions]);

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
      {
        type: "select",
        key: "equipment",
        label: "Equipment",
        options: equipmentOptions,
      },
      {
        type: "select",
        key: "viewType",
        label: "View By",
        options: VIEW_TYPE_OPTIONS,
      },
      {
        type: "select",
        key: "topCount",
        label: "Select Top",
        options: TOP_COUNT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions, stationOptions, equipmentOptions],
  );

  const handleFilterChange = (newFilters) => {
    const updated = { ...newFilters };

    if (newFilters.area !== filters.area) {
      const cluster = masterData.find((c) => c.ClusterName === newFilters.area);
      const firstLine = cluster?.Lines?.find(
        (l) => (l.Stations || []).length > 0,
      );
      const firstStation = firstLine?.Stations?.[0];
      updated.line = firstLine?.LineName ?? "";
      updated.station = firstStation?.StationName ?? "";
      updated.equipment = "All";
    }

    if (newFilters.line !== filters.line) {
      const line = masterData
        .flatMap((c) => c.Lines || [])
        .find((l) => l.LineName === newFilters.line);
      const firstStation = line?.Stations?.[0];
      updated.station = firstStation?.StationName ?? "";
      updated.equipment = "All";
    }

    if (newFilters.station !== filters.station) {
      updated.equipment = "All";
    }

    if (newFilters.topCount !== filters.topCount) {
      const n = Number(newFilters.topCount);
      if (n > 0) {
        setTopCount(n);
        setActiveTab(`Top ${n} Alarms`);
      }
    }

    setFilters(updated);
  };

  const fetchData = useCallback(async (startDate, endDate, currentFilters) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const res = await alarmApi.topXAlarms(
        {
          areaName: currentFilters.area,
          lineName: currentFilters.line,
          stationName: currentFilters.station,
          equipmentName:
            currentFilters.equipment !== "All"
              ? currentFilters.equipment
              : undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          viewType: VIEW_TYPE_MAP[currentFilters.viewType] ?? "Frequency",
          topCount: Number(currentFilters.topCount) || 10,
        },
        controller.signal,
      );

      if (res.success) {
        const formatted = (res.data || []).map((row, idx) => ({
          ...row,
          sr: idx + 1,
          FromDate: `${row.FromDate ? row.FromDate.slice(0, 10) : "—"} — ${row.ToDate ? row.ToDate.slice(0, 10) : "—"}`,
        }));
        setApiData(formatted);
        setSummary(res.summary || null);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to load data.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasSearched || !filters.topCount) return;
    const timer = setTimeout(() => {
      fetchData(dateFilter.startDate, dateFilter.endDate, filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleSearch = (startDate, endDate) => {
    const activeTopCount = filters.topCount || String(topCount || 10);
    if (!TOP_COUNT_OPTIONS.some((o) => o.value === activeTopCount)) {
      showToast("Please select a Top Count before searching.");
      return;
    }
    const activeFilters = {
      ...filters,
      topCount: activeTopCount,
    };
    if (!activeFilters.line && masterData.length > 0) {
      const cluster =
        masterData.find((c) => c.ClusterName === activeFilters.area) ||
        masterData[0];
      const firstLine =
        cluster?.Lines?.find((l) => (l.Stations || []).length > 0) ||
        cluster?.Lines?.[0];
      const firstStation = firstLine?.Stations?.[0];
      activeFilters.area = activeFilters.area || cluster?.ClusterName || "";
      activeFilters.line = firstLine?.LineName || "";
      activeFilters.station = firstStation?.StationName || "";
    }
    setDateFilter({ startDate, endDate });
    setHasSearched(true);
    fetchData(startDate, endDate, activeFilters);
  };

  const n = Number(filters.topCount) || 5;
  const meta = VIEW_META[filters.viewType] ?? VIEW_META["By Equipment"];

  const isFrequency = filters.viewType === "By Frequency of Occurrence";

  const handleDownload = useCallback(async () => {
    if (isDownloading || (apiData.length === 0 && !isBg)) return;
    setIsDownloading(true);
    try {
      await Promise.all([
        downloadTopXPDF(
          contentRef,
          apiData,
          filters,
          dateFilter,
          isFrequency,
          summary,
          n,
        ),
        Promise.resolve(
          downloadTopXExcel(apiData, filters, dateFilter, isFrequency, n),
        ),
      ]);
    } catch (err) {
      console.error("TopXAlarms download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, apiData, filters, dateFilter, isFrequency, summary, n]);

  // Sync dateFilter in background mode & trigger initial fetch
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateFilter({ startDate: s, endDate: e });
      setHasSearched(true);
      fetchData(s, e, filters);
    }
  }, [isBg, targetDateRange, fetchData]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || isLoading || bgTriggeredRef.current) return;
    if (apiData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, apiData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, isLoading, apiData.length, hasSearched]);

  const tableColumns = [
    { key: "sr", label: "Sr. No." },
    { key: "FromDate", label: "Date Range", type: "mono", sortable: true },
    { key: "Code", label: meta.tableHeader, type: "primary", sortable: true },
    isFrequency
      ? {
        key: "Count",
        label: "Frequency (Count)",
        type: "primary",
        sortable: true,
      }
      : {
        key: "Count",
        label: "Total Duration (sec)",
        type: "primary",
        sortable: true,
      },
  ];

  return (
    <div className="pt-4 px-4 space-y-4">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-red-600 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg animate-fadeIn">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {toast}
        </div>
      )}

      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />

      <DateRangeBar
        reportName="Top_X_Alarms"
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        showDownload
        showDateInputs
        selectedStartDate={dateFilter.startDate ?? ""}
        selectedEndDate={dateFilter.endDate ?? ""}
      />

      {!hasSearched ? (
        <EmptyState
          color="sky"
          subtitle="Select filters and click Search  view Top X Alarms"
        />
      ) : isLoading && apiData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <ChartShimmer />
          <TableShimmer rows={6} />
        </div>
      ) : error ? (
        <EmptyState
          color="red"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          )}
          title="Failed to load data"
          subtitle={error}
        />
      ) : apiData.length === 0 ? (
        <NoDataState />
      ) : (
        <>
          {/* ── Chart + Table captured together for PDF ─────────── */}
          <div ref={contentRef} className="space-y-4">
            {/* ── Chart Card ─────────────────────────────────────────── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative">
              {/* Loading overlay on re-fetch */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                    <svg
                      className="animate-spin h-4 w-4 text-sky-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Updating…
                  </div>
                </div>
              )}

              {/* Card header */}
              <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {meta.badge}
                  </span>
                </div>
                <h2 className="text-gray-800 text-lg font-bold leading-tight">
                  Top {n} Alarms
                </h2>
                <p className="text-gray-400 text-sm mt-0.5">{meta.subtitle}</p>
              </div>

              <BarGraphSafetyAlarm
                Top10alarmData={apiData}
                viewType={filters.viewType}
              />
            </div>
          </div>
          {/* end contentRef */}

          {/* ── Data Table ─────────────────────────────────────────── */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 rounded-xl z-10" />
            )}
            <DataTable
              columns={tableColumns}
              data={apiData}
              title={`Top ${n} Alarms — Detailed Data`}
              defaultRows={10}
            />
          </div>
        </>
      )}
    </div>
  );
}
