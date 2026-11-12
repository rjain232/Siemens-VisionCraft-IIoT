const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};

export const SHARE_REPORT_TREE = {
  name: getCurrentDate(),
  type: "year",
  children: [
    {
      name: "Maintenance",
      type: "folder",
      children: [
        { name: "Alarm_Report.pdf", type: "file", fileType: "pdf", url: "#" },
      ]
    },
    {
      name: "OEE",
      type: "folder",
      children: [
        { name: "Overall_OEE.pdf", type: "file", fileType: "pdf", url: "#" },
        { name: "Production Summary - Shift A.pdf", type: "file", fileType: "pdf", url: "#" },
        { name: "Station wise OEE Report With Charts.pdf", type: "file", fileType: "pdf", url: "#" },
      ]
    },
    {
      name: "Production Control",
      type: "folder",
      children: [
        { name: "Shift_Details_-_Area_[All_Areas]_Line_[UB]_Station_[All]_Shift_[All].pdf", type: "file", fileType: "pdf", url: "#" },
      ]
    },
    {
      name: "Robot Monitoring",
      type: "folder",
      children: [
        { name: "Robot_Status_Log.pdf", type: "file", fileType: "pdf", url: "#" },
      ]
    },
    {
      name: "Third Party Data",
      type: "folder",
      children: [
        { name: "Sealant_Camera_Report.pdf", type: "file", fileType: "pdf", url: "#" },
      ]
    }
  ]
};
