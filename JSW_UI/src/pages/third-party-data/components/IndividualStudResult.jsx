import { useState, useMemo, useEffect, useRef } from "react";
import { Image, X, ZoomIn, Download } from "lucide-react";
import DataTable from "../../../sharedComponents/DataTable";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../sharedComponents/FilterBar";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import {
  formatStationName,
  formatClusterName,
} from "../../../utils/Formatters";
import { masterApi } from "../../../services/api";
import appConfig from "../../../config/appConfig";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import StudResultImage from "../../../assets/StudResultImage.png";
import { generateExcel } from "../../../utils/ExcelUtils";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../utils/PdfUtils";

const SHIFTS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: s.label ?? `Shift ${s.value}` },
);

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];
const RESULTS = ["OK", "NOK"];
const RESULT_OPTIONS = RESULTS.map((r) => ({ value: r, label: r }));

const EXPORT_COLS = [
  { key: "srNo", label: "Sr. No." },
  { key: "Date", label: "Date", type: "mono" },
  { key: "Timestamp", label: "Timestamp", type: "mono" },
  { key: "Shift", label: "Shift", type: "shift" },
  { key: "Area", label: "Area" },
  { key: "Line", label: "Line" },
  { key: "Station", label: "Station" },
  { key: "StudId", label: "Stud ID" },
  { key: "CabinNo", label: "BIW No.", type: "primary" },
  { key: "Equipment", label: "Equipment" },
  { key: "Result", label: "Result", type: "result" },
];

function getResultPdfColors(result) {
  if (result === "OK") return { fill: [220, 252, 231], text: [22, 101, 52], border: [134, 239, 172] }; // green-100 / green-800 / green-300
  if (result === "NOK") return { fill: [254, 226, 226], text: [153, 27, 27], border: [252, 165, 165] }; // red-100 / red-800 / red-300
  return null;
}

async function downloadExcel(data, dateFilter) {
  const headers = EXPORT_COLS.map((c) => ({ label: c.label, accessor: c.key }));
  const rows = data.map((item, i) => ({
    srNo: i + 1,
    Date: item.Date,
    Timestamp: item.Timestamp,
    Shift: item.Shift,
    Area: item.AreaName,
    Line: item.LineName,
    Station: item.StationName,
    StudId: item.StudId,
    CabinNo: item.StudNo,
    Equipment: item.RobotName,
    Result: item.Result,
  }));

  generateExcel(
    headers,
    rows,
    `Individual_Stud_${dateFilter?.startDate ?? "from"}_to_${dateFilter?.endDate ?? "to"}`,
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
    `Area: ${filters.area || "All"}   |   Line: ${filters.line || "All"}   |   Station: ${filters.station || "All"}   |   Equipment: ${filters.equipment || "All"}   |   Shift: ${filters.shift || "All"}   |   Result: ${filters.result || "All"}`,
  ];

  function drawPageChrome(pageNum, totalPages) {
    drawPdfPageChrome(doc, {
      pageNum,
      totalPages,
      fontFamily: FONT,
      title: "Individual Stud Result Inspection Report",
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
    Area: item.AreaName,
    Line: item.LineName,
    Station: item.StationName,
    StudId: item.StudId,
    CabinNo: item.StudNo,
    Equipment: item.RobotName,
    Result: item.Result,
  }));

  const baseConfig = buildAutoTableConfig(EXPORT_COLS, pdfData, doc, FONT);
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

  doc.save(`Individual_Stud_${from}_to_${to}.pdf`);
}

const buildColumns = (onNOKClick) => [
  { key: "sr", label: "Sr. No." },
  { key: "Date", label: "Date", sortable: true },
  { key: "Timestamp", label: "Timestamp", sortable: true },
  { key: "Shift", label: "Shift", type: "shift", sortable: true },
  { key: "AreaName", label: "Area", sortable: true },
  { key: "LineName", label: "Line", sortable: true },
  { key: "StationName", label: "Station", sortable: true },
  { key: "StudId", label: "Stud ID", sortable: true },
  { key: "StudNo", label: "BIW No.", sortable: true },
  { key: "RobotName", label: "Equipment", sortable: true },
  {
    key: "Result",
    label: "Result",
    sortable: true,
    render: (row) => (
      <span
        onClick={() => row.Result === "NOK" && onNOKClick(row)}
        className={`px-3 py-1 rounded-full font-bold cursor-pointer text-sm ${row.Result === "OK"
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-red-100 text-red-800 border border-red-300"
          }`}
      >
        {row.Result}
      </span>
    ),
  },
];

