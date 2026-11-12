import { useState, useEffect, useMemo, useRef } from "react";
import { masterApi } from "../../../services/api";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import appConfig from "../../../config/appConfig";
import { formatClusterName } from "../../../utils/Formatters";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import DataTable from "../../../sharedComponents/DataTable";
import { Activity } from "lucide-react";
import {
  SearchX,
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Calendar,
  MapPin,
  Layers,
  ScanLine,
} from "lucide-react";
import StudResultImage from "../../../assets/vin_no_img.jfif";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  drawPdfPageChrome,
  loadBrandingLogos,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../utils/PdfUtils";
import { generateExcel } from "../../../utils/ExcelUtils";
import { NoDataState } from "../../../sharedComponents/EmptyState";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";

const EMPTY_STATE_COLOR_MAP = {
  gray: { bg: "bg-gray-100", icon: "text-gray-400" },
  sky: { bg: "bg-sky-50", icon: "text-sky-400" },
  red: { bg: "bg-red-50", icon: "text-red-400" },
};

function EmptyState({
  icon: Icon = Activity,
  title,
  subtitle,
  color = "sky",
  className = "",
}) {
  const { bg, icon } = EMPTY_STATE_COLOR_MAP[color] || EMPTY_STATE_COLOR_MAP.sky;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-12 text-center mt-4 ${className}`}
    >
      {Icon && (
        <div
          className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mx-auto mb-3`}
        >
          <Icon size={22} className={icon} />
        </div>
      )}
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

