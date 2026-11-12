import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import DataTable from "../../../sharedComponents/DataTable";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import { formatClusterName, formatStationName } from "../../../utils/Formatters";
import { generateExcel } from "../../../utils/ExcelUtils";
import {
  drawPdfPageChrome,
  drawShiftBadge,
  getPdfTableStyles,
  loadBrandingLogos,
  loadKarlaFont,
} from "../../../utils/PdfUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function drawActualBadgeRounded(doc, cell, rawActual, rawTarget, font) {
  try {
    if (rawActual === undefined || rawActual === null || isNaN(rawActual)) return;
    const actual = Number(Number(rawActual).toFixed(1));
    const target = rawTarget !== undefined && rawTarget !== null ? Number(Number(rawTarget).toFixed(1)) : NaN;
    const below = !isNaN(target) && actual < target;
    const delta = !isNaN(target) ? Number(Math.abs(actual - target).toFixed(1)) : 0;
    const mainColor = below ? [220, 38, 38] : [5, 150, 105];
    const midY = cell.y + cell.height / 2;

    doc.setFont(font, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...mainColor);

    if (delta > 0) {
      const numText = actual.toFixed(1);
      const deltaText = (below ? "-" : "+") + delta.toFixed(1);
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
      doc.setFontSize(8);
      const numW = (() => {
        try {
          return doc.getTextWidth(numText);
        } catch (_) {
          return numText.length * 2.2;
        }
      })();
      const gap = 1.5;
      const startX = cell.x + (cell.width - numW - gap - pillW) / 2;
      doc.text(numText, startX + numW / 2, midY + 1.2, { align: "center" });
      const pillX = startX + numW + gap;
      const pillY = midY - pillH / 2;
      doc.setFillColor(...(below ? [254, 226, 226] : [209, 250, 229]));
      doc.setDrawColor(...(below ? [252, 165, 165] : [110, 231, 183]));
      doc.setLineWidth(0.2);
      doc.roundedRect(pillX, pillY, pillW, pillH, 0.8, 0.8, "FD");
      doc.setFont(font, "bold");
      doc.setFontSize(6);
      doc.setTextColor(...mainColor);
      doc.text(deltaText, pillX + pillW / 2, pillY + pillH * 0.72, { align: "center" });
    } else {
      doc.text(actual.toFixed(1), cell.x + cell.width / 2, midY + 1.2, { align: "center" });
    }
  } catch (e) {
    console.warn("[PDF] drawActualBadgeRounded:", e.message);
  }
}