function generateDummyData(masterData) {
  const data = [];
  const date = "2026-06-01";
  const resultsPool = [
    "OK",
    "OK",
    "OK",
    "OK",
    "OK",
    "OK",
    "OK",
    "NOK",
    "NOK",
    "NOK",
  ];
  let idx = 0;

  for (const cluster of masterData) {
    for (const line of cluster.Lines ?? []) {
      const validStations = (line.Stations ?? []).filter(
        (s) => s.StationName !== line.LineName,
      );
      for (const station of validStations) {
        const validRobots = (station.SubStations ?? []).filter(
          (r) => r.SubStationName !== station.StationName,
        );
        for (const robot of validRobots) {
          for (const shift of ["A", "B", "C"]) {
            for (let r = 0; r < 3; r++) {
              const hour =
                shift === "A"
                  ? Math.floor(Math.random() * 8) + 6
                  : shift === "B"
                    ? Math.floor(Math.random() * 8) + 14
                    : Math.floor(Math.random() * 8) + 22;
              const minute = Math.floor(Math.random() * 60);
              const second = Math.floor(Math.random() * 60);
              const timestamp = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
              const result =
                resultsPool[Math.floor(Math.random() * resultsPool.length)];

              data.push({
                ClusterId: String(cluster.ClusterId),
                LineId: String(line.LineId),
                StationId: String(station.StationId),
                RobotId: String(robot.SubStationId),
                AreaName: formatClusterName(cluster.ClusterName),
                LineName: line.LineName,
                StationName: formatStationName(station.StationName),
                RobotName: robot.SubStationName,
                Shift: shift,
                Date: date,
                Timestamp: timestamp,
                Result: result,
                StudId: `STD20260601${String(idx % 1000).padStart(4, "0")}`,
                StudNo: String(5005497 + idx),
              });
              idx++;
            }
          }
        }
      }
    }
  }

  return data.sort((a, b) => a.Timestamp.localeCompare(b.Timestamp));
}

const parseLineOptions = (masterData, clusterId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === clusterId);
  return (cluster?.Lines ?? []).map((l) => ({
    value: String(l.LineId),
    label: l.LineName,
  }));
};

const parseStationOptions = (masterData, clusterId, lineId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === clusterId);
  const line = (cluster?.Lines ?? []).find((l) => String(l.LineId) === lineId);
  return (line?.Stations ?? [])
    .filter((s) => s.StationName !== line?.LineName)
    .map((s) => ({
      value: String(s.StationId),
      label: formatStationName(s.StationName),
    }));
};

const parseRobotOptions = (masterData, clusterId, lineId, stationId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === clusterId);
  const line = (cluster?.Lines ?? []).find((l) => String(l.LineId) === lineId);
  const station = (line?.Stations ?? []).find(
    (s) => String(s.StationId) === stationId,
  );
  return (station?.SubStations ?? [])
    .filter((r) => r.SubStationName !== station?.StationName)
    .map((r) => ({ value: String(r.SubStationId), label: r.SubStationName }));
};

