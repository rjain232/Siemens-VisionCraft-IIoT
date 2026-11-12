import { useState, useMemo, useRef, useEffect } from "react";
import { Zap } from "lucide-react";
import { useBackgroundExport } from "../../../context/BackgroundExportContext";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../sharedComponents/FilterBar";
import DataTable from "../../../sharedComponents/DataTable";
import { NoDataState, SearchPromptState } from "../../../sharedComponents/EmptyState";
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";
import { buildAutoTableConfig, drawPdfPageChrome, loadBrandingLogos, loadKarlaFont } from "../../../utils/PdfUtils";
import { generateExcel } from "../../../utils/ExcelUtils";

// ── Dummy data ─────────────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];

const METERS_DATA = [
  {
    id: "WPDP-1",
    area: "cluster1",
    line: "UB",
    subCluster: "SC1",
    consumption: 67,
    consumptionDetails: [
      { time: "00:00", consumption: 53 },
      { time: "00:06", consumption: 64 },
      { time: "00:12", consumption: 120 },
    ],
  },
  {
    id: "WPDP-2",
    area: "cluster1",
    line: "UB",
    subCluster: "SC1",
    consumption: 82,
    consumptionDetails: [
      { time: "00:00", consumption: 68 },
      { time: "00:06", consumption: 68 },
      { time: "00:12", consumption: 150 },
    ],
  },
  {
    id: "WPDP-3",
    area: "cluster2",
    line: "UB",
    subCluster: "SC2",
    consumption: 45,
    consumptionDetails: [
      { time: "00:00", consumption: 35 },
      { time: "00:06", consumption: 80 },
      { time: "00:12", consumption: 80 },
    ],
  },
  {
    id: "WPDP-4",
    area: "cluster2",
    line: "TG",
    subCluster: "SC2",
    consumption: 58,
    consumptionDetails: [
      { time: "00:00", consumption: 32 },
      { time: "00:06", consumption: 35 },
      { time: "00:12", consumption: 90 },
    ],
  },
  {
    id: "WPDP-5",
    area: "cluster3",
    line: "TG",
    subCluster: "SC3",
    consumption: 91,
    consumptionDetails: [
      { time: "00:00", consumption: 29 },
      { time: "00:06", consumption: 35 },
      { time: "00:12", consumption: 120 },
    ],
  },
  {
    id: "WPDP-6",
    area: "cluster3",
    line: "RF",
    subCluster: "SC3",
    consumption: 38,
    consumptionDetails: [
      { time: "00:00", consumption: 42 },
      { time: "00:06", consumption: 45 },
      { time: "00:12", consumption: 80 },
    ],
  },
];

// ── Filter config ──────────────────────────────────────────────────────
const FILTER_CONFIG = [
  {
    key: "area",
    label: "Area",
    type: "select",
    options: [
      { value: "cluster1", label: "Cluster 01" },
      { value: "cluster2", label: "Cluster 02" },
      { value: "cluster3", label: "Cluster 03" },
      { value: "cluster4", label: "Cluster 04" },
      { value: "cluster5", label: "Cluster 05" },
    ],
  },
  {
    key: "line",
    label: "Line Station",
    type: "select",
    options: [
      { value: "UB", label: "UB" },
      { value: "FF", label: "FF" },
      { value: "RF", label: "RF" },
      { value: "FE", label: "FE" },
      { value: "Roof", label: "Roof" },
      { value: "TG", label: "TG" },
      { value: "ML", label: "ML" },
    ],
  },
  {
    key: "subCluster",
    label: "Sub-Cluster",
    type: "select",
    options: [
      { value: "SC1", label: "SC 01" },
      { value: "SC2", label: "SC 02" },
      { value: "SC3", label: "SC 03" },
      { value: "SC4", label: "SC 04" },
    ],
  },
  {
    key: "shift",
    label: "Shift",
    type: "select",
    options: [
      { value: "A", label: "Shift A" },
      { value: "B", label: "Shift B" },
      { value: "C", label: "Shift C" },
    ],
  },
];

// ── Table columns ──────────────────────────────────────────────────────
const TABLE_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "meterName", label: "Meter Name", type: "primary", sortable: true },
  { key: "area", label: "Area", sortable: true },
  { key: "lineStation", label: "Line Station", sortable: true },
  { key: "subCluster", label: "Sub-Cluster", sortable: true },
  { key: "shift", label: "Shift", type: "shift" },
  { key: "consumption", label: "Consumption (kWh)", sortable: true },
];

