/**
 * reportGenerator.js
 *
 * NOTE: The legacy synthetic / generic table generator has been completely removed.
 * All 31 reports now use their native live UI download routines (offscreen execution)
 * to produce 100% authentic, formatted PDF and Excel files.
 *
 * This module retains only the report key mapping helper (`getReportKey`).
 */

export const getReportKey = (fileNameOrKey) => {
  const clean = String(fileNameOrKey || "")
    .replace(/\.(pdf|xlsx)$/i, "")
    .replace(/[-_\s]+/g, "_")
    .trim();

  if (/OEE/i.test(clean)) return "Overall_OEE";
  if (/Production.*Summary/i.test(clean)) return "Production_Summary";
  if (/Alarm.*Report/i.test(clean)) return "Alarm_Report";
  if (/Top.*Alarm/i.test(clean)) return "Top_X_Alarms";
  if (/Losses/i.test(clean)) return "Line_Station_Losses";
  if (/Tip.*Change/i.test(clean)) return "Tip_Change_Count";
  if (/Walking/i.test(clean)) return "Walking_Report";
  if (/Annual/i.test(clean)) return "Annual_Production";
  if (/Bottleneck/i.test(clean)) return "Bottleneck";
  if (/Buffer/i.test(clean)) return "Buffer_Trend";
  if (/Working.*Calendar/i.test(clean)) return "Working_Calendar";
  if (/Detailed.*Production/i.test(clean)) return "Detailed_Production_Count";
  if (/Hourly/i.test(clean)) return "Hourly_Production";
  if (/Line.*Cycle.*Time/i.test(clean)) return "Line_Cycle_Time";
  if (/MTBF/i.test(clean)) return "MTBF_Report";
  if (/MTTR/i.test(clean)) return "MTTR_Report";
  if (/Production.*Overview/i.test(clean)) return "Production_Overview";
  if (/Shift.*Backlog/i.test(clean)) return "Shift_Backlog_Planning";
  if (/Shift.*Summary/i.test(clean)) return "Shift_Summary";
  if (/Station.*Cycle|Cycle.*Time.*Overview|Cycle.*Time.*Losses/i.test(clean)) return "Station_Cycle_Time";
  if (/Spot.*Hit.*Rate/i.test(clean)) return "Robot_Spot_Hit_Rate";
  if (/Robot.*Status/i.test(clean)) return "Robot_Status";
  if (/Energy/i.test(clean)) return "Energy_Consumption";
  if (/Stud.*Result|Individual.*Stud/i.test(clean)) return "Individual_Stud_Result";
  if (/Inline.*Measurement|IMS/i.test(clean)) return "Inline_Measurement_System";
  if (/MIG/i.test(clean)) return "MIG_Welding";
  if (/Nut.*Bolt/i.test(clean)) return "Nut_Bolt_Fastening";
  if (/Sealant/i.test(clean)) return "Sealant_Camera";
  if (/VIN/i.test(clean)) return "VIN_No_Generation";
  if (/Weld.*Data/i.test(clean)) return "Weld_Data";
  if (/Part.*Marriage/i.test(clean)) return "Part_Marriage";

  return clean;
};
