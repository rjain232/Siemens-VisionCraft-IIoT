import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";
import CardContainer from "../../../sharedComponents/CardContainer";
import FilterBar from "../../../sharedComponents/FilterBar";
import { ChartShimmer } from "../../../sharedComponents/Shimmer";
import { NoDataState } from "../../../sharedComponents/EmptyState";
import { masterApi } from "../../../services/api";
import { formatClusterName, formatStationName } from "../../../utils/Formatters";

const opt = (value, label) => ({ value, label });

const COLOR_PERFORMED = "#10b981";
const COLOR_PENDING = "#dc2626";
const BRAND_BLUE = "#1646A1";

function hashSeed(str) {
  let h = 7;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 233280;
  }
  return h || 11;
}

function generateDummyComplianceData(seed = 11) {
  const start = new Date(2026, 5, 6);
  const end = new Date();
  const days = [];
  let cursor = new Date(start);
  let s = seed;

  const rand = (min, max) => {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    return Math.floor(min + r * (max - min));
  };

  while (cursor <= end) {
    const total = rand(28, 55);
    const pending = rand(0, Math.min(10, total));
    const performed = total - pending;

    days.push({
      date: `${cursor.getFullYear()}-${String(
        cursor.getMonth() + 1,
      ).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`,
      rawDate: new Date(cursor),
      TotalActivities: total,
      ActivitiesPerformed: performed,
      ActivitiesPending: pending,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const DUMMY_PENDING_TOOLS = [
  { ToolId: "T-1001", ToolName: "Torque Wrench 12mm", Status: "Pending" },
  { ToolId: "T-1002", ToolName: "Weld Gun Tip Gauge", Status: "Pending" },
  { ToolId: "T-1003", ToolName: "Robot Calibration Kit", Status: "Pending" },
  { ToolId: "T-1004", ToolName: "Vernier Caliper 200mm", Status: "Pending" },
  { ToolId: "T-1005", ToolName: "Air Pressure Gauge", Status: "Pending" },
  { ToolId: "T-1006", ToolName: "Nut Runner Set", Status: "Pending" },
  { ToolId: "T-1007", ToolName: "Fixture Alignment Pin", Status: "Pending" },
  { ToolId: "T-1008", ToolName: "Sealant Applicator", Status: "Pending" },
];

function useBreakpoint() {
  const getBP = (w) => {
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    if (w < 1920) return "laptop";
    return "wide";
  };

  const [bp, setBp] = useState(() =>
    typeof window !== "undefined" ? getBP(window.innerWidth) : "laptop",
  );

  useEffect(() => {
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setBp(getBP(window.innerWidth)));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return bp;
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const performed = payload.find((p) => p.dataKey === "ActivitiesPerformed")?.value ?? 0;
  const pending = payload.find((p) => p.dataKey === "ActivitiesPending")?.value ?? 0;
  return (
    <div
      style={{
        padding: 10,
        border: `2px solid ${COLOR_PERFORMED}`,
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.12)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#0f172a" }}>{label}</div>
      <div style={{ fontSize: 12, color: "#334155" }}>
        Performed: <b style={{ color: COLOR_PERFORMED }}>{performed}</b>
      </div>
      <div style={{ fontSize: 12, color: "#334155" }}>
        Pending: <b style={{ color: COLOR_PENDING }}>{pending}</b>
      </div>
    </div>
  );
};

const STAT_TINT = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", label: "text-blue-700", value: "text-blue-900" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", label: "text-emerald-700", value: "text-emerald-900" },
  red: { bg: "bg-red-50", border: "border-red-200", label: "text-red-700", value: "text-red-900" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", label: "text-amber-700", value: "text-amber-900" },
};

const StatCard = ({ title, value, color = "blue" }) => {
  const s = STAT_TINT[color];
  return (
    <div className={`${s.bg} rounded-lg p-2.5 sm:p-3 lg:p-4 border ${s.border} min-w-0`}>
      <p className={`text-[10px] sm:text-xs ${s.label} font-semibold uppercase tracking-wide truncate`}>
        {title}
      </p>
      <p className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${s.value} mt-1`}>
        {value?.toLocaleString?.() ?? value}
      </p>
    </div>
  );
};

function getComplianceColor(rate) {
  if (rate >= 90) return "emerald";
  if (rate >= 75) return "amber";
  return "red";
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const WrenchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const Compliance = ({ changeTool, changeTab }) => {
  const bp = useBreakpoint();

  const CHART_HEIGHT = { mobile: 260, tablet: 280, laptop: 300, wide: 360 }[bp];
  const donutInner = { mobile: 55, tablet: 62, laptop: 70, wide: 88 }[bp];
  const donutOuter = { mobile: 82, tablet: 92, laptop: 100, wide: 126 }[bp];
  const centerValueSize = { mobile: "text-xl", tablet: "text-2xl", laptop: "text-2xl", wide: "text-4xl" }[bp];

  const [masterData, setMasterData] = useState([]);
  const [filters, setFilters] = useState({ areaId: "", lineId: "", stationId: "" });
  const [loadingMaster, setLoadingMaster] = useState(true);

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => {
        const data = res?.data || [];
        setMasterData(data);
        const firstCluster = data[0];
        const firstLine = firstCluster?.Lines?.[0];
        const firstStation = firstLine?.Stations?.[0];
        setFilters({
          areaId: firstCluster?.ClusterId ?? "",
          lineId: firstLine?.LineId ?? "",
          stationId: firstStation?.StationId ?? "",
        });
      })
      .catch(console.error)
      .finally(() => setLoadingMaster(false));
  }, []);

  // Show every cluster in the Area filter, even ones with no lines yet.
  const areaOptions = useMemo(
    () => masterData.map((c) => opt(c.ClusterId, formatClusterName(c.ClusterName))),
    [masterData],
  );

  const lineOptions = useMemo(() => {
    const lines = filters.areaId
      ? masterData.find((c) => c.ClusterId === Number(filters.areaId))?.Lines || []
      : masterData.flatMap((c) => c.Lines || []);
    return lines.map((l) => opt(l.LineId, l.LineName));
  }, [masterData, filters.areaId]);

  const stationOptions = useMemo(() => {
    if (!filters.lineId) return [];
    const line = masterData
      .flatMap((c) => c.Lines || [])
      .find((l) => l.LineId === Number(filters.lineId));
    return (line?.Stations || []).map((s) => opt(s.StationId, formatStationName(s.StationName)));
  }, [masterData, filters.lineId]);

  const filterConfig = useMemo(
    () => [
      { type: "select", key: "areaId", label: "Area", options: areaOptions },
      { type: "select", key: "lineId", label: "Line", options: lineOptions },
      { type: "select", key: "stationId", label: "Station", options: stationOptions },
    ],
    [areaOptions, lineOptions, stationOptions],
  );

  const handleFiltersChange = useCallback(
    (newFilters) => {
      const updated = { ...newFilters };
      if (newFilters.areaId !== filters.areaId) {
        const lines = masterData.find((c) => c.ClusterId === Number(newFilters.areaId))?.Lines || [];
        const firstLine = lines[0];
        updated.lineId = firstLine?.LineId ?? "";
        updated.stationId = firstLine?.Stations?.[0]?.StationId ?? "";
      } else if (newFilters.lineId !== filters.lineId) {
        const line = masterData
          .flatMap((c) => c.Lines || [])
          .find((l) => l.LineId === Number(newFilters.lineId));
        updated.stationId = line?.Stations?.[0]?.StationId ?? "";
      }
      setFilters(updated);
    },
    [filters, masterData],
  );

  const hasSelection = Boolean(filters.areaId && filters.lineId);

  const filteredData = useMemo(() => {
    if (!hasSelection) return [];
    const seed = hashSeed(`${filters.areaId}-${filters.lineId}-${filters.stationId}`);
    return generateDummyComplianceData(seed);
  }, [hasSelection, filters.areaId, filters.lineId, filters.stationId]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, d) => ({
        TotalActivities: acc.TotalActivities + d.TotalActivities,
        ActivitiesPerformed: acc.ActivitiesPerformed + d.ActivitiesPerformed,
        ActivitiesPending: acc.ActivitiesPending + d.ActivitiesPending,
      }),
      { TotalActivities: 0, ActivitiesPerformed: 0, ActivitiesPending: 0 },
    );
  }, [filteredData]);

  const pieData = useMemo(
    () => [
      { name: "Activity Performed", value: totals.ActivitiesPerformed },
      { name: "Activity Pending", value: totals.ActivitiesPending },
    ],
    [totals],
  );

  const complianceRate = useMemo(() => {
    if (!totals.TotalActivities) return 0;
    return Math.round((totals.ActivitiesPerformed / totals.TotalActivities) * 100);
  }, [totals]);

  const weekData = useMemo(() => filteredData.slice(-7), [filteredData]);

  const [showPendingTable, setShowPendingTable] = useState(false);
  const closeButtonRef = useRef(null);

  const handlePieClick = (_, index) => {
    if (index === 1) setShowPendingTable(true);
  };

  const handlePendingToolSelected = (tool) => {
    changeTool?.({ value: tool.ToolId, text: tool.ToolName });
    changeTab?.("TDM Tools");
    setShowPendingTable(false);
  };

  const pendingTableData = DUMMY_PENDING_TOOLS.map((t, i) => ({ ...t, sr: i + 1 }));

  useEffect(() => {
    if (!showPendingTable) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowPendingTable(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showPendingTable]);

  return (
    <>
      <style>{`
        .recharts-wrapper svg:focus,
        .recharts-wrapper path:focus,
        .recharts-sector:focus,
        .recharts-pie-sector:focus {
          outline: none;
        }
      `}</style>

      <FilterBar config={filterConfig} filters={filters} onChange={handleFiltersChange} />

      {loadingMaster ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-1 min-w-0">
            <CardContainer title="Compliance Ratio">
              <ChartShimmer />
            </CardContainer>
          </div>
          <div className="lg:col-span-2 min-w-0">
            <CardContainer title="Current Week Details">
              <ChartShimmer />
            </CardContainer>
          </div>
        </div>
      ) : !hasSelection ? (
        <NoDataState />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mb-4 mt-4">
            <StatCard title="Total Activities" value={totals.TotalActivities} color="blue" />
            <StatCard title="Activity Performed" value={totals.ActivitiesPerformed} color="emerald" />
            <StatCard title="Activities To Be Completed" value={totals.ActivitiesPending} color="red" />
            <StatCard title="Compliance Rate" value={`${complianceRate}%`} color={getComplianceColor(complianceRate)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 min-w-0">
              <CardContainer title="Compliance Ratio">
                <div style={{ height: CHART_HEIGHT, position: "relative" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="40%"
                        innerRadius={donutInner}
                        outerRadius={donutOuter}
                        paddingAngle={2}
                        cornerRadius={4}
                        onClick={(entry, index) => handlePieClick(entry, index)}
                        cursor="pointer"
                      >
                        <Cell fill={COLOR_PERFORMED} stroke="#ffffff" strokeWidth={2} />
                        <Cell fill={COLOR_PENDING} stroke="#ffffff" strokeWidth={2} />
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value.toLocaleString(), name]}
                        contentStyle={{ borderRadius: 8, fontSize: 12, boxShadow: "0 4px 14px rgba(15, 23, 42, 0.12)" }}
                        position={{ x: 8, y: 0 }}
                        wrapperStyle={{ zIndex: 20 }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        formatter={(value) => <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div
                    className="pointer-events-none absolute flex flex-col items-center justify-center"
                    style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
                  >
                    <span className={`${centerValueSize} font-bold text-slate-800 leading-none`}>{complianceRate}%</span>
                    <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide mt-1">
                      Compliance Rate
                    </span>
                  </div>
                </div>
              </CardContainer>
            </div>

            <div className="lg:col-span-2 min-w-0">
              <CardContainer title="Current Week Details">
                <div style={{ height: CHART_HEIGHT }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weekData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fontWeight: 600, fill: "#334155" }} />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#334155" }}
                        label={{
                          value: "No. Of Activities",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 12, fill: "#334155", fontWeight: 600 },
                        }}
                      />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        formatter={(value) => <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{value}</span>}
                      />
                      <Bar dataKey="ActivitiesPerformed" name="Activity Performed" stackId="activities" fill={COLOR_PERFORMED} radius={[0, 0, 4, 4]}>
                        <LabelList dataKey="ActivitiesPerformed" position="center" fill="#ffffff" fontSize={12} fontWeight={700} formatter={(v) => (v > 0 ? v : "")} />
                      </Bar>
                      <Bar dataKey="ActivitiesPending" name="Activity Pending" stackId="activities" fill={COLOR_PENDING} radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="ActivitiesPending" position="top" fill="#991b1b" fontSize={11} fontWeight={700} formatter={(v) => (v > 0 ? v : "")} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContainer>
            </div>
          </div>
        </>
      )}

      {showPendingTable && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-16 sm:pt-24"
          style={{ background: "rgba(15, 23, 42, 0.55)" }}
          onClick={() => setShowPendingTable(false)}
          role="presentation"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[75vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pending-activities-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EFF6FF", color: BRAND_BLUE }}
                >
                  <WrenchIcon />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Maintenance
                  </p>
                  <h2 id="pending-activities-title" className="text-lg font-bold text-slate-900 leading-tight">
                    Pending Activities
                  </h2>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setShowPendingTable(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Table */}
            {pendingTableData.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <p className="text-sm font-semibold text-slate-600">No pending activities</p>
                <p className="text-xs text-slate-400 mt-1">All tools are compliant right now.</p>
              </div>
            ) : (
              <div className="overflow-y-auto px-6 pb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 text-left py-2.5 border-b border-slate-100 w-14">
                        Sr.
                      </th>
                      <th className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 text-left py-2.5 border-b border-slate-100">
                        Tool
                      </th>
                      <th className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 text-left py-2.5 border-b border-slate-100 w-24">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTableData.map((tool) => {
                      const statusColor = tool.Status === "Pending" ? COLOR_PENDING : COLOR_PERFORMED;
                      return (
                        <tr
                          key={tool.ToolId}
                          onClick={() => handlePendingToolSelected(tool)}
                          className="cursor-pointer transition-colors hover:bg-slate-50"
                        >
                          <td className="py-3 border-b border-slate-100">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                              {tool.sr}
                            </div>
                          </td>
                          <td className="py-3 text-sm font-medium text-slate-800 border-b border-slate-100">
                            {tool.ToolName}
                          </td>
                          <td className="py-3 border-b border-slate-100">
                            <span className="text-sm font-semibold" style={{ color: statusColor }}>
                              {tool.Status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Compliance;