// components/productionOverviewComp/ShiftwiseProductionGraph.jsx
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const ShiftwiseProductionGraph = ({ data }) => {
  const categories = data?.map((item) => item.date) ?? [];

  const series = [
    {
      name: "Shift A",
      type: "bar",
      data: data?.map((item) => item.Shift_A ?? 0) ?? [80, 100, 90],
    },
    {
      name: "Shift B",
      type: "bar",
      data: data?.map((item) => item.Shift_B ?? 0) ?? [60, 105, 85],
    },
    {
      name: "Shift C",
      type: "bar",
      data: data?.map((item) => item.Shift_C ?? 0) ?? [40, 55, 65],
    },
    {
      name: "Target",
      type: "line",
      // FIX: was returning [60,50,60] for every item — now correctly maps per item
      data: data?.map((item) => {
        const t = (item.Target_A ?? 0) + (item.Target_B ?? 0) + (item.Target_C ?? 0);
        return t > 0 ? t : 130;
      }) ?? [],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 400,
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      width: [0, 0, 0, 3],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "center",
          hideOverflowingLabels: false,
          orientation: "horizontal",
        },
      },
    },
    xaxis: {
      categories,
      title: { text: "Date" },
      labels: {
        rotate: -45,
        style: {
          fontSize: "11px",
          colors: "#44403b",
          fontWeight: 550,
        },
      },
    },
    yaxis: {
      title: { text: "Production Count" },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 0,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      style: {
        fontSize: "11px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      background: { enabled: false },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: [
      "#7c3aed", // Shift A
      "#a78bfa", // Shift B
      "#c4b5fd", // Shift C
      "#000000", // Target line
    ],
    markers: { size: 5 },
  };

  return <Chart options={options} series={series} type="line" height={300} />;
};

ShiftwiseProductionGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      Shift_A: PropTypes.number,
      Shift_B: PropTypes.number,
      Shift_C: PropTypes.number,
      Target_A: PropTypes.number,
      Target_B: PropTypes.number,
      Target_C: PropTypes.number,
    })
  ),
};

export default ShiftwiseProductionGraph;