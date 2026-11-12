import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import DateRangeBar, { DateInput } from "../../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../../sharedComponents/FilterBar";
import { Search, Download } from "lucide-react";
import CardContainer from "../../../../sharedComponents/CardContainer";
import { masterApi, lineBufferApi } from "../../../../services/api";
import DataTable from "../../../../sharedComponents/DataTable";
import BacklogChart from "./buffer-trend/BacklogChart";
import { generateExcel } from "../../../../utils/ExcelUtils";
import {
  buildAutoTableConfig,
  drawPdfPageChrome,
  loadBrandingLogos,
  loadKarlaFont,
} from "../../../../utils/PdfUtils";
import { Activity } from "lucide-react";
import { SearchPromptState, NoDataState } from "../../../../sharedComponents/EmptyState";
import { ChartShimmer, TableShimmer } from "../../../../sharedComponents/Shimmer";
import { formatClusterName } from "../../../../utils/Formatters";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_OPTIONS = [
  { value: "all", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];

function parseAsLocalTime(isoString) {
  if (typeof isoString !== "string") return new Date(isoString);
  return new Date(isoString.replace(/Z$/, ""));
}

function formatTimestamp(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return `${y}-${m}-${d} ${time}`;
}

function formatStatusLabel(status) {
  if (!status) return status;
  const lower = status.toLowerCase();
  if (lower.includes("below") && lower.includes("min")) return "Near Minimum Threshold";
  if (lower.includes("above") && lower.includes("max")) return "Near Max Threshold";
  return status;
}

function getShift(date) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes >= 6 * 60 + 30 && minutes < 15 * 60) return "A";
  if (minutes >= 15 * 60 && minutes < 23 * 60 + 30) return "B";
  return "C";
}

function getShiftAnchor(dateStr) {
  if (!dateStr) return new Date();
  return new Date(`${dateStr}T06:30:00`);
}

function toFileToken(value) {
  return String(value || "all").replace(/[^a-z0-9]+/gi, "_");
}

function downloadBufferTrendExcel(rows, columns, filename) {
  const headers = columns.map((column) => ({
    label: column.label,
    accessor: column.key,
  }));
  generateExcel(headers, rows, filename);
}

