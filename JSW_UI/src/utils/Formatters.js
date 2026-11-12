import { format } from "date-fns";

export const formatDate = (inputDate) => {
  if (!inputDate) return "";
  try {
    return format(inputDate, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid date";
  }
};

export const formatStationName = (stationName) => {
  if (!stationName) return "";
  // Remove underscores completely (no spaces)
  return stationName.replace(/_/g, "");
};

export const formatRobotName = (robotName) => {
  if (!robotName) return "";
  // Remove underscores completely (no spaces)
  return robotName.replace(/_/g, "");
};

export const formatSubStationName = (subStationName) => {
  if (!subStationName) return "";
  // Remove underscores completely (no spaces)
  return subStationName.replace(/_/g, "");
};

export const formatClusterName = (cluster) => {
  if (!cluster) return "";
  if (cluster === "All") return "All Areas";
  const match = cluster.match(/cluster(\d+)/i);
  return match ? `Cluster ${match[1].padStart(2, "0")}` : cluster;
};
