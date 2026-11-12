import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Bar,
  Cell,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../sharedComponents/DataTable";
import {
  lineCycleTimeApi,
  masterApi,
  cycleTimeApi,
} from "../../../../services/api";
import appConfig from "../../../../config/appConfig";
import { formatClusterName } from "../../../../utils/Formatters";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";
import * as XLSX from "xlsx";
import { saveExcel } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../../utils/PdfUtils";
import { SearchPromptState, NoDataState } from "../../../../sharedComponents/EmptyState";

const opt = (value, label) => ({ value, label });
const INDIVIDUAL_SHIFTS = ["A", "B", "C"];
const getToday = () => new Date().toISOString().split("T")[0];

function normalizeDateToYMD(dateStr) {
  if (!dateStr) return "";
  const isoMatch = String(dateStr).match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const dmyMatch = String(dateStr).match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (dmyMatch) {
    const [, d, m, y] = dmyMatch;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const parsed = new Date(dateStr);
  if (!isNaN(parsed)) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const d = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(dateStr);
}

const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: `Shift ${s.value}` },
);

const LINE_CT_PDF_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "Area", label: "Area" },
  { key: "Line", label: "Line" },
  { key: "BiwNo", label: "BIW No" },
  { key: "Model", label: "Model" },
  { key: "Shift", label: "Shift", type: "shift" },
  { key: "startDateTime", label: "Start Date & Time" },
  { key: "endDateTime", label: "End Date & Time" },
  {
    key: "act",
    label: "Actual Cycle Time (sec)",
    type: "cycleTime",
    targetKey: "dct",
  },
  { key: "dct", label: "Design Cycle Time (sec)" },
];

// ── chart title builder ──
function buildChartTitle(filters, masterData) {
  const cluster = masterData.find(
    (c) => c.ClusterId === Number(filters.areaId),
  );
  const areaLabel = cluster
    ? formatClusterName(cluster.ClusterName)
    : "All Areas";

  const line = masterData
    .flatMap((c) => c.Lines || [])
    .find((l) => l.LineId === Number(filters.lineId));
  const lineLabel = line ? line.LineName : "All Lines";

  const modelLabel = filters.model || "All Models";

  const shiftLabel =
    filters.shifts && !filters.shifts.includes("All")
      ? filters.shifts.map((s) => `Shift ${s}`).join(", ")
      : "All Shifts";

  return `Cycle Time Comparison - ${areaLabel} | ${lineLabel} | ${modelLabel} | ${shiftLabel}`;
}

function formatXLabel(row) {
  return `${row.Line || ""} | ${row.BiwNo || ""} | ${normalizeDateToYMD(row.Date)} | ${row.StartTime || ""}`;
}

const CustomXAxisTick = ({ x, y, payload }) => {
  const parts = (payload.value || "").split(" | ");
  const line1 = `${parts[0] ?? ""} | ${parts[1] ?? ""}`;
  const line2 = parts[2] ?? "";
  const line3 = parts[3] ?? "";
  return (
    <g transform={`translate(${x},${y + 8})`}>
      <text textAnchor="middle" fill="#374151" fontSize={11} fontWeight={600}>
        {line1}
      </text>
      <text y={14} textAnchor="middle" fill="#111827" fontSize={10}>
        {line2}
      </text>
      <text y={26} textAnchor="middle" fill="#111827" fontSize={10}>
        {line3}
      </text>
    </g>
  );
};

