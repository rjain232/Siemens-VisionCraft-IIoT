import { useEffect, useMemo, useState, useRef } from "react";
import { masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import DataTable from "../../../sharedComponents/DataTable";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import { formatClusterName } from "../../../utils/Formatters";
import { generateExcel, generateExcelWithGroupedHeaders } from "../../../utils/ExcelUtils";
import {
  getPdfTableStyles,
  loadKarlaFont,
  loadBrandingLogos,
  drawPdfPageChrome,
  PDF_TABLE_MARGIN,
  drawShiftBadge,
} from "../../../utils/PdfUtils";
import { TableShimmer } from "../../../sharedComponents/Shimmer";

const FEATURE_IDS = [
  "L724FSY0N847",
  "L748HSX0N202",
  "L990KLM1X555",
  "L550QWE9Z111",
  "L301ABX7Y889",
  "L812GHJ2K334",
  "L665MNP4R778",
  "L443TUV8W990",
];

const SPECS = {
  L724FSY0N847: {
    upperSpec: 1.5,
    lowerSpec: 1.0,
    angleNom: 90.0,
    baseNom: 2.33,
  },
  L748HSX0N202: {
    upperSpec: 4.0,
    lowerSpec: 3.5,
    angleNom: 90.0,
    baseNom: 1.22,
  },
  L990KLM1X555: {
    upperSpec: 1.2,
    lowerSpec: 0.8,
    angleNom: 89.0,
    baseNom: 1.88,
  },
  L550QWE9Z111: {
    upperSpec: 5.8,
    lowerSpec: 5.0,
    angleNom: 91.0,
    baseNom: 2.99,
  },
  L301ABX7Y889: {
    upperSpec: 2.5,
    lowerSpec: 1.8,
    angleNom: 90.0,
    baseNom: 3.45,
  },
  L812GHJ2K334: {
    upperSpec: 3.2,
    lowerSpec: 2.6,
    angleNom: 89.5,
    baseNom: 1.75,
  },
  L665MNP4R778: {
    upperSpec: 6.5,
    lowerSpec: 5.8,
    angleNom: 90.5,
    baseNom: 4.12,
  },
  L443TUV8W990: {
    upperSpec: 0.9,
    lowerSpec: 0.5,
    angleNom: 88.0,
    baseNom: 2.01,
  },
};

const GAUGES = ["G1", "G2", "G3", "G4"];
const SHIFTS = ["A", "B", "C"];

function rand(min, max, decimals = 3) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function padZero(n) {
  return String(n).padStart(2, "0");
}

function getDateRangeList() {
  const dates = [];

  const startDate = new Date("2026-06-01");

  const endDate = new Date("2026-06-30");

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    dates.push(
      `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`,
    );
  }

  return dates;
}
function drawInlineMeasurementBadge(doc, cell, actual, target, font) {
  try {
    const numericActual = Number(actual);
    const numericTarget = Number(target);

    if (Number.isNaN(numericActual)) return;

    const diff = Number.isNaN(numericTarget) ? 0 : numericActual - numericTarget;
    const isBelow = diff < 0;
    const mainColor = isBelow ? [220, 38, 38] : [5, 150, 105];
    const midY = cell.y + cell.height / 2;
    const valueText = String(numericActual.toFixed(2));

    doc.setFont(font, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...mainColor);

    if (diff !== 0) {
      const deltaText = `${isBelow ? "-" : "+"}${Math.abs(diff).toFixed(2)}`;
      doc.setFontSize(6);
      const pillW = (() => {
        try {
          return doc.getTextWidth(deltaText);
        } catch {
          return deltaText.length * 1.8;
        }
      })() + 6;
      const pillH = 4.5;
      doc.setFontSize(8);
      const valueW = (() => {
        try {
          return doc.getTextWidth(valueText);
        } catch {
          return valueText.length * 2.2;
        }
      })();
      const contentWidth = Math.max(valueW, pillW);
      const centerX = cell.x + cell.width / 2;
      const valueY = midY - 1;
      const pillY = midY + 0.5;

      doc.text(valueText, centerX, valueY, { align: "center" });

      const pillX = centerX - pillW / 2;
      doc.setFillColor(...(isBelow ? [254, 226, 226] : [209, 250, 229]));
      doc.setDrawColor(...(isBelow ? [252, 165, 165] : [110, 231, 183]));
      doc.setLineWidth(0.2);
      doc.roundedRect(pillX, pillY, pillW, pillH, 1, 1, "FD");
      doc.setFont(font, "bold");
      doc.setFontSize(6);
      doc.setTextColor(...mainColor);
      doc.text(deltaText, pillX + pillW / 2, pillY + pillH * 0.72, {
        align: "center",
      });
    } else {
      doc.text(valueText, cell.x + cell.width / 2, midY + 1.2, {
        align: "center",
      });
    }
  } catch (e) {
    console.warn("[PDF] drawInlineMeasurementBadge:", e.message);
  }
}

