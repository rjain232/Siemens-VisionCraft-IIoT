import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import FilterBar from "../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import {
  masterApi,
  maintenanceApi,
  robotHealthApi,
} from "../../../services/api";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import appConfig from "../../../config/appConfig";
import { ChartShimmer, TableShimmer } from "../../../sharedComponents/Shimmer";
import {
  formatClusterName,
  formatStationName,
} from "../../../utils/Formatters";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Label,
} from "recharts";
import DataTable from "../../../sharedComponents/DataTable";
import { generateExcelWithSheets } from "../../../utils/ExcelUtils";
import EmptyState, { SearchPromptState, NoDataState } from "../../../sharedComponents/EmptyState";

const PAGE_NAME = "Tip Change Count";

const opt = (value, label) => ({ value, label: label ?? value });

const todayISO = new Date().toISOString().slice(0, 10);

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const EXCEL_COLUMNS = [
  { label: "Sr. No.", accessor: "sr" },
  { label: "Date", accessor: "datetime" },
  { label: "Shift", accessor: "shift" },
  { label: "Area", accessor: "area" },
  { label: "Line", accessor: "line" },
  { label: "Station", accessor: "station" },
  { label: "Robot", accessor: "equipment" },
  { label: "Tip Change Count", accessor: "tipchangecount" },
];

const PDF_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "datetime", label: "Date", type: "mono" },
  { key: "shift", label: "Shift", type: "shift" },
  { key: "area", label: "Area" },
  { key: "line", label: "Line", type: "primary" },
  { key: "station", label: "Station" },
  { key: "equipment", label: "Robot" },
  { key: "tipchangecount", label: "Tip Change Count" },
];

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  return isoDate.slice(0, 10);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "10px 18px",
          boxShadow: "0 4px 16px rgba(74,143,240,0.13)",
          minWidth: 160,
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "#374151",
            marginBottom: 4,
            fontSize: 13,
          }}
        >
          {label}
        </p>
        <p style={{ color: "#4A8FF0", fontWeight: 600, fontSize: 15 }}>
          Tip Change Count:{" "}
          <span style={{ fontSize: 17, color: "#1d4ed8" }}>
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