export default function LineCycleTime({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;

  // ── Master data for cascading dropdowns ─────────────────────────────────
  const [masterData, setMasterData] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);

  const [filters, setFilters] = useState({
    areaId: "",
    lineId: "",
    model: "",
    shifts: isBg ? ["All"] : ["A"],
  });

  const [biwSearch, setBiwSearch] = useState("");

  // ── API state ───────────────────────────────────────────────────────────
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
  });
  const [pageSize, setPageSize] = useState(10);
  const [hasSearched, setHasSearched] = useState(
    Boolean(isBg && (targetDateRange?.start || targetDateRange?.end)),
  );
  const [currentDateFilter, setCurrentDateFilter] = useState(() => {
    if (targetDateRange?.start || targetDateRange?.end) {
      return {
        startDate: targetDateRange.start,
        endDate: targetDateRange.end,
        startTime: "00:00",
        endTime: "23:59",
      };
    }
    return {};
  });
  const chartRef = useRef(null);
  const abortRef = useRef(null);

  // Sync background date range if updated
  useEffect(() => {
    if (isBg && targetDateRange) {
      setCurrentDateFilter({
        startDate: targetDateRange.start,
        endDate: targetDateRange.end,
        startTime: "00:00",
        endTime: "23:59",
      });
      setHasSearched(true);
    }
  }, [isBg, targetDateRange]);

  const clusterMap = useMemo(() => {
    const map = {};
    masterData.forEach((c) => {
      map[c.ClusterId] = c.ClusterName;
    });
    return map;
  }, [masterData]);

  // ── Load variants ─────────────────────────────────────────────────────
  useEffect(() => {
    cycleTimeApi
      .getVariants()
      .then((res) => {
        const variants = res?.data || [];
        const opts = variants.map((v) => opt(v.mesVcode, v.description));
        setVariantOptions(opts);
        if (opts.length > 0) {
          setFilters((prev) => ({ ...prev, model: opts[0].value }));
        }
      })
      .catch(console.error);
  }, []);

  // ── Load master data ──────────────────────────────────────────────────
  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);
        let targetAreaId = firstCluster?.ClusterId ?? "";
        let targetLineId = firstLine?.LineId ?? "";

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

        let shifts = isBg ? ["All"] : ["A"];
        if (targetFilters?.shifts) {
          shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
        } else if (targetFilters?.shift) {
          shifts = [targetFilters.shift];
        }

        setFilters((prev) => ({
          ...prev,
          areaId: targetAreaId,
          lineId: targetLineId,
          shifts,
          ...(targetFilters?.model ? { model: targetFilters.model } : {}),
        }));
      })
      .catch(console.error);
  }, [isBg, targetFilters]);

  // ── Cascading dropdown options ────────────────────────────────────────
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

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "areaId", label: "Area", options: areaOptions },
      { type: "select", key: "lineId", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "model",
        label: "Model",
        options: variantOptions,
      },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions, variantOptions],
  );

  // ── Filter cascade handler ───────────────────────────────────────────
  const handleFiltersChange = useCallback(
    (newFilters) => {
      const updated = { ...newFilters };
      if (newFilters.areaId !== filters.areaId) {
        const lines = newFilters.areaId
          ? masterData.find((c) => c.ClusterId === Number(newFilters.areaId))
            ?.Lines || []
          : masterData.flatMap((c) => c.Lines || []);
        updated.lineId = lines[0]?.LineId ?? "";
      }

      const prevShifts = filters.shifts ?? ["All"];
      let nextShifts = updated.shifts ?? prevShifts;
      if (nextShifts.includes("All") && !prevShifts.includes("All")) {
        nextShifts = ["All"];
      } else if (!nextShifts.includes("All") && prevShifts.includes("All")) {
        nextShifts = nextShifts.filter((s) => s !== "All");
        if (nextShifts.length === 0) nextShifts = ["All"];
      } else if (
        !nextShifts.includes("All") &&
        INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
      ) {
        nextShifts = ["All"];
      } else if (nextShifts.includes("All") && nextShifts.length > 1) {
        nextShifts = nextShifts.filter((s) => s !== "All");
      }
      updated.shifts = nextShifts;

      setFilters(updated);
    },
    [filters, masterData],
  );

  // ── Build API params ─────────────────────────────────────────────────
  const buildParams = useCallback(
    (df, page, ps) => ({
      ...(filters.areaId && { areaId: filters.areaId }),
      ...(filters.lineId && { lineId: filters.lineId }),
      ...(filters.shifts &&
        !filters.shifts.includes("All") && { shift: filters.shifts.join(",") }),
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

  // ── Fetch data ───────────────────────────────────────────────────────
  const fetchData = useCallback(
    async (df, page = 1) => {
      if (!filters.lineId) return;

      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      setLoading(true);
      setFetchError(null);
      try {
        const res = await lineCycleTimeApi.report(
          buildParams(df, page, pageSize),
          signal,
        );
        if (signal.aborted) return;

        const designCT = appConfig.lineCycleTime.designCT;
        const rows = (res.tableData || []).map((r, i) => ({
          ...r,
          sr: (page - 1) * pageSize + i + 1,
          Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
          startDateTime: `${normalizeDateToYMD(r.Date)} ${r.StartTime || ""}`.trim(),
          endDateTime: `${normalizeDateToYMD(r.Date)} ${r.EndTime || ""}`.trim(),
          dct: designCT,
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
        setFetchError(err.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [buildParams, clusterMap, pageSize],
  );

  // ── Search handler (triggered by DateRangeBar) ──────────────────────
  const handleSearch = useCallback(
    (startDate, endDate, startTime, endTime) => {
      const df = { startDate, endDate, startTime, endTime };
      setCurrentDateFilter(df);
      setHasSearched(true);
      fetchData(df);
    },
    [fetchData],
  );

  // ── Debounce re-fetch on filter changes after first search ──────────
  useEffect(() => {
    if (!hasSearched || !filters.lineId || !currentDateFilter?.startDate) return;
    const timer = setTimeout(() => {
      fetchData(currentDateFilter, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, pageSize, biwSearch, hasSearched, currentDateFilter, fetchData]);

  // ── Pagination handlers ─────────────────────────────────────────────
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

  // ── Cleanup abort on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // ── Filtered display data ────────────────────────────────────────────
  const displayData = useMemo(() => {
    const base = tableData.map((row) => ({
      ...row,
      startDateTimeDisplay: (row.startDateTime || "").replace(" ", " | "),
      endDateTimeDisplay: (row.endDateTime || "").replace(" ", " | "),
      actDisplay: row.act,
      dctDisplay: row.dct,
    }));
    if (!biwSearch) return base;
    const q = biwSearch.toLowerCase();
    return base.filter((r) => String(r.BiwNo ?? "").toLowerCase().includes(q));
  }, [tableData, biwSearch]);

  // ── Chart data ───────────────────────────────────────────────────────
  const dctValue = displayData[0]?.dct ?? appConfig.lineCycleTime.designCT;

  const chartData = displayData.map((r) => ({
    x: formatXLabel(r),
    act: Number(r.act),
    dct: Number(r.dct),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const actVal = payload.find((p) => p.dataKey === "act")?.value;
    const dctVal = payload.find((p) => p.dataKey === "dct")?.value ?? dctValue;
    const barColor = actVal <= dctVal ? "#10b981" : "#dc2626";
    return (
      <div
        style={{
          padding: "8px 12px",
          fontSize: 12,
          lineHeight: 1.8,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
        }}
      >
        <div style={{ marginBottom: 4, fontWeight: 600, color: "#374151" }}>
          {label}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: barColor,
              display: "inline-block",
            }}
          />
          <span>
            Actual Cycle Time: <strong>{actVal}s</strong>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#000000",
              display: "inline-block",
            }}
          />
          <span>
            Design Cycle Time: <strong>{dctVal}s</strong>
          </span>
        </div>
      </div>
    );
  };

  // ── Excel download ───────────────────────────────────────────────────
  const handleExcelDownload = (rows) => {
    const exportData = (rows || tableData).map((row, i) => ({
      "Sr No": i + 1,
      Area: row.Area,
      Line: row.Line,
      "BIW No": row.BiwNo,
      Model: row.Model,
      Shift: row.Shift,
      "Start Time": row.startDateTime,
      "End Time": row.endDateTime,
      "Actual CT": row.act,
      "Design CT": row.dct,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cycle Time");
    const from = currentDateFilter.startDate || targetDateRange?.start || "-";
    const to = currentDateFilter.endDate || targetDateRange?.end || "-";
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveExcel(excelBuffer, `Line_Cycle_Time_${from}_to_${to}.xlsx`);
  };

  // ── Chart capture helper ──────────────────────────────────────────────
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

      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const rect = el.getBoundingClientRect();
      const aspect = rect.width > 0 ? rect.height / rect.width : 0.5;
      if (imgData && imgData.length > 1000) {
        return { imgData, aspect };
      }
    } catch (e) {
      console.warn("Chart capture failed:", e.message);
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

    // Fallback: SVG serialization directly from Recharts SVG
    try {
      const svgEl = ref.current?.querySelector("svg.recharts-surface") || ref.current?.querySelector("svg");
      if (svgEl) {
        const rect = svgEl.getBoundingClientRect();
        const svgW = rect.width || 1200;
        const svgH = rect.height || 450;
        const clone = svgEl.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clone.setAttribute("width", String(svgW));
        clone.setAttribute("height", String(svgH));

        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("width", "100%");
        bgRect.setAttribute("height", "100%");
        bgRect.setAttribute("fill", "#ffffff");
        clone.insertBefore(bgRect, clone.firstChild);

        const svgStr = new XMLSerializer().serializeToString(clone);
        const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgStr)))}`;

        const imgData = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const cvs = document.createElement("canvas");
            cvs.width = Math.round(svgW * 2);
            cvs.height = Math.round(svgH * 2);
            const ctx = cvs.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            resolve(cvs.toDataURL("image/png"));
          };
          img.onerror = reject;
          img.src = dataUrl;
        });

        if (imgData && imgData.length > 500) {
          return { imgData, aspect: svgH / svgW };
        }
      }
    } catch (err) {
      console.warn("SVG chart capture failed:", err.message);
    }

    return null;
  }

  // ── PDF download ─────────────────────────────────────────────────────
  async function downloadPDF(data, dateFilter, filters) {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const MARGIN = 14;
    const HEADER_H = 40;
    const from = dateFilter?.startDate ?? "-";
    const to = dateFilter?.endDate ?? "-";
    const fontFamily = await loadKarlaFont(doc);

    const [jswImg, schaefflerImg] = await loadBrandingLogos();

    const cluster = masterData.find(
      (c) => c.ClusterId === Number(filters.areaId),
    );
    const areaLabel = cluster
      ? formatClusterName(cluster.ClusterName)
      : "All Areas";
    const line = masterData
      .flatMap((c) => c.Lines || [])
      .find((l) => l.LineId === Number(filters.lineId));
    const lineLabel = line ? line.LineName : "All Lines";

    const subLines = [
      `Report Duration: ${from}  To  ${to}`,
      `Area: ${areaLabel} | Line: ${lineLabel} | Model: ${filters.model || "All"} | Shift: ${filters.shifts && !filters.shifts.includes("All")
        ? filters.shifts.join(", ")
        : "All"
      }`,
    ];

    function drawPageChrome(pageNum, totalPages) {
      drawPdfPageChrome(doc, {
        pageNum,
        totalPages,
        fontFamily,
        title: "Line Cycle Time Report",
        subLines,
        jswImg,
        schaefflerImg,
      });
    }

    // Chart capture
    const chartResult = await captureChartImage(chartRef);
    let chartImgData = chartResult?.imgData ?? null;
    let chartAspect = chartResult?.aspect ?? 0.38;

    const pageW = doc.internal.pageSize.getWidth();
    const contentTop = HEADER_H + 22;
    let chartBottom = contentTop + 7;

    doc.setFont(fontFamily, "bold");
    doc.setFontSize(10);
    doc.setTextColor(22, 70, 161);
    doc.text("Line Cycle Time Chart", MARGIN, contentTop + 4);

    if (chartImgData) {
      const availW = pageW - 2 * MARGIN;
      const chartH = Math.min(availW * chartAspect, 95);
      doc.addImage(chartImgData, "PNG", MARGIN, chartBottom, availW, chartH);
      chartBottom = chartBottom + chartH + 6;
    }

    const tableStartY = chartBottom;

    autoTable(doc, {
      startY: tableStartY,
      ...buildAutoTableConfig(LINE_CT_PDF_COLUMNS, data, doc, fontFamily),
      tableWidth: "auto",
      didDrawPage: (hookData) => {
        drawPageChrome(hookData.pageNumber, 1);
      },
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      drawPageChrome(p, totalPages);
    }

    doc.save(`Line_Cycle_Time_${from}_to_${to}.pdf`);
  }

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    if (!hasSearched && !isBg) return;
    setDownloading(true);
    try {
      const activeDateFilter = {
        startDate: currentDateFilter.startDate || targetDateRange?.start || getToday(),
        endDate: currentDateFilter.endDate || targetDateRange?.end || getToday(),
        startTime: currentDateFilter.startTime || "00:00",
        endTime: currentDateFilter.endTime || "23:59",
      };

      const res = await lineCycleTimeApi.report(
        buildParams(activeDateFilter, 1, 999999),
      );
      const designCT = appConfig.lineCycleTime.designCT;
      const allRows = (res.tableData || []).map((r, i) => ({
        ...r,
        sr: i + 1,
        Area: formatClusterName(clusterMap[r.Area] || String(r.Area || "")),
        startDateTime: `${normalizeDateToYMD(r.Date)} ${r.StartTime || ""}`.trim(),
        endDateTime: `${normalizeDateToYMD(r.Date)} ${r.EndTime || ""}`.trim(),
        dct: designCT,
      }));
      await Promise.all([
        downloadPDF(allRows, activeDateFilter, filters),
        handleExcelDownload(allRows),
      ]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  }, [
    downloading,
    hasSearched,
    isBg,
    currentDateFilter,
    targetDateRange,
    buildParams,
    clusterMap,
    filters,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || loading || !hasSearched || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, loading, hasSearched, tableData.length]);

  // ── Table columns ────────────────────────────────────────────────────
  const tableColumns = [
    { key: "sr", label: "Sr. No." },
    { key: "Area", label: "Area", sortable: true },
    { key: "Line", label: "Line", sortable: true },
    { key: "BiwNo", label: "BIW No", sortable: true },
    { key: "Model", label: "Model", sortable: true },
    { key: "Shift", label: "Shift", type: "shift", sortable: true },
    { key: "startDateTimeDisplay", label: "Start Date & Time", sortable: true },
    { key: "endDateTimeDisplay", label: "End Date & Time", sortable: true },
    {
      key: "actDisplay",
      label: "Actual Cycle Time (sec)",
      render: (item) => {
        const value = item.act;
        const design = item.dct;
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
    { key: "dctDisplay", label: "Design Cycle Time (sec)" },
  ];


  // const areaHasNoLines = masterData.length > 0 && areaOptions.length === 0;
  const areaHasNoLines =
    !!filters.areaId && lineOptions.length === 0;

  return (
    <div>
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFiltersChange}
      />

      <DateRangeBar
        onSearch={handleSearch}
        showTime={true}
        showDownload={true}
        isDownloading={downloading}
        onDownload={handleDownload}
        showSearch={true}
        searchLabel="BIW No."
        searchPlaceholder="Search BIW..."
        searchValue={biwSearch}
        onSearchValueChange={setBiwSearch}
        reportName="Line_Cycle_Time"
        selectedStartDate={currentDateFilter.startDate}
        selectedEndDate={currentDateFilter.endDate}
      />

      {areaHasNoLines ? (
        <NoDataState />
      ) : (
        <>
          {/* Chart + Table */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {hasSearched && chartData.length > 0 && (
              <h2 className="mb-4 text-center text-lg font-semibold text-gray-900">
                {buildChartTitle(filters, masterData)}
              </h2>
            )}

            {loading && !hasSearched ? (
              <ChartShimmer />
            ) : !hasSearched ? (
              <SearchPromptState pageName="Line Cycle Time" />
            ) : fetchError ? (
              <p className="text-center text-red-500 py-12 text-sm">{fetchError}</p>
            ) : loading ? (
              <ChartShimmer />
            ) : chartData.length === 0 ? (
              <NoDataState />
            ) : (
              <div ref={chartRef}>
                <div className="h-[500px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                      barCategoryGap="30%"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="x"
                        interval={0}
                        tick={<CustomXAxisTick />}
                        height={80}
                      />
                      <YAxis
                        label={{
                          value: "Time (Seconds)",
                          angle: -90,
                          position: "insideLeft",
                          offset: 10,
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
                      />
                      <Bar
                        dataKey="act"
                        name="Actual Cycle Time"
                        radius={[4, 4, 0, 0]}
                        fill="#10b981"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={entry.act <= entry.dct ? "#10b981" : "#dc2626"}
                          />
                        ))}
                      </Bar>
                      <Line
                        dataKey="dct"
                        name="Design Cycle Time"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        dot={false}
                        type="monotone"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Table — only renders when there's data, same condition as chart */}
          {loading && !hasSearched ? (
            <TableShimmer rows={8} />
          ) : hasSearched && !fetchError && !loading && chartData.length > 0 ? (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 bg-white/60 rounded-xl z-10" />
              )}
              <DataTable
                title={`Line Cycle Time Records — ${(pagination.totalRecords ?? 0).toLocaleString()} total`}
                columns={tableColumns}
                data={displayData}
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