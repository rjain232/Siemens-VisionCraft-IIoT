import { memo, useMemo, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const DATA_LABEL_FONT_SIZE = window.innerWidth < 640 ? "10px" : "14px";

const PieChart = memo(function PieChart({
  chartSeries,
  labels,
  colors,
  fill,
  height,
  type,
  plotOptions,
  Area,
  Line,
  customFormatter,
  customTooltipFormatter,
}) {
  const navigate = useNavigate();

  const handleDataPointSelection = useCallback(
    (event, chartContext, config) => {
      const clickedLabel = labels[config.dataPointIndex];
      if (clickedLabel === "Breakdown") {
        navigate("/maintenance", {
          state: {
            activeTab: "Line Losses",
            Area: Area ?? "All",
            Line: Line ?? "All",
          },
        });
      }
    },
    [navigate, labels, Area, Line],
  );

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: type ?? "pie",
        offsetY: 0,
        toolbar: { show: false },
        animations: { enabled: false },
        events: { dataPointSelection: handleDataPointSelection },
      },
      labels,
      colors,
      fill: fill ?? { type: "solid" },
      plotOptions: plotOptions ?? {},
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetY: 10,
        fontSize: "12px",
        fontWeight: 600,
        width: "100%",
        markers: { width: 10, height: 10, radius: 12 },
        itemMargin: { horizontal: 8, vertical: 6 },
      },
      dataLabels: {
        enabled: true,
        formatter:
          customFormatter ??
          ((val, opts) => {
            const value = opts.w.config.series[opts.seriesIndex];
            return `${value} min`;
          }),
        style: {
          fontSize: DATA_LABEL_FONT_SIZE,
          fontWeight: "700",
          colors: ["#fff"],
        },
        textAnchor: "middle",
        dropShadow: { enabled: false },
        background: {
          enabled: true,
          foreColor: "#000",
          padding: 6,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          opacity: 0.9,
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        style: { fontSize: "20px" },
        marker: { show: true },
        y: {
          formatter: customTooltipFormatter ?? ((value) => `${value} min`),
          title: {
            formatter: (seriesName) => {
              if (seriesName === "Downtime") return "Total Downtime";
              if (seriesName === "Available Time")
                return "Total Available Time";
              return seriesName;
            },
          },
        },
      },
    }),
    [
      type,
      labels,
      colors,
      fill,
      plotOptions,
      customFormatter,
      customTooltipFormatter,
      handleDataPointSelection,
    ],
  );

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type={type ?? "pie"}
      height={height || 300}
    />
  );
});

export default PieChart;
