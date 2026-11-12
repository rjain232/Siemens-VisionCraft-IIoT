import React, { useState, useEffect, lazy, Suspense } from "react";
import { subscriptionApi, reportsApi } from "../../services/api";
import { blobToBase64 } from "../../utils/reportExportCache";
import { BackgroundExportContext } from "../../context/BackgroundExportContext";
import { setBackgroundExportActive } from "../../utils/backgroundExportInterceptor";
import { getReportKey } from "../../utils/reportGenerator";

const REPORT_COMPONENTS = {
  Overall_OEE: lazy(() => import("../../pages/production/oee/components/OverallOEE.jsx")),
  Production_Summary: lazy(() => import("../../pages/production/oee/components/ProductionSummary.jsx")),
  Hourly_Production: lazy(() => import("../../pages/production/production-control/components/HourlyProductionReport.jsx")),
  Robot_Spot_Hit_Rate: lazy(() => import("../../pages/production/robot-monitoring/components/RobotSpotHitRateReport.jsx")),
  Alarm_Report: lazy(() => import("../../pages/maintenance/components/AlarmReport.jsx")),
  Line_Station_Losses: lazy(() => import("../../pages/maintenance/components/LineStationLossesAnalysis.jsx")),
  Tip_Change_Count: lazy(() => import("../../pages/maintenance/components/TipChangeCount.jsx")),
  Top_X_Alarms: lazy(() => import("../../pages/maintenance/components/TopXAlarms.jsx")),
  Walking_Report: lazy(() => import("../../pages/maintenance/components/WalkingReport.jsx")),
  Detailed_Production_Count: lazy(() => import("../../pages/production/production-control/components/DetailedProductionCountReport.jsx")),
  Line_Cycle_Time: lazy(() => import("../../pages/production/production-control/components/LineCycleTime.jsx")),
  MTBF_Report: lazy(() => import("../../pages/production/production-control/components/MTBFMTTR.jsx")),
  MTTR_Report: lazy(() => import("../../pages/production/production-control/components/MTBFMTTR.jsx")),
  Production_Overview: lazy(() => import("../../pages/production/production-control/components/ProductionOverview.jsx")),
  Shift_Backlog_Planning: lazy(() => import("../../pages/production/production-control/components/ShiftBacklogPlanning.jsx")),
  Shift_Summary: lazy(() => import("../../pages/production/production-control/components/ShiftSummaryReport.jsx")),
  Station_Cycle_Time: lazy(() => import("../../pages/production/production-control/components/StationCycleTime.jsx")),
  Annual_Production: lazy(() => import("../../pages/production/production-control/components/AnnualGraph.jsx")),
  Bottleneck: lazy(() => import("../../pages/production/production-control/components/Bottleneck.jsx")),
  Buffer_Trend: lazy(() => import("../../pages/production/production-control/components/BufferTrend.jsx")),
  Working_Calendar: lazy(() => import("../../pages/production/production-control/components/WorkingCalendar.jsx")),
  Robot_Status: lazy(() => import("../../pages/production/robot-monitoring/components/RobotStatus.jsx")),
  Energy_Consumption: lazy(() => import("../../pages/third-party-data/components/EnergyConsumption.jsx")),
  Individual_Stud_Result: lazy(() => import("../../pages/third-party-data/components/IndividualStudResult.jsx")),
  Inline_Measurement_System: lazy(() => import("../../pages/third-party-data/components/InlineMeasurementSystem.jsx")),
  MIG_Welding: lazy(() => import("../../pages/third-party-data/components/MIGWeldingReport.jsx")),
  Nut_Bolt_Fastening: lazy(() => import("../../pages/third-party-data/components/NutBoltFasteningReport.jsx")),
  Sealant_Camera: lazy(() => import("../../pages/third-party-data/components/SealantCameraResult.jsx")),
  VIN_No_Generation: lazy(() => import("../../pages/third-party-data/components/VINGenerationReport.jsx")),
  Weld_Data: lazy(() => import("../../pages/third-party-data/components/WeldData.jsx")),
  Part_Marriage: lazy(() => import("../../pages/part-marriage/components/PartMarriage.jsx")),
  Robot__Spot__Hit__Rate: lazy(() => import("../../pages/production/robot-monitoring/components/RobotSpotHitRateReport.jsx")),
};