// ── Status helper ──────────────────────────────────────────────────────
const getStatus = (value) => {
  if (value <= 50)
    return {
      color: "#16a34a",
      trackBg: "#bbf7d0",
      label: "Efficient",
      dot: "bg-emerald-400",
    };
  if (value <= 75)
    return {
      color: "#d97706",
      trackBg: "#fde68a",
      label: "Optimal",
      dot: "bg-amber-400",
    };
  return {
    color: "#dc2626",
    trackBg: "#fecaca",
    label: "Critical",
    dot: "bg-red-400",
  };
};

const getMeterName = (meter, line) =>
  !line || line === "UB" ? meter.id : `${line}DP-${meter.id.split("-")[1]}`;

// ── Gauge ──────────────────────────────────────────────────────────────
const GaugeChart = ({ value, maxValue = 150 }) => {
  const { color, trackBg } = getStatus(value);
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="relative" style={{ width: 174, height: 164 }}>
      <PieChart width={174} height={164}>
        <Pie
          data={[{ value: 100 }]}
          cx="50%"
          cy="65%"
          startAngle={225}
          endAngle={-45}
          innerRadius={48}
          outerRadius={64}
          fill="#f1f5f9"
          dataKey="value"
          stroke="none"
          isAnimationActive={false}
        />
        <Pie
          data={[{ value: pct }, { value: 100 - pct }]}
          cx="50%"
          cy="65%"
          startAngle={225}
          endAngle={-45}
          innerRadius={48}
          outerRadius={64}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="transparent" />
        </Pie>
      </PieChart>

      {/* Center */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center pointer-events-none"
        style={{
          width: 88,
          height: 88,
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: trackBg,
        }}
      >
        <span className="text-xl font-extrabold leading-none" style={{ color }}>
          {value}
        </span>
        <span
          className="text-[10px] font-bold tracking-wide mt-0.5"
          style={{ color }}
        >
          kWh
        </span>
      </div>
    </div>
  );
};

// ── Custom tooltip ─────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, color }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-100 px-3 py-2 text-left">
      <p className="text-[10px] text-slate-400 mb-1 font-medium">{label}</p>
      <p className="text-sm font-bold" style={{ color }}>
        {payload[0].value}{" "}
        <span className="text-xs font-normal text-slate-400">kWh</span>
      </p>
    </div>
  );
};

