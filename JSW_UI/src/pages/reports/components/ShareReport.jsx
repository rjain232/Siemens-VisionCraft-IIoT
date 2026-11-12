import { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react";
import { reportsApi, masterApi, robotApi } from "../../../services/api";
import { formatClusterName } from "../../../utils/Formatters";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Download,
  Share2,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Users,
} from "lucide-react";
import { SHARE_REPORT_TREE } from "../../../utils/shareReportTree";
import ReportSubscriptionManager from "./ReportSubscriptionManager";
import {
  blobToBase64,
  cacheReportFile,
  getCachedReportFile,
  listCachedReportFiles,
} from "../../../utils/reportExportCache";
import { getReportKey } from "../../../utils/reportGenerator";
import { setBackgroundExportActive } from "../../../utils/backgroundExportInterceptor";
import { BackgroundExportContext } from "../../../context/BackgroundExportContext";
import DateRangeBar from "../../../sharedComponents/DateRangeBar";
import {
  getCurrentShift,
  getConcludedShift,
  getShiftTimeWindow,
  getShiftOptionsWithActive,
} from "../../../utils/shiftUtils";

const REPORT_COMPONENTS = {
  Overall_OEE: lazy(() => import("../../production/oee/components/OverallOEE.jsx")),
  Production_Summary: lazy(() => import("../../production/oee/components/ProductionSummary.jsx")),
  Hourly_Production: lazy(() => import("../../production/production-control/components/HourlyProductionReport.jsx")),
  Robot_Spot_Hit_Rate: lazy(() => import("../../production/robot-monitoring/components/RobotSpotHitRateReport.jsx")),
  Alarm_Report: lazy(() => import("../../maintenance/components/AlarmReport.jsx")),
  Line_Station_Losses: lazy(() => import("../../maintenance/components/LineStationLossesAnalysis.jsx")),
  Tip_Change_Count: lazy(() => import("../../maintenance/components/TipChangeCount.jsx")),
  Top_X_Alarms: lazy(() => import("../../maintenance/components/TopXAlarms.jsx")),
  Walking_Report: lazy(() => import("../../maintenance/components/WalkingReport.jsx")),
  Detailed_Production_Count: lazy(() => import("../../production/production-control/components/DetailedProductionCountReport.jsx")),
  Line_Cycle_Time: lazy(() => import("../../production/production-control/components/LineCycleTime.jsx")),
  MTBF_Report: lazy(() => import("../../production/production-control/components/MTBFMTTR.jsx")),
  MTTR_Report: lazy(() => import("../../production/production-control/components/MTBFMTTR.jsx")),
  Production_Overview: lazy(() => import("../../production/production-control/components/ProductionOverview.jsx")),
  Shift_Backlog_Planning: lazy(() => import("../../production/production-control/components/ShiftBacklogPlanning.jsx")),
  Shift_Summary: lazy(() => import("../../production/production-control/components/ShiftSummaryReport.jsx")),
  Station_Cycle_Time: lazy(() => import("../../production/production-control/components/StationCycleTime.jsx")),
  Annual_Production: lazy(() => import("../../production/production-control/components/AnnualGraph.jsx")),
  Bottleneck: lazy(() => import("../../production/production-control/components/Bottleneck.jsx")),
  Buffer_Trend: lazy(() => import("../../production/production-control/components/BufferTrend.jsx")),
  Working_Calendar: lazy(() => import("../../production/production-control/components/WorkingCalendar.jsx")),
  Robot_Status: lazy(() => import("../../production/robot-monitoring/components/RobotStatus.jsx")),
  Energy_Consumption: lazy(() => import("../../third-party-data/components/EnergyConsumption.jsx")),
  Individual_Stud_Result: lazy(() => import("../../third-party-data/components/IndividualStudResult.jsx")),
  Inline_Measurement_System: lazy(() => import("../../third-party-data/components/InlineMeasurementSystem.jsx")),
  MIG_Welding: lazy(() => import("../../third-party-data/components/MIGWeldingReport.jsx")),
  Nut_Bolt_Fastening: lazy(() => import("../../third-party-data/components/NutBoltFasteningReport.jsx")),
  Sealant_Camera: lazy(() => import("../../third-party-data/components/SealantCameraResult.jsx")),
  VIN_No_Generation: lazy(() => import("../../third-party-data/components/VINGenerationReport.jsx")),
  Weld_Data: lazy(() => import("../../third-party-data/components/WeldData.jsx")),
  Part_Marriage: lazy(() => import("../../part-marriage/components/PartMarriage.jsx")),
  Robot__Spot__Hit__Rate: lazy(() => import("../../production/robot-monitoring/components/RobotSpotHitRateReport.jsx")),
};

const REPORT_FILTER_CAPABILITIES = {
  Overall_OEE: ["area", "line", "station", "shift"],
  Production_Summary: ["shift"],
  Hourly_Production: ["area", "line", "shift", "model"],
  Detailed_Production_Count: ["area", "line", "shift", "model"],
  Robot_Spot_Hit_Rate: ["line", "station", "robot", "gun"],
  Robot_Status: ["area", "line", "station", "robot"],
  Tip_Change_Count: ["area", "line", "station", "robot", "shift"],
  Alarm_Report: ["area", "line", "station", "substation", "shift"],
  Top_X_Alarms: ["area", "line", "station", "substation"],
  Line_Station_Losses: ["area", "line", "station", "shift"],
  Walking_Report: ["area", "line", "station"],
  Line_Cycle_Time: ["area", "line", "shift", "model"],
  Station_Cycle_Time: ["area", "line", "station", "substation", "shift", "model"],
  MTBF_Report: ["area", "line", "station"],
  MTTR_Report: ["area", "line", "station"],
  Production_Overview: ["area", "line", "shift"],
  Shift_Backlog_Planning: ["area", "line", "shift"],
  Shift_Summary: ["area", "line", "shift"],
  Annual_Production: ["area", "line"],
  Bottleneck: ["area", "line"],
  Buffer_Trend: ["area", "line"],
  Working_Calendar: [],
  Energy_Consumption: ["area", "line"],
  Individual_Stud_Result: ["area", "line", "station"],
  Inline_Measurement_System: ["area", "line", "station"],
  MIG_Welding: ["area", "line", "station", "shift"],
  Nut_Bolt_Fastening: ["area", "line", "station", "shift"],
  Sealant_Camera: ["area", "line", "station"],
  VIN_No_Generation: ["area", "line", "station"],
  Weld_Data: ["area", "line", "station", "substation", "shift"],
  Part_Marriage: ["area", "line"],
};

const ALL_CADENCE_OPTIONS = [
  { value: "Immediate Share", label: "Immediate Share (Now)" },
  { value: "Hourly", label: "Hourly" },
  { value: "Shift wise", label: "Shift wise" },
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Annual / Yearly", label: "Annual / Yearly" },
];