function generateMeasurementRows({ masterClusters }) {
  const rows = [];
  let id = 1;

  const juneDates = getDateRangeList();

  masterClusters.forEach((cluster) => {
    const clusterId = String(cluster.ClusterId);
    const areaName = formatClusterName(cluster.ClusterName);

    const lines = cluster.Lines || [];

    lines.forEach((line) => {
      const lineId = String(line.LineId);
      const lineName = line.LineName || "-";

      juneDates.forEach((date) => {
        const count = rand(4, 7, 0);

        for (let i = 0; i < count; i++) {
          const featureId =
            FEATURE_IDS[Math.floor(Math.random() * FEATURE_IDS.length)];

          const spec = SPECS[featureId];

          const mid = (spec.upperSpec + spec.lowerSpec) / 2;
          const range = (spec.upperSpec - spec.lowerSpec) * 0.55;

          const hour = rand(6, 21, 0);
          const minute = rand(0, 59, 0);
          const second = rand(0, 59, 0);

          rows.push({
            id: id,
            timestamp: `${date} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`,
            BIWNo: 5005472 + id,
            feature_id: featureId,
            gauge: GAUGES[Math.floor(Math.random() * GAUGES.length)],
            shift: SHIFTS[Math.floor(Math.random() * SHIFTS.length)],

            clusterId,
            lineId,

            Area: areaName,
            Line: lineName,

            angleActual: rand(spec.angleNom - 1.5, spec.angleNom + 1.5, 2),
            angleTarget: spec.angleNom,

            dimensionActual: rand(mid - range, mid + range),
            dimensionTarget: mid,

            baseActual: rand(spec.baseNom - 0.08, spec.baseNom + 0.08),
            baseTarget: spec.baseNom,

            upperSpecActual: spec.upperSpec,
            upperSpecTarget: spec.upperSpec,

            lowerSpecActual: spec.lowerSpec,
            lowerSpecTarget: spec.lowerSpec,
          });

          id++;
        }
      });
    });
  });

  return rows.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export default function InlineMeasurementSystem({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const today = new Date().toISOString().split("T")[0];
  const [masterClusters, setMasterClusters] = useState([]);
  const [filters, setFilters] = useState({ area: "", line: "" });
  const [dateRange, setDateRange] = useState({ from: today, to: today });
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        const firstCluster = clusters[0];
        if (firstCluster) {
          let firstClusterId = String(firstCluster.ClusterId);
          if (targetFilters?.areaId || targetFilters?.area) {
            const matchArea = clusters.find(
              (c) =>
                String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
            );
            if (matchArea) firstClusterId = String(matchArea.ClusterId);
          }
          const clusterObj = clusters.find((c) => String(c.ClusterId) === firstClusterId) || firstCluster;
          const firstLine = clusterObj.Lines?.[0];
          let firstLineId = firstLine ? String(firstLine.LineId) : "";
          if (targetFilters?.lineId || targetFilters?.line) {
            const matchLine = (clusterObj.Lines || []).find(
              (l) =>
                String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
            );
            if (matchLine) firstLineId = String(matchLine.LineId);
          }

          setFilters((prev) => ({
            ...prev,
            area: firstClusterId,
            line: firstLineId,
          }));
        }
      } catch (err) {
        console.error("Master data failed:", err);
      }
    };

    loadMasterData();
  }, [targetFilters]);

  const areaOptions = useMemo(
    () =>
      masterClusters.map((cluster) => ({
        value: String(cluster.ClusterId),
        label: formatClusterName(cluster.ClusterName),
      })),
    [masterClusters],
  );

  const selectedCluster = useMemo(
    () =>
      masterClusters.find(
        (cluster) => String(cluster.ClusterId) === filters.area,
      ) ?? null,
    [filters.area, masterClusters],
  );

  const lineOptions = useMemo(() => {
    const lines = selectedCluster?.Lines ?? [];
    return lines.map((line) => ({
      value: String(line.LineId),
      label: line.LineName,
    }));
  }, [selectedCluster]);

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
    ],
    [areaOptions, lineOptions],
  );

  function handleFilterChange(newFilters) {
    const updatedFilters = { ...filters, ...newFilters };

    if (newFilters.area !== undefined && newFilters.area !== filters.area) {
      const selectedAreaCluster = masterClusters.find(
        (cluster) => String(cluster.ClusterId) === updatedFilters.area,
      );
      const firstLine = selectedAreaCluster?.Lines?.[0];
      updatedFilters.line = firstLine ? String(firstLine.LineId) : "";
    }

    setFilters(updatedFilters);
  }

  function filterMeasurementRows(rows, filters, dateRange) {
    const from = dateRange?.from ? new Date(dateRange.from) : null;
    const to = dateRange?.to ? new Date(dateRange.to) : null;

    // Include the entire "to" day
    if (to) {
      to.setHours(23, 59, 59, 999);
    }

    return rows.filter((row) => {
      const rowDate = new Date(row.timestamp.replace(" ", "T"));

      const areaMatch = !filters.area || row.clusterId === String(filters.area);

      const lineMatch = !filters.line || row.lineId === String(filters.line);

      const shiftMatch = !filters.shift || row.shift === filters.shift;

      const featureMatch =
        !filters.feature || row.feature_id === filters.feature;

      const dateMatch = (!from || rowDate >= from) && (!to || rowDate <= to);

      return areaMatch && lineMatch && shiftMatch && featureMatch && dateMatch;
    });
  }

  const allRows = useMemo(
    () =>
      generateMeasurementRows({
        masterClusters,
      }),
    [masterClusters],
  );

  const filteredRows = useMemo(
    () => filterMeasurementRows(allRows, filters, dateRange),
    [allRows, filters, dateRange],
  );

  const columns = useMemo(() => {
    const ActualCell = (actual, target) => {
      const diff = actual - target;
      const isBelow = diff < 0;
      return (
        <div className="flex items-center justify-center gap-1.5">
          <span
            className={`font-bold text-sm ${isBelow ? "text-red-600" : "text-green-600"
              }`}
          >
            {actual}
          </span>
          {diff !== 0 && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-bold rounded px-1.5 py-px border ${isBelow
                  ? "text-red-600 bg-red-100 border-red-300"
                  : "text-green-600 bg-green-100 border-green-300"
                }`}
            >
              {isBelow ? "▼" : "▲"}
              {Math.abs(diff).toFixed(2)}
            </span>
          )}
        </div>
      );
    };

    const TargetCell = (val) => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-sm text-gray-700">{val}</span>
      </div>
    );
    return [
      { key: "sr", label: "Sr. No.", sortable: false },
      { key: "timestamp", label: "Timestamp", type: "mono", sortable: true },
      { key: "BIWNo", label: "BIW No", sortable: true },
      { key: "feature_id", label: "Feature ID", sortable: true },
      { key: "gauge", label: "Gauge", sortable: true },
      { key: "shift", label: "Shift", type: "shift", sortable: true },
      { key: "Area", label: "Area", sortable: true },
      { key: "Line", label: "Line", sortable: true },
      {
        key: "angleActual",
        label: "Actual",
        group: "Angle",
        type: "actual",
        targetKey: "angleTarget",
        sortable: true,
        render: (row) =>
          ActualCell(
            Number(row.angleActual).toFixed(2),
            Number(row.angleTarget).toFixed(2),
          ),
      },
      {
        key: "angleTarget",
        label: "Target",
        group: "Angle",
        sortable: true,
        render: (row) => TargetCell(Number(row.angleTarget).toFixed(2)),
      },
      {
        key: "dimensionActual",
        label: "Actual",
        group: "Dimension",
        type: "actual",
        targetKey: "dimensionTarget",
        sortable: true,
        render: (row) =>
          ActualCell(
            Number(row.dimensionActual).toFixed(2),
            Number(row.dimensionTarget).toFixed(2),
          ),
      },
      {
        key: "dimensionTarget",
        label: "Target",
        group: "Dimension",
        sortable: true,
        render: (row) => TargetCell(Number(row.dimensionTarget).toFixed(2)),
      },
      {
        key: "baseActual",
        label: "Actual",
        group: "Base",
        type: "actual",
        targetKey: "baseTarget",
        sortable: true,
        render: (row) =>
          ActualCell(
            Number(row.baseActual).toFixed(2),
            Number(row.baseTarget).toFixed(2),
          ),
      },
      {
        key: "baseTarget",
        label: "Target",
        group: "Base",
        sortable: true,
        render: (row) => TargetCell(Number(row.baseTarget).toFixed(2)),
      },
      {
        key: "upperSpecActual",
        label: "Actual",
        group: "Upper Spec",
        type: "actual",
        targetKey: "upperSpecTarget",
        sortable: true,
        render: (row) =>
          ActualCell(
            Number(row.upperSpecActual).toFixed(2),
            Number(row.upperSpecTarget).toFixed(2),
          ),
      },
      {
        key: "upperSpecTarget",
        label: "Target",
        group: "Upper Spec",
        sortable: true,
        render: (row) => TargetCell(Number(row.upperSpecTarget).toFixed(2)),
      },
      {
        key: "lowerSpecActual",
        label: "Actual",
        group: "Lower Spec",
        type: "actual",
        targetKey: "lowerSpecTarget",
        sortable: true,
        render: (row) =>
          ActualCell(
            Number(row.lowerSpecActual).toFixed(2),
            Number(row.lowerSpecTarget).toFixed(2),
          ),
      },
      {
        key: "lowerSpecTarget",
        label: "Target",
        group: "Lower Spec",
        sortable: true,
        render: (row) => TargetCell(Number(row.lowerSpecTarget).toFixed(2)),
      },
    ];
  }, []);

  const excelHeaders = useMemo(
    () =>
      columns.map((col) => ({
        label: col.label,
        accessor: col.key,
      })),
    [columns],
  );

  const excelHeaderRows = useMemo(
    () => [
      [
        "Sr No",
        "Timestamp",
        "BIW No",
        "Feature ID",
        "Gauge",
        "Shift",
        "Area",
        "Line",
        "TYPE",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "ANGLE",
        "",
        "DIMENSION",
        "",
        "BASE",
        "",
        "UPPER SPEC",
        "",
        "LOWER SPEC",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Actual",
        "Target",
        "Actual",
        "Target",
        "Actual",
        "Target",
        "Actual",
        "Target",
        "Actual",
        "Target",
      ],
    ],
    [],
  );

  const excelHeaderMerges = useMemo(
    () => [
      { s: { r: 0, c: 8 }, e: { r: 0, c: 17 } },
      { s: { r: 1, c: 8 }, e: { r: 1, c: 9 } },
      { s: { r: 1, c: 10 }, e: { r: 1, c: 11 } },
      { s: { r: 1, c: 12 }, e: { r: 1, c: 13 } },
      { s: { r: 1, c: 14 }, e: { r: 1, c: 15 } },
      { s: { r: 1, c: 16 }, e: { r: 1, c: 17 } },
      ...Array.from({ length: 8 }, (_, i) => ({ s: { r: 0, c: i }, e: { r: 2, c: i } })),
    ],
    [],
  );

  const exportFileBase = `Inline_Measurement_System_${dateRange.from}_to_${dateRange.to}`;

  function downloadExcelFile() {
    generateExcelWithGroupedHeaders(
      excelHeaders,
      filteredRows,
      exportFileBase,
      excelHeaderRows,
      excelHeaderMerges,
      false,
    );
  }

  async function downloadPdfFile() {
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const fontFamily = await loadKarlaFont(doc);
    const [jswImg, schaefflerImg] = await loadBrandingLogos();

    const areaLabel =
      areaOptions.find((o) => o.value === filters.area)?.label || "All";
    const lineLabel =
      lineOptions.find((o) => o.value === filters.line)?.label || "All";

    const subLines = [
      `Date Range: ${dateRange.from} to ${dateRange.to}`,
      `Area: ${areaLabel} | Line: ${lineLabel}`,
    ];

    const ACTUAL_TARGET_PAIRS = [
      ["angleActual", "angleTarget"],
      ["dimensionActual", "dimensionTarget"],
      ["baseActual", "baseTarget"],
      ["upperSpecActual", "upperSpecTarget"],
      ["lowerSpecActual", "lowerSpecTarget"],
    ];

    const pdfColumns = [
      { header: "Sr No", dataKey: "sr" },
      { header: "Timestamp", dataKey: "timestamp" },
      { header: "BIW No", dataKey: "BIWNo" },
      { header: "Feature ID", dataKey: "feature_id" },
      { header: "Gauge", dataKey: "gauge" },
      { header: "Shift", dataKey: "shift" },
      { header: "Area", dataKey: "Area" },
      { header: "Line", dataKey: "Line" },
      ...ACTUAL_TARGET_PAIRS.flatMap(([actualKey, targetKey]) => [
        { header: "Actual", dataKey: actualKey },
        { header: "Target", dataKey: targetKey },
      ]),
    ];

const staticCols = [
  "SR. NO.",
  "TIMESTAMP",
  "BIW NO",
  "FEATURE ID",
  "GAUGE",
  "SHIFT",
  "AREA",
  "LINE",
];

    const head = [
      [
        ...staticCols.map((label) => ({
          content: label,
          rowSpan: 3,
          styles: { valign: "middle", halign: "center" },
        })),
        {
          content: "TYPE",
          colSpan: 10,
          styles: { halign: "center", fillColor: [125, 211, 252] },
        },
      ],
      [
        {
          content: "ANGLE",
          colSpan: 2,
          styles: { halign: "center", fillColor: [165, 216, 255] },
        },
        {
          content: "DIMENSION",
          colSpan: 2,
          styles: { halign: "center", fillColor: [165, 216, 255] },
        },
        {
          content: "BASE",
          colSpan: 2,
          styles: { halign: "center", fillColor: [165, 216, 255] },
        },
        {
          content: "UPPER SPEC",
          colSpan: 2,
          styles: { halign: "center", fillColor: [165, 216, 255] },
        },
        {
          content: "LOWER SPEC",
          colSpan: 2,
          styles: { halign: "center", fillColor: [165, 216, 255] },
        },
      ],
      [
        "ACTUAL",
        "TARGET",
        "ACTUAL",
        "TARGET",
        "ACTUAL",
        "TARGET",
        "ACTUAL",
        "TARGET",
        "ACTUAL",
        "TARGET",
      ], 
    ];

    const body = filteredRows.map((row, rowIndex) => {
      const entry = {
        sr: rowIndex + 1,
        timestamp: row.timestamp,
        BIWNo: row.BIWNo,
        feature_id: row.feature_id,
        gauge: row.gauge,
        shift: row.shift,
        Area: row.Area,
        Line: row.Line,
      };

      ACTUAL_TARGET_PAIRS.forEach(([actualKey, targetKey]) => {
        const actual = Number(row[actualKey]);
        const target = Number(row[targetKey]);
        const diff = actual - target;

        entry[actualKey] = actual;
        entry[`${actualKey}__sign`] =
          diff === 0 ? null : diff > 0 ? "up" : "down";

        entry[targetKey] = target.toFixed(2);
      });

      return entry;
    });

    const actualKeys = new Set(
      ACTUAL_TARGET_PAIRS.map(([actualKey]) => actualKey),
    );
    const actualTargetMap = new Map(ACTUAL_TARGET_PAIRS);
    const baseStyles = getPdfTableStyles(fontFamily);

    autoTable(doc, {
      didParseCell: (data) => {
        if (data.section !== "body") return;
        const key = data.column.dataKey;
        if (key === "shift" || actualKeys.has(key)) {
          data.cell.text = [" "];
        }
      },
      head,
      body,
      columns: pdfColumns,
      startY: 60,
      margin: PDF_TABLE_MARGIN,
      theme: "grid",
      styles: { ...baseStyles.styles, font: fontFamily },
      headStyles: {
        ...baseStyles.headStyles,
        font: fontFamily,
        fillColor: [186, 230, 253],
        textColor: [12, 74, 110],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: baseStyles.alternateRowStyles,
      columnStyles: {
        sr: { halign: "center" },
        timestamp: { halign: "left" },
        BIWNo: { halign: "center" },
        feature_id: { halign: "left" },
      },
      didDrawCell: (data) => {
        if (data.section !== "body") return;
        const key = data.column.dataKey;
        if (key === "shift") {
          drawShiftBadge(doc, data.cell, String(data.row.raw.shift), fontFamily);
          return;
        }
        if (!actualKeys.has(key)) return;

        const targetKey = actualTargetMap.get(key);
        const actual = Number(data.row.raw[key]).toFixed(2);
        const target = targetKey ? Number(data.row.raw[targetKey]).toFixed(2) : NaN;

        drawInlineMeasurementBadge(doc, data.cell, actual, target, fontFamily);
      },
    });

    // Stamp header/footer chrome on every page now that total page count is known.
    const totalPages = doc.internal.getNumberOfPages();
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      doc.setPage(pageNum);
      drawPdfPageChrome(doc, {
        pageNum,
        totalPages,
        fontFamily,
        title: "Inline Measurement System Report",
        subLines,
        jswImg,
        schaefflerImg,
      });
    }

    doc.save(`${exportFileBase}.pdf`);
  }
  async function handleDownload() {
    setIsDownloading(true);
    try {
      downloadExcelFile();
      await downloadPdfFile();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  function handleDateRangeChange(startDate, endDate) {
    setIsLoading(true);
    setDateRange({ from: startDate, to: endDate });
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 600);
  }

  // Sync date range in background mode & trigger search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateRange({ from: s, to: e });
      setHasSearched(true);
    }
  }, [isBg, targetDateRange]);

  // Auto trigger download in background mode
  const bgTriggeredRef = useRef(false);
  useEffect(() => {
    if (isBg && hasSearched && !isLoading && !bgTriggeredRef.current) {
      bgTriggeredRef.current = true;
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
    // Removed clearTimeout to prevent race condition canceling export
    }
  }, [isBg, hasSearched, isLoading]);

  return (
    <div className="p-2 space-y-4">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        withContainer={true}
        selectedStartDate={dateRange.from}
        selectedEndDate={dateRange.to}
        onSearch={handleDateRangeChange}
        onDownload={handleDownload}
        showDownload={true}
        reportName="Inline_Measurement_System"
        isDownloading={isDownloading}
      />
      {isLoading ? (
        <TableShimmer columns={columns} rowCount={10} />
      ) : !hasSearched ? (
        <EmptyState
          title="Select filters and click Search to view  Inline Measurement data"
          color="sky"
        />
      ) : filteredRows?.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredRows}
          defaultRows={10}
          title="Inline Measurement Records"
          topGroupLabel="Type"
          columnGroups={[
            { label: "Angle", span: 2, headerBg: "#a5d8ff" },
            { label: "Dimension", span: 2, headerBg: "#a5d8ff" },
            { label: "Base", span: 2, headerBg: "#a5d8ff" },
            { label: "Upper Spec", span: 2, headerBg: "#a5d8ff" },
            { label: "Lower Spec", span: 2, headerBg: "#a5d8ff" },
          ]}
        />
      ) : (
       <NoDataState/>
      )}
    </div>
  );
}