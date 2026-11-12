import { useState, useEffect, useMemo, useRef } from "react";
import { masterApi } from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import appConfig from "../../../config/appConfig";
import DataTable from "../../../sharedComponents/DataTable";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import {
  drawPdfPageChrome,
  getPdfTableStyles,
  loadBrandingLogos,
  loadKarlaFont,
} from "../../../utils/PdfUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateExcel } from "../../../utils/ExcelUtils";
import { formatClusterName } from "../../../utils/Formatters";

export default function NutBoltFasreningReport({
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
  const [appliedBIW, setAppliedBIW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

  // inside the component, replace the old shiftOptions:
  const shiftOptions = useMemo(() => {
    return appConfig.production.shifts.map((s) =>
      s.value === "All"
        ? { value: "All", label: "All Shifts" }
        : { value: s.value, label: s.label ?? `Shift ${s.value}` },
    );
  }, []);

  const resultOptions = useMemo(
    () => [
      { value: "OK", label: "OK" },
      { value: "NOK", label: "NOK" },
    ],
    [],
  );

  const [filters, setFilters] = useState({
    area: "",
    line: "",
    station: "",
    shifts: ["A"],
    result: resultOptions[0].value,
  });

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
      }
    };
    loadMasterData();
  }, [targetFilters]);

  const areaOptions = useMemo(
    () => [
      ...masterClusters.map((cluster) => ({
        value: String(cluster.ClusterId),
        label: formatClusterName(cluster.ClusterName),
      })),
    ],
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
    () => stationOptions.find((o) => o.value === filters.station)?.label ?? "",
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
        label: "Shift",
        multiple: true,
        searchable: false,
        options: shiftOptions,
      },
      {
        type: "select",
        key: "result",
        label: "Result",
        options: resultOptions,
      },
    ],
    [areaOptions, lineOptions, stationOptions, resultOptions, shiftOptions],
  );

  function handleFilterChange(newFilters) {
    const updatedFilters = { ...filters, ...newFilters };

    if (newFilters.area !== undefined && newFilters.area !== filters.area) {
      const selCluster = masterClusters.find(
        (c) => String(c.ClusterId) === updatedFilters.area,
      );
      const firstLine = (selCluster?.Lines ?? [])[0];
      const firstLineId = firstLine ? String(firstLine.LineId) : "";
      const firstStation = (firstLine?.Stations ?? [])[0];
      const firstStationId = firstStation ? String(firstStation.StationId) : "";

      updatedFilters.line = firstLineId;
      updatedFilters.station = firstStationId;
    }

    if (newFilters.line !== undefined && newFilters.line !== filters.line) {
      const selCluster = masterClusters.find(
        (c) => String(c.ClusterId) === updatedFilters.area,
      );
      const selectedLine =
        selCluster?.Lines?.find(
          (line) => String(line.LineId) === updatedFilters.line,
        ) ?? null;
      const firstStation = (selectedLine?.Stations ?? [])[0];
      updatedFilters.station = firstStation
        ? String(firstStation.StationId)
        : "";
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

      updatedFilters.shifts = nextShifts;
    }
    setFilters(updatedFilters);
  }

  function handleDateChange(newDateRange) {
    setIsLoading(true);
    setDateRange(newDateRange);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
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
      // Generate BIW number (e.g., BIW2025001)
      const cabinNo = `BIW${date.replace(/-/g, "")}${(i % 100).toString().padStart(3, "0")}`;
      const nutID = `NUT${(i % 50).toString().padStart(3, "0")}`;
      const idealTorqueValue = 90;
      const idealTorqueAngle = 180;
      const torqueValue = (Math.random() * 60 + 60).toFixed(2);
      const torqueAngle = (Math.random() * 180 + 90).toFixed(1);
      const torqueValueDiff = Math.abs(
        parseFloat(torqueValue) - idealTorqueValue,
      );
      const torqueAngleDiff = Math.abs(
        parseFloat(torqueAngle) - idealTorqueAngle,
      );
      const isOK =
        torqueValueDiff <= idealTorqueValue * 0.1 && torqueAngleDiff <= 15;
      const result = isOK ? "OK" : "NOK";

      data.push({
        srno: ++srno,
        CabinNo: cabinNo,
        NutID: nutID,
        TorqueValue: torqueValue,
        IdealTorqueValue: idealTorqueValue,
        TorqueAngle: torqueAngle,
        IdealTorqueAngle: idealTorqueAngle,
        Result: result,
        Date: date,
        Shift: shift,
        Time: time,
        ClusterId: path.ClusterId,
        LineId: path.LineId,
        StationId: path.StationId,
        SubStationId: path.SubStationId,
        Area: formatClusterName(path.ClusterName),
        Line: path.LineName ?? "-",
        Station: path.StationName ?? "-",
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
      filtered = filtered.filter((item) => filters.shifts.includes(item.Shift));
    }
    if (filters.result) {
      filtered = filtered.filter((item) => item.Result === filters.result);
    }
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(
        (item) => item.Date >= dateRange.from && item.Date <= dateRange.to,
      );
    }

    if (appliedBIW.trim()) {
      filtered = filtered.filter((item) =>
        String(item.CabinNo).includes(appliedBIW.trim()),
      );
    }

    return filtered;
  }, [dummyData, filters, dateRange, appliedBIW]);

  const tableColumns = useMemo(() => {
    return [
      { key: "srno", label: "SR. NO.", sortable: true },
      { label: "DATE", key: "Date", type: "mono", sortable: true },
      { label: "TIMESTAMP", key: "Time", type: "mono", sortable: true },
      { label: "SHIFT", key: "Shift", type: "shift", sortable: true },
      { label: "AREA", key: "Area", sortable: true },
      { label: "LINE", key: "Line", sortable: true },
      { label: "STATION", key: "Station", sortable: true },
      { label: "BIW NO.", key: "CabinNo", sortable: true },
      { label: "NUT/BOLT ID", key: "NutID", sortable: true },
      { label: "TORQUE VALUE (NM)", key: "TorqueValue", sortable: true },
      {
        label: "NOMINAL TORQUE VALUE (NM)",
        key: "IdealTorqueValue",
        sortable: true,
      },
      { label: "TORQUE ANGLE (°)", key: "TorqueAngle", sortable: true },
      {
        label: "NOMINAL TORQUE ANGLE (°)",
        key: "IdealTorqueAngle",
        sortable: true,
      },
      {
        label: "RESULT",
        key: "Result",
        sortable: true,
        render: (row) => (
          <span
            className={`px-3 py-1 rounded-full font-bold text-sm ${row.Result === "OK"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
              }`}
          >
            {row.Result}
          </span>
        ),
      },
    ];
  }, []);


  const { okCount, nokCount } = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        if (item.Result === "OK") acc.okCount += 1;
        else if (item.Result === "NOK") acc.nokCount += 1;
        return acc;
      },
      { okCount: 0, nokCount: 0 },
    );
  }, [filteredData]);

  const excelHeaders = tableColumns?.map((item) => ({
    label: item.label,
    accessor: item.key,
  }));

  const exportFileBase = `Nut_Bolt_OK_NOK_Result_${dateRange.from}_to_${dateRange.to}`;

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

      const subLines = [
        `Date Range: ${dateRange.from} to ${dateRange.to} | ${filters.shift && `Shift: ${filters.shift}`}`,
        `Area: ${selectedAreaLabel}  |  Line: ${selectedLineLabel}  |  Station: ${selectedStationLabel}`,
        ...(appliedBIW.trim() ? [`BIW No: ${appliedBIW.trim()}`] : []),
        `Total Records: ${filteredData.length}`,
      ];

      const pdfColumns = tableColumns.map((col) => ({
        header: col.label,
        dataKey: col.key,
      }));

      // Build body rows as plain key/value objects matching dataKeys above.
      const pdfBody = filteredData.map((row) => {
        const rowData = {};
        tableColumns.forEach((col) => {
          rowData[col.key] = row[col.key];
        });
        return rowData;
      });

      const badgeColors = {
        OK: {
          fill: [220, 252, 231], // green-100
          border: [34, 197, 94], // green-500
          text: [22, 101, 52], // green-800
        },
        NOK: {
          fill: [254, 226, 226], // red-100
          border: [239, 68, 68], // red-500
          text: [153, 27, 27], // red-800
        },
        A: {
          fill: [219, 234, 254], // blue-100
          border: [59, 130, 246], // blue-500
          text: [30, 64, 175], // blue-800
        },
        B: {
          fill: [254, 249, 195], // yellow-100
          border: [234, 179, 8], // yellow-500
          text: [133, 77, 14], // yellow-800
        },
        C: {
          fill: [237, 233, 254], // purple-100
          border: [139, 92, 246], // purple-500
          text: [91, 33, 182], // purple-800
        },
      };

      const badgeColumnKeys = ["Result", "Shift"];

      function drawBadge(data, value, columnKey) {
        const colors = badgeColors[value];
        if (!colors) return;

        const fontSize = 6.5;
        doc.setFont(font, "normal");
        doc.setFontSize(fontSize);
        const textWidth = doc.getTextWidth(String(value));

        let badgeWidth, badgeHeight, radius;

        if (columnKey === "Shift") {
          badgeHeight = 4.6;
          badgeWidth = Math.max(badgeHeight, textWidth + 3);
          badgeWidth = Math.min(badgeWidth, badgeHeight + 1.2);
          radius = 0.9;
        } else {
          badgeHeight = 4.2;
          const horizontalPadding = 2.5;
          badgeWidth = Math.min(
            textWidth + horizontalPadding * 2,
            data.cell.width - 2,
          );
          radius = badgeHeight / 2.6;
        }
        const badgeX = data.cell.x + (data.cell.width - badgeWidth) / 2;
        const badgeY = data.cell.y + (data.cell.height - badgeHeight) / 2;

        doc.setFillColor(...colors.fill);
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.12);
        doc.roundedRect(
          badgeX,
          badgeY,
          badgeWidth,
          badgeHeight,
          radius,
          radius,
          "FD",
        );

        doc.setTextColor(...colors.text);
        doc.text(
          String(value),
          badgeX + badgeWidth / 2,
          badgeY + badgeHeight / 2,
          {
            align: "center",
            baseline: "middle",
          },
        );

        doc.setTextColor(0, 0, 0);
      }

      autoTable(doc, {
        columns: pdfColumns,
        body: pdfBody,
        startY: appliedBIW.trim() ? 70 : 65,
        ...getPdfTableStyles(font),
        didParseCell: (data) => {
          if (
            data.section === "body" &&
            badgeColumnKeys.includes(data.column.dataKey) &&
            badgeColors[data.cell.raw]
          ) {
            data.cell.text = [""];
          }
        },

        didDrawCell: (data) => {
          if (data.section !== "body") return;
          if (!badgeColumnKeys.includes(data.column.dataKey)) return;

          const value = data.cell.raw;
          drawBadge(data, value, data.column.dataKey);
        },
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: pageCount,
          fontFamily: font,
          title: "Nut/Bolt OK/NOK Result",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${exportFileBase}.pdf`);
    } catch (err) {
      console.error("Nut/Bolt OK/NOK Result PDF export failed:", err);
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
        reportName="Nut_Bolt_Fastening"
        onDownload={handleDownload}
        isDownloading={isDownloading}
        withContainer={true}
        showSearch={true}
        searchLabel="BIW No"
        searchPlaceholder="Search BIW..."
        searchValue={appliedBIW}
        onSearchValueChange={setAppliedBIW}
      />

      {isLoading ? (
        <TableShimmer columns={tableColumns} rowCount={10} />
      ) : !hasSearched ? (
        <EmptyState
          title="Select filters and click Search to view Nut/Bolt OK/NOK Result data"
          color="sky"
        />
      ) : filteredData.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-gray-200 gap-3">
            <h2 className="text-base font-bold text-slate-700">
              Nut/Bolt OK/NOK Result
              <span className="ml-2 text-slate-400 font-normal">
                ({filteredData.length} records)
              </span>
            </h2>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${okCount > 0 ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-500"}`}
              >
                OK: {okCount}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${nokCount > 0 ? "bg-red-100 text-red-800 border border-red-300" : "bg-gray-100 text-gray-500"}`}
              >
                NOK: {nokCount}
              </span>
            </div>
          </div>

          <DataTable
            columns={tableColumns}
            data={filteredData}
            title="Nut/Bolt OK/NOK Result Records"
            showPagination={true}
          />
        </div>
      ) : (
        <NoDataState />
      )}
    </div>
  );
}