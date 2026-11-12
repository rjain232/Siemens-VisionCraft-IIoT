import { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import PieChart from "../.../../productionOverviewComp/PieChart";

const COLORS = ["#2744A0", "#3b82f6", "#10b981"];
const GRADIENT_COLORS = ["#4a6cc7", "#6ea8f8", "#2dd4a0"];

const FILL_CONFIG = {
  type: "gradient",
  gradient: {
    shade: "light",
    type: "diagonal2",
    shadeIntensity: 0.3,
    gradientToColors: GRADIENT_COLORS,
    inverseColors: true,
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100],
  },
};

const ShiftwiseProductionPieChart = memo(function ShiftwiseProductionPieChart({
  data,
}) {
  const filtered = useMemo(
    () => (data ?? []).filter((item) => item.PartsProduced > 0),
    [data],
  );

  const series = useMemo(
    () => filtered.map((item) => item.PartsProduced),
    [filtered],
  );
  const labels = useMemo(
    () => filtered.map((item) => `Shift ${item.Shift}`),
    [filtered],
  );
  const total = useMemo(() => series.reduce((s, v) => s + v, 0), [series]);

  const plotOptions = useMemo(
    () => ({
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "13px",
              fontWeight: 600,
              color: "#6b7280",
              offsetY: -6,
            },
            value: {
              show: true,
              fontSize: "22px",
              fontWeight: 800,
              color: "#111827",
              offsetY: 4,
              formatter: () => total,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "13px",
              fontWeight: 600,
              color: "#6b7280",
              formatter: () => total,
            },
          },
        },
      },
    }),
    [total],
  );

  const customFormatter = useCallback(
    (val, opts) => `${opts.w.config.series[opts.seriesIndex]}`,
    [],
  );

  const customTooltipFormatter = useCallback((val) => `${val}`, []);

  const chartKey = useMemo(() => series.join("-"), [series]);

  if (series.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        No production data available
      </div>
    );
  }

  return (
    <PieChart
      key={chartKey}
      chartSeries={series}
      type="donut"
      colors={COLORS}
      plotOptions={plotOptions}
      fill={FILL_CONFIG}
      labels={labels}
      height={300}
      customFormatter={customFormatter}
      customTooltipFormatter={customTooltipFormatter}
    />
  );
});

ShiftwiseProductionPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      PartsProduced: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ShiftwiseProductionPieChart;
