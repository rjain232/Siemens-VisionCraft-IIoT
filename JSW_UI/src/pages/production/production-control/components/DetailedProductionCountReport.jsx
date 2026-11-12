import FilterBar from "../../../../sharedComponents/FilterBar";
import { ChartShimmer, TableShimmer } from "../../../../sharedComponents/Shimmer";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DataTable from "../../../../sharedComponents/DataTable";
import { generateExcel } from "../../../../utils/ExcelUtils";
import { formatClusterName } from "../../../../utils/Formatters";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { format } from "date-fns";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Cell,
  ReferenceArea,
} from "recharts";
import { masterApi, productionApi } from "../../../../services/api";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import ShiftOEEChart from "../../../../sharedComponents/ShiftOEERadialChart";
import appConfig from "../../../../config/appConfig";
import {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState";

const PAGE_SIZE = 3; // always show 3 dates per page

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };

const SHIFT_COLOR_MAP = {
  A: SHIFT_COLORS.A,
  B: SHIFT_COLORS.B,
  C: SHIFT_COLORS.C,
  Overall: "#9f4444",
};

const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: `Shift ${s.value}` },
);

const CustomXAxisTick = ({ x, y, payload }) => {
  const parts = (payload.value ?? "").split(" | ");
  return (
    <g transform={`translate(${x},${y + 8})`}>
      <text textAnchor="middle" fill="#374151" fontSize={12} fontWeight={600}>
        {parts[1] ?? ""}
      </text>
      <text y={16} textAnchor="middle" fill="#64748b" fontSize={11}>
        {parts[0] ?? ""}
      </text>
    </g>
  );
};

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

