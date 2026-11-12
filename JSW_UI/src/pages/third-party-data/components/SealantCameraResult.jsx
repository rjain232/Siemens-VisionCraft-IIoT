import { useState, useEffect, useMemo, useRef } from "react";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import DateRangeSelector from "../../../sharedComponents/DateRangeBar";
import DataTable from "../../../sharedComponents/DataTable";
import FilterBar from "../../../sharedComponents/FilterBar";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import { format } from "date-fns";
import { formatStationName } from "../../../utils/Formatters";
import { X, Download, ZoomIn, Image } from "lucide-react";
import { masterApi } from "../../../services/api";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../utils/PdfUtils";
import { saveExcel } from "../../../utils/ExcelUtils";
import carSealantImage from "../../../assets/sealant-inspection-image.png";

const NO_STATION_LABEL = "";

const EXPORT_COLS = [
  { key: "srNo", label: "Sr. No." },
  { key: "Date", label: "Date", type: "mono" },
  { key: "Timestamp", label: "Timestamp", type: "mono" },
  { key: "Shift", label: "Shift", type: "shift" },
  { key: "Area", label: "Area" },
  { key: "Line", label: "Line" },
  { key: "Station", label: "Station" },
  { key: "CabinNo", label: "BIW No.", type: "primary" },
  { key: "Result", label: "Result", type: "result" },
];

function getShiftPdfColors(shift) {
  switch (shift) {
    case "A":
      return { fill: [239, 246, 255], text: [29, 78, 216], border: [191, 219, 254] }; // blue-50 / blue-700 / blue-200
    case "B":
      return { fill: [240, 253, 244], text: [21, 128, 61], border: [187, 247, 208] }; // green-50 / green-700 / green-200
    case "C":
      return { fill: [255, 247, 237], text: [194, 65, 12], border: [254, 215, 170] }; // orange-50 / orange-700 / orange-200
    default:
      return null;
  }
}

function getResultPdfColors(result) {
  if (result === "OK") return { fill: [220, 252, 231], text: [22, 101, 52], border: [134, 239, 172] }; // green-100 / green-800 / green-300
  if (result === "NOK") return { fill: [254, 226, 226], text: [153, 27, 27], border: [252, 165, 165] }; // red-100 / red-800 / red-300
  return null;
}

async function downloadExcel(data, dateFilter) {
  const XLSX = await import("xlsx");
  const headers = EXPORT_COLS.map((c) => c.label);
  const rows = data.map((item, i) => [
    i + 1,
    item.Date,
    item.Timestamp,
    item.Shift,
    item.Area,
    item.Line,
    item.Station,
    item.CabinNo,
    item.Result,
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 8 },
    { wch: 14 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 12 },
    { wch: 16 },
    { wch: 20 },
    { wch: 10 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sealant Camera Result");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveExcel(
    excelBuffer,
    `Sealant_Camera_${dateFilter?.startDate ?? "from"}_to_${dateFilter?.endDate ?? "to"}.xlsx`
  );
}

async function downloadPDF(data, dateFilter, filters = {}) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const FONT = await loadKarlaFont(doc);

  const HEADER_H = 40;
  const CONTENT_TOP = HEADER_H + 22;

  const from = dateFilter?.startDate ?? "-";
  const to = dateFilter?.endDate ?? "-";

  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const subLines = [
    `Report Duration: ${from}  To  ${to}`,
    `Area: ${filters.area || "All"}   |   Line: ${filters.line || "All"}   |   Station: ${filters.station || "All"}   |   Shift: ${filters.shift || "All"}   |   Result: ${filters.result || "All"}`,
  ];

  function drawPageChrome(pageNum, totalPages) {
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily: FONT,
      title: "Sealant Camera ResultInspection Report",
      subLines,
      jswImg,
      schaefflerImg,
    });
  }

  const pdfData = data.map((item, i) => ({
    srNo: i + 1,
    Date: item.Date,
    Timestamp: item.Timestamp,
    Shift: item.Shift,
    Area: item.Area,
    Line: item.Line,
    Station: item.Station,
    CabinNo: item.CabinNo,
    Result: item.Result,
  }));

  const baseConfig = buildAutoTableConfig(EXPORT_COLS, pdfData, doc, FONT);
  const shiftColIndex = EXPORT_COLS.findIndex((c) => c.key === "Shift");
  const resultColIndex = EXPORT_COLS.findIndex((c) => c.key === "Result");

  autoTable(doc, {
    ...baseConfig,
    startY: CONTENT_TOP,
    tableWidth: "auto",
    styles: {
      ...baseConfig.styles,
      fillColor: [255, 255, 255],
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      ...baseConfig.headStyles,
      fillColor: [186, 230, 253],
      textColor: [7, 89, 133],
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      ...baseConfig.alternateRowStyles,
      fillColor: [248, 250, 252], // slate-50
    },
    didParseCell: (hookData) => {
      baseConfig.didParseCell?.(hookData);

      if (hookData.section !== "body") return;
      if (hookData.column.index === resultColIndex) {
        hookData.cell.text = [];
      }
    },
    didDrawCell: (hookData) => {
      baseConfig.didDrawCell?.(hookData);

      if (hookData.section !== "body") return;
      if (hookData.column.index !== resultColIndex) return;

      const raw = hookData.cell.raw;
      const colors = getResultPdfColors(raw);
      if (!colors) return;

      const text = String(raw ?? "");
      const { x, y, width: cellW, height: cellH } = hookData.cell;

      doc.setFont(FONT, "bold");
      doc.setFontSize(7);
      const textW = doc.getTextWidth(text);

      const padX = 2.2;
      const badgeW = textW + padX * 2;
      const badgeH = 4.6;
      const badgeX = x + (cellW - badgeW) / 2;
      const badgeY = y + (cellH - badgeH) / 2;

      doc.setFillColor(...colors.fill);
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.2);
      doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 1.2, 1.2, "FD");

      doc.setTextColor(...colors.text);
      doc.text(text, x + cellW / 2, y + cellH / 2, {
        align: "center",
        baseline: "middle",
      });
    },
    didDrawPage: (hookData) => {
      baseConfig.didDrawPage?.(hookData);
      drawPageChrome(hookData.pageNumber, 1);
    },
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageChrome(p, totalPages);
  }

  doc.save(`Sealant_Camera_${from}_to_${to}.pdf`);
}


