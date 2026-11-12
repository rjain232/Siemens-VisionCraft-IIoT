import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ACTUAL_DOT = { r: 5, fill: "#00893d" };
const ACTUAL_ACTIVE_DOT = { r: 7 };
const TARGET_DOT = { r: 3, fill: "#000000" };
const LEGEND_STYLE = { paddingBottom: 8, fontWeight: 800 };
const XAXIS_TICK = { fontSize: 11, fontWeight: 800, fill: "#111827" };
const YAXIS_TICK = { fontSize: 11 };
const YAXIS_LABEL = {
  value: "Production Count",
  angle: -90,
  position: "insideLeft",
  style: { fontSize: 12, fill: "#111827", fontWeight: 700 },
};

const ActualLabel = ({ x, y, value }) => {
  if (value == null || value === "") return null;
  const text = String(value);
  const charW = 7.8;
  const padX = 5;
  const padY = 3;
  const w = text.length * charW + padX * 2;
  const h = 19;
  const boxY = y - h - 6;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={boxY}
        width={w}
        height={h}
        rx={3}
        fill="white"
        stroke="#00893d"
        strokeWidth={0.8}
        opacity={0.95}
      />
      <text
        x={x}
        y={boxY + h - padY}
        textAnchor="middle"
        fill="#00893d"
        fontSize={13}
        fontWeight={700}
      >
        {text}
      </text>
    </g>
  );
};

const ProductionLineGraph = memo(function ProductionLineGraph({ data }) {
  const chartData = useMemo(
    () =>
      (data ?? [])
        .map((item) => ({
          date: item.Date,
          Actual: Number(item.PartsProduced ?? 0),
          Target: Number(item.Target ?? 0),
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [data],
  );

  return (
    <div style={{ height: 325 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 36, right: 20, left: 10, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={XAXIS_TICK}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tick={YAXIS_TICK} label={YAXIS_LABEL} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={LEGEND_STYLE} />
          <Line
            type="linear"
            dataKey="Actual"
            stroke="#00893d"
            strokeWidth={3}
            dot={ACTUAL_DOT}
            activeDot={ACTUAL_ACTIVE_DOT}
          >
            <LabelList dataKey="Actual" content={ActualLabel} />
          </Line>
          <Line
            type="linear"
            dataKey="Target"
            stroke="#000000"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={TARGET_DOT}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

ProductionLineGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string,
      PartsProduced: PropTypes.number,
      Target: PropTypes.number,
    }),
  ),
};

export default ProductionLineGraph;
