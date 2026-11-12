import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../sharedComponents/FilterBar";
import DataTable from "../../../sharedComponents/DataTable";
import EmptyState, {
  SearchPromptState,
  NoDataState,
} from "../../../sharedComponents/EmptyState";
import { alarmApi, masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import {
  formatClusterName,
  formatStationName,
  formatSubStationName,
} from "../../../utils/Formatters";
import {
  KPIShimmer,
  ChartShimmer,
  TableShimmer,
} from "../../../sharedComponents/Shimmer";
import { generateExcel } from "../../../utils/ExcelUtils";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../utils/PdfUtils";

const PAGE_NAME = "Alarm Report";

// ── Helpers ────────────────────────────────────────────────────────────────
const formatTime = (secs) => {
  if (!secs && secs !== 0) return "—";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const formatISODate = (iso) => {
  if (!iso) return "—";
  return iso.split("T")[0];
};

const formatISODateTime = (iso) => {
  if (!iso) return "—";
  const [date, time] = iso.split("T");
  return `${date} | ${(time || "").slice(0, 8)}`;
};

const opt = (value, label) => ({ value, label });

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="text-sm font-medium"
          style={{ color: entry.dataKey === "count" ? "#dc2626" : "#7c3aed" }}
        >
          {entry.name}:{" "}
          {entry.dataKey === "duration" ? formatTime(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
};

// ── Table columns ──────────────────────────────────────────────────────────
const TABLE_COLUMNS = [
  { key: "SrNo", label: "Sr. No." },
  { key: "Area", label: "Area", sortable: true },
  { key: "Line", label: "Line", type: "primary", sortable: true },
  { key: "Station", label: "Station", sortable: true },
  { key: "Equipment", label: "Equipment", sortable: true },
  {
    key: "AlarmCategory",
    label: "Alarm Category",
    type: "primary",
    sortable: true,
  },
  { key: "AlarmDescription", label: "Description", sortable: true },
  { key: "Shift", label: "Shift", type: "shift", sortable: true },
  { key: "AlarmDate", label: "Date", type: "mono", sortable: true },
  { key: "StartTime", label: "Start Time", type: "mono", sortable: true },
  { key: "EndTime", label: "End Time", type: "mono", sortable: true },
  { key: "Duration", label: "Duration (s)", sortable: true },
];

const PDF_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "Area", label: "Area" },
  { key: "Line", label: "Line", type: "primary" },
  { key: "Station", label: "Station" },
  { key: "Equipment", label: "Equipment" },
  { key: "AlarmCategory", label: "Alarm Category", type: "primary" },
  { key: "AlarmDescription", label: "Description" },
  { key: "Shift", label: "Shift", type: "shift" },
  { key: "AlarmDate", label: "Date" },
  { key: "StartTime", label: "Start Time" },
  { key: "EndTime", label: "End Time" },
  { key: "Duration", label: "Duration (s)" },
];

function downloadAlarmExcel(data, dateRange) {
  const headers = PDF_COLUMNS.map((col) => ({
    label: col.label,
    accessor: col.key === "sr" ? "sr" : col.key,
  }));
  const rows = data.map((row, i) => ({
    ...row,
    sr: i + 1,
    Area: formatClusterName(row.Area),
    Station: formatStationName(row.Station),
    Equipment: formatSubStationName(row.Equipment),
    AlarmDate: formatISODate(row.StartTime),
    StartTime: formatISODateTime(row.StartTime),
    EndTime: formatISODateTime(row.EndTime),
  }));
  const start = dateRange.startDate || "all";
  const end = dateRange.endDate || "all";
  generateExcel(headers, rows, `Alarm_Report_${start}_to_${end}`);
}

async function downloadAlarmPDF(
  chartRef,
  data,
  filters,
  clusterMap,
  dateRange,
  pagination,
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const MARGIN = 14;
  const HEADER_H = 40;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const start = dateRange.startDate || "All";
  const end = dateRange.endDate || "All";

  const areaName = clusterMap[filters.areaId]
    ? formatClusterName(clusterMap[filters.areaId])
    : "All";

  const subLines = [
    `Area: ${areaName}   |   Shift: ${filters.shifts && !filters.shifts.includes("ALL")
      ? filters.shifts.join(", ")
      : "All"
    }   |   Category: ${filters.alarmCategory || "All"}`,
    `Date Range: ${start}  to  ${end}   |   Total Records: ${(pagination.totalRecords ?? 0).toLocaleString()}`,
  ];

  const drawPageChrome = (pageNum, totalPages) =>
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily,
      title: "Alarm Report",
      subLines,
      jswImg,
      schaefflerImg,
    });

  // ── Page 1: Chart captured as image ──────────────────────────────
  let chartImgData = null;
  if (chartRef.current) {
    try {
      const { toPng } = await import("html-to-image");
      chartImgData = await toPng(chartRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
    } catch (e) {
      console.warn("Chart capture failed:", e.message);
    }
  }

  const FOOTER_H = 22;
  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;
  const maxImgH = pageH - contentTop - FOOTER_H;

  if (chartImgData) {
    const rect = chartRef.current.getBoundingClientRect();
    const aspect = rect.height / rect.width;
    const imgH = Math.min(contentW * aspect, maxImgH);
    doc.addImage(chartImgData, "PNG", MARGIN, contentTop, contentW, imgH, undefined, "FAST");
  }

  // ── Page 2+: Data table ──────────────────────────────────────────
  doc.addPage();

  const rows = data.map((row, i) => ({
    ...row,
    sr: i + 1,
    Area: formatClusterName(row.Area),
    Station: formatStationName(row.Station),
    Equipment: formatSubStationName(row.Equipment),
    AlarmDate: formatISODate(row.StartTime),
    StartTime: formatISODateTime(row.StartTime),
    EndTime: formatISODateTime(row.EndTime),
  }));

  autoTable(doc, {
    startY: HEADER_H + 8,
    ...buildAutoTableConfig(PDF_COLUMNS, rows, doc, fontFamily),
    tableWidth: "auto",
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`Alarm_Report_${start}_to_${end}.pdf`);
}

const SHIFT_OPTIONS = [
  opt("ALL", "All Shifts"),
  opt("A", "Shift A"),
  opt("B", "Shift B"),
  opt("C", "Shift C"),
];

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const DEFAULT_PAGE_SIZE = 10;

// ── Component ──────────────────────────────────────────────────────────────
export default function AlarmReport({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const location = useLocation();
  const navState = location.state ?? {};
  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);

  // Master data for cascading dropdowns
  const [masterData, setMasterData] = useState([]);

  const [filters, setFilters] = useState({
    areaId: "",
    lineId: navState.lineId ? Number(navState.lineId) : "",
    stationId: navState.stationId ? Number(navState.stationId) : "",
    equipmentId: navState.equipmentId ? Number(navState.equipmentId) : "",
    shifts: navState.shift ? [navState.shift] : ["A"],
    alarmCategory: "",
  });

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // API results
  const [kpiCards, setKpiCards] = useState(null);
  const [graph, setGraph] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [currentDateRange, setCurrentDateRange] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || navState.dateRange?.start || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || navState.dateRange?.end || null,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load alarm categories once from master table
  useEffect(() => {
    alarmApi
      .categories()
      .then((res) => {
        const data = res?.data || [];
        setCategoryOptions(data.map((c) => opt(c.Name, c.Name)));
      })
      .catch(console.error);
  }, []);

  // Load master data once
  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);

        const incomingLineId = navState.lineId ? String(navState.lineId) : null;

        if (targetFilters) {
          let matchedAreaId = "";
          let matchedLineId = "";
          let matchedStationId = "";
          let matchedEquipmentId = "";

          for (const cluster of data) {
            const areaMatches =
              !targetFilters.area && !targetFilters.areaId
                ? true
                : String(cluster.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                  String(cluster.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase();
            if (areaMatches) {
              matchedAreaId = cluster.ClusterId;
              for (const l of cluster.Lines ?? []) {
                const lineMatches =
                  !targetFilters.line && !targetFilters.lineId
                    ? true
                    : String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                      String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase();
                if (lineMatches) {
                  matchedLineId = l.LineId;
                  for (const st of l.Stations ?? []) {
                    const stMatches =
                      !targetFilters.station && !targetFilters.stationId
                        ? true
                        : targetFilters.station === "All" || targetFilters.stationId === "All"
                        ? true
                        : String(st.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                          String(st.StationName).toLowerCase() === String(targetFilters.station).toLowerCase();
                    if (stMatches) {
                      matchedStationId = st.StationId;
                      for (const sub of st.SubStations ?? []) {
                        const subMatches =
                          !targetFilters.equipment && !targetFilters.equipmentId && !targetFilters.substation
                            ? true
                            : targetFilters.equipment === "All" || targetFilters.substation === "All"
                            ? true
                            : String(sub.SubStationId) === String(targetFilters.equipmentId || targetFilters.equipment || targetFilters.substation) ||
                              String(sub.SubStationName).toLowerCase() === String(targetFilters.equipment || targetFilters.substation).toLowerCase();
                        if (subMatches) {
                          matchedEquipmentId = sub.SubStationId;
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

          let shifts = ["A"];
          if (targetFilters.shifts) {
            shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
          } else if (targetFilters.shift) {
            shifts = targetFilters.shift === "All" ? ["ALL"] : [targetFilters.shift];
          }

          setFilters({
            areaId: matchedAreaId || data[0]?.ClusterId || "",
            lineId: matchedLineId || data[0]?.Lines?.[0]?.LineId || "",
            stationId: matchedStationId || "",
            equipmentId: matchedEquipmentId || "",
            shifts: shifts.includes("All") ? ["ALL"] : shifts,
            alarmCategory: "",
          });
          setHasSearched(true);
        } else if (incomingLineId) {
          let areaId = "";
          for (const cluster of data) {
            const found = (cluster.Lines ?? []).find(
              (l) => String(l.LineId) === incomingLineId,
            );
            if (found) {
              areaId = cluster.ClusterId;
              break;
            }
          }
          setFilters((prev) => ({ ...prev, areaId }));
          if (navState.dateRange?.start) setHasSearched(true);
        } else {
          const firstCluster = data[0];
          setFilters((prev) => ({
            ...prev,
            areaId: firstCluster?.ClusterId ?? "",
          }));
        }
      })
      .catch(console.error);
  }, []);

  // ── ClusterId → ClusterName lookup ────────────────────────────────────
  const clusterMap = useMemo(() => {
    const map = {};
    masterData.forEach((c) => {
      map[c.ClusterId] = c.ClusterName;
    });
    return map;
  }, [masterData]);

  // ── Cascading dropdown options ─────────────────────────────────────────
  const areaOptions = useMemo(
    () =>
      masterData.map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const lines = filters.areaId
      ? masterData.find((c) => c.ClusterId === Number(filters.areaId))?.Lines ||
      []
      : masterData.flatMap((c) => c.Lines || []);
    return lines.map((l) => opt(l.LineId, l.LineName));
  }, [masterData, filters.areaId]);

  const stationOptions = useMemo(() => {
    if (!filters.lineId) return [];
    const line = masterData
      .flatMap((c) => c.Lines || [])
      .find((l) => l.LineId === Number(filters.lineId));
    return (line?.Stations || []).map((s) => opt(s.StationId, s.StationName));
  }, [masterData, filters.lineId]);

  const equipmentOptions = useMemo(() => {
    if (!filters.stationId) return [];
    const station = masterData
      .flatMap((c) => c.Lines || [])
      .flatMap((l) => l.Stations || [])
      .find((s) => s.StationId === Number(filters.stationId));
    return (station?.SubStations || []).map((s) =>
      opt(s.SubStationId, s.SubStationName),
    );
  }, [masterData, filters.stationId]);

  useEffect(() => {
    if (!lineOptions.length) return;
    const isValid = lineOptions.some(
      (o) => String(o.value) === String(filters.lineId),
    );
    if (isValid) return;
    setFilters((prev) => ({
      ...prev,
      lineId: lineOptions[0].value,
      stationId: "",
      equipmentId: "",
    }));
  }, [lineOptions]);

  useEffect(() => {
    if (!stationOptions.length) return;
    const isValid = stationOptions.some(
      (o) => String(o.value) === String(filters.stationId),
    );
    if (isValid) return;
    setFilters((prev) => ({
      ...prev,
      stationId: stationOptions[0].value,
      equipmentId: "",
    }));
  }, [stationOptions]);

  useEffect(() => {
    if (!equipmentOptions.length) return;
    const isValid = equipmentOptions.some(
      (o) => String(o.value) === String(filters.equipmentId),
    );
    if (isValid) return;
    setFilters((prev) => ({ ...prev, equipmentId: equipmentOptions[0].value }));
  }, [equipmentOptions]);

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "areaId", label: "Area", options: areaOptions },
      { type: "select", key: "lineId", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "stationId",
        label: "Station",
        options: stationOptions,
      },
      {
        type: "select",
        key: "equipmentId",
        label: "Equipment",
        options: equipmentOptions,
      },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
      {
        type: "select",
        key: "alarmCategory",
        label: "Alarm Category",
        options: [opt("", "All Categories"), ...categoryOptions],
      },
    ],
    [
      areaOptions,
      lineOptions,
      stationOptions,
      equipmentOptions,
      categoryOptions,
    ],
  );

  const areaHasNoData =
    hasSearched && Boolean(filters.areaId) && lineOptions.length === 0;

  const handleFilterChange = useCallback(
    (newFilters) => {
      const updated = { ...newFilters };
      if (newFilters.areaId !== filters.areaId) {
        const lines = newFilters.areaId
          ? masterData.find((c) => c.ClusterId === Number(newFilters.areaId))
            ?.Lines || []
          : masterData.flatMap((c) => c.Lines || []);
        const firstLine = lines[0];
        const firstStation = firstLine?.Stations?.[0];
        const firstEquipment = (firstStation?.SubStations || [])[0];
        updated.lineId = firstLine?.LineId ?? "";
        updated.stationId = firstStation?.StationId ?? "";
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }
      if (newFilters.lineId !== filters.lineId) {
        const line = masterData
          .flatMap((c) => c.Lines || [])
          .find((l) => l.LineId === Number(newFilters.lineId));
        const firstStation = line?.Stations?.[0];
        const firstEquipment = (firstStation?.SubStations || [])[0];
        updated.stationId = firstStation?.StationId ?? "";
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }
      if (newFilters.stationId !== filters.stationId) {
        const station = masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .find((s) => s.StationId === Number(newFilters.stationId));
        const firstEquipment = (station?.SubStations || [])[0];
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }

      const prevShifts = filters.shifts ?? ["ALL"];
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

      setFilters(updated);
    },
    [filters, masterData],
  );

  // ── Fetch ──────────────────────────────────────────────────────────────
  const abortRef = useRef(null);

  const fetchData = useCallback(
    async (startDate, endDate, page = 1) => {
      if (!filters.lineId) {
        setError("Please select a Line — it is required.");
        return;
      }

      const resolvedLine =
        masterData
          .flatMap((c) => c.Lines || [])
          .find((l) => l.LineId === Number(filters.lineId))?.LineName || null;
      const resolvedStation =
        masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .find((s) => s.StationId === Number(filters.stationId))
          ?.StationName || null;
      const resolvedEquipment =
        masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .flatMap((s) => s.SubStations || [])
          .find((e) => e.SubStationId === Number(filters.equipmentId))
          ?.SubStationName || null;

      // Cancel any in-flight request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      setLoading(true);
      setError(null);
      try {
        const res = await alarmApi.report(
          {
            ...(resolvedLine && { line: resolvedLine }),
            ...(resolvedStation && { station: resolvedStation }),
            ...(resolvedEquipment && { equipment: resolvedEquipment }),
            ...(filters.shifts &&
              !filters.shifts.includes("ALL") && { shift: filters.shifts.join(",") }),
            ...(filters.alarmCategory && {
              alarmCategory: filters.alarmCategory,
            }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            pageNo: page,
            pageSize,
          },
          signal,
        );

        if (signal.aborted) return;

        setKpiCards(res.kpiCards || null);
        setGraph(res.graph || []);
        setTableData(res.tableData || []);
        setPagination(
          res.pagination || {
            page: 1,
            pageSize,
            totalRecords: 0,
            totalPages: 0,
          },
        );
        setHasSearched(true);
      } catch (err) {
        if (err.name === "AbortError" || err.name === "CanceledError") return;
        setError(err.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [filters, pageSize, masterData],
  );

  const handleSearch = useCallback(
    (startDate, endDate) => {
      setCurrentDateRange({ startDate, endDate });
      fetchData(startDate, endDate, 1);
    },
    [fetchData],
  );

  useEffect(() => {
    if (!hasSearched) return;
    const timer = setTimeout(() => {
      fetchData(currentDateRange.startDate, currentDateRange.endDate, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, pageSize]);

  // Sync date range in background mode & trigger initial fetch
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setCurrentDateRange({ startDate: s, endDate: e });
      setHasSearched(true);
      fetchData(s, e, 1);
    }
  }, [isBg, targetDateRange, fetchData]);

  const handlePageChange = useCallback(
    (newPage) => {
      fetchData(currentDateRange.startDate, currentDateRange.endDate, newPage);
    },
    [fetchData, currentDateRange],
  );

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
  }, []);

  const handleDownload = useCallback(async () => {
    if (isDownloading || (tableData.length === 0 && !isBg)) return;
    setIsDownloading(true);
    try {
      const resolvedLine =
        masterData
          .flatMap((c) => c.Lines || [])
          .find((l) => l.LineId === Number(filters.lineId))?.LineName || null;
      const resolvedStation =
        masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .find((s) => s.StationId === Number(filters.stationId))
          ?.StationName || null;
      const resolvedEquipment =
        masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .flatMap((s) => s.SubStations || [])
          .find((e) => e.SubStationId === Number(filters.equipmentId))
          ?.SubStationName || null;

      const allRes = await alarmApi.report({
        ...(resolvedLine && { line: resolvedLine }),
        ...(resolvedStation && { station: resolvedStation }),
        ...(resolvedEquipment && { equipment: resolvedEquipment }),
        ...(filters.shifts &&
          !filters.shifts.includes("ALL") && { shift: filters.shifts.join(",") }),
        ...(filters.alarmCategory && { alarmCategory: filters.alarmCategory }),
        ...(currentDateRange.startDate && {
          startDate: currentDateRange.startDate,
        }),
        ...(currentDateRange.endDate && { endDate: currentDateRange.endDate }),
        pageNo: 1,
        pageSize: 100000,
      });
      const allData = allRes.tableData || [];

      await Promise.all([
        downloadAlarmPDF(
          chartRef,
          allData,
          filters,
          clusterMap,
          currentDateRange,
          pagination,
        ),
        Promise.resolve(downloadAlarmExcel(allData, currentDateRange)),
      ]);
    } catch (err) {
      console.error("AlarmReport download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [
    isDownloading,
    tableData,
    filters,
    masterData,
    clusterMap,
    currentDateRange,
    pagination,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || loading || bgTriggeredRef.current) return;
    if (tableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, loading, tableData.length, hasSearched]);

  // ── Format table rows ──────────────────────────────────────────────────
  const formattedTableData = useMemo(() => {
    const offset =
      ((pagination.page ?? 1) - 1) * (pagination.pageSize ?? pageSize);
    return tableData.map((row, i) => ({
      ...row,
      SrNo: offset + i + 1,
      Area: formatClusterName(row.Area),
      Station: formatStationName(row.Station),
      Equipment: formatSubStationName(row.Equipment),
      AlarmDate: formatISODate(row.StartTime),
      StartTime: formatISODateTime(row.StartTime),
      EndTime: formatISODateTime(row.EndTime),
    }));
  }, [tableData, pagination.page, pagination.pageSize, pageSize]);

  const serverPagination = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalRecords: pagination.totalRecords,
      totalPages: pagination.totalPages,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    }),
    [pagination, handlePageChange, handlePageSizeChange],
  );

  // ── Chart data ─────────────────────────────────────────────────────────
  const chartData = useMemo(
    () =>
      graph.map((g) => ({
        category: g.AlarmCategory,
        count: g.OccurrenceCount,
        duration: g.TotalDuration,
      })),
    [graph],
  );

  const noData = !hasSearched;
  const noResults = hasSearched && graph.length === 0 && tableData.length === 0;
  const chartConfig = useMemo(
    () => ({
      margin: {
        top: 20,
        right: isMobile ? 10 : 80,
        left: isMobile ? 0 : 60,
        bottom: 10,
      },
      xAxisTick: { fontSize: isMobile ? 11 : 14, fontWeight: 600 },
      xAxisAngle: isMobile ? -20 : 0,
      xAxisTextAnchor: isMobile ? "end" : "middle",
      xAxisHeight: isMobile ? 48 : 30,
      yLeftWidth: isMobile ? 30 : 60,
      yLeftTick: { fontSize: isMobile ? 9 : 11 },
      yRightWidth: isMobile ? 55 : 90,
      yRightTick: { fontSize: isMobile ? 9 : 11 },
      yLeftLabel: isMobile
        ? undefined
        : {
          value: "Alarm Count",
          angle: -90,
          position: "insideLeft",
          dx: -40,
          fill: "#991b1b",
          fontSize: 13,
          fontWeight: 600,
        },
      yRightLabel: isMobile
        ? undefined
        : {
          value: "Total Duration",
          angle: 90,
          position: "insideRight",
          dx: 65,
          fill: "#c2410c",
          fontSize: 13,
          fontWeight: 600,
        },
      legendStyle: { fontSize: 12 },
    }),
    [isMobile],
  );

  return (
    <div className="p-4 space-y-4">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />

      {/* Date Range + Search */}
      <DateRangeBar
        reportName="Alarm_Report"
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        showDownload
        showDateInputs
        selectedStartDate={currentDateRange.startDate ?? ""}
        selectedEndDate={currentDateRange.endDate ?? ""}
      />

      {areaHasNoData ? (
        <NoDataState />
      ) : (
        <>
          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Chart / KPI Card */}
          <div
            ref={chartRef}
            className="bg-white rounded-xl shadow-lg p-5 w-full relative"
          >
            {/* Loading overlay — shown on re-fetch so existing content stays visible */}
            {loading && hasSearched && (
              <div className="absolute inset-0 bg-white/60 rounded-xl z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
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
            {loading && !hasSearched ? (
              <>
                <KPIShimmer />
                <ChartShimmer />
              </>
            ) : noData ? (
              <SearchPromptState pageName={PAGE_NAME} />
            ) : noResults && !loading ? (
              <NoDataState />
            ) : (
              <>
                {/* KPI Cards */}
                <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">
                      Total Alarms
                    </p>
                    <p className="text-2xl font-bold text-red-900 mt-1">
                      {(kpiCards?.TotalAlarms ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide">
                      Total Duration
                    </p>
                    <p className="text-2xl font-bold text-orange-900 mt-1">
                      {formatTime(kpiCards?.TotalDuration)}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wide">
                      MTTR
                    </p>
                    <p className="text-2xl font-bold text-yellow-900 mt-1">
                      {kpiCards?.MTTR ?? "—"}
                      <span className="text-sm font-normal ml-1">min</span>
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-red-200">
                    <p className="text-xs text-red-500 font-semibold uppercase tracking-wide">
                      MTBF
                    </p>
                    <p className="text-2xl font-bold text-orange-800 mt-1">
                      {kpiCards?.MTBF ?? "—"}
                      <span className="text-sm font-normal ml-1">min</span>
                    </p>
                  </div>
                </div>

                {/* Chart — Alarm Count & Duration by Category */}
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
                  Alarms by Category
                </p>
                <div className="h-[280px] w-full sm:h-[360px] lg:h-[460px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={chartConfig.margin}>
                      <defs>
                        <linearGradient
                          id="alarmGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#dc2626"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#f87171"
                            stopOpacity={1}
                          />
                        </linearGradient>

                        <linearGradient
                          id="durationGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#7c3aed"
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor="#a78bfa"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="category"
                        tick={chartConfig.xAxisTick}
                        angle={chartConfig.xAxisAngle}
                        textAnchor={chartConfig.xAxisTextAnchor}
                        height={chartConfig.xAxisHeight}
                        interval={0}
                      />
                      <YAxis
                        yAxisId="left"
                        width={chartConfig.yLeftWidth}
                        tick={chartConfig.yLeftTick}
                        label={chartConfig.yLeftLabel}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        width={chartConfig.yRightWidth}
                        tick={chartConfig.yRightTick}
                        tickFormatter={formatTime}
                        label={chartConfig.yRightLabel}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={chartConfig.legendStyle}
                      />

                      <Bar
                        yAxisId="left"
                        dataKey="count"
                        fill="url(#alarmGradient)"
                        name="Alarm Count"
                        radius={[4, 4, 0, 0]}
                      >
                        <LabelList
                          dataKey="count"
                          position="top"
                          fill="#dc2626"
                          fontSize={13}
                          fontWeight={700}
                        />
                      </Bar>
                      <Bar
                        yAxisId="right"
                        dataKey="duration"
                        fill="url(#durationGradient)"
                        name="Total Duration (s)"
                        radius={[4, 4, 0, 0]}
                      >
                        <LabelList
                          dataKey="duration"
                          position="top"
                          fill="#7c3aed"
                          fontSize={13}
                          fontWeight={700}
                          formatter={formatTime}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          {loading && !hasSearched ? (
            <TableShimmer rows={8} />
          ) : hasSearched && tableData.length > 0 ? (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 bg-white/60 rounded-xl z-10" />
              )}
              <DataTable
                columns={TABLE_COLUMNS}
                data={formattedTableData}
                title={`Alarm Records — ${(pagination.totalRecords ?? 0).toLocaleString()} total`}
                defaultRows={10}
                serverPagination={serverPagination}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
