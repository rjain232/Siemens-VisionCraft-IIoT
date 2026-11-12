import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Cell,
  ResponsiveContainer,
} from "recharts";
import DataTable from "../../../../../sharedComponents/DataTable";

// DB column → display label mapping
const MICROSTATE_KEYS = [
  { key: "Emergency", label: "Emergency" },
  { key: "Tip_Change", label: "Tip Change" },
  { key: "Tip_Dress", label: "Tip Dress" },
  { key: "OperatorLoading_Starving_Time", label: "Op. Loading / Starving" },
  { key: "Block_Time", label: "Block Time" },
  { key: "Manual", label: "Manual" },
  { key: "Part_Present_Fault", label: "Part Present Fault" },
  { key: "RollMoveTime", label: "Transfer Time" },
  { key: "LifterTime", label: "Lifter Time" },
  { key: "TurnTabletime", label: "Turn Table Time" },
  { key: "ClampTime", label: "Clamp Time" },
  { key: "DeclampTime", label: "Declamp Time" },
  { key: "Marriage_Miss_Match", label: "Marriage Mismatch" },
  { key: "DropTime", label: "Drop Time" },
  { key: "WeldTime", label: "Weld Time" },
  { key: "PickTime", label: "Pick Time" },
  { key: "SealingTime", label: "Sealing Time" },
  { key: "Safety_Gate", label: "Safety Gate" },
  { key: "Miscleniuos", label: "Miscellaneous" },
  { key: "MaterialCall", label: "Material Call" },
  { key: "Others", label: "Others" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #10b981",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#0f172a" }}>
        {item.stage}
      </div>
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Time: <b style={{ color: "#0f172a" }}>{item.time}s</b>
      </div>
    </div>
  );
};

const CustomLegend = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 24,
      fontSize: 12,
      marginTop: 8,
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 2,
          background: "#10b981",
          display: "inline-block",
        }}
      />
      Microstate Time (s)
    </span>
  </div>
);

const MicrostackBreakdown = ({
  biwData,
  onClose,
  filterIds = {},
  dateFilter = {},
}) => {
  const navigate = useNavigate();

  const handleCheckAlarm = () => {
    navigate("/maintenance", {
      state: {
        activeTab: "alarm-report",
        lineId: filterIds.lineId || "",
        stationId: filterIds.stationId || "",
        equipmentId: filterIds.equipmentId || "",
        shift: filterIds.shift || "A",
        dateRange: {
          start: dateFilter.startDate ?? null,
          end: dateFilter.endDate ?? null,
        },
      },
    });
  };

  const microstackData = useMemo(() => {
    if (!biwData) return [];
    return MICROSTATE_KEYS.map(({ key, label }) => {
      const time = Number(biwData[key]);
      return { stage: label, time: isNaN(time) ? 0 : time };
    }).filter((d) => d.time > 0);
  }, [biwData]);

  return (
    <div className="m-4">
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-50 to-white py-3 mb-4 -mx-4 px-4 border-b-2 border-blue-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 text-white rounded-lg transition-all shadow-lg font-semibold text-sm"
            style={{ backgroundColor: "rgb(22, 70, 161)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Main Level
          </button>
          <button
            onClick={handleCheckAlarm}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg font-semibold text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Check Alarm
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 mb-4 overflow-hidden border border-blue-100">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-4">
            <div
              className="rounded-xl p-4 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgb(22, 70, 161), rgb(30, 95, 200))",
              }}
            >
              <span className="text-white text-xl font-bold">
                {biwData?.CabinNo}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Microstates Breakdown Analysis
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {biwData?.Line} | {biwData?.StationName} | {biwData?.SubStation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Time Distribution Across Microstates
        </h3>
        {microstackData.length === 0 ? (
          <p className="text-center text-gray-400 py-12">
            No micro state data available for this BIW / equipment.
          </p>
        ) : (
          <div>
            <div style={{ height: 420 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={microstackData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="stage"
                    tick={{ fontSize: 12, fontWeight: 600 }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Cycle Time (s)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: { fontSize: 12, fill: "#64748b" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} verticalAlign="top" />
                  <Bar dataKey="time" name="Actual Time" radius={[4, 4, 0, 0]}>
                    {microstackData.map((_, index) => (
                      <Cell key={index} fill="#10b981" />
                    ))}
                    <LabelList
                      dataKey="time"
                      position="insideTop"
                      fill="#ffffff"
                      fontSize={13}
                      fontWeight={700}
                      formatter={(v) => Math.round(v)}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {microstackData.length > 0 && (
        <DataTable
          title="Microstates Details"
          columns={[
            { key: "sr", label: "Sr. No" },
            { key: "stage", label: "Microstate", sortable: true },
            { key: "time", label: "Time (s)", sortable: true },
            { key: "percentage", label: "% of Total CT", sortable: true },
          ]}
          data={(() => {
            const total = microstackData.reduce((s, d) => s + d.time, 0);
            return microstackData.map(({ stage, time }, i) => ({
              sr: i + 1,
              stage,
              time,
              percentage:
                total > 0 ? `${((time / total) * 100).toFixed(1)}%` : "—",
            }));
          })()}
          defaultRows={10}
        />
      )}
    </div>
  );
};

export default MicrostackBreakdown;
