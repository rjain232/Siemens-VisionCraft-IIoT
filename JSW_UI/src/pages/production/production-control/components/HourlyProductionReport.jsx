import { useState, useMemo, useEffect, useCallback, useRef, memo } from "react";
import { Activity } from "lucide-react";
import Chart from "react-apexcharts";
import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../sharedComponents/DataTable";
import {
  productionApi,
  masterApi,
  lineVariantApi,
} from "../../../../services/api";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../../utils/PdfUtils";
import { NoDataState } from "../../../../sharedComponents/EmptyState";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";
import { saveExcel } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";

const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };
const SHIFT_GRADIENT_COLORS = { A: "#4a6cc7", B: "#6ea8f8", C: "#2dd4a0" };
const NULL_LABEL = "null";

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_SELECT_OPTIONS = [
  { value: "All", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];
const today = new Date().toISOString().split("T")[0];
const getKey = (d) => `${d.Date}__${d.HourRange}`;

function resolveActualTarget(item, model) {
  if (model === "J5")
    return { Actual: item.J5_Actual ?? 0, Target: item.J5_Target ?? 0 };
  if (model === "V23")
    return { Actual: item.V23_Actual ?? 0, Target: item.V23_Target ?? 0 };
  if (model === "All")
    return { Actual: item.Actual ?? 0, Target: item.JPH_J5_V23 ?? 0 };

  return { Actual: item.Actual ?? 0, Target: item.JPH_J5_V23 ?? 0 };
}

function expandAllVariantRows(data) {
  return data.flatMap((item) => [
    {
      ...item,
      Model: "J5",
      Actual: item.J5_Actual ?? 0,
      Target: item.J5_Target ?? 0,
      Remark: item.J5_Remark ?? "",
    },
    {
      ...item,
      Model: "V23",
      Actual: item.V23_Actual ?? 0,
      Target: item.V23_Target ?? 0,
      Remark: item.V23_Remark ?? "",
    },
  ]);
}

// Excel download
async function downloadExcel(data, dateRange) {
  const XLSX = await import("xlsx");
  const headers = [
    "Sr.No.",
    "Line",
    "Model",
    "Shift",
    "Date",
    "Hour Range",
    "Actual Production",
    "Target Production",
    "Remark",
  ];
  const rows = data.map((item, i) => [
    i + 1,
    item.Line,
    item.Model ?? "All",
    item.Shift,
    item.Date,
    item.HourRange,
    item.Actual,
    item.Target,
    item.Remark ?? "",
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 8 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 14 },
    { wch: 16 },
    { wch: 18 },
    { wch: 18 },
    { wch: 30 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Hourly Production");
  const filename = `Hourly_Production_${dateRange?.from ?? "from"}_to_${dateRange?.to ?? "to"}.xlsx`;
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveExcel(excelBuffer, filename);
}

// Chart
async function captureChartImage(chartWrapperEl) {
  if (!chartWrapperEl) return { imgData: null, aspect: 0.38 };
  const apexEl = chartWrapperEl.querySelector("[id^='apexcharts']");

  if (apexEl) {
    try {
      const chartId = apexEl.id.replace("apexcharts", "");
      const ApexCharts = (await import("apexcharts")).default;
      const result = await ApexCharts.exec(chartId, "dataURI", { scale: 2 });
      if (result?.imgURI && result.imgURI.startsWith("data:image")) {
        const rect = apexEl.getBoundingClientRect();
        const aspect = rect.width > 0 ? rect.height / rect.width : 0.38;
        return { imgData: result.imgURI, aspect };
      }
    } catch (e) {
      console.warn("Tier1 ApexCharts.exec failed:", e.message);
    }
  }

  // SVG serialization → offscreen Canvas
  if (apexEl) {
    try {
      const svgEl = apexEl.querySelector("svg");
      if (svgEl) {
        const svgW = svgEl.getBoundingClientRect().width || 1200;
        const svgH = svgEl.getBoundingClientRect().height || 460;
        const clone = svgEl.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const bgRect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        bgRect.setAttribute("width", "100%");
        bgRect.setAttribute("height", "100%");
        bgRect.setAttribute("fill", "#ffffff");
        clone.insertBefore(bgRect, clone.firstChild);
        const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const result = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const cvs = document.createElement("canvas");
            cvs.width = Math.round(svgW * 2);
            cvs.height = Math.round(svgH * 2);
            const ctx = cvs.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            URL.revokeObjectURL(url);
            resolve({
              imgData: cvs.toDataURL("image/png"),
              aspect: cvs.height / cvs.width,
            });
          };
          img.onerror = (e) => {
            URL.revokeObjectURL(url);
            reject(e);
          };
          img.src = url;
        });
        return result;
      }
    } catch (e) {
      console.warn("Tier2 SVG→Canvas failed:", e.message);
    }
  }

  // html2canvas
  try {
    const { default: html2canvas } = await import("html2canvas");
    const cvs = await html2canvas(chartWrapperEl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      foreignObjectRendering: false,
    });
    return {
      imgData: cvs.toDataURL("image/png"),
      aspect: cvs.height / cvs.width,
    };
  } catch (e) {
    console.warn("Tier3 html2canvas failed:", e.message);
  }

  return { imgData: null, aspect: 0.38 };
}