function SummaryCards({ totalCount, xAxisLabel, chartData }) {
  const total = chartData.reduce((acc, r) => acc + (r.TipChangeCount ?? 0), 0);
  const avg = chartData.length > 0 ? Math.round(total / chartData.length) : 0;
  const maxEntry =
    chartData.length > 0
      ? chartData.reduce((a, b) =>
        a.TipChangeCount > b.TipChangeCount ? a : b,
      )
      : null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-200">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
          Total Tip Changes
        </p>
        <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">
          {total.toLocaleString()}
        </p>
      </div>
      <div className="bg-indigo-50 rounded-lg p-2 sm:p-3 border border-indigo-200">
        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">
          Avg per {xAxisLabel}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-indigo-900 mt-1">
          {avg.toLocaleString()}
        </p>
      </div>
      <div className="bg-sky-50 rounded-lg p-2 sm:p-3 border border-sky-200">
        <p className="text-xs text-sky-600 font-semibold uppercase tracking-wide">
          Highest {xAxisLabel}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-sky-900 mt-1">
          {maxEntry ? maxEntry.name : "—"}
        </p>
        {maxEntry && (
          <p className="text-xs text-sky-600 mt-0.5">
            {maxEntry.TipChangeCount.toLocaleString()} changes
          </p>
        )}
      </div>
      <div className="bg-slate-50 rounded-lg p-2 sm:p-3 border border-slate-200">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
          Total Records
        </p>
        <p className="text-xl sm:text-2xl font-bold text-slate-700 mt-1">
          {totalCount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function TipChangeCount({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = backgroundMode || Boolean(bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [robots, setRobots] = useState([]);
  const [robotsLoading, setRobotsLoading] = useState(false);
  const [apiData, setApiData] = useState(null); // { pagination, tableData, chartData }

  const [filters, setFilters] = useState({
    areaId: targetFilters?.areaId || targetFilters?.area || "",
    lineId: targetFilters?.lineId || targetFilters?.line || "",
    stationId: targetFilters?.stationId || targetFilters?.station || "",
    robotId: targetFilters?.robotId || targetFilters?.robot || "",
    shifts: targetFilters?.shifts || ["A"],
  });

  const [dateRange, setDateRange] = useState(
    targetDateRange
      ? { start: targetDateRange.start, end: targetDateRange.end }
      : { start: todayISO, end: todayISO },
  );

  const [searchTriggered, setSearchTriggered] = useState(isBg);
  const [searchLoading, setSearchLoading] = useState(false);
  const chartRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const filtersRef = useRef(filters);
  const dateRangeRef = useRef(
    targetDateRange
      ? { start: targetDateRange.start, end: targetDateRange.end }
      : { start: todayISO, end: todayISO },
  );
  const masterDataRef = useRef([]);
  const robotsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((masterRes) => {
        const data = masterRes?.data ?? [];
        setMasterData(data);
        masterDataRef.current = data;

        if (targetFilters?.lineId || targetFilters?.line) {
          const area = targetFilters.areaId || targetFilters.area;
          const line = targetFilters.lineId || targetFilters.line;
          const station = targetFilters.stationId || targetFilters.station;
          const matchedCluster = data.find(
            (c) =>
              (area && String(c.ClusterId) === String(area)) ||
              (c.Lines ?? []).some((l) => String(l.LineId) === String(line)),
          );
          const matchedLine = (matchedCluster?.Lines ?? []).find(
            (l) => String(l.LineId) === String(line),
          );
          const matchedStation =
            station && station !== "All"
              ? String(station)
              : matchedLine?.Stations?.[0]?.StationId
                ? String(matchedLine.Stations[0].StationId)
                : "";
          setFilters((prev) => ({
            ...prev,
            areaId: matchedCluster ? String(matchedCluster.ClusterId) : String(area || ""),
            lineId: String(line),
            stationId: matchedStation,
            robotId:
              targetFilters.robotId && targetFilters.robotId !== "All"
                ? String(targetFilters.robotId)
                : prev.robotId,
            shifts: targetFilters.shifts || prev.shifts,
          }));
          setSearchTriggered(true);
        } else {
          const firstCluster = data[0];
          setFilters((prev) => ({
            ...prev,
            areaId: firstCluster?.ClusterId ?? "",
          }));
        }
      })
      .catch(console.error)
      .finally(() => setMasterLoading(false));
  }, []);

  useEffect(() => {
    if (!filters.stationId) {
      setRobots([]);
      return;
    }
    let cancelled = false;
    setRobotsLoading(true);
    robotHealthApi
      .getStatus({ stationId: filters.stationId })
      .then((res) => {
        if (cancelled) return;
        const data = res?.data ?? [];
        setRobots(data);
        robotsRef.current = data;
      })
      .catch((err) => {
        if (!cancelled) console.error(err);
      })
      .finally(() => {
        if (!cancelled) setRobotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters.stationId]);

  const areaOptions = useMemo(
    () =>
      masterData.map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const cluster = masterData.find(
      (c) => c.ClusterId === Number(filters.areaId),
    );
    const lines = cluster
      ? (cluster.Lines ?? [])
      : masterData.flatMap((c) => c.Lines ?? []);
    return lines.map((l) => opt(l.LineId, l.LineName));
  }, [masterData, filters.areaId]);

  const stationOptions = useMemo(() => {
    if (!filters.lineId) return [];
    const line = masterData
      .flatMap((c) => c.Lines ?? [])
      .find((l) => l.LineId === Number(filters.lineId));
    return (line?.Stations ?? []).map((s) =>
      opt(s.StationId, formatStationName(s.StationName)),
    );
  }, [masterData, filters.lineId]);

  const robotOptions = useMemo(
    () => robots.map((r) => opt(r.RobotId, r.Robot_Name)),
    [robots],
  );

  useEffect(() => {
    if (!lineOptions.length) return;
    const isValid = lineOptions.some(
      (o) => String(o.value) === String(filters.lineId),
    );
    if (isValid) return;
    const next = {
      ...filtersRef.current,
      lineId: lineOptions[0].value,
      stationId: "",
      robotId: "",
    };
    filtersRef.current = next;
    setFilters(next);
  }, [lineOptions]);

  useEffect(() => {
    if (!stationOptions.length) return;
    const isValid = stationOptions.some(
      (o) => String(o.value) === String(filters.stationId),
    );
    if (isValid) return;
    const next = {
      ...filtersRef.current,
      stationId: stationOptions[0].value,
      robotId: "",
    };
    filtersRef.current = next;
    setFilters(next);
  }, [stationOptions]);


  useEffect(() => {
    if (!robotOptions.length) return;
    const isValid = robotOptions.some(
      (o) => String(o.value) === String(filters.robotId),
    );
    if (isValid) return;
    const next = {
      ...filtersRef.current,
      robotId: robotOptions[0].value,
    };
    filtersRef.current = next;
    setFilters(next);
  }, [robotOptions]);

  const shiftOptions = useMemo(
    () => [
      { value: "All", label: "All Shifts" },
      ...(appConfig.production.shifts ?? [])
        .filter((s) => s.value !== "All")
        .map((s) => ({ value: s.value, label: s.label ?? `Shift ${s.value}` })),
    ],
    [],
  );

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "areaId", label: "Area", options: areaOptions },
      {
        type: "select",
        key: "lineId",
        label: "Line",
        options: lineOptions,
        disabled: lineOptions.length === 0,
      },
      {
        type: "select",
        key: "stationId",
        label: "Station",
        options: stationOptions,
        disabled: !filters.lineId || stationOptions.length === 0,
      },
      {
        type: "select",
        key: "robotId",
        label: robotsLoading ? "Loading robots..." : "Robot",
        options: robotOptions,
        disabled:
          !filters.stationId || robotsLoading || robotOptions.length === 0,
      },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: shiftOptions,
      },
    ],
    [
      areaOptions,
      lineOptions,
      stationOptions,
      robotOptions,
      shiftOptions,
      filters.lineId,
      filters.stationId,
      robotsLoading,
    ],
  );

  const handleFilterChange = useCallback((next) => {
    const prev = filtersRef.current;
    if (next.areaId !== prev.areaId) {
      next.lineId = "";
      next.stationId = "";
      next.robotId = "";
    } else if (next.lineId !== prev.lineId) {
      next.stationId = "";
      next.robotId = "";
    } else if (next.stationId !== prev.stationId) {
      next.robotId = "";
    }

    const prevShifts = prev.shifts ?? ["All"];
    let nextShifts = next.shifts ?? prevShifts;
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
    next.shifts = nextShifts;

    filtersRef.current = next;
    setFilters(next);
  }, []);

  useEffect(() => {
    if (!searchTriggered || !dateRangeRef.current) return;
    const { start, end } = dateRangeRef.current;
    const f = filtersRef.current;
    const controller = new AbortController();
    setSearchLoading(true);
    maintenanceApi
      .tipChangeCount(
        {
          fromDate: start,
          toDate: end,
          clusterId: f.areaId || undefined,
          lineId: f.lineId || undefined,
          stationId: f.stationId || undefined,
          robotId: f.robotId || undefined,
          shift: !f.shifts.includes("All") ? f.shifts.join(",") : undefined,
        },
        controller.signal,
      )
      .then(setApiData)
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("[TipChangeCount] auto-fetch error:", err);
        setApiData(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setSearchLoading(false);
      });
    return () => controller.abort();
  }, [filters]);

  const handleSearch = useCallback(async (start, end) => {
    const f = filtersRef.current;
    dateRangeRef.current = { start, end };
    setSearchLoading(true);
    setSearchTriggered(true);
    setDateRange({ start, end });
    try {
      const result = await maintenanceApi.tipChangeCount({
        fromDate: start,
        toDate: end,
        clusterId: f.areaId || undefined,
        lineId: f.lineId || undefined,
        stationId: f.stationId || undefined,
        robotId: f.robotId || undefined,
        shift: !f.shifts.includes("All") ? f.shifts.join(",") : undefined,
      });
      setApiData(result);
    } catch (err) {
      console.error("[TipChangeCount] API error:", err);
      setApiData(null);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Sync date range in background mode & trigger initial fetch
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      dateRangeRef.current = { start: s, end: e };
      setDateRange({ start: s, end: e });
      setSearchTriggered(true);
      handleSearch(s, e);
    }
  }, [isBg, targetDateRange, handleSearch]);

  const tipChangeTableData = useMemo(() => {
    if (!apiData?.tableData?.length) return [];
    return apiData.tableData.map((row, idx) => ({
      sr: idx + 1,
      datetime: formatDate(row.ProductionDate?.slice(0, 10)),
      shift: row.Shift ?? "",
      area: formatClusterName(row.ClusterName) ?? "",
      line: row.LineName ?? "",
      station: row.StationName ?? "",
      equipment: row.Robot_Name ?? "",
      tipchangecount: row.TipChangeCount ?? 0,
    }));
  }, [apiData]);

  const { tipChangeChartData, xAxisLabel } = useMemo(() => {
    if (!apiData?.chartData?.length) {
      return { tipChangeChartData: [], xAxisLabel: "Line" };
    }

    const chartData = apiData.chartData.map((row) => ({
      name: row.GroupName,
      TipChangeCount: row.TipChangeCount,
    }));

    let label = "Cluster";
    if (filters.robotId || filters.stationId) label = "Robot";
    else if (filters.lineId) label = "Station";
    else if (filters.areaId) label = "Line";

    return { tipChangeChartData: chartData, xAxisLabel: label };
  }, [
    apiData,
    filters.robotId,
    filters.stationId,
    filters.lineId,
    filters.areaId,
  ]);

  const tipChangeTableDataRef = useRef([]);
  useEffect(() => {
    tipChangeTableDataRef.current = tipChangeTableData;
  }, [tipChangeTableData]);

  const handleDownload = useCallback(async () => {
    const tableData = tipChangeTableDataRef.current;
    if (!dateRangeRef.current || (!tableData?.length && !isBg)) return;
    setDownloading(true);
    try {
      const f = filtersRef.current;
      const md = masterDataRef.current;
      const allLines = md.flatMap((c) => c.Lines ?? []);
      const allStations = allLines.flatMap((l) => l.Stations ?? []);

      const cluster = md.find((c) => c.ClusterId === Number(f.areaId));
      const areaLabel = cluster
        ? formatClusterName(cluster.ClusterName)
        : "All";
      const line = allLines.find((l) => l.LineId === Number(f.lineId));
      const lineLabel = line?.LineName ?? "All";
      const station = allStations.find(
        (s) => s.StationId === Number(f.stationId),
      );
      const stationLabel = station?.StationName ?? "All";
      const robot = robotsRef.current.find(
        (r) => r.RobotId === Number(f.robotId),
      );
      const equipmentLabel = robot?.Robot_Name ?? "All";
      const shiftLbl = f.shifts.includes("All")
        ? "All Shifts"
        : f.shifts.map((s) => `Shift ${s}`).join(", ");

      generateExcelWithSheets(
        [
          {
            sheetName: "Tip Change Count",
            headers: EXCEL_COLUMNS,
            rows: tableData,
          },
        ],
        "Tip_Change_Count_Report",
      );
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        buildAutoTableConfig,
      } = await import("../../../utils/PdfUtils");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const FONT = await loadKarlaFont(doc);
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 14;
      const HEADER_H = 40;

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const { start, end } = dateRangeRef.current;
      const subLines = [
        `Area : ${areaLabel}   |   Line : ${lineLabel}   |   Station : ${stationLabel}   |   Equipment : ${equipmentLabel}   |   Shift : ${shiftLbl}`,
        `Date Range : ${formatDate(start)} to ${formatDate(end)}`,
      ];

      function drawPageChrome(pageNum, totalPages) {
        drawPdfPageChrome(doc, {
          pageNum,
          totalPages,
          fontFamily: FONT,
          title: "Tip Change Count Report",
          subLines,
          jswImg,
          schaefflerImg,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      let chartImage = null;
      const overrides = [];
      const cssPropName = (camel) =>
        camel.replace(/([A-Z])/g, "-$1").toLowerCase();

      const oklchToRgb = (oklchStr) => {
        if (!oklchStr || oklchStr.includes("transparent")) return null;
        const lowerStr = oklchStr.toLowerCase();
        if (lowerStr.includes("oklch")) {
          const match = oklchStr.match(
            /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/,
          );
          if (match) {
            const L = parseFloat(match[1]);
            const C = parseFloat(match[2]);
            const H = parseFloat(match[3]);
            if (H >= 95 && H <= 105 && L >= 60) return "rgb(16, 185, 129)";
            if (H >= 0 && H <= 10 && L >= 50) return "rgb(244, 63, 94)";
            if (H >= 250 && H <= 260 && L >= 55) return "rgb(37, 99, 235)";
            if (H >= 200 && H <= 210 && L >= 65) return "rgb(30, 41, 59)";
            if (H >= 190 && H <= 210 && L >= 90) return "rgb(240, 249, 255)";
            if (L >= 90) return "rgb(255, 255, 255)";
            if (L <= 20) return "rgb(30, 30, 30)";
            return "rgb(200, 200, 200)";
          }
        }
        return null;
      };

      let originalBg = "";
      let originalParentBg = "";

      try {
        const { default: html2canvas } = await import("html2canvas");
        const chartEl = chartRef.current;

        if (chartEl) {
          originalBg = chartEl.style.backgroundColor;
          originalParentBg = chartEl.parentElement?.style.backgroundColor ?? "";

          chartEl.style.backgroundColor = "#ffffff";
          if (chartEl.parentElement) {
            chartEl.parentElement.style.backgroundColor = "#ffffff";
          }

          const allEls = [chartEl, ...chartEl.querySelectorAll("*")];
          const props = [
            "color",
            "backgroundColor",
            "borderTopColor",
            "borderRightColor",
            "borderBottomColor",
            "borderLeftColor",
            "fill",
            "stroke",
          ];

          allEls.forEach((el) => {
            const computed = window.getComputedStyle(el);
            props.forEach((prop) => {
              const val = computed[prop];
              if (val && val.includes("oklch")) {
                const rgb = oklchToRgb(val);
                if (rgb) {
                  const cssProp = cssPropName(prop);
                  overrides.push({
                    el,
                    prop: cssProp,
                    original: el.style.getPropertyValue(cssProp),
                  });
                  el.style.setProperty(cssProp, rgb, "important");
                }
              }
            });
          });

          allEls.forEach((el) => {
            const computed = window.getComputedStyle(el);
            const bgColor = computed.backgroundColor;
            if (bgColor && bgColor.includes("rgba")) {
              const rgbMatch = bgColor.match(/rgba?\((.*?)\)/);
              if (rgbMatch) {
                const parts = rgbMatch[1].split(",").map((p) => p.trim());
                if (parts.length >= 3) {
                  const alpha = parts[3] ? parseFloat(parts[3]) : 1;
                  let solidRgb;
                  if (alpha < 0.3) {
                    solidRgb = "rgb(255, 255, 255)";
                  } else {
                    solidRgb = `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
                  }
                  const original =
                    el.style.getPropertyValue("background-color");
                  overrides.push({ el, prop: "background-color", original });
                  el.style.setProperty(
                    "background-color",
                    solidRgb,
                    "important",
                  );
                }
              }
            }
          });

          await new Promise((r) => setTimeout(r, 100));

          const canvas = await html2canvas(chartEl, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            logging: false,
            allowTaint: true,
          });

          chartImage = {
            imgData: canvas.toDataURL("image/png"),
            w: canvas.width,
            h: canvas.height,
          };
        }
      } catch (e) {
        console.warn("[PDF] Chart capture failed:", e);
      } finally {
        if (chartRef.current) {
          if (originalBg) chartRef.current.style.backgroundColor = originalBg;
          if (chartRef.current.parentElement && originalParentBg) {
            chartRef.current.parentElement.style.backgroundColor =
              originalParentBg;
          }
        }
        overrides.forEach(({ el, prop, original }) => {
          if (original) el.style.setProperty(prop, original);
          else el.style.removeProperty(prop);
        });
      }

      const contentW = pageW - MARGIN * 2;
      const subH = subLines.length * 5.5 + 10;
      const chartTop = HEADER_H + subH + 4;
      const chartMaxH = pageH - chartTop - 22;

      doc.setFont(FONT, "bold");
      doc.setFontSize(11);
      doc.setTextColor(22, 70, 161);
      doc.text(
        `Tip Change Count — Area [${areaLabel}]  Line [${lineLabel}]  Station [${stationLabel}]  Equipment [${equipmentLabel}]`,
        MARGIN,
        chartTop,
      );

      if (chartImage) {
        const aspect = chartImage.w / chartImage.h;
        let imgW = contentW;
        let imgH = imgW / aspect;
        const availH = chartMaxH - 8;
        if (imgH > availH) {
          imgH = availH;
          imgW = imgH * aspect;
        }
        const cx = MARGIN + (contentW - imgW) / 2;
        doc.addImage(chartImage.imgData, "PNG", cx, chartTop + 6, imgW, imgH);
      } else {
        doc.setFont(FONT, "normal");
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("Chart could not be rendered.", MARGIN, chartTop + 20);
      }

      doc.addPage();
      const tableStartY = HEADER_H + 10;
      const tableConfig = buildAutoTableConfig(PDF_COLUMNS, tableData, doc, FONT);

      autoTable(doc, {
        ...tableConfig,
        startY: tableStartY,
        margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
        rowPageBreak: "avoid",
      });

      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPageChrome(i, total);
      }

      doc.save(`Tip_Change_Count_Report_${start}.pdf`);
    } catch (err) {
      console.error("[TipChangeCount] download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, []);

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || masterLoading || searchLoading || bgTriggeredRef.current) return;
    if (!tipChangeTableDataRef.current?.length && !searchTriggered) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tipChangeTableDataRef.current?.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, masterLoading, searchLoading, searchTriggered]);

  const tipChangeTableColumns = useMemo(() => {
    const showStation = !!filters.lineId;
    const showEquipment = !!filters.stationId;

    const cols = [
      { key: "sr", label: "Sr. No.", sortable: false },
      { key: "datetime", label: "Date", sortable: true, type: "mono" },
      { key: "shift", label: "Shift", sortable: true, type: "shift" },
      { key: "area", label: "Area", sortable: true },
      { key: "line", label: "Line", sortable: true, type: "primary" },

      ...(showStation
        ? [{ key: "station", label: "Station", sortable: true }]
        : []),
      ...(showEquipment
        ? [{ key: "equipment", label: "Robot", sortable: true }]
        : []),

      { key: "tipchangecount", label: "Tip Change Count", sortable: true },
    ];

    return cols;
  }, [filters.lineId, filters.stationId]);

  const chartContextLabel = useMemo(() => {
    if (filters.robotId) {
      return (
        robots.find((r) => r.RobotId === Number(filters.robotId))?.Robot_Name ??
        ""
      );
    }
    if (filters.stationId) {
      const st = masterData
        .flatMap((c) => c.Lines ?? [])
        .flatMap((l) => l.Stations ?? [])
        .find((s) => s.StationId === Number(filters.stationId));
      return st ? formatStationName(st.StationName) : "";
    }
    if (filters.lineId) {
      const line = masterData
        .flatMap((c) => c.Lines ?? [])
        .find((l) => l.LineId === Number(filters.lineId));
      return line?.LineName ?? "";
    }
    if (filters.areaId) {
      const cluster = masterData.find(
        (c) => c.ClusterId === Number(filters.areaId),
      );
      return cluster ? formatClusterName(cluster.ClusterName) : "";
    }
    return "All";
  }, [
    filters.robotId,
    filters.stationId,
    filters.lineId,
    filters.areaId,
    masterData,
    robots,
  ]);

  if (masterLoading) {
    return (
      <div className="space-y-4 py-2">
        <div className="bg-white rounded-xl shadow-lg pt-4 px-6 pb-4 w-full">
          <ChartShimmer />
        </div>
        <TableShimmer rows={5} />
      </div>
    );
  }

  const hasData =
    searchTriggered &&
    !searchLoading &&
    tipChangeChartData.length > 0 &&
    tipChangeChartData.some((d) => d.TipChangeCount > 0);

  return (
    <div className="space-y-4 py-2">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />

      <DateRangeBar
        reportName="Tip_Change_Count"
        showDownload
        onSearch={handleSearch}
        onDownload={handleDownload}
        isDownloading={downloading}
        selectedStartDate={dateRange.start}
        selectedEndDate={dateRange.end}
      />

      {hasData && !searchLoading && (
        <SummaryCards
          totalCount={apiData?.pagination?.totalCount ?? 0}
          xAxisLabel={xAxisLabel}
          chartData={tipChangeChartData}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg pt-5 px-6 pb-4 w-full">
        {hasData && !searchLoading && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold tracking-wide text-gray-800">
              Average Tip Change Count
            </h2>
            <div className=" flex items-center gap-2 text-xs flex-wrap">
              <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                {xAxisLabel}: {chartContextLabel}
              </span>
              <span className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
                {tipChangeChartData.length} {xAxisLabel}
                {tipChangeChartData.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}

        <div ref={chartRef}>
          {searchLoading ? (
            <ChartShimmer />
          ) : !searchTriggered ? (
            <SearchPromptState pageName={PAGE_NAME} />
          ) : !hasData ? (
            <NoDataState />
          ) : (
            <div className="h-[280px] sm:h-[320px] md:h-[350px] lg:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tipChangeChartData}
                  margin={
                    isMobile
                      ? { top: 24, right: 10, left: 10, bottom: 12 }
                      : { top: 30, right: 30, left: 25, bottom: 50 }
                  }
                  barCategoryGap={
                    tipChangeChartData.length === 1
                      ? isMobile
                        ? "35%"
                        : "45%"
                      : tipChangeChartData.length === 2
                        ? "25%"
                        : "20%"
                  }
                  barGap={4}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    angle={tipChangeChartData.length > 3 ? -30 : 0}
                    textAnchor={
                      tipChangeChartData.length > 3 ? "end" : "middle"
                    }
                    interval={0}
                    height={isMobile ? 34 : 50}
                    tick={{
                      fontSize: isMobile ? 10 : 14,
                      fontWeight: 600,
                      fill: "#374151",
                    }}
                    tickMargin={isMobile ? 4 : 8}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={{ stroke: "#d1d5db" }}
                  >
                    <Label
                      value={xAxisLabel}
                      position="insideBottom"
                      offset={isMobile ? 0 : -10}
                      style={{
                        fontWeight: 700,
                        fill: "#6b7280",
                        fontSize: isMobile ? 11 : 14,
                      }}
                    />
                  </XAxis>
                  <YAxis
                    domain={[0, "auto"]}
                    tick={{ fontSize: 13, fill: "#374151" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={false}
                  >
                    <Label
                      value=" Tip Change Count"
                      angle={-90}
                      position="insideLeft"
                      offset={-5}
                      style={{
                        textAnchor: "middle",
                        fontWeight: 700,
                        fill: "#374151",
                        fontSize: 14,
                      }}
                    />
                  </YAxis>
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(74,143,240,0.06)" }}
                  />
                  {/* <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={isMobile ? 8 : 10}
                    wrapperStyle={{
                      fontSize: isMobile ? 11 : 14,
                      paddingTop: isMobile ? 4 : 15,
                      color: "#374151",
                      fontWeight: 500,
                    }}
                  /> */}
                  <Bar
                    dataKey="TipChangeCount"
                    name="Tip Change Count"
                    fill="#4A8FF0"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={
                      tipChangeChartData.length === 1
                        ? isMobile
                          ? 90
                          : 140
                        : tipChangeChartData.length === 2
                          ? isMobile
                            ? 70
                            : 110
                          : 80
                    }
                  >
                    <LabelList
                      dataKey="TipChangeCount"
                      position="top"
                      style={{ fontWeight: 700, fontSize: 13, fill: "#374151" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {hasData && (
        searchLoading ? (
          <TableShimmer rows={5} />
        ) : (
          <DataTable
            columns={tipChangeTableColumns}
            data={tipChangeTableData}
            defaultRows={5}
            title="Average Tip Change Count Records"
          />
        )
      )}
    </div>
  );
}