import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  memo,
  Fragment,
} from "react";
import { productionApi } from "../../../../services/api";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
} from "../../../../utils/PdfUtils";
import {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState";
import { TableShimmer } from "../../../../sharedComponents/Shimmer";
import { generateExcelWithGroupedHeaders } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";

const DEFAULT_SHIFTS = ["A", "B", "C"];
const SHIFT_REFETCH_DEBOUNCE_MS = 350;

const HD_BG = [186, 230, 253];       // #bae6fd – header / sub-header bg
const HD_GROUP_BG = [165, 216, 255]; // #a5d8ff – group row bg (date range, shift)
const HD_TEXT = [12, 74, 110];       // #0c4a6e – all header text

const SUB_HEADERS = Object.freeze([
  "J5\nTarget",
  "J5\nActual",
  "V23\nTarget",
  "V23\nActual",
  "Total\nProduction",
  "Total\nTarget",
]);

const formatDateLabel = (value) => {
  if (!value) return "Selected Date";
  const d = new Date(value);
  if (isNaN(d)) return "Selected Date";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatCellValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

const toSafeNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const buildDisplayRows = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const dateMap = new Map();

  for (const row of rows) {
    if (!row) continue;

    const date = (row.ProductionDate || "").slice(0, 10) || "Unknown";
    const lineKey = row.LineID ?? row.LineName ?? "unknown-line";

    if (!dateMap.has(date)) dateMap.set(date, new Map());
    const lineMap = dateMap.get(date);
    const existing = lineMap.get(lineKey) || {
      id: lineKey,
      LineName: row.LineName,
      J5_Target: 0,
      J5_Actual: 0,
      V23_Target: 0,
      V23_Actual: 0,
      TotalTarget: 0,
    };

    existing.J5_Target += toSafeNumber(row.J5_Target);
    existing.J5_Actual += toSafeNumber(row.J5_Actual);
    existing.V23_Target += toSafeNumber(row.V23_Target);
    existing.V23_Actual += toSafeNumber(row.V23_Actual);
    existing.TotalTarget += toSafeNumber(row.TotalTarget);

    lineMap.set(lineKey, existing);
  }

  return Array.from(dateMap.entries())
    .map(([date, lineMap]) => {
      const lines = Array.from(lineMap.values())
        .map((line) => ({
          id: line.id,
          lineName:
            line.LineName && String(line.LineName).trim() !== ""
              ? line.LineName
              : "Null",
          j5Target: line.J5_Target,
          j5Actual: line.J5_Actual,
          v23Target: line.V23_Target,
          v23Actual: line.V23_Actual,
          dayTarget: line.TotalTarget,
          dayProd: line.J5_Actual + line.V23_Actual,
        }))
        .sort((a, b) => {
          const aNum = Number(a.id);
          const bNum = Number(b.id);
          if (Number.isFinite(aNum) && Number.isFinite(bNum))
            return aNum - bNum;
          return String(a.id).localeCompare(String(b.id));
        });

      const totals = lines.reduce(
        (acc, l) => ({
          j5Target: acc.j5Target + l.j5Target,
          j5Actual: acc.j5Actual + l.j5Actual,
          v23Target: acc.v23Target + l.v23Target,
          v23Actual: acc.v23Actual + l.v23Actual,
          dayProd: acc.dayProd + l.dayProd,
          dayTarget: acc.dayTarget + l.dayTarget,
        }),
        {
          j5Target: 0,
          j5Actual: 0,
          v23Target: 0,
          v23Actual: 0,
          dayProd: 0,
          dayTarget: 0,
        },
      );

      return { date, lines, totals };
    });
};

async function downloadProductionSummaryPDF(
  productionData,
  { from, to, shiftsLabel },
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });

  const MARGIN = 14;
  const HEADER_H = 40;

  const dateLabel =
    from === to
      ? formatDateLabel(from)
      : `${formatDateLabel(from)} – ${formatDateLabel(to)}`;

  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const subLines = [
    `Report Duration: ${from}  To  ${to}`,
    `Shifts: ${shiftsLabel}`,
  ];

  function drawPageChrome(pageNum, totalPages) {
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily,
      title: "Production Summary",
      subLines,
      jswImg,
      schaefflerImg,
    });
  }

  const tableHead = [
    [
      {
        content: "Line Name",
        rowSpan: 3,
        styles: { valign: "middle", halign: "center", fillColor: HD_BG, textColor: HD_TEXT },
      },
      {
        content: dateLabel,
        colSpan: 4,
        styles: { halign: "center", fillColor: HD_GROUP_BG, textColor: HD_TEXT },
      },
      {
        content: "Total Production",
        colSpan: 2,
        rowSpan: 2,
        styles: { valign: "middle", halign: "center", fillColor: HD_BG, textColor: HD_TEXT },
      },
    ],

    [
      {
        content: `Shift  ${shiftsLabel}`,
        colSpan: 4,
        styles: { halign: "center", fillColor: HD_GROUP_BG, textColor: HD_TEXT },
      },
    ],

    [
      {
        content: "J5\nTarget",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
      {
        content: "J5\nActual",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
      {
        content: "V23\nTarget",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
      {
        content: "V23\nActual",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
      {
        content: "Total\nProduction",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
      {
        content: "Total\nTarget",
        styles: { halign: "center", valign: "middle", fillColor: HD_BG, textColor: HD_TEXT, fontStyle: "bold" },
      },
    ],
  ];

  const tableBody = [];
  productionData.forEach(({ date, lines, totals }) => {
    tableBody.push([
      {
        content: formatDateLabel(date),
        colSpan: 7,
        styles: {
          fillColor: [3, 105, 161],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
    ]);

    lines.forEach((row, index) => {
      const rowFill = index % 2 === 0 ? [255, 255, 255] : [248, 250, 252];
      tableBody.push([
        {
          content: row.lineName,
          styles: { textColor: [3, 105, 161], fontStyle: "bold", halign: "center", fillColor: rowFill },
        },
        { content: formatCellValue(row.j5Target), styles: { fontStyle: "bold", fillColor: rowFill } },
        { content: formatCellValue(row.j5Actual), styles: { fontStyle: "bold", fillColor: rowFill } },
        { content: formatCellValue(row.v23Target), styles: { fontStyle: "bold", fillColor: rowFill } },
        { content: formatCellValue(row.v23Actual), styles: { fontStyle: "bold", fillColor: rowFill } },
        { content: formatCellValue(row.dayProd), styles: { fontStyle: "bold", halign: "center", fillColor: rowFill } },
        { content: formatCellValue(row.dayTarget), styles: { fontStyle: "bold", halign: "center", fillColor: rowFill } },
      ]);
    });

    tableBody.push([
      {
        content: "Total",
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.j5Target,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.j5Actual,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.v23Target,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.v23Actual,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.dayProd,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      {
        content: totals.dayTarget,
        styles: {
          fillColor: [7, 89, 133],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
    ]);
  });

  const contentTop = HEADER_H + 22;

  autoTable(doc, {
    head: tableHead,
    body: tableBody,
    startY: contentTop,
    styles: {
      fontSize: 9,
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      halign: "center",
      font: fontFamily,
      textColor: [51, 65, 85],
    },
    headStyles: {
      fillColor: HD_BG,
      textColor: HD_TEXT,
      fontStyle: "bold",
      fontSize: 9,
      font: fontFamily,
      valign: "middle",
    },
    alternateRowStyles: {},
    rowPageBreakAvoid: true,
    margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
    tableWidth: "auto",
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`production-summary-${from}-to-${to}.pdf`);
}

const EXCEL_COLUMNS = [
  { label: "Line Name", accessor: "lineName" },
  { label: "J5 Target", accessor: "j5Target" },
  { label: "J5 Actual", accessor: "j5Actual" },
  { label: "V23 Target", accessor: "v23Target" },
  { label: "V23 Actual", accessor: "v23Actual" },
  { label: "Total Production", accessor: "dayProd" },
  { label: "Total Target", accessor: "dayTarget" },
];

function buildExcelRowsAndMerges(productionData) {
  const rows = [];
  const merges = [];
  let rowIndex = 3;

  productionData.forEach(({ date, lines, totals }) => {
    rows.push({ lineName: formatDateLabel(date) });
    merges.push({ s: { r: rowIndex, c: 0 }, e: { r: rowIndex, c: 6 } });
    rowIndex += 1;

    lines.forEach((row) => {
      rows.push({
        lineName: row.lineName,
        j5Target: row.j5Target,
        j5Actual: row.j5Actual,
        v23Target: row.v23Target,
        v23Actual: row.v23Actual,
        dayProd: row.dayProd,
        dayTarget: row.dayTarget,
      });
      rowIndex += 1;
    });

    rows.push({
      lineName: "Total",
      j5Target: totals.j5Target,
      j5Actual: totals.j5Actual,
      v23Target: totals.v23Target,
      v23Actual: totals.v23Actual,
      dayProd: totals.dayProd,
      dayTarget: totals.dayTarget,
    });
    rowIndex += 1;
  });

  return { rows, merges };
}

function downloadProductionSummaryExcel(
  productionData,
  { from, to, shiftsLabel },
) {
  const dateLabel =
    from === to
      ? formatDateLabel(from)
      : `${formatDateLabel(from)} – ${formatDateLabel(to)}`;

  const headerRows = [
    ["Line Name", dateLabel, "", "", "", "Total Production", ""],
    ["", `Shift ${shiftsLabel}`, "", "", "", "", ""],
  ];

  const { rows, merges: dataMerges } = buildExcelRowsAndMerges(productionData);

  const merges = [
    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } },
    { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } },
    { s: { r: 0, c: 5 }, e: { r: 1, c: 6 } },
    { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } },
    ...dataMerges,
  ];

  generateExcelWithGroupedHeaders(
    EXCEL_COLUMNS,
    rows,
    `Production_Summary_${from}_to_${to}`,
    headerRows,
    merges,
    true,
  );
}

const LineRow = memo(function LineRow({ row, index }) {
  return (
    <tr
      className={`transition-colors duration-100 hover:bg-sky-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
        }`}
    >
      <td className="px-2 py-1.5 text-center text-sm font-semibold text-sky-700 whitespace-nowrap border-r border-slate-200">
        {row.lineName}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-medium text-slate-700 whitespace-nowrap border-r border-slate-200">
        {formatCellValue(row.j5Target)}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-medium text-slate-700 whitespace-nowrap border-r border-slate-200">
        {formatCellValue(row.j5Actual)}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-medium text-slate-700 whitespace-nowrap border-r border-slate-200">
        {formatCellValue(row.v23Target)}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-medium text-slate-700 whitespace-nowrap border-r border-slate-200">
        {formatCellValue(row.v23Actual)}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-bold text-slate-700 whitespace-nowrap border-r border-slate-200">
        {formatCellValue(row.dayProd)}
      </td>
      <td className="px-1 py-1.5 text-center text-sm font-bold text-slate-700 whitespace-nowrap">
        {formatCellValue(row.dayTarget)}
      </td>
    </tr>
  );
});

function DateGroup({ date, lines, totals, defaultExpanded = false }) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <Fragment>
      {/* Clickable date header — always visible, shows day totals inline */}
      <tr
        onClick={() => setIsOpen((o) => !o)}
        className="bg-sky-700 cursor-pointer"
        title={isOpen ? "Click to collapse" : "Click to expand"}
      >
        <td className="px-3 py-1.5 text-sm font-bold text-white text-center border-r border-slate-200">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
            {formatDateLabel(date)}
          </div>
        </td>
        {[
          totals.j5Target,
          totals.j5Actual,
          totals.v23Target,
          totals.v23Actual,
          totals.dayProd,
          totals.dayTarget,
        ].map((val, i) => (
          <td
            key={i}
            className="px-2 py-1.5 text-center text-sm font-bold text-white border-r border-slate-200 last:border-r-0"
          >
            {formatCellValue(val)}
          </td>
        ))}
      </tr>

      {/* Expandable line rows */}
      {isOpen &&
        lines.map((row, index) => (
          <LineRow
            key={row.id ?? `${date}-${row.lineName}-${index}`}
            row={row}
            index={index}
          />
        ))}

      {/* Total row — only shown when expanded */}
      {isOpen && (
        <tr className="bg-sky-800">
          <td className="px-2 py-2 text-center text-sm font-bold whitespace-nowrap text-white border-r border-slate-200">
            Total
          </td>
          {[
            totals.j5Target,
            totals.j5Actual,
            totals.v23Target,
            totals.v23Actual,
            totals.dayProd,
            totals.dayTarget,
          ].map((val, i) => (
            <td
              key={i}
              className="px-2 py-2 text-center text-sm font-bold text-white border-r border-slate-200 last:border-r-0"
            >
              {formatCellValue(val)}
            </td>
          ))}
        </tr>
      )}
    </Fragment>
  );
}

export default function ProductionSummary({
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

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [dateFilter, setDateFilter] = useState({
    startDate: targetDateRange?.start || today,
    endDate: targetDateRange?.end || today,
  });
  const [hasSearched, setHasSearched] = useState(isBg);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [rawRows, setRawRows] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState(
    targetFilters?.shifts?.length > 0 && !targetFilters.shifts.includes("All")
      ? targetFilters.shifts
      : DEFAULT_SHIFTS,
  );
  const [responseMeta, setResponseMeta] = useState({
    from: null,
    to: null,
    shifts: null,
  });
  const requestIdRef = useRef(0);
  const isMountedRef = useRef(true);
  const shiftDebounceRef = useRef(null);
  const selectedShiftsRef = useRef(selectedShifts);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (shiftDebounceRef.current) clearTimeout(shiftDebounceRef.current);
    };
  }, []);

  selectedShiftsRef.current = selectedShifts;

  const productionData = useMemo(() => buildDisplayRows(rawRows), [rawRows]);
  const hasRows = productionData.some((g) => g.lines.length > 0);

  const dateRangeLabel = useMemo(() => {
    const from = responseMeta.from
      ? responseMeta.from.slice(0, 10)
      : dateFilter.startDate;
    const to = responseMeta.to
      ? responseMeta.to.slice(0, 10)
      : dateFilter.endDate;
    return from === to
      ? formatDateLabel(from)
      : `${formatDateLabel(from)} – ${formatDateLabel(to)}`;
  }, [responseMeta, dateFilter]);

  const shiftsLabel = useMemo(() => {
    if (responseMeta.shifts) {
      return responseMeta.shifts
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");
    }
    return selectedShifts.join(", ");
  }, [responseMeta.shifts, selectedShifts]);

  const fetchProduction = useCallback(
    async (startDate, endDate, shifts, { silent = false } = {}) => {
      const myRequestId = ++requestIdRef.current;

      if (silent) {
        setIsRefetching(true);
      } else {
        setIsLoading(true);
      }
      setError("");

      try {
        const data = await productionApi.transactions({
          from: `${startDate}T00:00:00`,
          to: `${endDate}T23:59:59`,
          shifts: shifts.join(","),
        });

        if (!isMountedRef.current || myRequestId !== requestIdRef.current)
          return;

        setRawRows(Array.isArray(data?.rows) ? data.rows : []);
        setResponseMeta({
          from: data?.from ?? null,
          to: data?.to ?? null,
          shifts: typeof data?.shifts === "string" ? data.shifts : null,
        });
      } catch (requestError) {
        if (!isMountedRef.current || myRequestId !== requestIdRef.current)
          return;
        setRawRows([]);
        setError(requestError?.message || "Failed to load production data.");
      } finally {
        if (isMountedRef.current && myRequestId === requestIdRef.current) {
          setIsLoading(false);
          setIsRefetching(false);
        }
      }
    },
    [],
  );

  const handleSearch = useCallback(
    (startDate, endDate) => {
      if (!startDate || !endDate) {
        setError("Please select both start and end dates.");
        return;
      }
      if (startDate > endDate) {
        setError("Start date cannot be greater than end date.");
        return;
      }
      setDateFilter({ startDate, endDate });
      setHasSearched(true);
      fetchProduction(startDate, endDate, selectedShiftsRef.current);
    },
    [fetchProduction],
  );

  const handleShiftChange = useCallback((shift) => {
    setSelectedShifts((current) =>
      current.includes(shift)
        ? current.filter((item) => item !== shift)
        : [...current, shift].sort(),
    );
  }, []);

  useEffect(() => {
    if (!hasSearched) return;
    if (shiftDebounceRef.current) clearTimeout(shiftDebounceRef.current);
    shiftDebounceRef.current = setTimeout(() => {
      fetchProduction(
        dateFilter.startDate,
        dateFilter.endDate,
        selectedShifts,
        { silent: true },
      );
    }, SHIFT_REFETCH_DEBOUNCE_MS);
    return () => clearTimeout(shiftDebounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShifts]);

  const handleDownload = useCallback(async () => {
    if (!hasRows && !isBg) return;
    setIsDownloading(true);
    try {
      const from = responseMeta.from
        ? responseMeta.from.slice(0, 10)
        : dateFilter.startDate;
      const to = responseMeta.to
        ? responseMeta.to.slice(0, 10)
        : dateFilter.endDate;

      downloadProductionSummaryExcel(productionData, { from, to, shiftsLabel });
      await downloadProductionSummaryPDF(productionData, {
        from,
        to,
        shiftsLabel,
      });
    } catch (downloadError) {
      setError(downloadError?.message || "Failed to generate report.");
    } finally {
      setIsDownloading(false);
    }
  }, [hasRows, isBg, productionData, dateFilter, responseMeta, shiftsLabel]);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || isLoading || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, 1200);
    // Removed clearTimeout to prevent race condition canceling export
  }, [isBg, isLoading]);

  return (
    <div className="w-full space-y-4 bg-gray-50 p-4">
      <DateRangeBar
        onSearch={handleSearch}
        onDownload={handleDownload}
        showDownload
        isDownloading={isDownloading}
        selectedStartDate={dateFilter.startDate}
        selectedEndDate={dateFilter.endDate}
        reportName="Production_Summary"
      />

      {!hasSearched ? (
        <SearchPromptState pageName="Production Summary" />
      ) : isLoading ? (
        <TableShimmer rows={8} />
      ) : (
        <>
          <div
            className="rounded-lg border bg-white p-3 shadow-md"
            style={{ borderColor: "#BAE6FD" }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="text-sm font-semibold"
                style={{ color: "#0C4A6E" }}
              >
                Select Shifts:
              </span>
              {DEFAULT_SHIFTS.map((shift) => (
                <label
                  key={shift}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedShifts.includes(shift)}
                    onChange={() => handleShiftChange(shift)}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: "#0284C7" }}
                  />
                  <span className="text-sm text-gray-700">Shift {shift}</span>
                </label>
              ))}

              {isRefetching && (
                <span className="flex items-center gap-1.5 text-xs text-sky-600">
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Updating…
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
              {error}
            </div>
          )}

          {hasRows ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-6 py-3 border-b border-slate-200 bg-slate-50">
                <div className="w-1 h-5 bg-sky-600 rounded-full" />
                <span className="text-sm font-bold text-slate-700 tracking-wide">
                  Production Summary
                </span>
              </div>
              <div
                className={`overflow-x-auto transition-opacity duration-200 ${isRefetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}
              >
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#bae6fd", borderBottom: "1px solid #7dd3fc" }}>
                      <th
                        rowSpan="3"
                        className="px-2 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap border-r border-sky-300 align-middle"
                        style={{ backgroundColor: "#bae6fd", color: "#0c4a6e", verticalAlign: "middle" }}
                      >
                        Line Name
                      </th>
                      <th
                        colSpan="4"
                        className="px-2 py-1 text-center text-sm font-bold uppercase whitespace-nowrap border border-sky-400"
                        style={{ backgroundColor: "#a5d8ff", color: "#0c4a6e" }}
                      >
                        {dateRangeLabel}
                      </th>
                      <th
                        colSpan="2"
                        rowSpan="2"
                        className="px-2 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap border border-sky-400 align-middle"
                        style={{ backgroundColor: "#bae6fd", color: "#0c4a6e", verticalAlign: "middle" }}
                      >
                        Total Production
                      </th>
                    </tr>
                    <tr style={{ backgroundColor: "#bae6fd" }}>
                      <th
                        colSpan="4"
                        className="px-2 py-1 text-center text-sm font-semibold uppercase whitespace-nowrap border border-sky-400"
                        style={{ backgroundColor: "#a5d8ff", color: "#0c4a6e" }}
                      >
                        Shift {shiftsLabel}
                      </th>
                    </tr>
                    <tr style={{ backgroundColor: "#bae6fd", borderBottom: "1px solid #7dd3fc" }}>
                      {SUB_HEADERS.map((label) => (
                        <th
                          key={label}
                          className="px-1 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap border-r border-sky-300 last:border-r-0"
                          style={{
                            backgroundColor: "#bae6fd",
                            color: "#0c4a6e",
                            whiteSpace: "pre-line",
                            lineHeight: "1.2",
                          }}
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {productionData.map(({ date, lines, totals }) => (
                      <DateGroup
                        key={date}
                        date={date}
                        lines={lines}
                        totals={totals}
                        defaultExpanded={productionData.length === 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoDataState />
          )}
        </>
      )}
    </div>
  );
}
