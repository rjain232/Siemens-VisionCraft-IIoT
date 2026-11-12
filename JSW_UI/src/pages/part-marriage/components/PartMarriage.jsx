import { useEffect, useMemo, useState, useRef } from "react";
import FilterBar from "../../../sharedComponents/FilterBar";
import { masterApi, partMarriageApi } from "../../../services/api";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import { SearchPromptState, NoDataState } from "../../../sharedComponents/EmptyState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import CardContainer from "../../../sharedComponents/CardContainer";
import DataTable from "../../../sharedComponents/DataTable";
import { format } from "date-fns";
import { buildAutoTableConfig, drawPdfPageChrome, loadBrandingLogos, loadKarlaFont } from "../../../utils/PdfUtils";
import { generateExcel } from "../../../utils/ExcelUtils";
import { formatClusterName } from "../../../utils/Formatters";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";

const PAGE_NAME = "Part Marriage";

function toFileToken(value) {
  return String(value || "all").replace(/[^a-z0-9]+/gi, "_");
}

function downloadPartMarriageExcel(rows, columns, filename) {
  const headers = columns.map((column) => ({
    label: column.label,
    accessor: column.key,
  }));
  generateExcel(headers, rows, filename);
}

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

// Returns "A,B,C" | "A" | "B" | "C" | "A,B" | "A,C" | "B,C" — matches
// the validator's VALID_SHIFTS list exactly (fixed A,B,C order).
const getShiftString = (shiftsArr) => {
  if (!shiftsArr || shiftsArr.length === 0 || shiftsArr.includes("All")) {
    return "A,B,C";
  }
  return INDIVIDUAL_SHIFTS.filter((s) => shiftsArr.includes(s)).join(",");
};;

function mapTableRow(row, index) {
  return {
    sr: index + 1,
    area: formatClusterName(row.area),
    line: row.line,
    station: row.station,
    equipment: row.equipment,
    subStation1: row.Variant1,
    ST1BiwNo: row.ST1BiwNo,
    subStation2: row.Variant2,
    ST2BiwNo: row.ST2BiwNo,
    marriageState: row.marriageState,
    shift: row.shift,
    Date: row.Date,
    Time: row.Time,
  };
}

function mapChartRow(row) {
  return {
    date: row.date,
    OK: row.OK ?? 0,
    NOK: row.NOK ?? 0,
    stations: row.stations ?? "",
    subStations: row.subStations ?? "",
  };
}

async function downloadPartMarriagePDF(chartRef, rows, columns, filterLabels) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const fontFamily = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const headerH = 40;
  const footerH = 22;
  const from = filterLabels?.from ?? "-";
  const to = filterLabels?.to ?? "-";
  const shifts = getShiftString(filterLabels?.shifts)
  console.log(shifts)
  const subLines = [
    `Date Range : ${from}  To  ${to}`,
    `Area : ${filterLabels.area}   |   Line : ${filterLabels.line}  |  Station : ${filterLabels.station}  |  Sub-station : ${filterLabels.subStation}`,
    `Shifts : ${getShiftString(filterLabels?.shifts)}`
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
  // doc.text("Backlog Description - Previous", margin, contentTop + 4);

  if (chartImgData) {
    const maxImgH = contentH - 10;
    const imgH = Math.min(contentW * chartAspect, maxImgH);
    const imgW = Math.min(contentW, imgH / chartAspect);
    const imgX = margin + (contentW - imgW) / 2;
    const imgY = contentTop + 8;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    //doc.roundedRect(imgX - 1, imgY - 1, imgW + 2, imgH + 2, 1.5, 1.5);
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
      title: "Part Marriage Report",
      subLines: pageNum === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }

  doc.save(
    `Part_Marriage_${toFileToken(filterLabels.area)}_${toFileToken(filterLabels.line)}.pdf`,
  );
}


