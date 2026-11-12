/**
 * shareReportTree.js
 *
 * Defines the tree of all shareable reports shown on the Share Reports page.
 *
 * IMPORTANT — cachePrefix:
 *   Each file entry has a `cachePrefix` that MUST match the start of the
 *   filename that the individual report component passes to doc.save() or
 *   generateExcel(). The cache-lookup in ShareReport.jsx uses
 *   `startsWith(cachePrefix)` to find the cached blob in IndexedDB.
 *
 *   If you rename a report's export filename, update cachePrefix here too.
 *
 * Actual filenames emitted by each component (verified):
 *   Alarm_Report               → Alarm_Report_<start>_to_<end>.pdf / .xlsx
 *   Line_Station_Losses        → Line_Station_Losses_<start>_to_<end>.pdf / .xlsx
 *   Tip_Change_Count_Report    → Tip_Change_Count_Report.pdf / .xlsx
 *   Top_X_Alarms               → Top_<n>_Alarms_<type>_<start>_to_<end>.pdf / .xlsx
 *   Walking_Report             → Walking_Report_<start>_to_<end>.pdf / .xlsx
 *   OEE_Report                 → OEE_Report_<date>.pdf / OEE_Report.xlsx
 *   Production_Summary         → production-summary-<from>-to-<to>.pdf / Production_Summary_<from>_to_<to>.xlsx
 *   Annual_Production          → Annual_Production_<year>.pdf  (no Excel yet)
 *   Bottleneck                 → Bottleneck_<filters>.pdf / Bottleneck_Report.xlsx (bottleneckDownload.js)
 *   Buffer_Trend               → Buffer_Trend_<area>_<line>.pdf / <filename>.xlsx
 *   Detailed_Production_Count  → Detailed_Production_Count_<from>_to_<to>.pdf / .xlsx
 *   Hourly_Production          → Hourly_Production_<from>_to_<to>.pdf / .xlsx
 *   Line_Cycle_Time            → Line_Cycle_Time_<from>_to_<to>.pdf / .xlsx
 *   MTBF_Report / MTTR_Report  → MTBF_Report_<date>.pdf / MTTR_Report_<date>.pdf
 *   Production_Overview        → Production_Overview_<date>.pdf / .xlsx
 *   Shift_Backlog_Planning     → Shift_Backlog_Planning_<date>.pdf / .xlsx
 *   Shift_Summary_Report       → Shift_Summary_Report_<date>.pdf / Shift_Summary_Report.xlsx
 *   Cycle_Time_Overview        → Cycle_Time_Overview_<from>_to_<to>.pdf / Cycle_Time_Overview.xlsx
 *   Working_Calendar           → <calendar title>.pdf / Working_Calendar.xlsx
 *   Robot_Spot_Hit_Rate_Report → Robot_Spot_Hit_Rate_Report_<date>.pdf / .xlsx
 *   Robot_Status_Report        → Robot_Status_Report_<start>_to_<end>.pdf / .xlsx
 *   Energy_Consumption         → <title>.pdf / <title>.xlsx  (title includes "Energy")
 *   Individual_Stud            → Individual_Stud_<from>_to_<to>.pdf / .xlsx
 *   Inline_Measurement_System  → Inline_Measurement_System_<from>_to_<to>.pdf / .xlsx
 *   MIG_Welding_Report         → MIG_Welding_Report_<from>_to_<to>.pdf / .xlsx
 *   Nut_Bolt_OK_NOK_Result     → Nut_Bolt_OK_NOK_Result_<from>_to_<to>.pdf / .xlsx
 *   Sealant_Camera             → Sealant_Camera_<from>_to_<to>.pdf / .xlsx
 *   VIN_No_Generation_Report   → VIN_No_Generation_Report_<from>_to_<to>.pdf / .xlsx
 *   Weld_Data_Report           → Weld_Data_Report_<from>_to_<to>.pdf / .xlsx
 *   Part_Marriage              → Part_Marriage_<area>_<line>.pdf / Part_Marriage_<...>.xlsx
 */

const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Builds a pair of [pdf, xlsx] file entries for the tree.
 * @param {string} displayName  - Label shown in the UI tree (no extension).
 * @param {string} cachePrefix  - Prefix that the actual cached filename starts with.
 */
