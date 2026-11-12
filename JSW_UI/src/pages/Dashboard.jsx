import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../hooks/useDashboard";
import { KPIShimmer, ChartShimmer } from "../sharedComponents/Shimmer";

const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last10", label: "Last 10 days" },
  { value: "lastmonth", label: "Last month" },
];

const OEE_GOOD = 80; // ≥ this → green / on-track
const OEE_CRITICAL = 70; // <  this → red / alert

function buildJphRows(jphDetails = []) {
  return jphDetails.map((d) => ({
    hour: d.HourID,
    shift: d.Shift,
    startHour: d.StartHour,
    endHour: d.EndHour,
    actual: d.AvgActual ?? 0,
    target: d.AvgJPH ?? 0,
  }));
}

function formatSqlTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

// Converts seconds
function secsToMin(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m${r > 0 ? ` ${r}s` : ""}`;
}

// Pads a number with a leading zero (e.g. 9 -> "09") for the clock
function pad(n) {
  return String(n).padStart(2, "0");
}

// Formats a Date object into "hh:mm:ss AM/PM" for the live clock
function formatTime(d) {
  const h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();
  return `${pad(h % 12 || 12)}:${pad(m)}:${pad(s)} ${h >= 12 ? "PM" : "AM"}`;
}

// Common IANA timezone
const TIMEZONE_ABBR = {
  "Asia/Kolkata": "IST",
  "Asia/Calcutta": "IST",
  "America/Chicago": "CST",
  "America/Indiana/Knox": "CST",
  "America/New_York": "EST",
  "America/Detroit": "EST",
  "America/Los_Angeles": "PST",
  "America/Denver": "MST",
  "America/Phoenix": "MST",
  "America/Anchorage": "AKST",
  "Pacific/Honolulu": "HST",
  "Europe/London": "GMT",
  "Europe/Dublin": "IST",
  "Europe/Paris": "CET",
  "Europe/Berlin": "CET",
  "Europe/Moscow": "MSK",
  "Asia/Dubai": "GST",
  "Asia/Tokyo": "JST",
  "Asia/Shanghai": "CST",
  "Asia/Singapore": "SGT",
  "Asia/Karachi": "PKT",
  "Asia/Dhaka": "BST",
  "Asia/Bangkok": "ICT",
  "Asia/Seoul": "KST",
  "Australia/Sydney": "AEST",
  "Australia/Perth": "AWST",
  "Pacific/Auckland": "NZST",
  "Africa/Johannesburg": "SAST",
  "America/Sao_Paulo": "BRT",
};

function getTimezone() {
  try {
    const iana = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONE_ABBR[iana]) return TIMEZONE_ABBR[iana];
    return (
      new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

// Formats a Date
function formatDate(d) {
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getShift(h) {
  if (h >= 6 && h < 14)
    return {
      label: "Shift A",
      cls: "text-violet-700 bg-violet-50 border-violet-200",
    };
  if (h >= 14 && h < 22)
    return {
      label: "Shift B",
      cls: "text-blue-700 bg-blue-50 border-blue-200",
    };
  return {
    label: "Shift C",
    cls: "text-emerald-700 bg-emerald-50 border-emerald-200",
  };
}

function DateDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = DATE_OPTIONS.find((o) => o.value === value);

  // Close the dropdown when clicking anywhere outside of it
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Button that toggles the dropdown open/closed */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{selected?.label}</span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel with the list of date options */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-1.5 overflow-hidden">
          {DATE_OPTIONS.map((opt) => {
            const isSel = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg transition-colors
                  ${isSel ? "bg-sky-50 text-sky-600 font-semibold" : "text-gray-700 hover:bg-gray-100 font-normal"}`}
              >
                {opt.label}
                {isSel && (
                  <svg
                    className="w-3.5 h-3.5 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

//  LIVE CLOCK — date, ticking time, and current shift badge

function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const tz = getTimezone();

  // Ticks every second so the displayed time stays live
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const shift = getShift(now.getHours());

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 flex-wrap">
      {/* Date */}
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-100 border border-gray-200">
        <svg
          className="w-3.5 h-3.5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-gray-800 font-medium">{formatDate(now)}</span>
      </div>
      <div className="w-px h-4 bg-gray-200" />
      {/* Time */}
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-100 border border-gray-200">
        <svg
          className="w-3.5 h-3.5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="font-bold text-gray-800 tabular-nums">
          {formatTime(now)}
        </span>
        {tz && (
          <span className="text-[10px] font-bold text-sky-700 bg-sky-100 border border-sky-200 rounded px-1.5 py-0.5 leading-none">
            {tz}
          </span>
        )}
      </div>
      <div className="w-px h-4 bg-gray-200" />
      {/* Shift badge */}
      <span
        className={`px-3 py-1 rounded-lg border text-xs font-bold ${shift.cls}`}
      >
        {shift.label}
      </span>
    </div>
  );
}

