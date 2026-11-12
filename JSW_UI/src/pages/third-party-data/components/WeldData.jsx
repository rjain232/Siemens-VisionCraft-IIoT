import { useState, useEffect, useMemo, useRef } from "react";
import { masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import appConfig from "../../../config/appConfig";
import DataTable from "../../../sharedComponents/DataTable";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import { NoDataState, SearchPromptState } from "../../../sharedComponents/EmptyState";
import {
  buildAutoTableConfig,
  drawPdfPageChrome,
  loadBrandingLogos,
  loadKarlaFont,
} from "../../../utils/PdfUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateExcel } from "../../../utils/ExcelUtils";
import { formatClusterName } from "../../../utils/Formatters";

const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: s.label ?? `Shift ${s.value}` },
);

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

export default function WeldData({
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
  const [filters, setFilters] = useState({
    area: "",
    line: "",
    station: "",
    substation: "",
    shifts: ["A"],
  });
  const [appliedBIW, setAppliedBIW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Sync date range in background mode
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateRange({ from: s, to: e });
      setHasSearched(true);
    }
  }, [isBg, targetDateRange]);

  // ── Helpers to walk the master hierarchy and grab the first child at each level ──
  const firstLineOf = (cluster) => (cluster?.Lines ?? [])[0] ?? null;
  const firstStationOf = (line) => (line?.Stations ?? [])[0] ?? null;
  const firstSubStationOf = (station) => (station?.SubStations ?? [])[0] ?? null;

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        const firstCluster = clusters[0];
        const firstLine = firstLineOf(firstCluster);
        const firstStation = firstStationOf(firstLine);
        const firstSub = firstSubStationOf(firstStation);

        if (targetFilters) {
          let matchedArea = "";
          let matchedLine = "";
          let matchedStation = "";
          let matchedSub = "";

          for (const cluster of clusters) {
            const areaMatches =
              !targetFilters.area && !targetFilters.areaId
                ? true
                : String(cluster.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
                  String(cluster.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase();
            if (areaMatches) {
              matchedArea = String(cluster.ClusterId);
              for (const line of cluster.Lines ?? []) {
                const lineMatches =
                  !targetFilters.line && !targetFilters.lineId
                    ? true
                    : String(line.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                      String(line.LineName).toLowerCase() === String(targetFilters.line).toLowerCase();
                if (lineMatches) {
                  matchedLine = String(line.LineId);
                  for (const st of line.Stations ?? []) {
                    const stMatches =
                      !targetFilters.station && !targetFilters.stationId
                        ? true
                        : targetFilters.station === "All" || targetFilters.stationId === "All"
                        ? true
                        : String(st.StationId) === String(targetFilters.stationId || targetFilters.station) ||
                          String(st.StationName).toLowerCase() === String(targetFilters.station).toLowerCase();
                    if (stMatches) {
                      matchedStation = String(st.StationId);
                      for (const sub of st.SubStations ?? []) {
                        const subMatches =
                          !targetFilters.equipment && !targetFilters.equipmentId && !targetFilters.substation
                            ? true
                            : targetFilters.equipment === "All" || targetFilters.substation === "All"
                            ? true
                            : String(sub.SubStationId) === String(targetFilters.equipmentId || targetFilters.equipment || targetFilters.substation) ||
                              String(sub.SubStationName).toLowerCase() === String(targetFilters.equipment || targetFilters.substation).toLowerCase();
                        if (subMatches) {
                          matchedSub = String(sub.SubStationId);
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

          let shifts = ["A"];
          if (targetFilters.shifts) {
            shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
          } else if (targetFilters.shift) {
            shifts = targetFilters.shift === "All" ? ["All"] : [targetFilters.shift];
          }

          setFilters({
            area: matchedArea || (firstCluster ? String(firstCluster.ClusterId) : ""),
            line: matchedLine || (firstLine ? String(firstLine.LineId) : ""),
            station: matchedStation || (firstStation ? String(firstStation.StationId) : ""),
            substation: matchedSub || (firstSub ? String(firstSub.SubStationId) : ""),
            shifts,
          });
          setHasSearched(true);
        } else {
          setFilters((prev) => ({
            ...prev,
            area: firstCluster ? String(firstCluster.ClusterId) : "",
            line: firstLine ? String(firstLine.LineId) : "",
            station: firstStation ? String(firstStation.StationId) : "",
            substation: firstSub ? String(firstSub.SubStationId) : "",
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

  const lineOptions = useMemo(
    () =>
      (selectedCluster?.Lines ?? []).map((line) => ({
        value: String(line.LineId),
        label: line.LineName,
      })),
    [selectedCluster],
  );

  const selectedLineObj = useMemo(
    () =>
      (selectedCluster?.Lines ?? []).find(
        (line) => String(line.LineId) === filters.line,
      ) ?? null,
    [selectedCluster, filters.line],
  );

  const stationOptions = useMemo(
    () =>
      (selectedLineObj?.Stations ?? []).map((station) => ({
        value: String(station.StationId),
        label: station.StationName,
      })),
    [selectedLineObj],
  );

  const selectedStationObj = useMemo(
    () =>
      (selectedLineObj?.Stations ?? []).find(
        (station) => String(station.StationId) === filters.station,
      ) ?? null,
    [selectedLineObj, filters.station],
  );

  const substationOptions = useMemo(
    () =>
      (selectedStationObj?.SubStations ?? []).map((sub) => ({
        value: String(sub.SubStationId),
        label: sub.SubStationName,
      })),
    [selectedStationObj],
  );

  const selectedAreaLabel = useMemo(
    () => areaOptions.find((o) => o.value === filters.area)?.label ?? "-",
    [areaOptions, filters.area],
  );

  const selectedLineLabel = useMemo(
    () => lineOptions.find((o) => o.value === filters.line)?.label ?? "-",
    [lineOptions, filters.line],
  );

  const selectedStationLabel = useMemo(
    () =>
      stationOptions.find((o) => o.value === filters.station)?.label ?? "-",
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
        options: SHIFT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions, stationOptions],
  );

  function handleFilterChange(newFilters) {
    if (newFilters.area !== filters.area) {
      const selCluster = masterClusters.find(
        (c) => String(c.ClusterId) === newFilters.area,
      );
      const firstLine = firstLineOf(selCluster);
      const firstStation = firstStationOf(firstLine);
      const firstSub = firstSubStationOf(firstStation);

      newFilters.line = firstLine ? String(firstLine.LineId) : "";
      newFilters.station = firstStation ? String(firstStation.StationId) : "";
      newFilters.substation = firstSub ? String(firstSub.SubStationId) : "";
    }
    else if (newFilters.line !== filters.line) {
      const selCluster = masterClusters.find(
        (c) => String(c.ClusterId) === newFilters.area,
      );
      const selLine = (selCluster?.Lines ?? []).find(
        (l) => String(l.LineId) === newFilters.line,
      );
      const firstStation = firstStationOf(selLine);
      const firstSub = firstSubStationOf(firstStation);

      newFilters.station = firstStation ? String(firstStation.StationId) : "";
      newFilters.substation = firstSub ? String(firstSub.SubStationId) : "";
    }

    else if (newFilters.station !== filters.station) {
      const selCluster = masterClusters.find(
        (c) => String(c.ClusterId) === newFilters.area,
      );
      const selLine = (selCluster?.Lines ?? []).find(
        (l) => String(l.LineId) === newFilters.line,
      );
      const selStation = (selLine?.Stations ?? []).find(
        (s) => String(s.StationId) === newFilters.station,
      );
      const firstSub = firstSubStationOf(selStation);

      newFilters.substation = firstSub ? String(firstSub.SubStationId) : "";
    }

    setFilters(newFilters);
    const prevShifts = filters.shifts ?? ["All"];
    let nextShifts = newFilters.shifts ?? prevShifts;
    if (nextShifts.includes("All") && !prevShifts.includes("All")) {
      nextShifts = ["All"];
    } else if (!nextShifts.includes("All") && prevShifts.includes("All")) {
      nextShifts = nextShifts.filter((s) => s !== "All");
      if (nextShifts.length === 0) nextShifts = ["All"];
    } else if (
      !nextShifts.includes("All") &&
      INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
    ) {
      nextShifts = ["All"];
    } else if (nextShifts.includes("All") && nextShifts.length > 1) {
      nextShifts = nextShifts.filter((s) => s !== "All");
    }
    newFilters.shifts = nextShifts;

    setFilters(newFilters);
  }

  function handleDateChange(newDateRange) {
    setIsLoading(true);
    setDateRange(newDateRange);
    setHasSearched(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }

  const masterPaths = useMemo(() => {
    const paths = [];

    masterClusters.forEach((cluster) => {
      const lines = cluster.Lines ?? [];

      if (lines.length === 0) {
        paths.push({
          ClusterId: cluster.ClusterId,
          ClusterName: cluster.ClusterName,
          LineId: null,
          LineName: null,
          StationId: null,
          StationName: null,
          SubStationId: null,
          SubStationName: null,
        });
        return;
      }

      lines.forEach((line) => {
        const stations = line.Stations ?? [];

        if (stations.length === 0) {
          paths.push({
            ClusterId: cluster.ClusterId,
            ClusterName: cluster.ClusterName,
            LineId: line.LineId,
            LineName: line.LineName,
            StationId: null,
            StationName: null,
            SubStationId: null,
            SubStationName: null,
          });
          return;
        }

        stations.forEach((station) => {
          const substations = station.SubStations ?? [];

          if (substations.length === 0) {
            paths.push({
              ClusterId: cluster.ClusterId,
              ClusterName: cluster.ClusterName,
              LineId: line.LineId,
              LineName: line.LineName,
              StationId: station.StationId,
              StationName: station.StationName,
              SubStationId: null,
              SubStationName: null,
            });
            return;
          }

          substations.forEach((sub) => {
            paths.push({
              ClusterId: cluster.ClusterId,
              ClusterName: cluster.ClusterName,
              LineId: line.LineId,
              LineName: line.LineName,
              StationId: station.StationId,
              StationName: station.StationName,
              SubStationId: sub.SubStationId,
              SubStationName: sub.SubStationName,
            });
          });
        });
      });
    });

    return paths;
  }, [masterClusters]);

  const generateDummyData = (paths) => {
    let srno = 0;
    if (!paths || paths.length === 0) return [];

    const data = [];

    // Generate dates for November 2025 and December 2025
    const generateDates = () => {
      const dates = [];
      for (let day = 1; day <= 30; day++) {
        dates.push(`2026-06-${day.toString().padStart(2, "0")}`);
      }
      for (let day = 1; day <= 17; day++) {
        dates.push(`2026-06-${day.toString().padStart(2, "0")}`);
      }
      return dates;
    };

    const dates = generateDates();
    const shiftsData = ["A", "B", "C"];

    let biwCounter = 5033272;

    for (let i = 0; i < 500; i++) {
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

      data.push({
        srno: srno++,
        ProtRecordID: biwCounter++,
        Date: date,
        Time: time,
        ShiftName: shift,

        // IDs — used for filtering, kept in sync with the dropdowns
        ClusterId: path.ClusterId,
        LineId: path.LineId,
        StationId: path.StationId,
        SubStationId: path.SubStationId,

        // Labels — used for display
        Area: formatClusterName(path.ClusterName),
        LineName: path.LineName ?? "-",
        StationName: path.StationName ?? "-",
        TimerName:
          path.SubStationName ?? path.StationName ?? path.LineName ?? "-",

        ProgNo: Math.floor(Math.random() * 90) + 30,
        SpotID: `198${Math.floor(Math.random() * 900) + 100}`,
        SpotCount: 3,
        RefCurrent: 3,
        ActualCurrent: (Math.random() * 3 + 6).toFixed(2),
        WeldTime: (Math.random() * 2 + 8).toFixed(2),
        Resistance: (Math.random() * 50 + 100).toFixed(2),
        ItemID: 4352697,
        TipDressCount: Math.floor(Math.random() * 2),
      });
    }

    return data.sort((a, b) => {
      if (a.Date === b.Date) {
        return a.Time.localeCompare(b.Time);
      }
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
      filtered = filtered.filter((item) => filters.shifts.includes(item.ShiftName));
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

  const tableColumns = useMemo(() => {
    return [
      { key: "srno", label: "Sr. No.", sortable: true },
      { key: "ProtRecordID", label: "BIW No", sortable: true },
      { key: "Date", label: "Date", type: "mono", sortable: true },
      { key: "Time", label: "Time", type: "mono", sortable: true },
      { key: "ShiftName", label: "Shift", type: "shift", sortable: true },
      { key: "Area", label: "Area", sortable: true },
      { key: "LineName", label: "Line", sortable: true },
      { key: "StationName", label: "Station", sortable: true },
      { key: "TimerName", label: "Timer Name", sortable: true },
      { key: "ProgNo", label: "Prog No", sortable: true },
      { key: "SpotID", label: "Spot ID", sortable: true },
      { key: "SpotCount", label: "Spot Count", sortable: true },
      { key: "RefCurrent", label: "Ref Current", sortable: true },
      { key: "ActualCurrent", label: "Actual Current", sortable: true },
      { key: "WeldTime", label: "Weld Time", sortable: true },
      { key: "Resistance", label: "Resistance", sortable: true },
      { key: "ItemID", label: "Item Id", sortable: true },
      { key: "TipDressCount", label: "Tip Dress Count", sortable: true },
    ];
  }, []);

  const excelHeaders = tableColumns?.map((item) => ({
    label: item.label,
    accessor: item.key,
  }));

  const exportFileBase = `Weld_Data_Report_${dateRange.from}_to_${dateRange.to}`;

  function handleDownloadExcel() {
    generateExcel(excelHeaders, filteredData, exportFileBase);
  }

  const getShiftString = (shiftObj) => {
    const selected = Object.entries(shiftObj)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (
      selected.length === 0 ||
      selected.length === Object.keys(shiftObj).length
    ) {
      return "A,B,C";
    }

    return selected.join(",");
  };
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
        `Date Range: ${dateRange.from} to ${dateRange.to} | Shift: ${filters.shifts && !filters.shifts.includes("All")
          ? filters.shifts.join(", ")
          : "All Shifts"
        }`,
        `Area: ${selectedAreaLabel}  |  Line: ${selectedLineLabel}  |  Station: ${selectedStationLabel}`,
        ...(appliedBIW.trim() ? [`BIW No: ${appliedBIW.trim()}`] : []),
        `Total Records: ${filteredData.length}`,
      ];

      const autoTableConfig = buildAutoTableConfig(
        tableColumns,
        filteredData,
        doc,
        font,
      );

      autoTable(doc, {
        ...autoTableConfig,
        startY: appliedBIW.trim() ? 70 : 65,
      });
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: pageCount,
          fontFamily: font,
          title: "Weld Data Report",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${exportFileBase}.pdf`);
    } catch (err) {
      console.error("Weld data PDF export failed:", err);
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
        reportName="Weld_Data"
      />

      {!hasSearched ? (
        <SearchPromptState pageName="Weld Data" />
      ) : isLoading ? (
        <TableShimmer />
      ) : filteredData?.length > 0 ? (
        <DataTable
          title="Weld Data Records"
          columns={tableColumns}
          data={filteredData}
          defaultRows={10}
        />
      ) : (
        <NoDataState />
      )}
    </div>
  );
}