async function downloadPDF(
  chartRef,
  data,
  dateRange,
  filters = {},
  activeShifts = [],
  lineLabel = null,
  areaLabel = null,
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const FONT = await loadKarlaFont(doc);
  const pageW = doc.internal.pageSize.getWidth();

  const MARGIN = 14;
  const HEADER_H = 40;
  const from = dateRange?.from ?? "-";
  const to = dateRange?.to ?? "-";

  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const resolvedAreaLabel =
    !filters.area || filters.area === "all"
      ? "All"
      : (areaLabel ?? filters.area);
  const resolvedLineLabel =
    !filters.line || filters.line === "all"
      ? "All"
      : (lineLabel ?? filters.line);
  const modelLabel = filters.model || "All";
  const shiftLabel = activeShifts.length ? activeShifts.join(", ") : "All";

  const subLines = [
    `Report Duration: ${from}  To  ${to}`,
    `Model: ${modelLabel}   |   Area: ${resolvedAreaLabel}   |   Line: ${resolvedLineLabel}   |   Shifts: ${shiftLabel}`,
  ];

  function drawPageChrome(pageNum, totalPages) {
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily: FONT,
      title: "Hourly Production Report",
      subLines,
      jswImg,
      schaefflerImg,
    });
  }

  const { imgData: chartImgData, aspect: chartAspect } =
    await captureChartImage(chartRef?.current ?? null);

  const contentTop = HEADER_H + 22;
  let chartBottom = contentTop + 7; // offset for chart title line

  // Chart section title
  doc.setFont(FONT, "bold");
  doc.setFontSize(10);
  doc.setTextColor(22, 70, 161);
  doc.text("Hourly Production Chart", MARGIN, contentTop + 4);

  if (chartImgData) {
    const availW = pageW - 2 * MARGIN;
    const chartH = Math.min(availW * chartAspect, 95);
    doc.addImage(chartImgData, "PNG", MARGIN, chartBottom, availW, chartH);
    chartBottom = chartBottom + chartH + 6;
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "[Chart image could not be captured]",
      pageW / 2,
      chartBottom + 8,
      { align: "center" },
    );
    chartBottom = chartBottom + 14;
  }

  const pdfData = data.map((item) => ({ ...item, Model: item.Model ?? "All" }));

  autoTable(doc, {
    startY: chartBottom,
    ...buildAutoTableConfig(TABLE_COLS, pdfData, doc, FONT),
    tableWidth: "auto"
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`Hourly_Production_${from}_to_${to}.pdf`);
}

