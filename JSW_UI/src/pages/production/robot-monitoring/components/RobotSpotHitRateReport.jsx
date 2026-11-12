import { useState, useMemo, useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../../production-control/productionOverviewComp/ChartCard";
import DataTable from "../../../../sharedComponents/DataTable";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../../sharedComponents/FilterBar";
import EmptyState, { SearchPromptState, NoDataState } from "../../../../sharedComponents/EmptyState";
import { masterApi, robotApi } from "../../../../services/api";
import { generateExcel } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";


const PAGE_NAME = "Robot Spot Hit Rate Report";

// ── Table columns ─────────────────────────────────────────────────────────────

const formatTimestamp = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d)) return val;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const date = `${y}-${m}-${day}`;
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });
  return `${date} | ${time}`;
};

const tableColumns = [
  { key: "SrNo", label: "Sr. No.", sortable: false },
  {
    key: "Timestamp",
    label: "Date & Time",
    sortable: true,
    type: "mono",
    render: (item) => formatTimestamp(item.Timestamp),
  },
  { key: "CabinNo", label: "BIW No.", sortable: true },
  { key: "Robot_Name", label: "Robot", sortable: true, type: "primary" },
  { key: "GunID", label: "Gun", sortable: true },
  { key: "Target", label: "Target", sortable: true },
  { key: "SpotActual", label: "Spot Actual", sortable: true },
  {
    key: "SpotMiss",
    label: "Spot Miss",
    sortable: true,
    render: (item) => item.SpotActual - item.Target,
  },
  { key: "SpotAccuracy", label: "Spot Accuracy (%)", sortable: true },
];

const pdfColumns = [
  { key: "sr", label: "Sr. No." },
  {
    key: "Timestamp",
    label: "Date & Time",
    pdfValue: (item) => formatTimestamp(item.Timestamp),
  },
  { key: "CabinNo", label: "BIW No." },
  { key: "Robot_Name", label: "Robot", type: "primary" },
  { key: "GunID", label: "Gun" },
  { key: "Target", label: "Target" },
  { key: "SpotActual", label: "Spot Actual" },
  {
    key: "SpotMiss",
    label: "Spot Miss",
    pdfValue: (item) => item.SpotActual - item.Target,
  },
  {
    key: "SpotAccuracy",
    label: "Spot Accuracy (%)",
    pdfValue: (item) =>
      item.SpotAccuracy !== undefined && item.SpotAccuracy !== null
        ? `${item.SpotAccuracy}%`
        : "—",
  },
];

// ── Canvas auto-crop (trims surrounding whitespace) ────────────────────────
function autoCropCanvas(canvas, bgThreshold = 245, tolerance = 10) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const { data } = ctx.getImageData(0, 0, width, height);

  let minX = width, minY = height, maxX = 0, maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3];
      if (a === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const isBackground =
        r > bgThreshold - tolerance &&
        g > bgThreshold - tolerance &&
        b > bgThreshold - tolerance;
      if (!isBackground) {
        found = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) return canvas;

  const pad = 10; // small breathing room
  const cx = Math.max(0, minX - pad);
  const cy = Math.max(0, minY - pad);
  const cw = Math.min(width, maxX + pad) - cx;
  const ch = Math.min(height, maxY + pad) - cy;

  const cropped = document.createElement("canvas");
  cropped.width = cw;
  cropped.height = ch;
  cropped.getContext("2d").drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
  return cropped;
}

// ── Chart helpers ─────────────────────────────────────────────────────────────

function transformTrendData(equipmentGroups) {
  const allDates = [
    ...new Set(equipmentGroups.flatMap((g) => g.spotdata.map((e) => e.date))),
  ].sort();

  const origin = { date: "" };
  equipmentGroups.forEach((g) => {
    origin[g.name] = 0;
  });

  const rows = allDates.map((date) => {
    const row = { date };
    equipmentGroups.forEach((g) => {
      const vals = g.spotdata
        .filter((e) => e.date === date)
        .map((e) => e.spotaccuracy);
      row[g.name] = vals.length
        ? parseFloat((vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1))
        : null;
    });
    return row;
  });

  return [origin, ...rows];
}

// ── KPI Card ──────────────────────────────────────────────────────────────────