// ── Meter card ─────────────────────────────────────────────────────────
const MeterCard = ({ meter, selectedLine }) => {
  const name = getMeterName(meter, selectedLine);
  const status = getStatus(meter.consumption);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="bg-sky-100 p-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-sm font-bold text-slate-800 tracking-wide">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className="text-xs font-semibold text-slate-500">
            {status.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex items-center gap-0 px-4 py-4">
        {/* Left — gauge */}
        <div className="flex flex-col items-center shrink-0 pr-4">
          <GaugeChart value={meter.consumption} />
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Total Consumption
          </p>
          <p
            className="text-sm font-bold mt-0.5"
            style={{ color: status.color }}
          >
            {meter.consumption} kWh
          </p>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-slate-100" />

        {/* Right — trend chart */}
        <div className="flex-1 min-w-0 pl-4">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Consumption Trend
          </p>
          <ResponsiveContainer width="100%" height={172}>
            <AreaChart
              data={meter.consumptionDetails}
              margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`g-${meter.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={status.color}
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="100%"
                    stopColor={status.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip content={<CustomTooltip color={status.color} />} />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke={status.color}
                strokeWidth={2}
                fill={`url(#g-${meter.id})`}
                dot={{
                  r: 3.5,
                  fill: status.color,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: status.color,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ── Summary stat card (matches AlarmReport KPI style) ─────────────────
const StatCard = ({
  label,
  value,
  sub,
  bg,
  border,
  labelColor,
  valueColor,
}) => (
  <div className={`${bg} rounded-lg p-3 border ${border}`}>
    <p
      className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}
    >
      {label}
    </p>
    <p className={`text-2xl font-bold mt-1 ${valueColor}`}>
      {value}
      {sub && <span className="text-sm font-normal ml-1">{sub}</span>}
    </p>
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────
export default function EnergyConsumption({
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

  const [hasSearched, setHasSearched] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [filters, setFilters] = useState({
    area: "cluster1",
    line: "UB",
    subCluster: "SC1",
    shift: "A",
  });
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const meterCardsRef = useRef(null);

  const handleSearch = (startDate, endDate) => {
    setHasSearched(true);
    setDateFilter({ startDate, endDate });
  };

  // Sync date range & filters in background mode
  useEffect(() => {
    if (isBg) {
      if (targetFilters?.area || targetFilters?.line || targetFilters?.shift) {
        setFilters((prev) => ({
          ...prev,
          ...(targetFilters.area ? { area: targetFilters.area } : {}),
          ...(targetFilters.line ? { line: targetFilters.line } : {}),
          ...(targetFilters.shift ? { shift: targetFilters.shift } : {}),
        }));
      }
      if (targetDateRange?.start) {
        const s = targetDateRange.start;
        const e = targetDateRange.end || targetDateRange.start;
        handleSearch(s, e);
      }
    }
  }, [isBg, targetDateRange, targetFilters]);

  const handleDownload = async () => {
    if (!tableData.length && !isBg) return;
    setDownloading(true);
    try {
      const title = "Energy Consumption Summary";

      // ── Excel ──────────────────────────────────────────────
      const excelHeaders = TABLE_COLUMNS.map((c) => ({
        label: c.label,
        accessor: c.key,
      }));
      const excelRows = tableData.map((row, idx) => ({
        ...row,
        sr: idx + 1,
      }));
      generateExcel(excelHeaders, excelRows, title);

      // ── PDF ──────────────────────────────────────────────────
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        buildAutoTableConfig,
      } = await import("../../../utils/PdfUtils");

      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
      const font = await loadKarlaFont(doc);
      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 14;
      const HEADER_H = 40;
      const contentW = pageW - MARGIN * 2;

      const subLines = [
        `Area: ${filters.area}`,
        `Line Station: ${filters.line}`,
        `Sub-Cluster: ${filters.subCluster}`,
        `Shift: ${filters.shift}`,
      ];
      const subH = subLines.length * 5.5 + 10;

      let y = HEADER_H + subH;

      // ── KPI boxes ──────────────────────────────────────────
      const kpis = [
        {
          label: "TOTAL CONSUMPTION (kWh)",
          value: totalConsumption,
          fill: [224, 242, 254],
          text: [7, 89, 133],
        },
        {
          label: "ACTIVE METERS",
          value: filteredMeters.length,
          fill: [209, 250, 229],
          text: [6, 95, 70],
        },
        {
          label: "AVG CONSUMPTION (kWh)",
          value: avgConsumption,
          fill: [254, 243, 199],
          text: [146, 64, 14],
        },
      ];
      const kpiGap = 4;
      const kpiH = 18;
      const kpiW = (contentW - kpiGap * 2) / 3;

      kpis.forEach((k, i) => {
        const x = MARGIN + i * (kpiW + kpiGap);
        doc.setFillColor(...k.fill);
        doc.roundedRect(x, y, kpiW, kpiH, 2, 2, "F");
        doc.setFont(font, "bold");
        doc.setFontSize(7);
        doc.setTextColor(...k.text);
        doc.text(k.label, x + 4, y + 6.5);
        doc.setFontSize(13);
        doc.text(String(k.value), x + 4, y + 14.5);
      });
      y += kpiH + 6;

      // ── Chart image (meter cards) ────────────────────────────
      doc.setFont(font, "bold");
      doc.setFontSize(10);
      doc.setTextColor(22, 70, 161);
      doc.text("Meter-wise Consumption", MARGIN, y + 4);
      y += 8;

      if (meterCardsRef.current) {
        const el = meterCardsRef.current;
        const rect = el.getBoundingClientRect();
        let imgData, aspect;
        try {
          const { toPng } = await import("html-to-image");
          imgData = await toPng(el, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: "#ffffff",
            width: rect.width,
            height: rect.height,
          });
          aspect = rect.width / rect.height;
        } catch (toPngErr) {
          console.warn("toPng failed, falling back to html2canvas:", toPngErr);
          const { default: html2canvas } = await import("html2canvas-pro");
          const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
          imgData = canvas.toDataURL("image/png");
          aspect = canvas.width / canvas.height;
        }
        const maxH = pageH - y - 22;

        let imgW = contentW;
        let imgH = imgW / aspect;
        if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH * aspect;
        }
        const cx = MARGIN + (contentW - imgW) / 2;
        doc.addImage(imgData, "PNG", cx, y, imgW, imgH, undefined, "FAST");
      }

      // ── Table ────────────────────────────────────
      doc.addPage();
      const tableConfig = buildAutoTableConfig(
        TABLE_COLUMNS,
        tableData,
        doc,
        font,
      );
      autoTable(doc, {
        ...tableConfig,
        startY: HEADER_H + 8,
        margin: { left: MARGIN, right: MARGIN, top: HEADER_H + 8, bottom: 22 },
        rowPageBreak: "avoid",
      });

      // ── header/footer ─────────────────────
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        drawPdfPageChrome(doc, {
          pageNum: i,
          totalPages,
          fontFamily: font,
          title,
          subLines: i === 1 ? subLines : [],
          jswImg,
          schaefflerImg,
        });
      }

      doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Energy Consumption PDF download failed:", err);
    } finally {
      setDownloading(false);
    }
  };
  const filteredMeters = useMemo(
    () =>
      METERS_DATA.filter(
        (m) =>
          m.area === filters.area &&
          m.line === filters.line &&
          m.subCluster === filters.subCluster,
      ),
    [filters.area, filters.line, filters.subCluster],
  );

  const totalConsumption = useMemo(
    () => filteredMeters.reduce((s, m) => s + m.consumption, 0),
    [filteredMeters],
  );

  const avgConsumption = filteredMeters.length
    ? (totalConsumption / filteredMeters.length).toFixed(1)
    : 0;

  const tableData = useMemo(
    () =>
      filteredMeters.map((m) => ({
        meterName: getMeterName(m, filters.line),
        area: m.area,
        lineStation: m.line,
        subCluster: m.subCluster,
        shift: filters.shift,
        consumption: m.consumption,
      })),
    [filteredMeters, filters.line, filters.shift],
  );

  // Auto trigger download in background mode
  const bgTriggeredRef = useRef(false);
  useEffect(() => {
    if (isBg && hasSearched && !bgTriggeredRef.current) {
      bgTriggeredRef.current = true;
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
    // Removed clearTimeout to prevent race condition canceling export
    }
  }, [isBg, hasSearched]);

  return (
    <div className="m-4 space-y-4">
      {/* Filters */}
      <div
        className="bg-white rounded-2xl shadow-md p-4"
        style={{ overflow: "visible", position: "relative" }}
      >
        <FilterBar
          config={FILTER_CONFIG}
          filters={filters}
          onChange={setFilters}
          withContainer={false}
        />
      </div>

      {/* Date range */}
      <DateRangeBar
        onSearch={handleSearch}
        onDownload={handleDownload}
        showDownload={true}
        reportName="Energy_Consumption"
        isDownloading={downloading}
        selectedStartDate={dateFilter.startDate}
        selectedEndDate={dateFilter.endDate}
      />

      {/* Content */}
      {!hasSearched ? (
        <SearchPromptState pageName="Energy Consumption Data" />
      ) : filteredMeters.length === 0 ? (
        <NoDataState />
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Total Consumption"
              value={`${totalConsumption}`}
              sub="kWh"
              bg="bg-sky-50"
              border="border-sky-200"
              labelColor="text-sky-600"
              valueColor="text-sky-900"
            />
            <StatCard
              label="Active Meters"
              value={filteredMeters.length}
              bg="bg-emerald-50"
              border="border-emerald-200"
              labelColor="text-emerald-600"
              valueColor="text-emerald-900"
            />
            <StatCard
              label="Avg Consumption"
              value={`${avgConsumption}`}
              sub="kWh"
              bg="bg-amber-50"
              border="border-amber-200"
              labelColor="text-amber-600"
              valueColor="text-amber-900"
            />
          </div>

          {/* Meter cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" ref={meterCardsRef}>
            {filteredMeters.map((meter) => (
              <MeterCard
                key={meter.id}
                meter={meter}
                selectedLine={filters.line}
              />
            ))}
          </div>

          {/* Table */}
          <DataTable
            title="Energy Consumption Summary"
            columns={TABLE_COLUMNS}
            data={tableData}
          />
        </>
      )}
    </div>
  );
}