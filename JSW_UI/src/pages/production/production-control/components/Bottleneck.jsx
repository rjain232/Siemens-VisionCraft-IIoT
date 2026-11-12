import React, { useState, useEffect, useMemo, useRef } from "react";
import FilterBar from "../../../../sharedComponents/FilterBar";
import {
  formatStationName,
  formatClusterName,
} from "../../../../utils/Formatters";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import DowntimeBottleneckChart from "./bottleneck/DowntimeBottleneckChart";
import { masterApi } from "../../../../services/api";
import { generateDowntimeData } from "./bottleneck/mockDowntimeData";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import {
  downloadBottleneckExcel,
  downloadBottleneckPdf,
} from "../../../../utils/bottleneckDownload";
import {
  SearchPromptState,
  NoDataState,
} from "../../../../sharedComponents/EmptyState";
import appConfig from "../../../../config/appConfig.js";

const ALL = "All";
const opt = (value, label) => ({ value, label });

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];
const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  s.value === "All"
    ? { value: "All", label: "All Shifts" }
    : { value: s.value, label: `Shift ${s.value}` },
);

export default function Bottleneck({
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [dateFilter, setDateFilter] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    areaId: "",
    lineId: ALL,
    stationId: ALL,
    equipmentId: "",
    shifts: ["All"],
  });

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);
        const firstArea = data[0];

        let targetAreaId = firstArea?.ClusterId ?? "";
        let targetLineId = ALL;
        let targetStationId = ALL;

        if (targetFilters?.areaId || targetFilters?.area) {
          const matchArea = data.find(
            (c) =>
              String(c.ClusterId) === String(targetFilters.areaId || targetFilters.area) ||
              String(c.ClusterName).toLowerCase() === String(targetFilters.area).toLowerCase(),
          );
          if (matchArea) targetAreaId = matchArea.ClusterId;
        }

        const areaLines = data.find((c) => c.ClusterId === Number(targetAreaId))?.Lines || [];
        if (targetFilters?.lineId || targetFilters?.line) {
          const matchLine = areaLines.find(
            (l) =>
              String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
              String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase(),
          );
          if (matchLine) targetLineId = matchLine.LineId;
        }

        let shifts = ["All"];
        if (targetFilters?.shifts) {
          shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
        } else if (targetFilters?.shift) {
          shifts = [targetFilters.shift];
        }

        setFilters({
          areaId: targetAreaId,
          lineId: targetLineId,
          stationId: targetStationId,
          equipmentId: "",
          shifts,
        });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [targetFilters]);

  const lines = useMemo(
    () =>
      masterData.find((c) => c.ClusterId === Number(filters.areaId))?.Lines ||
      [],
    [masterData, filters.areaId],
  );
  const stations = useMemo(() => {
    if (filters.lineId === ALL) {
      return lines.flatMap((l) => l.Stations || []);
    }
    return (
      lines.find((l) => l.LineId === Number(filters.lineId))?.Stations || []
    );
  }, [lines, filters.lineId]);

  const isStationDisabled = filters.lineId === ALL;

  // Selected area/cluster has no lines under it at all -> nothing to show
  const areaHasNoData = Boolean(filters.areaId) && lines.length === 0;

  const filterConfig = [
    {
      type: "select",
      key: "areaId",
      label: "Area",
      // Show every cluster, including ones with no lines under them —
      // selecting one of those will surface the "No data" state below.
      options: masterData.map((c) =>
        opt(c.ClusterId, formatClusterName(c.ClusterName)),
      ),
    },
    {
      type: "select",
      key: "lineId",
      label: "Line",
      options: [
        opt(ALL, "All Lines"),
        ...lines.map((l) => opt(l.LineId, l.LineName)),
      ],
    },
    {
      type: "select",
      key: "stationId",
      label: "Station",
      options: [
        opt(ALL, "All Stations"),
        ...stations.map((s) =>
          opt(s.StationId, formatStationName(s.StationName)),
        ),
      ],
      disabled: isStationDisabled,
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
  ];

  const handleFiltersChange = (newFilters) => {
    if (newFilters.areaId !== filters.areaId) {
      newFilters = {
        ...newFilters,
        lineId: ALL,
        stationId: ALL,
        equipmentId: "",
      };
    } else if (newFilters.lineId !== filters.lineId) {
      newFilters = { ...newFilters, stationId: ALL, equipmentId: "" };
    } else if (newFilters.stationId !== filters.stationId) {
      newFilters = { ...newFilters, equipmentId: "" };
    }
    const prevShifts = filters.shifts;
    const nextShifts = newFilters.shifts ?? prevShifts;
    if (nextShifts.includes("All") && !prevShifts.includes("All")) {
      newFilters.shifts = ["All"];
    } else if (!nextShifts.includes("All") && prevShifts.includes("All")) {
      newFilters.shifts = nextShifts.filter((s) => s !== "All");
      if (newFilters.shifts.length === 0) newFilters.shifts = ["All"];
    } else if (
      !nextShifts.includes("All") &&
      INDIVIDUAL_SHIFTS.every((s) => nextShifts.includes(s))
    ) {
      newFilters.shifts = ["All"];
    } else if (nextShifts.includes("All") && nextShifts.length > 1) {
      newFilters.shifts = nextShifts.filter((s) => s !== "All");
    }
    setFilters(newFilters);
  };

  //    dummy-data generator (chart works off codes like "FE", "FE010") ──────
  const selectedLine = useMemo(
    () => lines.find((l) => l.LineId === Number(filters.lineId)),
    [lines, filters.lineId],
  );
  const selectedStation = useMemo(
    () => stations.find((s) => s.StationId === Number(filters.stationId)),
    [stations, filters.stationId],
  );

  const chartData = useMemo(
    () =>
      generateDowntimeData({
        areaId: filters.areaId,
        lineId: selectedLine?.LineName ?? ALL,
        stationId: selectedStation?.StationName ?? ALL,
        startDate: dateFilter?.startDate,
        endDate: dateFilter?.endDate,
      }),
    [
      filters.areaId,
      selectedLine,
      selectedStation,
      dateFilter?.startDate,
      dateFilter?.endDate,
    ],
  );

  // id used inside chartData's `id` field for each line entry — matches the
  // `lid` key from LINE_CATALOG in generateDowntimeData, e.g. "FE", "UB"
  const lockedLine =
    filters.lineId !== ALL ? (selectedLine?.LineName ?? null) : null;
  const lockedStation =
    lockedLine && filters.stationId !== ALL
      ? (selectedStation?.StationName ?? null)
      : null;

  const chartContainerRef = useRef(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const meta = {
        areaLabel: formatClusterName(
          masterData.find((c) => c.ClusterId === Number(filters.areaId))
            ?.ClusterName,
        ),
        lineLabel: selectedLine?.LineName ?? "All Lines",
        stationLabel: selectedStation?.StationName ?? "All Stations",
        startDate: dateFilter?.startDate,
        endDate: dateFilter?.endDate,
      };

      await downloadBottleneckPdf(chartData, meta, chartContainerRef.current);
      downloadBottleneckExcel(chartData);
    } catch (err) {
      console.error("Bottleneck download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Sync date range in background mode & trigger search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      setDateFilter({ startDate: s, endDate: e, startTime: "00:00", endTime: "23:59" });
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
    <div className="m-4">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFiltersChange}
        isLoading={isLoading}
      />
      <DateRangeBar
        onSearch={(start, end, startTime, endTime) => {
          setDateFilter({ startDate: start, endDate: end, startTime, endTime });
          setHasSearched(true);
        }}
        onDownload={handleDownload}
        showDownload={true}
        showTime={false}
        reportName="Bottleneck"
        selectedStartDate={dateFilter?.startDate}
        selectedEndDate={dateFilter?.endDate}
        isDownloading={isDownloading}
      />
      {areaHasNoData ? (
        <NoDataState />
      ) : (
        <div>
          {!hasSearched ? (
            <SearchPromptState pageName="Bottleneck" />
          ) : (
            <div ref={chartContainerRef}>
              <DowntimeBottleneckChart
                data={chartData}
                lockedLine={lockedLine}
                lockedStation={lockedStation}
                startDate={dateFilter?.startDate}
                endDate={dateFilter?.endDate}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