export default function IndividualStudResult({
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

  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState(null);

  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedRobot, setSelectedRobot] = useState("");
  const [selectedShifts, setSelectedShifts] = useState(["A"]);
  const [selectedResult, setSelectedResult] = useState("OK");

  const [biwSearch, setBiwSearch] = useState("");
  const [appliedBIW, setAppliedBIW] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setMasterLoading(true);
    masterApi
      .getMasterData()
      .then((res) => {
        const list = res?.data ?? res ?? [];
        setMasterData(list);
        const firstCluster = list[0];
        if (!firstCluster) return;
        let cId = String(firstCluster.ClusterId);
        if (targetFilters?.areaId || targetFilters?.area) {
          const matchArea = list.find(
            (c) =>
              String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
              String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
          );
          if (matchArea) cId = String(matchArea.ClusterId);
        }

        const clusterObj = list.find((c) => String(c.ClusterId) === cId) || firstCluster;
        const firstLine = (clusterObj.Lines ?? [])[0];
        let lId = firstLine ? String(firstLine.LineId) : "";
        if (targetFilters?.lineId || targetFilters?.line) {
          const matchLine = (clusterObj.Lines ?? []).find(
            (l) =>
              String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
              String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
          );
          if (matchLine) lId = String(matchLine.LineId);
        }

        const lineObj = (clusterObj.Lines ?? []).find((l) => String(l.LineId) === lId) || firstLine;
        const validStations = (lineObj?.Stations ?? []).filter(
          (s) => s.StationName !== lineObj?.LineName,
        );
        const firstStation = validStations[0];
        let sId = firstStation ? String(firstStation.StationId) : "";
        if (targetFilters?.stationId || targetFilters?.station) {
          const matchStation = validStations.find(
            (s) =>
              String(s.StationId) === String(targetFilters.stationId || targetFilters.station) ||
              String(s.StationName).toLowerCase() === String(targetFilters.station).toLowerCase(),
          );
          if (matchStation) sId = String(matchStation.StationId);
        }

        const stationObj = validStations.find((s) => String(s.StationId) === sId) || validStations[0];
        const validRobots = (stationObj?.SubStations ?? []).filter(
          (r) => r.SubStationName !== stationObj?.StationName,
        );
        const firstRobot = validRobots[0];
        let rId = firstRobot ? String(firstRobot.SubStationId) : "";
        if (targetFilters?.robotId || targetFilters?.robot) {
          const matchRobot = validRobots.find(
            (r) =>
              String(r.SubStationId) === String(targetFilters.robotId || targetFilters.robot) ||
              String(r.SubStationName).toLowerCase() === String(targetFilters.robot).toLowerCase(),
          );
          if (matchRobot) rId = String(matchRobot.SubStationId);
        }

        setSelectedArea(cId);
        setSelectedLine(lId);
        setSelectedStation(sId);
        setSelectedRobot(rId);

        if (targetFilters?.shifts) {
          setSelectedShifts(Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts]);
        } else if (targetFilters?.shift) {
          setSelectedShifts([targetFilters.shift]);
        }
      })
      .catch((err) =>
        setMasterError(err.message || "Failed to load master data"),
      )
      .finally(() => setMasterLoading(false));
  }, [targetFilters]);

  const areaOptions = useMemo(
    () =>
      masterData.map((c) => ({
        value: String(c.ClusterId),
        label: formatClusterName(c.ClusterName),
      })),
    [masterData],
  );

  const lineOptions = useMemo(
    () => parseLineOptions(masterData, selectedArea),
    [masterData, selectedArea],
  );

  const stationOptions = useMemo(
    () => parseStationOptions(masterData, selectedArea, selectedLine),
    [masterData, selectedArea, selectedLine],
  );

  const robotOptions = useMemo(
    () =>
      parseRobotOptions(
        masterData,
        selectedArea,
        selectedLine,
        selectedStation,
      ),
    [masterData, selectedArea, selectedLine, selectedStation],
  );
  const handleAreaChange = (cId) => {
    setSelectedArea(cId);
    const lines = parseLineOptions(masterData, cId);
    const firstLine = lines[0];
    const lId = firstLine?.value ?? "";
    setSelectedLine(lId);

    const stations = parseStationOptions(masterData, cId, lId);
    const firstStation = stations[0];
    const sId = firstStation?.value ?? "";
    setSelectedStation(sId);

    const robots = parseRobotOptions(masterData, cId, lId, sId);
    setSelectedRobot(robots[0]?.value ?? "");
  };

  const handleLineChange = (lId) => {
    setSelectedLine(lId);
    const stations = parseStationOptions(masterData, selectedArea, lId);
    const firstStation = stations[0];
    const sId = firstStation?.value ?? "";
    setSelectedStation(sId);

    const robots = parseRobotOptions(masterData, selectedArea, lId, sId);
    setSelectedRobot(robots[0]?.value ?? "");
  };

  const handleStationChange = (sId) => {
    setSelectedStation(sId);
    const robots = parseRobotOptions(
      masterData,
      selectedArea,
      selectedLine,
      sId,
    );
    setSelectedRobot(robots[0]?.value ?? "");
  };

  const dummyData = useMemo(
    () => (masterData.length ? generateDummyData(masterData) : []),
    [masterData],
  );

  const filteredData = useMemo(() => {
    let filtered = [...dummyData];

    if (selectedArea)
      filtered = filtered.filter((r) => r.ClusterId === selectedArea);
    if (selectedLine)
      filtered = filtered.filter((r) => r.LineId === selectedLine);
    if (selectedStation)
      filtered = filtered.filter((r) => r.StationId === selectedStation);
    if (selectedRobot)
      filtered = filtered.filter((r) => r.RobotId === selectedRobot);
    if (!selectedShifts.includes("All")) {
      filtered = filtered.filter((r) => selectedShifts.includes(r.Shift));
    }
    filtered = filtered.filter((r) => r.Result === selectedResult);

    if (dateFilter.startDate && dateFilter.endDate) {
      filtered = filtered.filter(
        (r) => r.Date >= dateFilter.startDate && r.Date <= dateFilter.endDate,
      );
    }

    if (appliedBIW.trim()) {
      filtered = filtered.filter((r) =>
        String(r.StudNo).toLowerCase().includes(appliedBIW.trim().toLowerCase()),
      );
    }

    return filtered;
  }, [
    dummyData,
    selectedArea,
    selectedLine,
    selectedStation,
    selectedRobot,
    selectedShifts,
    selectedResult,
    dateFilter,
    appliedBIW,
  ]);

  const handleSearch = (startDate, endDate) => {
    setHasSearched(true);
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1500);
    setDateFilter({ startDate, endDate });
    setAppliedBIW(biwSearch);
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const areaLabel =
        areaOptions.find((o) => o.value === selectedArea)?.label || "All";
      const lineLabel =
        lineOptions.find((o) => o.value === selectedLine)?.label || "All";
      const stationLabel =
        stationOptions.find((o) => o.value === selectedStation)?.label ||
        "All";
      const equipmentLabel =
        robotOptions.find((o) => o.value === selectedRobot)?.label || "All";

      await Promise.all([
        downloadPDF(filteredData, dateFilter, {
          area: areaLabel,
          line: lineLabel,
          station: stationLabel,
          equipment: equipmentLabel,
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
      cabinNo: row.StudNo,
      result: row.Result,
      date: row.Date,
      timestamp: row.Timestamp,
      area: row.AreaName,
      line: row.LineName,
      station: row.StationName,
      imageUrl: StudResultImage,
      path: `${row.AreaName} > ${row.LineName} > ${row.StationName}`,
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
      link.download = `${selectedImage.cabinNo}_stud.jpg`;
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
  const okCount = filteredData.filter((r) => r.Result === "OK").length;
  const nokCount = filteredData.filter((r) => r.Result === "NOK").length;
  const filterConfig = [
    { key: "area", label: "Area", type: "select", options: areaOptions },
    { key: "line", label: "Line", type: "select", options: lineOptions },
    { key: "station", label: "Station", type: "select", options: stationOptions },
    { key: "robot", label: "Equipment", type: "select", options: robotOptions },
    {
      key: "shifts",
      label: "Shift",
      type: "select",
      multiple: true,
      searchable: false,
      options: SHIFTS,
    },
    { key: "result", label: "Result", type: "select", options: RESULT_OPTIONS },
  ];

  const filterValues = {
    area: selectedArea,
    line: selectedLine,
    station: selectedStation,
    robot: selectedRobot,
    shifts: selectedShifts,
    result: selectedResult,
  };

  const handleFilterChange = (updated) => {
    if (updated.area !== selectedArea) {
      handleAreaChange(updated.area);
    } else if (updated.line !== selectedLine) {
      handleLineChange(updated.line);
    } else if (updated.station !== selectedStation) {
      handleStationChange(updated.station);
    } else if (updated.robot !== selectedRobot) {
      setSelectedRobot(updated.robot);
    } else if (updated.result !== selectedResult) {
      setSelectedResult(updated.result);
    }

    const prevShifts = selectedShifts;
    let nextShifts = updated.shifts ?? prevShifts;
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
  };

  if (masterLoading) return <TableShimmer rows={8} />;
  if (masterError)
    return (
      <div className="p-6 text-center text-red-500 text-sm">{masterError}</div>
    );

  return (
    <>
      {imageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-sky-700 text-white px-4 py-3 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <Image size={20} />
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    Stud Inspection Image — {selectedImage.result}
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
                    e.target.src = StudResultImage;
                  }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "BIW No.", value: selectedImage.cabinNo },
                  {
                    label: "Result",
                    value: selectedImage.result,
                    isResult: true,
                  },
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

      <div className="p-4 space-y-4">
        <div className="mb-4">
          <FilterBar
            config={filterConfig}
            filters={filterValues}
            onChange={handleFilterChange}
          // withContainer={false}
          />
        </div>
        <DateRangeBar
          onSearch={handleSearch}
          showDownload
          onDownload={handleDownload}
          isDownloading={isDownloading}
          reportName="Individual_Stud_Result"
          showDateInputs
          selectedStartDate={dateFilter.startDate}
          selectedEndDate={dateFilter.endDate}
          showSearch
          searchLabel="BIW No."
          searchPlaceholder="Search BIW No..."
          searchValue={biwSearch}
          onSearchValueChange={(val) => {
            setBiwSearch(val);
            setAppliedBIW(val);
          }}
        />

        {/* Content */}
        {!hasSearched ? (
          <EmptyState title="Select filters and click Search to view  Individual Stud OK and NOK Results" />
        ) : showLoader ? (
          <TableShimmer rows={10} />
        ) : filteredData.length === 0 ? (
          <NoDataState />
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-gray-200 gap-3">
              <h2 className="text-base font-bold text-slate-700">
                Individual Stud Inspection Results
                <span className="ml-2 text-slate-400 font-normal">
                  ({filteredData.length} records)
                </span>
              </h2>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${okCount > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}
                >
                  OK: {okCount}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${nokCount > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-500"}`}
                >
                  NOK: {nokCount}
                </span>
              </div>
            </div>
            <DataTable
              data={filteredData}
              columns={buildColumns(handleNOKClick)}
              title="Stud Inspection Records"
            />
          </div>
        )}
      </div>
    </>
  );
}