const getColumns = (onNOKClick) => [
  {
    key: "srNo",
    label: "Sr. No.",
    sortable: false,
    render: (row, index) => index + 1,
  },
  { key: "Date", label: "Date", type: "mono", sortable: true },
  { key: "Timestamp", label: "Timestamp", type: "mono", sortable: true },
  { key: "Shift", label: "Shift", type: "shift", sortable: true },
  { key: "Area", label: "Area", sortable: true },
  { key: "Line", label: "Line", sortable: true },
  { key: "Station", label: "Station", sortable: true },
  { key: "CabinNo", label: "BIW No.", type: "primary", sortable: true },
  {
    key: "Result",
    label: "Result",
    sortable: true,
    render: (row) => (
      <span
        onClick={() => row.Result === "NOK" && onNOKClick(row)}
        className={`px-3 py-1 rounded-full font-bold text-sm cursor-pointer transition-transform hover:scale-105 ${row.Result === "OK"
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-red-100 text-red-800 border border-red-300"
          }`}>
        {row.Result}
      </span>
    ),
  },
];

const SHIFT_OPTIONS = [
  { label: "All Shifts", value: "All" },
  { label: "Shift A", value: "A" },
  { label: "Shift B", value: "B" },
  { label: "Shift C", value: "C" },
];

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const RESULT_OPTIONS = [
  { label: "OK", value: "OK" },
  { label: "NOK", value: "NOK" },
];