//RING GAUGE — circular % gauge used for Availability/Performance/Quality

// Ring geometry constants (radius + circumference) shared by all gauges
const RING_R = 70;
const RING_C = 2 * Math.PI * RING_R;

// Color per metric type (arc color, gradient start, track background)
const METRIC_COLOR = {
  Availability: { hex: "#0891b2", track: "#cffafe", gradientHex: "#22d3ee" },
  Performance: { hex: "#7c3aed", track: "#ede9fe", gradientHex: "#a78bfa" },
  Quality: { hex: "#f97316", track: "#ffedd5", gradientHex: "#fb923c" },
};

const RingGauge = memo(function RingGauge({ label, value }) {
  const { hex, track, gradientHex } =
    METRIC_COLOR[label] || METRIC_COLOR["Availability"];
  const filled = (value / 100) * RING_C;
  const targetDash = RING_C - (70 / 100) * RING_C;
  const gradId = `ring-grad-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col items-center w-full px-4 pt-5 pb-4 gap-2">
      <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">
        {label}
      </p>
      <div className="relative w-[168px] h-[168px]">
        <svg width="168" height="168" viewBox="0 0 164 164">
          <defs>
            <linearGradient
              id={gradId}
              x1="82"
              y1="16"
              x2="148"
              y2="82"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={gradientHex} />
              <stop offset="100%" stopColor={hex} />
            </linearGradient>
          </defs>
          {/* background track circle */}
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke={track}
            strokeWidth="18"
          />
          {/* colored progress arc */}
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${RING_C}`}
            transform="rotate(-90 82 82)"
          />
          {/* small tick mark showing the 70% target point */}
          <circle
            cx="82"
            cy="82"
            r={RING_R}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeDasharray={`2.5 ${RING_C - 2.5}`}
            strokeDashoffset={targetDash}
            transform="rotate(-90 82 82)"
          />
        </svg>
        {/* Big % number in the center of the ring */}
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span className="text-[30px] font-extrabold text-gray-800 leading-none">
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
});

const OEE_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M3 3v18h18M7 14l4-4 3 3 5-6" />
  </svg>
);
const WELD_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const LINES_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="14" y2="18" />
    <circle cx="20" cy="18" r="1.2" fill="currentColor" />
  </svg>
);
const ACTUAL_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M3 3v18h18" />
    <path d="M7 15l4-6 3 3 5-7" />
  </svg>
);
const PLAN_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 2v4M16 2v4" />
  </svg>
);
const TARGET_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>
);
const JPH_ICON = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M12 8v4l3 2" />
    <circle cx="12" cy="13" r="8" />
    <path d="M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4" />
  </svg>
);

