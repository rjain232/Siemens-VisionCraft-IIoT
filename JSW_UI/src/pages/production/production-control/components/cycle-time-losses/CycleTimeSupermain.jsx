import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Cell,
  ResponsiveContainer,
} from "recharts";
import FilterBar from "../../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../../sharedComponents/DataTable";
import { cycleTimeApi } from "../../../../../services/api";
import { useBackgroundExport } from "../../../../../context/BackgroundExportContext";
import appConfig from "../../../../../config/appConfig";
import {
  formatClusterName,
  formatStationName,
  formatSubStationName,
} from "../../../../../utils/Formatters";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../../sharedComponents/Shimmer";
import { SearchPromptState, NoDataState } from "../../../../../sharedComponents/EmptyState";

const opt = (value, label) => ({ value, label });

// ── Table columns ──────────────────────────────────────────────────────────
const tableColumns = [
  { key: "sr", label: "Sr. No." },
  { key: "EndDateTime", label: "Date & Time", type: "mono", sortable: true },
  { key: "Line", label: "Line", type: "primary", sortable: true },
  { key: "StationName", label: "Station", sortable: true },
  { key: "SubStation", label: "Equipment", sortable: true },
  { key: "CabinNo", label: "BIW No.", type: "primary", sortable: true },
  { key: "Model", label: "Model", sortable: true },
  {
    key: "ActualCT",
    label: "Actual CT",
    sortable: true,
    type: "cycleTime",
    targetKey: "DesignCT",
    render: (item) => {
      const value = item.ActualCT;
      const design = item.DesignCT;
      const exceeded = design !== undefined && value > design;
      const delta = design !== undefined ? Math.abs(value - design) : 0;
      return (
        <div className="flex items-center justify-center gap-2">
          <span
            className={`text-sm font-bold tabular-nums ${exceeded ? "text-red-600" : "text-emerald-600"}`}
          >
            {value}
          </span>
          {exceeded && delta > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-red-500 bg-red-50 border border-red-100 rounded px-1.5 py-0.5">
              ▲{delta}
            </span>
          )}
          {!exceeded && delta > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">
              ▼{delta}
            </span>
          )}
        </div>
      );
    },
  },
  { key: "DesignCT", label: "Design CT", sortable: true },
];

// ── Custom chart components ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const exceeded = item.ActualCT > item.DesignCT;
  const color = exceeded ? "#dc2626" : "#10b981";
  return (
    <div
      style={{
        padding: 10,
        border: `2px solid ${color}`,
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#0f172a" }}>
        BIW: {item.CabinNo}
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Actual CT: <b style={{ color: "#0f172a" }}>{item.ActualCT}s</b>
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Design CT: <b style={{ color: "#0f172a" }}>{item.DesignCT}s</b>
      </div>
    </div>
  );
};

const CustomLegend = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 24,
      fontSize: 12,
      marginTop: 8,
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 2,
          background: "#10b981",
          display: "inline-block",
        }}
      />
      Actual CT
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 2,
          background: "#dc2626",
          display: "inline-block",
        }}
      />
      Exceeded
    </span>
  </div>
);

// ── Excel download ─────────────────────────────────────────────────────────
async function downloadExcelFile(allRows) {
  const { generateExcel } = await import("../../../../../utils/ExcelUtils");
  const cols = [
    { label: "Sr. No.", accessor: "sr" },
    { label: "Date & Time", accessor: "EndDateTime" },
    { label: "Line", accessor: "Line" },
    { label: "Station", accessor: "StationName" },
    { label: "Equipment", accessor: "SubStation" },
    { label: "BIW No.", accessor: "CabinNo" },
    { label: "Model", accessor: "Model" },
    { label: "Actual CT", accessor: "ActualCT" },
    { label: "Design CT", accessor: "DesignCT" },
  ];
  generateExcel(cols, allRows, "Cycle_Time_Overview");
}