const SealantCameraResult = ({
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

  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
    duration: null,
    shift: null,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState(null);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedShifts, setSelectedShifts] = useState(["A"]);
  const [selectedResult, setSelectedResult] = useState("OK");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [biwSearch, setBiwSearch] = useState("");
  const [appliedBIW, setAppliedBIW] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchMasterData = async () => {
      setMasterLoading(true);
      setMasterError(null);
      try {
        const res = await masterApi.getMasterData();
        const clusters = res?.data || [];
        if (cancelled) return;

        setMasterData(clusters);

        if (clusters.length > 0) {
          const firstCluster = clusters[0];
          let cName = firstCluster.ClusterName;
          if (targetFilters?.areaId || targetFilters?.area) {
            const matchArea = clusters.find(
              (c) =>
                String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
            );
            if (matchArea) cName = matchArea.ClusterName;
          }

          const clusterObj = clusters.find((c) => c.ClusterName === cName) || firstCluster;
          const firstLine = (clusterObj.Lines || [])[0];
          let lName = firstLine ? firstLine.LineName : "";
          if (targetFilters?.lineId || targetFilters?.line) {
            const matchLine = (clusterObj.Lines || []).find(
              (l) =>
                String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
            );
            if (matchLine) lName = matchLine.LineName;
          }

          const lineObj = (clusterObj.Lines || []).find((l) => l.LineName === lName) || firstLine;
          const firstStation = (lineObj?.Stations || [])[0];
          let sName = firstStation ? firstStation.StationName : NO_STATION_LABEL;
          if (targetFilters?.stationId || targetFilters?.station) {
            const matchStation = (lineObj?.Stations || []).find(
              (s) =>
                String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase(),
            );
            if (matchStation) sName = matchStation.StationName;
          }

          setSelectedArea(cName);
          setSelectedLine(lName);
          setSelectedStation(sName);

          if (targetFilters?.shifts) {
            setSelectedShifts(Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts]);
          } else if (targetFilters?.shift) {
            setSelectedShifts([targetFilters.shift]);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load master data:", err);
          setMasterError(err?.message || "Failed to load master data");
        }
      } finally {
        if (!cancelled) setMasterLoading(false);
      }
    };

    fetchMasterData();
    return () => {
      cancelled = true;
    };
  }, [targetFilters]);

  const formatClusterName = (clusterName) => {
    if (!clusterName) return "";
    const match = clusterName.match(/(\d+)/);
    if (match) {
      const prefix = clusterName.replace(/\d+/g, "").trim() || "Cluster";
      return `${prefix} ${match[1].padStart(2, "0")}`;
    }
    return clusterName;
  };

  const areaOptions = useMemo(
    () =>
      masterData.map((c) => ({
        label: formatClusterName(c.ClusterName),
        value: c.ClusterName,
      })),
    [masterData]
  );

  const lineOptions = useMemo(() => {
    const cluster = masterData.find((c) => c.ClusterName === selectedArea);
    return (cluster?.Lines || []).map((l) => ({
      label: l.LineName,
      value: l.LineName,
    }));
  }, [masterData, selectedArea]);

  const stationOptions = useMemo(() => {
    const cluster = masterData.find((c) => c.ClusterName === selectedArea);
    const line = (cluster?.Lines || []).find((l) => l.LineName === selectedLine);
    if (!line) return [];
    return (line.Stations || []).map((s) => ({
      label: s.StationName,
      value: s.StationName,
    }));
  }, [masterData, selectedArea, selectedLine]);

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
    const cluster = masterData.find((c) => c.ClusterName === newArea);
    const firstLine = (cluster?.Lines || [])[0];
    if (firstLine) {
      setSelectedLine(firstLine.LineName);
      const firstStation = (firstLine.Stations || [])[0];
      setSelectedStation(
        firstStation ? firstStation.StationName : NO_STATION_LABEL
      );
    } else {
      setSelectedLine("");
      setSelectedStation("");
    }
  };

  const handleLineChange = (newLine) => {
    setSelectedLine(newLine);
    const cluster = masterData.find((c) => c.ClusterName === selectedArea);
    const line = (cluster?.Lines || []).find((l) => l.LineName === newLine);
    const firstStation = (line?.Stations || [])[0];
    setSelectedStation(firstStation ? firstStation.StationName : NO_STATION_LABEL);
  };

  const filterConfig = useMemo(
    () => [
      { key: "area", type: "select", label: "Area", options: areaOptions },
      { key: "line", type: "select", label: "Line", options: lineOptions },
      {
        key: "station",
        type: "select",
        label: "Station",
        options: stationOptions,
      },
      {
        key: "shifts",
        type: "select",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
      { key: "result", type: "select", label: "Result", options: RESULT_OPTIONS },
    ],
    [areaOptions, lineOptions, stationOptions]
  );

  const filterValues = {
    area: selectedArea,
    line: selectedLine,
    station: selectedStation,
    shifts: selectedShifts,
    result: selectedResult,
  };

  const handleFilterChange = (next) => {
    if (next.area !== selectedArea) {
      handleAreaChange(next.area);
    } else if (next.line !== selectedLine) {
      handleLineChange(next.line);
    } else if (next.station !== selectedStation) {
      setSelectedStation(next.station);
    }

    const prevShifts = selectedShifts;
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
    if (nextShifts.join(",") !== prevShifts.join(",")) setSelectedShifts(nextShifts);

    if (next.result !== selectedResult) setSelectedResult(next.result);
  };

  const generateDummyData = (clusters) => {
    if (!clusters || clusters.length === 0) return [];

    const data = [];
    const shiftsData = ["A", "B", "C"];

    const combos = [];
    clusters.forEach((cluster) => {
      (cluster.Lines || []).forEach((line) => {
        if ((line.Stations || []).length > 0) {
          line.Stations.forEach((station) => {
            combos.push({
              area: cluster.ClusterName,
              line: line.LineName,
              station: station.StationName,
            });
          });
        }
      });
    });

    if (combos.length === 0) return [];

    const generateDates = () => {
      const dates = [];
      const today = new Date();
      const start = new Date(today);
      start.setMonth(start.getMonth() - 6);
      const cur = new Date(start);
      while (cur <= today) {
        dates.push(
          `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`
        );
        cur.setDate(cur.getDate() + 1);
      }
      return dates;
    };

    const dates = generateDates();

    for (let i = 0; i < 400; i++) {
      const combo = combos[Math.floor(Math.random() * combos.length)];
      const shift = shiftsData[Math.floor(Math.random() * shiftsData.length)];
      const date = dates[Math.floor(Math.random() * dates.length)];
      const hour = shift === "A" ? Math.floor(Math.random() * 8) + 6 :
        shift === "B" ? Math.floor(Math.random() * 8) + 14 :
          Math.floor(Math.random() * 8) + 22;
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);
      const timestamp = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
      const cabinNo = `BIW${date.replace(/-/g, '')}${(i % 100).toString().padStart(3, '0')}`;
      const result = Math.random() < 0.3 ? "OK" : "NOK";

      data.push({
        CabinNo: cabinNo,
        Result: result,
        Date: date,
        Timestamp: timestamp,
        Area: combo.area,
        Line: combo.line,
        Station: combo.station,
        Shift: shift,
      });
    }

    return data.sort((a, b) => {
      if (a.Date === b.Date) {
        return a.Timestamp.localeCompare(b.Timestamp);
      }
      return a.Date.localeCompare(b.Date);
    });
  };

  const dummyData = useMemo(() => generateDummyData(masterData), [masterData]);

  const filteredData = useMemo(() => {
    let filtered = [...dummyData];

    if (selectedArea) {
      filtered = filtered.filter((item) => item.Area === selectedArea);
    }

    if (selectedLine) {
      filtered = filtered.filter((item) => item.Line === selectedLine);
    }
    if (!selectedStation) {
      return [];
    }

    filtered = filtered.filter((item) => item.Station === selectedStation);

    if (!selectedShifts.includes("All")) {
      filtered = filtered.filter((item) => selectedShifts.includes(item.Shift));
    }
    filtered = filtered.filter((item) => item.Result === selectedResult);

    if (dateFilter.startDate && dateFilter.endDate) {
      const start = format(new Date(dateFilter.startDate), 'yyyy-MM-dd');
      const end = format(new Date(dateFilter.endDate), 'yyyy-MM-dd');
      filtered = filtered.filter((item) => item.Date >= start && item.Date <= end);
    }

    if (appliedBIW.trim()) {
      filtered = filtered.filter((item) =>
        String(item.CabinNo).toLowerCase().includes(appliedBIW.trim().toLowerCase())
      );
    }

    return filtered.map(item => ({
      ...item,
      Area: formatClusterName(item.Area),
      Station: formatStationName(item.Station)
    }));
  }, [dummyData, selectedArea, selectedLine, selectedStation, selectedShifts, selectedResult, dateFilter, appliedBIW]);

  const handleSearch = (startDate, endDate, duration, shift) => {
    setHasSearched(true);
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1500);
    setDateFilter({ startDate, endDate, duration, shift });
    setAppliedBIW(biwSearch);
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await Promise.all([
        downloadPDF(filteredData, dateFilter, {
          area: formatClusterName(selectedArea),
          line: selectedLine,
          station: selectedStation ? formatStationName(selectedStation) : "N/A",
          shift: selectedShifts.includes("All")
            ? "All Shifts"
            : selectedShifts.map((s) => `Shift ${s}`).join(", "),
          result: selectedResult,
        }),
        downloadExcel(filteredData, dateFilter),
      ]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Sync date range in background mode & trigger search
  useEffect(() => {
    if (isBg && targetDateRange?.start && !masterLoading) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e);
    }
  }, [isBg, targetDateRange, masterLoading]);

  // Auto trigger download in background mode
  const bgTriggeredRef = useRef(false);
  useEffect(() => {
    if (isBg && hasSearched && !masterLoading && !showLoader && !bgTriggeredRef.current) {
      bgTriggeredRef.current = true;
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
    // Removed clearTimeout to prevent race condition canceling export
    }
  }, [isBg, hasSearched, masterLoading, showLoader]);

  const handleNOKClick = (row) => {
    setSelectedImage({
      cabinNo: row.CabinNo,
      result: row.Result,
      date: row.Date,
      timestamp: row.Timestamp,
      area: row.Area,
      line: row.Line,
      station: row.Station,
      imageUrl: carSealantImage,
      path: `${row.Area} > ${row.Line} > ${row.Station}`
    });
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const handleImageDownload = () => {
    if (selectedImage?.imageUrl) {
      const link = document.createElement('a');
      link.href = selectedImage.imageUrl;
      link.download = `${selectedImage.cabinNo}_sealant.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewFullSize = () => {
    if (selectedImage?.imageUrl) {
      window.open(selectedImage.imageUrl, '_blank');
    }
  };

  return (
    <div className="m-1 sm:m-2">
      {/* Image Modal — theme matched to "Stud Inspection Image — NOK" popup */}
      {imageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-sky-700 text-white px-4 py-3 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <Image size={20} />
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    Sealant Inspection Image — {selectedImage.result}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-200 truncate max-w-[200px] sm:max-w-none">
                    {selectedImage.path}
                  </p>
                </div>
              </div>
              <button
                onClick={closeImageModal}
                className="hover:bg-sky-800 p-2 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 sm:p-5 space-y-3">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.cabinNo}
                  className="w-full h-auto max-h-[30vh] sm:max-h-[38vh] object-contain"
                  onError={(e) => {
                    e.target.src = carSealantImage;
                  }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "BIW No.", value: selectedImage.cabinNo },
                  { label: "Result", value: selectedImage.result, isResult: true },
                  { label: "Date", value: selectedImage.date },
                  { label: "Time", value: selectedImage.timestamp },
                ].map(({ label, value, isResult }) => (
                  <div
                    key={label}
                    className="bg-sky-50 p-2.5 rounded-lg border border-sky-100"
                  >
                    <p className="text-xs text-sky-600 font-semibold mb-0.5">
                      {label}
                    </p>
                    <p
                      className={`text-sm font-bold ${isResult ? (value === "OK" ? "text-green-600" : "text-red-600") : "text-slate-800"}`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: "Area", value: selectedImage.area },
                  { label: "Line", value: selectedImage.line },
                  { label: "Station", value: selectedImage.station },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-blue-50 p-2.5 rounded-lg border border-blue-100"
                  >
                    <p className="text-xs text-blue-600 font-semibold mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 border-t border-gray-200 pt-3">
                <button
                  onClick={handleImageDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-700 text-white py-2 px-4 rounded-lg hover:bg-sky-800 transition-colors text-sm font-semibold"
                >
                  <Download size={16} />
                  Download Image
                </button>
                <button
                  onClick={handleViewFullSize}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-sky-700 text-sky-700 py-2 px-4 rounded-lg hover:bg-sky-50 transition-colors text-sm font-semibold"
                >
                  <ZoomIn size={16} />
                  View Full Size
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        {masterError && (
          <div className="mb-3 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            Failed to load Area/Line/Station data: {masterError}
          </div>
        )}
        <FilterBar
          config={filterConfig}
          filters={filterValues}
          onChange={handleFilterChange}
        />
      </div>
      <DateRangeSelector
        showDownload={true}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        reportName="Sealant_Camera"
        onSearch={handleSearch}
        showDateInputs={true}
        selectedStartDate={dateFilter?.startDate}
        selectedEndDate={dateFilter?.endDate}
        selectedDuration={dateFilter?.duration}
        showSearch={true}
        searchLabel="BIW No."
        searchPlaceholder="Search BIW No..."
        searchValue={biwSearch}
        onSearchValueChange={(val) => { setBiwSearch(val); setAppliedBIW(val); }}
      />

      {/* Content */}
      {!hasSearched ? (
        <EmptyState title="Select filters and click Search to view  Sealant Camera data" />
      ) : showLoader ? (
        <TableShimmer rows={10} />
      ) : !selectedStation ? (
        <EmptyState title="No station available for the selected Area/Line." />
      ) : filteredData.length === 0 ? (
        <NoDataState />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-gray-200 gap-3">
            <h2 className="text-base font-bold text-slate-700">
              Sealant Camera Result Inspection Results
              <span className="ml-2 text-slate-400 font-normal">({filteredData.length} records)</span>
            </h2>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${filteredData.filter(item => item.Result === "OK").length > 0
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-500"
                }`}>
                OK: {filteredData.filter(item => item.Result === "OK").length}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${filteredData.filter(item => item.Result === "NOK").length > 0
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-500"
                }`}>
                NOK: {filteredData.filter(item => item.Result === "NOK").length}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <DataTable
              data={filteredData}
              columns={getColumns(handleNOKClick)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SealantCameraResult;