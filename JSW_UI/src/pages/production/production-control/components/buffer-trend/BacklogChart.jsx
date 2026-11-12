//
import {
  ComposedChart,
  Line,
  Scatter,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DAY_MINUTES = 24 * 60;

// Fixed offsets in minutes FROM the 06:30 anchor — never derived from data,
// so they always render regardless of how sparse/dense the data is.
const SHIFT_COLORS = { A: "#2744A0", B: "#3b82f6", C: "#10b981" };

const SHIFTS = [
  { minutes: 0, label: "Shift A (06:30)", color: SHIFT_COLORS.A },
  { minutes: 510, label: "Shift B (15:00)", color: SHIFT_COLORS.B },
  { minutes: 1020, label: "Shift C (23:30)", color: SHIFT_COLORS.C },
];

function computeShiftBoundaries(data) {
  const firstSeen = {};
  data.forEach((point) => {
    if (!point.shift) return;
    if (
      firstSeen[point.shift] === undefined ||
      point.minutesFromAnchor < firstSeen[point.shift]
    ) {
      firstSeen[point.shift] = point.minutesFromAnchor;
    }
  });
  return Object.entries(firstSeen)
    .map(([shift, minutes]) => ({
      minutes,
      label: `Shift ${shift} (${minutesToClock(minutes)})`,
      color: SHIFT_COLORS[shift] ?? "#64748b",
    }))
    .sort((a, b) => a.minutes - b.minutes);
}

function minutesToClock(minutes) {
  const anchor = 6 * 60 + 30;
  const total = ((anchor + minutes) % DAY_MINUTES + DAY_MINUTES) % DAY_MINUTES;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const BufferSquare = (props) => {
  const { cx, cy, payload, index, viewBox, totalPoints } = props;
  if (cx == null || cy == null) return null;

  const plotWidth = viewBox?.width ?? 600;
  const pointSpacing = totalPoints > 1 ? plotWidth / totalPoints : plotWidth;

  const minGapPx = 26;
  const skip = Math.max(1, Math.ceil(minGapPx / pointSpacing));
  if (index % skip !== 0) return null;

  const w = Math.min(32, Math.max(20, pointSpacing * skip * 0.85));
  const h = Math.min(24, Math.max(18, w * 0.85));
  const fontSize = Math.min(12, Math.max(9, w * 0.45));

  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={2}
        fill="#f97316"
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight={700}
        fill="#fff"
      >
        {payload.max}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0]?.payload ?? {};
  const dateTime = point.dateTime ?? "";
  const rows = [
    { key: "value", label: "Buffer Level", color: "#60a5fa" },
    { key: "max", label: "Max Threshold", color: "#f97316" },
    { key: "min", label: "Min Threshold", color: "#22c55e" },
    { key: "target", label: "Target", color: "#000000" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {dateTime && (
        <p style={{ fontWeight: 700, marginBottom: 4 }}>{dateTime}</p>
      )}
      {rows.map(
        ({ key, label, color }) =>
          point[key] !== undefined && (
            <p
              key={key}
              style={{
                margin: "3px 0",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: color,
                  flexShrink: 0,
                }}
              />
              {label}: <strong>{point[key]}</strong>
            </p>
          ),
      )}
    </div>
  );
};


const renderShiftLabel = (label, color) => (labelProps) => {
  const { viewBox } = labelProps;
  if (!viewBox) return null;
  const { x, y } = viewBox;
  return (
    <g>
      <text
        x={x - 10}
        y={y}
        textAnchor="start"
        fontSize={12.5}
        fontWeight={800}
        fill={color}
        transform={`rotate(90, ${x}, ${y + 8})`}
      >
        {label}
      </text>
    </g>
  );
};

export default function BacklogChart({ data }) {
  const dataMinutes = data
    .map((d) => d.minutesFromAnchor)
    .filter((v) => v !== null && v !== undefined);

  const xDomain =
    dataMinutes.length > 0
      ? [Math.min(...dataMinutes), Math.max(...dataMinutes)]
      : [0, DAY_MINUTES];

  if (xDomain[0] === xDomain[1]) {
    xDomain[0] = Math.max(0, xDomain[0] - 30);
    xDomain[1] = Math.min(DAY_MINUTES, xDomain[1] + 30);
  }

  const tickStart = Math.ceil(xDomain[0] / 60) * 60;
  const tickEnd = Math.floor(xDomain[1] / 60) * 60;
  const xTicks = [];
  for (let m = tickStart; m <= tickEnd; m += 60) {
    xTicks.push(m);
  }

  return (
    <ResponsiveContainer width="100%" height={450}>
      <ComposedChart
        data={data}
        margin={{ top: 45, right: 50, left: 15, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="minutesFromAnchor"
          domain={xDomain}
          ticks={xTicks}
          tickFormatter={minutesToClock}
          tick={{ fontSize: 12, fontWeight: 700 }}
        />
        <YAxis
          tick={{ fontSize: 12, fontWeight: 700 }}
          label={{
            value: "Count",
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
            fill: "#475569",
            fontWeight: 700,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={20}
          wrapperStyle={{
            paddingTop: "10px",
          }}
        />

        <ReferenceLine
          y={data[0]?.min ?? 2}
          stroke="#22c55e"
          strokeDasharray="6 4"
          strokeWidth={2}
          label={{
            value: "Min Threshold",
            position: "insideBottomRight",
            fill: "#16a34a",
            fontSize: 16,
            fontWeight: 800,
          }}
        />

        {computeShiftBoundaries(data).map((s) => (
          <ReferenceLine
            key={s.label}
            x={s.minutes}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray="6 3"
            label={renderShiftLabel(s.label, s.color)}
          />
        ))}

        <Line
          type="monotone"
          dataKey="value"
          name="Buffer Level"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ r: 2, fill: "#60a5fa" }}
          activeDot={{ r: 4 }}
        />

        <Line
          type="monotone"
          dataKey="target"
          name="Target"
          stroke="#000000"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />

        <Scatter
          dataKey="max"
          name="Buffer Max Threshold"
          shape={(shapeProps) => (
            <BufferSquare {...shapeProps} totalPoints={data.length} />
          )}
          legendType="square"
          fill="#f97316"
          line={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}