const DonutChart = memo(function DonutChart({ net, breakdown }) {
  if (net === 0 && breakdown === 0) {
    return (
      <div className="flex items-center justify-center h-[270px] text-sm text-gray-400 font-medium">
        No time data available
      </div>
    );
  }
  const total = net + breakdown;

  const options = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: ["Net Available", "Downtime"],
    colors: ["#10b981", "#ef4444"], // green = available, red = downtime
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontWeight: 600,
      labels: { colors: "#111827" },
      itemMargin: { horizontal: 10 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "62%",
          labels: {
            show: true,
            name: { fontSize: "12px", fontWeight: 700, color: "#374151" },

            total: {
              show: true,
              label: "Total",
              fontSize: "12px",
              fontWeight: 700,
              color: "#374151",
              formatter: () => secsToMin(total),
            },

            value: {
              fontSize: "15px",
              fontWeight: 800,
              color: "#111827",
              formatter: (v) => secsToMin(Number(v)),
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v) => secsToMin(v) } },
    stroke: { width: 2, colors: ["#fff"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "diagonal2",
        shadeIntensity: 0.3,
        gradientToColors: ["#6ee7b7", "#fca5a5"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[net, breakdown]}
      type="donut"
      height={270}
    />
  );
});

//OEE STATUS HELPER — decides badge color/label for a machine's OEE

function getOeeStatus(oee, isAlert) {
  if (isAlert)
    return {
      label: "Critical",
      dot: "#dc2626",
      chipBg: "bg-rose-50 border-rose-100 text-rose-700",
      barColor: "bg-rose-500",
    };
  if (oee >= OEE_GOOD)
    return {
      label: "Good",
      dot: "#059669",
      chipBg: "bg-emerald-50 border-emerald-100 text-emerald-700",
      barColor: "bg-emerald-500",
    };
  return {
    label: "Low",
    dot: "#d97706",
    chipBg: "bg-amber-50 border-amber-100 text-amber-700",
    barColor: "bg-amber-500",
  };
}

function SectionHeading({ icon, title, tone = "sky" }) {
  const chip = {
    sky: "bg-sky-50 border-sky-100 text-sky-600",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
  }[tone];

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-lg border ${chip}`}
      >
        {icon}
      </span>
      <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };

//JPH MODAL — popup showing hour-by-hour JPH detail for one machine
function JPHModal({ machine, onClose }) {
  const rows = buildJphRows(machine.jphDetails);
  const currentRowRef = useRef(null);

  // Build shift groups dynamically from row data
  const dynamicShifts = useMemo(() => {
    const shiftMap = {};
    const order = [];
    rows.forEach((r) => {
      const key = r.shift ?? "—";
      if (!shiftMap[key]) {
        shiftMap[key] = { label: `Shift ${key}`, key, hours: [] };
        order.push(key);
      }
      shiftMap[key].hours.push(r.hour);
    });
    return order.map((k) => shiftMap[k]);
  }, [rows]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Auto-scroll to the current hour row when modal opens
  useEffect(() => {
    if (currentRowRef.current) {
      currentRowRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []);

  const hasRows = rows.length > 0;

  const rowByHour = useMemo(
    () => Object.fromEntries(rows.map((r) => [r.hour, r])),
    [rows],
  );

  const shiftTotals = useMemo(
    () =>
      dynamicShifts.map((shift) => {
        const shiftRows = shift.hours.map((h) => rowByHour[h]).filter(Boolean);
        return {
          actual: shiftRows.reduce((s, r) => s + r.actual, 0),
          target: shiftRows.reduce((s, r) => s + r.target, 0),
        };
      }),
    [rowByHour, dynamicShifts],
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:rounded-xl sm:max-w-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[92dvh] sm:max-h-[90vh] rounded-t-2xl sm:rounded-t-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <span className="w-9 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                Jobs Per Hour — Hourly Breakdown
              </p>
              <h3 className="text-base font-bold text-gray-900">
                {machine.id}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          {!hasRows && (
            <div className="flex items-center justify-center py-12 text-sm text-gray-400 font-medium">
              No hourly data available for this line
            </div>
          )}
          {hasRows && (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-5 py-2.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider w-32">
                    Time
                  </th>
                  <th className="text-right px-4 py-2.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Actual
                  </th>
                  <th className="text-right px-4 py-2.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="text-right px-5 py-2.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Achievement
                  </th>
                </tr>
              </thead>
              <tbody>
                {dynamicShifts.map((shift, si) => {
                  const shiftColor = SHIFT_COLORS[shift.key] || "#64748b";
                  const tot = shiftTotals[si];
                  const firstRow = rowByHour[shift.hours[0]];
                  const lastRow =
                    rowByHour[shift.hours[shift.hours.length - 1]];
                  const totPct =
                    tot.target > 0
                      ? Math.min(
                          Math.round((tot.actual / tot.target) * 100),
                          100,
                        )
                      : 0;
                  const totGood = totPct >= OEE_GOOD;
                  const totMid = totPct >= OEE_CRITICAL && totPct < OEE_GOOD;

                  return [
                    /* Shift separator row */
                    <tr
                      key={`sh-${shift.label}`}
                      style={{
                        backgroundColor: `${shiftColor}14`,
                        borderTop: `1px solid ${shiftColor}40`,
                        borderBottom: `1px solid ${shiftColor}40`,
                      }}
                    >
                      <td
                        colSpan={2}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-widest"
                        style={{ color: shiftColor }}
                      >
                        {shift.label}
                        <span className="ml-2 text-[10px] font-semibold opacity-70 tabular-nums whitespace-nowrap">
                          {formatSqlTime(firstRow?.startHour)}–
                          {formatSqlTime(lastRow?.endHour)}
                        </span>
                      </td>
                      <td
                        className="px-4 py-2 text-right text-xs font-bold tabular-nums"
                        style={{ color: shiftColor }}
                      >
                        {tot.target}
                      </td>
                      <td className="px-5 py-2 text-right">
                        <span
                          className={`inline-block text-xs font-bold tabular-nums px-2 py-0.5 rounded-md border ${
                            totGood
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : totMid
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {totPct}%
                        </span>
                      </td>
                    </tr>,

                    /* Hour rows for this shift */
                    ...shift.hours.map((hourId) => {
                      const r = rowByHour[hourId];

                      if (!r) {
                        return (
                          <tr key={hourId} className="border-b border-gray-100">
                            <td className="px-5 py-2.5">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-200 shrink-0" />
                                <span className="text-sm font-medium tabular-nums text-gray-300">
                                  Hour {hourId}
                                </span>
                              </div>
                            </td>
                            <td
                              colSpan={3}
                              className="px-5 py-2.5 text-right text-xs font-medium text-gray-300 italic"
                            >
                              Not started
                            </td>
                          </tr>
                        );
                      }

                      const ratio = r.target > 0 ? r.actual / r.target : 0;
                      const pct = Math.min(Math.round(ratio * 100), 100);
                      const isGood = ratio >= OEE_GOOD / 100;
                      const isMid = ratio >= OEE_CRITICAL / 100 && !isGood;
                      const isCurrent = hourId === machine.currentHourId;

                      const actualCls = isGood
                        ? "text-emerald-700"
                        : isMid
                          ? "text-amber-700"
                          : "text-rose-700";
                      const badgeCls = isGood
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isMid
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200";

                      return (
                        <tr
                          key={hourId}
                          className={`border-b border-gray-100 transition-colors ${isCurrent ? "bg-sky-50" : "hover:bg-gray-50"}`}
                          ref={isCurrent ? currentRowRef : undefined}
                          style={
                            isCurrent
                              ? {
                                  position: "sticky",
                                  top: 40,
                                  zIndex: 8,
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                }
                              : undefined
                          }
                        >
                          {/* Time */}
                          <td className="px-5 py-2.5">
                            <div className="flex items-center gap-2">
                              {isCurrent ? (
                                <span className="relative flex h-2 w-2 shrink-0">
                                  <span className="absolute inline-flex h-2 w-2 rounded-full bg-sky-400 animate-ping opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                                </span>
                              ) : (
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${isGood ? "bg-emerald-400" : isMid ? "bg-amber-400" : "bg-rose-400"}`}
                                />
                              )}
                              <span
                                className={`text-sm font-bold tabular-nums whitespace-nowrap ${isCurrent ? "text-sky-700" : "text-gray-800"}`}
                              >
                                {formatSqlTime(r.startHour)}–
                                {formatSqlTime(r.endHour)}
                              </span>
                              {isCurrent && (
                                <span className="text-[9px] font-bold text-white bg-sky-500 rounded px-1.5 py-0.5 uppercase tracking-wide leading-none">
                                  Now
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actual */}
                          <td
                            className={`px-4 py-2.5 text-right text-base font-extrabold tabular-nums ${actualCls}`}
                          >
                            {r.actual}
                          </td>

                          {/* Target */}
                          <td className="px-4 py-2.5 text-right text-base font-semibold tabular-nums text-gray-500">
                            {r.target}
                          </td>

                          {/* Achievement % badge */}
                          <td className="px-5 py-2.5 text-right">
                            <span
                              className={`inline-block text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg border ${badgeCls}`}
                            >
                              {pct}%
                            </span>
                          </td>
                        </tr>
                      );
                    }),
                  ];
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-5 shrink-0">
          {[
            { color: "bg-emerald-500", label: `On track ≥${OEE_GOOD}%` },
            {
              color: "bg-amber-500",
              label: `Low ${OEE_CRITICAL}–${OEE_GOOD - 1}%`,
            },
            { color: "bg-rose-500", label: `Critical <${OEE_CRITICAL}%` },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//  MACHINE CARD — one tile per machine in the "Weld Shop" grid

const MachineCard = memo(function MachineCard({
  machine,
  onJPHClick,
  onOEEClick,
}) {
  const s = getOeeStatus(machine.oee, machine.alert);
  const oeeStr = machine.oee % 1 === 0 ? machine.oee : machine.oee.toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Header: machine id + status chip */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-sky-50 border border-sky-100 text-sky-600">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="1.5" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </span>
          <span className="text-[14px] font-bold text-gray-900 tracking-wide ">
            {machine.id}
          </span>
        </div>
        <span
          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${s.chipBg}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${machine.alert ? "animate-pulse" : ""}`}
            style={{ backgroundColor: s.dot }}
          />
          {machine.alert ? "Alert" : s.label}
        </span>
      </div>

      {/* Actual / Plan / Target numbers */}
      <div className="grid grid-cols-3 px-3.5 pt-3 pb-2.5 gap-1.5">
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-500">
            Actual
          </span>
          <span className="text-[15px] sm:text-[17px] font-bold text-gray-900 leading-none tabular-nums">
            {machine.actual}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-500">
            Plan
          </span>
          <span className="text-[15px] sm:text-[17px] font-bold text-gray-900 leading-none tabular-nums">
            {machine.plan}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-500">
            Target
          </span>
          <span className="text-[15px] sm:text-[17px] font-bold text-gray-900 leading-none tabular-nums">
            {machine.target}
          </span>
        </div>
      </div>

      {machine.showJph && (
        <>
          <div className="mx-3.5 h-px bg-gray-100" />

          {/* JPH button — opens the JPHModal for this machine when clicked */}
          <button
            type="button"
            onClick={() => onJPHClick(machine)}
            className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-sky-50/60 transition-colors group"
          >
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-gray-500 group-hover:text-sky-600">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              JPH
            </span>
            <span className="flex items-center gap-1 text-[12.5px] font-semibold text-gray-900 group-hover:text-sky-700">
              <span className="tabular-nums">{machine.jphActual ?? "—"}</span>
              <span className="text-gray-300 font-light">|</span>
              <span className="tabular-nums text-gray-500">
                {machine.jphTarget ?? "—"}
              </span>
              <svg
                className="w-3 h-3 text-gray-400 group-hover:text-sky-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </span>
          </button>

          <div className="mx-3.5 h-px bg-gray-100" />
        </>
      )}

      {/* OEE — clickable row */}
      {(() => {
        const isCritical = machine.oee < OEE_CRITICAL;
        const isLow = !isCritical && machine.oee < OEE_GOOD;
        const color = isCritical
          ? { text: "text-rose-600", bar: "#f43f5e", track: "#ffe4e6" }
          : isLow
            ? { text: "text-amber-600", bar: "#f59e0b", track: "#fef3c7" }
            : { text: "text-emerald-600", bar: "#10b981", track: "#d1fae5" };
        return (
          <div
            onClick={onOEEClick ? () => onOEEClick(machine) : undefined}
            className="px-3.5 pb-3 pt-2 border-t border-gray-100 cursor-pointer group hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wide ${color.text}`}
              >
                {isCritical && (
                  <span className="relative flex h-1.5 w-1.5 mr-0.5">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: "#f43f5e" }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                  </span>
                )}
                OEE
              </span>
              <span
                className={`flex items-center gap-1 text-[14px] font-bold tabular-nums ${color.text} group-hover:underline underline-offset-2`}
              >
                {oeeStr}%
                <svg
                  className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </span>
            </div>
            <div
              className="h-[5px] rounded-full overflow-hidden"
              style={{ backgroundColor: color.track }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(machine.oee, 100)}%`,
                  backgroundColor: color.bar,
                }}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
});

export default function Overview() {
  const navigate = useNavigate();
  const [dateKey, setDateKey] = useState("today");
  const [jphMachine, setJphMachine] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: dashData,
    loading,
    error,
    lastUpdated,
  } = useDashboard(dateKey, refreshKey);

  const d = useMemo(() => {
    const shop = dashData?.shopDetails ?? {};
    const lines = dashData?.lineWiseDetails ?? [];
    return {
      production: {
        actual: shop.AvgActualProductionCount ?? 0,
        target: shop.AvgTargetProductionCount ?? 0,
        plan: shop.AvgPlanProductionCount ?? 0,
      },
      shopJPH: shop.AvgJPH ?? 0,
      oee: {
        overall: Math.round(shop.AvgOEE ?? 0),
        availability: Math.round(shop.AvgAvailability ?? 0),
        performance: Math.round(shop.AvgPerformance ?? 0),
        quality: Math.round(shop.AvgQuality ?? 0),
      },
      time: {
        netAvailableTime: Math.round(shop.AvgAvailableTime ?? 0),
        breakdown: Math.round(shop.AvgBreakDownTime ?? 0),
      },
      machines: lines.map((l) => ({
        id: l.LineName ?? l.LineID ?? "—",
        lineId: l.LineID ?? null,
        actual: l.ActualProductionCount ?? 0,
        plan: l.PlanProductionCount ?? 0,
        target: l.TargetProductionCount ?? 0,
        jphTarget:
          dateKey === "today"
            ? (l.CurrentHourDetails?.CurrentHourJPH ?? null)
            : null,
        jphActual:
          dateKey === "today"
            ? (l.CurrentHourDetails?.CurrentHourAvgActual ?? null)
            : null,
        currentHourId:
          dateKey === "today" ? (l.CurrentHourDetails?.HourID ?? null) : null,
        oee: l.AvgOEE ?? 0,
        alert: (l.AvgOEE ?? 100) < OEE_CRITICAL,
        jphDetails: l.JphDetails ?? [],
        showJph: dateKey === "today" || dateKey === "yesterday",
      })),
    };
  }, [dashData, dateKey]);

  const alertCount = useMemo(
    () => d.machines.filter((m) => m.alert).length,
    [d],
  );

  const handleOEEClick = useCallback(
    (machine) => {
      const today = new Date();
      const fmt = (d) => d.toISOString().split("T")[0];
      let start, end;
      if (dateKey === "yesterday") {
        const y = new Date(today);
        y.setDate(y.getDate() - 1);
        start = end = fmt(y);
      } else if (dateKey === "last10") {
        const s = new Date(today);
        s.setDate(s.getDate() - 9);
        start = fmt(s);
        end = fmt(today);
      } else if (dateKey === "lastmonth") {
        const s = new Date(today);
        s.setDate(s.getDate() - 29);
        start = fmt(s);
        end = fmt(today);
      } else {
        start = end = fmt(today);
      }
      navigate("/oee", {
        state: { lineId: machine.lineId, dateRange: { start, end } },
      });
    },
    [navigate, dateKey],
  );

  const productionPct = useMemo(
    () =>
      d.production.target > 0
        ? Math.min(
            100,
            Math.round((d.production.actual / d.production.target) * 100),
          )
        : 0,
    [d],
  );

  // Top summary strip: Actual / Plan / Target / Shop JPH
  const summaryStats = useMemo(
    () => [
      {
        label: "ACTUAL",
        value: d.production.actual.toLocaleString(),
        icon: ACTUAL_ICON,
        highlight: true,
      },
      {
        label: "PLAN",
        value: d.production.plan.toLocaleString(),
        icon: PLAN_ICON,
        highlight: false,
      },
      {
        label: "TARGET",
        value: d.production.target.toLocaleString(),
        icon: TARGET_ICON,
        highlight: false,
      },
      {
        label: "SHOP JPH",
        value: d.shopJPH > 0 ? String(d.shopJPH) : "—",
        icon: JPH_ICON,
        highlight: false,
      },
    ],
    [d],
  );

  if (loading && !dashData) {
    return (
      <div className="p-4 space-y-4">
        <KPIShimmer />
        <ChartShimmer />
      </div>
    );
  }

  if (error && !dashData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 rounded-xl px-6 py-5 max-w-sm w-full text-center shadow-sm">
          <p className="text-sm font-bold text-red-600 mb-1">
            Failed to load dashboard
          </p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="text-xs font-semibold text-sky-600 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ---------- Page header: breadcrumb + title + live badge ---------- */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-1 h-9 bg-sky-600 rounded-full" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-sky-600 font-semibold">Overview</span>
            </div>
            <h1 className="text-[17px] sm:text-[20px] font-bold text-gray-900 tracking-tight leading-tight">
              Production Overview Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {dateKey === "today" && (
            <>
              {lastUpdated && (
                <span className="text-[10px] font-medium text-gray-400 hidden sm:inline">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              {error && dashData && (
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                  Refresh failed
                </span>
              )}
              {/* Manual refresh button */}
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                disabled={loading}
                title="Refresh data"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 text-[11px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                  <polyline points="21 3 21 9 15 9" />
                </svg>
                Refresh
              </button>
            </>
          )}
          {dateKey === "today" && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-full px-3 py-1">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 animate-ping opacity-60" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
              </span>
              Live
            </span>
          )}
        </div>
      </div>

      {/* ---------- Toolbar: date filter + production summary + clock ---------- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-5 py-3.5 flex items-center justify-between flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-4 flex-wrap">
          <DateDropdown value={dateKey} onChange={setDateKey} />
          <div className="w-px h-7 bg-gray-200" />
          {/* Production */}
          <div className="flex items-center gap-3.5 pl-1 flex-wrap">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 shrink-0">
              <svg
                className="w-[18px] h-[18px] text-sky-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 21h18" />
                <path d="M6 21V10a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v11" />
                <path d="M14 21V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v15" />
              </svg>
            </span>

            <div className="flex flex-col leading-none">
              <span className="text-[12px] font-bold text-gray-600 uppercase tracking-widest mb-1.5">
                Avg. Production
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[21px] font-extrabold text-gray-900 tabular-nums">
                  {d.production.actual.toLocaleString()}
                </span>
                <span className="text-[14px] font-bold text-gray-600 tabular-nums">
                  / {d.production.target.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1.5 pl-4 ml-1 border-l border-gray-200 min-w-[110px]">
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 rounded px-1.5 py-0.5 tabular-nums">
                {productionPct}% of target
              </span>
              <div className="w-24 h-[5px] bg-sky-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-600 rounded-full"
                  style={{ width: `${productionPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <LiveClock />
      </div>

      <main className="space-y-4 py-2">
        {/* ---------- OEE card: donut chart + Availability/Performance/Quality rings ---------- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <SectionHeading
              icon={OEE_ICON}
              title="Overall Equipment Effectiveness"
              tone="sky"
            />
            <div className="flex flex-col items-center bg-sky-50 border border-sky-100 rounded-lg px-4 py-1.5">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Overall OEE
              </span>
              <span className="text-xl font-extrabold text-sky-900 leading-tight">
                {d.oee.overall}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Left: downtime donut */}
            <div className="lg:col-span-4 px-4 py-3">
              <p className="text-[12px] font-bold text-gray-600 uppercase tracking-wider px-1 mb-1">
                Available vs Downtime
              </p>
              <DonutChart
                net={d.time.netAvailableTime}
                breakdown={d.time.breakdown}
              />
            </div>

            {/* Right: 3 ring gauges (A / P / Q) */}
            <div className="lg:col-span-8">
              <p className="text-[12px] font-bold text-gray-600 uppercase tracking-wider px-4 pt-3">
                APQ Average
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {["Availability", "Performance", "Quality"].map((m) => (
                  <div
                    key={m}
                    className="flex flex-col items-center justify-center"
                  >
                    <RingGauge label={m} value={d.oee[m.toLowerCase()]} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Shop Summary card: stats + shop OEE bar ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-wrap gap-2.5">
            <SectionHeading
              icon={WELD_ICON}
              title="SHOP FLOOR - MASTER SUMMARY"
              tone="sky"
            />
            <div className="flex items-center gap-3 flex-wrap">
              {/* OEE status legend */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  {
                    label: `Good ≥${OEE_GOOD}%`,
                    dot: "#059669",
                    bg: "bg-emerald-50 border-emerald-100 text-emerald-700",
                    count: d.machines.filter(
                      (m) => !m.alert && m.oee >= OEE_GOOD,
                    ).length,
                  },
                  {
                    label: `Low ${OEE_CRITICAL}–${OEE_GOOD - 1}%`,
                    dot: "#d97706",
                    bg: "bg-amber-50 border-amber-100 text-amber-700",
                    count: d.machines.filter(
                      (m) => !m.alert && m.oee < OEE_GOOD,
                    ).length,
                  },
                  {
                    label: `Critical <${OEE_CRITICAL}%`,
                    dot: "#dc2626",
                    bg: "bg-rose-50 border-rose-100 text-rose-700",
                    count: d.machines.filter((m) => m.alert).length,
                  },
                ].map(({ label, dot, bg, count }) => (
                  <span
                    key={label}
                    className={`flex items-center gap-1.5 text-[10.5px] font-bold px-2 py-1 rounded-md border ${bg}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: dot }}
                    />
                    {label}
                    <span className="tabular-nums">· {count}</span>
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-200 shrink-0" />

              {/* Alert + lines count */}
              <div className="flex items-center gap-2">
                {alertCount > 0 && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-md px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {alertCount} Alert
                  </span>
                )}
                <span className="text-xs text-gray-500 font-semibold">
                  {d.machines.length} lines
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Actual / Plan / Target / Shop JPH summary tiles */}
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-gray-200">
                {summaryStats.map(({ label, value, icon, highlight }) => {
                  const isActual = highlight;
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-4 py-3.5 ${isActual ? "bg-sky-50" : ""}`}
                    >
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-lg border shrink-0 ${isActual ? "bg-sky-100 border-sky-200 text-sky-700" : "bg-sky-50 border-sky-100 text-sky-600"}`}
                      >
                        {icon}
                      </span>
                      <div className="flex flex-col leading-none min-w-0">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${isActual ? "text-sky-600" : "text-gray-500"}`}
                        >
                          {label}
                        </span>
                        <span
                          className={`text-[17px] font-bold tabular-nums truncate ${isActual ? "text-sky-900" : "text-gray-900"}`}
                        >
                          {value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shop-wide OEE progress bar with a target marker at 80% */}
            <div className="rounded-xl border border-gray-200 px-4 py-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-md bg-sky-50 border border-sky-100 text-sky-600">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                      <polyline points="21 3 21 9 15 9" />
                    </svg>
                  </span>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Shop OEE
                  </span>
                </div>
                <span
                  className={`text-sm font-extrabold border rounded-md px-2.5 py-0.5 tabular-nums ${
                    d.oee.overall >= OEE_GOOD
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : d.oee.overall >= OEE_CRITICAL
                        ? "text-amber-700 bg-amber-50 border-amber-200"
                        : "text-red-700 bg-red-50 border-red-200"
                  }`}
                >
                  {d.oee.overall}%
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    d.oee.overall >= OEE_GOOD
                      ? "bg-emerald-500"
                      : d.oee.overall >= OEE_CRITICAL
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${d.oee.overall}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Lines card: machine grid (separate card) ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-wrap gap-2.5">
            <SectionHeading icon={LINES_ICON} title="LINES" tone="sky" />
            <div className="flex items-center gap-2 flex-wrap">
              {[
                {
                  key: "good",
                  label: `Good ≥${OEE_GOOD}%`,
                  dot: "#059669",
                  bg: "bg-emerald-50 border-emerald-100 text-emerald-700",
                  count: d.machines.filter((m) => !m.alert && m.oee >= OEE_GOOD)
                    .length,
                },
                {
                  key: "low",
                  label: `Low ${OEE_CRITICAL}–${OEE_GOOD - 1}%`,
                  dot: "#d97706",
                  bg: "bg-amber-50 border-amber-100 text-amber-700",
                  count: d.machines.filter((m) => !m.alert && m.oee < OEE_GOOD)
                    .length,
                },
                {
                  key: "critical",
                  label: `Critical <${OEE_CRITICAL}%`,
                  dot: "#dc2626",
                  bg: "bg-rose-50 border-rose-100 text-rose-700",
                  count: d.machines.filter((m) => m.alert).length,
                },
              ].map(({ key, label, dot, bg, count }) => (
                <span
                  key={key}
                  className={`flex items-center gap-1.5 text-[10.5px] font-bold px-2 py-1 rounded-md border ${bg}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: dot }}
                  />
                  {label}
                  <span className=" tabular-nums">· {count}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="px-5 py-4">
            {d.machines.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-sm text-gray-400 font-medium">
                No line data available for this period
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {d.machines.map((m) => (
                  <MachineCard
                    key={m.id}
                    machine={m}
                    onJPHClick={setJphMachine}
                    onOEEClick={handleOEEClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ---------- JPH detail modal (only rendered when a machine is selected) ---------- */}
      {jphMachine && (
        <JPHModal machine={jphMachine} onClose={() => setJphMachine(null)} />
      )}
    </div>
  );
}
