import { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import ChartCard from "../productionOverviewComp/ChartCard";
import ProductionLineGraph from "../productionOverviewComp/ProductionLineGraph";
import ShiftwiseProductionPieChart from "../productionOverviewComp/ShiftwiseProductionPieChart";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../../sharedComponents/FilterBar";
import { productionApi } from "../../../../services/api";
import { generateExcelWithSheets } from "../../../../utils/ExcelUtils";
import DataTable from "../../../../sharedComponents/DataTable";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";

const columns_Overall = [
  { label: "Date", accessor: "Date" },
  { label: "Parts Produced", accessor: "PartsProduced" },
  { label: "Target", accessor: "Target" },
];
const columns_ShiftDetails = [
  { label: "Shift", accessor: "Shift" },
  { label: "Parts Produced", accessor: "PartsProduced" },
];
const columns_Shiftwise = [
  { label: "Date", accessor: "Date" },
  { label: "Shift", accessor: "Shift" },
  { label: "Parts Produced", accessor: "PartsProduced" },
  { label: "Target", accessor: "Target" },
];

const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };
const SHIFT_GRADIENT_COLORS = { A: "#4a6cc7", B: "#6ea8f8", C: "#2dd4a0" };

const GROUP_HEADER_BG = "#7dd3fc";

const GROUP_HEADER_RGB = { bg: [125, 211, 252], text: [12, 74, 110] };
const SUB_HEADER_RGB = { bg: [186, 230, 253], text: [12, 74, 110] };

const TOTALS_ROW_RGB = [3, 105, 161];
const TOTALS_ROW_RGB_STRONG = [7, 89, 133];

const ACTUAL_COL_INDEXES = [2, 4, 6, 8];

function drawValuePill(doc, FONT, x, y, width, height, actual, target) {
  if (isNaN(actual)) return;
  const hasTarget = !isNaN(target);
  const diff = hasTarget ? actual - target : 0;
  const isBelow = hasTarget && diff < 0;
  const delta = hasTarget ? Math.abs(diff) : 0;
  const mainColor = isBelow ? [220, 38, 38] : [22, 163, 74];
  const midY = y + height / 2;

  doc.setFont(FONT, "bold");
  doc.setFontSize(7);
  doc.setTextColor(...mainColor);

  if (delta > 0) {
    const numText = String(actual);
    const deltaText = (isBelow ? "-" : "+") + delta;
    doc.setFontSize(6);
    const pillW =
      (() => {
        try {
          return doc.getTextWidth(deltaText);
        } catch (_) {
          return deltaText.length * 1.8;
        }
      })() + 3;
    const pillH = 3.5;
    doc.setFontSize(7);
    const numW = (() => {
      try {
        return doc.getTextWidth(numText);
      } catch (_) {
        return numText.length * 2.2;
      }
    })();
    const gap = 1.5;
    const totalW = numW + gap + pillW;
    const startX = x + (width - totalW) / 2;
    doc.text(numText, startX + numW / 2, midY + 1.2, { align: "center" });
    const pillX = startX + numW + gap;
    const pillY = midY - pillH / 2;
    doc.setFillColor(...(isBelow ? [254, 226, 226] : [220, 252, 231]));
    doc.setDrawColor(...(isBelow ? [252, 165, 165] : [134, 239, 172]));
    doc.setLineWidth(0.2);
    doc.roundedRect(pillX, pillY, pillW, pillH, 0.8, 0.8, "FD");
    doc.setFont(FONT, "bold");
    doc.setFontSize(6);
    doc.setTextColor(...mainColor);
    doc.text(deltaText, pillX + pillW / 2, pillY + pillH * 0.72, {
      align: "center",
    });
  } else {
    doc.text(String(actual), x + width / 2, midY + 1.2, { align: "center" });
  }
}

const ShiftTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        padding: "12px 16px",
        fontFamily: "'Karla', sans-serif",
        fontSize: 12,
        minWidth: 160,
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontWeight: 700, color: "#374151", marginBottom: 8 }}>
        {label}
      </div>
      {["A", "B", "C"].map((shift) => {
        const entry = payload.find((p) => p.dataKey === shift);
        if (!entry) return null;
        const color = SHIFT_COLORS[shift];
        return (
          <div
            key={shift}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: color,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 600 }}>Shift {shift}:</span>
            <span
              style={{ marginLeft: "auto", fontWeight: 700, paddingLeft: 12 }}
            >
              {entry.value ?? 0}
            </span>
          </div>
        );
      })}
      {(() => {
        const t = payload.find((p) => p.dataKey === "target");
        return t ? (
          <div
            style={{
              marginTop: 6,
              paddingTop: 6,
              borderTop: "1px solid #e5e7eb",
              color: "#6b7280",
              fontWeight: 600,
            }}
          >
            Target: <b style={{ color: "#111" }}>{t.value}</b>
          </div>
        ) : null;
      })()}
    </div>
  );
};

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_SELECT_OPTIONS = [
  { value: "ALL", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];

const DURATION_OPTIONS = [
  { value: "4", label: "Last Week" },
  { value: "6", label: "Last Month" },
];

const ShiftProductionChart = memo(function ShiftProductionChart({ data = [] }) {
  const chartData = useMemo(() => {
    const map = {};
    data.forEach((d) => {
      if (!map[d.Date]) map[d.Date] = { date: d.Date, target: 0 };
      map[d.Date][d.Shift] = d.PartsProduced;
      map[d.Date].target = d.Target ?? 0;
    });
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  return (
    <div>
      <div style={{ height: 300, position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
          fontSize: 12, color: "#111827", fontWeight: 700, pointerEvents: "none", zIndex: 1,
        }}>
          Production Count
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 30, bottom: 60 }}
          >
            <defs>
              <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SHIFT_COLORS.A} stopOpacity={1} />
                <stop offset="100%" stopColor={SHIFT_GRADIENT_COLORS.A} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SHIFT_COLORS.B} stopOpacity={1} />
                <stop offset="100%" stopColor={SHIFT_GRADIENT_COLORS.B} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SHIFT_COLORS.C} stopOpacity={1} />
                <stop offset="100%" stopColor={SHIFT_GRADIENT_COLORS.C} stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fontWeight: 800, fill: "#111827" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={ShiftTooltip} />
            <Bar
              dataKey="A"
              name="Shift A"
              fill="url(#gradA)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="A"
                position="insideTop"
                fill="#ffffff"
                fontSize={13}
                fontWeight={700}
              />
            </Bar>
            <Bar
              dataKey="B"
              name="Shift B"
              fill="url(#gradB)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="B"
                position="insideTop"
                fill="#ffffff"
                fontSize={13}
                fontWeight={700}
              />
            </Bar>
            <Bar
              dataKey="C"
              name="Shift C"
              fill="url(#gradC)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="C"
                position="insideTop"
                fill="#ffffff"
                fontSize={13}
                fontWeight={700}
              />
            </Bar>
            {chartData.length > 1 && (
              <Line
                dataKey="target"
                name="Target"
                stroke="#000000"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 px-2 pt-2 pb-3">

        {Object.entries(SHIFT_COLORS).map(([shift, color]) => (
          <div key={shift} className="flex items-center gap-1.5 px-2 py-1">
            <span
              className="w-4 h-4 rounded-md flex-shrink-0"
              style={{
                background: `linear-gradient(160deg,${color} 0%,${color}60 100%)`,
                boxShadow: `0 2px 4px ${color}40`,
              }}
            />
            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
              Shift {shift}
            </span>
          </div>
        ))}
        <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
        <div className="flex items-center gap-2 px-3 py-1">
          <svg width="22" height="10" viewBox="0 0 22 10">
            <line
              x1="0"
              y1="5"
              x2="6"
              y2="5"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="5"
              x2="14"
              y2="5"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="5"
              x2="22"
              y2="5"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
            Target
          </span>
        </div>
      </div>
    </div>
  );
});

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getDateRangeFromDuration = (value) => {
  const today = new Date();

  let start, end;

  if (value === "4") {
    // Last 7 days
    end = new Date(today);
    start = new Date(today);
    start.setDate(today.getDate() - 7);
  } else if (value === "6") {
    // Last Month (1st → 1st)
    start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    end = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

const ProductionOverview = ({
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

  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [selectedLine, setSelectedLine] = useState(targetFilters?.lineId || targetFilters?.line || ""); // stores LineId
  const [selectedShifts, setSelectedShifts] = useState(targetFilters?.shifts || ["A"]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });

  const [detailsData, setDetailsData] = useState([]);

  const [shiftwiseData, setShiftwiseData] = useState([]);

  const [overallData, setOverallData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [lineOptions, setLineOptions] = useState([]);
  const [tablePage, setTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(10);

  useEffect(() => {
    if (lineOptions.length > 0 && !selectedLine) {
      setSelectedLine(lineOptions[0].value);
    }
  }, [lineOptions, selectedLine]);

  const requestIdRef = useRef(0);
  const overallChartRef = useRef(null);
  const shiftwiseChartRef = useRef(null);
  const cumulativeChartRef = useRef(null);

  const { tableData, shiftTotals, finalTableData } = useMemo(() => {
    const dataByDate = {};
    shiftwiseData.forEach((item) => {
      const date = item.Date;
      if (!dataByDate[date]) {
        dataByDate[date] = {
          date,
          A: 0,
          A_target: 0,
          B: 0,
          B_target: 0,
          C: 0,
          C_target: 0,
        };
      }
      const s = item.Shift?.trim();
      if (s === "A") {
        dataByDate[date].A = item.PartsProduced;
        dataByDate[date].A_target = item.Target;
      }
      if (s === "B") {
        dataByDate[date].B = item.PartsProduced;
        dataByDate[date].B_target = item.Target;
      }
      if (s === "C") {
        dataByDate[date].C = item.PartsProduced;
        dataByDate[date].C_target = item.Target;
      }
    });

    const tableData = Object.values(dataByDate)
      .map((row) => ({
        ...row,
        dailyTotal: (row.A || 0) + (row.B || 0) + (row.C || 0),
        dailyTargetTotal:
          (row.A_target || 0) + (row.B_target || 0) + (row.C_target || 0),
      }))
      .map((row, i) => ({ ...row, srNo: i + 1 }));

    const shiftTotals = detailsData.reduce((acc, item) => {
      const s = item.Shift?.trim();
      acc[s] = item.PartsProduced;
      acc[`${s}_target`] = item.Target ?? 0;
      return acc;
    }, {});

    const totalsRow = {
      date: "",
      srNo: "Shift Totals",
      A: shiftTotals.A ?? 0,
      A_target: shiftTotals.A_target ?? 0,
      B: shiftTotals.B ?? 0,
      B_target: shiftTotals.B_target ?? 0,
      C: shiftTotals.C ?? 0,
      C_target: shiftTotals.C_target ?? 0,
      dailyTotal:
        (shiftTotals.A ?? 0) + (shiftTotals.B ?? 0) + (shiftTotals.C ?? 0),
      dailyTargetTotal:
        (shiftTotals.A_target ?? 0) +
        (shiftTotals.B_target ?? 0) +
        (shiftTotals.C_target ?? 0),
      isTotal: true,
    };

    const finalTableData =
      tableData.length > 0 ? [...tableData, totalsRow] : [];

    return { tableData, shiftTotals, finalTableData };
  }, [shiftwiseData, detailsData]);

  useEffect(() => {
    productionApi
      .masterData()
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const lineMap = {};
          json.data.forEach((cluster) => {
            (cluster.Lines ?? []).forEach((l) => {
              lineMap[l.LineId] = (l.LineName || "").trim();
            });
          });
          const options = Object.entries(lineMap)
            .map(([id, name]) => ({ value: String(id), label: name }))
            .sort((a, b) => a.label.localeCompare(b.label));
          setLineOptions(options);
        }
      })
      .catch((err) => console.error("[fetchMasterData]", err));
  }, []);

  const fetchData = useCallback(
    async (startDate, endDate, shifts, lineId, page, pageSize) => {
      const requestId = ++requestIdRef.current;
      setIsLoading(true);
      setError("");

      try {
        const isAllShifts = shifts.includes("ALL");
        const numShifts = isAllShifts ? 3 : shifts.length;
        const data = await productionApi.overview({
          lineId,
          fromDate: startDate,
          toDate: endDate,
          shift: isAllShifts ? "" : shifts.join(","),
          pageNumber: page,
          pageSize: pageSize * numShifts,
        });

        if (requestId !== requestIdRef.current) return;

        setDetailsData(
          (data?.shiftSummary ?? []).map((r) => ({
            Shift: r.Shift?.trim(),
            PartsProduced: r.TotalActual ?? 0,
            Target: r.TotalTarget ?? 0,
          })),
        );

        const mappedShiftDetails = (data?.shiftDetails ?? []).map((r) => ({
          Date: r.ProductionDate?.slice(0, 10),
          Shift: r.Shift?.trim(),
          PartsProduced: r.TotalActual ?? 0,
          Target: r.TotalTarget ?? 0,
        }));
        setShiftwiseData(mappedShiftDetails);

        const dailyMap = {};
        mappedShiftDetails.forEach((r) => {
          if (!dailyMap[r.Date]) {
            dailyMap[r.Date] = { Date: r.Date, PartsProduced: 0, Target: 0 };
          }
          dailyMap[r.Date].PartsProduced += r.PartsProduced;
          dailyMap[r.Date].Target += r.Target;
        });
        setOverallData(Object.values(dailyMap));

        setTotalRecords(data?.totalRecords ?? 0);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err.message || "Failed to load production data.");
        setDetailsData([]);
        setShiftwiseData([]);
        setOverallData([]);
        setTotalRecords(0);
      } finally {
        if (requestId === requestIdRef.current) setIsLoading(false);
      }
    },
    [],
  );

  const selectedLineName = useMemo(
    () =>
      lineOptions.find((l) => l.value === selectedLine)?.label ||
      selectedLine ||
      "All",
    [lineOptions, selectedLine],
  );

  const handleDownload = useCallback(async () => {
    if (!hasSearched || isLoading || (finalTableData.length === 0 && !isBg)) return;
    setDownloading(true);
    try {
      // Fetch ALL records (not just current page) for download
      const numShifts = selectedShifts.includes("ALL") ? 3 : selectedShifts.length;
      const allApiData = await productionApi.overview({
        lineId: selectedLine,
        fromDate: dateFilter.startDate,
        toDate: dateFilter.endDate,
        shift: selectedShifts.includes("ALL") ? "" : selectedShifts.join(","),
        pageNumber: 1,
        pageSize: (totalRecords || 999999) * numShifts,
      });

      const allDetailsData = (allApiData?.shiftSummary ?? []).map((r) => ({
        Shift: r.Shift?.trim(),
        PartsProduced: r.TotalActual ?? 0,
        Target: r.TotalTarget ?? 0,
      }));

      const allShiftwiseData = (allApiData?.shiftDetails ?? []).map((r) => ({
        Date: r.ProductionDate?.slice(0, 10),
        Shift: r.Shift?.trim(),
        PartsProduced: r.TotalActual ?? 0,
        Target: r.TotalTarget ?? 0,
      }))

      const allDailyMap = {};
      allShiftwiseData.forEach((r) => {
        if (!allDailyMap[r.Date]) {
          allDailyMap[r.Date] = { Date: r.Date, PartsProduced: 0, Target: 0 };
        }
        allDailyMap[r.Date].PartsProduced += r.PartsProduced;
        allDailyMap[r.Date].Target += r.Target;
      });
      const allOverallData = Object.values(allDailyMap).sort((a, b) => new Date(b.Date) - new Date(a.Date));

      const allDataByDate = {};
      allShiftwiseData.forEach((item) => {
        const date = item.Date;
        if (!allDataByDate[date]) {
          allDataByDate[date] = { date, A: 0, A_target: 0, B: 0, B_target: 0, C: 0, C_target: 0 };
        }
        const s = item.Shift?.trim();
        if (s === "A") { allDataByDate[date].A = item.PartsProduced; allDataByDate[date].A_target = item.Target; }
        if (s === "B") { allDataByDate[date].B = item.PartsProduced; allDataByDate[date].B_target = item.Target; }
        if (s === "C") { allDataByDate[date].C = item.PartsProduced; allDataByDate[date].C_target = item.Target; }
      });
      const allTableData = Object.values(allDataByDate)
        .map((row) => ({
          ...row,
          dailyTotal: (row.A || 0) + (row.B || 0) + (row.C || 0),
          dailyTargetTotal: (row.A_target || 0) + (row.B_target || 0) + (row.C_target || 0),
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((row, i) => ({ ...row, srNo: i + 1 }));

      const allShiftTotals = allDetailsData.reduce((acc, item) => {
        const s = item.Shift?.trim();
        acc[s] = item.PartsProduced;
        acc[`${s}_target`] = item.Target ?? 0;
        return acc;
      }, {});

      // Excel
      generateExcelWithSheets(
        [
          {
            sheetName: "Overall Production Trend",
            headers: columns_Overall,
            rows: allOverallData,
          },
          {
            sheetName: "Shift Details",
            headers: columns_ShiftDetails,
            rows: allDetailsData,
          },
          {
            sheetName: "Shift-wise Distribution",
            headers: columns_Shiftwise,
            rows: allShiftwiseData,
          },
        ],
        "Production_Report",
      );

      // PDF
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        getPdfTableStyles,
        PDF_DARK_HEAD_STYLES,
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

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const subLines = [
        `Date Range : ${dateFilter.startDate ?? "—"}  to  ${dateFilter.endDate ?? "—"}`,
        `Line : ${selectedLineName}   |   Shift : ${selectedShifts.includes("ALL")
          ? "All Shifts"
          : selectedShifts.map((s) => `Shift ${s}`).join(", ")
        }`,
      ];

      const { toPng } = await import("html-to-image");
      const html2canvasModule = await import("html2canvas-pro");
      const html2canvas = html2canvasModule.default;

      const captureChart = async (ref) => {
        if (!ref?.current) return null;

        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await new Promise((resolve) => setTimeout(resolve, 200));

        const rect = ref.current.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          console.error("[PDF] Chart has zero size at capture time:", ref.current, rect);
          return null;
        }

        try {
          const imgData = await toPng(ref.current, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
            width: rect.width,
            height: rect.height,
          });
          return { imgData, w: rect.width, h: rect.height };
        } catch (e) {
          console.warn("[PDF] toPng failed, falling back to html2canvas:", e);
        }

        try {
          const canvas = await html2canvas(ref.current, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
            logging: false,
          });
          const imgData = canvas.toDataURL("image/png");
          return { imgData, w: canvas.width, h: canvas.height };
        } catch (e) {
          console.error("[PDF] html2canvas fallback also FAILED for element:", ref.current, "Error:", e);
          return null;
        }
      };
      const [overallChart, shiftwiseChart, cumulativeChart] = await Promise.all(
        [
          captureChart(overallChartRef),
          captureChart(shiftwiseChartRef),
          captureChart(cumulativeChartRef),
        ],
      );

      const TITLE_H = 7;
      const GAP = 4;
      const subH = subLines.length * 5.5 + 10;
      const contentW = pageW - MARGIN * 2;

      const drawChart = (title, chart, x, y, maxW, maxH) => {
        doc.setFont(FONT, "bold");
        doc.setFontSize(10);
        doc.setTextColor(22, 70, 161);
        doc.text(title, x, y + 4);
        y += TITLE_H;
        if (!chart) return y;
        const aspect = chart.w / chart.h;
        let imgW = maxW;
        let imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = x + (maxW - imgW) / 2;
        doc.addImage(chart.imgData, "PNG", cx, y, imgW, imgH, undefined, "FAST");
        return y + imgH;
      };
      const p1Top = HEADER_H + subH;
      const p1Available = pageH - p1Top - 22;
      const halfAvail = (p1Available - GAP - TITLE_H * 2) / 2;

      let y1 = p1Top;
      y1 = drawChart(
        "Overall Production Trend",
        overallChart,
        MARGIN,
        y1,
        contentW,
        halfAvail,
      );
      y1 += GAP;
      drawChart(
        "Shift-wise Production Distribution",
        shiftwiseChart,
        MARGIN,
        y1,
        contentW,
        halfAvail,
      );

      doc.addPage();
      const p2Top = HEADER_H + 6;
      const p2Available = pageH - p2Top - 22;
      const donutMaxH = p2Available * 0.4;
      const donutBottom = drawChart(
        "Cumulative Shift Production",
        cumulativeChart,
        MARGIN,
        p2Top,
        contentW,
        donutMaxH,
      );
      const tableStartY = donutBottom + GAP + 2;

      const tableRows = [
        ...allTableData.map((row, i) => {
          const dailyTotal = (row.A || 0) + (row.B || 0) + (row.C || 0);
          const dailyTarget =
            (row.A_target || 0) + (row.B_target || 0) + (row.C_target || 0);
          return [
            i + 1,
            row.date,
            row.A || 0,
            row.A_target || 0,
            row.B || 0,
            row.B_target || 0,
            row.C || 0,
            row.C_target || 0,
            dailyTotal,
            dailyTarget,
          ];
        }),
        [
          "Shift Totals",
          "",
          allShiftTotals.A ?? 0,
          allShiftTotals.A_target ?? 0,
          allShiftTotals.B ?? 0,
          allShiftTotals.B_target ?? 0,
          allShiftTotals.C ?? 0,
          allShiftTotals.C_target ?? 0,
          (allShiftTotals.A ?? 0) + (allShiftTotals.B ?? 0) + (allShiftTotals.C ?? 0),
          (allShiftTotals.A_target ?? 0) +
          (allShiftTotals.B_target ?? 0) +
          (allShiftTotals.C_target ?? 0),
        ],
      ];
      const groupHeadStyle = {
        halign: "center",
        valign: "middle",
        fillColor: GROUP_HEADER_RGB.bg,
        textColor: GROUP_HEADER_RGB.text,
        lineColor: [168, 225, 253],
        fontStyle: "bold",
      };
      const subHeadStyle = {
        halign: "center",
        valign: "middle",
        fillColor: SUB_HEADER_RGB.bg,
        textColor: SUB_HEADER_RGB.text,
        lineColor: [168, 225, 253],
        fontStyle: "bold",
      };
      autoTable(doc, {
        startY: tableStartY,
        margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
        head: [
          [
            {
              content: "SR. NO.",
              rowSpan: 2,
              styles: {
                ...subHeadStyle,
                lineWidth: 0.2,
                // lineColor: [225, 225, 225],   // was [148, 163, 184] — dark
                lineColor: [168, 225, 253],
              },
            },
            {
              content: "DATE",
              rowSpan: 2,
              styles: {
                ...subHeadStyle,
                lineWidth: 0.2,
                // lineColor: [225, 225, 225],   // was [148, 163, 184] — dark
                lineColor: [168, 225, 253],
              },
            },
            { content: "SHIFT A", colSpan: 2, styles: groupHeadStyle },
            { content: "SHIFT B", colSpan: 2, styles: groupHeadStyle },
            { content: "SHIFT C", colSpan: 2, styles: groupHeadStyle },
            { content: "DAILY TOTAL", colSpan: 2, styles: groupHeadStyle },
          ],

          [
            { content: "ACTUAL", styles: subHeadStyle },
            { content: "TARGET", styles: subHeadStyle },
            { content: "ACTUAL", styles: subHeadStyle },
            { content: "TARGET", styles: subHeadStyle },
            { content: "ACTUAL", styles: subHeadStyle },
            { content: "TARGET", styles: subHeadStyle },
            { content: "ACTUAL", styles: subHeadStyle },
            { content: "TARGET", styles: subHeadStyle },
          ],
        ],
        body: tableRows,
        ...(() => {
          const ts = getPdfTableStyles(FONT);
          return {
            ...ts,
            styles: { ...ts.styles, lineColor: [225, 225, 225] }, // was [148, 163, 184] — dark
          };
        })(),
        headStyles: {
          ...PDF_DARK_HEAD_STYLES,
          font: FONT,
          lineColor: [186, 230, 253],
        },

        rowPageBreak: "avoid",
        didParseCell: (data) => {
          if (data.section === "head" && data.row.index === 1) {
            data.cell.styles.lineColor = [168, 225, 253];   // was [148, 163, 184] — dark
          }
          if (data.section !== "body") return;

          const isLastRow = data.row.index === tableRows.length - 1;
          const col = data.column.index;
          const isSrNoCol = col === 0;
          const isDateCol = col === 1;
          const isDailyTotalCol = col >= 8;

          // white / off-white row banding
          const rowBg = data.row.index % 2 === 0 ? [255, 255, 255] : [248, 250, 252];

          if (isLastRow) {
            data.cell.styles.fillColor =
              isSrNoCol || isDailyTotalCol
                ? TOTALS_ROW_RGB_STRONG
                : TOTALS_ROW_RGB;
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = "bold";
          } else if (isSrNoCol) {
            data.cell.styles.fillColor = rowBg;   // was [255, 255, 255]
            data.cell.styles.textColor = [12, 74, 110];
            data.cell.styles.fontStyle = "bold";
          } else if (isDateCol) {
            data.cell.styles.fillColor = rowBg;   // was [255, 255, 255]
            data.cell.styles.textColor = [0, 0, 0];
            data.cell.styles.fontStyle = "bold";
          } else if (isDailyTotalCol) {
            data.cell.styles.fillColor = rowBg;   // was [255, 255, 255]
            data.cell.styles.textColor = [12, 74, 110];
            data.cell.styles.fontStyle = "bold";
          } else {
            data.cell.styles.fillColor = rowBg;   // was missing — now set
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.textColor = [51, 65, 85];
          }

          if (!isLastRow && ACTUAL_COL_INDEXES.includes(col)) {
            data.cell.text = [" "];
          }
        },
        didDrawCell: (data) => {
          if (data.section !== "body") return;
          const isLastRow = data.row.index === tableRows.length - 1;
          if (isLastRow) return; // totals row: plain bold number, no pill
          const col = data.column.index;
          if (!ACTUAL_COL_INDEXES.includes(col)) return;

          try {
            const { x, y, width, height } = data.cell;
            const raw = data.row.raw;
            const actual = Number(raw[col]);
            const target = Number(raw[col + 1]);
            drawValuePill(doc, FONT, x, y, width, height, actual, target);
          } catch (e) {
            console.warn("Actual cell draw error:", e.message);
          }
        },
      });

      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: total,
          fontFamily: FONT,
          title: "Production Overview",
          subLines: i === 1 ? subLines : [],
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`Production_Overview_${dateFilter.startDate ?? "report"}.pdf`);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [
    hasSearched,
    isLoading,
    finalTableData,
    selectedLine,
    selectedShifts,
    selectedLineName,
    dateFilter,
    totalRecords,
  ]);

  const handleSearch = useCallback(
    (startDate, endDate) => {
      setSelectedDuration("");
      setHasSearched(true);
      setTablePage(1);
      setDateFilter({ startDate, endDate });
      fetchData(
        startDate,
        endDate,
        selectedShifts,
        selectedLine,
        1,
        tablePageSize,
      );
    },
    [fetchData, selectedShifts, selectedLine, tablePageSize],
  );

  // Sync date range in background mode & trigger initial search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e);
    }
  }, [isBg, targetDateRange, handleSearch]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || isLoading || bgTriggeredRef.current) return;
    if (finalTableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, finalTableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, isLoading, finalTableData.length, hasSearched]);

  const handleDurationChange = useCallback(
    (value) => {
      if (!value || value === "") {
        setSelectedDuration("");
        setHasSearched(false);
        setDetailsData([]);
        setShiftwiseData([]);
        setOverallData([]);
        setTotalRecords(0);
        setDateFilter({ startDate: null, endDate: null });
        return;
      }

      const { startDate, endDate } = getDateRangeFromDuration(value);
      setSelectedDuration(value);
      setHasSearched(true);
      setTablePage(1);
      setDateFilter({ startDate, endDate });
      fetchData(
        startDate,
        endDate,
        selectedShifts,
        selectedLine,
        1,
        tablePageSize,
      );
    },
    [fetchData, selectedShifts, selectedLine, tablePageSize],
  );

  const filterConfig = useMemo(
    () => [
      {
        type: "select",
        key: "line",
        label: "Line",
        options: lineOptions,
      },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_SELECT_OPTIONS,
      },
    ],
    [lineOptions],
  );

  // ── Production Summary table columns ────────────────────────
  const summaryColumns = useMemo(
    () => [
      {
        key: "srNo",
        label: "Sr. No.",
        sortable: true,
        type: "primary",
        totalEmphasis: "strong",
      },
      { key: "date", label: "Date", type: "mono", sortable: true },

      {
        key: "A",
        label: "Actual",
        group: true,
        sortable: true,
        type: "actual",
        targetKey: "A_target",
      },
      { key: "A_target", label: "Target", group: true, sortable: true },

      {
        key: "B",
        label: "Actual",
        group: true,
        sortable: true,
        type: "actual",
        targetKey: "B_target",
      },
      { key: "B_target", label: "Target", group: true, sortable: true },

      {
        key: "C",
        label: "Actual",
        group: true,
        sortable: true,
        type: "actual",
        targetKey: "C_target",
      },
      { key: "C_target", label: "Target", group: true, sortable: true },

      {
        key: "dailyTotal",
        label: "Actual",
        group: true,
        sortable: false,
        type: "actual",
        targetKey: "dailyTargetTotal",
        totalEmphasis: "strong",
      },
      {
        key: "dailyTargetTotal",
        label: "Target",
        group: true,
        sortable: false,
        totalEmphasis: "strong",
      },
    ],
    [],
  );

  const summaryColumnGroups = useMemo(
    () => [
      { label: "Shift A", span: 2, headerBg: GROUP_HEADER_BG },
      { label: "Shift B", span: 2, headerBg: GROUP_HEADER_BG },
      { label: "Shift C", span: 2, headerBg: GROUP_HEADER_BG },
      { label: "Daily Total", span: 2, headerBg: GROUP_HEADER_BG },
    ],
    [],
  );

  const filterValues = useMemo(
    () => ({ line: selectedLine, shifts: selectedShifts }),
    [selectedLine, selectedShifts],
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      const newLine =
        newFilters.line !== undefined ? newFilters.line : selectedLine;

      let newShifts =
        newFilters.shifts !== undefined ? newFilters.shifts : selectedShifts;

      const prevShifts = selectedShifts;
      if (newShifts.includes("ALL") && !prevShifts.includes("ALL")) {
        newShifts = ["ALL"];
      } else if (!newShifts.includes("ALL") && prevShifts.includes("ALL")) {
        newShifts = newShifts.filter((s) => s !== "ALL");
        if (newShifts.length === 0) newShifts = ["ALL"];
      } else if (
        !newShifts.includes("ALL") &&
        INDIVIDUAL_SHIFTS.every((s) => newShifts.includes(s))
      ) {
        newShifts = ["ALL"];
      } else if (newShifts.includes("ALL") && newShifts.length > 1) {
        newShifts = newShifts.filter((s) => s !== "ALL");
      }

      if (newFilters.line !== selectedLine) setSelectedLine(newLine);
      if (newShifts.join(",") !== selectedShifts.join(","))
        setSelectedShifts(newShifts);

      if (hasSearched && dateFilter.startDate) {
        setTablePage(1);
        fetchData(
          dateFilter.startDate,
          dateFilter.endDate,
          newShifts,
          newLine,
          1,
          tablePageSize,
        );
      }
    },
    [
      selectedLine,
      selectedShifts,
      hasSearched,
      dateFilter,
      tablePageSize,
      fetchData,
    ],
  );

  const numShifts = selectedShifts.includes("ALL") ? 3 : selectedShifts.length;
  const tableServerPagination = useMemo(
    () => ({
      page: tablePage,
      pageSize: tablePageSize,
      totalRecords,
      totalPages: Math.max(
        1,
        Math.ceil(totalRecords / (tablePageSize * numShifts)),
      ),
      onPageChange: (newPage) => {
        setTablePage(newPage);
        if (hasSearched && dateFilter.startDate) {
          fetchData(
            dateFilter.startDate,
            dateFilter.endDate,
            selectedShifts,
            selectedLine,
            newPage,
            tablePageSize,
          );
        }
      },
      onPageSizeChange: (newSize) => {
        setTablePageSize(newSize);
        setTablePage(1);
        if (hasSearched && dateFilter.startDate) {
          fetchData(
            dateFilter.startDate,
            dateFilter.endDate,
            selectedShifts,
            selectedLine,
            1,
            newSize,
          );
        }
      },
    }),
    [
      tablePage,
      tablePageSize,
      totalRecords,
      numShifts,
      hasSearched,
      dateFilter,
      selectedShifts,
      selectedLine,
      fetchData,
    ],
  );

  return (
    <div className="max-w-full overflow-hidden px-2 sm:px-4">
      <FilterBar
        config={filterConfig}
        filters={filterValues}
        onChange={handleFilterChange}
      />

      <DateRangeBar
        reportName="Production_Overview"
        showDownload={true}
        onDownload={handleDownload}
        onSearch={handleSearch}
        showTime={false}
        selectedStartDate={dateFilter?.startDate}
        selectedEndDate={dateFilter?.endDate}
        isDownloading={downloading}
        durationOptions={DURATION_OPTIONS}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
      />

      {/* States */}
      {!hasSearched ? (
        <SearchPromptState pageName="Production Overview" />
      ) : isLoading ? (
        <div className="mt-8 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ChartShimmer />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ChartShimmer />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <ChartShimmer />
            </div>
          </div>
          <TableShimmer rows={6} />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : finalTableData.length === 0 ? (
        <NoDataState />
      ) : (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 rounded-full bg-blue-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-blue-950">
              Production Overview
              {selectedLine && (
                <span className="text-blue-600">
                  {" "}
                  — Line: {selectedLineName}
                </span>
              )}
              {!selectedShifts.includes("ALL") && (
                <span className="text-blue-600">
                  {" "}
                  — Shift: {selectedShifts.join(", ")}
                </span>
              )}
            </h2>
          </div>

          {/* Charts */}
          <div className="w-full">
            <div className="flex flex-col gap-4 py-4 w-full">
              {/* Row 1 – full-width trend */}
              <ChartCard title="Overall Production Trend" shadow={true}>
                {overallData.length > 0 ? (
                  <div ref={overallChartRef}>
                    <ProductionLineGraph data={overallData} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-600">
                    No data available
                  </div>
                )}
              </ChartCard>

              {/* Row 2 – shift-wise + cumulative */}
              <div
                className={`grid grid-cols-1 ${tableData.length <= 5 ? "lg:grid-cols-2" : ""} gap-4`}
              >
                <ChartCard
                  title="Shift-wise Production Distribution"
                  shadow={true}
                >
                  {shiftwiseData.length > 0 ? (
                    <div ref={shiftwiseChartRef}>
                      <ShiftProductionChart data={shiftwiseData} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-600">
                      No data available
                    </div>
                  )}
                </ChartCard>

                <ChartCard title="Cumulative Shift Production" shadow={true}>
                  {detailsData.length > 0 ? (
                    <div ref={cumulativeChartRef}>
                      <ShiftwiseProductionPieChart data={detailsData} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-600">
                      No data available
                    </div>
                  )}
                </ChartCard>
              </div>
            </div>
          </div>

          {/* Production Summary Table */}
          <DataTable
            title="Production Summary"
            columns={summaryColumns}
            columnGroups={summaryColumnGroups}
            data={finalTableData}
            serverPagination={tableServerPagination}
          />
        </div>
      )}
    </div>
  );
};

export default ProductionOverview;