const filePair = (displayName, cachePrefix) => [
  {
    name: `${displayName}.pdf`,
    type: "file",
    fileType: "pdf",
    cachePrefix,
    url: "#",
  },
  {
    name: `${displayName}.xlsx`,
    type: "file",
    fileType: "xlsx",
    cachePrefix,
    url: "#",
  },
];

export const SHARE_REPORT_TREE = {
  name: getCurrentDate(),
  type: "year",
  children: [
    {
      name: "Maintenance",
      type: "folder",
      children: [
        ...filePair("Alarm_Report",              "Alarm_Report"),
        ...filePair("Line_Station_Losses",        "Line_Station_Losses"),
        ...filePair("Tip_Change_Count",           "Tip_Change_Count_Report"),
        ...filePair("Top_X_Alarms",              "Top_"),
        ...filePair("Walking_Report",            "Walking_Report"),
      ],
    },
    {
      name: "OEE",
      type: "folder",
      children: [
        ...filePair("Overall_OEE",         "OEE_Report"),
        // Production Summary: PDF prefix differs from Excel prefix
        {
          name: "Production_Summary.pdf",
          type: "file",
          fileType: "pdf",
          cachePrefix: "production-summary",
          url: "#",
        },
        {
          name: "Production_Summary.xlsx",
          type: "file",
          fileType: "xlsx",
          cachePrefix: "Production_Summary",
          url: "#",
        },
      ],
    },
    {
      name: "Production Control",
      type: "folder",
      children: [
        ...filePair("Annual_Production",           "Annual_Production"),
        ...filePair("Bottleneck",                  "Bottleneck"),
        ...filePair("Buffer_Trend",                "Buffer_Trend"),
        // Detailed Production: PDF uses "Detailed_Production_Count_", Excel uses "Detailed_Production_Report"
        {
          name: "Detailed_Production_Count.pdf",
          type: "file",
          fileType: "pdf",
          cachePrefix: "Detailed_Production_Count",
          url: "#",
        },
        {
          name: "Detailed_Production_Count.xlsx",
          type: "file",
          fileType: "xlsx",
          cachePrefix: "Detailed_Production_Report",
          url: "#",
        },
        ...filePair("Hourly_Production",           "Hourly_Production"),
        ...filePair("Line_Cycle_Time",             "Line_Cycle_Time"),
        ...filePair("MTBF_Report",                 "MTBF_Report"),
        ...filePair("MTTR_Report",                 "MTTR_Report"),
        ...filePair("Production_Overview",         "Production_Overview"),
        ...filePair("Shift_Backlog_Planning",      "Shift_Backlog_Planning"),
        ...filePair("Shift_Summary",               "Shift_Summary_Report"),
        // Station Cycle Time: PDF uses "Cycle_Time_Overview_", Excel uses "Cycle_Time_Losses"
        {
          name: "Station_Cycle_Time.pdf",
          type: "file",
          fileType: "pdf",
          cachePrefix: "Cycle_Time_Overview",
          url: "#",
        },
        {
          name: "Station_Cycle_Time.xlsx",
          type: "file",
          fileType: "xlsx",
          cachePrefix: "Cycle_Time_Overview",
          url: "#",
        },
      ],
    },
    {
      name: "Robot Monitoring",
      type: "folder",
      children: [
        ...filePair("Robot_Spot_Hit_Rate", "Robot_Spot_Hit_Rate_Report"),
        ...filePair("Robot_Status",        "Robot_Status_Report"),
      ],
    },
    {
      name: "Third Party Data",
      type: "folder",
      children: [
        ...filePair("Energy_Consumption",        "Energy_Consumption"),
        ...filePair("Individual_Stud_Result",    "Individual_Stud"),
        ...filePair("Inline_Measurement_System", "Inline_Measurement_System"),
        ...filePair("MIG_Welding",               "MIG_Welding_Report"),
        ...filePair("Nut_Bolt_Fastening",        "Nut_Bolt_OK_NOK_Result"),
        ...filePair("Sealant_Camera",            "Sealant_Camera"),
        ...filePair("VIN_No_Generation",         "VIN_No_Generation_Report"),
        ...filePair("Weld_Data",                 "Weld_Data_Report"),
      ],
    },
    {
      name: "Operations",
      type: "folder",
      children: [
        ...filePair("Part_Marriage", "Part_Marriage"),
      ],
    },
  ],
};