async function exportPDF({
  chartRef,
  oeeChartRef,
  tableData,
  columns,
  columnGroups,
  title,
  dateFilter,
  selectedFilters,
}) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const { loadBrandingLogos, drawPdfPageChrome, loadKarlaFont } =
    await import("../../../../utils/PdfUtils");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const FONT = await loadKarlaFont(doc);
  const pageW = doc.internal.pageSize.getWidth();
  const MARGIN = 14;
  const HEADER_H = 40;
  const [jswImg, schaefflerImg] = await loadBrandingLogos();
  const from = dateFilter.startDate ?? "-";
  const to = dateFilter.endDate ?? "-";
  const subLines = [`Report Duration: ${from}  To  ${to}`];
  const filterParts = [];
  if (selectedFilters.area)
    filterParts.push(`Area: ${formatClusterName(selectedFilters.area)}`);
  if (selectedFilters.line) filterParts.push(`Line: ${selectedFilters.line}`);
  if (selectedFilters.shifts) {
    const shiftLabel = selectedFilters.shifts.includes("All")
      ? "All Shifts"
      : selectedFilters.shifts.map((s) => ` ${s}`).join(", ");
    filterParts.push(`Shifts: ${shiftLabel}`);
  }
  if (filterParts.length)
    subLines.push(`Filters: ${filterParts.join("  |  ")}`);

  function drawPageChrome(pageNum, totalPages) {
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily: FONT,
      title,
      subLines: pageNum === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }
  let barChartImg = null;
  let barChartAspect = 0.5;
  let oeeChartImg = null;
  let oeeChartAspect = 1;

  // Import capture libs once — same pattern as ProductionOverview
  const { toPng } = await import("html-to-image");
  const { default: html2canvas } = await import("html2canvas-pro");

  const captureChart = async (ref) => {
    if (!ref?.current) return null;

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await new Promise((r) => setTimeout(r, 200));

    const rect = ref.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const aspect = rect.width > 0 ? rect.height / rect.width : 0.5;

    try {
      const imgData = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width: rect.width,
        height: rect.height,
      });
      return { imgData, aspect };
    } catch (e) {
      console.warn("[PDF] toPng failed, falling back to html2canvas:", e);
    }

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      return { imgData: canvas.toDataURL("image/png"), aspect };
    } catch (e) {
      console.error("[PDF] html2canvas fallback also failed:", e);
      return null;
    }
  };

  const [barResult, oeeResult] = await Promise.all([
    captureChart(chartRef),
    captureChart(oeeChartRef),
  ]);
  if (barResult) {
    barChartImg = barResult.imgData;
    barChartAspect = barResult.aspect;
  }
  if (oeeResult) {
    oeeChartImg = oeeResult.imgData;
    oeeChartAspect = oeeResult.aspect;
  }
  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;
  const pageH = doc.internal.pageSize.getHeight();
  const barMaxH = pageH - contentTop - 22;

  // Page 1 — Production Bar Chart
  if (barChartImg) {
    let imgW = contentW;
    let imgH = imgW * barChartAspect;
    if (imgH > barMaxH) {
      imgH = barMaxH;
      imgW = imgH / barChartAspect;
    }
    const cx = MARGIN + (contentW - imgW) / 2;
    doc.addImage(barChartImg, "PNG", cx, contentTop, imgW, imgH, undefined, "FAST");
  }

  // Page 2 — OEE donut (own page, large and centered)
  if (oeeChartImg) {
    doc.addPage();
    const oeeTop = HEADER_H + 8;
    const oeeMaxH = pageH - oeeTop - 22;
    let imgW = contentW * 0.7;
    let imgH = imgW * oeeChartAspect;
    if (imgH > oeeMaxH) {
      imgH = oeeMaxH;
      imgW = imgH / oeeChartAspect;
    }
    const cx = MARGIN + (contentW - imgW) / 2;
    const cy = oeeTop + (oeeMaxH - imgH) / 2;
    doc.addImage(oeeChartImg, "PNG", cx, cy, imgW, imgH, undefined, "FAST");
  }

  if (!barChartImg && !oeeChartImg) {
    doc.setFont(FONT, "normal");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Charts not available", MARGIN, contentTop + 10);
  }

  if (tableData.length > 0) {
    doc.addPage();
    const hasGroups = columnGroups && columnGroups.length > 0;
    const isActualCol = (col) => hasGroups && col >= 3 && (col - 3) % 2 === 0;
    const isTargetCol = (col) => hasGroups && col >= 3 && (col - 3) % 2 === 1;
    const targetColFor = (col) => col + 1;
    const C_GROUP = [165, 216, 255];
    const C_SUB = [186, 230, 253];
    const C_TEXT = [12, 74, 110];
    const C_BODY_BORDER = [191, 219, 254];
    const C_HEAD_BORDER = [125, 211, 252];

    let tableHead;
    if (hasGroups) {
      const subStyle = {
        fillColor: C_SUB,
        textColor: C_TEXT,
        fontStyle: "bold",
        lineColor: C_HEAD_BORDER,
        lineWidth: 0.1,
      };
      const groupStyle = {
        fillColor: C_GROUP,
        textColor: C_TEXT,
        fontStyle: "bold",
        lineColor: C_HEAD_BORDER,
        lineWidth: 0.3,
      };

      const row1 = [
        { content: "SR. NO.", rowSpan: 2, styles: subStyle },
        { content: "DATE", rowSpan: 2, styles: subStyle },
        { content: "LINE", rowSpan: 2, styles: subStyle },
      ];
      const row2 = [];
      columnGroups.forEach((g) => {
        row1.push({ content: g.label, colSpan: 2, styles: groupStyle });
        row2.push(
          { content: "ACTUAL", styles: subStyle },
          { content: "TARGET", styles: subStyle },
        );
      });
      tableHead = [row1, row2];
    } else {
      tableHead = [columns.map((c) => c.label.toUpperCase())];
    }

    const tableBody = tableData.map((row, i) => {
      if (hasGroups) {
        const cells = [i + 1, row.DateDisplay ?? "", row.Line ?? ""];
        columnGroups.forEach((g) => {
          cells.push(row[`Shift${g.label}_Actual`] ?? 0);
          cells.push(row[`Shift${g.label}_Target`] ?? 0);
        });
        return cells;
      }
      return columns.map((col) => row[col.accessor] ?? row[col.key] ?? "");
    });

    autoTable(doc, {
      head: tableHead,
      body: tableBody,
      startY: HEADER_H + 8,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        lineColor: C_BODY_BORDER,
        lineWidth: 0.3,
        halign: "center",
        valign: "middle",
        font: FONT,
        textColor: [40, 40, 40],
        fillColor: [250, 251, 253],        // base/odd rows = #ffffff
      },
      headStyles: {
        fontSize: 8,
        halign: "center",
        valign: "middle",
        font: FONT,
        fillColor: [224, 242, 254],
        textColor: [12, 74, 110],
        lineColor: C_HEAD_BORDER,
        lineWidth: 0.3,
      },
      alternateRowStyles: { fillColor: [255, 255, 255] }, // even rows = #fafbfd
      margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
      tableWidth: "auto",
      didParseCell: (hookData) => {
        const col = hookData.column.index;
        const sec = hookData.section;
        if (sec === "head") return;
        if (sec !== "body") return;
        if (col === 0) hookData.cell.styles.fontStyle = "bold";
        if (col === 1) hookData.cell.styles.fontStyle = "bold";
        if (col === 2) {
          hookData.cell.styles.textColor = [3, 105, 161];
          hookData.cell.styles.fontStyle = "bold";
        }
        if (!hasGroups && columns[col]?.key === "Shift")
          hookData.cell.text = [" "];
        if (!hasGroups && columns[col]?.key === "Actual")
          hookData.cell.text = [" "];
        if (isActualCol(col)) hookData.cell.text = [" "];
        if (isTargetCol(col)) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.textColor = [55, 65, 81];
        }
      },
      didDrawCell: (hookData) => {
        const col = hookData.column.index;
        const { x, y, width, height } = hookData.cell;
        const raw = hookData.row.raw;
        if (hookData.section !== "body") return;
        if (!hasGroups && columns[col]?.key === "Shift") {
          try {
            const shiftVal = String(raw[col]);
            const SHIFT_C = {
              A: {
                fill: [239, 246, 255],
                text: [29, 78, 216],
                border: [191, 219, 254],
              },
              B: {
                fill: [240, 253, 244],
                text: [21, 128, 61],
                border: [187, 247, 208],
              },
              C: {
                fill: [255, 247, 237],
                text: [194, 65, 12],
                border: [254, 215, 170],
              },
            };
            const c = SHIFT_C[shiftVal] || SHIFT_C.A;
            const sz = 6;
            const bx = x + (width - sz) / 2;
            const by = y + (height - sz) / 2;
            doc.setFillColor(...c.fill);
            doc.setDrawColor(...c.border);
            doc.setLineWidth(0.3);
            doc.roundedRect(bx, by, sz, sz, 1, 1, "FD");
            doc.setFont(FONT, "bold");
            doc.setFontSize(7);
            doc.setTextColor(...c.text);
            doc.text(shiftVal, bx + sz / 2, by + sz * 0.72, {
              align: "center",
            });
          } catch (e) {
            console.warn("Shift draw error:", e.message);
          }
        }
        if (!hasGroups && columns[col]?.key === "Actual") {
          try {
            const actual = Number(hookData.cell.raw);
            const targetIdx = columns.findIndex((c) => c.key === "Target");
            const target = targetIdx >= 0 ? Number(raw[targetIdx]) : NaN;
            drawValuePill(doc, FONT, x, y, width, height, actual, target);
          } catch (e) {
            console.warn("Actual cell draw error:", e.message);
          }
        }
        if (isActualCol(col)) {
          try {
            const actual = Number(hookData.cell.raw);
            const target = Array.isArray(raw)
              ? Number(raw[targetColFor(col)])
              : NaN;
            drawValuePill(doc, FONT, x, y, width, height, actual, target);
          } catch (e) {
            console.warn("Actual cell draw error:", e.message);
          }
        }
      },
    });
  }

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }
  doc.save(`${title.replace(/\s+/g, "_")}_${from}_to_${to}.pdf`);
}