// ── Chart capture helpers ──────────────────────────────────────────────────
const cssPropName = (c) => c.replace(/([A-Z])/g, "-$1").toLowerCase();
const oklchToRgb = (v) => {
  if (!v || v.includes("transparent")) return null;
  if (v.toLowerCase().includes("oklch")) {
    const m = v.match(
      /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/,
    );
    if (m) {
      const [L, , H] = [
        parseFloat(m[1]),
        parseFloat(m[2]),
        parseFloat(m[3]),
      ];
      if (H >= 95 && H <= 105 && L >= 60) return "rgb(16, 185, 129)";
      if (H >= 0 && H <= 10 && L >= 50) return "rgb(244, 63, 94)";
      if (H >= 250 && H <= 260 && L >= 55) return "rgb(37, 99, 235)";
      if (L >= 90) return "rgb(255, 255, 255)";
      if (L <= 20) return "rgb(30, 30, 30)";
      return "rgb(200, 200, 200)";
    }
  }
  return null;
};

async function captureChartImage(ref) {
  if (!ref.current) return null;
  const overrides = [];
  let origBg = "", origParentBg = "";
  try {
    const el = ref.current;
    origBg = el.style.backgroundColor;
    origParentBg = el.parentElement?.style.backgroundColor ?? "";
    el.style.backgroundColor = "#ffffff";
    if (el.parentElement)
      el.parentElement.style.backgroundColor = "#ffffff";

    const allEls = [el, ...el.querySelectorAll("*")];
    const colorProps = [
      "color", "backgroundColor", "borderTopColor",
      "borderRightColor", "borderBottomColor", "borderLeftColor",
      "fill", "stroke",
    ];
    allEls.forEach((e) => {
      const isSvgEl = e instanceof SVGElement;
      const cs = window.getComputedStyle(e);
      colorProps.forEach((p) => {
        if (isSvgEl && (p === "fill" || p === "stroke") && e.hasAttribute(p)) return;
        const val = cs[p];
        if (val && val.includes("oklch")) {
          const rgb = oklchToRgb(val);
          if (rgb) {
            const cp = cssPropName(p);
            overrides.push({ el: e, prop: cp, original: e.style.getPropertyValue(cp) });
            e.style.setProperty(cp, rgb, "important");
          }
        }
      });
    });
    allEls.forEach((e) => {
      const bg = window.getComputedStyle(e).backgroundColor;
      if (bg && bg.includes("rgba")) {
        const m2 = bg.match(/rgba?\((.*?)\)/);
        if (m2) {
          const parts = m2[1].split(",").map((p) => p.trim());
          if (parts.length >= 3) {
            const alpha = parts[3] ? parseFloat(parts[3]) : 1;
            const solid = alpha < 0.3
              ? "rgb(255,255,255)"
              : `rgb(${parts[0]},${parts[1]},${parts[2]})`;
            overrides.push({ el: e, prop: "background-color", original: e.style.getPropertyValue("background-color") });
            e.style.setProperty("background-color", solid, "important");
          }
        }
      }
    });

    const svgs = el.querySelectorAll("svg");
    svgs.forEach((svg) => {
      overrides.push({ el: svg, prop: "overflow", original: svg.style.overflow });
      svg.style.overflow = "visible";
      svg.querySelectorAll("[clip-path]").forEach((node) => {
        overrides.push({ el: node, prop: "clip-path", original: node.getAttribute("clip-path"), isAttr: true });
        node.removeAttribute("clip-path");
      });
    });

    await new Promise((r) => setTimeout(r, 200));

    const rect = el.getBoundingClientRect();
    const aspect = rect.width > 0 ? rect.height / rect.width : 0.5;

    try {
      const { toPng } = await import("html-to-image");
      const imgData = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width: rect.width,
        height: rect.height,
      });
      return { imgData, aspect };
    } catch (toPngErr) {
      console.warn("toPng failed, falling back to html2canvas:", toPngErr);
    }

    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });
    return { imgData: canvas.toDataURL("image/png"), aspect };
  } catch (e) {
    console.warn("Chart capture failed:", e.message);
    return null;
  } finally {
    if (ref.current) {
      ref.current.style.backgroundColor = origBg;
      if (ref.current.parentElement)
        ref.current.parentElement.style.backgroundColor = origParentBg;
    }
    overrides.forEach(({ el, prop, original, isAttr }) => {
      if (isAttr) {
        original ? el.setAttribute(prop, original) : el.removeAttribute(prop);
      } else {
        original ? el.style.setProperty(prop, original) : el.style.removeProperty(prop);
      }
    });
  }
}