const REPORT_CADENCE_CAPABILITIES = {
  // Maintenance Reports
  Alarm_Report: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Line_Station_Losses: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Tip_Change_Count: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Top_X_Alarms: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Walking_Report: ["Immediate Share", "Shift wise", "Daily", "Weekly"],

  // OEE Reports
  Overall_OEE: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly", "Annual / Yearly"],
  Production_Summary: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],

  // Production Control Reports
  Annual_Production: ["Immediate Share", "Monthly", "Annual / Yearly"],
  Bottleneck: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Buffer_Trend: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Detailed_Production_Count: ["Immediate Share", "Hourly", "Shift wise", "Daily", "Weekly", "Monthly"],
  Hourly_Production: ["Immediate Share", "Hourly", "Shift wise", "Daily"],
  Line_Cycle_Time: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Station_Cycle_Time: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  MTBF_Report: ["Immediate Share", "Daily", "Weekly", "Monthly", "Annual / Yearly"],
  MTTR_Report: ["Immediate Share", "Daily", "Weekly", "Monthly", "Annual / Yearly"],
  Production_Overview: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Shift_Backlog_Planning: ["Immediate Share", "Shift wise", "Daily"],
  Shift_Summary: ["Immediate Share", "Shift wise", "Daily"],
  Working_Calendar: ["Immediate Share", "Monthly", "Annual / Yearly"],

  // Robot Monitoring Reports
  Robot_Spot_Hit_Rate: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
  Robot_Status: ["Immediate Share", "Shift wise", "Daily", "Weekly"],

  // Third Party Data Reports
  Energy_Consumption: ["Immediate Share", "Daily", "Weekly", "Monthly", "Annual / Yearly"],
  Individual_Stud_Result: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Inline_Measurement_System: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  MIG_Welding: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Nut_Bolt_Fastening: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Sealant_Camera: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  VIN_No_Generation: ["Immediate Share", "Shift wise", "Daily", "Weekly"],
  Weld_Data: ["Immediate Share", "Shift wise", "Daily", "Weekly"],

  // Part Marriage
  Part_Marriage: ["Immediate Share", "Shift wise", "Daily", "Weekly", "Monthly"],
};

const normalizeCadenceValue = (val) => {
  if (!val) return "Immediate Share";
  const s = String(val).toLowerCase().trim();
  if (s === "immediate share" || s === "immediate") return "Immediate Share";
  if (s === "hourly") return "Hourly";
  if (s === "shiftwise" || s === "shift wise") return "Shift wise";
  if (s === "daily") return "Daily";
  if (s === "weekly") return "Weekly";
  if (s === "monthly") return "Monthly";
  if (s.includes("annual") || s.includes("yearly")) return "Annual / Yearly";
  return val;
};

const computeCadenceDateRange = (cadenceType, baseRange) => {
  // If the user has explicitly selected a valid date range, ALWAYS preserve and prioritize it
  if (baseRange && baseRange.start && baseRange.end) {
    return baseRange;
  }

  const end = new Date();
  const start = new Date(end);
  const primaryCadence = Array.isArray(cadenceType) ? (cadenceType[0] || "") : (cadenceType || "");
  const s = String(primaryCadence).toLowerCase().trim();

  if (s.includes("hourly")) {
    start.setHours(start.getHours() - 1);
  } else if (s.includes("shift")) {
    start.setHours(start.getHours() - 8);
  } else if (s.includes("week")) {
    start.setDate(start.getDate() - 7);
  } else if (s.includes("month")) {
    start.setMonth(start.getMonth() - 1);
  } else if (s.includes("quarter")) {
    start.setMonth(start.getMonth() - 3);
  } else if (s.includes("year") || s.includes("annual")) {
    start.setFullYear(start.getFullYear() - 1);
  } else {
    // Default fallback (Daily)
    start.setDate(start.getDate() - 1);
  }

  const f = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  return { start: f(start), end: f(end) };
};

const today = new Date().toISOString().split("T")[0];

// ─── Helpers ────────────────────────────────────────────────────────────────

const flattenFiles = (node) =>
  node.children?.flatMap((child) =>
    child.type === "file" ? [child] : flattenFiles(child),
  ) ?? [];

const reportFiles = flattenFiles(SHARE_REPORT_TREE);

/**
 * When a user selects one file (pdf OR xlsx), also auto-select its pair
 * (xlsx OR pdf) from the same report, so both formats are always included.
 */
const getReportPair = (file) => {
  const baseName = file.name.replace(/\.(pdf|xlsx)$/i, "").replace(/_{2,}/g, "_");
  return reportFiles.filter(
    (candidate) => candidate.name.replace(/\.(pdf|xlsx)$/i, "") === baseName,
  );
};

const normalizeSelectedFiles = (files) => {
  const normalized = [];
  files.forEach((file) => {
    // Sanitize any double underscores
    const sanitizedFile = {
      ...file,
      name: file.name.replace(/_{2,}/g, "_"),
    };
    getReportPair(sanitizedFile).forEach((pairedFile) => {
      if (!normalized.some((s) => s.name === pairedFile.name)) {
        normalized.push(pairedFile);
      }
    });
  });
  return normalized;
};

// ─── Component ──────────────────────────────────────────────────────────────