// A helper to determine if a report is due based on LastSentAt and Cadence
export const isSubscriptionDue = (sub) => {
  if (sub.status?.toLowerCase() !== "active" && !sub.isActive) return false;
  if (!sub.cadence) return false;
  if (!sub.lastSentAt) return true;

  const now = new Date();
  const lastSent = new Date(sub.lastSentAt);
  const cadence = sub.cadence.toLowerCase().replace(/\s+/g, "");

  if (cadence === "hourly") {
    // Top of the hour check. Did the hour or date change?
    return (now.getHours() !== lastSent.getHours()) || (now.getDate() !== lastSent.getDate()) || (now.getMonth() !== lastSent.getMonth());
  }

  if (cadence === "shiftwise") {
    // Shifts: 06:00, 14:00, 22:00
    const getShiftStart = (d) => {
      const hours = d.getHours();
      const start = new Date(d);
      start.setMinutes(0, 0, 0);
      if (hours >= 6 && hours < 14) start.setHours(6);
      else if (hours >= 14 && hours < 22) start.setHours(14);
      else {
        if (hours < 6) start.setDate(start.getDate() - 1);
        start.setHours(22);
      }
      return start.getTime();
    };
    return getShiftStart(now) > getShiftStart(lastSent);
  }

  if (cadence === "daily") {
    // Daily at 07:00 AM
    const getDailyStart = (d) => {
      const start = new Date(d);
      if (start.getHours() < 7) start.setDate(start.getDate() - 1);
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getDailyStart(now) > getDailyStart(lastSent);
  }

  if (cadence === "weekly") {
    // Weekly on Monday at 07:00 AM
    const getWeeklyStart = (d) => {
      const start = new Date(d);
      const day = start.getDay() || 7; // 1-7 (Mon-Sun)
      if (day === 1 && start.getHours() < 7) {
        start.setDate(start.getDate() - 7); 
      } else {
        start.setDate(start.getDate() - (day - 1));
      }
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getWeeklyStart(now) > getWeeklyStart(lastSent);
  }

  if (cadence === "monthly") {
    // Monthly on the 1st at 07:00 AM
    const getMonthlyStart = (d) => {
      const start = new Date(d);
      if (start.getDate() === 1 && start.getHours() < 7) {
        start.setMonth(start.getMonth() - 1);
      }
      start.setDate(1);
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getMonthlyStart(now) > getMonthlyStart(lastSent);
  }

  return false;
};

const computeCadenceDateRange = (cadenceType) => {
  const end = new Date();
  const start = new Date(end);
  switch (cadenceType?.toLowerCase().replace(/\s+/g, "")) {
    case "hourly": start.setHours(start.getHours() - 1); break;
    case "shiftwise": start.setHours(start.getHours() - 8); break;
    case "daily": start.setDate(start.getDate() - 1); break;
    case "weekly": start.setDate(start.getDate() - 7); break;
    case "monthly": start.setMonth(start.getMonth() - 1); break;
    default: start.setDate(start.getDate() - 1); break;
  }
  const f = (d) => d.toISOString().split("T")[0];
  return { start: f(start), end: f(end) };
};

export default function GlobalCadenceRunner() {
  const [activeBackgroundReport, setActiveBackgroundReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Run the cadence check every 5 minutes
    const interval = setInterval(checkCadences, 5 * 60 * 1000);
    // Initial check after 10 seconds to allow app load
    const initialTimer = setTimeout(checkCadences, 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [isProcessing]);

  const checkCadences = async () => {
    if (isProcessing) return; // Prevent overlapping runs
    
    try {
      const resp = await subscriptionApi.getAll();
      if (!resp.success || !resp.data) return;
      
      const subscriptions = resp.data;
      const dueSubscriptions = subscriptions.filter(isSubscriptionDue);
      
      if (dueSubscriptions.length > 0) {
        setIsProcessing(true);
        for (const sub of dueSubscriptions) {
          await processSubscription(sub);
        }
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("[GlobalCadenceRunner] Error checking cadences:", err);
      setIsProcessing(false);
    }
  };

  const processSubscription = async (sub) => {
    console.log(`[GlobalCadenceRunner] Processing automated dispatch for ${sub.email} (${sub.cadence})`);
    
    const reportsList = Array.isArray(sub.reports) ? sub.reports : [sub.reports].filter(Boolean);
    if (reportsList.length === 0) return;

    const subDateRange = computeCadenceDateRange(sub.cadence);
    const filesToSend = [];
    const missingReports = [];

    for (let i = 0; i < reportsList.length; i++) {
      const rawKey = reportsList[i];
      const repKey = getReportKey(String(rawKey || "").replace(/_{2,}/g, "_"));
      const filtersForRep = sub.reportFilters?.[repKey] || sub.reportFilters?.[rawKey] || {};
      
      const formats = String(sub.formats || "Both").toLowerCase();
      const wantsPdf = formats.includes("both") || formats.includes("pdf") || !formats;
      const wantsExcel = formats.includes("both") || formats.includes("excel") || !formats;
      const targetTypes = new Set([
        ...(wantsPdf ? ["pdf"] : []),
        ...(wantsExcel ? ["xlsx"] : []),
      ]);

      try {
        const result = await generateReportViaBackgroundTab(repKey, subDateRange, sub.cadence, targetTypes, filtersForRep);
        
        if (wantsPdf) {
          if (result?.pdf?.blob) {
            filesToSend.push({ name: result.pdf.name, fileType: "pdf", blob: result.pdf.blob });
          } else {
            missingReports.push(`${repKey} (PDF)`);
          }
        }
        
        if (wantsExcel) {
          if (result?.excel?.blob) {
            filesToSend.push({ name: result.excel.name, fileType: "xlsx", blob: result.excel.blob });
          } else {
            missingReports.push(`${repKey} (Excel)`);
          }
        }
      } catch (err) {
        console.error(`[GlobalCadenceRunner] Failed to generate ${repKey}:`, err);
        missingReports.push(`${repKey} (Failed to generate)`);
      }
    }

    if (filesToSend.length > 0) {
      try {
        const filesWithBase64 = await Promise.all(
          filesToSend.map(async (file) => ({
            name: file.name.replace(/_{2,}/g, "_"),
            fileType: file.fileType,
            contentBase64: await blobToBase64(file.blob),
          }))
        );

        await reportsApi.shareByEmail({
          email: sub.email,
          cadence: [sub.cadence],
          dateRange: subDateRange,
          files: filesWithBase64,
          filters: sub.reportFilters || {},
          missingReports: missingReports,
        });
        
        await subscriptionApi.recordSuccess(sub.id);
        console.log(`[GlobalCadenceRunner] Successfully sent and recorded cadence for ${sub.email}`);
      } catch (err) {
        console.error(`[GlobalCadenceRunner] Email dispatch failed for ${sub.email}:`, err);
      }
    } else {
      console.warn(`[GlobalCadenceRunner] No files generated for ${sub.email}, skipping dispatch.`);
    }
  };

  const generateReportViaBackgroundTab = async (reportKey, targetDateRange, targetCadence, targetFileTypes, targetFilters) => {
    const cleanKey = String(reportKey || "").replace(/_{2,}/g, "_").trim();
    const normalizedKey = getReportKey(cleanKey);
    const Component = REPORT_COMPONENTS[normalizedKey] || REPORT_COMPONENTS[cleanKey] || REPORT_COMPONENTS[reportKey];
    
    if (!Component) {
      console.warn(`[GlobalCadenceRunner] Component not found for key: "${reportKey}"`);
      return null;
    }

    return new Promise((resolve) => {
      let capturedPdf = null;
      let capturedExcel = null;
      let resolved = false;
      let graceTimer = null;

      const finish = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutTimer);
        if (graceTimer) clearTimeout(graceTimer);
        setBackgroundExportActive(false);
        setActiveBackgroundReport(null);
        resolve({ pdf: capturedPdf, excel: capturedExcel });
      };

      const timeoutTimer = setTimeout(() => {
        if (!resolved) {
          console.warn(`[GlobalCadenceRunner] Timeout reached for ${normalizedKey}`);
          finish();
        }
      }, 90000);

      const onFileCaptured = (filename, blob) => {
        const lower = filename.toLowerCase();
        if (lower.endsWith(".pdf")) {
          capturedPdf = { name: filename, blob };
        } else if (lower.endsWith(".xlsx")) {
          capturedExcel = { name: filename, blob };
        }

        const wantsPdf = targetFileTypes.has("pdf");
        const wantsExcel = targetFileTypes.has("xlsx");
        const gotPdf = !!capturedPdf;
        const gotExcel = !!capturedExcel;

        if ((!wantsPdf || gotPdf) && (!wantsExcel || gotExcel)) {
          if (graceTimer) clearTimeout(graceTimer);
          setTimeout(finish, 150);
          return;
        }

        if (!graceTimer) {
          graceTimer = setTimeout(() => {
            console.warn(`[GlobalCadenceRunner] Grace period elapsed for second format in ${normalizedKey}`);
            finish();
          }, 25000);
        }
      };

      setBackgroundExportActive(true, normalizedKey, onFileCaptured);
      setActiveBackgroundReport({
        Component,
        reportKey: normalizedKey,
        dateRange: targetDateRange,
        cadence: targetCadence,
        fileTypes: targetFileTypes,
        filters: targetFilters || {},
        onFileCaptured,
      });
    });
  };

  return (
    <div id="global-cadence-runner" style={{ position: "fixed", top: 0, left: 0, width: "1920px", height: "1080px", opacity: 0.01, pointerEvents: "none", zIndex: -9999, overflow: "hidden" }}>
      {activeBackgroundReport && (
        <BackgroundExportContext.Provider
          value={{
            isBackgroundExport: true,
            isBackground: true,
            reportKey: activeBackgroundReport.reportKey,
            dateRange: activeBackgroundReport.dateRange,
            cadence: activeBackgroundReport.cadence,
            targetFileTypes: activeBackgroundReport.fileTypes,
            onFileCaptured: activeBackgroundReport.onFileCaptured,
            filters: activeBackgroundReport.filters,
          }}
        >
          <Suspense fallback={null}>
            <activeBackgroundReport.Component />
          </Suspense>
        </BackgroundExportContext.Provider>
      )}
    </div>
  );
}