function buildRoundedAutoTableConfig(columns, data, doc, font) {
  const head = [columns.map((col) => col.label.toUpperCase())];
  const body = data.map((item) =>
    columns.map((col) => {
      if (col.pdfValue) return col.pdfValue(item);
      return item[col.key] ?? "";
    }),
  );

  const shiftCols = new Set();
  const actualCols = new Set();
  const primaryCols = new Set();

  columns.forEach((col, i) => {
    if (col.type === "shift") shiftCols.add(i);
    if (col.type === "actual") actualCols.add(i);
    if (col.type === "primary") primaryCols.add(i);
  });

  const didParseCell = (hookData) => {
    if (hookData.section !== "body") return;
    const col = hookData.column.index;
    if (primaryCols.has(col)) {
      hookData.cell.styles.textColor = [3, 105, 161];
      hookData.cell.styles.fontStyle = "bold";
    }
    if (shiftCols.has(col) || actualCols.has(col)) {
      hookData.cell.text = [" "];
    }
  };

  const didDrawCell = (hookData) => {
    if (hookData.section !== "body") return;
    const col = hookData.column.index;
    const cell = hookData.cell;
    const colDef = columns[col];
    const rowItem = data[hookData.row.index];

    if (shiftCols.has(col)) {
      drawShiftBadge(doc, cell, String(hookData.row.raw[col]), font);
    }
    if (actualCols.has(col) && rowItem) {
      const target = colDef.targetKey ? Number(rowItem[colDef.targetKey]) : undefined;
      drawActualBadgeRounded(doc, cell, Number(rowItem[colDef.key]), target, font);
    }
  };

  return {
    head,
    body,
    ...getPdfTableStyles(font),
    didParseCell,
    didDrawCell,
  };
}
const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_OPTIONS = [
  { value: "All", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];

const RESULT_OPTIONS = [
  { value: "OK", label: "OK" },
  { value: "NOK", label: "NOK" },
];

export default function MIGWeldingReport({
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
  const [dateRange, setDateRange] = useState({ from: today, to: today });
  const [masterClusters, setMasterClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    area: "",
    line: "",
    station: "",
    shifts: ["A"],
    result: RESULT_OPTIONS[0].value,
  });
  const [appliedBIW, setAppliedBIW] = useState("");
  const [biwSearch, setBiwSearch] = useState("");

  useEffect(() => {
    const loadMasterData = async () => {
      setIsLoading(true);
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
          const firstLine = (clusterObj.Lines ?? [])[0];
          let firstLineId = firstLine ? String(firstLine.LineId) : "";
          if (targetFilters?.lineId || targetFilters?.line) {
            const matchLine = (clusterObj.Lines ?? []).find(
              (l) =>
                String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
            );
            if (matchLine) firstLineId = String(matchLine.LineId);
          }

          const lineObj = (clusterObj.Lines ?? []).find((l) => String(l.LineId) === firstLineId) || firstLine;
          const firstStation = (lineObj?.Stations ?? [])[0];
          let firstStationId = firstStation ? String(firstStation.StationId) : "";
          if (targetFilters?.stationId || targetFilters?.station) {
            const matchStation = (lineObj?.Stations ?? []).find(
              (s) =>
                String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase(),
            );
            if (matchStation) firstStationId = String(matchStation.StationId);
          }

          let shifts = ["A"];
          if (targetFilters?.shifts) {
            shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
          } else if (targetFilters?.shift) {
            shifts = [targetFilters.shift];
          }

          setFilters((prev) => ({
            ...prev,
            area: firstClusterId,
            line: firstLineId,
            station: firstStationId,
            shifts,
            ...(targetFilters?.result ? { result: targetFilters.result } : {}),
          }));
        }
      } catch (err) {
        console.error("Master data failed:", err);
      } finally {
        setIsLoading(false);
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
    () => masterClusters.find((c) => String(c.ClusterId) === filters.area) ?? null,
    [filters.area, masterClusters],
  );

  const lineOptions = useMemo(() => {
    const lines = selectedCluster?.Lines ?? [];
    return lines.map((line) => ({ value: String(line.LineId), label: line.LineName }));
  }, [selectedCluster]);

  const selectedLineObj = useMemo(() => {
    const lines = selectedCluster?.Lines ?? [];
    return lines.find((line) => String(line.LineId) === filters.line) ?? null;
  }, [filters.line, selectedCluster]);

  const stationOptions = useMemo(() => {
    const stations = selectedLineObj?.Stations ?? [];
    return stations.map((s) => ({ value: String(s.StationId), label: s.StationName }));
  }, [selectedLineObj]);

  const selectedAreaLabel = useMemo(
    () => areaOptions.find((o) => o.value === filters.area)?.label ?? "",
    [areaOptions, filters.area],
  );
  const selectedLineLabel = useMemo(
    () => lineOptions.find((o) => o.value === filters.line)?.label ?? "",
    [lineOptions, filters.line],
  );
  const selectedStationLabel = useMemo(
    () => stationOptions.find((o) => o.value === filters.station)?.label ?? "",
    [stationOptions, filters.station],
  );

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
      { type: "select", key: "station", label: "Station", options: stationOptions },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
      { type: "select", key: "result", label: "Result", options: RESULT_OPTIONS },
    ],
    [areaOptions, lineOptions, stationOptions],
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      const areaChanged = newFilters.area !== filters.area;
      const selCluster = areaChanged
        ? masterClusters.find((c) => String(c.ClusterId) === newFilters.area)
        : selectedCluster;

      if (areaChanged) {
        const firstLine = (selCluster?.Lines ?? [])[0];
        newFilters.line = firstLine ? String(firstLine.LineId) : "";
      }

      if (newFilters.line !== filters.line) {
        const lines = selCluster?.Lines ?? [];
        const lineObj = lines.find((line) => String(line.LineId) === newFilters.line);
        const firstStation = (lineObj?.Stations ?? [])[0];
        newFilters.station = firstStation ? String(firstStation.StationId) : "";
      }

      if (newFilters.shifts !== undefined) {
        const prevShifts = filters.shifts;
        let nextShifts = newFilters.shifts;

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

        newFilters.shifts = nextShifts;
      }

      setFilters(newFilters);
    },
    [filters.area, filters.line, filters.shifts, masterClusters, selectedCluster],
  );
  function handleDateChange(newDateRange) {
    setHasSearched(true);
    setIsLoading(true);
    setDateRange(newDateRange);
    setTimeout(() => setIsLoading(false), 500);
  }

  const masterPaths = useMemo(() => {
    const paths = [];
    masterClusters.forEach((cluster) => {
      (cluster.Lines ?? []).forEach((line) => {
        (line.Stations ?? []).forEach((station) => {
          paths.push({
            ClusterId: cluster.ClusterId,
            ClusterName: cluster.ClusterName,
            LineId: line.LineId,
            LineName: line.LineName,
            StationId: station.StationId,
            StationName: station.StationName,
          });
        });
      });
    });
    return paths;
  }, [masterClusters]);

  const generateDummyData = (paths) => {
    if (!paths || paths.length === 0) return [];

    const data = [];
    const shiftsData = ["A", "B", "C"];

    const generateDates = () => {
      const dates = [];
      for (let day = 6; day <= 30; day++) {
        dates.push(`2026-06-${day.toString().padStart(2, "0")}`);
      }
      for (let day = 1; day <= 3; day++) {
        dates.push(`2026-07-${day.toString().padStart(2, "0")}`);
      }
      return dates;
    };

    const dates = generateDates();
    let biwCounter = 5033272;

    for (let i = 0; i < 400; i++) {
      const path = paths[Math.floor(Math.random() * paths.length)];
      const shift = shiftsData[Math.floor(Math.random() * shiftsData.length)];
      const date = dates[Math.floor(Math.random() * dates.length)];
      const hour =
        shift === "A" ? Math.floor(Math.random() * 8) + 6 :
          shift === "B" ? Math.floor(Math.random() * 8) + 14 :
            Math.floor(Math.random() * 8) + 22;
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;

      const biwNo = biwCounter++;
      const weldNo = `MIG${date.replace(/-/g, "")}${(i % 1000).toString().padStart(3, "0")}`;
      const result = Math.random() < 0.92 ? "OK" : "NOK";

      const voltageTarget = 24;
      const currentTarget = 180;
      const feedTarget = 8;
      let voltageActual, currentActual, feedActual;

      if (result === "OK") {
        voltageActual = parseFloat((voltageTarget - Math.random() * 2).toFixed(1));
        currentActual = parseFloat((currentTarget - Math.random() * 20).toFixed(1));
        feedActual = parseFloat((feedTarget - Math.random() * 1).toFixed(1));
      } else {
        voltageActual = parseFloat((voltageTarget + (Math.random() * 4 - 2)).toFixed(1));
        currentActual = parseFloat((currentTarget + (Math.random() * 40 - 20)).toFixed(1));
        feedActual = parseFloat((feedTarget + (Math.random() * 2 - 1)).toFixed(1));

        const faultParam = Math.floor(Math.random() * 3);
        if (faultParam === 0) {
          voltageActual = parseFloat((voltageTarget + Math.random() * 3 + 1).toFixed(1));
        } else if (faultParam === 1) {
          currentActual = parseFloat((currentTarget + Math.random() * 30 + 5).toFixed(1));
        } else {
          feedActual = parseFloat((feedTarget + Math.random() * 2 + 0.5).toFixed(1));
        }
      }

      data.push({
        srno: i,
        ProtRecordID: biwNo,
        WeldNo: weldNo,
        Date: date,
        Time: time,
        ShiftName: shift,
        ClusterId: path.ClusterId,
        LineId: path.LineId,
        StationId: path.StationId,
        Area: formatClusterName(path.ClusterName),
        LineName: path.LineName,
        StationName: path.StationName,
        Result: result,
        VoltageActual: voltageActual,
        VoltageTarget: voltageTarget,
        CurrentActual: currentActual,
        CurrentTarget: currentTarget,
        FeedActual: feedActual,
        FeedTarget: feedTarget,
      });
    }

    return data.sort((a, b) =>
      a.Date === b.Date ? a.Time.localeCompare(b.Time) : a.Date.localeCompare(b.Date),
    );
  };

  const dummyData = useMemo(() => generateDummyData(masterPaths), [masterPaths]);

  const filteredData = useMemo(() => {
    let filtered = [...dummyData];

    if (filters.area) filtered = filtered.filter((item) => String(item.ClusterId) === filters.area);
    if (filters.line) filtered = filtered.filter((item) => String(item.LineId) === filters.line);
    if (filters.station) filtered = filtered.filter((item) => String(item.StationId) === filters.station);
    if (filters.shifts && !filters.shifts.includes("All")) {
      filtered = filtered.filter((item) => filters.shifts.includes(item.ShiftName));
    }
    if (filters.result) filtered = filtered.filter((item) => item.Result === filters.result);

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((item) => item.Date >= dateRange.from && item.Date <= dateRange.to);
    }
    if (appliedBIW.trim()) {
      filtered = filtered.filter((item) => String(item.ProtRecordID).includes(appliedBIW.trim()));
    }

    return filtered.map((item, idx) => ({ ...item, srno: idx + 1 }));
  }, [dummyData, filters, dateRange, appliedBIW]);

  const okCount = filteredData.filter((r) => r.Result === "OK").length;
  const nokCount = filteredData.filter((r) => r.Result === "NOK").length;

  function renderActualCell(actual, target) {
    const below = target !== undefined && actual < target;
    const delta = target !== undefined ? Number(Math.abs(actual - target).toFixed(1)) : 0;
    return (
      <div className="flex items-center justify-center gap-2">
        <span className={`text-sm font-bold tabular-nums ${below ? "text-red-600" : "text-emerald-600"}`}>
          {Number(actual).toFixed(1)}
        </span>
        {delta > 0 && (
          <span
            className={`inline-flex items-center text-[11px] font-semibold rounded px-1.5 py-0.5 border ${below
              ? "text-red-500 bg-red-50 border-red-100"
              : "text-emerald-600 bg-emerald-50 border-emerald-100"
              }`}
          >
            {below ? "▼" : "▲"}
            {delta.toFixed(1)}
          </span>
        )}
      </div>
    );
  }

  function ResultBadge({ value }) {
    const isOk = value === "OK";
    return (
      <span
        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-[11px] sm:text-xs border whitespace-nowrap ${isOk
          ? "bg-green-100 text-green-800 border-green-300"
          : "bg-red-100 text-red-800 border-red-300"
          }`}
      >
        {value}
      </span>
    );
  }

  const tableColumns = useMemo(
    () => [
      {
        key: "srno",
        label: "Sr. No.",
        sortable: false,
        render: (row) => (
          <span className="text-sm font-medium text-slate-500 tabular-nums">{row.srno}</span>
        ),
      },
      {
        key: "Date",
        label: "Date",
        sortable: true,
        render: (row) => (
          <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{row.Date}</span>
        ),
      },
      {
        key: "Time",
        label: "Time",
        sortable: true,
        render: (row) => (
          <span className="text-sm font-medium text-slate-500 whitespace-nowrap tabular-nums">{row.Time}</span>
        ),
      },
      { key: "ShiftName", label: "Shift", type: "shift", sortable: true },
      { key: "LineName", label: "Line", sortable: true },
      { key: "StationName", label: "Station", sortable: true, render: (row) => formatStationName(row.StationName) },
      { key: "ProtRecordID", label: "BIW No.", type: "primary", sortable: true },
      { key: "WeldNo", label: "Weld No.", sortable: true },
      {
        key: "VoltageActual",
        label: "Actual",
        sortable: true,
        group: true,
        render: (row) => renderActualCell(row.VoltageActual, row.VoltageTarget),
      },
      { key: "VoltageTarget", label: "Target", sortable: false, group: true },
      {
        key: "CurrentActual",
        label: "Actual",
        sortable: true,
        group: true,
        render: (row) => renderActualCell(row.CurrentActual, row.CurrentTarget),
      },
      { key: "CurrentTarget", label: "Target", sortable: false, group: true },
      {
        key: "FeedActual",
        label: "Actual",
        sortable: true,
        group: true,
        render: (row) => renderActualCell(row.FeedActual, row.FeedTarget),
      },
      { key: "FeedTarget", label: "Target", sortable: false, group: true },
      {
        key: "Result",
        label: "Result",
        sortable: false,
        render: (row) => <ResultBadge value={row.Result} />,
      },
    ],
    [],
  );

  const columnGroups = [
    { label: "Voltage (V)", span: 2 },
    { label: "Current (A)", span: 2 },
    { label: "Feed Rate (mm)", span: 2 },
  ];

  const excelHeaders = useMemo(
    () => [
      { label: "Sr No.", accessor: "srno" },
      { label: "Date", accessor: "Date" },
      { label: "Time", accessor: "Time" },
      { label: "Shift", accessor: "ShiftName" },
      { label: "Area", accessor: "Area" },
      { label: "Line", accessor: "LineName" },
      { label: "Station", accessor: "StationName" },
      { label: "BIW No.", accessor: "ProtRecordID" },
      { label: "Weld No.", accessor: "WeldNo" },
      { label: "Voltage Actual (V)", accessor: "VoltageActual" },
      { label: "Voltage Target (V)", accessor: "VoltageTarget" },
      { label: "Current Actual (A)", accessor: "CurrentActual" },
      { label: "Current Target (A)", accessor: "CurrentTarget" },
      { label: "Feed Actual (mm)", accessor: "FeedActual" },
      { label: "Feed Target (mm)", accessor: "FeedTarget" },
      { label: "Result", accessor: "Result" },
    ],
    [],
  );

  const pdfColumns = useMemo(
    () => [
      { key: "srno", label: "Sr. No." },
      { key: "Date", label: "Date" },
      { key: "Time", label: "Time" },
      { key: "ShiftName", label: "Shift", type: "shift" },
      { key: "LineName", label: "Line" },
      { key: "StationName", label: "Station", pdfValue: (item) => formatStationName(item.StationName) },
      { key: "ProtRecordID", label: "BIW No.", type: "primary" },
      { key: "WeldNo", label: "Weld No." },
      { key: "VoltageActual", label: "Voltage Actual", type: "actual", targetKey: "VoltageTarget" },
      { key: "VoltageTarget", label: "Voltage Target" },
      { key: "CurrentActual", label: "Current Actual", type: "actual", targetKey: "CurrentTarget" },
      { key: "CurrentTarget", label: "Current Target" },
      { key: "FeedActual", label: "Feed Actual", type: "actual", targetKey: "FeedTarget" },
      { key: "FeedTarget", label: "Feed Target" },
      { key: "Result", label: "Result" },
    ],
    [],
  );

  const exportFileBase = `MIG_Welding_Report_${dateRange.from}_to_${dateRange.to}`;

  function handleDownloadExcel() {
    generateExcel(excelHeaders, filteredData, exportFileBase);
  }

  async function handleDownloadPdf() {
    if (!filteredData.length && !isBg) return;
    try {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      const font = await loadKarlaFont(doc);
      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const shiftLabel = filters.shifts.includes("All")
        ? "All Shifts"
        : filters.shifts.map((s) => `Shift ${s}`).join(", ");

      const subLines = [
        `Date Range: ${dateRange.from} to ${dateRange.to}  |  Shift: ${shiftLabel}  |  Result: ${filters.result}`,
        `Area: ${selectedAreaLabel}  |  Line: ${selectedLineLabel}  |  Station: ${formatStationName(selectedStationLabel)}`,
        ...(appliedBIW.trim() ? [`BIW No: ${appliedBIW.trim()}`] : []),
        `Total Records: ${filteredData.length}`,
      ];

      const tableConfig = buildRoundedAutoTableConfig(pdfColumns, filteredData, doc, font);

      const HEADER_H = 40;
      const PANEL_PADDING_Y = 2 * 2;
      const PANEL_LINE_H = 5.5;
      const panelHeight = subLines.length * PANEL_LINE_H + PANEL_PADDING_Y;
      const safeTopMargin = HEADER_H + 2 + panelHeight + 4

      tableConfig.margin = { ...(tableConfig.margin || {}), top: safeTopMargin };
      tableConfig.showHead = "everyPage";

      autoTable(doc, tableConfig);

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: pageCount,
          fontFamily: font,
          title: "MIG Welding Report",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${exportFileBase}.pdf`);
    } catch (err) {
      console.error("MIG Welding PDF export failed:", err);
    }
  }

  async function handleDownload() {
    if (!filteredData.length && !isBg) return;
    setIsDownloading(true);
    try {
      handleDownloadExcel();
      await handleDownloadPdf();
    } finally {
      setIsDownloading(false);
    }
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
    <div className="p-2 ">
      <FilterBar config={filterConfig} filters={filters} onChange={handleFilterChange} />
      <DateRangeBar
        selectedStartDate={dateRange.from}
        selectedEndDate={dateRange.to}
        onSearch={(from, to) => handleDateChange({ from, to })}
        showDownload={true}
        reportName="MIG_Welding"
        onDownload={handleDownload}
        isDownloading={isDownloading}
        withContainer={true}
        showSearch={true}
        searchLabel="BIW No."
        searchPlaceholder="Enter BIW No. here"
        searchValue={biwSearch}
        onSearchValueChange={(val) => {
          setBiwSearch(val);
          setAppliedBIW(val);
        }}
      />

      {!hasSearched ? (
        <EmptyState title="Select filters and click Search to view  MIG Welding data" />
      ) : isLoading ? (
        <TableShimmer />
      ) : filteredData?.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mt-4 mb-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-700">
              MIG Welding Results ({filteredData.length} records)
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-green-100 text-green-800 whitespace-nowrap">
                OK: {okCount}
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-red-100 text-red-800 whitespace-nowrap">
                NOK: {nokCount}
              </span>
            </div>
          </div>
          <DataTable
            title="MIG Welding Data"
            columns={tableColumns}
            columnGroups={columnGroups}
            data={filteredData}
            defaultRows={10}
          />
        </>
      ) : (
        <NoDataState />
      )}
    </div>
  );
}