const TARGET_LINE_COLOR = "#000000";
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  const actual = item.Actual ?? 0;
  const target = item.Target ?? 0;
  const isBelow = actual < target;
  const accentColor = isBelow ? "#dc2626" : "#10b981";
  return (
    <div
      style={{
        padding: "10px 12px",
        border: `2px solid ${accentColor}`,
        borderRadius: 8,
        background: "#fff",
        minWidth: 180,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 6,
          color: "#0f172a",
          fontSize: 13,
        }}
      >
        Shift {item.Shift}
      </div>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
        {item.DateDisplay}
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Actual: <b style={{ color: accentColor }}>{actual}</b>
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Target: <b style={{ color: TARGET_LINE_COLOR }}>{target}</b>
      </div>
    </div>
  );
};

const CustomLegend = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 24,
      paddingTop: 8,
      paddingBottom: 4,
      flexWrap: "wrap",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#dc2626",
          borderRadius: 2,
        }}
      />
      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
        Actual Production
      </span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 16,
          height: 3,
          backgroundColor: TARGET_LINE_COLOR,
          borderRadius: 2,
        }}
      />
      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
        Target
      </span>
    </div>
  </div>
);

function ActualCell(actual, target) {
  const diff = actual - target;
  const isBelow = diff < 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: isBelow ? "#dc2626" : "#16a34a",
        }}
      >
        {actual}
      </span>
      {diff !== 0 && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontSize: 11,
            fontWeight: 700,
            color: isBelow ? "#dc2626" : "#16a34a",
            background: isBelow ? "#fee2e2" : "#dcfce7",
            border: `1px solid ${isBelow ? "#fca5a5" : "#86efac"}`,
            borderRadius: 4,
            padding: "1px 6px",
          }}
        >
          {isBelow ? "▼" : "▲"}
          {Math.abs(diff)}
        </span>
      )}
    </div>
  );
}

