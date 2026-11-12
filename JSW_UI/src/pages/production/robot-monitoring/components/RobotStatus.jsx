import { useState, useEffect, useMemo } from "react";
import { TableShimmer } from "../../../../sharedComponents/Shimmer";
import FilterBar from "../../../../sharedComponents/FilterBar";
import DataTable from "../../../../sharedComponents/DataTable";
import DateRangeSelector from "../../../../sharedComponents/DateRangeBar";
import EmptyState, { SearchPromptState, NoDataState } from "../../../../sharedComponents/EmptyState";
import { masterApi, robotStatusApi } from "../../../../services/api";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import { formatClusterName } from "../../../../utils/Formatters";
import {
  buildAutoTableConfig,
  drawPdfPageChrome,
  loadBrandingLogos,
  loadKarlaFont,
} from "../../../../utils/PdfUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateExcel } from "../../../../utils/ExcelUtils";

const PAGE_NAME = "Robot Status";

const COLUMNS = [
  { label: "Sr. No.", key: "sr" },
  { label: "Area", key: "Area", sortable: true },
  { label: "Line", key: "Line", sortable: true },
  { label: "Station", key: "Station", sortable: true },
  { label: "Robot ID", key: "RobotID", sortable: true },
  { label: "Timestamp", key: "Timestamp", sortable: true, type: "mono" },
  { label: "Status", key: "Status", sortable: true },
];

const formatTimestamp = (row) => {
  if (row.Timestamp) {
    return row.Timestamp.replace("T", " ").replace(/\.\d+Z$/, "");
  }
  if (row.Date && row.Time) return `${row.Date} ${row.Time}`;
  return "";
};

// Normalizes a timestamp/date value down to just "YYYY-MM-DD"
const toDateOnly = (value) => {
  if (!value) return "";
  return String(value).split("T")[0].split(" ")[0];
};

// Checks whether a row's date falls within the selected [startDate, endDate] range
const isWithinDateRange = (row, startDate, endDate) => {
  if (!startDate || !endDate) return true;
  const rowDate = row.Date ? toDateOnly(row.Date) : toDateOnly(row.Timestamp);
  if (!rowDate) return false;
  return rowDate >= startDate && rowDate <= endDate;
};

const matchesFilters = (row, filters, selectedRobotName, startDate, endDate) => {
  if (filters.area && String(row.AreaId) !== String(filters.area)) return false;
  if (filters.line && String(row.LineId) !== String(filters.line)) return false;
  if (filters.station && String(row.StationId) !== String(filters.station)) return false;
  if (
    selectedRobotName &&
    (row.RobotName || "").trim().toLowerCase() !== selectedRobotName.trim().toLowerCase()
  ) {
    return false;
  }
  if (!isWithinDateRange(row, startDate, endDate)) return false;
  return true;
};

const mapApiRow = (row, index, masterData) => {
  const cluster = masterData.find(
    (c) => String(c.ClusterId) === String(row.AreaId)
  );
  const areaName = formatClusterName(cluster?.ClusterName);

  return {
    sr: index + 1,
    Area: areaName,
    Line: row.LineName || "-",
    Station: row.StationName || "-",
    RobotID: row.RobotName || "-",
    Timestamp: formatTimestamp(row),
    Status: row.Status || "Unknown",
  };
};

const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const parseClusterOptions = (masterData = []) =>
  masterData.map((c) => ({
    value: String(c.ClusterId),
    label: formatClusterName(c.ClusterName),
    raw: c,
  }));

const parseLineOptions = (masterData = [], clusterId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === String(clusterId));
  return (cluster?.Lines ?? []).map((l) => ({
    value: String(l.LineId),
    label: (l.LineName || "").trim(),
    raw: l,
  }));
};

const parseStationOptions = (masterData = [], clusterId, lineId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === String(clusterId));
  const line = (cluster?.Lines ?? []).find((l) => String(l.LineId) === String(lineId));
  return (line?.Stations ?? [])
    .filter((s) => s.StationName !== line?.LineName)
    .map((s) => ({
      value: String(s.StationId),
      label: (s.StationName || "").trim(),
      raw: s,
    }));
};

const ROBOT_NAME_PATTERN = /RB\d+/i;

const parseRobotOptions = (masterData = [], clusterId, lineId, stationId) => {
  const cluster = masterData.find((c) => String(c.ClusterId) === String(clusterId));
  const line = (cluster?.Lines ?? []).find((l) => String(l.LineId) === String(lineId));
  const station = (line?.Stations ?? []).find((s) => String(s.StationId) === String(stationId));

  const robots = (station?.SubStations ?? [])
    .map((r) => ({ ...r, SubStationName: (r.SubStationName || "").trim() }))
    .filter(
      (r) => r.Type === "Equipment" && ROBOT_NAME_PATTERN.test(r.SubStationName)
    );

  const seenNames = new Set();
  const deduped = robots.filter((r) => {
    if (seenNames.has(r.SubStationName)) return false;
    seenNames.add(r.SubStationName);
    return true;
  });

  return deduped.map((r) => ({
    value: String(r.SubStationId),
    label: r.SubStationName,
    raw: r,
  }));
};

