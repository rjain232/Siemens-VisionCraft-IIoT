import { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";

const ShiftOEEChart = ({ series, labels, height, colors: customColors, selectedShift }) => {
  const defaultIndex = selectedShift === "All" ? labels.indexOf("Overall") : 0;
  const safeIndex = defaultIndex < 0 ? 0 : defaultIndex;
  const [centerText, setCenterText] = useState(labels[safeIndex] ?? "OEE");
  const [centerValue, setCenterValue] = useState(series[safeIndex] ?? 0);

  useEffect(() => {
    const idx = selectedShift === "All" ? labels.indexOf("Overall") : 0;
    const i = idx < 0 ? 0 : idx;
    setCenterText(labels[i] ?? "OEE");
    setCenterValue(series[i] ?? 0);
  }, [series, labels, selectedShift]);
  const colors = customColors ?? ["#0ea5e9", "#10b981", "#f59e0b", "#9f4444"];
  const GRADIENT_MAP = {
    "#2744A0": "#4a6cc7",
    "#3b82f6": "#6ea8f8",
    "#10b981": "#2dd4a0",
    "#9f4444": "#c97a7a",
    "#0ea5e9": "#7dd3fc",
    "#f59e0b": "#fcd34d",
  };
  const gradientColors = colors.map((c) => GRADIENT_MAP[c] ?? c);
  const overallIndex = labels.indexOf("Overall");
  const overallValue = overallIndex >= 0 ? series[overallIndex] : null;
  const formatLabel = (label) => (label === "Overall" ? label : `Shift ${label}`);
  const options = useMemo(() => ({
    chart: {
      type: "radialBar",
      events: {
        dataPointMouseEnter(_e, _ctx, config) {
          const i = config.dataPointIndex;
          if (i !== undefined && labels[i]) {
            setCenterText(labels[i]);
            setCenterValue(series[i] ?? 0);
          }
        },
        dataPointMouseLeave() {
          const idx = selectedShift === "All" ? labels.indexOf("Overall") : 0;
          const i = idx < 0 ? 0 : idx;
          setCenterText(labels[i] ?? "OEE");
          setCenterValue(series[i] ?? 0);
        },
      },
    },
    stroke: { lineCap: "round" },
    plotOptions: {
      radialBar: {
        hollow: { size: "40%", background: "#ffffff" },
        track: { background: "#f1f5f9", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { fontSize: "13px", color: "#555", fontWeight: "600" },
          value: { fontSize: "18px", color: "#111", fontWeight: "bold", offsetY: 4 },
          total: {
            show: true,
            label: centerText,
            formatter: () => `${centerValue}%`,
            style: { fontSize: "16px", fontWeight: "bold", color: "#111" },
          },
        },
      },
    },
    labels,
    colors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "diagonal2",
        shadeIntensity: 0.3,
        gradientToColors: gradientColors,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    legend: { show: false },
    grid: {
      padding: {
        top: 10,
        bottom: 0,
      },
    },
  }), [labels, colors, gradientColors, centerText, centerValue]);

  return (
    <div className="flex flex-col items-center w-full">
      {overallValue !== null && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Overall OEE
          </span>
          <span className="text-2xl font-bold text-gray-900">{overallValue}%</span>
        </div>
      )}
      <Chart options={options} series={series} type="radialBar" height={height ?? 280} />
      <div className="flex flex-row justify-center gap-6 mt-2 flex-wrap px-2">
        {labels.map((label, i) => {
          if (label === "Overall") return null;
          return (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[i] ?? "#ccc" }}
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">{formatLabel(label)}</span>
              </div>
              <span className="text-sm font-bold text-gray-800">{series[i] ?? 0}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShiftOEEChart;