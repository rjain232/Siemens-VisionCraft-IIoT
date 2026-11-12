import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Activity } from "lucide-react";
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
import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../sharedComponents/DataTable";
import CycleTimeSupermain from "./cycle-time-losses/CycleTimeSupermain";
import MicrostackBreakdown from "./cycle-time-losses/MicrostackBreakdown";
import { cycleTimeApi, masterApi } from "../../../../services/api";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import appConfig from "../../../../config/appConfig";
import {
  formatClusterName,
  formatStationName,
  formatSubStationName,
} from "../../../../utils/Formatters";
import { generateExcel } from "../../../../utils/ExcelUtils";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";
import EmptyState, {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState";

const opt = (value, label) => ({ value, label });

const SHIFT_OPTIONS = appConfig.production.shifts.filter(
  (s) => s.value !== "All",
);

// ── Table columns ──────────────────────────────────────────────────────────
const tableColumns = [
  { key: "sr", label: "Sr. No." },
  { key: "EndDateTime", label: "Date & Time", type: "mono", sortable: true },
  { key: "Area", label: "Area", sortable: true },
  { key: "Line", label: "Line", type: "primary", sortable: true },
  { key: "StationName", label: "Station", sortable: true },
  { key: "SubStation", label: "Equipment", sortable: true },
  { key: "Type", label: "Type", sortable: true },
  { key: "CabinNo", label: "BIW No.", type: "primary", sortable: true },
  { key: "Model", label: "Model", sortable: true },
  { key: "Shift", label: "Shift", type: "shift", sortable: true },
  {
    key: "ActualCT",
    label: "Actual CT (s)",
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
  { key: "DesignCT", label: "Design CT (s)", sortable: true },
];

// ── Custom Tooltip ─────────────────────────────────────────────────────────
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
        Equipment: <b>{item.SubStation}</b>
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
async function downloadExcel(allRows) {
  const cols = [
    { label: "#", accessor: "sr" },
    { label: "Date & Time", accessor: "EndDateTime" },
    { label: "Area", accessor: "Area" },
    { label: "Line", accessor: "Line" },
    { label: "Station", accessor: "StationName" },
    { label: "Equipment", accessor: "SubStation" },
    { label: "Type", accessor: "Type" },
    { label: "BIW No.", accessor: "CabinNo" },
    { label: "Model", accessor: "Model" },
    { label: "Shift", accessor: "Shift" },
    { label: "Actual CT (s)", accessor: "ActualCT" },
    { label: "Design CT (s)", accessor: "DesignCT" },
  ];
  generateExcel(cols, allRows, "Cycle_Time_Losses");
}

// ── Chart capture helpers ──────────────────────────────────────────────────
const cssPropName = (c) => c.replace(/([A-Z])/g, "-$1").toLowerCase();
const oklchToRgb = (v) => {
  if (!v || v.includes("transparent")) return null;
  if (v.toLowerCase().includes("oklch")) {
    const m = v.match(/oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/);
    if (m) {
      const [L, , H] = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
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
  let origBg = "",
    origParentBg = "";
  try {
    const el = ref.current;
    origBg = el.style.backgroundColor;
    origParentBg = el.parentElement?.style.backgroundColor ?? "";
    el.style.backgroundColor = "#ffffff";
    if (el.parentElement) el.parentElement.style.backgroundColor = "#ffffff";

    const allEls = [el, ...el.querySelectorAll("*")];
    const colorProps = [
      "color",
      "backgroundColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "fill",
      "stroke",
    ];
    allEls.forEach((e) => {
      const isSvgEl = e instanceof SVGElement;
      const cs = window.getComputedStyle(e);
      colorProps.forEach((p) => {
        if (isSvgEl && (p === "fill" || p === "stroke") && e.hasAttribute(p))
          return;
        const val = cs[p];
        if (val && val.includes("oklch")) {
          const rgb = oklchToRgb(val);
          if (rgb) {
            const cp = cssPropName(p);
            overrides.push({
              el: e,
              prop: cp,
              original: e.style.getPropertyValue(cp),
            });
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
            const solid =
              alpha < 0.3
                ? "rgb(255,255,255)"
                : `rgb(${parts[0]},${parts[1]},${parts[2]})`;
            overrides.push({
              el: e,
              prop: "background-color",
              original: e.style.getPropertyValue("background-color"),
            });
            e.style.setProperty("background-color", solid, "important");
          }
        }
      }
    });

    // Remove SVG clip-paths so floating labels are captured
    const svgs = el.querySelectorAll("svg");
    svgs.forEach((svg) => {
      overrides.push({
        el: svg,
        prop: "overflow",
        original: svg.style.overflow,
      });
      svg.style.overflow = "visible";
      svg.querySelectorAll("[clip-path]").forEach((node) => {
        overrides.push({
          el: node,
          prop: "clip-path",
          original: node.getAttribute("clip-path"),
          isAttr: true,
        });
        node.removeAttribute("clip-path");
      });
    });

    await new Promise((r) => setTimeout(r, 200));

    const rect = el.getBoundingClientRect();
    const aspect = rect.width > 0 ? rect.height / rect.width : 0.5;

    try {
      const { toJpeg } = await import("html-to-image");
      const imgData = await toJpeg(el, {
        cacheBust: true,
        pixelRatio: 1.5,
        quality: 0.88,
        backgroundColor: "#ffffff",
        width: rect.width,
        height: rect.height,
      });
      return { imgData, aspect };
    } catch (toJpegErr) {
      console.warn("toJpeg failed, falling back to html2canvas:", toJpegErr);
    }

    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(el, {
      scale: 1.5,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });
    return { imgData: canvas.toDataURL("image/jpeg", 0.88), aspect };
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
        original
          ? el.style.setProperty(prop, original)
          : el.style.removeProperty(prop);
      }
    });
  }
}

// ── PDF download ───────────────────────────────────────────────────────────
async function downloadPDF(chartRef, allRows, dateFilter, filterLabels) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const {
    loadBrandingLogos,
    drawPdfPageChrome,
    loadKarlaFont,
    buildAutoTableConfig,
  } = await import("../../../../utils/PdfUtils");

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
    `Area : ${filterLabels.area}   |   Line : ${filterLabels.line}   |   Station : ${filterLabels.station}   |   Equipment : ${filterLabels.equipment}   |   Shift : ${filterLabels.shift}   |   Model : ${filterLabels.model}`,
  ];

  const chartResult = await captureChartImage(chartRef);

  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;

  doc.setFont(FONT, "bold");
  doc.setFontSize(10);
  doc.setTextColor(22, 70, 161);
  doc.text("Station Cycle Time Chart", MARGIN, contentTop + 4);

  if (chartResult) {
    const chartH = Math.min(contentW * chartResult.aspect, 123);
    doc.addImage(
      chartResult.imgData,
      "JPEG",
      MARGIN,
      contentTop + 7,
      contentW,
      chartH,
      undefined,
      "FAST",
    );
  }

  doc.addPage();
  autoTable(doc, {
    startY: HEADER_H + 8,
    ...buildAutoTableConfig(tableColumns, allRows, doc, FONT),
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPdfPageChrome(doc, {
      pageNum: p,
      totalPages,
      fontFamily: FONT,
      title: "Station Cycle Time Report",
      subLines: p === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }
  doc.save(`Station_Cycle_Time_${from}_to_${to}.pdf`);
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

// ── Main Component ─────────────────────────────────────────────────────────
const StationCycleTime = ({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) => {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [currentLevel, setCurrentLevel] = useState("supermain");
  const [filters, setFilters] = useState({
    areaId: "",
    lineId: "",
    stationId: "",
    equipmentId: "",
    shift: "A",
    model: "",
  });
  const [dateFilter, setDateFilter] = useState({});
  const [selectedBIWFromSupermain, setSelectedBIWFromSupermain] =
    useState(null);
  const [selectedBIW, setSelectedBIW] = useState(null);
  const [biwSearch, setBiwSearch] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);

  // ── Master data for cascading dropdowns ───────────────────────────────────
  const [masterData, setMasterData] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);

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
    return tableData.filter((r) =>
      String(r.CabinNo ?? "")
        .toLowerCase()
        .includes(q),
    );
  }, [tableData, biwSearch]);
  const chartItems = useMemo(
    () =>
      filteredTableData.map((item) => ({
        ...item,
        name: `${item.SubStation} | ${item.EndDateTime}`,
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

  useEffect(() => {
    cycleTimeApi
      .getVariants()
      .then((res) => {
        const variants = res?.data || [];
        const opts = variants.map((v) =>
          opt(String(v.mesVcode), v.description || String(v.mesVcode)),
        );
        setVariantOptions(opts);
        if (opts.length > 0) {
          setFilters((prev) => ({ ...prev, model: opts[0].value }));
        }
      })
      .catch(console.error);
  }, []);

  // ── Load master data ───────────────────────────────────────────────────────
  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);
        const firstCluster = data.find((c) => (c.Lines || []).length > 0);
        const firstLine = data
          .flatMap((c) => c.Lines || [])
          .find((l) => (l.Stations || []).length > 0);
        const firstStation = firstLine?.Stations?.[0];
        const firstEquipment = (firstStation?.SubStations || []).find(
          (s) => s.Type === "SubStation",
        );

        let targetAreaId = firstCluster?.ClusterId ?? "";
        let targetLineId = firstLine?.LineId ?? "";
        let targetStationId = firstStation?.StationId ?? "";
        let targetEquipmentId = firstEquipment?.SubStationId ?? "";

        if (targetFilters?.areaId || targetFilters?.area) {
          const matchArea = data.find(
            (c) =>
              String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
              String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
          );
          if (matchArea) targetAreaId = matchArea.ClusterId;
        }
        if (targetFilters?.lineId || targetFilters?.line) {
          const lines = data.flatMap((c) => c.Lines || []);
          const matchLine = lines.find(
            (l) =>
              String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
              String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
          );
          if (matchLine) targetLineId = matchLine.LineId;
        }
        if (targetFilters?.stationId || targetFilters?.station) {
          const stations = data.flatMap((c) => c.Lines || []).flatMap((l) => l.Stations || []);
          const matchStation = stations.find(
            (s) =>
              String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
              String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase(),
          );
          if (matchStation) targetStationId = matchStation.StationId;
        }
        if (targetFilters?.equipmentId || targetFilters?.equipment || targetFilters?.substation) {
          const subs = data.flatMap((c) => c.Lines || []).flatMap((l) => l.Stations || []).flatMap((s) => s.SubStations || []);
          const matchSub = subs.find(
            (sub) =>
              String(sub.SubStationId) === String(targetFilters.equipmentId || targetFilters.equipment || targetFilters.substation) ||
              String(sub.SubStationName).toLowerCase() === String(targetFilters.equipment || targetFilters.substation).toLowerCase(),
          );
          if (matchSub) targetEquipmentId = matchSub.SubStationId;
        }

        let shift = "A";
        if (targetFilters?.shift) shift = targetFilters.shift;
        else if (targetFilters?.shifts?.[0]) shift = targetFilters.shifts[0];

        setFilters((prev) => ({
          ...prev,
          areaId: targetAreaId,
          lineId: targetLineId,
          stationId: targetStationId,
          equipmentId: targetEquipmentId,
          shift,
          ...(targetFilters?.model ? { model: targetFilters.model } : {}),
        }));
        if (targetFilters) setHasSearched(true);
      })
      .catch(console.error);
  }, [targetFilters]);

  // ── Cascading dropdown options from master data ───────────────────────────
  const areaOptions = useMemo(
    () =>
      masterData
        .filter((c) => (c.Lines || []).length > 0)
        .map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const lines = filters.areaId
      ? masterData.find((c) => c.ClusterId === Number(filters.areaId))?.Lines ||
        []
      : masterData.flatMap((c) => c.Lines || []);
    return lines.map((l) => opt(l.LineId, l.LineName));
  }, [masterData, filters.areaId]);

  const noLinesAvailable =
    masterData.length > 0 &&
    Boolean(filters.areaId) &&
    lineOptions.length === 0;

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
      { type: "select", key: "shift", label: "Shift", options: SHIFT_OPTIONS },
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
    (df, page, ps, biw) => ({
      ...(filters.areaId && { areaId: filters.areaId }),
      ...(filters.lineId && { lineId: filters.lineId }),
      ...(filters.stationId && { stationId: filters.stationId }),
      ...(filters.equipmentId && { equipmentId: filters.equipmentId }),
      ...(filters.shift && { shift: filters.shift }),
      ...(filters.model && { variantCode: filters.model }),
      ...(biw ? { biwNo: biw.CabinNo } : biwSearch ? { biwNo: biwSearch } : {}),
      ...(df.startDate && { startDate: df.startDate }),
      ...(df.endDate && { endDate: df.endDate }),
      ...(df.startTime && { startTime: df.startTime }),
      ...(df.endTime && { endTime: df.endTime }),
      page,
      pageSize: ps,
    }),
    [filters, biwSearch],
  );

  // ── Fetch paginated data ──────────────────────────────────────────────────
  const fetchData = useCallback(
    async (df, page = 1) => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      setLoading(true);
      setFetchError(null);
      try {
        const res = await cycleTimeApi.report(
          buildParams(df, page, pageSize, selectedBIWFromSupermain),
          signal,
        );
        if (signal.aborted) return;

        const rows = (res.tableData || []).map((r, i) => ({
          ...r,
          sr: (page - 1) * pageSize + i + 1,
          DesignCT: appConfig.cycleTime.designCT,
          EndDateTime: (() => {
            const d = r.Date || r.EndDate || "";
            const t = r.EndTime || "";
            return d && t ? `${d} | ${t}` : d || t;
          })(),
          Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
          StationName: formatStationName(r.StationName || ""),
          SubStation: formatSubStationName(r.SubStation || ""),
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
    [filters, pageSize, selectedBIWFromSupermain, buildParams],
  );

  // Auto-fetch when navigating from supermain
  useEffect(() => {
    if (currentLevel === "main" && selectedBIWFromSupermain && !hasSearched) {
      setCurrentDateFilter(dateFilter);
      fetchData(dateFilter, 1);
    }
  }, [currentLevel, selectedBIWFromSupermain]);

  // Debounce re-fetch on filter/pageSize changes after first search
  useEffect(() => {
    if (!hasSearched || currentLevel !== "main" || !filters.lineId) return;
    const timer = setTimeout(() => {
      fetchData(currentDateFilter, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, pageSize, biwSearch]);

  // Scroll to top on level change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentLevel]);

  const handleSearch = useCallback(
    (startDate, endDate, startTime, endTime) => {
      const df = { startDate, endDate, startTime, endTime };
      setCurrentDateFilter(df);
      fetchData(df, 1);
    },
    [fetchData],
  );

  // Sync date range in background mode & trigger initial search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e, "00:00", "23:59");
    }
  }, [isBg, targetDateRange, handleSearch]);

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
      shift: filters.shift || "All",
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
      filters.shift,
      filters.model,
    ],
  );

  // ── Download — fetch all records then export ──────────────────────────────
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const res = await cycleTimeApi.report(
        buildParams(currentDateFilter, 1, 999999, selectedBIWFromSupermain),
      );
      const allRows = (res.tableData || []).map((r, i) => ({
        ...r,
        sr: i + 1,
        DesignCT: appConfig.cycleTime.designCT,
        EndDateTime: (() => {
          const d = r.Date || r.EndDate || "";
          const t = r.EndTime || "";
          return d && t ? `${d} | ${t}` : d || t;
        })(),
        Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
        StationName: formatStationName(r.StationName || ""),
        SubStation: formatSubStationName(r.SubStation || ""),
      }));
      await Promise.all([
        downloadPDF(chartRef, allRows, currentDateFilter, filterLabels),
        downloadExcel(allRows),
      ]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // ── Micro level ───────────────────────────────────────────────────────────
  if (currentLevel === "micro" && selectedBIW) {
    return (
      <MicrostackBreakdown
        biwData={selectedBIW}
        onClose={() => setCurrentLevel("main")}
        filterIds={{
          lineId: filters.lineId,
          stationId: filters.stationId,
          equipmentId: filters.equipmentId,
          shift: filters.shift,
        }}
        dateFilter={currentDateFilter}
      />
    );
  }

  // ── Supermain level ───────────────────────────────────────────────────────
  if (currentLevel === "supermain") {
    return (
      <div className="m-4">
        <CycleTimeSupermain
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          masterData={masterData}
          variantOptions={variantOptions}
          backgroundMode={isBg}
          backgroundDateRange={targetDateRange}
          backgroundCadence={targetCadence}
          backgroundFilters={targetFilters}
          onNavigateToMain={(
            biwData,
            supermainDateFilter,
            supermainFilters,
          ) => {
            setSelectedBIWFromSupermain(biwData);
            if (supermainDateFilter) setDateFilter(supermainDateFilter);
            if (supermainFilters)
              setFilters((prev) => ({ ...prev, ...supermainFilters }));
            setHasSearched(false);
            setTableData([]);
            setCurrentLevel("main");
          }}
        />
      </div>
    );
  }

  // ── Main level ────────────────────────────────────────────────────────────
  return (
    <div className="m-4">
      {/* Back button */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-50 to-white py-3 mb-4 -mx-4 px-4 border-b-2 border-blue-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentLevel("supermain");
              setSelectedBIWFromSupermain(null);
              setBiwSearch("");
              setHasSearched(false);
              setTableData([]);
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-all shadow font-semibold text-sm"
            style={{ backgroundColor: "rgb(22, 70, 161)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Overview
          </button>

          {selectedBIWFromSupermain && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border-2 border-green-400 rounded-lg">
              <span className="text-sm font-semibold text-green-800">
                Filtered: BIW {selectedBIWFromSupermain.CabinNo}
              </span>
              <button
                onClick={() => {
                  setSelectedBIWFromSupermain(null);
                  if (hasSearched) fetchData(currentDateFilter, 1);
                }}
                className="text-green-600 hover:text-green-800 font-bold ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
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
        showSearch={true}
        searchLabel="BIW No."
        searchPlaceholder="Search BIW..."
        searchValue={biwSearch}
        onSearchValueChange={setBiwSearch}
      />

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 mt-2 relative">
        {loading && hasSearched && <LoadingOverlay />}
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Station Cycle Time
          <span className="ml-2 text-sm font-normal text-gray-400">
            (click a bar to view Microstates)
          </span>
        </h2>
        {loading && !hasSearched ? (
          <ChartShimmer />
        ) : fetchError ? (
          <p className="text-center text-red-500 py-12 text-sm">{fetchError}</p>
        ) : noLinesAvailable ? (
          <EmptyState
            icon={Activity}
            color="sky"
            title="No line or station available for the selected area"
          />
        ) : !hasSearched ? (
          <SearchPromptState pageName="Station Cycle Time" />
        ) : chartItems.length === 0 ? (
          <NoDataState />
        ) : (
          <div ref={chartRef}>
            {chartItems.length > 20 && (
              <p className="text-xs text-gray-400 mb-2 text-right">
                Showing top 20 of {chartItems.length} records — see table for
                full data
              </p>
            )}
            <div style={{ height: 450 }}>
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
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Cycle Time (s)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: { fontSize: 12, fill: "#64748b" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} verticalAlign="top" />
                  <Bar
                    dataKey="ActualCT"
                    name="Actual CT"
                    radius={[4, 4, 0, 0]}
                    cursor="pointer"
                    onClick={(data) => {
                      setSelectedBIW(data);
                      setCurrentLevel("micro");
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
      {loading && !hasSearched ? (
        <TableShimmer rows={8} />
      ) : hasSearched && !noLinesAvailable ? (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 rounded-xl z-10" />
          )}
          <DataTable
            columns={tableColumns}
            data={filteredTableData}
            title={`Cycle Time Detailed Data — ${(pagination.totalRecords ?? 0).toLocaleString()} total`}
            defaultRows={10}
            serverPagination={serverPagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default StationCycleTime;
