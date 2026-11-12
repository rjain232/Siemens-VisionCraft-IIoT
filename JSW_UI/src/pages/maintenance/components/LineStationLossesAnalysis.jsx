import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  Fragment,
  memo,
} from "react";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import { ChartShimmer, TableShimmer } from "../../../sharedComponents/Shimmer";
import { ChevronRight, Home, MousePointer2 } from "lucide-react";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import { masterApi, lossesAnalysisApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import { formatClusterName } from "../../../utils/Formatters";
import { generateExcel } from "../../../utils/ExcelUtils";
import {
  loadKarlaFont,
  loadBrandingLogos,
  drawPdfPageChrome,
  getPdfTableStyles,
  drawShiftBadge,
  PDF_MARGIN,
  PDF_HEADER_H,
} from "../../../utils/PdfUtils";
import {
  SearchPromptState,
  NoDataState,
} from "../../../sharedComponents/EmptyState";
import {
  captureChartImage,
  trimWhitespace,
} from "../../../utils/ChartCaptureUtils";

// ── Helpers ───────────────────────────────────────────────────────────────────
function durationToSeconds(dur) {
  if (!dur) return 0;
  const [h, m, s] = dur.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}
function secondsToMin(s) {
  return s / 60;
}
function fmtDuration(minutes) {
  const totalSec = Math.round(minutes * 60);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}m ${s}s`;
}

// ── PDF / Excel column definitions ───────────────────────────────────────────
const EXPORT_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "FromDate", label: "From" },
  { key: "ToDate", label: "To" },
  { key: "shift", label: "Shift" },
  { key: "cluster", label: "Area" },
  { key: "line", label: "Line" },
  { key: "station", label: "Station" },
  { key: "subStation", label: "Sub Station" },
  { key: "downtime", label: "Downtime" },
];

function buildAllColumns(lossTypes) {
  return [
    ...EXPORT_COLUMNS,
    ...lossTypes.map((lt) => ({
      key: `loss_${lt.key}`,
      label: `${lt.key} - ${lt.label}`,
    })),
  ];
}

function buildExportRows(data, lossTypes) {
  return data.map((row, i) => {
    const r = {
      ...row,
      sr: i + 1,
      cluster: formatClusterName(row.cluster ?? ""),
      subStation: row.subStation?.replace(/_/g, "") ?? "",
    };
    lossTypes.forEach((lt) => {
      r[`loss_${lt.key}`] = row.losses?.[lt.key]?.duration ?? "00:00:00";
    });
    return r;
  });
}

function downloadLossesExcel(data, dateRange, lossTypes) {
  const allColumns = buildAllColumns(lossTypes);
  const headers = allColumns.map((c) => ({ label: c.label, accessor: c.key }));
  const rows = buildExportRows(data, lossTypes);
  const start = dateRange.start || "all";
  const end = dateRange.end || "all";
  generateExcel(headers, rows, `Line_Station_Losses_${start}_to_${end}`);
}

async function downloadLossesPDF(
  data,
  filters,
  dateRange,
  masterClusters,
  lossTypes,
  chartRef,
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const start = dateRange.start || "All";
  const end = dateRange.end || "All";

  const cluster = masterClusters.find(
    (c) => String(c.ClusterId) === filters.areaId,
  );
  const areaName = cluster ? formatClusterName(cluster.ClusterName) : "All";
  const lineObj = (cluster?.Lines ?? []).find(
    (l) => String(l.LineId) === filters.lineId,
  );
  const lineName = lineObj?.LineName ?? "All";
  const stationObj = (lineObj?.Stations ?? []).find(
    (s) => String(s.StationId) === filters.stationId,
  );
  const stationName = stationObj?.StationName ?? "All";

  const shiftsArr = filters.shifts ?? ["A"];
  const shiftLabel = shiftsArr.includes("All")
    ? "All Shifts"
    : shiftsArr.map((s) => `Shift ${s}`).join(", ");

  const subLines = [
    `Area: ${areaName}   |   Line: ${lineName}   |   Station: ${stationName}   |   Shift: ${shiftLabel}`,
    `Date Range: ${start}  to  ${end}   |   Total Records: ${data.length.toLocaleString()}`,
  ];
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const MARGIN = PDF_MARGIN;
  const HEADER_H = PDF_HEADER_H;
  const FOOTER_H = 22;
  const subH = subLines.length * 5.5 + 10;
  const contentTop = HEADER_H + subH;
  const contentW = pageW - 2 * MARGIN;

  const drawPageChrome = (pageNum, totalPages) =>
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily,
      title: "Line & Station Losses Analysis",
      subLines,
      jswImg,
      schaefflerImg,
    });

  // ── Chart capture ─────────────────────────────────────────────────────────
  let chartImgData = await captureChartImage(chartRef);
  if (chartImgData) {
    const trimmed = await trimWhitespace(chartImgData);
    const maxW = contentW;
    const maxH = pageH - contentTop - FOOTER_H - 8;

    if (trimmed.width && trimmed.height) {
      const scale = Math.min(maxW / trimmed.width, maxH / trimmed.height);
      const drawW = trimmed.width * scale;
      const drawH = trimmed.height * scale;
      const drawX = MARGIN + (maxW - drawW) / 2;
      const drawY = contentTop + (maxH - drawH) / 2;
      doc.addImage(trimmed.dataUrl, "PNG", drawX, drawY, drawW, drawH);
      doc.addImage(trimmed.dataUrl, "JPEG", drawX, drawY, drawW, drawH, undefined, "FAST");
    } else {
      doc.addImage(trimmed.dataUrl, "PNG", MARGIN, contentTop, maxW, maxH);
      doc.addImage(trimmed.dataUrl, "JPEG", MARGIN, contentTop, maxW, maxH, undefined, "FAST");
    }
  }
  doc.addPage();

  // ── Column widths — sum = contentW (269mm) so table fills the full page ────
  // sr(8)+from(32)+to(32)+shift(14)+area(33)+line(33)+station(33)+sub(33)+dt(31)+btn(20) = 269
  const COL_W = {
    sr: 8,
    from: 32,
    to: 32,
    shift: 14,
    area: 33,
    line: 33,
    station: 33,
    sub: 33,
    dt: 31,
    btn: 20,
  };
  const totalTableW = Object.values(COL_W).reduce((a, b) => a + b, 0);
  const sumFirst9 = totalTableW - COL_W.btn;
  const SHIFT_COL = 3;
  const LAST_COL = 9;

  const gridAvailH = pageH - (HEADER_H + 8) - FOOTER_H - 20;
  const CARDS_PER_ROW = 10;
  const GRID_PAD = 6;
  const GRID_LABEL_H = 7;
  const CARD_GAP_X = 3;
  const CARD_GAP_Y = 3;
  const CARD_W = Math.floor(
    (totalTableW - 2 * GRID_PAD - (CARDS_PER_ROW - 1) * CARD_GAP_X) /
    CARDS_PER_ROW,
  );
  const cardRowCount =
    lossTypes.length > 0 ? Math.ceil(lossTypes.length / CARDS_PER_ROW) : 1;
  const CARD_H = Math.min(
    22,
    Math.max(
      13,
      (gridAvailH -
        2 * GRID_PAD -
        GRID_LABEL_H -
        (cardRowCount - 1) * CARD_GAP_Y) /
      cardRowCount,
    ),
  );
  const lossRowH =
    GRID_PAD + GRID_LABEL_H + cardRowCount * (CARD_H + CARD_GAP_Y) + GRID_PAD;

  const CELL_PAD = 2.5;
  const LINE_H_MM = (8 / 72) * 25.4 * 1.15;
  const numPadLines = Math.ceil((lossRowH - 2 * CELL_PAD) / LINE_H_MM);
  const lossPadText = "\n".repeat(Math.max(0, numPadLines - 1));

  data.forEach((row, i) => {
    if (i > 0) doc.addPage();

    const ms = { valign: "middle" };
    const body = [
      [
        { content: i + 1, styles: ms },
        { content: row.FromDate ?? "", styles: ms },
        { content: row.ToDate ?? "", styles: ms },
        { content: row.shift ?? "", styles: ms },
        { content: formatClusterName(row.cluster ?? ""), styles: ms },
        {
          content: row.line ?? "",
          styles: { ...ms, textColor: [3, 105, 161], fontStyle: "bold" },
        },
        { content: row.station ?? "", styles: ms },
        { content: (row.subStation ?? "").replace(/_/g, ""), styles: ms },
        {
          content: row.downtime ?? "",
          styles: { ...ms, textColor: [185, 28, 28], fontStyle: "bold" },
        },
        { content: "", styles: ms },
      ],
      [
        {
          content: lossPadText,
          styles: {
            fillColor: [255, 251, 235],
            lineWidth: 0,
            minCellHeight: lossRowH,
            valign: "top",
            textColor: [255, 251, 235],
            fontSize: 8,
          },
        },
        ...Array.from({ length: 9 }, () => ({
          content: "",
          styles: {
            fillColor: [255, 251, 235],
            lineWidth: 0,
            minCellHeight: lossRowH,
            valign: "top",
          },
        })),
      ],
    ];

    autoTable(doc, {
      startY: HEADER_H + 8,
      head: [
        [
          "SR.NO.",
          "FROM",
          "TO",
          "SHIFT",
          "AREA",
          "LINE",
          "STATION",
          "SUB STN.",
          "DOWNTIME",
          "LOSSES",
        ],
      ],
      body,
      ...getPdfTableStyles(fontFamily),
      rowPageBreak: "avoid",
      margin: {
        left: MARGIN,
        right: MARGIN,
        top: HEADER_H + 8,
        bottom: FOOTER_H + 4,
      },
      columnStyles: {
        0: { cellWidth: COL_W.sr },
        1: { cellWidth: COL_W.from },
        2: { cellWidth: COL_W.to },
        3: { cellWidth: COL_W.shift },
        4: { cellWidth: COL_W.area },
        5: { cellWidth: COL_W.line },
        6: { cellWidth: COL_W.station },
        7: { cellWidth: COL_W.sub },
        8: { cellWidth: COL_W.dt },
        9: { cellWidth: COL_W.btn },
      },
      didParseCell: (h) => {
        if (h.section !== "body") return;
        if (h.row.index === 0 && h.column.index === SHIFT_COL)
          h.cell.text = [" "];
      },
      didDrawCell: (h) => {
        if (h.section !== "body") return;

        if (h.row.index === 0 && h.column.index === SHIFT_COL) {
          if (row.shift) drawShiftBadge(doc, h.cell, row.shift, fontFamily);
          return;
        }

        if (h.row.index === 1 && h.column.index === LAST_COL) {
          const tableLeft = h.cell.x - sumFirst9;
          const tableRight = h.cell.x + h.cell.width;
          const rowY = h.cell.y;
          const rowH = h.cell.height;

          doc.setFillColor(255, 251, 235);
          doc.rect(tableLeft, rowY, tableRight - tableLeft, rowH, "F");
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.line(tableLeft, rowY, tableRight, rowY);
          doc.line(tableLeft, rowY + rowH, tableRight, rowY + rowH);

          if (!lossTypes.length) return;

          const gx = tableLeft + GRID_PAD;
          const gy = rowY + GRID_PAD;

          doc.setFont(fontFamily, "bold");
          doc.setFontSize(7);
          doc.setTextColor(12, 74, 110);
          doc.text("EFFECTIVE LOSS CATEGORY DISTRIBUTION", gx, gy + 4);

          const gridContentH =
            GRID_LABEL_H + cardRowCount * (CARD_H + CARD_GAP_Y);
          const extraSpace = Math.max(0, rowH - 2 * GRID_PAD - gridContentH);
          const cardsY = gy + GRID_LABEL_H + extraSpace / 2;

          lossTypes.forEach((lt, idx) => {
            const duration = row.losses?.[lt.key]?.duration ?? "00:00:00";
            const hasLoss = duration !== "00:00:00";
            const col = idx % CARDS_PER_ROW;
            const cardRow = Math.floor(idx / CARDS_PER_ROW);
            const cx = gx + col * (CARD_W + CARD_GAP_X);
            const cy = cardsY + cardRow * (CARD_H + CARD_GAP_Y);

            if (hasLoss) {
              doc.setFillColor(255, 255, 255);
              doc.setDrawColor(245, 158, 11);
              doc.setLineWidth(0.6);
            } else {
              doc.setFillColor(249, 250, 251);
              doc.setDrawColor(209, 213, 219);
              doc.setLineWidth(0.2);
            }
            doc.roundedRect(cx, cy, CARD_W, CARD_H, 1.5, 1.5, "FD");

            doc.setFont(fontFamily, "bold");
            doc.setFontSize(7);
            doc.setTextColor(...(hasLoss ? [180, 83, 9] : [251, 191, 36]));
            doc.text(lt.key, cx + CARD_W / 2, cy + CARD_H * 0.3, {
              align: "center",
            });

            const label =
              (lt.label ?? lt.key).length > 14
                ? (lt.label ?? lt.key).slice(0, 13) + "…"
                : (lt.label ?? lt.key);
            doc.setFont(fontFamily, "normal");
            doc.setFontSize(6);
            doc.setTextColor(...(hasLoss ? [55, 65, 81] : [156, 163, 175]));
            doc.text(label, cx + CARD_W / 2, cy + CARD_H * 0.58, {
              align: "center",
            });

            doc.setFont(fontFamily, "bold");
            doc.setFontSize(6.5);
            doc.setTextColor(...(hasLoss ? [185, 28, 28] : [156, 163, 175]));
            doc.text(duration, cx + CARD_W / 2, cy + CARD_H * 0.85, {
              align: "center",
            });
          });
        }
      },
    });
  });
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`Line_Station_Losses_${start}_to_${end}.pdf`);
}

const COLOR_SCHEME = [
  "#7C3AED", // violet   — Performance metric color
  "#F97316", // orange   — Quality metric color
  "#F59E0B", // amber    — OEE warning color
  "#C026D3", // fuchsia
  "#D97706", // dark amber
  "#8B5CF6", // soft violet
  "#EC4899", // pink
  "#FB923C", // peach orange
  "#A78BFA", // lavender
  "#6D28D9", // deep violet
];
const RED_GRADIENT = [
  "#FFCDD2",
  "#EF9A9A",
  "#E57373",
  "#EF5350",
  "#F44336",
  "#E53935",
  "#D32F2F",
  "#C62828",
  "#B71C1C",
  "#8B0000",
];

// ── Shift badge — mirrors DataTable ──────────────────────────────────────────
const SHIFT_BADGE_STYLE = {
  A: {
    backgroundColor: "#e8ecfa",
    color: "#2744A0",
    border: "1px solid #c3cbf0",
  },
  B: {
    backgroundColor: "#dbeafe",
    color: "#3b82f6",
    border: "1px solid #bfdbfe",
  },
  C: {
    backgroundColor: "#d1fae5",
    color: "#10b981",
    border: "1px solid #a7f3d0",
  },
};

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];
const FETCH_ALL_PAGE_SIZE = 999999;
const ACTIVE_PAGE_BG = "rgb(22, 70, 161)";

const SHIFT_OPTIONS = [
  { value: "All", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const LEVEL_LABELS = {
  substations: "Sub-Stations",
  categories: "Loss Categories",
};

const PAGE_NAME = "Line & Station Losses Analysis";

// ── Expandable losses table ───────────────────────────────────────────────────
const LossesTable = memo(function LossesTable({ data, loading, lossTypes }) {
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Reset page when data changes
  useEffect(() => {
    setPage(1);
    setExpanded({});
  }, [data]);

  const toggle = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const { totalPages, safePage, paginated, from, to } = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
    const safePage = Math.min(page, totalPages);
    const paginated = data.slice(
      (safePage - 1) * rowsPerPage,
      safePage * rowsPerPage,
    );
    const from = data.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
    const to = Math.min(safePage * rowsPerPage, data.length);
    return { totalPages, safePage, paginated, from, to };
  }, [data, page, rowsPerPage]);

  const getPages = useMemo(() => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (safePage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  }, [totalPages, safePage]);

  const thCls =
    "px-4 py-2 text-center text-xs font-bold text-sky-800 tracking-widest uppercase whitespace-nowrap border-r border-sky-300 last:border-r-0";
  const tdCls =
    "px-1 py-1 text-center border-r border-slate-200 whitespace-nowrap";

  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 bg-sky-600 rounded-full" />
          <span className="text-sm font-bold text-slate-700 tracking-wide">
            Line &amp; Station Losses Tabular Data
          </span>
        </div>
        <span className="text-xs font-medium text-slate-500">
          Showing{" "}
          <span className="font-bold text-sky-600">
            {from}–{to}
          </span>{" "}
          of <span className="font-bold text-sky-600">{data.length}</span>{" "}
          records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <TableShimmer rows={5} />
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-200/80 border-b border-sky-300">
                <th className={thCls}>Sr. No.</th>
                <th className={thCls}>From</th>
                <th className={thCls}>To</th>
                <th className={thCls}>Shift</th>
                <th className={thCls}>Area</th>
                <th className={thCls}>Line</th>
                <th className={thCls}>Station</th>
                <th className={thCls}>Sub Station</th>
                <th className={thCls}>Downtime</th>
                <th className={thCls}>Losses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-16 text-sm font-medium text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">📭</span>
                      <span>
                        {data.length === 0
                          ? "No data for selected filters."
                          : "No data found."}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const gi = (safePage - 1) * rowsPerPage + idx;
                  const isEven = idx % 2 === 1;
                  return (
                    <Fragment key={gi}>
                      <tr
                        className={`transition-colors duration-100 hover:bg-sky-50 cursor-pointer ${isEven ? "bg-slate-50/70" : "bg-white"}`}
                        onClick={() => toggle(gi)}
                      >
                        <td className={tdCls}>
                          <span className="text-xs font-semibold text-slate-500 tabular-nums">
                            {gi + 1}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-medium text-slate-600">
                            {row.FromDate}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-medium text-slate-600">
                            {row.ToDate}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span
                            style={
                              SHIFT_BADGE_STYLE[row.shift] ??
                              SHIFT_BADGE_STYLE.A
                            }
                            className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold tracking-wide"
                          >
                            {row.shift}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-medium text-slate-700">
                            {formatClusterName(row.cluster)}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-semibold text-sky-700 tracking-wide">
                            {row.line}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-medium text-slate-700">
                            {row.station}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-medium text-slate-700">
                            {row.subStation?.replace(/_/g, "")}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <span className="text-sm font-bold text-red-600 tabular-nums">
                            {row.downtime}
                          </span>
                        </td>
                        <td className={tdCls}>
                          <button className="inline-flex items-center gap-1 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                            {expanded[gi] ? (
                              <>
                                <span>Hide</span>
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                              </>
                            ) : (
                              <>
                                <span>View</span>
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {expanded[gi] && (
                        <tr>
                          <td
                            colSpan={10}
                            className="border-t border-slate-200 bg-amber-50 px-3 py-3"
                          >
                            <p className="text-xs font-extrabold text-sky-900 uppercase tracking-wider mb-2">
                               Loss Category Distribution
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                              {lossTypes.map((loss) => {
                                const d = row.losses?.[loss.key];
                                const duration = d?.duration ?? "00:00:00";
                                const hasLoss = duration !== "00:00:00";
                                return (
                                  <div
                                    key={loss.key}
                                    className={`rounded-md border p-1.5 text-center transition-all duration-200 select-none ${hasLoss
                                      ? "bg-white border-amber-500 border-2 shadow-md ring-1 ring-amber-200"
                                      : "bg-gray-50 border-gray-200 opacity-40"
                                      }`}
                                  >
                                    <div
                                      className={`font-extrabold text-sm mb-0.5 ${hasLoss ? "text-amber-700" : "text-amber-400"}`}
                                    >
                                      {loss.key}
                                    </div>
                                    <div className="font-semibold leading-tight mb-1 min-h-[2rem] flex items-center justify-center text-xs text-gray-700">
                                      {loss.label}
                                    </div>
                                    <div
                                      className={`font-black text-xs ${hasLoss ? "text-red-700" : "text-gray-400"}`}
                                    >
                                      {duration}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
          <span className="hidden sm:inline">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="text-sm font-semibold px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 cursor-pointer outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all"
          >
            {ROWS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">‹</span>
          </button>
          {getPages.map((p, i) =>
            p === "..." ? (
              <span
                key={`d${i}`}
                className="px-1 text-sm font-semibold text-slate-400"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${safePage === p ? "text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"}`}
                style={
                  safePage === p ? { backgroundColor: ACTIVE_PAGE_BG } : {}
                }
              >
                {p}
              </button>
            ),
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">›</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// ── Pie with guide lines — categories level only ─────────────────────────────
function PieWithGuidelines({ items, colors, total }) {
  const n = items.filter((i) => i.value > 0).length;
  const W = 1200;
  const H = Math.max(560, n * 26 + 80);
  const cx = W / 2,
    cy = H / 2;
  const R = Math.min(155, H / 2 - 60);
  const ELBOW_R = R + 36;

  let angle = -Math.PI / 2;
  const slices = items
    .filter((i) => i.value > 0)
    .map((item, i) => {
      const sweep = (item.value / total) * 2 * Math.PI;
      const start = angle;
      angle += sweep;
      return {
        ...item,
        color: colors[i] ?? "#94a3b8",
        start,
        sweep,
        mid: start + sweep / 2,
        idx: i,
      };
    });

  const withElbow = slices.map((s) => ({
    ...s,
    isRight: Math.cos(s.mid) >= 0,
    elbowX: cx + ELBOW_R * Math.cos(s.mid),
    elbowY: cy + ELBOW_R * Math.sin(s.mid),
  }));

  const distribute = (group) => {
    if (!group.length) return [];
    const sorted = [...group].sort((a, b) => a.elbowY - b.elbowY);
    const cnt = sorted.length;
    if (cnt === 1) return [{ ...sorted[0], labelY: cy }];
    const PAD = 28;
    const spanHalf = Math.min(H / 2 - PAD, cnt * 20);
    const minY = cy - spanHalf;
    const maxY = cy + spanHalf;
    return sorted.map((s, i) => ({
      ...s,
      labelY: minY + (i / (cnt - 1)) * (maxY - minY),
    }));
  };

  const allLabeled = [
    ...distribute(withElbow.filter((s) => s.isRight)),
    ...distribute(withElbow.filter((s) => !s.isRight)),
  ];

  const END_RIGHT = cx + R + 120;
  const END_LEFT = cx - R - 120;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {slices.map((s) => {
        const x1 = cx + R * Math.cos(s.start);
        const y1 = cy + R * Math.sin(s.start);
        const x2 = cx + R * Math.cos(s.start + s.sweep);
        const y2 = cy + R * Math.sin(s.start + s.sweep);
        const d = `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${s.sweep > Math.PI ? 1 : 0},1 ${x2},${y2} Z`;
        return (
          <path
            key={s.idx}
            d={d}
            fill={s.color}
            stroke="white"
            strokeWidth={2.5}
          >
            <title>
              {s.name}: {fmtDuration(s.value)}
            </title>
          </path>
        );
      })}

      {slices.map((s) => {
        if (s.sweep / (2 * Math.PI) < 0.08) return null;
        const lr = R * 0.62;
        return (
          <text
            key={`pct-${s.idx}`}
            x={cx + lr * Math.cos(s.mid)}
            y={cy + lr * Math.sin(s.mid)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={12}
            fontWeight={700}
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }}
          >
            {((s.sweep / (2 * Math.PI)) * 100).toFixed(0)}%
          </text>
        );
      })}

      {allLabeled.map((s) => {
        const arcX = cx + (R + 5) * Math.cos(s.mid);
        const arcY = cy + (R + 5) * Math.sin(s.mid);
        const endX = s.isRight ? END_RIGHT : END_LEFT;
        const textX = s.isRight ? endX + 7 : endX - 7;
        const ta = s.isRight ? "start" : "end";
        return (
          <g key={`gl-${s.idx}`}>
            <polyline
              points={`${arcX},${arcY} ${s.elbowX},${s.elbowY} ${endX},${s.labelY}`}
              fill="none"
              stroke={s.color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
            <circle cx={endX} cy={s.labelY} r={2.5} fill={s.color} />
            <text
              x={textX}
              y={s.labelY - 3}
              textAnchor={ta}
              fill="#111827"
              fontSize={11}
              fontWeight={600}
            >
              {s.name}
            </text>
            <text
              x={textX}
              y={s.labelY + 11}
              textAnchor={ta}
              fill="#dc2626"
              fontSize={10}
              fontWeight={700}
            >
              {fmtDuration(s.value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Interactive Drill-Down Pie Chart ─────────────────────────────────────────
function InteractivePieChart({ data, printRef, onSubStationSelect }) {
  const [currentLevel, setCurrentLevel] = useState("substations");
  const [breadcrumb, setBreadcrumb] = useState([
    { level: "substations", label: "Sub-Stations" },
  ]);
  const [selSub, setSelSub] = useState(null);

  useEffect(() => {
    setCurrentLevel("substations");
    setBreadcrumb([{ level: "substations", label: "Sub-Stations" }]);
    setSelSub(null);
    onSubStationSelect?.(null);
  }, [data]);

  const currentData = useMemo(() => {
    if (currentLevel === "substations") {
      return {
        labels: data.substations.map((ss) => ss.name),
        series: data.substations.map((ss) => ss.value),
        items: data.substations,
      };
    }
    const sub = data.substations.find((ss) => ss.name === selSub);
    return {
      labels: sub.categories.map((c) => c.name),
      series: sub.categories.map((c) => c.value),
      items: sub.categories,
    };
  }, [currentLevel, selSub, data]);

  const total = useMemo(
    () => currentData.series.reduce((a, b) => a + b, 0),
    [currentData.series],
  );

  const colors = useMemo(() => {
    if (currentLevel !== "categories") return COLOR_SCHEME;
    const withScore = currentData.items.map((item, i) => ({
      i,
      score: item.value,
    }));
    const sorted = [...withScore].sort((a, b) => a.score - b.score);
    const result = new Array(currentData.items.length);
    sorted.forEach((item, rank) => {
      result[item.i] =
        RED_GRADIENT[
        Math.floor((rank / sorted.length) * (RED_GRADIENT.length - 1))
        ];
    });
    return result;
  }, [currentLevel, currentData.items]);

  const handleClick = useCallback(
    (_, __, config) => {
      const idx = config.dataPointIndex;
      if (idx === -1 || idx === undefined) return;
      const clicked = currentData.items[idx];
      if (currentLevel === "substations") {
        setSelSub(clicked.name);
        setCurrentLevel("categories");
        setBreadcrumb((p) => [
          ...p,
          { level: "categories", label: clicked.name },
        ]);
        onSubStationSelect?.(clicked.name);
      }
    },
    [currentData.items, currentLevel],
  );

  const handleBreadcrumb = useCallback(
    (i) => {
      const item = breadcrumb[i];
      setBreadcrumb(breadcrumb.slice(0, i + 1));
      setCurrentLevel(item.level);
      if (item.level === "substations") {
        setSelSub(null);
        onSubStationSelect?.(null);
      }
    },
    [breadcrumb],
  );

  const isCategories = currentLevel === "categories";

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
        events: { dataPointSelection: handleClick },
        animations: { enabled: true, easing: "easeinout", speed: 700 },
      },
      labels: currentData.labels,
      colors,
      legend: {
        position: "bottom",
        fontSize: "13px",
        fontWeight: 600,
        markers: { width: 14, height: 14, radius: 3 },
        itemMargin: { horizontal: 12, vertical: 8 },
        labels: { colors: "#374151" },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          customScale: 0.9,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: isCategories ? 8 : 10,
          },
        },
      },
      dataLabels: {
        enabled: !isCategories,
        style: { fontSize: "13px", fontWeight: "700", colors: ["#fff"] },
        formatter: (_, opts) => {
          const val = opts.w.config.series[opts.seriesIndex];
          if (!val || val <= 0) return "";
          return fmtDuration(val);
        },
        dropShadow: { enabled: true, top: 1, left: 1, blur: 3, opacity: 0.75 },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => {
            const pct = ((val / total) * 100).toFixed(1);
            return `${fmtDuration(val)} (${pct}%)`;
          },
        },
      },
      stroke: { show: true, width: 2, colors: ["#fff"] },
      states: {
        hover: { filter: { type: "lighten", value: 0.08 } },
        active: { filter: { type: "darken", value: 0.2 } },
      },
    }),
    [handleClick, currentData.labels, colors, total, isCategories],
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-6 py-4 border-b border-sky-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wide">
            Loss Distribution
          </h3>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-sky-200 text-center min-w-[120px]">
            <div className="text-[10px] font-semibold text-sky-500 uppercase tracking-wide">
              Total Downtime
            </div>
            <div className="text-lg font-bold text-sky-800">
              {fmtDuration(total)}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-1 bg-white rounded-md px-3 py-2 shadow-sm border border-sky-100">
          {breadcrumb.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              {i === 0 ? (
                <button
                  onClick={() => handleBreadcrumb(i)}
                  className="flex items-center gap-1.5 text-sky-600 hover:text-sky-800 hover:bg-sky-50 px-2 py-1 rounded transition-colors text-xs font-semibold"
                >
                  <Home size={13} />
                  <span>{item.label}</span>
                </button>
              ) : (
                <>
                  <ChevronRight size={13} className="text-gray-300" />
                  <button
                    onClick={() => handleBreadcrumb(i)}
                    className={`px-2 py-1 rounded transition-colors text-xs ${i === breadcrumb.length - 1 ? "font-bold text-gray-800 bg-sky-100" : "font-semibold text-sky-600 hover:bg-sky-50"}`}
                  >
                    {item.label}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Viewing:
          </span>
          <span className="bg-sky-100 text-sky-700 px-3 py-0.5 rounded-full text-xs font-bold">
            {LEVEL_LABELS[currentLevel]}
          </span>
          <span className="text-xs text-gray-400">
            ({currentData.items.length} items)
          </span>
        </div>

        {isCategories ? (
          <>
            <div ref={printRef}>
              <PieWithGuidelines
                items={currentData.items}
                colors={colors}
                total={total}
              />
            </div>
            <div className="mt-1 text-center">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-md text-xs font-semibold border border-red-200">
                <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-red-200 to-red-800 inline-block" />
                Color intensity: Light red (low impact) → Dark red (high
                duration × occurrences)
              </div>
            </div>
          </>
        ) : (
          <div className="cursor-pointer">
            <div ref={printRef}>
              <Chart
                key={`${currentLevel}-${selSub}`}
                options={chartOptions}
                series={currentData.series}
                type="pie"
                height={600}
              />
            </div>
            <div className="mt-3 text-center">
              <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-md text-xs font-semibold border border-sky-200">
                <MousePointer2 size={13} /> Click any segment to drill down
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LineStationLossesAnalysis({
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

  const [masterClusters, setMasterClusters] = useState([]);
  const [lossTypes, setLossTypes] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);

  const [filters, setFilters] = useState({
    areaId: "",
    lineId: "",
    stationId: "",
    shifts: ["A"],
  });
  const [dateRange, setDateRange] = useState(
    targetDateRange
      ? { start: targetDateRange.start || "", end: targetDateRange.end || targetDateRange.start || "" }
      : (navState.dateRange ?? { start: "", end: "" }),
  );

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedSubStation, setSelectedSubStation] = useState(null);

  const abortRef = useRef(null);
  const chartRef = useRef(null);

  // ── Load master data + loss types in parallel ───────────────────────────────
  useEffect(() => {
    Promise.all([masterApi.getMasterData(), lossesAnalysisApi.lossTypes()])
      .then(([masterRes, lossRes]) => {
        // Master data
        const clusters = masterRes.data ?? [];
        setMasterClusters(clusters);

        const incomingLineId = navState.lineId ? String(navState.lineId) : null;

        if (targetFilters) {
          let matchedClusterId = "";
          let matchedLineId = "";
          let matchedStationId = "";

          for (const cluster of clusters) {
            const areaMatches =
              !targetFilters.area && !targetFilters.areaId
                ? true
                : String(cluster.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                  String(cluster.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase();
            if (areaMatches) {
              matchedClusterId = String(cluster.ClusterId);
              for (const line of cluster.Lines ?? []) {
                const lineMatches =
                  !targetFilters.line && !targetFilters.lineId
                    ? true
                    : String(line.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                      String(line.LineName).toLowerCase() === String(targetFilters.line).toLowerCase();
                if (lineMatches) {
                  matchedLineId = String(line.LineId);
                  for (const st of line.Stations ?? []) {
                    const stMatches =
                      !targetFilters.station && !targetFilters.stationId
                        ? true
                        : targetFilters.station === "All" || targetFilters.stationId === "All"
                        ? true
                        : String(st.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                          String(st.StationName).toLowerCase() === String(targetFilters.station).toLowerCase();
                    if (stMatches) {
                      matchedStationId = String(st.StationId);
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
            areaId: matchedClusterId || (clusters[0] ? String(clusters[0].ClusterId) : ""),
            lineId: matchedLineId || (clusters[0]?.Lines?.[0] ? String(clusters[0].Lines[0].LineId) : ""),
            stationId: matchedStationId || "",
            shifts: shifts.includes("All") ? ["ALL"] : shifts,
          });
          setHasSearched(true);
        } else if (incomingLineId) {
          let matchedCluster = null;
          let matchedLine = null;
          for (const cluster of clusters) {
            const line = (cluster.Lines ?? []).find(
              (l) => String(l.LineId) === incomingLineId,
            );
            if (line) {
              matchedCluster = cluster;
              matchedLine = line;
              break;
            }
          }
          if (matchedCluster && matchedLine) {
            setFilters({
              areaId: String(matchedCluster.ClusterId),
              lineId: incomingLineId,
              stationId: "",
              shifts: ["A"],
            });
            if (navState.dateRange?.start && navState.dateRange?.end) {
              setHasSearched(true);
            }
          } else {
            const first = clusters[0];
            const firstLine = (first?.Lines ?? [])[0];
            const firstSt = (firstLine?.Stations ?? [])[0];
            setFilters({
              areaId: first ? String(first.ClusterId) : "",
              lineId: firstLine ? String(firstLine.LineId) : "",
              stationId: firstSt ? String(firstSt.StationId) : "",
              shifts: ["A"],
            });
          }
        } else {
          const first = clusters[0];
          const firstLine = (first?.Lines ?? [])[0];
          const firstSt = (firstLine?.Stations ?? [])[0];
          setFilters({
            areaId: first ? String(first.ClusterId) : "",
            lineId: firstLine ? String(firstLine.LineId) : "",
            stationId: firstSt ? String(firstSt.StationId) : "",
            shifts: ["A"],
          });
        }

        // Loss types
        setLossTypes(lossRes.lossTypes ?? []);
      })
      .catch((err) => console.error("[LineStationLosses] init fetch:", err))
      .finally(() => setMasterLoading(false));
  }, []);

  // ── Dropdown option builders ────────────────────────────────────────────────
  const clusterOptions = useMemo(
    () =>
      masterClusters.map((c) => ({
        value: String(c.ClusterId),
        label: formatClusterName(c.ClusterName),
      })),
    [masterClusters],
  );

  const lineOptions = useMemo(() => {
    const cluster = masterClusters.find(
      (c) => String(c.ClusterId) === filters.areaId,
    );
    return (cluster?.Lines ?? []).map((l) => ({
      value: String(l.LineId),
      label: l.LineName,
    }));
  }, [filters.areaId, masterClusters]);

  const stationOptions = useMemo(() => {
    for (const cluster of masterClusters) {
      const line = (cluster.Lines ?? []).find(
        (l) => String(l.LineId) === filters.lineId,
      );
      if (line)
        return (line.Stations ?? []).map((s) => ({
          value: String(s.StationId),
          label: s.StationName,
        }));
    }
    return [];
  }, [filters.lineId, masterClusters]);

  // ── Filter cascade ──────────────────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (next) => {
      if (next.areaId !== filters.areaId) {
        const cluster = masterClusters.find(
          (c) => String(c.ClusterId) === next.areaId,
        );
        const firstLine = (cluster?.Lines ?? [])[0];
        const firstSt = (firstLine?.Stations ?? [])[0];
        next.lineId = firstLine ? String(firstLine.LineId) : "";
        next.stationId = firstSt ? String(firstSt.StationId) : "";
      } else if (next.lineId !== filters.lineId) {
        for (const cluster of masterClusters) {
          const line = (cluster.Lines ?? []).find(
            (l) => String(l.LineId) === next.lineId,
          );
          if (line) {
            next.stationId = (line.Stations ?? [])[0]
              ? String((line.Stations ?? [])[0].StationId)
              : "";
            break;
          }
        }
      }

      const prevShifts = filters.shifts ?? ["A"];
      let nextShifts = next.shifts ?? prevShifts;
      if (nextShifts.includes("All") && !prevShifts.includes("All")) {
        nextShifts = ["All"];
      } else if (!nextShifts.includes("All") && prevShifts.includes("All")) {
        nextShifts = nextShifts.filter((s) => s !== "All");
        if (nextShifts.length === 0) nextShifts = ["A"];
      } else if (
        !nextShifts.includes("All") &&
        INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
      ) {
        nextShifts = ["All"];
      } else if (nextShifts.includes("All") && nextShifts.length > 1) {
        nextShifts = nextShifts.filter((s) => s !== "All");
      }
      next.shifts = nextShifts;

      setFilters(next);
    },
    [filters, masterClusters],
  );

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "areaId", label: "Area", options: clusterOptions },
      { type: "select", key: "lineId", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "stationId",
        label: "Station",
        options: stationOptions,
      },
      { type: "divider" },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
    ],
    [clusterOptions, lineOptions, stationOptions],
  );

  // ── Fetch data from API ─────────────────────────────────────────────────────
  const fetchData = useCallback(async (df) => {
    if (!df.lineId) return;

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    setLoading(true);
    setFetchError(null);

    try {
      const shiftsArr = df.shifts ?? ["A"];
      const shiftParam = shiftsArr.includes("All") ? "All" : shiftsArr.join(",");

      const params = {
        ...(df.areaId && { areaId: df.areaId }),
        lineId: df.lineId,
        ...(df.stationId && { stationId: df.stationId }),
        shift: shiftParam,
        ...(df.startDate && { startDate: df.startDate }),
        ...(df.endDate && { endDate: df.endDate }),
        pageSize: FETCH_ALL_PAGE_SIZE,
        page: 1,
      };

      const res = await lossesAnalysisApi.report(params, signal);
      setTableData(res.tableData || []);
    } catch (err) {
      if (err.name === "AbortError") return;
      setFetchError(err.message);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (startDate, endDate) => {
      setDateRange({ start: startDate, end: endDate });
      setHasSearched(true);
      fetchData({ ...filters, startDate, endDate });
    },
    [filters, fetchData],
  );

  // ── Filter table rows to SubStation-type only ──────────────────────────────
  const subStationTypeNames = useMemo(() => {
    const names = new Set();
    masterClusters
      .flatMap((c) => c.Lines ?? [])
      .flatMap((l) => l.Stations ?? [])
      .flatMap((s) => s.SubStations ?? [])
      .filter((ss) => ss.Type === "SubStation")
      .forEach((ss) => names.add(ss.SubStationName));
    return names;
  }, [masterClusters]);

  const filteredTableData = useMemo(
    () =>
      subStationTypeNames.size > 0
        ? tableData.filter((row) => subStationTypeNames.has(row.subStation))
        : tableData,
    [tableData, subStationTypeNames],
  );

  const handleDownload = useCallback(async () => {
    if (isDownloading || (filteredTableData.length === 0 && !isBg)) return;
    setIsDownloading(true);
    try {
      await Promise.all([
        downloadLossesPDF(
          filteredTableData,
          filters,
          dateRange,
          masterClusters,
          lossTypes,
          chartRef,
        ),
        Promise.resolve(
          downloadLossesExcel(filteredTableData, dateRange, lossTypes),
        ),
      ]);
    } catch (err) {
      console.error("LineStationLosses download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [
    isDownloading,
    filteredTableData,
    filters,
    dateRange,
    masterClusters,
    lossTypes,
  ]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  // Sync date range in background mode & trigger initial fetch
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateRange({ start: s, end: e });
      setHasSearched(true);
      fetchData({ ...filters, startDate: s, endDate: e });
    }
  }, [isBg, targetDateRange, fetchData]);

  useEffect(() => {
    if (!isBg || loading || bgTriggeredRef.current) return;
    if (filteredTableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, filteredTableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, loading, filteredTableData.length, hasSearched]);

  // Re-fetch when filters change after the first search
  useEffect(() => {
    if (!hasSearched) return;
    const timer = setTimeout(() => {
      fetchData({
        ...filters,
        startDate: dateRange.start,
        endDate: dateRange.end,
      });
    }, 300);
    // Removed clearTimeout to prevent race condition canceling export
  }, [filters]);

  // ── Build pie data from tableData ───────────────────────────────────────────
  const pieData = useMemo(() => {
    const grouped = {};

    filteredTableData.forEach((item) => {
      if (!item.subStation) return;
      grouped[item.subStation] ??= { categories: {} };
      const cats = grouped[item.subStation].categories;
      Object.values(item.losses ?? {}).forEach((loss) => {
        const secs = durationToSeconds(loss?.duration);
        if (secs > 0 && loss?.label) {
          if (cats[loss.label]) {
            cats[loss.label].valueInSeconds += secs;
            cats[loss.label].value = secondsToMin(
              cats[loss.label].valueInSeconds,
            );
          } else {
            cats[loss.label] = {
              name: loss.label,
              valueInSeconds: secs,
              value: secondsToMin(secs),
            };
          }
        }
      });
    });

    const substations = Object.entries(grouped)
      .map(([subName, { categories }]) => {
        const categoryArr = Object.values(categories).sort(
          (a, b) => b.value - a.value,
        );
        const valSec = categoryArr.reduce((s, c) => s + c.valueInSeconds, 0);
        return {
          name: subName,
          valueInSeconds: valSec,
          value: secondsToMin(valSec),
          categories: categoryArr,
        };
      })
      .sort((a, b) => b.value - a.value);

    return { substations };
  }, [filteredTableData]);
  // ── Cleanup abort on unmount ────────────────────────────────────────────────
  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  if (masterLoading) {
    return (
      <div className="p-4 space-y-4">
        <ChartShimmer />
        <TableShimmer />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-full">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        reportName="Line_Station_Losses"
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        showDownload
        showTime
        selectedStartDate={dateRange.start}
        selectedEndDate={dateRange.end}
      />

      {fetchError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm font-medium">
          Error: {fetchError}
        </div>
      )}

      {loading ? (
        <ChartShimmer />
      ) : !hasSearched ? (
        <SearchPromptState pageName={PAGE_NAME} />
      ) : pieData.substations.length > 0 ? (
        <InteractivePieChart
          data={pieData}
          printRef={chartRef}
          onSubStationSelect={setSelectedSubStation}
        />
      ) : (
        !fetchError && <NoDataState />
      )}

      {hasSearched && pieData.substations.length > 0 && (
        <LossesTable
          data={
            selectedSubStation
              ? filteredTableData.filter(
                (r) => r.subStation === selectedSubStation,
              )
              : filteredTableData
          }
          loading={loading}
          lossTypes={lossTypes}
        />
      )}
    </div>
  );
}