const STAT_TINT = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    label: "text-blue-700",
    value: "text-blue-900",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    label: "text-emerald-700",
    value: "text-emerald-900",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    label: "text-red-700",
    value: "text-red-900",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    label: "text-amber-700",
    value: "text-amber-900",
  },
};

function StatCard({ title, value, color = "blue" }) {
  const s = STAT_TINT[color];
  return (
    <div
      className={`${s.bg} rounded-lg p-2.5 sm:p-3 lg:p-4 border ${s.border} min-w-0`}
    >
      <p
        className={`text-[10px] sm:text-xs ${s.label} font-semibold uppercase tracking-wide truncate`}
      >
        {title}
      </p>
      <p
        className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${s.value} mt-1`}
      >
        {value?.toLocaleString?.() ?? value}
      </p>
    </div>
  );
}

// ── Charts ────────────────────────────────────────────────────────────────────

function SpotPieChart({ totalActual, totalMiss }) {
  const hitRate =
    totalActual + totalMiss > 0
      ? ((totalActual / (totalActual + totalMiss)) * 100).toFixed(1)
      : "0.0";

  const options = {
    chart: { type: "donut", animations: { enabled: true, speed: 600 } },
    labels: ["Spot Missed", "Spot Actual"],
    colors: ["#F87171", "#34D399"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "13px",
              color: "#6B7280",
              offsetY: -4,
            },
            value: {
              show: true,
              fontSize: "26px",
              fontWeight: "700",
              color: "#111827",
              offsetY: 6,
            },
            total: {
              show: true,
              label: "Hit Rate",
              fontSize: "12px",
              color: "#9CA3AF",
              formatter: () => `${hitRate}%`,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      fontSize: "13px",
      fontWeight: 600,
      offsetY: 4,
      markers: { width: 10, height: 10, radius: 3 },
    },
    stroke: { width: 0 },
    tooltip: { theme: "light", y: { formatter: (v) => `${v} spots` } },
  };

  return (
    <ReactApexChart
      key={`${totalActual}-${totalMiss}`}
      options={options}
      series={[totalMiss, totalActual]}
      type="donut"
      height={300}
    />
  );
}

const TREND_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
];

function SpotTrendLineChart({ data }) {
  const chartData = transformTrendData(data);
  const equipmentNames = data.map((g) => g.name);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            angle={-25}
            textAnchor="end"
            height={48}
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tickCount={6}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickFormatter={(v) => `${v}%`}
            label={{
              value: "Hit Rate (%)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#9CA3AF" },
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              value !== null ? `${value}%` : "No data",
              name,
            ]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 8 }}
          />
          {equipmentNames.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={TREND_COLORS[i % TREND_COLORS.length]}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RobotSpotHitRateReport({
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

  const [hasSearched, setHasSearched] = useState(isBg);
  const [hasFetched, setHasFetched] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rawData, setRawData] = useState([]);
  const [masterClusters, setMasterClusters] = useState([]);
  const [robotList, setRobotList] = useState([]);
  const [filters, setFilters] = useState({
    lineId: targetFilters?.lineId || targetFilters?.line || "",
    stationId: targetFilters?.stationId || targetFilters?.station || "",
    robotId: targetFilters?.robotId || targetFilters?.robot || "",
    gunId: targetFilters?.gunId || targetFilters?.gun || "",
  });
  const initialStart = targetDateRange?.start || targetDateRange?.startDate || targetDateRange?.from || "";
  const initialEnd = targetDateRange?.end || targetDateRange?.endDate || targetDateRange?.to || "";
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const pieChartRef = useRef(null);
  const trendChartRef = useRef(null);

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => setMasterClusters(res?.data ?? []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!filters.stationId) {
      setRobotList([]);
      return;
    }
    robotApi
      .getHealth({ stationId: filters.stationId })
      .then((res) => setRobotList(res?.data ?? []))
      .catch(() => setRobotList([]));
  }, [filters.stationId]);

  const allLines = useMemo(
    () => masterClusters.flatMap((c) => c.Lines ?? []),
    [masterClusters],
  );

  const lineOptions = useMemo(
    () => allLines.map((l) => ({ label: l.LineName, value: String(l.LineId) })),
    [allLines],
  );

  const stationOptions = useMemo(() => {
    const line = allLines.find((l) => String(l.LineId) === filters.lineId);
    return (line?.Stations ?? []).map((s) => ({
      label: s.StationName,
      value: String(s.StationId),
    }));
  }, [allLines, filters.lineId]);

  const robotOptions = useMemo(() => {
    const seen = new Set();
    return robotList
      .filter((r) => {
        if (seen.has(r.RobotId)) return false;
        seen.add(r.RobotId);
        return true;
      })
      .map((r) => ({ label: r.Robot_Name, value: String(r.RobotId) }));
  }, [robotList]);

  useEffect(() => {
    if (lineOptions.length > 0)
      setFilters((prev) =>
        prev.lineId ? prev : { ...prev, lineId: lineOptions[0].value },
      );
  }, [lineOptions]);

  useEffect(() => {
    if (stationOptions.length > 0)
      setFilters((prev) =>
        prev.stationId ? prev : { ...prev, stationId: stationOptions[0].value },
      );
  }, [stationOptions]);

  useEffect(() => {
    if (robotOptions.length > 0)
      setFilters((prev) =>
        prev.robotId ? prev : { ...prev, robotId: robotOptions[0].value },
      );
  }, [robotOptions]);

  useEffect(() => {
    if (isBg && targetDateRange) {
      const s = targetDateRange.start || targetDateRange.startDate || targetDateRange.from;
      const e = targetDateRange.end || targetDateRange.endDate || targetDateRange.to;
      if (s) setStartDate(s);
      if (e) setEndDate(e);
      setHasSearched(true);
    }
  }, [isBg, targetDateRange]);

  useEffect(() => {
    if (isBg && targetFilters) {
      setFilters((prev) => ({
        ...prev,
        lineId: targetFilters.lineId || targetFilters.line || prev.lineId,
        stationId: targetFilters.stationId || targetFilters.station || prev.stationId,
        robotId: targetFilters.robotId || targetFilters.robot || prev.robotId,
        gunId: targetFilters.gunId || targetFilters.gun || prev.gunId,
      }));
      setHasSearched(true);
    }
  }, [isBg, targetFilters]);

  const gunOptions = useMemo(() => {
    const uniqueGuns = [...new Set(rawData.map((r) => String(r.GunID)).filter(Boolean))].sort();
    return [
      { label: "All", value: "" },
      ...uniqueGuns.map((g) => ({ label: `Gun ${g}`, value: g })),
    ];
  }, [rawData]);

  const filterConfig = [
    { type: "select", key: "lineId", label: "Line", options: lineOptions },
    {
      type: "select",
      key: "stationId",
      label: "Station",
      options: stationOptions,
    },
    {
      type: "select",
      key: "robotId",
      label: "Robot",
      options: robotOptions,
    },
    {
      type: "select",
      key: "gunId",
      label: "Gun",
      options: gunOptions,
    },
  ];

  const handleFilterChange = (newFilters) => {
    if (newFilters.lineId !== filters.lineId) {
      setFilters({ lineId: newFilters.lineId, stationId: "", robotId: "", gunId: "" });
      return;
    }
    if (newFilters.stationId !== filters.stationId) {
      setFilters({ ...newFilters, robotId: "", gunId: "" });
      return;
    }
    setFilters(newFilters);
  };

  const fetchData = (lineId, stationId, start, end) => {
    setError("");
    setLoading(true);
    robotApi
      .getSpotHitRate({
        lineId: lineId || undefined,
        stationId: stationId || undefined,
        startDate: start || undefined,
        endDate: end || undefined,
      })
      .then((res) => setRawData(res?.data || []))
      .catch((err) => setError(err.message || "Failed to load data"))
      .finally(() => {
        setLoading(false);
        setHasFetched(true);
      });
  };

  const handleSearch = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setHasSearched(true);
    fetchData(filters.lineId, filters.stationId, start, end);
  };

  useEffect(() => {
    if (!hasSearched || !startDate || !endDate) return;
    fetchData(filters.lineId, filters.stationId, startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.lineId, filters.stationId, startDate, endDate, hasSearched]);

  const tableData = useMemo(() => {
    let data = rawData;
    if (filters.robotId) {
      data = data.filter((r) => String(r.RobotId) === filters.robotId);
    }
    if (filters.gunId) {
      data = data.filter((r) => String(r.GunID) === filters.gunId);
    }
    return data;
  }, [rawData, filters.robotId, filters.gunId]);

  const totalActual = useMemo(
    () => tableData.reduce((s, d) => s + (d.SpotActual ?? 0), 0),
    [tableData],
  );
  const totalMiss = useMemo(
    () => tableData.reduce((s, d) => s + (d.SpotMiss ?? 0), 0),
    [tableData],
  );
  const avgAccuracy = useMemo(
    () =>
      tableData.length > 0
        ? (
          tableData.reduce((s, d) => s + parseFloat(d.SpotAccuracy ?? 0), 0) /
          tableData.length
        ).toFixed(1)
        : "—",
    [tableData],
  );

  const trendChartData = useMemo(() => {
    const grouped = {};
    tableData.forEach((item) => {
      const key = item.Robot_Name ?? `Robot ${item.RobotId}`;
      if (!grouped[key]) grouped[key] = { name: key, spotdata: [] };
      grouped[key].spotdata.push({
        date: String(item.Timestamp).split("T")[0],
        spotaccuracy: Number(item.SpotAccuracy),
      });
    });
    return Object.values(grouped).map((r) => ({
      ...r,
      spotdata: [...r.spotdata].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      ),
    }));
  }, [tableData]);

  const lineLabel = useMemo(
    () => lineOptions.find((l) => l.value === filters.lineId)?.label ?? "All",
    [lineOptions, filters.lineId],
  );
  const stationLabel = useMemo(
    () => stationOptions.find((s) => s.value === filters.stationId)?.label ?? "All",
    [stationOptions, filters.stationId],
  );
  const robotLabel = useMemo(() => {
    if (!filters.robotId) return "All";
    return robotOptions.find((r) => r.value === filters.robotId)?.label ?? "All";
  }, [filters.robotId, robotOptions]);

  const handleDownload = async () => {
    if (!tableData.length && !isBg) return;
    setDownloading(true);
    try {
      if (!isBg) {
        generateExcel(
          tableColumns.map((c) => ({ label: c.label, accessor: c.key })),
          tableData,
          "Robot_Spot_Hit_Rate_Report",
        );
      }

      // ── PDF ──────────────────────────────────────────────────────────────
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        buildAutoTableConfig,
      } = await import("../../../../utils/PdfUtils");

      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      const FONT = await loadKarlaFont(doc);
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 14;
      const HEADER_H = 40;
      const contentW = pageW - MARGIN * 2;

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const gunLabel = gunOptions.find((g) => g.value === filters.gunId)?.label ?? "All";
      const subLines = [
        `Date Range : ${startDate || "—"}  to  ${endDate || "—"}`,
        `Line : ${lineLabel}   |   Station : ${stationLabel}   |   Robot : ${robotLabel}   |   Gun : ${gunLabel}`,
      ];
      const subH = subLines.length * 5.5 + 10;

      const captureImg = async (ref, withAutoCrop = false) => {
        if (!ref?.current) return null;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return null;
        try {
          const { toPng } = await import("html-to-image");
          const dataUrl = await toPng(el, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
            width: rect.width,
            height: rect.height,
          });
          return { dataUrl, w: rect.width * 2, h: rect.height * 2 };
        } catch (toPngErr) {
          console.warn("toPng failed, falling back to html2canvas:", toPngErr);
        }
        try {
          const { default: html2canvas } = await import("html2canvas-pro");
          const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
          const cropped = withAutoCrop ? autoCropCanvas(canvas) : canvas;
          return { dataUrl: cropped.toDataURL("image/png"), w: cropped.width, h: cropped.height };
        } catch (canvasErr) {
          console.warn("html2canvas fallback also failed:", canvasErr);
          return null;
        }
      };

      const [pieImg, trendImg] = await Promise.all([
        captureImg(pieChartRef, true),
        captureImg(trendChartRef, false),
      ]);

      let y = HEADER_H + subH;
      const chartGap = 6;
      const bottomMargin = 14;
      const totalChartsH = pageH - y - bottomMargin - chartGap;
      const pieChartH = totalChartsH * 0.38;
      const trendChartH = totalChartsH * 0.62;

      const drawChart = (img, yPos, maxH) => {
        if (!img) return yPos;
        const aspect = img.w / img.h;
        let imgW = contentW;
        let imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = MARGIN + (contentW - imgW) / 2;
        doc.addImage(img.dataUrl, "PNG", cx, yPos, imgW, imgH);
        return yPos + imgH;
      };

      y = drawChart(pieImg, y, pieChartH) + chartGap;
      drawChart(trendImg, y, trendChartH);

      // ── Table (own page) ─────────────────────────────────────────────────
      doc.addPage();
      const tableConfig = buildAutoTableConfig(pdfColumns, tableData, doc, FONT);
      autoTable(doc, {
        ...tableConfig,
        startY: HEADER_H + 8,
        margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
        rowPageBreak: "avoid",
      });

      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages: total,
          fontFamily: FONT,
          title: "Robot Spot Hit Rate Report",
          subLines: i === 1 ? subLines : [],
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`Robot_Spot_Hit_Rate_Report_${startDate || "report"}.pdf`);

      if (isBg) {
        try {
          const excelCols = [
            { label: "Sr. No.", accessor: "SrNo" },
            { label: "Date & Time", accessor: "Timestamp", render: formatTimestamp },
            { label: "BIW No.", accessor: "CabinNo" },
            { label: "Robot", accessor: "Robot_Name" },
            { label: "Gun", accessor: "GunID" },
            { label: "Target", accessor: "Target" },
            { label: "Spot Actual", accessor: "SpotActual" },
            { label: "Spot Miss", accessor: "SpotMiss" },
            { label: "Spot Accuracy (%)", accessor: "SpotAccuracy" },
          ];
          generateExcel(excelCols, tableData, "Robot_Spot_Hit_Rate_Report");
        } catch (excelErr) {
          console.warn("[RobotSpotHitRateReport] Excel export failed:", excelErr);
        }
      }
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || loading || !hasFetched || bgTriggeredRef.current) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, 1200);
    // Removed clearTimeout to prevent race condition canceling export
  }, [isBg, loading, hasFetched]);

  const uniqueDatesCount = new Set(
    trendChartData.flatMap((g) => g.spotdata.map((e) => e.date))
  ).size;
  const isWideLayout = uniqueDatesCount > 7;

  return (
    <>
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />

      <DateRangeBar
        showDownload={true}
        onDownload={handleDownload}
        isDownloading={downloading}
        onSearch={handleSearch}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        reportName="Robot_Spot_Hit_Rate"
      />

      {!hasSearched ? (
        <SearchPromptState pageName={PAGE_NAME} />
      ) : loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center text-gray-400">
          Loading...
        </div>
      ) : error ? (
        <EmptyState color="red" title={error} />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mb-4">
            <StatCard
              title="Total Spots"
              value={totalActual + totalMiss}
              color="blue"
            />
            <StatCard title="Spot Actual" value={totalActual} color="emerald" />
            <StatCard title="Spot Missed" value={totalMiss} color="red" />
            <StatCard
              title="Avg Hit Rate"
              value={avgAccuracy !== "—" ? `${avgAccuracy}%` : "—"}
              color="amber"
            />
          </div>

          <div className={`grid grid-cols-1 ${isWideLayout ? "" : "md:grid-cols-3"} gap-4 mb-4`}>
            <div className={isWideLayout ? "" : "md:col-span-1"} ref={pieChartRef}>
              <ChartCard
                title="Spot Hit Rate"
                shadow
                border="border border-gray-100"
              >
                <SpotPieChart totalActual={totalActual} totalMiss={totalMiss} />
              </ChartCard>
            </div>
            <div className={isWideLayout ? "" : "md:col-span-2"} ref={trendChartRef}>
              <ChartCard
                title="Hit Rate Trend"
                shadow
                border="border border-gray-100"
              >
                {trendChartData.length > 0 ? (
                  <SpotTrendLineChart data={trendChartData} />
                ) : (
                  <div className="flex items-center justify-center h-[260px] text-gray-400 text-sm">
                    No trend data available
                  </div>
                )}
              </ChartCard>
            </div>
          </div>

          {tableData.length > 0 ? (
            <DataTable
              title="Robot Spot Hit Rate Report"
              columns={tableColumns}
              data={tableData}
              defaultRows={10}
            />
          ) : (
            <NoDataState />
          )}
        </>
      )}
    </>
  );
}