export default function VinNoGenerationReport({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const today = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState({ from: today, to: today });
  const [masterClusters, setMasterClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

  const shiftOptions = useMemo(
    () =>
      appConfig.production.shifts.map((s) =>
        s.value === "All"
          ? { value: "All", label: "All Shifts" }
          : { value: s.value, label: s.label ?? `Shift ${s.value}` },
      ) ?? [],
    [],
  );

  const [filters, setFilters] = useState({
    area: "",
    line: "",
    station: "",
    shifts: ["A"],
  });
  const [appliedBIW, setAppliedBIW] = useState("");

  // VIN modal
  const [selectedVin, setSelectedVin] = useState(null);
  const [vinModalOpen, setVinModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [vinCopied, setVinCopied] = useState(false);
  const [fullSizeOpen, setFullSizeOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadMasterData = async () => {
      setIsLoading(true);
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        const firstCluster = clusters[0];
        if (firstCluster) {
          let targetAreaId = String(firstCluster.ClusterId);
          let targetLineId = "";
          let targetStationId = "";

          if (targetFilters?.area || targetFilters?.areaId) {
            const matchArea = clusters.find(
              (c) =>
                String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase()
            );
            if (matchArea) targetAreaId = String(matchArea.ClusterId);
          }

          const selCluster = clusters.find((c) => String(c.ClusterId) === targetAreaId) || firstCluster;
          const areaLines = selCluster?.Lines ?? [];
          const firstLine = areaLines[0];
          targetLineId = firstLine ? String(firstLine.LineId) : "";

          if (targetFilters?.line || targetFilters?.lineId) {
            const matchLine = areaLines.find(
              (l) =>
                String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase()
            );
            if (matchLine) targetLineId = String(matchLine.LineId);
          }

          const selLine = areaLines.find((l) => String(l.LineId) === targetLineId) || firstLine;
          const lineStations = selLine?.Stations ?? [];
          const firstStation = lineStations[0];
          targetStationId = firstStation ? String(firstStation.StationId) : "";

          if (targetFilters?.station || targetFilters?.stationId) {
            const matchStation = lineStations.find(
              (s) =>
                String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase()
            );
            if (matchStation) targetStationId = String(matchStation.StationId);
          }

          let shifts = ["A"];
          if (targetFilters?.shifts) {
            shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
          } else if (targetFilters?.shift) {
            shifts = [targetFilters.shift];
          }

          setFilters({
            area: targetAreaId,
            line: targetLineId,
            station: targetStationId,
            shifts,
          });
        }
      } catch (err) {
        console.error("Master data failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMasterData();
  }, [targetFilters]);


  useEffect(() => {
    if (!fullSizeOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeFullSize();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullSizeOpen]);

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

  const selectedLineObj = useMemo(() => {
    const lines = selectedCluster?.Lines ?? [];
    return lines.find((line) => String(line.LineId) === filters.line) ?? null;
  }, [filters.line, selectedCluster]);

  const stationOptions = useMemo(() => {
    const stations = selectedLineObj?.Stations ?? [];
    return stations.map((station) => ({
      value: String(station.StationId),
      label: station.StationName,
    }));
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
    () =>
      stationOptions.find((o) => o.value === filters.station)?.label ?? "",
    [stationOptions, filters.station],
  );

  const config = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "station",
        label: "Station",
        options: stationOptions,
      },
      {
        type: "select",
        key: "shifts",
        label: "Shifts",
        multiple: true,
        searchable: false,
        options: shiftOptions,
      }, ,
    ],
    [areaOptions, lineOptions, stationOptions, shiftOptions],
  );

  function handleFilterChange(newFilters) {
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
      const lineObj = lines.find(
        (line) => String(line.LineId) === newFilters.line,
      );
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
  }

  function handleDateChange(newDateRange) {
    setIsLoading(true);
    setDateRange(newDateRange);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 500);
  }

  const masterPaths = useMemo(() => {
    const paths = [];
    masterClusters.forEach((cluster) => {
      const lines = cluster.Lines ?? [];
      lines.forEach((line) => {
        const stations = line.Stations ?? [];
        stations.forEach((station) => {
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
      for (let day = 1; day <= 30; day++) {
        dates.push(`2026-06-${day.toString().padStart(2, "0")}`);
      }
      for (let day = 1; day <= 17; day++) {
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
        shift === "A"
          ? Math.floor(Math.random() * 8) + 6
          : shift === "B"
            ? Math.floor(Math.random() * 8) + 14
            : Math.floor(Math.random() * 8) + 22;
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;

      const biwNo = biwCounter++;
      const vinNo = `VIN${date.replace(/-/g, "")}${(i % 1000)
        .toString()
        .padStart(3, "0")}`;

      data.push({
        srno: i,
        ProtRecordID: biwNo,
        VinNo: vinNo,
        Date: date,
        Time: time,
        ShiftName: shift,
        ClusterId: path.ClusterId,
        LineId: path.LineId,
        StationId: path.StationId,
        Area: formatClusterName(path.ClusterName),
        LineName: path.LineName,
        StationName: path.StationName,
      });
    }

    return data.sort((a, b) => {
      if (a.Date === b.Date) return a.Time.localeCompare(b.Time);
      return a.Date.localeCompare(b.Date);
    });
  };

  const dummyData = useMemo(
    () => generateDummyData(masterPaths),
    [masterPaths],
  );

  const filteredData = useMemo(() => {
    let filtered = [...dummyData];

    if (filters.area) {
      filtered = filtered.filter(
        (item) => String(item.ClusterId) === filters.area,
      );
    }
    if (filters.line) {
      filtered = filtered.filter(
        (item) => String(item.LineId) === filters.line,
      );
    }
    if (filters.station) {
      filtered = filtered.filter(
        (item) => String(item.StationId) === filters.station,
      );
    }
      if (filters.shifts && !filters.shifts.includes("All")) {
      filtered = filtered.filter((item) =>
        filters.shifts.includes(item.ShiftName),
      );
    }
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(
        (item) => item.Date >= dateRange.from && item.Date <= dateRange.to,
      );
    }
    if (appliedBIW.trim()) {
      filtered = filtered.filter((item) =>
        String(item.ProtRecordID).includes(appliedBIW.trim()),
      );
    }

    return filtered;
  }, [dummyData, filters, dateRange, appliedBIW]);


  function handleVinClick(row) {
    setSelectedVin(row.VinNo);
    setSelectedRecord(row);
    setVinModalOpen(true);
  }

  function closeVinModal() {
    setVinModalOpen(false);
    setVinCopied(false);
  }

  function handleCopyVin() {
    if (!selectedRecord?.VinNo) return;
    navigator.clipboard?.writeText(selectedRecord.VinNo).then(() => {
      setVinCopied(true);
      setTimeout(() => setVinCopied(false), 1500);
    });
  }

  function handleDownloadImage() {
    if (!selectedRecord) return;
    const src = selectedRecord.imageUrl || StudResultImage;
    const filename = `${selectedRecord.VinNo || "vin-image"}.jpg`;

    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        window.open(src, "_blank", "noopener,noreferrer");
      });
  }

  function handleViewFullSize() {
    setZoomLevel(1);
    setImagePos({ x: 0, y: 0 });
    setFullSizeOpen(true);
  }

  function closeFullSize() {
    setFullSizeOpen(false);
    setZoomLevel(1);
    setImagePos({ x: 0, y: 0 });
    setIsDragging(false);
  }

  function handleZoomIn() {
    setZoomLevel((z) => Math.min(z + 0.5, 5));
  }

  function handleZoomOut() {
    setZoomLevel((z) => {
      const next = Math.max(z - 0.5, 1);
      if (next === 1) setImagePos({ x: 0, y: 0 });
      return next;
    });
  }

  function handleResetZoom() {
    setZoomLevel(1);
    setImagePos({ x: 0, y: 0 });
  }

  function handleWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setZoomLevel((z) => {
      const next = Math.min(Math.max(z + delta, 1), 5);
      if (next === 1) setImagePos({ x: 0, y: 0 });
      return next;
    });
  }

  function handleMouseDown(e) {
    if (zoomLevel === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePos.x, y: e.clientY - imagePos.y });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setImagePos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  const tableColumns = useMemo(() => {
    return [
      { key: "srno", label: "Sr. No.", sortable: true },
      { key: "Date", label: "Date", type: "mono", sortable: true },
      { key: "Time", label: "Time", type: "mono", sortable: true },
      { key: "ShiftName", label: "Shift", type: "shift", sortable: true },
      { key: "Area", label: "Area", sortable: true },
      { key: "LineName", label: "Line", sortable: true },
      { key: "StationName", label: "Station", sortable: true },
      { key: "ProtRecordID", label: "BIW No", sortable: true },
      {
        key: "VinNo",
        label: "VIN No",
        sortable: true,
        render: (row) => (
          <button
            type="button"
            onClick={() => handleVinClick(row)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${selectedVin === row.VinNo
              ? "bg-sky-700 text-white border-sky-700"
              : "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100"
              }`}
          >
            {row.VinNo}
          </button>
        ),
      },
    ];
  }, [selectedVin]);

  const excelHeaders = useMemo(
    () =>
      tableColumns.map((item) => ({ label: item.label, accessor: item.key })),
    [tableColumns],
  );

  const exportFileBase = `VIN_No_Generation_Report_${dateRange.from}_to_${dateRange.to}`;

  function handleDownloadExcel() {
    generateExcel(excelHeaders, filteredData, exportFileBase);
  }

  async function handleDownloadPdf() {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const font = await loadKarlaFont(doc);
      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const shiftLabel = filters.shifts.includes("All")
        ? "All Shifts"
        : filters.shifts.map((s) => `Shift ${s}`).join(", ");

      const subLines = [
        `Date Range: ${dateRange.from} to ${dateRange.to}  |  Shift: ${shiftLabel}`,
        `Area: ${selectedAreaLabel}  |  Line: ${selectedLineLabel}  |  Station: ${selectedStationLabel}`,
        ...(appliedBIW.trim() ? [`BIW No: ${appliedBIW.trim()}`] : []),
        `Total Records: ${filteredData.length}`,
      ];

      const pdfColumns = tableColumns.map((col) => ({
        key: col.key,
        label: col.label,
        type: col.type,
      }));

      const tableConfig = buildAutoTableConfig(
        pdfColumns,
        filteredData,
        doc,
        font,
      );

      autoTable(doc, {
        ...tableConfig,
        startY: appliedBIW.trim() ? 70 : 65,
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: pageCount,
          fontFamily: font,
          title: "VIN No. Generation Report",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${exportFileBase}.pdf`);
    } catch (err) {
      console.error("VIN No. Generation Report PDF export failed:", err);
    }
  }

  async function handleDownload() {
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
    <div className="p-2">
      <FilterBar
        config={config}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        selectedStartDate={dateRange.from}
        selectedEndDate={dateRange.to}
        onSearch={(from, to) => handleDateChange({ from, to })}
        showDownload={true}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        withContainer={true}
        showSearch={true}
        searchLabel="BIW No"
        searchPlaceholder="Search BIW..."
        searchValue={appliedBIW}
        onSearchValueChange={setAppliedBIW}
        reportName="VIN_No_Generation"
      />

      {isLoading ? (
        <TableShimmer />
      ) : !hasSearched ? (
        <EmptyState
          title="Select filters and click Search to view  VIN No. Generation data"
          color="sky"
        />
      ) : filteredData?.length > 0 ? (
        <DataTable
          title="VIN No. Generation Report"
          columns={tableColumns}
          data={filteredData}
          defaultRows={10}
        />
      ) : (
        <NoDataState />
      )}

      {vinModalOpen && selectedRecord && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={closeVinModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-sky-700 text-white px-6 py-5 flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ScanLine size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider mb-0.5">
                    VIN No. Generation Result
                  </p>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg leading-none">
                      {selectedRecord.VinNo}
                    </h3>
                    <button
                      onClick={handleCopyVin}
                      title="Copy VIN"
                      className="text-sky-200 hover:text-white hover:bg-white/10 p-1 rounded transition-colors"
                    >
                      {vinCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={closeVinModal}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-5 flex flex-col">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Captured Image
                </p>
                <div
                  className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-zoom-in"
                  onClick={handleViewFullSize}
                  title="Click to view full size"
                >
                  <img
                    src={selectedRecord.imageUrl || StudResultImage}
                    alt={selectedRecord.VinNo}
                    className="w-full h-full max-h-56 object-contain"
                    onError={(e) => {
                      e.target.src = StudResultImage;
                    }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Record Details
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">BIW No.</p>
                      <p className="text-sm font-bold text-gray-800">
                        {selectedRecord.ProtRecordID}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Shift</p>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-700/10 text-sky-700 text-xs font-bold">
                        {selectedRecord.ShiftName}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                        <Calendar size={11} /> Date
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {selectedRecord.Date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Time</p>
                      <p className="text-sm font-bold text-gray-800">
                        {selectedRecord.Time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin size={11} /> Location
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-700">
                      <Layers size={12} className="text-gray-400" />
                      {selectedRecord.Area}
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-700">
                      {selectedRecord.LineName}
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-700">
                      {selectedRecord.StationName}
                    </span>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex gap-3 px-5 py-4 bg-gray-50 border-t border-gray-200">
              <button
                className="flex-1 bg-sky-700 text-white py-2 px-4 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                onClick={handleDownloadImage}
              >
                <Download size={16} />
                Download Image
              </button>
              <button
                className="flex-1 bg-white border border-sky-700 text-sky-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                onClick={handleViewFullSize}
              >
                <ZoomIn size={16} />
                View Full Size
              </button>
            </div>
          </div>
        </div>
      )}


      {fullSizeOpen && selectedRecord && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center overflow-hidden select-none"
          onClick={closeFullSize}
          onWheel={handleWheelZoom}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >

          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/60 to-transparent z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1.5 rounded-full">
              {selectedRecord.VinNo}
            </span>
            <button
              onClick={closeFullSize}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              title="Close (Esc)"
            >
              <X size={22} />
            </button>
          </div>


          <img
            src={selectedRecord.imageUrl || StudResultImage}
            alt={selectedRecord.VinNo}
            draggable={false}
            className={`max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform duration-75 ${zoomLevel > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
              }`}
            style={{
              transform: `translate(${imagePos.x}px, ${imagePos.y}px) scale(${zoomLevel})`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (zoomLevel === 1) handleZoomIn();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e);
            }}
            onError={(e) => {
              e.target.src = StudResultImage;
            }}
          />


          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="text-white/90 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed p-2 rounded-full transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-white text-xs font-semibold w-12 text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 5}
              className="text-white/90 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed p-2 rounded-full transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-5 bg-white/20 mx-1" />
            <button
              onClick={handleResetZoom}
              disabled={zoomLevel === 1 && imagePos.x === 0 && imagePos.y === 0}
              className="text-white/90 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed p-2 rounded-full transition-colors"
              title="Reset zoom"
            >
              <RotateCcw size={16} />
            </button>
            <div className="w-px h-5 bg-white/20 mx-1" />
            <button
              onClick={handleDownloadImage}
              className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              title="Download"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}