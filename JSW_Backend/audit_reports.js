const fs = require("fs");
const path = require("path");

const components = {
  Overall_OEE: "src/pages/production/oee/components/OverallOEE.jsx",
  Production_Summary: "src/pages/production/oee/components/ProductionSummary.jsx",
  Hourly_Production: "src/pages/production/production-control/components/HourlyProductionReport.jsx",
  Robot_Spot_Hit_Rate: "src/pages/production/robot-monitoring/components/RobotSpotHitRateReport.jsx",
  Alarm_Report: "src/pages/maintenance/components/AlarmReport.jsx",
  Line_Station_Losses: "src/pages/maintenance/components/LineStationLossesAnalysis.jsx",
  Tip_Change_Count: "src/pages/maintenance/components/TipChangeCount.jsx",
  Top_X_Alarms: "src/pages/maintenance/components/TopXAlarms.jsx",
  Walking_Report: "src/pages/maintenance/components/WalkingReport.jsx",
  Detailed_Production_Count: "src/pages/production/production-control/components/DetailedProductionCountReport.jsx",
  Line_Cycle_Time: "src/pages/production/production-control/components/LineCycleTime.jsx",
  MTBF_Report: "src/pages/production/production-control/components/MTBFMTTR.jsx",
  MTTR_Report: "src/pages/production/production-control/components/MTBFMTTR.jsx",
  Production_Overview: "src/pages/production/production-control/components/ProductionOverview.jsx",
  Shift_Backlog_Planning: "src/pages/production/production-control/components/ShiftBacklogPlanning.jsx",
  Shift_Summary: "src/pages/production/production-control/components/ShiftSummaryReport.jsx",
  Station_Cycle_Time: "src/pages/production/production-control/components/StationCycleTime.jsx",
  Annual_Production: "src/pages/production/production-control/components/AnnualGraph.jsx",
  Bottleneck: "src/pages/production/production-control/components/Bottleneck.jsx",
  Buffer_Trend: "src/pages/production/production-control/components/BufferTrend.jsx",
  Working_Calendar: "src/pages/production/production-control/components/WorkingCalendar.jsx",
  Robot_Status: "src/pages/production/robot-monitoring/components/RobotStatus.jsx",
  Energy_Consumption: "src/pages/third-party-data/components/EnergyConsumption.jsx",
  Individual_Stud_Result: "src/pages/third-party-data/components/IndividualStudResult.jsx",
  Inline_Measurement_System: "src/pages/third-party-data/components/InlineMeasurementSystem.jsx",
  MIG_Welding: "src/pages/third-party-data/components/MIGWeldingReport.jsx",
  Nut_Bolt_Fastening: "src/pages/third-party-data/components/NutBoltFasteningReport.jsx",
  Sealant_Camera: "src/pages/third-party-data/components/SealantCameraResult.jsx",
  VIN_No_Generation: "src/pages/third-party-data/components/VINGenerationReport.jsx",
  Weld_Data: "src/pages/third-party-data/components/WeldData.jsx",
  Part_Marriage: "src/pages/part-marriage/components/PartMarriage.jsx",
};

const baseDir = "c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_UI";
const results = [];

for (const [key, relPath] of Object.entries(components)) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    results.push({ key, error: "FILE NOT FOUND: " + fullPath });
    continue;
  }
  const code = fs.readFileSync(fullPath, "utf8");
  const hasBgContext = code.includes("useBackgroundExport") || code.includes("backgroundMode");
  const hasBgAutoTrigger = (/isBg/.test(code) || /bgContext/.test(code)) && (code.includes("handleDownload") || code.includes("download") || code.includes("export"));
  const hasReportNameProp = code.includes("reportName=");
  const hasPdfDownload = code.includes(".save(") || code.includes("downloadPdf") || code.includes("downloadPDF") || code.includes("generatePDF") || code.includes("downloadBottleneckPdf");
  const hasExcelDownload = code.includes("generateExcel") || code.includes("downloadExcel") || code.includes("exportExcel") || code.includes("exportToExcel") || code.includes("xlsx") || code.includes("downloadBottleneckExcel");

  results.push({
    key,
    file: path.basename(relPath),
    hasBgContext,
    hasBgAutoTrigger,
    hasReportNameProp,
    hasPdfDownload,
    hasExcelDownload,
  });
}

console.log(JSON.stringify(results, null, 2));