async function downloadBufferTrendPDF(chartRef, rows, columns, filterLabels) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const fontFamily = await loadKarlaFont(doc);

  let [jswImg, schaefflerImg] = await loadBrandingLogos();
  if (!jswImg || !schaefflerImg) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const retryResult = await loadBrandingLogos();
    jswImg = jswImg ?? retryResult[0];
    schaefflerImg = schaefflerImg ?? retryResult[1];
  }

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const headerH = 40;
  const footerH = 22;
  const firstTimestamp = rows[0]?.dateTime ?? "All";
  const lastTimestamp = rows.at(-1)?.dateTime ?? "All";
  const subLines = [
    `Date Range : ${firstTimestamp}  To  ${lastTimestamp}`,
    `Area : ${filterLabels.area}   |   Line : ${filterLabels.line}   |   Shift : ${filterLabels.shift}`,
  ];

  let chartImgData = null;
  let chartAspect = 0.42;
  if (chartRef.current) {
    try {
      const { toPng } = await import("html-to-image");
      chartImgData = await toPng(chartRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const rect = chartRef.current.getBoundingClientRect();
      if (rect.width > 0) chartAspect = rect.height / rect.width;
    } catch (error) {
      console.warn("Buffer trend chart capture failed:", error.message);
    }
  }

  const subH = subLines.length * 5.5 + 10;
  const contentTop = headerH + subH;
  const contentW = pageW - margin * 2;
  const contentH = pageH - contentTop - footerH;

  doc.setFont(fontFamily, "bold");
  doc.setFontSize(10);
  doc.setTextColor(22, 70, 161);

  if (chartImgData) {
    const maxImgH = contentH - 10;
    const imgH = Math.min(contentW * chartAspect, maxImgH);
    const imgW = Math.min(contentW, imgH / chartAspect);
    const imgX = margin + (contentW - imgW) / 2;
    const imgY = contentTop + 8;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.addImage(chartImgData, "PNG", imgX, imgY, imgW, imgH, undefined, "FAST");
  } else {
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("Chart preview unavailable.", margin, contentTop + 16);
  }

  doc.addPage();
  autoTable(doc, {
    startY: headerH + 8,
    ...buildAutoTableConfig(columns, rows, doc, fontFamily),
    tableWidth: "auto",
    columnStyles: {
      1: { cellWidth: 34 },
      5: { cellWidth: 32 },
    },
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    doc.setPage(pageNum);
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily,
      title: "Buffer Trend Report",
      subLines: pageNum === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }

  doc.save(
    `Buffer_Trend_${toFileToken(filterLabels.area)}_${toFileToken(filterLabels.line)}.pdf`,
  );
}

export default function BufferTrend({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
}) {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const bgDate = backgroundDateRange?.start || bgContext?.dateRange?.start || null;

  const today = new Date().toISOString().split("T")[0];
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(bgDate || today);
  const [filters, setFilters] = useState({
    area: "all",
    line: "all",
    shifts: ["A"],
  });
  const [masterClusters, setMasterClusters] = useState([]);
  const chartRef = useRef(null);
  const [rawRows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [hasSearched, setHasSearched] = useState(false);
  const [appliedDate, setAppliedDate] = useState(null);
  const [appliedAreaLabel, setAppliedAreaLabel] = useState("");
  const [appliedLineLabel, setAppliedLineLabel] = useState("");
  const [appliedShiftLabel, setAppliedShiftLabel] = useState("Shift A");

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

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
      } catch (err) {
        console.error("Master data failed:", err);
      }
    };
    loadMasterData();
  }, []);

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
    const lines =
      filters.area === "all"
        ? masterClusters.flatMap((cluster) => cluster.Lines ?? [])
        : (selectedCluster?.Lines ?? []);

    return lines.map((line) => ({
      value: String(line.LineId),
      label: line.LineName,
    }));
  }, [filters.area, masterClusters, selectedCluster]);

  const config = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions],
  );

  const canSearch = Boolean(selectedDate);

  const selectedAreaLabel = useMemo(() => {
    return (
      areaOptions.find((option) => option.value === filters.area)?.label ??
      "All"
    );
  }, [areaOptions, filters.area]);

  const selectedLineLabel = useMemo(() => {
    return (
      lineOptions.find((option) => option.value === filters.line)?.label ??
      "All"
    );
  }, [lineOptions, filters.line]);

  const selectedShiftLabel = useMemo(() => {
    const shifts = filters.shifts ?? [];
    if (shifts.length === 0 || shifts.includes("all")) return "All Shifts";
    return shifts
      .map((s) => SHIFT_OPTIONS.find((o) => o.value === s)?.label ?? s)
      .join(", ");
  }, [filters.shifts]);

  const fetchData = useCallback(
    async (currentFilters, date) => {
      setLoading(true);
      setError(null);
      try {
        const clusterId =
          currentFilters.area === "all" || currentFilters.area === "__null__"
            ? null
            : Number(currentFilters.area);
        const lineId =
          currentFilters.line === "all" || currentFilters.line === "__null__"
            ? null
            : Number(currentFilters.line);

        const res = await lineBufferApi.getLineBufferHistory({
          clusterId,
          lineId,
          selectedDate: date,
          pageNumber: 1,
          pageSize: 100000,
        });

        setRawRows(res?.tableData ?? []);
        setHasSearched(true);
      } catch (err) {
        setError(err.message);
        setRawRows([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!hasSearched) return;
    if (!canSearch) {
      setRawRows([]);
      return;
    }
    const timer = setTimeout(() => {
      setAppliedDate(selectedDate);
      setAppliedAreaLabel(selectedAreaLabel);
      setAppliedLineLabel(selectedLineLabel);
      setAppliedShiftLabel(selectedShiftLabel);
      fetchData(filters, selectedDate);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, selectedDate]);

  function handleFilterChange(newFilters) {
    if (newFilters.area !== filters.area) {
      if (newFilters.area === "all") {
        newFilters.line = "all";
      } else if (newFilters.area === "__null__") {
        newFilters.line = "__null__";
      } else {
        const cluster = masterClusters.find(
          (c) => String(c.ClusterId) === newFilters.area,
        );
        const firstLine = (cluster?.Lines ?? [])[0];
        newFilters.line = firstLine ? String(firstLine.LineId) : "all";
      }
    }

    const prevShifts = filters.shifts ?? [];
    let nextShifts = newFilters.shifts ?? prevShifts;
    if (nextShifts.includes("all") && !prevShifts.includes("all")) {
      nextShifts = ["all"];
    } else if (!nextShifts.includes("all") && prevShifts.includes("all")) {
      nextShifts = nextShifts.filter((s) => s !== "all");
      if (nextShifts.length === 0) nextShifts = ["all"];
    } else if (
      !nextShifts.includes("all") &&
      INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
    ) {
      nextShifts = ["all"];
    } else if (nextShifts.includes("all") && nextShifts.length > 1) {
      nextShifts = nextShifts.filter((s) => s !== "all");
    }
    newFilters.shifts = nextShifts;

    setFilters(newFilters);
  }

  // Anchor point = 06:30 on the date that was actually searched.
  const shiftAnchor = useMemo(
    () => getShiftAnchor(appliedDate || selectedDate),
    [appliedDate, selectedDate],
  );

  const mappedData = useMemo(() => {
    return rawRows.map((row) => {
      const tsDate = parseAsLocalTime(row.TimeStamp);
      const minutesFromAnchor = Math.round(
        (tsDate.getTime() - shiftAnchor.getTime()) / 60000,
      );
      return {
        id: row.Id,
        rawTimestamp: row.TimeStamp,
        minutesFromAnchor,
        dateTime: formatTimestamp(tsDate),
        shift: row.Shift ?? getShift(tsDate),
        area: formatClusterName(row.AreaName ?? selectedAreaLabel),
        line: row.LineName ?? selectedLineLabel,
        value: row.BufferValue,
        min: row.MinThreshold,
        max: row.MaxThreshold,
        target: row.Target,
        status: formatStatusLabel(row.StatusName ?? row.Status),
      };
    });
  }, [rawRows, selectedAreaLabel, selectedLineLabel, shiftAnchor]);

  const filteredMappedData = useMemo(() => {
    const shifts = filters.shifts ?? [];
    if (shifts.length === 0 || shifts.includes("all")) return mappedData;
    return mappedData.filter((row) => shifts.includes(row.shift));
  }, [mappedData, filters.shifts]);

  const chartData = useMemo(
    () =>
      [...filteredMappedData].sort(
        (a, b) => a.minutesFromAnchor - b.minutesFromAnchor,
      ),
    [filteredMappedData],
  );

  const tableColumns = useMemo(
    () => [
      { key: "sr", label: "Sr. No.", sortable: false, width: "60px" },
      { key: "dateTime", label: "Timestamp", type: "mono", sortable: true, width: "180px" },
      { key: "shift", label: "Shift", type: "shift", sortable: true, width: "70px" },
      { key: "area", label: "Area", sortable: true, width: "120px" },
      { key: "line", label: "Line", type: "primary", sortable: true, width: "120px" },
      { key: "value", label: "Buffer Level", sortable: true, width: "110px" },
      { key: "max", label: "Max Threshold", sortable: true, width: "120px" },
      { key: "min", label: "Min Threshold", sortable: true, width: "120px" },
      { key: "target", label: "Target", sortable: true, width: "90px" },
      { key: "status", label: "Status", sortable: true, width: "200px" },
    ],
    [],
  );

  const tableData = useMemo(
    () =>
      filteredMappedData.map((row, index) => ({
        ...row,
        sr: index + 1,
      })),
    [filteredMappedData],
  );

  const handleDownload = async () => {
    if (!hasSearched) return;
    if (tableData.length === 0 && !isBg) return;
    try {
      setIsDownloading(true);
      const dateToken = appliedDate || selectedDate || today;
      downloadBufferTrendExcel(tableData, tableColumns, `Buffer_Trend_${dateToken}`);
      await downloadBufferTrendPDF(chartRef, tableData, tableColumns, {
        area: appliedAreaLabel,
        line: appliedLineLabel,
        shift: appliedShiftLabel,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSearch = (date) => {
    const d = date || selectedDate;
    if (!d) return;
    setAppliedDate(d);
    setAppliedAreaLabel(selectedAreaLabel);
    setAppliedLineLabel(selectedLineLabel);
    fetchData(filters, d);
  };

  // Background mode auto-search and auto-download orchestration
  const bgSearchDoneRef = useRef(false);
  const bgDownloadDoneRef = useRef(false);

  useEffect(() => {
    if (!isBg || bgSearchDoneRef.current) return;
    const targetDate = bgDate || today;
    setSelectedDate(targetDate);

    const timer = setTimeout(() => {
      if (bgSearchDoneRef.current) return;
      bgSearchDoneRef.current = true;

      const activeFilters = { ...filters };
      if (masterClusters.length > 0 && (activeFilters.area === "all" || !activeFilters.area)) {
        const first = masterClusters[0];
        activeFilters.area = String(first.ClusterId);
        activeFilters.line = first.Lines?.[0] ? String(first.Lines[0].LineId) : "all";
      }
      setAppliedDate(targetDate);
      setAppliedAreaLabel(selectedAreaLabel);
      setAppliedLineLabel(selectedLineLabel);
      setAppliedShiftLabel(selectedShiftLabel);
      fetchData(activeFilters, targetDate);
    }, 700);

    return () => clearTimeout(timer);
  }, [isBg, masterClusters, bgDate]);

  useEffect(() => {
    if (!isBg || bgDownloadDoneRef.current || loading || !hasSearched || isDownloading) return;

    bgDownloadDoneRef.current = true;
    const dlTimer = setTimeout(() => {
      handleDownload();
    }, 1200);

    return () => clearTimeout(dlTimer);
  }, [isBg, loading, hasSearched, isDownloading, tableData]);

  return (
    <div className="p-2">
      <FilterBar
        config={config}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        singleDate={true}
        selectedStartDate={selectedDate}
        selectedEndDate={selectedDate}
        onSearch={(d) => {
          setSelectedDate(d);
          handleSearch(d);
        }}
        showDownload={true}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        reportName="Buffer_Trend"
      />

      {!canSearch || !hasSearched ? (
        <SearchPromptState pageName="Buffer Trend" />
      ) : (
        <>
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-600">⚠️ Error: {error}</p>
            </div>
          )}

          {loading ? (
            <>
              <CardContainer title="Backlog Description - Previous">
                <ChartShimmer />
              </CardContainer>
              <TableShimmer rows={8} />
            </>
          ) : !error && tableData.length === 0 ? (
            <NoDataState />
          ) : !error && tableData.length > 0 ? (
            <>
              <CardContainer title={`Backlog Description - Previous`} ref={chartRef}>
                <BacklogChart data={chartData} />
              </CardContainer>

              <DataTable
                title="Backlog Description - Previous"
                columns={tableColumns}
                data={tableData}
              />
            </>
          ) : null}
        </>
      )}
    </div>
  );
}