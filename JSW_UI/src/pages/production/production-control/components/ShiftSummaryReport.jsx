import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../../sharedComponents/FilterBar";
import { masterApi, shiftSummaryApi } from "../../../../services/api";
import DataTable from "../../../../sharedComponents/DataTable";
import { generateExcelWithSheets } from "../../../../utils/ExcelUtils";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceArea,
} from "recharts";
import { formatClusterName } from "../../../../utils/Formatters";
import appConfig from "../../../../config/appConfig";
import { Activity } from "lucide-react";
import { NoDataState } from "../../../../sharedComponents/EmptyState";

const opt = (value, label) => ({ value, label });

const INDIVIDUAL_SHIFTS = ["A", "B", "C"];

const SHIFT_OPTIONS = appConfig.production.shifts.map((s) =>
  opt(s.value === "All" ? "All" : s.value, s.value === "All" ? "All Shifts" : s.label),
);;

const EXCEL_COLUMNS = [
  { label: "Sr. No", accessor: "srNo" },
  { label: "Date", accessor: "date" },
  { label: "Area", accessor: "area" },
  { label: "Line", accessor: "line" },
  { label: "Shift", accessor: "shift" },
  { label: "Actual Prod", accessor: "actualProd" },
  { label: "Target Prod", accessor: "targetProd" },
  { label: "Loss", accessor: "loss" },
  { label: "Loss Duration", accessor: "lossDuration" },
  { label: "Top 3 Alarms", accessor: "top3Alarms" },
];

const SHIFT_PDF_COLUMNS = [
  { key: "sr", label: "Sr. No." },
  { key: "date", label: "Date" },
  { key: "area", label: "Area" },
  { key: "line", label: "Line", type: "primary" },
  { key: "shift", label: "Shift", type: "shift" },
  {
    key: "actualProd",
    label: "Actual Prod",
    type: "actual",
    targetKey: "targetProd",
  },
  { key: "targetProd", label: "Target Prod" },
  { key: "lossDuration", label: "Loss Duration" },
  {
    key: "top3Alarms",
    label: "Top 3 Alarms",
    pdfValue: (item) =>
      (item.top3Alarms || "")
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
        .slice(0, 3)
        .join(" , ") || "—",
  },
];

const SHIFT_TABLE_COLUMNS = [
  { key: "sr", label: "Sr. No.", sortable: false },
  { key: "date", label: "Date", sortable: true },
  { key: "area", label: "Area", sortable: true },
  { key: "line", label: "Line", sortable: true, type: "primary" },
  { key: "shift", label: "Shift", sortable: true, type: "shift" },
  {
    key: "actualProd",
    label: "Actual Prod",
    sortable: true,
    type: "actual",
    targetKey: "targetProd",
  },
  { key: "targetProd", label: "Target Prod", sortable: true },
  { key: "lossDuration", label: "Loss Duration", sortable: true },
  {
    key: "top3Alarms",
    label: "Top 3 Alarms",
    sortable: false,
    render: (item) => {
      const text = item.top3Alarms || "—";
      const alarms = text
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
        .slice(0, 3)
        .join(" , ");
      return (
        <div
          style={{
            fontSize: 12,
            color: "#475569",
            fontWeight: 500,
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.5,
          }}
        >
          {alarms || "—"}
        </div>
      );
    },
  },
];

function ShiftTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const target = payload.find((p) => p.dataKey === "targetProd")?.value ?? 0;
  const actual = payload.find((p) => p.dataKey === "actualProd")?.value ?? 0;
  const loss = payload.find((p) => p.dataKey === "loss")?.value ?? 0;
  const eff = target > 0 ? ((actual / target) * 100).toFixed(1) : "—";
  const effColor =
    parseFloat(eff) >= 90
      ? "#10b981"
      : parseFloat(eff) >= 75
        ? "#f59e0b"
        : "#dc2626";
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "12px 16px",
        minWidth: 220,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        fontFamily: "'DM Sans','Inter',sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: "#111827",
          borderBottom: "1px solid #f3f4f6",
          paddingBottom: 8,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          { color: "#000000", label: "Target", value: target, isLine: true },
          { color: "#10b981", label: "Actual", value: actual },
          { color: "#dc2626", label: "Loss", value: loss },
        ].map(({ color, label: lbl, value, isLine }) => (
          <div
            key={lbl}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#6b7280",
                fontSize: 12,
              }}
            >
              {isLine ? (
                <span
                  style={{
                    width: 16,
                    height: 3,
                    background: color,
                    display: "inline-block",
                    borderRadius: 1,
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 10,
                    height: 10,
                    background: color,
                    display: "inline-block",
                    borderRadius: 2,
                  }}
                />
              )}
              {lbl}
            </span>
            <b style={{ color, fontSize: 13 }}>{value.toLocaleString()}</b>
          </div>
        ))}
        <div
          style={{
            marginTop: 4,
            paddingTop: 8,
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: 12 }}>Efficiency</span>
          <b style={{ color: effColor, fontSize: 13 }}>{eff}%</b>
        </div>
      </div>
    </div>
  );
}