const RobotStatus = ({
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

  const today = getToday();

  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState("");
  const [filters, setFilters] = useState({ area: "", line: "", station: "", robot: "" });
  const [startDate, setStartDate] = useState(targetDateRange?.start || targetDateRange?.startDate || today);
  const [endDate, setEndDate] = useState(targetDateRange?.end || targetDateRange?.endDate || today);
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync date range in background mode
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setStartDate(s);
      setEndDate(e);
      setHasSearched(true);
    }
  }, [isBg, targetDateRange]);

  useEffect(() => {
    setMasterLoading(true);
    masterApi
      .getMasterData()
      .then((res) => {
        const list = res?.data ?? res ?? [];
        const cluster1 = list.find((c) => c.ClusterId === 1);
        const patched = list.map((c) =>
          c.ClusterId !== 1 && (!c.Lines || c.Lines.length === 0)
            ? { ...c, Lines: cluster1?.Lines ?? [] }
            : c
        );

        setMasterData(patched);

        const firstCluster = patched[0];
        const cId = firstCluster ? String(firstCluster.ClusterId) : "";
        const firstLine = firstCluster?.Lines?.[0];
        const lId = firstLine ? String(firstLine.LineId) : "";
        const validStations = (firstLine?.Stations ?? []).filter((s) => s.StationName !== firstLine?.LineName);
        const firstStation = validStations[0];
        const sId = firstStation ? String(firstStation.StationId) : "";
        const validRobots = (firstStation?.SubStations ?? [])
          .map((r) => ({ ...r, SubStationName: (r.SubStationName || "").trim() }))
          .filter(
            (r) => r.Type === "Equipment" && ROBOT_NAME_PATTERN.test(r.SubStationName)
          );
        const firstRobot = validRobots[0];
        const rId = firstRobot ? String(firstRobot.SubStationId) : "";

        if (targetFilters) {
          let matchedCId = "";
          let matchedLId = "";
          let matchedSId = "";
          let matchedRId = "";

          for (const cluster of patched) {
            const areaMatches =
              !targetFilters.area && !targetFilters.areaId
                ? true
                : String(cluster.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                  String(cluster.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase();
            if (areaMatches) {
              matchedCId = String(cluster.ClusterId);
              for (const line of cluster.Lines ?? []) {
                const lineMatches =
                  !targetFilters.line && !targetFilters.lineId
                    ? true
                    : String(line.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                      String(line.LineName).toLowerCase() === String(targetFilters.line).toLowerCase();
                if (lineMatches) {
                  matchedLId = String(line.LineId);
                  for (const st of line.Stations ?? []) {
                    const stMatches =
                      !targetFilters.station && !targetFilters.stationId
                        ? true
                        : targetFilters.station === "All" || targetFilters.stationId === "All"
                        ? true
                        : String(st.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                          String(st.StationName).toLowerCase() === String(targetFilters.station).toLowerCase();
                    if (stMatches) {
                      matchedSId = String(st.StationId);
                      for (const sub of st.SubStations ?? []) {
                        const subMatches =
                          !targetFilters.robot && !targetFilters.robotId
                            ? true
                            : targetFilters.robot === "All" || targetFilters.robotId === "All"
                            ? true
                            : String(sub.SubStationId) === String(targetFilters.robotId || targetFilters.robot) ||
                              String(sub.SubStationName).toLowerCase() === String(targetFilters.robot).toLowerCase();
                        if (subMatches) {
                          matchedRId = String(sub.SubStationId);
                          break;
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              }
              break;
            }
          }

          setFilters({
            area: matchedCId || cId,
            line: matchedLId || lId,
            station: matchedSId || sId,
            robot: matchedRId || rId,
          });
          setHasSearched(true);
        } else {
          setFilters({ area: cId, line: lId, station: sId, robot: rId });
        }
      })
      .catch((err) => setMasterError(err.message || "Failed to load master data"))
      .finally(() => setMasterLoading(false));
  }, []);

  const areaOptions = parseClusterOptions(masterData);
  const lineOptions = parseLineOptions(masterData, filters.area);
  const stationOptions = parseStationOptions(masterData, filters.area, filters.line);
  const robotOptions = parseRobotOptions(masterData, filters.area, filters.line, filters.station);

  const fetchReport = async (start, end, currentFilters) => {
    setTableLoading(true);
    setTableError("");
    try {
      const res = await robotStatusApi.report({
        AreaId: currentFilters.area,
        LineId: currentFilters.line,
        StationId: currentFilters.station,
        RobotId: currentFilters.robot,
        StartDate: start,
        EndDate: end,
      });
      const rawRows = res?.data ?? res ?? [];
      const currentRobotOptions = parseRobotOptions(
        masterData,
        currentFilters.area,
        currentFilters.line,
        currentFilters.station
      );
      const selectedRobotName =
        currentRobotOptions.find((o) => o.value === currentFilters.robot)?.label || "";
      const filtered = rawRows.filter((row) =>
        matchesFilters(row, currentFilters, selectedRobotName, start, end)
      );

      setTableData(filtered.map((row, i) => mapApiRow(row, i, masterData)));
    } catch (err) {
      setTableError(err.message || "Failed to load robot status data");
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  const handleFilterChange = (updated) => {
    if (updated.area !== filters.area) {
      const lines = parseLineOptions(masterData, updated.area);
      const lId = lines[0]?.value ?? "";
      const stations = parseStationOptions(masterData, updated.area, lId);
      const sId = stations[0]?.value ?? "";
      const robots = parseRobotOptions(masterData, updated.area, lId, sId);
      const rId = robots[0]?.value ?? "";
      setFilters({ area: updated.area, line: lId, station: sId, robot: rId });
      setHasSearched(false);
      return;
    }
    if (updated.line !== filters.line) {
      const stations = parseStationOptions(masterData, filters.area, updated.line);
      const sId = stations[0]?.value ?? "";
      const robots = parseRobotOptions(masterData, filters.area, updated.line, sId);
      const rId = robots[0]?.value ?? "";
      setFilters((f) => ({ ...f, line: updated.line, station: sId, robot: rId }));
      setHasSearched(false);
      return;
    }
    if (updated.station !== filters.station) {
      const robots = parseRobotOptions(masterData, filters.area, filters.line, updated.station);
      const rId = robots[0]?.value ?? "";
      setFilters((f) => ({ ...f, station: updated.station, robot: rId }));
      setHasSearched(false);
      return;
    }
    if (updated.robot !== filters.robot) {
      setFilters((f) => ({ ...f, robot: updated.robot }));
      setHasSearched(false);
    }
  };
  

  const filterConfig = [
    { type: "select", key: "area", label: "Area", options: areaOptions },
    { type: "select", key: "line", label: "Line", options: lineOptions },
    { type: "select", key: "station", label: "Station", options: stationOptions },
    { type: "select", key: "robot", label: "Robot", options: robotOptions },
  ];

  const handleSearch = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setHasSearched(true);
  };

  useEffect(() => {
    if (!hasSearched) return;
    fetchReport(startDate, endDate, filters);
  }, [filters.area, filters.line, filters.station, filters.robot, startDate, endDate, hasSearched]);

  const excelHeaders = COLUMNS.map((item) => ({
    label: item.label,
    accessor: item.key,
  }));

  const exportFileBase = `Robot_Status_Report_${startDate}_to_${endDate}`;
  const selectedAreaLabel = areaOptions.find((o) => o.value === filters.area)?.label ?? "-";
  const selectedLineLabel = lineOptions.find((o) => o.value === filters.line)?.label ?? "-";
  const selectedStationLabel = stationOptions.find((o) => o.value === filters.station)?.label ?? "-";
  const selectedRobotLabel = robotOptions.find((o) => o.value === filters.robot)?.label ?? "-";

  function handleDownloadExcel() {
    generateExcel(excelHeaders, tableData, exportFileBase);
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

      const subLines = [
        `Date Range: ${startDate} to ${endDate}`,
        `Area: ${selectedAreaLabel}  |  Line: ${selectedLineLabel}  |  Station: ${selectedStationLabel}  |  Robot: ${selectedRobotLabel}`,
        `Total Records: ${tableData.length}`,
      ];

      const autoTableConfig = buildAutoTableConfig(COLUMNS, tableData, doc, font);

      autoTable(doc, {
        ...autoTableConfig,
        startY: 65,
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: pageCount,
          fontFamily: font,
          title: "Robot Status Report",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${exportFileBase}.pdf`);
    } catch (err) {
      console.error("Robot status PDF export failed:", err);
    }
  }

  async function handleDownload() {
    if (!tableData.length && !isBg) return;
    setIsDownloading(true);
    try {
      handleDownloadExcel();
      await handleDownloadPdf();
    } finally {
      setIsDownloading(false);
    }
  }

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || masterLoading || tableLoading || bgTriggeredRef.current) return;
    if (tableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, masterLoading, tableLoading, tableData.length, hasSearched]);

  if (masterLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-8 text-center text-gray-400">
        Loading filters...
      </div>
    );
  }

  if (masterError) {
    return <EmptyState color="red" title={masterError} />;
  }

  return (
    <>
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />

      <DateRangeSelector
        reportName="Robot_Status"
        showTime={false}
        showDownload={true}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

      {!hasSearched ? (
        <SearchPromptState pageName={PAGE_NAME} />
      ) : tableLoading ? (
        <TableShimmer />
      ) : tableError ? (
        <EmptyState color="red" title={tableError} />
      ) : tableData.length === 0 ? (
        <NoDataState />
      ) : (
        <DataTable
          data={tableData}
          columns={COLUMNS}
          title="Records"
        />
      )}
    </>
  );
};

export default RobotStatus;