export default function PartMarriage({
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
  const [filters, setFilters] = useState({ shifts: ["A"] });
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [rawTableRows, setRawTableRows] = useState([]);
  const [rawChartRows, setRawChartRows] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);

        const firstCluster = clusters[0];
        if (firstCluster) {
          let targetAreaId = String(firstCluster.ClusterId);
          let targetLineId = "all";

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
          targetLineId = firstLine ? String(firstLine.LineId) : "all";

          if (targetFilters?.line || targetFilters?.lineId) {
            const matchLine = areaLines.find(
              (l) =>
                String(l.LineId) === String(targetFilters.lineId || targetFilters.line) ||
                String(l.LineName).toLowerCase() === String(targetFilters.line).toLowerCase()
            );
            if (matchLine) targetLineId = String(matchLine.LineId);
          }

          let shifts = ["A"];
          if (targetFilters?.shifts) {
            shifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
          } else if (targetFilters?.shift) {
            shifts = [targetFilters.shift];
          }

          setFilters((prev) => ({
            ...prev,
            area: targetAreaId,
            line: targetLineId,
            station: undefined,
            substation: undefined,
            shifts,
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
    const lines =
      filters.area === "all"
        ? masterClusters.flatMap((cluster) => cluster.Lines ?? [])
        : (selectedCluster?.Lines ?? []);

    return [
      ...lines.map((line) => ({
        value: String(line.LineId),
        label: line.LineName,
      })),
    ];
  }, [filters.area, masterClusters, selectedCluster]);

  const selectedLineObj = useMemo(() => {
    const lines =
      filters.area === "all"
        ? masterClusters.flatMap((cluster) => cluster.Lines ?? [])
        : (selectedCluster?.Lines ?? []);

    return lines.find((line) => String(line.LineId) === filters.line) ?? null;
  }, [filters.area, filters.line, masterClusters, selectedCluster]);

  const linesInScope = useMemo(() => {
    return filters.area === "all"
      ? masterClusters.flatMap((cluster) => cluster.Lines ?? [])
      : (selectedCluster?.Lines ?? []);
  }, [filters.area, masterClusters, selectedCluster]);

  const stationsInScope = useMemo(() => {
    return filters.line === "all"
      ? linesInScope.flatMap((line) => line.Stations ?? [])
      : (selectedLineObj?.Stations ?? []);
  }, [filters.line, linesInScope, selectedLineObj]);

  // NEW: Station dropdown
  const stationOptions = useMemo(() => {
    return stationsInScope.map((station) => ({
      value: String(station.StationId),
      label: station.StationName,
    }));
  }, [stationsInScope]);

  const selectedStationObj = useMemo(() => {
    if (!filters.station || filters.station === "all") return null;
    return stationsInScope.find((s) => String(s.StationId) === filters.station) ?? null;
  }, [filters.station, stationsInScope]);

  // SubStation options now scoped to the selected Station
  const substationOptions = useMemo(() => {
    const stations = selectedStationObj ? [selectedStationObj] : [];
    const substations = stations.flatMap((station) => station.SubStations ?? []);

    return substations.map((sub) => ({
      value: String(sub.SubStationId),
      label: sub.SubStationName,
    }));
  }, [selectedStationObj]);
  useEffect(() => {
    const realOptions = lineOptions.filter((o) => o.value !== "all");
    if (realOptions.length === 0) return;
    setFilters((prev) => {
      const isValid =
        prev.line && prev.line !== "all" && realOptions.some((o) => o.value === prev.line);
      if (isValid) return prev;
      return { ...prev, line: realOptions[0].value };
    });
  }, [lineOptions]);
  const resolvedStationId = useMemo(() => {
    if (!filters.station || filters.station === "all") return undefined;
    return filters.station;
  }, [filters.station]);

  useEffect(() => {
    const realOptions = stationOptions.filter((o) => o.value !== "all");
    if (realOptions.length === 0) return;
    setFilters((prev) => {
      const isValid =
        prev.station &&
        prev.station !== "all" &&
        realOptions.some((o) => o.value === prev.station);
      if (isValid) return prev;
      return { ...prev, station: realOptions[0].value };
    });
  }, [stationOptions]);

  useEffect(() => {
    const realOptions = substationOptions.filter((o) => o.value !== "all");
    if (realOptions.length === 0) return;
    setFilters((prev) => {
      const isValid =
        prev.substation &&
        prev.substation !== "all" &&
        realOptions.some((o) => o.value === prev.substation);
      if (isValid) return prev;
      return { ...prev, substation: realOptions[0].value };
    });
  }, [substationOptions]);

  const selectedAreaLabel = useMemo(() => {
    return (
      areaOptions.find((option) => option.value === filters.area)?.label ?? null
    );
  }, [areaOptions, filters.area]);

  const selectedLineLabel = useMemo(() => {
    return (
      lineOptions.find((option) => option.value === filters.line)?.label ?? null
    );
  }, [lineOptions, filters.line]);

  const selectedSubStationLabel = useMemo(() => {
    return (
      substationOptions.find((option) => option.value === filters.substation)
        ?.label ?? null
    );
  }, [substationOptions, filters.substation]);

  const selectedStationLabel = useMemo(
    () => stationOptions.find((o) => o.value === filters.station)?.label ?? null,
    [stationOptions, filters.station],
  );

  const config = useMemo(
    () => [
      { type: "select", key: "area", label: "Area", options: areaOptions },
      { type: "select", key: "line", label: "Line", options: lineOptions },
      { type: "select", key: "station", label: "Station", options: stationOptions },
      {
        type: "select",
        key: "substation",
        label: "Sub Station",
        options: substationOptions,
      },
      { type: "divider" },
      {
        type: "select",
        key: "shifts",
        label: "Shifts",
        multiple: true,
        searchable: false,
        options: [
          { value: "All", label: "All Shifts" },
          { value: "A", label: "Shift A" },
          { value: "B", label: "Shift B" },
          { value: "C", label: "Shift C" },
        ],
      },
    ],
    [areaOptions, lineOptions, stationOptions, substationOptions],
  );

  function handleFilterChange(newFilters) {
    if (newFilters.area !== filters.area) {
      if (newFilters.area === "all") {
        newFilters.line = "all";
      } else if (newFilters.area === "__null__") {
        newFilters.line = "__null__";
      } else {
        const selectedCluster = masterClusters.find(
          (c) => String(c.ClusterId) === newFilters.area,
        );
        const firstLine = (selectedCluster?.Lines ?? [])[0];
        newFilters.line = firstLine ? String(firstLine.LineId) : "all";
      }
    }

    if (newFilters.line !== filters.line) {
      newFilters.station = undefined;
      newFilters.substation = undefined;
    }

    if (newFilters.station !== filters.station) {
      newFilters.substation = "all";
    }

    if (newFilters.shifts !== undefined) {
      const prevShifts = filters.shifts ?? ["A"];
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
    setDateRange(newDateRange);
    setHasSearched(true);
  }


  useEffect(() => {
    if (!filters.area || !filters.line) return;

    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const params = {
          fromDate: dateRange.from,
          toDate: dateRange.to,
          clusterId: filters.area !== "all" ? filters.area : undefined,
          lineId: filters.line !== "all" ? filters.line : undefined,
          stationId: resolvedStationId,
          subStationId:
            filters.substation && filters.substation !== "all"
              ? filters.substation
              : undefined,
          shift: getShiftString(filters.shifts),
          pageNumber: 1,
          pageSize: 1000,
        };
        const body = await partMarriageApi.report(params);

        if (!cancelled) {
          setRawTableRows(body.tableData ?? []);
          setRawChartRows(body.chartData ?? []);
        }
      } catch (err) {
        console.error("Part marriage fetch failed:", err);
        if (!cancelled) {
          setRawTableRows([]);
          setRawChartRows([]);
          setFetchError("Failed to load part marriage data.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [
    dateRange.from,
    dateRange.to,
    filters.area,
    filters.line,
    filters.station,
    filters.substation,
    filters.shifts,
    resolvedStationId,
  ]);

  const tableColumns = useMemo(() => {
    return [
      { key: "sr", label: "Sr. No.", sortable: false },
      { label: "Area", key: "area", sortable: false },
      { label: "Line", key: "line", sortable: true },
      { label: "Station", key: "station", sortable: true },
      { label: "Variant 1", key: "subStation1", sortable: true },
      { label: " BIW No.", key: "ST1BiwNo", sortable: true },
      { label: "Variant 2", key: "subStation2", sortable: true },
      { label: " BIW No.", key: "ST2BiwNo", sortable: true },
      {
        label: "Marriage State",
        key: "marriageState",
        render: (row) => {
          const value = row.marriageState;

          return (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
          ${value === "OK"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
                }`}
            >
              {value}
            </span>
          );
        },
        sortable: true,
      },
      { label: "shift", key: "shift", type: "shift", sortable: true },
      { label: "Date", key: "Date", type: "mono", sortable: true },
      { label: "Time", key: "Time", type: "mono", sortable: true },
    ];
  }, []);

  const tableData = useMemo(
    () => rawTableRows.map((row, index) => mapTableRow(row, index)),
    [rawTableRows],
  );

  const chartData = useMemo(() => rawChartRows.map(mapChartRow), [rawChartRows]);

  const hasData = tableData.length > 0 || chartData.length > 0;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadPartMarriagePDF(chartRef, tableData, tableColumns, {
        area: selectedAreaLabel,
        line: selectedLineLabel,
        station: selectedStationLabel,
        subStation: selectedSubStationLabel,
        from: dateRange?.from,
        to: dateRange?.to,
        shifts: filters.shifts
      });
      downloadPartMarriageExcel(tableData, tableColumns, "Part_Marriage_Report");
    } catch (error) {
      return;
    } finally {
      setIsDownloading(false);
    }
  };

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
        reportName="Part_Marriage"
      />
      {!hasSearched ? (
        <SearchPromptState pageName={PAGE_NAME} />
      ) : isLoading ? (
        <CardContainer ref={chartRef}>
          <div className="flex items-center justify-center py-20 text-sm text-slate-400">
            Loading...
          </div>
        </CardContainer>
      ) : fetchError ? (
        <CardContainer ref={chartRef}>
          <div className="flex items-center justify-center py-20 text-sm text-red-500">
            {fetchError}
          </div>
        </CardContainer>
      ) : !hasData ? (
        <NoDataState />
      ) : (
        <>
          <CardContainer ref={chartRef}>
            <PartMarriageChart data={chartData} />
          </CardContainer>
          <DataTable
            title="Part Marriage List"
            columns={tableColumns}
            data={tableData}
            defaultRows={10}
          />
        </>
      )}
    </div>
  );
}


function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const row = payload[0].payload;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        padding: "14px 16px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        minWidth: 220,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#0f172a",
          marginBottom: 4,
        }}
      >
        Production Date
      </div>
      <div style={{ fontSize: 13, color: "#334155", marginBottom: 10 }}>
        {label}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <span
          style={{
            background: "#dcfce7",
            color: "#15803d",
            fontWeight: 600,
            fontSize: 12,
            borderRadius: 14,
            padding: "3px 10px",
          }}
        >
          OK: {row.OK}
        </span>
        <span
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            fontWeight: 600,
            fontSize: 12,
            borderRadius: 14,
            padding: "3px 10px",
          }}
        >
          NOK: {row.NOK}
        </span>
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#0f172a",
          marginBottom: 2,
        }}
      >
        Stations
      </div>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 8 }}>
        {row.stations || "-"}
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#0f172a",
          marginBottom: 2,
        }}
      >
        Sub-Stations
      </div>
      <div style={{ fontSize: 12, color: "#475569" }}>
        {row.subStations || "-"}
      </div>
    </div>
  );
}

function OkBarShape(props) {
  const { x, y, width, height, payload } = props;
  const hasNok = payload?.NOK > 0;
  const radius = hasNok ? 0 : 6; // round top when no NOK sits on top of it

  return (
    <path
      d={`
        M${x},${y + height}
        L${x},${y + radius}
        Q${x},${y} ${x + radius},${y}
        L${x + width - radius},${y}
        Q${x + width},${y} ${x + width},${y + radius}
        L${x + width},${y + height}
        Z
      `}
      fill="#10b981"
    />
  );
}

function PartMarriageChart({ data: chartData }) {
  return (
    <div>
      <h3 className={"font-bold text-xl mb-1"}>
        Date-wise Part Marriage Status
      </h3>
      <p className={"text-gray-500 text-sm mb-6"}>
        Stacked OK / NOK trend based on production timestamp
      </p>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          barCategoryGap="25%"
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#475569" }} />
          <YAxis
            label={{
              value: "Marriage Count",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: "#475569" },
            }}
            tick={{ fontSize: 12, fill: "#475569" }}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 16, fontSize: 13 }}
          />
          <Bar
            dataKey="OK"
            name="OK"
            stackId="status"
            shape={<OkBarShape />}
            fill="#10b981"
          >
          </Bar>
          <Bar
            dataKey="NOK"
            name="NOK"
            stackId="status"
            fill="#dc2626"
            radius={[4, 4, 0, 0]}
          >

          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}