const HourlyBarChart = memo(function HourlyBarChart({
  data,
  activeShifts,
  chartRef,
}) {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth < 1024;
  const chartHeight = isMobile ? 280 : isTablet ? 360 : 450;
  const fontSize = isMobile ? "7px" : "10px";
  const colWidth = isMobile
    ? activeShifts.length > 1
      ? "99%"
      : "85%"
    : activeShifts.length > 1
      ? "95%"
      : "70%";

  const uniqueKeys = useMemo(
    () =>
      [...new Set(data.map(getKey))].sort((a, b) => {
        const [dateA, rangeA] = a.split("__");
        const [dateB, rangeB] = b.split("__");
        const hourA = parseInt(rangeA.split(" - ")[0].split(":")[0]);
        const hourB = parseInt(rangeB.split(" - ")[0].split(":")[0]);
        const normA = hourA >= 6 ? hourA - 6 : hourA + 18;
        const normB = hourB >= 6 ? hourB - 6 : hourB + 18;
        if (normA !== normB) return normA - normB;
        return dateA.localeCompare(dateB);
      }),
    [data],
  );

  const displayLabels = useMemo(
    () =>
      uniqueKeys.map((key) => {
        const [date, time] = key.split("__");
        return [time, date];
      }),
    [uniqueKeys],
  );

  // O(N) Map build → O(1) lookups in series instead of O(N×M) repeated filter
  const keyedData = useMemo(() => {
    const map = {};
    data.forEach((d) => {
      const k = getKey(d);
      if (!map[k]) map[k] = {};
      if (!map[k][d.Shift]) map[k][d.Shift] = [];
      map[k][d.Shift].push(d);
    });
    return map;
  }, [data]);

  const series = useMemo(() => {
    const shiftSeries = activeShifts.map((shift) => ({
      name: `Actual`,
      type: "column",
      data: uniqueKeys.map((key) =>
        (keyedData[key]?.[shift] ?? []).reduce(
          (sum, d) => sum + (d.Actual || 0),
          0,
        ),
      ),
    }));

    const targetSeries = {
      name: "Target",
      type: "line",
      data: uniqueKeys.map((key) => {
        const items = Object.values(keyedData[key] ?? {}).flat();
        if (items.length === 0) return 0;
        return Math.round(
          items.reduce((s, d) => s + (d.Target || 0), 0) / items.length,
        );
      }),
    };

    return [...shiftSeries, targetSeries];
  }, [activeShifts, uniqueKeys, keyedData]);

  const options = useMemo(
    () => ({
      chart: {
        id: "hourly-production-chart",
        type: "line",
        height: chartHeight,
        stacked: activeShifts.length > 1,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      plotOptions: {
        bar: { horizontal: false, borderRadius: 0, columnWidth: colWidth },
      },
      stroke: {
        width: [...Array(activeShifts.length).fill(0), 2],
        curve: "smooth",
        dashArray: [...Array(activeShifts.length).fill(0), 4],
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      xaxis: {
        categories: displayLabels,
        title: {
          text: "Date → Hour Range",
          style: {
            fontSize: isMobile ? "11px" : "14px",
            fontWeight: 700,
            color: "#374151",
          },
        },
        labels: {
          rotate: -45,
          rotateAlways: true,
          style: { fontSize, fontWeight: 600, colors: "#374151" },
        },
      },
      yaxis: {
        title: {
          text: "Production Count",
          style: {
            fontSize: isMobile ? "11px" : "14px",
            fontWeight: 700,
            color: "#374151",
          },
        },
        labels: { formatter: (val) => Math.round(val) },
      },
      colors: [...activeShifts.map((s) => SHIFT_COLORS[s]), "#000000"],
      fill: {
        type: [...Array(activeShifts.length).fill("gradient"), "solid"],
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.3,
          gradientToColors: [...activeShifts.map((s) => SHIFT_GRADIENT_COLORS[s]), "#F97316"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          const key = uniqueKeys[dataPointIndex];
          const [date, hourRange] = key ? key.split("__") : ["", ""];
          let html = `
          <div style="font-size:12px;padding:4px 8px;background:#f3f4f6;border-bottom:1px solid #e5e7eb;">
            <div style="font-weight:700;color:#374151;">📅 ${date}</div>
            <div style="font-weight:600;color:#6b7280;">🕐 ${hourRange}</div>
          </div>
          <div style="padding:6px 8px;">`;
          series.forEach((s, i) => {
            const val = s[dataPointIndex];
            if (val > 0) {
              const name = w.globals.seriesNames[i];
              const color = w.globals.colors[i];
              html += `<div style="display:flex;align-items:center;margin:4px 0;">
              <span style="width:12px;height:12px;background:${color};display:inline-block;margin-right:8px;border-radius:2px;"></span>
              <span style="font-size:12px;font-weight:600;">${name}:</span>
              <span style="margin-left:auto;font-weight:bold;font-size:12px;padding-left:12px;">${Math.round(val)}</span>
            </div>`;
            }
          });
          html += `</div>`;
          return html;
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: isMobile ? "11px" : "13px",
        fontWeight: 600,
        markers: { width: 12, height: 12, radius: 3 },
        itemMargin: { horizontal: isMobile ? 5 : 10, vertical: 5 },
      },
    }),
    [
      activeShifts,
      uniqueKeys,
      displayLabels,
      chartHeight,
      colWidth,
      fontSize,
      isMobile,
    ],
  );

  const title =
    activeShifts.length === 0
      ? "Hourly Production Count - No Shifts Selected"
      : activeShifts.length === 3
        ? "Hourly Production Count - All Shifts"
        : activeShifts.length === 1
          ? `Hourly Production Count - Shift ${activeShifts[0]}`
          : `Hourly Production Count - Shifts ${activeShifts.join(" & ")}`;

  if (activeShifts.length === 0) {
    return (
      <div
        className="bg-white rounded-xl shadow-lg pt-4 px-3 sm:px-6 pb-6 w-full mt-6"
        ref={chartRef}
      >
        <h2 className="text-base sm:text-xl font-bold text-center text-gray-800 flex-1">
          {title}
        </h2>
        <div className="flex items-center justify-center h-40 sm:h-64 text-gray-500">
          <p className="text-sm sm:text-base">
            Please select at least one shift to view the graph
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-lg pt-4 px-3 sm:px-6 pb-6 w-full mt-6"
      ref={chartRef}
    >
      <h2 className="text-base sm:text-xl font-bold text-center mb-4 text-gray-800">
        {title}
      </h2>
      <div
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
          touchAction: "pan-y",
          paddingBottom: "8px",
        }}
      >
        <Chart
          options={options}
          series={series}
          type="line"
          height={chartHeight}
        />
      </div>
    </div>
  );
});

const TABLE_COLS = [
  { key: "sr", label: "Sr. No.", sortable: false },
  { key: "Line", label: "Line", sortable: true, type: "primary" },
  { key: "Model", label: "Model", sortable: true },
  { key: "Shift", label: "Shift", sortable: true, type: "shift" },
  { key: "Date", label: "Date", sortable: true },
  { key: "HourRange", label: "Hour Range", sortable: true },
  {
    key: "Actual",
    label: "Actual Prod",
    sortable: true,
    type: "actual",
    targetKey: "Target",
  },
  { key: "Target", label: "Target Prod", sortable: true },
  { key: "Remark", label: "Remark", sortable: false },
];

function RemarkCell({ item, onSaved }) {
  const [remark, setRemark] = useState(item.Remark ?? "");
  const [savedRemark, setSavedRemark] = useState(item.Remark ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    const val = remark.trim();
    setSaving(true);
    setError(null);
    try {
      await productionApi.updateHourlyProductionRemarks({
        Id: item.Id,
        VariantCode: item.Model,
        Remark: val,
      });
      setSavedRemark(val);
      setIsEditing(false);
      onSaved?.(item.Id, val, item.Model);
    } catch (err) {
      setError(err.message || "Failed to save remark");
    } finally {
      setSaving(false);
    }
  };

  if (savedRemark && !isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex-1 text-sm font-medium text-slate-700 px-3 py-2 bg-sky-50 border border-sky-100 rounded-lg truncate">
          {savedRemark}
        </span>
        <button
          type="button"
          onClick={() => {
            setRemark(savedRemark);
            setIsEditing(true);
          }}
          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-300 text-sky-700 hover:bg-sky-50 transition-colors"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 min-w-[180px]">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={remark}
          disabled={saving}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Add remark..."
          className="flex-1 text-sm font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 placeholder:text-slate-300 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all disabled:opacity-50"
        />
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "rgb(22, 70, 161)" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      {error && (
        <span className="text-[11px] font-medium text-red-500 px-1">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}

export default function HourlyProductionReport({
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

  const [dateRange, setDateRange] = useState(
    targetDateRange
      ? { from: targetDateRange.start, to: targetDateRange.end }
      : { from: today, to: today },
  );
  const [filters, setFilters] = useState({
    model: isBg ? "All" : "",
    area: targetFilters?.area ? String(targetFilters.area) : "all",
    line: targetFilters?.line ? String(targetFilters.line) : "all",
    shifts: targetFilters?.shifts || (isBg ? ["All"] : ["A"]),
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef(null);
  const [allRawData, setAllRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(isBg);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    pageNumber: 1,
    pageSize: 10,
  });
  const [variantOptions, setVariantOptions] = useState([]);
  const [masterClusters, setMasterClusters] = useState([]);
  const [clusterOptions, setClusterOptions] = useState([]);
  const [allLineOptions, setAllLineOptions] = useState([]);

  const activeShifts = useMemo(
    () =>
      (filters.shifts ?? []).includes("All")
        ? INDIVIDUAL_SHIFTS
        : [...(filters.shifts ?? [])].sort(),
    [filters.shifts],
  );

  const filteredLineOptions = useMemo(() => {
    if (filters.area === "all") {
      return allLineOptions;
    }
    const cluster = masterClusters.find(
      (c) => String(c.ClusterId) === filters.area,
    );
    return (cluster?.Lines ?? []).map((l) => ({
      value: String(l.LineId),
      label: l.LineName,
    }));
  }, [filters.area, masterClusters, allLineOptions]);

  const noLinesAvailable = useMemo(() => {
    if (filters.area === "all" || filters.area === "__null__") return false;
    const cluster = masterClusters.find(
      (c) => String(c.ClusterId) === filters.area,
    );
    return !!cluster && (cluster.Lines ?? []).length === 0;
  }, [filters.area, masterClusters]);

  const filteredData = useMemo(() => {
    let data = allRawData;

    if (filters.line === "__null__" || filters.area === "__null__") {
      data = data.filter(
        (item) => item.Line === NULL_LABEL || item.Area === NULL_LABEL,
      );
    }

    if (activeShifts.length < 3) {
      data = data.filter((item) => activeShifts.includes(item.Shift));
    }

    return data.map((item) => {
      const { Actual, Target } = resolveActualTarget(item, filters.model);
      const Remark =
        filters.model === "V23"
          ? (item.V23_Remark ?? "")
          : (item.J5_Remark ?? "");
      return { ...item, Model: filters.model, Actual, Target, Remark };
    });
  }, [allRawData, filters.line, filters.area, filters.model, activeShifts]);

  const tableData = useMemo(() => {
    if (filters.model !== "All") return filteredData;

    return expandAllVariantRows(filteredData);
  }, [filters.model, filteredData]);

  const fetchData = useCallback(
    async (currentFilters, currentDateRange, page = 1, pageSize = 10) => {
      setLoading(true);
      setError(null);
      try {
        const active = (currentFilters.shifts ?? []).includes("All")
          ? []
          : (currentFilters.shifts ?? []);

        const params = {};
        if (currentDateRange?.from) params.from = currentDateRange.from;
        if (currentDateRange?.to) params.to = currentDateRange.to;

        if (
          currentFilters.line !== "__null__" &&
          currentFilters.area !== "__null__"
        ) {
          if (currentFilters.area !== "all")
            params.clusterId = currentFilters.area;
          if (currentFilters.line !== "all")
            params.lineId = currentFilters.line;
        }
        // model is NOT sent to the API — SP no longer has @Model param
        if (active.length > 0 && active.length < 3)
          params.shift = active.join(",");

        params.pageNumber = page;
        params.pageSize = pageSize;

        const result = await productionApi.hourlyReport(params);
        const data = result?.data;
        const rows = data?.rows || [];

        setPagination({
          totalRecords: data?.totalRows ?? 0,
          totalPages: data?.totalPages ?? 0,
          pageNumber: data?.currentPage ?? page,
          pageSize: data?.pageSize ?? pageSize,
        });

        const mapped = rows.map((item) => ({
          Id: item.Id ?? item.id,
          Line: item.Line ?? NULL_LABEL,
          Area: item.Area ?? NULL_LABEL,
          Shift: item.Shift ?? item.shift ?? NULL_LABEL,
          Date: item.Date ? String(item.Date).split("T")[0] : NULL_LABEL,
          HourRange: item.HourRange ?? item.hourRange ?? NULL_LABEL,
          Actual: item.Actual ?? 0,
          JPH_J5_V23: item.JPH_J5_V23 ?? 0,
          J5_Actual: item.J5_Actual ?? 0,
          J5_Target: item.J5_Target ?? 0,
          J5_Remark: item.J5_Remark ?? "",
          V23_Actual: item.V23_Actual ?? 0,
          V23_Target: item.V23_Target ?? 0,
          V23_Remark: item.V23_Remark ?? "",
          // Remark shown for the currently selected model
          Remark:
            currentFilters.model === "V23"
              ? (item.V23_Remark ?? "")
              : (item.J5_Remark ?? ""),
        }));

        setAllRawData(mapped);
      } catch (err) {
        setError(err.message);
        setAllRawData([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        const formatClusterName = (name) =>
          name.replace(
            /^Cluster(\d+)$/i,
            (_, n) => `Cluster ${n.padStart(2, "0")}`,
          );

        setClusterOptions(
          clusters.map((c) => ({
            value: String(c.ClusterId),
            label: formatClusterName(c.ClusterName),
          })),
        );

        const allLines = clusters.flatMap((c) => c.Lines ?? []);
        setAllLineOptions(
          allLines.map((l) => ({ value: String(l.LineId), label: l.LineName })),
        );

        if (targetFilters?.line && targetFilters.line !== "all") {
          const matchedCluster = clusters.find(
            (c) =>
              (targetFilters.area && String(c.ClusterId) === String(targetFilters.area)) ||
              (c.Lines ?? []).some((l) => String(l.LineId) === String(targetFilters.line)),
          );
          setFilters((prev) => ({
            ...prev,
            area: matchedCluster ? String(matchedCluster.ClusterId) : String(targetFilters.area || "all"),
            line: String(targetFilters.line),
            shifts: targetFilters.shifts || ["All"],
          }));
          setHasSearched(true);
        } else if (!isBg) {
          const firstCluster = clusters[0];
          if (firstCluster) {
            const firstClusterId = String(firstCluster.ClusterId);
            const firstLine = (firstCluster.Lines ?? [])[0];
            const firstLineId = firstLine ? String(firstLine.LineId) : "all";

            setFilters((prev) => ({
              ...prev,
              area: firstClusterId,
              line: firstLineId,
            }));
          }
        }
      } catch (err) {
        console.error("Master data failed:", err);
      }
    };
    loadMasterData();
  }, [isBg]);

  useEffect(() => {
    const fetchLineVariant = async () => {
      try {
        const res = await lineVariantApi.getLineAndVariantData();

        const variants = res?.data?.variants || [];

        const options = [
          { value: "All", label: "All" },
          ...variants
            .filter((variant) => variant !== "All")
            .map((variant) => ({
              value: variant,
              label: variant,
            })),
        ];
        setVariantOptions(options);
        if (!isBg && variants.length > 0) {
          setFilters((prev) => ({ ...prev, model: options[0]?.value || "All" }));
        }
      } catch (err) {
        console.error("Line Variant API Error:", err);
      }
    };

    fetchLineVariant();
  }, []);

  const handleFilterChange = useCallback(
    (newFilters) => {
      if (newFilters.area !== filters.area) {
        if (newFilters.area === "all") {
          newFilters.line = "all";
        } else if (newFilters.area === "__null__") {
          newFilters.line = "__null__";
        } else {
          const selectedCluster = masterClusters.find(
            (c) => String(c.ClusterId) === newFilters.area,
          );
          const firstLine = (selectedCluster?.Lines ?? [])[0];
          newFilters.line = firstLine ? String(firstLine.LineId) : "all";
        }
      }

      const prevShifts = filters.shifts ?? [];
      let nextShifts = newFilters.shifts ?? prevShifts;
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
      newFilters.shifts = nextShifts;

      setFilters(newFilters);

      if (hasSearched) fetchData(newFilters, dateRange, 1);
    },
    [filters.area, filters.shifts, masterClusters, hasSearched, fetchData, dateRange],
  );

  const handleDateChange = useCallback(
    (from, to) => {
      const newDateRange = { from, to };
      setHasSearched(true);
      setDateRange(newDateRange);
      fetchData(filters, newDateRange, 1);
    },
    [filters, fetchData],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1 || newPage > pagination.totalPages || loading) return;
      fetchData(filters, dateRange, newPage);
    },
    [pagination.totalPages, loading, filters, dateRange, fetchData],
  );

  const handlePageSizeChange = useCallback(
    (newSize) => {
      fetchData(filters, dateRange, 1, newSize);
    },
    [fetchData, filters, dateRange],
  );

  const serverPagination = useMemo(
    () => ({
      page: pagination.pageNumber,
      pageSize: pagination.pageSize,
      totalRecords: pagination.totalRecords,
      totalPages: pagination.totalPages,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    }),
    [pagination, handlePageChange, handlePageSizeChange],
  );

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      // Fetch ALL records (not just current page) for download
      const active = (filters.shifts ?? []).includes("All")
        ? []
        : (filters.shifts ?? []);
      const params = {};
      if (dateRange?.from) params.from = dateRange.from;
      if (dateRange?.to) params.to = dateRange.to;
      if (filters.line !== "__null__" && filters.area !== "__null__") {
        if (filters.area !== "all") params.clusterId = filters.area;
        if (filters.line !== "all") params.lineId = filters.line;
      }
      if (active.length > 0 && active.length < 3) params.shift = active.join(",");
      params.pageNumber = 1;
      params.pageSize = pagination.totalRecords || 99999;

      const result = await productionApi.hourlyReport(params);
      const allMapped = (result?.data?.rows || []).map((item) => ({
        Id: item.Id ?? item.id,
        Line: item.Line ?? NULL_LABEL,
        Area: item.Area ?? NULL_LABEL,
        Shift: item.Shift ?? item.shift ?? NULL_LABEL,
        Date: item.Date ? String(item.Date).split("T")[0] : NULL_LABEL,
        HourRange: item.HourRange ?? item.hourRange ?? NULL_LABEL,
        Actual: item.Actual ?? 0,
        JPH_J5_V23: item.JPH_J5_V23 ?? 0,
        J5_Actual: item.J5_Actual ?? 0,
        J5_Target: item.J5_Target ?? 0,
        J5_Remark: item.J5_Remark ?? "",
        V23_Actual: item.V23_Actual ?? 0,
        V23_Target: item.V23_Target ?? 0,
        V23_Remark: item.V23_Remark ?? "",
        Remark: filters.model === "V23" ? (item.V23_Remark ?? "") : (item.J5_Remark ?? ""),
      }));

      // Apply same client-side filtering as filteredData
      let allData = allMapped;
      if (filters.line === "__null__" || filters.area === "__null__") {
        allData = allData.filter((item) => item.Line === NULL_LABEL || item.Area === NULL_LABEL);
      }
      if (activeShifts.length < 3) {
        allData = allData.filter((item) => activeShifts.includes(item.Shift));
      }
      allData = allData.map((item) => {
        const { Actual, Target } = resolveActualTarget(item, filters.model);
        const Remark = filters.model === "V23" ? (item.V23_Remark ?? "") : (item.J5_Remark ?? "");
        return { ...item, Model: filters.model, Actual, Target, Remark };
      });

      if (filters.model === "All") {
        allData = expandAllVariantRows(allData);
      }

      await Promise.all([
        downloadPDF(
          chartRef,
          allData,
          dateRange,
          filters,
          activeShifts,
          filteredLineOptions.find((o) => o.value === filters.line)?.label ??
          null,
          clusterOptions.find((o) => o.value === filters.area)?.label ?? null,
        ),
        downloadExcel(allData, dateRange),
      ]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [
    isDownloading,
    filters,
    dateRange,
    activeShifts,
    filteredLineOptions,
    clusterOptions,
    pagination.totalRecords,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || loading || hasSearched === false || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    setTimeout(() => {
      if (handleDownloadRef.current) {
        handleDownloadRef.current();
      }
    }, 1200);
    // Do not return clearTimeout here, otherwise rapid state changes (like master data loading)
    // will cancel the timeout and permanently stall the background worker.
  }, [isBg, loading, hasSearched]);

  const config = useMemo(
    () => [
      { type: "select", key: "model", label: "Model", options: variantOptions },
      { type: "select", key: "area", label: "Area", options: clusterOptions },
      {
        type: "select",
        key: "line",
        label: "Line",
        options: filteredLineOptions,
      },
      { type: "divider" },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_SELECT_OPTIONS,
      },
    ],
    [variantOptions, clusterOptions, filteredLineOptions],
  );

  const handleRemarkSaved = useCallback(
    (Id, remarkText, model) => {
      setAllRawData((prev) =>
        prev.map((row) => {
          if (row.Id !== Id) return row;
          const field = model === "V23" ? "V23_Remark" : "J5_Remark";
          return { ...row, Remark: remarkText, [field]: remarkText };
        }),
      );
    },
    [],
  );

  const screenColumns = useMemo(
    () =>
      TABLE_COLS.map((col) =>
        col.key === "Remark"
          ? {
            ...col,
            render: (item) => (
              <RemarkCell
                key={item.Id}
                item={item}
                onSaved={handleRemarkSaved}
              />
            ),
          }
          : col,
      ),
    [handleRemarkSaved],
  );

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <FilterBar
        config={config}
        filters={filters}
        onChange={handleFilterChange}
      />

      <DateRangeBar
        selectedStartDate={dateRange.from}
        selectedEndDate={dateRange.to}
        onSearch={handleDateChange}
        showDownload={true}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        reportName="Hourly_Production"
      />

      {noLinesAvailable ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center mt-4">
          <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
            <Activity size={22} className="text-sky-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            No line or station available for the selected area
          </p>
        </div>
      ) : !hasSearched ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center mt-4">
          <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
            <Activity size={22} className="text-sky-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            Select filters and click Search to view Hourly Production Count data
          </p>
        </div>
      ) : (
        <>
          {loading && (
            <div className="mt-4">
              <ChartShimmer />
              <TableShimmer rows={8} />
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-600">⚠️ Error: {error}</p>
            </div>
          )}

          {!loading && !error && filteredData.length === 0 && <NoDataState />}

          {!loading && !error && filteredData.length > 0 && (
            <>
              <HourlyBarChart
                data={filteredData}
                activeShifts={activeShifts}
                chartRef={chartRef}
              />
              <DataTable
                columns={screenColumns}
                data={tableData}
                title="Hourly Production Records"
                serverPagination={serverPagination}
                hidePageSizeSelector
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