const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-white/60 rounded-xl z-10 flex items-center justify-center">
    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
      <svg
        className="animate-spin h-4 w-4 text-sky-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      Updating…
    </div>
  </div>
);

const CustomXAxisTick = ({ x, y, payload }) => {
  const parts = (payload.value || "").split(" | ");
  return (
    <g transform={`translate(${x},${y + 8})`}>
      <text textAnchor="middle" fill="#374151" fontSize={12} fontWeight={600}>
        {parts[0] ?? ""}
      </text>
      <text y={16} textAnchor="middle" fill="#111827" fontSize={12}>
        {parts[1] ?? ""}
      </text>
      <text y={32} textAnchor="middle" fill="#6b7280" fontSize={12}>
        {parts[2] ?? ""}
      </text>
    </g>
  );
};

const ShiftChart = memo(function ShiftChart({ data, filterLabels }) {
  const [isMobile] = useState(() => window.innerWidth < 640);

  const chartData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        label: `${d.date} | ${d.line} | Shift ${d.shift}`,
      })),
    [data],
  );

  // Group consecutive entries by date for alternating band shading
  const dateGroups = useMemo(() => {
    const groups = [];
    let current = null;
    chartData.forEach((d) => {
      if (d.date !== current?.date) {
        current = { date: d.date, firstLabel: d.label, lastLabel: d.label };
        groups.push(current);
      } else {
        current.lastLabel = d.label;
      }
    });
    return groups;
  }, [chartData]);

  return (
    <div
      className="bg-white rounded-xl p-6 mb-4"
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        border: "1px solid #f1f5f9",
      }}
    >
      <h2 className="text-base sm:text-xl font-bold text-center mb-4 text-gray-800">
        Shift Summary — Area [{filterLabels.area}] Line [{filterLabels.line}]
        Shift [{filterLabels.shift}]
      </h2>

      <div className="h-[360px] w-full sm:h-[460px] lg:h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 20, left: 10, bottom: 10 }}
            barCategoryGap="20%"
            barGap={4}
          >
            {dateGroups.map((group, i) => (
              <ReferenceArea
                key={group.date}
                x1={group.firstLabel}
                x2={group.lastLabel}
                fill={i % 2 === 0 ? "#f8fafc" : "#e0f2fe"}
                fillOpacity={0.6}
                ifOverflow="hidden"
              />
            ))}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              interval={0}
              tick={isMobile ? { fontSize: 9 } : <CustomXAxisTick />}
              height={isMobile ? 52 : 80}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => v.toLocaleString()}
              label={{
                value: "Production Units",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fontSize: 13, fontWeight: 600, textAnchor: "middle" },
              }}
            />
            <Tooltip content={<ShiftTooltip />} />
            <Legend
              verticalAlign="bottom"
              horizontalAlign="center"
              wrapperStyle={{ fontSize: 13, fontWeight: 600, paddingTop: 12 }}
            />
            <Bar
              dataKey="actualProd"
              name="Actual Production"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            >
              {!isMobile && (
                <LabelList
                  dataKey="actualProd"
                  position="insideTop"
                  fill="#ffffff"
                  fontSize={13}
                  fontWeight={700}
                />
              )}
            </Bar>
            <Bar
              dataKey="loss"
              name="Loss"
              fill="#dc2626"
              radius={[4, 4, 0, 0]}
            >
              {!isMobile && (
                <LabelList
                  dataKey="loss"
                  position="insideTop"
                  fill="#ffffff"
                  fontSize={13}
                  fontWeight={700}
                />
              )}
            </Bar>
            <Line
              type="monotone"
              dataKey="targetProd"
              name="Target Production"
              stroke="#000000"
              strokeWidth={2}
              dot={{ r: 5, fill: "#000000", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default function ShiftSummaryReport({
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

  const chartRef = useRef(null);
  const [masterData, setMasterData] = useState([]);
  const [filters, setFilters] = useState({
    clusterId: targetFilters?.areaId || targetFilters?.area || "",
    lineId: targetFilters?.lineId || targetFilters?.line || "",
    shifts: targetFilters?.shifts || ["A"],
  });

  const [savedDate, setSavedDate] = useState({
    startDate: targetDateRange?.start || targetDateRange?.startDate || null,
    endDate: targetDateRange?.end || targetDateRange?.endDate || null,
  });
  const [hasSearched, setHasSearched] = useState(Boolean(isBg && (targetDateRange?.start || targetDateRange?.startDate)));
  const [isLoading, setIsLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);

  const abortRef = useRef(null);
  const pageSizeRef = useRef(9);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    totalRecords: 0,
    totalPages: 1,
  });

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);
        const firstCluster = data[0];
        const firstLine = (firstCluster?.Lines || [])[0];
        setFilters((prev) => ({
          ...prev,
          clusterId: firstCluster?.ClusterId ?? "",
          lineId: firstLine?.LineId ?? "",
        }));
      })
      .catch((e) => console.error("[ShiftSummaryReport] master:", e));
  }, []);

  const areaOptions = useMemo(
    () =>
      masterData.map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const lines = filters.clusterId
      ? masterData.find((c) => c.ClusterId === Number(filters.clusterId))
        ?.Lines || []
      : masterData.flatMap((c) => c.Lines || []);
    return lines.map((l) => opt(l.LineId, l.LineName));
  }, [masterData, filters.clusterId]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters((prev) => {
        let next = { ...newFilters };

        if (next.clusterId !== prev.clusterId) {
          const cluster = masterData.find(
            (c) => c.ClusterId === Number(next.clusterId),
          );
          const firstLine = (cluster?.Lines || [])[0];
          next.lineId = firstLine?.LineId ?? "";
        }

        const prevShifts = prev.shifts ?? [];
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

        return next;
      });
    },
    [masterData],
  );

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "clusterId", label: "Area", options: areaOptions },
      { type: "select", key: "lineId", label: "Line", options: lineOptions },
      {
        type: "select",
        key: "shifts",
        label: "Shift",
        multiple: true,
        searchable: false,
        options: SHIFT_OPTIONS,
      },
    ],
    [areaOptions, lineOptions],
  );

  const filterLabels = useMemo(() => {
    const cluster = masterData.find(
      (c) => c.ClusterId === Number(filters.clusterId),
    );
    const line = masterData
      .flatMap((c) => c.Lines || [])
      .find((l) => l.LineId === Number(filters.lineId));

    const shifts = filters.shifts ?? [];
    const shiftLabel =
      shifts.length === 0 || shifts.includes("All")
        ? "All Shifts"
        : shifts.map((s) => `Shift ${s}`).join(", ");

    return {
      area: cluster ? formatClusterName(cluster.ClusterName) : "All",
      line: line?.LineName || "All",
      shift: shiftLabel,
    };
  }, [masterData, filters]);

  // ── Fetch data from API ────────────────────────────────────────────────────
  const fetchData = useCallback(
    async (dateRange, activeFilters, page = 1, pageSize = 9) => {
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setIsLoading(true);
      setError("");

      try {
        const shifts = activeFilters.shifts ?? [];
        const shiftParam =
          shifts.length === 0 || shifts.includes("All")
            ? undefined
            : shifts.join(",");

        const res = await shiftSummaryApi.report(
          {
            clusterId: activeFilters.clusterId || undefined,
            lineId: activeFilters.lineId || undefined,
            shift: shiftParam,
            startDate: dateRange.startDate || undefined,
            endDate: dateRange.endDate || undefined,
            page,
            pageSize,
          },
          ctrl.signal,
        );
        const offset = (page - 1) * pageSize;
        const rows = (res?.tableData || []).map((row, idx) => ({
          id: offset + idx + 1,
          srNo: offset + idx + 1,
          date: row.Date ? String(row.Date).slice(0, 10) : "—",
          area: formatClusterName(row.Area) || "—",
          line: row.Line || "—",
          shift: row.Shift || "—",
          targetProd: Number(row.TargetProd) || 0,
          actualProd: Number(row.ActualProd) || 0,
          loss: Number(row.Loss) || 0,
          lossDuration: row.LossDuration || "0:00:00",
          top3Alarms: row.Top3Alarms || "",
        }));

        setTableData(rows);
        if (res?.pagination) {
          setPagination(res.pagination);
          pageSizeRef.current = res.pagination.pageSize;
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("[ShiftSummaryReport] fetch:", err);
          setError(err.message || "Failed to load data.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!hasSearched) return;
    fetchData(savedDate, filters, 1, pageSizeRef.current);
  }, [filters.clusterId, filters.lineId, filters.shifts]);

  const handleSearch = (startDate, endDate) => {
    const dateRange = { startDate, endDate };
    setSavedDate(dateRange);
    setHasSearched(true);
    fetchData(dateRange, filters, 1, pageSizeRef.current);
  };

  // Sync date range in background mode & trigger initial search
  useEffect(() => {
    if (isBg && targetDateRange?.start) {
      const s = targetDateRange.start;
      const e = targetDateRange.end || targetDateRange.start;
      handleSearch(s, e);
    }
  }, [isBg, targetDateRange]);

  const handlePageChange = useCallback(
    (newPage) => {
      fetchData(savedDate, filters, newPage, pageSizeRef.current);
    },
    [savedDate, filters, fetchData],
  );

  const handlePageSizeChange = useCallback(
    (newPageSize) => {
      pageSizeRef.current = newPageSize;
      fetchData(savedDate, filters, 1, newPageSize);
    },
    [savedDate, filters, fetchData],
  );

  // ── Downloads ──────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!hasSearched || isLoading || (tableData.length === 0 && !isBg)) return;
    setDownloading(true);
    try {
      // Fetch ALL records (not just current page) for download
      const dlShifts = filters.shifts ?? [];
      const dlShiftParam =
        dlShifts.length === 0 || dlShifts.includes("All")
          ? undefined
          : dlShifts.join(",");

      const allRes = await shiftSummaryApi.report({
        clusterId: filters.clusterId || undefined,
        lineId: filters.lineId || undefined,
        shift: dlShiftParam,
        startDate: savedDate.startDate || undefined,
        endDate: savedDate.endDate || undefined,
        page: 1,
        pageSize: 999999,
      });
      const allRows = (allRes?.tableData || []).map((row, idx) => ({
        id: idx + 1,
        srNo: idx + 1,
        date: row.Date ? String(row.Date).slice(0, 10) : "—",
        area: formatClusterName(row.Area) || "—",
        line: row.Line || "—",
        shift: row.Shift || "—",
        targetProd: Number(row.TargetProd) || 0,
        actualProd: Number(row.ActualProd) || 0,
        loss: Number(row.Loss) || 0,
        lossDuration: row.LossDuration || "0:00:00",
        top3Alarms: row.Top3Alarms || "",
      }));

      // Excel
      generateExcelWithSheets(
        [
          {
            sheetName: "Shift Summary",
            headers: EXCEL_COLUMNS,
            rows: allRows,
          },
        ],
        "Shift_Summary_Report",
      );

      // PDF
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");
      const {
        loadBrandingLogos,
        drawPdfPageChrome,
        loadKarlaFont,
        buildAutoTableConfig,
        PDF_MARGIN,
        PDF_HEADER_H,
      } = await import("../../../../utils/PdfUtils");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const FONT = await loadKarlaFont(doc);
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = PDF_MARGIN;
      const HEADER_H = PDF_HEADER_H;

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const subLines = [
        `Area : ${filterLabels.area}   |   Line : ${filterLabels.line}   |   Shift : ${filterLabels.shift}`,
      ];

      const drawPageChrome = (pageNum, totalPages) =>
        drawPdfPageChrome(doc, {
          pageNum,
          totalPages,
          fontFamily: FONT,
          title: "Shift Summary Report",
          subLines,
          jswImg,
          schaefflerImg,
        });

      await new Promise((r) => setTimeout(r, 300));

      // Capture chart
      let chartImage = null;
      const overrides = [];
      const cssPropName = (c) => c.replace(/([A-Z])/g, "-$1").toLowerCase();
      const oklchToRgb = (v) => {
        if (!v || v.includes("transparent")) return null;
        if (v.toLowerCase().includes("oklch")) {
          const m = v.match(
            /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/,
          );
          if (m) {
            const [L, , H] = [
              parseFloat(m[1]),
              parseFloat(m[2]),
              parseFloat(m[3]),
            ];
            if (H >= 95 && H <= 105 && L >= 60) return "rgb(16, 185, 129)";
            if (H >= 0 && H <= 10 && L >= 50) return "rgb(244, 63, 94)";
            if (H >= 250 && H <= 260 && L >= 55) return "rgb(37, 99, 235)";
            if (L >= 90) return "rgb(255, 255, 255)";
            if (L <= 20) return "rgb(30, 30, 30)";
            return "rgb(200, 200, 200)";
          }
        }
        return null;
      };

      let origBg = "",
        origParentBg = "";
      try {
        const { default: html2canvas } = await import("html2canvas");
        const el = chartRef.current;
        if (el) {
          origBg = el.style.backgroundColor;
          origParentBg = el.parentElement?.style.backgroundColor ?? "";
          el.style.backgroundColor = "#ffffff";
          if (el.parentElement)
            el.parentElement.style.backgroundColor = "#ffffff";

          const allEls = [el, ...el.querySelectorAll("*")];
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
          allEls.forEach((e) => {
            const isSvgEl = e instanceof SVGElement;
            const cs = window.getComputedStyle(e);
            props.forEach((p) => {
              if (isSvgEl && (p === "fill" || p === "stroke") && e.hasAttribute(p)) return;
              const val = cs[p];
              if (val && val.includes("oklch")) {
                const rgb = oklchToRgb(val);
                if (rgb) {
                  const cp = cssPropName(p);
                  overrides.push({
                    el: e,
                    prop: cp,
                    original: e.style.getPropertyValue(cp),
                  });
                  e.style.setProperty(cp, rgb, "important");
                }
              }
            });
          });
          allEls.forEach((e) => {
            const bg = window.getComputedStyle(e).backgroundColor;
            if (bg && bg.includes("rgba")) {
              const m2 = bg.match(/rgba?\((.*?)\)/);
              if (m2) {
                const parts = m2[1].split(",").map((p) => p.trim());
                if (parts.length >= 3) {
                  const alpha = parts[3] ? parseFloat(parts[3]) : 1;
                  const solid =
                    alpha < 0.3
                      ? "rgb(255,255,255)"
                      : `rgb(${parts[0]},${parts[1]},${parts[2]})`;
                  const orig = e.style.getPropertyValue("background-color");
                  overrides.push({
                    el: e,
                    prop: "background-color",
                    original: orig,
                  });
                  e.style.setProperty("background-color", solid, "important");
                }
              }
            }
          });
          // Remove SVG clip-paths so floating labels/markers are captured
          const svgs = el.querySelectorAll("svg");
          svgs.forEach((svg) => {
            overrides.push({ el: svg, prop: "overflow", original: svg.style.overflow });
            svg.style.overflow = "visible";
            svg.querySelectorAll("[clip-path]").forEach((node) => {
              overrides.push({ el: node, prop: "clip-path", original: node.getAttribute("clip-path"), isAttr: true });
              node.removeAttribute("clip-path");
            });
          });

          await new Promise((r) => setTimeout(r, 100));
          const canvas = await html2canvas(el, {
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
        console.warn("[PDF] chart capture failed:", e);
      } finally {
        if (chartRef.current) {
          if (origBg) chartRef.current.style.backgroundColor = origBg;
          if (chartRef.current.parentElement && origParentBg)
            chartRef.current.parentElement.style.backgroundColor = origParentBg;
        }
        overrides.forEach(({ el, prop, original, isAttr }) => {
          if (isAttr) {
            original ? el.setAttribute(prop, original) : el.removeAttribute(prop);
          } else {
            original
              ? el.style.setProperty(prop, original)
              : el.style.removeProperty(prop);
          }
        });
      }

      // Page 1 — chart
      const contentW = pageW - MARGIN * 2;
      const subH = subLines.length * 5.5 + 10;
      const chartTop = HEADER_H + subH + 4;
      const chartMaxH = pageH - chartTop - 22;

      doc.setFont(FONT, "bold");
      doc.setFontSize(10);
      doc.setTextColor(22, 70, 161);
      doc.text(
        `Shift Summary — Area [${filterLabels.area}]  Line [${filterLabels.line}]  Shift [${filterLabels.shift}]`,
        MARGIN,
        chartTop,
      );

      if (chartImage) {
        const aspect = chartImage.w / chartImage.h;
        let imgW = contentW;
        let imgH = imgW / aspect;
        if (imgH > chartMaxH - 8) {
          imgH = chartMaxH - 8;
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

      // Page 2 — table
      doc.addPage();
      autoTable(doc, {
        startY: HEADER_H + 10,
        ...buildAutoTableConfig(SHIFT_PDF_COLUMNS, allRows, doc, FONT),
        columnStyles: { 7: { halign: "left" } },
        rowPageBreakAvoid: true,
      });

      const total = doc.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        doc.setPage(i);
        drawPageChrome(i, total);
      }
      doc.save(`Shift_Summary_Report_${savedDate.startDate ?? "report"}.pdf`);
    } catch (err) {
      console.error("[ShiftSummaryReport] download:", err);
      setError("Failed to generate export: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  // Headless background export auto-download trigger
  const bgTriggeredRef = useRef(false);
  const handleDownloadRef = useRef(handleDownload);
  handleDownloadRef.current = handleDownload;

  useEffect(() => {
    if (!isBg || isLoading || bgTriggeredRef.current) return;
    if (tableData.length === 0 && !hasSearched) return;
    bgTriggeredRef.current = true;
    const t = setTimeout(() => {
      handleDownloadRef.current();
    }, tableData.length === 0 ? 3000 : 1200);
    // Removed clearTimeout to prevent race condition
  }, [isBg, isLoading, tableData.length, hasSearched]);

  const chartData = useMemo(
    () =>
      [...tableData]
        .sort(
          (a, b) =>
            a.date.localeCompare(b.date) || a.shift.localeCompare(b.shift),
        )
        .map((r) => ({
          date: r.date,
          line: r.line,
          shift: r.shift,
          targetProd: r.targetProd,
          actualProd: r.actualProd,
          loss: r.loss,
        })),
    [tableData],
  );

  return (
    <div
      className="w-full overflow-hidden px-2 sm:px-4 py-4"
      style={{ maxWidth: 1600, margin: "0 auto" }}
    >
      <FilterBar
        config={filterConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      <DateRangeBar
        reportName="Shift_Summary"
        showDownload={true}
        onDownload={handleDownload}
        onSearch={handleSearch}
        showTime={false}
        selectedStartDate={savedDate?.startDate}
        selectedEndDate={savedDate?.endDate}
        isDownloading={downloading}
      />

      {!hasSearched ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
            <Activity size={22} className="text-sky-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            select filters and dates, then click Search to view the Shift
            Summary Report.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : isLoading && tableData.length === 0 ? (
        <div className="flex flex-col gap-4">
          <div
            className="bg-white rounded-xl p-6"
            style={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              border: "1px solid #f1f5f9",
            }}
          >
            <ChartShimmer />
          </div>
          <TableShimmer rows={8} />
        </div>
      ) : tableData.length === 0 ? (
        <NoDataState />
      ) : (
        <div className="relative flex flex-col gap-4">
          {isLoading && <LoadingOverlay />}
          <div ref={chartRef}>
            <ShiftChart data={chartData} filterLabels={filterLabels} />
          </div>
          <DataTable
            columns={SHIFT_TABLE_COLUMNS}
            data={tableData}
            title="Shift-wise Production Details"
            serverPagination={{
              page: pagination.page,
              pageSize: pagination.pageSize,
              totalRecords: pagination.totalRecords,
              totalPages: pagination.totalPages,
              onPageChange: handlePageChange,
              onPageSizeChange: handlePageSizeChange,
            }}
          />
        </div>
      )}
    </div>
  );
}