const ShareReport = () => {
  const [expandedNodes, setExpandedNodes] = useState({});
  // Initialize with empty array so that page / UI refreshes start with unselected reports
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const isCancelledRef = useRef(false);

  // Clear any old persisted report selections in sessionStorage on mount
  useEffect(() => {
    try {
      sessionStorage.removeItem("shareReportSelectedFiles");
    } catch {
      // ignore
    }
  }, []);

  const [email, setEmail] = useState(() => {
    try {
      return (
        localStorage.getItem("jsw_last_report_recipient_email") ||
        sessionStorage.getItem("shareReportEmail") ||
        ""
      );
    } catch {
      return "";
    }
  });
  const [cadence, setCadence] = useState(() => {
    try {
      const stored = sessionStorage.getItem("shareReportCadence");
      if (stored) {
        let parsed = stored;
        if (stored.startsWith("[")) {
          parsed = JSON.parse(stored);
        }
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        return arr.filter(Boolean);
      }
      return [];
    } catch {
      return [];
    }
  });
  const [emailStatus, setEmailStatus] = useState(null); // null | "success" | "error"
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState("");
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [activeBackgroundReport, setActiveBackgroundReport] = useState(null);

  const handleCloseModal = () => {
    if (isSending) {
      isCancelledRef.current = true;
      setBackgroundExportActive(false);
      setActiveBackgroundReport(null);
      setIsSending(false);
      setSendProgress("");
    }
    setShowShareModal(false);
  };
  const [dateRange, setDateRange] = useState(() => {
    try {
      return (
        JSON.parse(sessionStorage.getItem("shareReportDateRange")) || {
          start: today,
          end: today,
        }
      );
    } catch {
      return { start: today, end: today };
    }
  });

  const [activeTab, setActiveTab] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportActiveTab") || "quickShare";
    } catch {
      return "quickShare";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("shareReportActiveTab", activeTab);
    } catch {
      // ignore
    }
  }, [activeTab]);

  const [masterClusters, setMasterClusters] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedArea") || "";
    } catch {
      return "";
    }
  });
  const [selectedLine, setSelectedLine] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedLine") || "";
    } catch {
      return "";
    }
  });
  const [selectedStation, setSelectedStation] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedStation") || "All";
    } catch {
      return "All";
    }
  });
  const [selectedSubStation, setSelectedSubStation] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedSubStation") || "All";
    } catch {
      return "All";
    }
  });
  const [selectedRobot, setSelectedRobot] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedRobot") || "All";
    } catch {
      return "All";
    }
  });
  const [selectedGun, setSelectedGun] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedGun") || "All";
    } catch {
      return "All";
    }
  });
  const [selectedShift, setSelectedShift] = useState(() => {
    try {
      const stored = sessionStorage.getItem("shareReportSelectedShift");
      if (stored) return stored;
      return getCurrentShift();
    } catch {
      return getCurrentShift();
    }
  });
  const [selectedModel, setSelectedModel] = useState(() => {
    try {
      return sessionStorage.getItem("shareReportSelectedModel") || "All";
    } catch {
      return "All";
    }
  });

  const [robotList, setRobotList] = useState([]);
  const [robotsLoading, setRobotsLoading] = useState(false);

  // ── Persist selections across navigations ──────────────────────────────────
  useEffect(() => {
    sessionStorage.setItem("shareReportEmail", email);
    sessionStorage.setItem("shareReportCadence", JSON.stringify(cadence));
    sessionStorage.setItem("shareReportDateRange", JSON.stringify(dateRange));
    if (selectedArea) sessionStorage.setItem("shareReportSelectedArea", selectedArea);
    if (selectedLine) sessionStorage.setItem("shareReportSelectedLine", selectedLine);
    if (selectedStation) sessionStorage.setItem("shareReportSelectedStation", selectedStation);
    if (selectedSubStation) sessionStorage.setItem("shareReportSelectedSubStation", selectedSubStation);
    if (selectedRobot) sessionStorage.setItem("shareReportSelectedRobot", selectedRobot);
    if (selectedGun) sessionStorage.setItem("shareReportSelectedGun", selectedGun);
    if (selectedShift) sessionStorage.setItem("shareReportSelectedShift", selectedShift);
    if (selectedModel) sessionStorage.setItem("shareReportSelectedModel", selectedModel);
  }, [
    email,
    cadence,
    dateRange,
    selectedArea,
    selectedLine,
    selectedStation,
    selectedSubStation,
    selectedRobot,
    selectedGun,
    selectedShift,
    selectedModel,
  ]);

  // ── Load Master Data (Clusters, Lines, Stations) ──────────────────────────
  useEffect(() => {
    let cancelled = false;
    masterApi
      .getMasterData()
      .then((res) => {
        if (cancelled) return;
        const clusters = res.data ?? [];
        setMasterClusters(clusters);
        setMasterLoading(false);

        const firstCluster = clusters[0];
        if (firstCluster) {
          const firstClusterId = String(firstCluster.ClusterId);
          setSelectedArea((prev) => {
            if (prev && clusters.some((c) => String(c.ClusterId) === String(prev))) {
              return prev;
            }
            return firstClusterId;
          });

          const firstLine = (firstCluster.Lines ?? [])[0];
          if (firstLine) {
            const firstLineId = String(firstLine.LineId);
            setSelectedLine((prev) => {
              const allLines = clusters.flatMap((c) => c.Lines ?? []);
              if (prev && allLines.some((l) => String(l.LineId) === String(prev))) {
                return prev;
              }
              return firstLineId;
            });

            const firstStation = (firstLine.Stations ?? [])[0];
            if (firstStation) {
              const firstStationId = String(firstStation.StationId);
              setSelectedStation((prev) => {
                const allStations = clusters
                  .flatMap((c) => c.Lines ?? [])
                  .flatMap((l) => l.Stations ?? []);
                if (
                  prev &&
                  (prev === "All" || allStations.some((s) => String(s.StationId) === String(prev)))
                ) {
                  return prev;
                }
                return firstStationId;
              });
            }
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load master clusters:", err);
          setMasterLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Load Robots for selected station ──────────────────────────────────────
  useEffect(() => {
    if (!selectedStation || selectedStation === "All") {
      setRobotList([]);
      return;
    }
    let cancelled = false;
    setRobotsLoading(true);
    robotApi
      .getHealth({ stationId: selectedStation })
      .then((res) => {
        if (cancelled) return;
        const list = res?.data ?? [];
        setRobotList(list);
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn("Failed to load robots for station:", err);
          setRobotList([]);
        }
      })
      .finally(() => {
        if (!cancelled) setRobotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedStation]);

  // ── Cascading selection handlers ──────────────────────────────────────────
  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
    const cluster = masterClusters.find((c) => String(c.ClusterId) === String(newArea));
    const firstLine = (cluster?.Lines ?? [])[0];
    setSelectedLine(firstLine ? String(firstLine.LineId) : "All");
    setSelectedStation("All");
    setSelectedSubStation("All");
    setSelectedRobot("All");
    setSelectedGun("All");
  };

  const handleLineChange = (newLine) => {
    setSelectedLine(newLine);
    setSelectedStation("All");
    setSelectedSubStation("All");
    setSelectedRobot("All");
    setSelectedGun("All");
  };

  const resetFilters = () => {
    const firstCluster = masterClusters[0];
    if (firstCluster) {
      setSelectedArea(String(firstCluster.ClusterId));
      const firstLine = (firstCluster.Lines ?? [])[0];
      setSelectedLine(firstLine ? String(firstLine.LineId) : "All");
    } else {
      setSelectedArea("All");
      setSelectedLine("All");
    }
    setSelectedStation("All");
    setSelectedSubStation("All");
    setSelectedRobot("All");
    setSelectedGun("All");
    setSelectedShift("All");
    setSelectedModel("All");
  };

  // ── Relevant filter capabilities for currently selected files ────────────
  const relevantFilterKeys = useMemo(() => {
    const keys = new Set();
    if (selectedFiles.length === 0) {
      return new Set(["area", "line", "station", "robot", "gun", "shift"]);
    }
    selectedFiles.forEach((file) => {
      const repKey = getReportKey(file.name);
      const caps = REPORT_FILTER_CAPABILITIES[repKey] || ["area", "line", "station", "shift"];
      caps.forEach((k) => keys.add(k));
    });
    return keys;
  }, [selectedFiles]);

  // ── Dropdown options & current filters ────────────────────────────────────
  const areaOptions = useMemo(() => {
    const opts = [{ value: "All", label: "All Areas" }];
    masterClusters.forEach((c) => {
      opts.push({
        value: String(c.ClusterId),
        label: formatClusterName(c.ClusterName),
      });
    });
    return opts;
  }, [masterClusters]);

  const allLines = useMemo(() => {
    return masterClusters.flatMap((c) =>
      (c.Lines ?? []).map((l) => ({
        value: String(l.LineId),
        label: l.LineName,
        clusterId: String(c.ClusterId),
        stations: l.Stations ?? [],
      }))
    );
  }, [masterClusters]);

  const lineOptions = useMemo(() => {
    if (!relevantFilterKeys.has("area") || !selectedArea || selectedArea === "All") {
      return allLines;
    }
    return allLines.filter((l) => l.clusterId === String(selectedArea));
  }, [allLines, selectedArea, relevantFilterKeys]);

  const stationOptions = useMemo(() => {
    if (selectedLine && selectedLine !== "All") {
      const line = allLines.find((l) => l.value === String(selectedLine));
      return (line?.stations ?? []).map((s) => ({
        value: String(s.StationId),
        label: s.StationName,
        substations: s.SubStations ?? [],
      }));
    }
    if (selectedArea && selectedArea !== "All" && relevantFilterKeys.has("area")) {
      const lineIdsInArea = new Set(lineOptions.map((l) => l.value));
      return allLines
        .filter((l) => lineIdsInArea.has(l.value))
        .flatMap((l) =>
          (l.stations ?? []).map((s) => ({
            value: String(s.StationId),
            label: `${s.StationName} (${l.label})`,
            substations: s.SubStations ?? [],
          }))
        );
    }
    return allLines.flatMap((l) =>
      (l.stations ?? []).map((s) => ({
        value: String(s.StationId),
        label: `${s.StationName} (${l.label})`,
        substations: s.SubStations ?? [],
      }))
    );
  }, [allLines, selectedLine, selectedArea, relevantFilterKeys, lineOptions]);

  const subStationOptions = useMemo(() => {
    if (!selectedStation || selectedStation === "All") return [];
    for (const l of allLines) {
      const st = (l.stations ?? []).find(
        (s) => String(s.StationId) === String(selectedStation),
      );
      if (st && (st.SubStations ?? []).length > 0) {
        return st.SubStations.map((sub) => ({
          value: String(sub.SubStationId || sub.name),
          label: sub.SubStationName || sub.name,
        }));
      }
    }
    return [
      { value: "SUB-01", label: "SUB-01" },
      { value: "SUB-02", label: "SUB-02" },
      { value: "SUB-03", label: "SUB-03" },
    ];
  }, [selectedStation, allLines]);

  const robotOptions = useMemo(() => {
    const seen = new Set();
    const result = [
      { value: "All", label: robotsLoading ? "Loading robots..." : "All Robots" },
    ];

    robotList.forEach((r) => {
      const id = String(r.RobotId || r.name || "");
      const name = r.Robot_Name || r.RobotName || r.name || id;
      if (id && !seen.has(id)) {
        seen.add(id);
        result.push({ value: id, label: name });
      }
    });

    if (selectedStation && selectedStation !== "All") {
      for (const l of allLines) {
        const st = (l.stations ?? []).find((s) => String(s.StationId) === String(selectedStation));
        for (const sub of st?.SubStations ?? []) {
          const name = (sub.SubStationName || "").trim();
          if (/RB\d+|Robot/i.test(name) && !seen.has(name)) {
            seen.add(name);
            result.push({ value: String(sub.SubStationId || name), label: name });
          }
        }
      }
    }

    ["RB-01", "RB-02", "RB-03", "RB-04"].forEach((rId) => {
      if (!seen.has(rId)) {
        seen.add(rId);
        result.push({ value: rId, label: rId });
      }
    });

    return result;
  }, [robotList, robotsLoading, selectedStation, allLines]);

  const gunOptions = useMemo(
    () => [
      { value: "All", label: "All Guns" },
      { value: "GUN-01", label: "GUN-01" },
      { value: "GUN-02", label: "GUN-02" },
      { value: "GUN-03", label: "GUN-03" },
      { value: "GUN-04", label: "GUN-04" },
      { value: "GUN-05", label: "GUN-05" },
      { value: "GUN-06", label: "GUN-06" },
    ],
    [],
  );

  const shiftOptions = useMemo(
    () => getShiftOptionsWithActive(),
    [],
  );

  const modelOptions = useMemo(
    () => [
      { value: "All", label: "All Models" },
      { value: "SUV-Pro", label: "SUV-Pro" },
      { value: "EV-Sedan", label: "EV-Sedan" },
      { value: "Hatchback-GT", label: "Hatchback-GT" },
      { value: "JSW-SUV", label: "JSW SUV" },
      { value: "JSW-SEDAN", label: "JSW Sedan" },
      { value: "JSW-EV", label: "JSW EV" },
    ],
    [],
  );

  const relevantCadenceOptions = useMemo(() => {
    if (selectedFiles.length === 0) {
      return ALL_CADENCE_OPTIONS;
    }

    const availableSet = new Set();
    selectedFiles.forEach((file) => {
      const repKey = getReportKey(file.name);
      const caps = REPORT_CADENCE_CAPABILITIES[repKey] || [
        "Immediate Share",
        "Shift wise",
        "Daily",
        "Weekly",
        "Monthly",
      ];
      caps.forEach((c) => availableSet.add(c));
    });

    // Always include Immediate Share
    availableSet.add("Immediate Share");

    return ALL_CADENCE_OPTIONS.filter((opt) => availableSet.has(opt.value));
  }, [selectedFiles]);



  const effectiveDateRange = useMemo(
    () => (dateRange?.start && dateRange?.end ? dateRange : computeCadenceDateRange(cadence, dateRange)),
    [cadence, dateRange],
  );

  const currentFilters = useMemo(
    () => ({
      area: selectedArea,
      areaId: selectedArea,
      line: selectedLine,
      lineId: selectedLine,
      station: selectedStation,
      stationId: selectedStation,
      substation: selectedSubStation,
      substationId: selectedSubStation,
      equipment: selectedSubStation,
      equipmentId: selectedSubStation,
      robot: selectedRobot,
      robotId: selectedRobot === "All" ? "" : selectedRobot,
      gun: selectedGun,
      gunId: selectedGun === "All" ? "" : selectedGun,
      shifts: selectedShift === "All" ? ["All"] : [selectedShift],
      model: selectedModel === "All" ? "" : selectedModel,
    }),
    [
      selectedArea,
      selectedLine,
      selectedStation,
      selectedSubStation,
      selectedRobot,
      selectedGun,
      selectedShift,
      selectedModel,
    ],
  );

  // ── Lock body scroll when modal is open ──────────────────────────────────
  useEffect(() => {
    if (showShareModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showShareModal]);

  // ── Tree helpers ──────────────────────────────────────────────────────────
  const toggleNode = (path) => {
    const key = path.join("/");
    setExpandedNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isExpanded = (path) => expandedNodes[path.join("/")] || false;

  const toggleFileSelection = (file) => {
    const pair = getReportPair(file);
    setSelectedFiles((prev) =>
      prev.some((f) => f.name === file.name)
        ? prev.filter((f) => !pair.some((p) => p.name === f.name))
        : [...prev.filter((f) => !pair.some((p) => p.name === f.name)), ...pair],
    );
  };

  // ── Headless Background Tab Report Generator ─────────────────────────────
  const generateReportViaBackgroundTab = async (
    reportKey,
    targetDateRange,
    targetCadence,
    targetFileTypes = null,
    targetFilters = null,
  ) => {
    const cleanKey = String(reportKey || "").replace(/_{2,}/g, "_").trim();
    const normalizedKey = getReportKey(cleanKey);
    const Component =
      REPORT_COMPONENTS[normalizedKey] ||
      REPORT_COMPONENTS[cleanKey] ||
      REPORT_COMPONENTS[reportKey];

    if (!Component) {
      console.warn(`[BackgroundExport] Component not found for key: "${reportKey}" (normalized: "${normalizedKey}")`);
      return null;
    }

    const filtersToUse = targetFilters || currentFilters;

    return new Promise((resolve) => {
      let capturedPdf = null;
      let capturedExcel = null;
      let resolved = false;
      let graceTimer = null;

      const finish = async () => {
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
          console.warn(`[BackgroundExport] Timeout reached for ${normalizedKey}`);
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

        const wantsPdf = targetFileTypes ? targetFileTypes.has("pdf") : true;
        const wantsExcel = targetFileTypes ? targetFileTypes.has("xlsx") : true;

        // If all desired formats arrived, finish immediately
        if ((!wantsPdf || capturedPdf) && (!wantsExcel || capturedExcel)) {
          if (graceTimer) clearTimeout(graceTimer);
          setTimeout(finish, 150);
          return;
        }

        // If one file arrived and we're waiting for the second
        if (!graceTimer) {
          graceTimer = setTimeout(() => {
            console.warn(`[BackgroundExport] Grace period elapsed for second format in ${normalizedKey}`);
            finish();
          }, 25000);
        }
      };

      setBackgroundExportActive(true, normalizedKey, onFileCaptured);
      setActiveBackgroundReport({
        reportKey: normalizedKey,
        Component,
        dateRange: targetDateRange,
        cadence: targetCadence,
        filters: filtersToUse,
      });
    });
  };

  // ── Dispatch subscription using the exact UI report generator ─────────────
  const handleDispatchSubscriptionFromUI = async (sub, onProgress) => {
    const reportsList = Array.isArray(sub.reports)
      ? sub.reports
      : [sub.reports].filter(Boolean);

    if (reportsList.length === 0) {
      throw new Error(`No reports assigned to subscriber ${sub.email}`);
    }

    const subDateRange = computeCadenceDateRange(sub.cadence, null);
    const filesToSend = [];
    const missingReports = [];

    for (let i = 0; i < reportsList.length; i++) {
      const rawKey = reportsList[i];
      const repKey = getReportKey(String(rawKey || "").replace(/_{2,}/g, "_"));
      if (onProgress) {
        onProgress(`Rendering ${repKey} via UI (${i + 1}/${reportsList.length})...`);
      }

      const filtersForRep = sub.reportFilters?.[repKey] || sub.reportFilters?.[rawKey] || {};
      const formats = String(sub.formats || "Both").toLowerCase();
      const wantsPdf = formats.includes("both") || formats.includes("pdf") || !formats;
      const wantsExcel = formats.includes("both") || formats.includes("excel") || !formats;
      const targetTypes = new Set([
        ...(wantsPdf ? ["pdf"] : []),
        ...(wantsExcel ? ["xlsx"] : []),
      ]);

      const result = await generateReportViaBackgroundTab(
        repKey,
        subDateRange,
        sub.cadence,
        targetTypes,
        filtersForRep,
      );

      if (wantsPdf) {
        if (result?.pdf?.blob) {
          filesToSend.push({
            name: result.pdf.name,
            fileType: "pdf",
            blob: result.pdf.blob,
          });
          try {
            await cacheReportFile(result.pdf.name, result.pdf.blob);
          } catch {}
        } else {
          missingReports.push(`${repKey} (PDF)`);
        }
      }
      
      if (wantsExcel) {
        if (result?.excel?.blob) {
          filesToSend.push({
            name: result.excel.name,
            fileType: "xlsx",
            blob: result.excel.blob,
          });
          try {
            await cacheReportFile(result.excel.name, result.excel.blob);
          } catch {}
        } else {
          missingReports.push(`${repKey} (Excel)`);
        }
      }
    }

    if (filesToSend.length === 0) {
      throw new Error("Could not capture any report files from UI. Please verify component data loading.");
    }

    if (onProgress) onProgress("Packaging attachments & dispatching email...");

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

    console.log("shareByEmail succeeded. sub object:", JSON.stringify(sub));
    if (sub.id) {
      console.log("Calling recordSuccess for sub.id:", sub.id);
      try {
        const resp = await subscriptionApi.recordSuccess(sub.id);
        console.log("recordSuccess response:", resp);
      } catch (err) {
        console.error("Failed to record dispatch success:", err);
      }
    } else {
      console.warn("sub.id is missing! Cannot record success.");
    }
  };

  // ── Auto-generate & Download on demand ─────────────────────────────────────
  const handleDownload = async (file) => {
    try {
      setDownloadingFile(file.name);
      const cleanFileName = file.name.replace(/_{2,}/g, "_");
      const repKey = getReportKey(cleanFileName);
      let blob = null;
      let capturedName = null;

      const isPdf = cleanFileName.toLowerCase().endsWith(".pdf");
      const targetType = new Set([isPdf ? "pdf" : "xlsx"]);

      if (REPORT_COMPONENTS[repKey]) {
        const result = await generateReportViaBackgroundTab(
          repKey,
          effectiveDateRange,
          cadence,
          targetType,
          currentFilters,
        );
        if (isPdf && result?.pdf?.blob) {
          blob = result.pdf.blob;
          capturedName = result.pdf.name;
        } else if (!isPdf && result?.excel?.blob) {
          blob = result.excel.blob;
          capturedName = result.excel.name;
        }
      }

      if (blob) {
        try {
          await cacheReportFile(cleanFileName, blob);
        } catch {
          // ignore cache error
        }
      } else {
        const cached = await getCachedReportFile(cleanFileName);
        if (cached) {
          blob = cached;
          capturedName = cleanFileName;
        }
      }

      if (!blob) {
        console.error(`[handleDownload] Live UI report could not be captured for ${cleanFileName}. Synthetic fallback is disabled.`);
        alert(`Could not capture live UI report for "${cleanFileName}". Please verify that the report data loads correctly.`);
        return;
      }

      const ext = isPdf ? "pdf" : "xlsx";
      const fallbackDatedName =
        effectiveDateRange?.start && effectiveDateRange?.end
          ? `${cleanFileName.replace(/\.(pdf|xlsx)$/i, "")}_${effectiveDateRange.start}_to_${effectiveDateRange.end}.${ext}`
          : cleanFileName;
      const downloadName = (capturedName || fallbackDatedName).replace(/_{2,}/g, "_");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloadingFile(null);
    }
  };

  // ── Auto-generate & Send email ────────────────────────────────────────────
  const handleSendEmail = async () => {
    const isCadenceSelected = Array.isArray(cadence) ? cadence.length > 0 : Boolean(cadence);
    if (!email.trim() || !isCadenceSelected || selectedFiles.length === 0) {
      setEmailStatus("error");
      setEmailError("Enter an email, choose at least one cadence, and select at least one file.");
      return;
    }

    // RFC 5322-compliant email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailList = email.split(/[,;\s]+/).map((e) => e.trim()).filter(Boolean);
    if (emailList.length === 0) {
      setEmailStatus("error");
      setEmailError("Please enter a valid recipient email address.");
      return;
    }
    const invalidList = emailList.filter((e) => !emailRegex.test(e));
    if (invalidList.length > 0) {
      setEmailStatus("error");
      setEmailError(`Invalid email address format: ${invalidList.join(", ")}`);
      return;
    }

    isCancelledRef.current = false;
    setIsSending(true);
    setEmailStatus(null);
    setEmailError("");
    setSendProgress("Preparing reports...");

    try {
      const filesWithContent = [];
      const skippedReports = [];

      // Group selected files by report key so unique tabs run only once
      const reportKeyMap = new Map();
      selectedFiles.forEach((file) => {
        const repKey = getReportKey(file.name);
        if (!reportKeyMap.has(repKey)) {
          reportKeyMap.set(repKey, []);
        }
        reportKeyMap.get(repKey).push(file);
      });

      const uniqueKeys = Array.from(reportKeyMap.keys());
      const capturedResults = new Map();

      for (let i = 0; i < uniqueKeys.length; i++) {
        if (isCancelledRef.current) return;
        const repKey = uniqueKeys[i];
        if (REPORT_COMPONENTS[repKey]) {
          const filesForThisKey = reportKeyMap.get(repKey) || [];
          const targetTypes = new Set(
            filesForThisKey.map((f) => (f.name.toLowerCase().endsWith(".pdf") ? "pdf" : "xlsx")),
          );
          setSendProgress(`Generating ${repKey} in background (${i + 1}/${uniqueKeys.length})...`);
          try {
            const result = await generateReportViaBackgroundTab(
              repKey,
              effectiveDateRange,
              cadence,
              targetTypes,
              currentFilters,
            );
            capturedResults.set(repKey, result);
          } catch (tabErr) {
            console.warn(`[handleSendEmail] Background generation failed for ${repKey}:`, tabErr);
          }
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        if (isCancelledRef.current) return;
        const file = selectedFiles[i];
        const cleanName = file.name.replace(/_{2,}/g, "_");
        setSendProgress(`Packaging ${cleanName} (${i + 1}/${selectedFiles.length})...`);
        const repKey = getReportKey(cleanName);
        const result = capturedResults.get(repKey);

        let blob = null;
        let attachmentName = cleanName;
        const isPdf = cleanName.toLowerCase().endsWith(".pdf");
        const ext = isPdf ? "pdf" : "xlsx";

        if (isPdf && result?.pdf?.blob) {
          blob = result.pdf.blob;
          attachmentName = result.pdf.name || cleanName;
        } else if (!isPdf && result?.excel?.blob) {
          blob = result.excel.blob;
          attachmentName = result.excel.name || cleanName;
        }

        if (!blob) {
          console.warn(`[handleSendEmail] Live UI report could not be captured for ${cleanName}, skipping from email package.`);
          skippedReports.push(cleanName);
          continue;
        }

        try {
          const base64 = await blobToBase64(blob);
          filesWithContent.push({
            name: attachmentName.replace(/_{2,}/g, "_"),
            fileType: file.fileType || ext,
            contentBase64: base64,
          });
        } catch (b64Err) {
          console.warn(`[handleSendEmail] Failed base64 conversion for ${cleanName}:`, b64Err);
          skippedReports.push(cleanName);
        }
      }

      if (isCancelledRef.current) return;

      if (filesWithContent.length === 0) {
        throw new Error("None of the selected reports could be compiled. Please check data availability.");
      }

      try {
        localStorage.setItem("jsw_last_report_recipient_email", email.trim());
      } catch {
        // ignore localStorage error
      }

      setSendProgress("Dispatching report email via SMTP...");
      await reportsApi.shareByEmail({
        email: emailList,
        cadence: Array.isArray(cadence) ? cadence : [cadence].filter(Boolean),
        dateRange: effectiveDateRange,
        files: filesWithContent,
        filters: currentFilters,
        missingReports: skippedReports,
      });

      if (isCancelledRef.current) return;

      setEmailStatus("success");
      setSendProgress(
        skippedReports.length > 0
          ? `Dispatched! Notice: ${skippedReports.length} report(s) could not be compiled.`
          : ""
      );
      setTimeout(() => {
        if (!isCancelledRef.current) {
          setShowShareModal(false);
          setEmailStatus(null);
          setSelectedFiles([]);
        }
      }, skippedReports.length > 0 ? 3500 : 2000);
    } catch (error) {
      if (isCancelledRef.current) return;
      console.error("Email send error:", error);
      setEmailStatus("error");
      setEmailError(error.message || "The report email could not be sent.");
    } finally {
      if (!isCancelledRef.current) {
        setIsSending(false);
        setSendProgress("");
      }
    }
  };

  // ── Tree renderer ─────────────────────────────────────────────────────────
  const renderNode = (node, path = []) => {
    const currentPath = [...path, node.name];
    const expanded = isExpanded(currentPath);
    const hasChildren = node.children?.length;
    const isDownloadingThis = downloadingFile === node.name;

    return (
      <div key={currentPath.join("/")} className="transition-all duration-200">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 min-w-0 ${
            node.type === "file" ? "hover:bg-sky-50 hover:shadow-sm" : "hover:bg-sky-100"
          }`}
          onClick={() => node.type !== "file" && toggleNode(currentPath)}
        >
          {/* Expand chevron */}
          {hasChildren ? (
            expanded ? (
              <ChevronDown size={18} className="text-[#2744A0] transition-transform duration-200" />
            ) : (
              <ChevronRight size={18} className="text-[#2744A0] transition-transform duration-200" />
            )
          ) : (
            <span className="w-[18px]" />
          )}

          {/* Folder icons */}
          {node.type === "year" && (
            <div className="bg-[#2744A0] p-2 rounded-lg">
              <Folder size={20} className="text-white" />
            </div>
          )}
          {node.type === "folder" && (
            <div
              className={`${
                expanded ? "bg-[#0e5a94]" : "bg-[#2744A0]"
              } p-2 rounded-lg transition-all duration-300`}
            >
              {expanded ? (
                <FolderOpen size={20} className="text-white" />
              ) : (
                <Folder size={20} className="text-white" />
              )}
            </div>
          )}

          {/* Folder / year label */}
          {node.type !== "file" && (
            <span className="text-base font-bold text-[#152552] truncate min-w-0">
              {node.name}
            </span>
          )}

          {/* File row */}
          {node.type === "file" && (
            <>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-sky-400 text-[#2744A0] focus:ring-2 focus:ring-sky-300 cursor-pointer transition-all"
                checked={selectedFiles.some((f) => f.name === node.name)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleFileSelection(node);
                }}
              />

              <div className="bg-red-600 p-2 rounded-lg">
                <FileText size={18} className="text-white" />
              </div>

              <span className="text-sm font-medium text-[#152552] flex-1 truncate min-w-0">
                {node.name}
              </span>

              {/* Action: direct auto-download */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(node);
                }}
                disabled={isDownloadingThis}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#2744A0] hover:text-[#0e5a94] bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg transition-all disabled:opacity-50"
                title="Download report directly"
              >
                {isDownloadingThis ? (
                  <Loader2 size={13} className="animate-spin text-[#2744A0]" />
                ) : (
                  <Download size={13} />
                )}
                <span>Download</span>
              </button>

              {/* Action: Send Email */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFiles([node]);
                  setShowShareModal(true);
                  setEmailStatus(null);
                  setEmailError("");
                  setSendProgress("");
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#2744A0] hover:text-[#0e5a94] bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg transition-all"
                title="Send email for this report directly"
              >
                <Mail size={13} />
                <span>Send Email</span>
              </button>
            </>
          )}
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <div className="ml-8 border-l-2 border-sky-300 pl-2 mt-1">
            {node.children.map((child) => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-sky-100">
        {/* VIEW TABS */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
          <div className="flex items-center gap-2 p-1.5 bg-sky-50/80 border border-sky-200 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("quickShare")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === "quickShare"
                  ? "bg-[#2744A0] text-white shadow-sm"
                  : "text-[#152552] hover:bg-sky-100/60 font-semibold"
              }`}
            >
              <Folder size={15} />
              <span>Quick Share & File Tree</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("subscriptions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === "subscriptions"
                  ? "bg-[#2744A0] text-white shadow-sm"
                  : "text-[#152552] hover:bg-sky-100/60 font-semibold"
              }`}
            >
              <Users size={15} />
              <span>Automated Subscriptions (Multi-Recipient)</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  activeTab === "subscriptions" ? "bg-white/20 text-white" : "bg-blue-100 text-[#2744A0]"
                }`}
              >
                Auto-Schedule
              </span>
            </button>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            {activeTab === "quickShare" ? (
              <span>Select files to export on-demand</span>
            ) : (
              <span>Automated email bundles per recipient & cadence</span>
            )}
          </div>
        </div>

        {activeTab === "subscriptions" ? (
          <ReportSubscriptionManager onDispatchSubscription={handleDispatchSubscriptionFromUI} />
        ) : (
          <>
            <DateRangeBar
              withContainer={true}
              selectedStartDate={dateRange.start}
              selectedEndDate={dateRange.end}
              onDateChange={(start, end) => setDateRange({ start, end })}
              onSearch={(start, end) => setDateRange({ start, end })}
              showDownload={false}
              showEmail={false}
            />

        {/* Scope / Hierarchy Parameter Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2744A0]" />
            <span className="text-xs font-bold text-[#152552] uppercase tracking-wider">
              Target Scope & Hierarchy
            </span>
            <span className="text-[11px] font-medium text-[#2744A0] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              Synced with UI
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-gray-600 hover:text-red-600 px-2 py-0.5 rounded hover:bg-red-50 transition-all border border-gray-200 bg-white shadow-xs ml-1"
            >
              Reset Filters
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Area */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Area:</label>
              <select
                value={selectedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                disabled={masterLoading}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {areaOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Line */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Line:</label>
              <select
                value={selectedLine}
                onChange={(e) => handleLineChange(e.target.value)}
                disabled={masterLoading || lineOptions.length === 0}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {lineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Station */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Station:</label>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                disabled={masterLoading || stationOptions.length === 0}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                <option value="All">All Stations</option>
                {stationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Station / Equipment */}
            {subStationOptions.length > 0 && (
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-gray-600">Equipment:</label>
                <select
                  value={selectedSubStation}
                  onChange={(e) => setSelectedSubStation(e.target.value)}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
                >
                  <option value="All">All Equipment</option>
                  {subStationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Robot */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Robot:</label>
              <select
                value={selectedRobot}
                onChange={(e) => setSelectedRobot(e.target.value)}
                disabled={robotsLoading && robotOptions.length <= 1}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {robotOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Gun */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Gun:</label>
              <select
                value={selectedGun}
                onChange={(e) => setSelectedGun(e.target.value)}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {gunOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Shift */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Shift:</label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {shiftOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-gray-600">Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-[#2744A0] shadow-sm"
              >
                {modelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-sky-200">
          <div>
            <h2 className="text-2xl font-bold text-[#152552]">Share Reports</h2>
            <p className="text-sm text-[#2744A0] mt-1 font-medium">
              Select reports to email or download directly.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {selectedFiles.length > 0 && (
              <div className="border-2 border-[#2744A0] text-[#2744A0] px-4 py-2 rounded-lg text-sm font-semibold">
                {selectedFiles.length} File{selectedFiles.length > 1 ? "s" : ""} Selected
              </div>
            )}
            <button
              disabled={selectedFiles.length === 0}
              onClick={() => {
                setShowShareModal(true);
                setEmailStatus(null);
                setEmailError("");
                setSendProgress("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-md transition-all duration-200 ${
                selectedFiles.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2744A0] hover:bg-[#0e5a94] hover:shadow-lg"
              }`}
            >
              <Mail size={16} />
              <span>Send Email</span>
            </button>
          </div>
        </div>

        {/* Tree */}
        <div className="bg-gray-50 rounded-xl p-4 border border-sky-200 overflow-x-hidden">
          {renderNode(SHARE_REPORT_TREE)}
        </div>
      </>
    )}
  </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all animate-in zoom-in duration-300 max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="bg-[#2744A0] p-5 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Email Reports</h3>
                    <p className="text-white text-xs mt-0.5 font-medium opacity-90">
                      Auto-generates selected reports and sends bundled ZIP via email
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                  title="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="no-scrollbar p-6 space-y-5 overflow-y-auto overflow-x-hidden flex-1 min-h-0">

              {/* Active Date Range & Shift Info Banner */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2744A0]" />
                    <span className="text-xs font-bold text-[#152552] uppercase tracking-wider">
                      Report Date Scope
                    </span>
                  </div>
                  {selectedShift && (
                    <span className="text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full font-semibold text-[11px] border border-sky-200">
                      {selectedShift === "All"
                        ? "All Shifts"
                        : `Shift ${selectedShift} (${getShiftTimeWindow(selectedShift)})`}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start || ""}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                      disabled={isSending}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white font-semibold text-gray-800 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end || ""}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                      disabled={isSending}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white font-semibold text-gray-800 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email input */}
              <div>
                <label className="text-sm font-bold text-[#152552] mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 border border-sky-300 rounded-xl px-4 py-3 focus-within:border-[#2744A0] focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white">
                  <Mail size={18} className="text-[#2744A0] shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com"
                    className="w-full outline-none bg-transparent text-sm text-[#152552] placeholder-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Cadence */}
              <div>
                <label className="text-sm font-bold text-[#152552] mb-3 block">
                  Cadence <span className="text-red-500">*</span>
                </label>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                  <p className="text-xs text-[#2744A0] mb-3 font-medium">
                    Click to select or deselect
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { value: "Hourly", label: "Hourly" },
                      { value: "Shift wise", label: "Shift wise" },
                      { value: "Daily", label: "Daily" },
                      { value: "Weekly", label: "Weekly" },
                      { value: "Monthly", label: "Monthly" },
                      { value: "Quarterly", label: "Quarterly" },
                      { value: "Yearly", label: "Yearly" },
                    ].map((option) => {
                      const isSelected = Array.isArray(cadence) && cadence.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={isSending}
                          onClick={() => {
                            if (isSelected) {
                              setCadence((prev) => prev.filter((c) => c !== option.value));
                            } else {
                              setCadence((prev) => [...prev, option.value]);
                            }
                          }}
                          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-[#2744A0] text-white shadow-md hover:bg-[#0e5a94]"
                              : "bg-white text-[#152552] border border-sky-400 hover:border-[#2744A0] hover:bg-sky-100"
                          }`}
                        >
                          {isSelected && <span className="mr-1.5 font-bold">✓</span>}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {Array.isArray(cadence) && cadence.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-sky-200">
                      <p className="text-xs text-[#2744A0] font-semibold">
                        Selected: {cadence.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Scope & Mapped UI Parameters */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2744A0]" />
                    <span className="text-xs font-bold text-[#152552] uppercase tracking-wider">
                      Report Target Parameters
                    </span>
                    <span className="text-[11px] font-medium text-gray-500">
                      ({Array.from(relevantFilterKeys).join(", ")})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetFilters}
                      disabled={isSending}
                      className="text-[11px] font-bold text-gray-600 hover:text-red-600 px-2 py-0.5 rounded hover:bg-red-50 transition-all border border-gray-200 bg-white"
                    >
                      Reset to All
                    </button>
                    <span className="text-[11px] font-semibold text-[#2744A0] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-500" />
                      Mapped to Reports
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Area */}
                  {relevantFilterKeys.has("area") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Area (Cluster)
                      </label>
                      <select
                        value={selectedArea}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        disabled={isSending || masterLoading}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {areaOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Line */}
                  {relevantFilterKeys.has("line") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Line
                      </label>
                      <select
                        value={selectedLine}
                        onChange={(e) => handleLineChange(e.target.value)}
                        disabled={isSending || masterLoading || lineOptions.length === 0}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {lineOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Station */}
                  {relevantFilterKeys.has("station") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Station
                      </label>
                      <select
                        value={selectedStation}
                        onChange={(e) => setSelectedStation(e.target.value)}
                        disabled={isSending || masterLoading || stationOptions.length === 0}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        <option value="All">All Stations</option>
                        {stationOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* SubStation / Equipment */}
                  {relevantFilterKeys.has("substation") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Sub-Station / Equipment
                      </label>
                      <select
                        value={selectedSubStation}
                        onChange={(e) => setSelectedSubStation(e.target.value)}
                        disabled={isSending || subStationOptions.length === 0}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        <option value="All">
                          {subStationOptions.length === 0
                            ? selectedStation === "All"
                              ? "Select a station first"
                              : "No equipment found"
                            : "All Sub-Stations"}
                        </option>
                        {subStationOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Robot */}
                  {relevantFilterKeys.has("robot") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Robot
                      </label>
                      <select
                        value={selectedRobot}
                        onChange={(e) => setSelectedRobot(e.target.value)}
                        disabled={isSending || robotsLoading}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {robotOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Gun */}
                  {relevantFilterKeys.has("gun") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Gun
                      </label>
                      <select
                        value={selectedGun}
                        onChange={(e) => setSelectedGun(e.target.value)}
                        disabled={isSending}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {gunOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Shift */}
                  {relevantFilterKeys.has("shift") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Shift
                      </label>
                      <select
                        value={selectedShift}
                        onChange={(e) => setSelectedShift(e.target.value)}
                        disabled={isSending}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {shiftOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Model */}
                  {relevantFilterKeys.has("model") && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                        Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={isSending}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium"
                      >
                        {modelOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected files list */}
              <div>
                <p className="text-sm font-bold text-[#152552] mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    Selected Files
                    <span className="bg-[#2744A0] text-white text-xs px-2 py-1 rounded-full">
                      {selectedFiles.length}
                    </span>
                  </span>
                  <span className="text-xs text-[#2744A0] font-medium flex items-center gap-1">
                    <Sparkles size={13} className="text-amber-500" />
                    Auto-generated on send
                  </span>
                </p>
                <div className="no-scrollbar bg-sky-50 rounded-xl p-4 border border-sky-200 max-h-48 overflow-y-auto overflow-x-hidden">
                  {selectedFiles.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No files selected. Close this modal and select files from the tree.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all min-w-0"
                        >
                          <div className="bg-red-600 p-2 rounded-lg flex-shrink-0">
                            <FileText size={16} className="text-white" />
                          </div>
                          <span className="text-sm font-medium text-[#152552] flex-1 truncate min-w-0">
                            {file.name}
                          </span>

                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex-shrink-0 flex items-center gap-1">
                            ✓ Ready
                          </span>

                          <button
                            type="button"
                            onClick={() => handleDownload(file)}
                            disabled={downloadingFile === file.name}
                            className="text-[#2744A0] hover:text-[#0e5a94] flex-shrink-0 p-1 hover:bg-sky-50 rounded transition-all"
                            title="Download this file now"
                          >
                            {downloadingFile === file.name ? (
                              <Loader2 size={16} className="animate-spin text-[#2744A0]" />
                            ) : (
                              <Download size={16} />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Progress or status */}
              {sendProgress && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-800 animate-in fade-in">
                  <Loader2 size={16} className="animate-spin text-[#2744A0]" />
                  <span className="font-semibold">{sendProgress}</span>
                </div>
              )}

              {/* Status message */}
              {emailStatus && (
                <div
                  className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-md animate-in slide-in-from-top duration-300 ${
                    emailStatus === "success"
                      ? "bg-green-50 text-green-800 border-2 border-green-300"
                      : "bg-red-50 text-red-800 border-2 border-red-300"
                  }`}
                >
                  {emailStatus === "success" ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                      <span>Reports generated & ZIP email sent successfully!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} className="text-red-600 shrink-0" />
                      <span>{emailError || "Failed to send email. Please try again."}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 p-5 border-t-2 border-sky-100 bg-white rounded-b-2xl flex-shrink-0">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 border-2 border-sky-300 rounded-lg font-semibold text-[#2744A0] hover:bg-sky-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={!email || !cadence || (Array.isArray(cadence) ? cadence.length === 0 : !cadence) || isSending || selectedFiles.length === 0}
                className={`px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-md ${
                  !email || !cadence || (Array.isArray(cadence) ? cadence.length === 0 : !cadence) || isSending || selectedFiles.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#2744A0] hover:bg-[#0e5a94] hover:shadow-lg"
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending ZIP...</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Headless background tab runner container for native UI exports */}
      <div
        id="background-report-runner"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "1600px",
          height: "1200px",
          opacity: 0.01,
          pointerEvents: "none",
          zIndex: -9999,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        {activeBackgroundReport && (
          <BackgroundExportContext.Provider
            value={{
              isBackground: true,
              reportKey: activeBackgroundReport.reportKey,
              dateRange: activeBackgroundReport.dateRange,
              cadence: Array.isArray(activeBackgroundReport.cadence)
                ? activeBackgroundReport.cadence
                : [activeBackgroundReport.cadence],
              filters: activeBackgroundReport.filters,
            }}
          >
            <Suspense fallback={null}>
              <activeBackgroundReport.Component
                key={`${activeBackgroundReport.reportKey}-${activeBackgroundReport.dateRange?.start}-${activeBackgroundReport.dateRange?.end}`}
                backgroundMode={true}
                backgroundDateRange={activeBackgroundReport.dateRange}
                backgroundCadence={
                  Array.isArray(activeBackgroundReport.cadence)
                    ? activeBackgroundReport.cadence
                    : [activeBackgroundReport.cadence]
                }
                backgroundFilters={activeBackgroundReport.filters}
              />
            </Suspense>
          </BackgroundExportContext.Provider>
        )}
      </div>
    </>
  );
};

export default ShareReport;