function TargetCell(val) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 14, color: "#374151" }}>
        {val}
      </span>
    </div>
  );
}

const BarGraphDedicatedProduction = ({ data }) => {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        label: `${item.DateDisplay} | Shift ${item.Shift}`,
        Shift: item.Shift,
        DateDisplay: item.DateDisplay,
        Actual: item.Actual ?? 0,
        Target: item.Target ?? 0,
        color: (item.Actual ?? 0) >= (item.Target ?? 0) ? "#10b981" : "#dc2626",
      })),
    [data],
  );

  const dateGroups = useMemo(() => {
    const groups = [];
    let current = null;
    chartData.forEach((d) => {
      if (d.DateDisplay !== current?.date) {
        current = {
          date: d.DateDisplay,
          firstLabel: d.label,
          lastLabel: d.label,
        };
        groups.push(current);
      } else {
        current.lastLabel = d.label;
      }
    });
    return groups;
  }, [chartData]);

  const chartHeight = 380;

  return (
    <div style={{ width: "100%", height: chartHeight }}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart
          data={chartData}
          margin={{ top: 16, right: 5, left: 0, bottom: 10 }}
        >
          {dateGroups.map((group, i) => (
            <ReferenceArea
              key={group.date}
              x1={group.firstLabel}
              x2={group.lastLabel}
              fill={i % 2 === 0 ? "#f8fafc" : "#e0f2fe"}
              fillOpacity={0.6}
              ifOverflow="hidden"
            />
          ))}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tick={<CustomXAxisTick />}
            interval={0}
            height={55}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickFormatter={(val) => Math.round(val)}
            width={42}
            label={{
              value: "Production Count",
              angle: -90,
              position: "insideLeft",
              offset: 8,
              style: {
                fontSize: 11,
                fontWeight: 600,
                fill: "#374151",
                textAnchor: "middle",
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          <Bar
            dataKey="Actual"
            name="Actual Production"
            radius={[4, 4, 0, 0]}
            maxBarSize={100}
            isAnimationActive={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.Actual >= entry.Target ? "#10b981" : "#dc2626"}
              />
            ))}
            <LabelList
              dataKey="Actual"
              position="insideTop"
              fill="#ffffff"
              fontSize={12}
              fontWeight={700}
              formatter={(v) => Math.round(v)}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="Target"
            name="Target"
            stroke="#000000"
            strokeWidth={2}
            dot={{ r: 4, fill: "#000000", stroke: "#ffffff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const DetailedProductionCountReport = ({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) => {
  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [areaOptions, setAreaOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    line: "",
    shifts: ["A"],
  });
  const [apiData, setApiData] = useState(null);
  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [showLoader, setShowLoader] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalDates: 0,
    totalPages: 1,
  });
  const barChartRef = useRef(null);
  const oeeChartRef = useRef(null);
  const barChartContainerRef = useRef(null);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const list = Array.isArray(res) ? res : (res?.data ?? []);
        const clusters = [];
        const lines = [];
        list.forEach((cluster) => {
          clusters.push({
            value: String(cluster.ClusterId),
            label: cluster.ClusterName,
          });
          (cluster.Lines ?? []).forEach((line) => {
            lines.push({
              value: String(line.LineId),
              label: line.LineName,
              areaId: String(cluster.ClusterId),
            });
          });
        });
        lines.sort((a, b) => Number(a.value) - Number(b.value));
        setAreaOptions(clusters);
        setLineOptions(lines);
        const firstArea = clusters[0]?.value ?? "";
        const firstLine =
          lines.find((l) => l.areaId === firstArea)?.value ?? "";

        let targetArea = firstArea;
        let targetLine = firstLine;

        if (targetFilters?.area || targetFilters?.areaId) {
          const matchArea = clusters.find(
            (c) =>
              c.value === String(targetFilters.areaId || targetFilters.area) ||
              c.label.toLowerCase() === String(targetFilters.area).toLowerCase(),
          );
          if (matchArea) {
            targetArea = matchArea.value;
            const validLines = lines.filter((l) => l.areaId === targetArea);
            if (validLines.length > 0) targetLine = validLines[0].value;
          }
        }

        if (targetFilters?.line || targetFilters?.lineId) {
          const matchLine = lines.find(
            (l) =>
              (l.areaId === targetArea || !targetFilters?.area) &&
              (l.value === String(targetFilters.lineId || targetFilters.line) ||
                l.label.toLowerCase() === String(targetFilters.line).toLowerCase()),
          );
          if (matchLine) {
            targetLine = matchLine.value;
            targetArea = matchLine.areaId;
          }
        }

        let shifts = ["A"];
        if (targetFilters?.shifts) {
          shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
        } else if (targetFilters?.shift) {
          shifts = targetFilters.shift === "All" ? ["All"] : [targetFilters.shift];
        }

        setFilters({ area: targetArea, line: targetLine, shifts });
        if (targetFilters) setHasSearched(true);
      } catch (err) {
        console.error("Master data load error:", err);
      }
    };
    loadMasterData();
  }, []);

  const filteredLineOptions = useMemo(
    () => lineOptions.filter((l) => l.areaId === String(filters.area)),
    [lineOptions, filters.area],
  );

  const filterConfig = useMemo(
    () => [
      {
        type: "select",
        key: "area",
        label: "Area",
        options: areaOptions.map((o) => ({
          ...o,
          label: formatClusterName(o.label),
        })),
      },
      {
        type: "select",
        key: "line",
        label: "Line",
        options:
          filteredLineOptions.length > 0
            ? filteredLineOptions
            : [{ value: "", label: "" }],
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
    [areaOptions, filteredLineOptions],
  );

  const handleFiltersChange = useCallback(
    (next) => {
      if (next.area !== filters.area) {
        const areaLines = lineOptions.filter(
          (l) => l.areaId === String(next.area),
        );
        next.line = areaLines[0]?.value ?? "";
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
    [filters.area, filters.shifts, lineOptions],
  );

  const normalisedData = useMemo(() => {
    if (!apiData) return { tableRows: [], oeeRows: [] };
    const tableRows = (apiData.tableData ?? []).map((row) => ({
      ...row,
      DateDisplay: row.Date ? format(new Date(row.Date), "yyyy-MM-dd") : "",
    }));
    const oeeRows = (apiData.oee ?? []).map((o) => ({
      shift: o.Shift,
      OEE: o.AvgOEE,
    }));
    return { tableRows, oeeRows };
  }, [apiData]);

  const selectedShifts = filters.shifts ?? ["All"];
  const isSingleShift =
    !selectedShifts.includes("All") && selectedShifts.length === 1;

  const shiftOEEFiltered = useMemo(() => {
    if (selectedShifts.includes("All")) return normalisedData.oeeRows;
    return normalisedData.oeeRows.filter((item) =>
      selectedShifts.includes(item.shift),
    );
  }, [normalisedData.oeeRows, selectedShifts]);

  const barChartData = useMemo(() => {
    if (!apiData?.productionChart) return [];
    const source = selectedShifts.includes("All")
      ? apiData.productionChart
      : apiData.productionChart.filter((r) => selectedShifts.includes(r.Shift));
    return source.map((r) => ({
      Shift: r.Shift,
      DateDisplay: r.ProductionDate
        ? format(new Date(r.ProductionDate), "yyyy-MM-dd")
        : "",
      Actual: r.TotalActual ?? 0,
      Target: r.TotalTarget ?? 0,
    }));
  }, [apiData, selectedShifts]);

  const tableData = useMemo(() => {
    if (!apiData) return [];
    if (isSingleShift) {
      const shift = selectedShifts[0];
      const rows = (apiData.productionChart ?? []).filter(
        (r) => r.Shift === shift,
      );
      return rows.map((r, i) => ({
        SrNo: i + 1,
        DateDisplay: r.ProductionDate
          ? format(new Date(r.ProductionDate), "yyyy-MM-dd")
          : "",
        Line: apiData.lineName ?? "",
        Shift: r.Shift,
        Actual: r.TotalActual ?? 0,
        Target: r.TotalTarget ?? 0,
      }));
    }
    const rows = normalisedData.tableRows;
    if (!selectedShifts.includes("All")) {
      return rows.map((row, i) => {
        const filtered = {
          SrNo: i + 1,
          DateDisplay: row.DateDisplay,
          Line: row.Line,
        };
        selectedShifts.forEach((s) => {
          filtered[`Shift${s}_Actual`] = row[`Shift${s}_Actual`] ?? 0;
          filtered[`Shift${s}_Target`] = row[`Shift${s}_Target`] ?? 0;
        });
        return filtered;
      });
    }
    return rows.map((row, i) => ({ ...row, SrNo: i + 1 }));
  }, [normalisedData.tableRows, apiData, selectedShifts, isSingleShift]);

  const columns_ProductionReport = useMemo(() => {
    if (isSingleShift) {
      return [
        { key: "SrNo", label: "Sr. No.", accessor: "SrNo", sortable: true },
        {
          key: "DateDisplay",
          label: "Date",
          accessor: "DateDisplay",
          sortable: true,
        },
        { key: "Line", label: "Line", accessor: "Line", sortable: true },
        { key: "Shift", label: "Shift", accessor: "Shift", sortable: true },
        {
          key: "Actual",
          label: "Actual Production",
          accessor: "Actual",
          sortable: true,
          render: (row) => ActualCell(row.Actual, row.Target),
        },
        {
          key: "Target",
          label: "Target",
          accessor: "Target",
          sortable: true,
          render: (row) => TargetCell(row.Target),
        },
      ];
    }

    const shiftsToShow = selectedShifts.includes("All")
      ? ["A", "B", "C"]
      : selectedShifts;
    const cols = [
      { key: "SrNo", label: "Sr. No.", accessor: "SrNo", sortable: true },
      {
        key: "DateDisplay",
        label: "Date",
        accessor: "DateDisplay",
        sortable: true,
      },
      { key: "Line", label: "Line", accessor: "Line", sortable: true },
    ];
    shiftsToShow.forEach((s) => {
      cols.push(
        {
          key: `Shift${s}_Actual`,
          label: "Actual",
          accessor: `Shift${s}_Actual`,
          group: `Shift ${s}`,
          sortable: true,
          render: (row) =>
            ActualCell(
              row[`Shift${s}_Actual`] ?? 0,
              row[`Shift${s}_Target`] ?? 0,
            ),
        },
        {
          key: `Shift${s}_Target`,
          label: "Target",
          accessor: `Shift${s}_Target`,
          group: `Shift ${s}`,
          sortable: true,
          render: (row) => TargetCell(row[`Shift${s}_Target`] ?? 0),
        },
      );
    });
    return cols;
  }, [selectedShifts, isSingleShift]);

  const columnGroups = useMemo(() => {
    if (isSingleShift) return [];
    const shiftsToShow = selectedShifts.includes("All")
      ? ["A", "B", "C"]
      : selectedShifts;
    return shiftsToShow.map((s) => ({ label: s, span: 2 }));
  }, [selectedShifts, isSingleShift]);

  const applyPaginationFromResponse = useCallback((response) => {
    if (response?.pagination) {
      const p = response.pagination;
      setPagination((prev) => ({
        ...prev,
        pageNumber: p.PageNumber ?? prev.pageNumber,
        totalDates: p.TotalDates ?? 0,
        totalPages: p.TotalPages ?? 1,
      }));
    }
  }, []);

  const handleSearch = useCallback(
    async (startDate, endDate) => {
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        setApiData(null);
        setHasSearched(true);
        setDateFilter({ startDate, endDate });
        return;
      }
      try {
        setShowLoader(true);
        setPagination((prev) => ({ ...prev, pageNumber: 1 }));
        const response = await productionApi.detailedProduction({
          areaId: filters.area || null,
          lineId: filters.line || null,
          startDate,
          endDate,
          shifts: filters.shifts.includes("All")
            ? null
            : filters.shifts.join(","),
          pageNumber: 1,
          pageSize: PAGE_SIZE,
        });
        setApiData(response);
        applyPaginationFromResponse(response);
        setHasSearched(true);
        setDateFilter({ startDate, endDate });
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setShowLoader(false);
      }
    },
    [filters.area, filters.line, filters.shifts, applyPaginationFromResponse],
  );

  const handlePageChange = useCallback(
    async (newPage) => {
      if (newPage < 1 || newPage > pagination.totalPages) return;
      try {
        setShowLoader(true);
        setPagination((prev) => ({ ...prev, pageNumber: newPage }));
        const response = await productionApi.detailedProduction({
          areaId: filters.area || null,
          lineId: filters.line || null,
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
          shifts: filters.shifts.includes("All")
            ? null
            : filters.shifts.join(","),
          pageNumber: newPage,
          pageSize: PAGE_SIZE,
        });
        setApiData(response);
        applyPaginationFromResponse(response);
      } catch (err) {
        console.error("Page change error:", err);
      } finally {
        setShowLoader(false);
      }
    },
    [
      pagination.totalPages,
      filters.area,
      filters.line,
      filters.shifts,
      dateFilter.startDate,
      dateFilter.endDate,
      applyPaginationFromResponse,
    ],
  );

  useEffect(() => {
    if (!hasSearched || !dateFilter.startDate || !dateFilter.endDate) return;
    const fetchData = async () => {
      try {
        setShowLoader(true);
        setPagination((prev) => ({ ...prev, pageNumber: 1 }));
        const response = await productionApi.detailedProduction({
          areaId: filters.area || null,
          lineId: filters.line || null,
          startDate: dateFilter.startDate,
          endDate: dateFilter.endDate,
          shifts: filters.shifts.includes("All")
            ? null
            : filters.shifts.join(","),
          pageNumber: 1,
          pageSize: PAGE_SIZE,
        });
        setApiData(response);
        applyPaginationFromResponse(response);
      } catch (err) {
        console.error("Auto re-fetch error:", err);
      } finally {
        setShowLoader(false);
      }
    };
    fetchData();
  }, [filters.area, filters.line, filters.shifts]);

  const buildAllTableRows = (fullApiData) => {
    if (!fullApiData) return [];
    if (isSingleShift) {
      const shift = selectedShifts[0];
      const rows = (fullApiData.productionChart ?? []).filter(
        (r) => r.Shift === shift,
      );
      return rows.map((r, i) => ({
        SrNo: i + 1,
        DateDisplay: r.ProductionDate
          ? format(new Date(r.ProductionDate), "yyyy-MM-dd")
          : "",
        Line: fullApiData.lineName ?? "",
        Shift: r.Shift,
        Actual: r.TotalActual ?? 0,
        Target: r.TotalTarget ?? 0,
      }));
    }
    const allTableRows = (fullApiData.tableData ?? []).map((row) => ({
      ...row,
      DateDisplay: row.Date ? format(new Date(row.Date), "yyyy-MM-dd") : "",
    }));
    if (!selectedShifts.includes("All")) {
      return allTableRows.map((row, i) => {
        const filtered = {
          SrNo: i + 1,
          DateDisplay: row.DateDisplay,
          Line: row.Line,
        };
        selectedShifts.forEach((s) => {
          filtered[`Shift${s}_Actual`] = row[`Shift${s}_Actual`] ?? 0;
          filtered[`Shift${s}_Target`] = row[`Shift${s}_Target`] ?? 0;
        });
        return filtered;
      });
    }
    return allTableRows.map((row, i) => ({ ...row, SrNo: i + 1 }));
  };

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    const areaLabel =
      areaOptions.find((o) => o.value === filters.area)?.label ?? filters.area;
    const lineLabel =
      lineOptions.find((o) => o.value === filters.line)?.label ?? filters.line;
    try {
      const totalDates = pagination.totalDates || 9999;
      const fullResponse = await productionApi.detailedProduction({
        areaId: filters.area || null,
        lineId: filters.line || null,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        shifts: filters.shifts.includes("All")
          ? null
          : filters.shifts.join(","),
        pageNumber: 1,
        pageSize: totalDates,
      });
      const allRows = buildAllTableRows(fullResponse);
      await exportPDF({
        chartRef: barChartRef,
        oeeChartRef,
        tableData: allRows,
        columns: columns_ProductionReport,
        columnGroups,
        title: "Detailed Production Report",
        dateFilter,
        selectedFilters: { ...filters, area: areaLabel, line: lineLabel },
      });
      generateExcel(
        columns_ProductionReport,
        allRows,
        "Detailed Production Report",
      );
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  }, [
    areaOptions,
    lineOptions,
    filters,
    pagination.totalDates,
    columns_ProductionReport,
    columnGroups,
    dateFilter,
    isSingleShift,
    selectedShifts,
  ]);

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
    if (!isBg || showLoader || bgTriggeredRef.current) return;
    if (tableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, showLoader, tableData.length, hasSearched]);

  const isChartOverflowing = useMemo(
    () => barChartData.length > 18,
    [barChartData.length],
  );

  const hasProductionData = tableData.length > 0 || barChartData.length > 0;

  return (
    <>
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFiltersChange}
      />
      <DateRangeBar
        reportName="Detailed_Production_Count"
        showTime
        showDownload
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={downloading}
        selectedStartDate={dateFilter.startDate ?? ""}
        selectedEndDate={dateFilter.endDate ?? ""}
      />

      {!hasSearched ? (
        <SearchPromptState pageName="Detailed Production Report" />
      ) : showLoader ? (
        <div className="space-y-4 py-2">
          <ChartShimmer />
          <TableShimmer />
        </div>
      ) : dateFilter.startDate &&
        dateFilter.endDate &&
        new Date(dateFilter.startDate) > new Date(dateFilter.endDate) ? (
        <div className="bg-white border border-red-200 rounded-lg p-10 text-center text-red-400 text-sm">
          <strong>Invalid date range.</strong>&nbsp; Start date cannot be after
          end date. Please select a valid range.
        </div>
      ) : !hasProductionData ? (
        <NoDataState />
      ) : (
        <div className="flex flex-col gap-4 py-2 min-w-0 overflow-hidden">
          <div
            ref={barChartContainerRef}
            className={`flex gap-4 min-w-0 items-stretch overflow-hidden ${isChartOverflowing ? "flex-col" : "flex-col xl:flex-row"
              }`}
          >
            <div
              ref={barChartRef}
              className={`bg-white shadow-lg rounded-lg min-w-0 overflow-hidden ${isChartOverflowing ? "w-full" : "w-full xl:w-[75%]"
                }`}
              style={{ padding: "20px 12px 12px 12px" }}
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-2 px-2 text-center">
                Detailed Production Count Report
              </h2>
              <BarGraphDedicatedProduction
                key={`${selectedShifts.join(",")}-${pagination.pageNumber}`}
                data={barChartData}
              />
            </div>

            <div
              ref={oeeChartRef}
              className={`bg-white shadow-lg rounded-lg flex flex-col min-w-0 overflow-hidden ${isChartOverflowing ? "w-full" : "w-full xl:w-[25%]"
                }`}
              style={{ padding: "12px 12px 16px 12px" }}
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-2 text-center leading-tight flex-shrink-0">
                Shift OEE
              </h2>
              <div className="flex items-center justify-center flex-1 w-full min-w-0 overflow-hidden">
                {shiftOEEFiltered.length > 0 &&
                  shiftOEEFiltered.some((i) => i.OEE !== null) ? (
                  <div className="w-full flex justify-center min-w-0">
                    <ShiftOEEChart
                      key={selectedShifts.join(",")}
                      labels={shiftOEEFiltered.map((i) => i.shift)}
                      series={shiftOEEFiltered.map((i) => i.OEE ?? 0)}
                      colors={shiftOEEFiltered.map(
                        (i) => SHIFT_COLOR_MAP[i.shift] ?? "#cccccc",
                      )}
                      selectedShift={
                        selectedShifts.includes("All")
                          ? "All"
                          : selectedShifts[0]
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    No OEE data available.
                  </p>
                )}
              </div>
            </div>
          </div>

          {tableData.length > 0 && (
            <div className="w-full min-w-0 overflow-x-auto">
              <DataTable
                columns={columns_ProductionReport}
                data={tableData}
                columnGroups={columnGroups}
                hidePageSizeSelector
                serverPagination={
                  pagination.totalPages > 1
                    ? {
                      page: pagination.pageNumber,
                      pageSize: PAGE_SIZE,
                      totalRecords: pagination.totalDates,
                      totalPages: pagination.totalPages,
                      onPageChange: handlePageChange,
                    }
                    : null
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DetailedProductionCountReport;