// ── PDF download ───────────────────────────────────────────────────────────
async function downloadPDFFile(chartRef, allRows, dateFilter, filterLabels) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const {
    loadBrandingLogos,
    drawPdfPageChrome,
    loadKarlaFont,
    buildAutoTableConfig,
  } = await import("../../../../../utils/PdfUtils");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const FONT = await loadKarlaFont(doc);
  const pageW = doc.internal.pageSize.getWidth();
  const MARGIN = 14;
  const HEADER_H = 40;

  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const from = dateFilter?.startDate ?? "—";
  const to = dateFilter?.endDate ?? "—";
  const subLines = [
    `Date Range : ${from}  To  ${to}`,
    `Area : ${filterLabels.area}   |   Line : ${filterLabels.line}   |   Station : ${filterLabels.station}   |   Equipment : ${filterLabels.equipment}   |   Model : ${filterLabels.model}`,
  ];

  const chartResult = await captureChartImage(chartRef);

  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;

  if (chartResult) {
    const chartH = Math.min(contentW * chartResult.aspect, 130);
    doc.addImage(chartResult.imgData, "PNG", MARGIN, contentTop, contentW, chartH, undefined, "FAST");
  }

  doc.addPage();
  autoTable(doc, {
    startY: HEADER_H + 8,
    ...buildAutoTableConfig(tableColumns, allRows, doc, FONT),
    margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 6, bottom: 22 },
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPdfPageChrome(doc, {
      pageNum: p,
      totalPages,
      fontFamily: FONT,
      title: "Station Cycle Time Overview",
      subLines: p === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }
  doc.save(`Cycle_Time_Overview_${from}_to_${to}.pdf`);
}

// ── Loading overlay ────────────────────────────────────────────────────────
const LoadingOverlay = () => (
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
);

// ── Component ──────────────────────────────────────────────────────────────
const CycleTimeSupermain = ({
  dateFilter,
  setDateFilter,
  onNavigateToMain,
  masterData = [],
  variantOptions = [],
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
}) => {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [filters, setFilters] = useState({
    areaId: "",
    lineId: "",
    stationId: "",
    equipmentId: "",
    model: "",
  });
  const [biwSearch, setBiwSearch] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);

  const clusterMap = useMemo(() => {
    const map = {};
    masterData.forEach((c) => {
      map[c.ClusterId] = c.ClusterName;
    });
    return map;
  }, [masterData]);

  // ── API state ─────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [tableData, setTableData] = useState([]);
  const filteredTableData = useMemo(() => {
    if (!biwSearch) return tableData;
    const q = biwSearch.toLowerCase();
    return tableData.filter((r) => String(r.CabinNo ?? "").toLowerCase().includes(q));
  }, [tableData, biwSearch]);
  const chartItems = useMemo(
    () =>
      filteredTableData.map((item) => ({
        ...item,
        name: `${item.CabinNo} | ${item.EndDateTime}`,
        exceeded: item.ActualCT > item.DesignCT,
      })),
    [filteredTableData],
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  });
  const [pageSize, setPageSize] = useState(10);
  const [currentDateFilter, setCurrentDateFilter] = useState({});
  const abortRef = useRef(null);
  const isManualSearch = useRef(false);

  useEffect(() => {
    if (!masterData.length) return;
    const firstCluster = masterData[0];
    const firstLine = firstCluster?.Lines?.[0];
    const firstStation = firstLine?.Stations?.[0];
    const firstEquipment = firstStation?.SubStations?.[0];

    let targetAreaId = firstCluster?.ClusterId ?? "";
    let targetLineId = firstLine?.LineId ?? "";
    let targetStationId = firstStation?.StationId ?? "";
    let targetEquipmentId = firstEquipment?.SubStationId ?? "";

    if (targetFilters?.areaId || targetFilters?.area) {
      const matchArea = masterData.find(
        (c) =>
          String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
          String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
      );
      if (matchArea) targetAreaId = matchArea.ClusterId;
    }
    if (targetFilters?.lineId || targetFilters?.line) {
      const lines = masterData.flatMap((c) => c.Lines || []);
      const matchLine = lines.find(
        (l) =>
          String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
          String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
      );
      if (matchLine) targetLineId = matchLine.LineId;
    }
    if (targetFilters?.stationId || targetFilters?.station) {
      const stations = masterData.flatMap((c) => c.Lines || []).flatMap((l) => l.Stations || []);
      const matchStation = stations.find(
        (s) =>
          String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
          String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase(),
      );
      if (matchStation) targetStationId = matchStation.StationId;
    }
    if (targetFilters?.equipmentId || targetFilters?.equipment || targetFilters?.substation) {
      const subs = masterData.flatMap((c) => c.Lines || []).flatMap((l) => l.Stations || []).flatMap((s) => s.SubStations || []);
      const matchSub = subs.find(
        (sub) =>
          String(sub.SubStationId) === String(targetFilters.equipmentId || targetFilters.equipment || targetFilters.substation) ||
          String(sub.SubStationName).toLowerCase() === String(targetFilters.equipment || targetFilters.substation).toLowerCase(),
      );
      if (matchSub) targetEquipmentId = matchSub.SubStationId;
    }

    setFilters((prev) => ({
      ...prev,
      areaId: targetAreaId,
      lineId: targetLineId,
      stationId: targetStationId,
      equipmentId: targetEquipmentId,
      model: targetFilters?.model || variantOptions[0]?.value || prev.model,
    }));
  }, [masterData, variantOptions, targetFilters]);

  const areaOptions = useMemo(
    () => masterData.map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
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
    return (line?.Stations || []).map((s) =>
      opt(s.StationId, formatStationName(s.StationName)),
    );
  }, [masterData, filters.lineId]);

  const equipmentOptions = useMemo(() => {
    if (!filters.stationId) return [];
    const station = masterData
      .flatMap((c) => c.Lines || [])
      .flatMap((l) => l.Stations || [])
      .find((s) => s.StationId === Number(filters.stationId));
    return (station?.SubStations || [])
      .filter((s) => s.Type === "SubStation")
      .map((s) => opt(s.SubStationId, formatSubStationName(s.SubStationName)));
  }, [masterData, filters.stationId]);

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
        label: "Sub-Station",
        options: equipmentOptions,
      },
      { type: "select", key: "model", label: "Model", options: variantOptions },
    ],
    [
      areaOptions,
      lineOptions,
      stationOptions,
      equipmentOptions,
      variantOptions,
    ],
  );

  const hasSelection = Boolean(filters.areaId && filters.lineId);

  // ── Filter cascade handler ────────────────────────────────────────────────
  const handleFiltersChange = useCallback(
    (newFilters) => {
      const updated = { ...newFilters };
      if (newFilters.areaId !== filters.areaId) {
        const lines = newFilters.areaId
          ? masterData.find((c) => c.ClusterId === Number(newFilters.areaId))
            ?.Lines || []
          : masterData.flatMap((c) => c.Lines || []);
        const firstLine = lines[0];
        const firstStation = firstLine?.Stations?.[0];
        const firstEquipment = (firstStation?.SubStations || []).find(
          (s) => s.Type === "SubStation",
        );
        updated.lineId = firstLine?.LineId ?? "";
        updated.stationId = firstStation?.StationId ?? "";
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }
      if (newFilters.lineId !== filters.lineId) {
        const line = masterData
          .flatMap((c) => c.Lines || [])
          .find((l) => l.LineId === Number(newFilters.lineId));
        const firstStation = line?.Stations?.[0];
        const firstEquipment = (firstStation?.SubStations || []).find(
          (s) => s.Type === "SubStation",
        );
        updated.stationId = firstStation?.StationId ?? "";
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }
      if (newFilters.stationId !== filters.stationId) {
        const station = masterData
          .flatMap((c) => c.Lines || [])
          .flatMap((l) => l.Stations || [])
          .find((s) => s.StationId === Number(newFilters.stationId));
        const firstEquipment = (station?.SubStations || []).find(
          (s) => s.Type === "SubStation",
        );
        updated.equipmentId = firstEquipment?.SubStationId ?? "";
      }
      setFilters(updated);
    },
    [filters, masterData],
  );

  // ── Build API params ──────────────────────────────────────────────────────
  const buildParams = useCallback(
    (df, page, ps) => ({
      ...(filters.areaId && { areaId: filters.areaId }),
      ...(filters.lineId && { lineId: filters.lineId }),
      ...(filters.stationId && { stationId: filters.stationId }),
      ...(filters.equipmentId && { equipmentId: filters.equipmentId }),
      ...(filters.model && { variantCode: filters.model }),
      ...(biwSearch && { biwNo: biwSearch }),
      ...(df.startDate && { startDate: df.startDate }),
      ...(df.endDate && { endDate: df.endDate }),
      ...(df.startTime && { startTime: df.startTime }),
      ...(df.endTime && { endTime: df.endTime }),
      page,
      pageSize: ps,
    }),
    [filters, biwSearch],
  );

  // ── Fetch overview data ───────────────────────────────────────────────────
  const fetchData = useCallback(
    async (df, page = 1) => {
      if (!hasSelection) return;
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      setLoading(true);
      setFetchError(null);
      try {
        const res = await cycleTimeApi.overview(
          buildParams(df, page, pageSize),
          signal,
        );
        if (signal.aborted) return;

        const rows = (res.tableData || []).map((r, i) => ({
          ...r,
          sr: (page - 1) * pageSize + i + 1,
          DesignCT: appConfig.cycleTime.designCT,
          EndDateTime: r.EndTime ? `${r.EndDate} | ${r.EndTime}` : r.EndDate || "",
          SubStation: formatSubStationName(r.SubStation || ""),
          StationName: formatStationName(r.StationName || ""),
          Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
        }));

        setTableData(rows);
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
        console.error(err);
        setFetchError("Failed to load data. Please try again.");
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [filters, pageSize, buildParams, hasSelection],
  );

  useEffect(() => {
    if (!hasSearched) return;
    if (isManualSearch.current) {
      isManualSearch.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchData(currentDateFilter, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, pageSize, biwSearch]);

  useEffect(() => {
    if (!hasSelection && hasSearched) {
      setTableData([]);
      setHasSearched(false);
      setPagination({ page: 1, pageSize, totalRecords: 0, totalPages: 0 });
    }
  }, [hasSelection]);

  const handleSearch = (startDate, endDate, startTime, endTime) => {
    if (!hasSelection) return;
    const df = { startDate, endDate, startTime, endTime };
    setCurrentDateFilter(df);
    setDateFilter(df);
    isManualSearch.current = true;
    fetchData(df, 1);
  };

  // Sync date range in background mode & trigger search
  useEffect(() => {
    if (isBg && targetDateRange?.start && hasSelection && !hasSearched) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e, "00:00", "23:59");
    }
  }, [isBg, targetDateRange, hasSelection, hasSearched]);

  // Auto trigger download in background mode
  const bgTriggeredRef = useRef(false);
  useEffect(() => {
    if (isBg && hasSearched && !loading && !bgTriggeredRef.current) {
      bgTriggeredRef.current = true;
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
    // Removed clearTimeout to prevent race condition canceling export
    }
  }, [isBg, hasSearched, loading]);

  const handlePageChange = useCallback(
    (newPage) => {
      fetchData(currentDateFilter, newPage);
    },
    [fetchData, currentDateFilter],
  );

  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
  }, []);

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

  // ── Readable labels for PDF header ───────────────────────────────────────
  const filterLabels = useMemo(
    () => ({
      area:
        areaOptions.find((o) => o.value === Number(filters.areaId))?.label ||
        "All",
      line:
        lineOptions.find((o) => o.value === Number(filters.lineId))?.label ||
        "All",
      station:
        stationOptions.find((o) => o.value === Number(filters.stationId))
          ?.label || "All",
      equipment:
        equipmentOptions.find((o) => o.value === Number(filters.equipmentId))
          ?.label || "All",
      model: filters.model || "",
    }),
    [
      areaOptions,
      lineOptions,
      stationOptions,
      equipmentOptions,
      filters.areaId,
      filters.lineId,
      filters.stationId,
      filters.equipmentId,
      filters.model,
    ],
  );

  // ── Download — fetch all records then export ──────────────────────────────
  const handleDownload = async () => {
    if (isDownloading || !hasSearched || !hasSelection) return;
    setIsDownloading(true);
    try {
      const res = await cycleTimeApi.overview(
        buildParams(currentDateFilter, 1, 999999),
      );
      const allRows = (res.tableData || []).map((r, i) => ({
        ...r,
        sr: i + 1,
        DesignCT: appConfig.cycleTime.designCT,
        EndDateTime: r.EndTime ? `${r.EndDate} | ${r.EndTime}` : r.EndDate || "",
        SubStation: formatSubStationName(r.SubStation || ""),
        StationName: formatStationName(r.StationName || ""),
        Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
      }));
      await Promise.all([
        downloadPDFFile(chartRef, allRows, currentDateFilter, filterLabels),
        downloadExcelFile(allRows),
      ]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFiltersChange}
      />

      <DateRangeBar
        onSearch={handleSearch}
        onDownload={handleDownload}
        showDownload={true}
        showTime={true}
        reportName="Station_Cycle_Time"
        selectedStartDate={currentDateFilter?.startDate}
        selectedEndDate={currentDateFilter?.endDate}
        isDownloading={isDownloading}
        disabled={!hasSelection}
        showSearch={true}
        searchLabel="BIW No."
        searchPlaceholder="Search BIW..."
        searchValue={biwSearch}
        onSearchValueChange={setBiwSearch}
      />

      {/* Chart */}
     <div className="bg-white p-6 rounded-lg shadow mb-4 relative">
        {loading && hasSearched && <LoadingOverlay />}
        {!hasSelection ? (
          <SearchPromptState pageName="Station Cycle Time" />
        ) : loading && !hasSearched ? (
          <ChartShimmer />
        ) : fetchError ? (
          <p className="text-center text-red-500 py-16 text-sm">{fetchError}</p>
        ) : !hasSearched ? (
          <SearchPromptState pageName="Station Cycle Time" />
        ) : filteredTableData.length === 0 ? (
          <NoDataState />
        ) : (
          <div ref={chartRef}>
            {chartItems.length > 20 && (
              <p className="text-xs text-gray-400 mb-2 text-right">
                Showing top 20 of {chartItems.length} records — see table for
                full data
              </p>
            )}
            <div style={{ height: 480 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartItems.slice(0, 20)}
                  margin={{ top: 10, right: 20, left: 10, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fontWeight: 600 }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: "Cycle Time (s)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 12, fill: "#64748b" } }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} verticalAlign="top" />
                  <Bar
                    dataKey="ActualCT"
                    name="Actual CT"
                    radius={[4, 4, 0, 0]}
                    cursor="pointer"
                    onClick={(data) => {
                      const original = filteredTableData.find(
                        (r) => r.CabinNo === data.CabinNo,
                      );
                      if (original)
                        onNavigateToMain(original, currentDateFilter, filters);
                    }}
                  >
                    {chartItems.slice(0, 20).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.exceeded ? "#dc2626" : "#10b981"}
                      />
                    ))}
                    <LabelList
                      dataKey="ActualCT"
                      position="insideTop"
                      fill="#ffffff"
                      fontSize={13}
                      fontWeight={700}
                      formatter={(v) => `${Math.round(v)}s`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {!hasSelection ? null : loading && !hasSearched ? (
        <TableShimmer rows={8} />
      ) : hasSearched && filteredTableData.length > 0 ? (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 rounded-xl z-10" />
          )}
          <DataTable
            columns={tableColumns}
            data={filteredTableData}
            title={`Cycle Time Overview — ${(pagination.totalRecords ?? 0).toLocaleString()} total`}
            defaultRows={10}
            serverPagination={serverPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CycleTimeSupermain;