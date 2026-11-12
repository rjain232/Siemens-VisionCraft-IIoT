import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Plus,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit2,
  Send,
  Loader2,
  Search,
  Calendar,
  FileText,
  Filter,
  Check,
  X,
  Sparkles,
  Zap,
  Sliders,
  ChevronDown,
  ChevronUp,
  Settings2,
  Info,
} from "lucide-react";
import { subscriptionApi, masterApi, robotApi } from "../../../services/api";

const AVAILABLE_REPORTS = [
  { key: "Overall_OEE", label: "Overall OEE Report", category: "OEE & Overview" },
  { key: "Production_Summary", label: "Production Summary", category: "OEE & Overview" },
  { key: "Shift_Summary", label: "Shift Summary Report", category: "OEE & Overview" },
  { key: "Hourly_Production", label: "Hourly Production Report", category: "Production Control" },
  { key: "Detailed_Production_Count", label: "Detailed Production Count", category: "Production Control" },
  { key: "Production_Overview", label: "Production Overview", category: "Production Control" },
  { key: "Line_Cycle_Time", label: "Line Cycle Time", category: "Production Control" },
  { key: "Station_Cycle_Time", label: "Station Cycle Time", category: "Production Control" },
  { key: "Shift_Backlog_Planning", label: "Shift Backlog Planning", category: "Production Control" },
  { key: "MTBF_Report", label: "MTBF Downtime Report", category: "Production Control" },
  { key: "MTTR_Report", label: "MTTR Downtime Report", category: "Production Control" },
  { key: "Annual_Production", label: "Annual Production Graph", category: "Production Control" },
  { key: "Bottleneck", label: "Bottleneck Analysis", category: "Production Control" },
  { key: "Buffer_Trend", label: "Buffer Trend Report", category: "Production Control" },
  { key: "Working_Calendar", label: "Working Calendar", category: "Production Control" },
  { key: "Tip_Change_Count", label: "Tip Change Count", category: "Maintenance" },
  { key: "Alarm_Report", label: "Alarm Log Report", category: "Maintenance" },
  { key: "Top_X_Alarms", label: "Top X Alarms Analysis", category: "Maintenance" },
  { key: "Line_Station_Losses", label: "Line & Station Losses", category: "Maintenance" },
  { key: "Walking_Report", label: "Walking Report", category: "Maintenance" },
  { key: "Robot_Spot_Hit_Rate", label: "Robot Spot Hit Rate", category: "Robot Monitoring" },
  { key: "Robot_Status", label: "Robot Health & Status", category: "Robot Monitoring" },
  { key: "Energy_Consumption", label: "Energy Consumption", category: "Third Party & Quality" },
  { key: "Weld_Data", label: "Weld Data Parameter", category: "Third Party & Quality" },
  { key: "Nut_Bolt_Fastening", label: "Nut Bolt Fastening", category: "Third Party & Quality" },
  { key: "MIG_Welding", label: "MIG Welding Report", category: "Third Party & Quality" },
  { key: "Sealant_Camera", label: "Sealant Camera Inspection", category: "Third Party & Quality" },
  { key: "VIN_No_Generation", label: "VIN Generation Log", category: "Third Party & Quality" },
  { key: "Individual_Stud_Result", label: "Individual Stud Result", category: "Third Party & Quality" },
  { key: "Part_Marriage", label: "Part Marriage Report", category: "Third Party & Quality" },
];

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

const CADENCE_PILLS = [
  { value: "Hourly", label: "Hourly", desc: "Every hour at :00" },
  { value: "Shift wise", label: "Shift wise", desc: "At shift end (06:00, 14:00, 22:00)" },
  { value: "Daily", label: "Daily", desc: "Every morning at 07:00 AM" },
  { value: "Weekly", label: "Weekly", desc: "Every Monday at 07:00 AM" },
  { value: "Monthly", label: "Monthly", desc: "1st of every month" },
];

const SHIFT_OPTIONS = [
  { value: "All", label: "All Shifts" },
  { value: "A", label: "Shift A" },
  { value: "B", label: "Shift B" },
  { value: "C", label: "Shift C" },
];

const MODEL_OPTIONS = [
  { value: "All", label: "All Models" },
  { value: "SUV-Pro", label: "SUV-Pro" },
  { value: "EV-Sedan", label: "EV-Sedan" },
  { value: "Hatchback-GT", label: "Hatchback-GT" },
];

const GUN_OPTIONS = [
  { value: "All", label: "All Guns" },
  { value: "GUN-01", label: "GUN-01" },
  { value: "GUN-02", label: "GUN-02" },
  { value: "GUN-03", label: "GUN-03" },
  { value: "GUN-04", label: "GUN-04" },
];

const getCadenceBadgeStyle = (cadence) => {
  const c = String(cadence || "").toLowerCase();
  if (c.includes("hour")) return "bg-amber-50 text-amber-800 border-amber-300";
  if (c.includes("shift")) return "bg-blue-50 text-blue-800 border-blue-300";
  if (c.includes("daily")) return "bg-emerald-50 text-emerald-800 border-emerald-300";
  if (c.includes("week")) return "bg-purple-50 text-purple-800 border-purple-300";
  if (c.includes("month")) return "bg-indigo-50 text-indigo-800 border-indigo-300";
  return "bg-gray-50 text-gray-800 border-gray-300";
};

export default function ReportSubscriptionManager({ onDispatchSubscription } = {}) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cadenceFilter, setCadenceFilter] = useState("All");
  const [dispatchingId, setDispatchingId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  // Master hierarchy and robot data
  const [clusters, setClusters] = useState([]);
  const [robotsByStation, setRobotsByStation] = useState({});

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCadence, setFormCadence] = useState("Daily");
  const [formReports, setFormReports] = useState([]);
  const [formReportFilters, setFormReportFilters] = useState({});
  const [configuringReportKey, setConfiguringReportKey] = useState(null);
  const [formFormats, setFormFormats] = useState("Both");
  const [formIsActive, setFormIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load subscriptions & master hierarchy
  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await subscriptionApi.getAll();
      if (res?.data) {
        setSubscriptions(res.data);
      }
    } catch (err) {
      console.error("Failed to load subscriptions:", err);
      setActionError("Could not load report subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
    masterApi
      .getMasterData()
      .then((res) => {
        if (res?.data) setClusters(res.data);
      })
      .catch((e) => console.warn("Could not load master hierarchy:", e));
  }, []);

  // Pre-load robots when a station is needed in filters
  const loadRobotsForStation = async (stationId) => {
    if (!stationId || stationId === "All" || robotsByStation[stationId]) return;
    try {
      const res = await robotApi.getRobotList({ stationId });
      const rList = res?.data || [];
      setRobotsByStation((prev) => ({ ...prev, [stationId]: rList }));
    } catch (e) {
      console.warn(`Could not load robots for station ${stationId}:`, e);
    }
  };

  const openAddModal = () => {
    setEditingSub(null);
    setFormName("");
    setFormEmail("");
    setFormCadence("Daily");
    setFormReports(["Overall_OEE"]);
    setFormReportFilters({
      Overall_OEE: { area: "All", line: "All", station: "All", shift: "All" },
    });
    setConfiguringReportKey("Overall_OEE");
    setFormFormats("Both");
    setFormIsActive(true);
    setActionError("");
    setShowModal(true);
  };

  const openEditModal = (sub) => {
    setEditingSub(sub);
    setFormName(sub.recipientName || "");
    setFormEmail(sub.email || "");
    setFormCadence(sub.cadence || "Daily");
    const rps = Array.isArray(sub.reports) ? sub.reports : [];
    setFormReports(rps);
    const rf = sub.reportFilters || {};
    setFormReportFilters(rf);
    setConfiguringReportKey(rps[0] || null);
    setFormFormats(sub.formats || "Both");
    setFormIsActive(sub.isActive !== false);
    setActionError("");
    setShowModal(true);

    // Preload robots for any stations in saved filters
    Object.values(rf).forEach((f) => {
      if (f?.station && f.station !== "All") {
        loadRobotsForStation(f.station);
      }
    });
  };

  const handleSaveSubscription = async (e) => {
    e.preventDefault();
    if (!formEmail.trim()) {
      setActionError("Email address is required.");
      return;
    }
    if (formReports.length === 0) {
      setActionError("Please select at least one report to dispatch.");
      return;
    }

    try {
      setSubmitting(true);
      setActionError("");
      const payload = {
        recipientName: formName.trim(),
        email: formEmail.trim().toLowerCase(),
        cadence: formCadence,
        reports: formReports,
        reportFilters: formReportFilters,
        formats: formFormats,
        isActive: formIsActive,
      };

      if (editingSub) {
        await subscriptionApi.update(editingSub.id, payload);
        setActionSuccess(`Updated subscription for ${payload.email}`);
      } else {
        await subscriptionApi.create(payload);
        setActionSuccess(`Added subscription for ${payload.email}`);
      }

      setShowModal(false);
      loadSubscriptions();
      setTimeout(() => setActionSuccess(""), 4000);
    } catch (err) {
      console.error("Error saving subscription:", err);
      setActionError(err.message || "Failed to save subscription.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (sub) => {
    if (!window.confirm(`Delete subscription for ${sub.email}?`)) return;
    try {
      await subscriptionApi.delete(sub.id);
      setActionSuccess(`Removed subscription for ${sub.email}`);
      setSubscriptions((prev) => prev.filter((item) => item.id !== sub.id));
      setTimeout(() => setActionSuccess(""), 4000);
    } catch (err) {
      console.error("Failed to delete subscription:", err);
      setActionError("Could not delete subscription.");
    }
  };

  const handleToggleActive = async (sub) => {
    try {
      const nextActive = !sub.isActive;
      await subscriptionApi.update(sub.id, { isActive: nextActive });
      setSubscriptions((prev) =>
        prev.map((item) => (item.id === sub.id ? { ...item, isActive: nextActive } : item))
      );
    } catch (err) {
      console.error("Failed to toggle subscription status:", err);
    }
  };

  const handleDispatchNow = async (sub) => {
    try {
      setDispatchingId(sub.id);
      setActionError("");
      setActionSuccess("");

      if (typeof onDispatchSubscription === "function") {
        await onDispatchSubscription(sub, (msg) => setActionSuccess(msg));
        setActionSuccess(`Exact UI report bundle sent to ${sub.email} successfully!`);
      } else {
        await subscriptionApi.dispatchNow(sub.id);
        setActionSuccess(`Report bundle sent to ${sub.email} successfully!`);
      }

      loadSubscriptions();
      setTimeout(() => setActionSuccess(""), 4000);
    } catch (err) {
      console.error("Error dispatching subscription:", err);
      setActionError(`Dispatch to ${sub.email} failed: ${err.message}`);
    } finally {
      setDispatchingId(null);
    }
  };

  // Toggle report selection in modal
  const toggleReportInForm = (repKey) => {
    if (formReports.includes(repKey)) {
      setFormReports((prev) => prev.filter((k) => k !== repKey));
      if (configuringReportKey === repKey) {
        setConfiguringReportKey(null);
      }
    } else {
      setFormReports((prev) => [...prev, repKey]);
      // Initialize default filters if not present
      if (!formReportFilters[repKey]) {
        setFormReportFilters((prev) => ({
          ...prev,
          [repKey]: { area: "All", line: "All", station: "All", shift: "All", robot: "All", gun: "All", model: "All" },
        }));
      }
      setConfiguringReportKey(repKey);
    }
  };

  // Update a specific filter attribute for a report with cascading resets
  const handleUpdateReportFilter = (repKey, filterKey, val) => {
    setFormReportFilters((prev) => {
      const current = prev[repKey] || {};
      const updated = { ...current, [filterKey]: val };

      if (filterKey === "area") {
        updated.line = "All";
        updated.station = "All";
        updated.substation = "All";
        updated.robot = "All";
      } else if (filterKey === "line") {
        updated.station = "All";
        updated.substation = "All";
        updated.robot = "All";
      } else if (filterKey === "station") {
        updated.substation = "All";
        updated.robot = "All";
      }

      return {
        ...prev,
        [repKey]: updated,
      };
    });

    if (filterKey === "station" && val && val !== "All") {
      loadRobotsForStation(val);
    }
  };

  // Reset a report's filters back to all
  const handleResetReportFilters = (repKey) => {
    setFormReportFilters((prev) => ({
      ...prev,
      [repKey]: {
        area: "All",
        line: "All",
        station: "All",
        substation: "All",
        robot: "All",
        gun: "All",
        shift: "All",
        model: "All",
      },
    }));
  };

  // Filtered subscribers
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.recipientName && sub.recipientName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCadence = cadenceFilter === "All" || sub.cadence === cadenceFilter;
      return matchesSearch && matchesCadence;
    });
  }, [subscriptions, searchQuery, cadenceFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: subscriptions.length,
      hourly: subscriptions.filter((s) => s.cadence === "Hourly").length,
      shiftwise: subscriptions.filter((s) => s.cadence === "Shift wise").length,
      daily: subscriptions.filter((s) => s.cadence === "Daily").length,
      weekly: subscriptions.filter((s) => s.cadence === "Weekly").length,
      monthly: subscriptions.filter((s) => s.cadence === "Monthly").length,
    };
  }, [subscriptions]);

  const reportMap = useMemo(() => {
    const map = new Map();
    AVAILABLE_REPORTS.forEach((r) => map.set(r.key, r.label));
    return map;
  }, []);

  // Compute master options
  const areaOptions = useMemo(() => {
    const opts = [{ value: "All", label: "All Areas" }];
    clusters.forEach((c) => {
      opts.push({ value: String(c.ClusterId), label: c.ClusterName });
    });
    return opts;
  }, [clusters]);

  const allLines = useMemo(() => {
    const lines = [];
    clusters.forEach((c) => {
      (c.Lines || []).forEach((l) => {
        lines.push({
          value: String(l.LineId),
          label: l.LineName,
          clusterId: String(c.ClusterId),
          stations: l.Stations || [],
        });
      });
    });
    return lines;
  }, [clusters]);

  const allStations = useMemo(() => {
    const stations = [];
    allLines.forEach((l) => {
      (l.stations || []).forEach((s) => {
        stations.push({
          value: String(s.StationId),
          label: `${s.StationName} (${l.label})`,
          lineId: l.value,
          substations: s.SubStations || [],
        });
      });
    });
    return stations;
  }, [allLines]);

  // Actively configured report's filter state
  const activeReportFilter = formReportFilters[configuringReportKey] || {};

  // Cascading options derived for the actively configured report
  const dynamicLineOptions = useMemo(() => {
    if (!activeReportFilter.area || activeReportFilter.area === "All") {
      return allLines;
    }
    return allLines.filter((l) => l.clusterId === String(activeReportFilter.area));
  }, [allLines, activeReportFilter.area]);

  const dynamicStationOptions = useMemo(() => {
    if (activeReportFilter.line && activeReportFilter.line !== "All") {
      return allStations.filter((s) => s.lineId === String(activeReportFilter.line));
    }
    if (activeReportFilter.area && activeReportFilter.area !== "All") {
      const lineIdsInArea = new Set(dynamicLineOptions.map((l) => l.value));
      return allStations.filter((s) => lineIdsInArea.has(s.lineId));
    }
    return allStations;
  }, [allStations, activeReportFilter.line, activeReportFilter.area, dynamicLineOptions]);

  const dynamicSubstationOptions = useMemo(() => {
    if (!activeReportFilter.station || activeReportFilter.station === "All") {
      return [];
    }
    const matchedStation = allStations.find((s) => s.value === String(activeReportFilter.station));
    return matchedStation?.substations || [];
  }, [allStations, activeReportFilter.station]);

  const dynamicRobotOptions = useMemo(() => {
    const stationId = activeReportFilter.station;
    const loadedRobots = (stationId && stationId !== "All" && robotsByStation[stationId]) || [];
    const seen = new Set();
    const result = [];

    loadedRobots.forEach((r) => {
      const id = String(r.RobotId || r.name || "");
      const name = r.Robot_Name || r.RobotName || r.name || id;
      if (id && !seen.has(id)) {
        seen.add(id);
        result.push({ value: id, label: name });
      }
    });

    ["RB-01", "RB-02", "RB-03", "RB-04"].forEach((rId) => {
      if (!seen.has(rId)) {
        seen.add(rId);
        result.push({ value: rId, label: rId });
      }
    });

    return result;
  }, [activeReportFilter.station, robotsByStation]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-4 border border-sky-200 shadow-sm">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Total</span>
          <span className="text-2xl font-bold text-[#152552]">{stats.total}</span>
          <span className="text-[11px] text-gray-400 block mt-0.5">Recipients</span>
        </div>
        <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 shadow-sm">
          <span className="text-xs text-amber-800 font-medium uppercase tracking-wider block">Hourly</span>
          <span className="text-2xl font-bold text-amber-900">{stats.hourly}</span>
          <span className="text-[11px] text-amber-700 block mt-0.5">Every hour</span>
        </div>
        <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 shadow-sm">
          <span className="text-xs text-blue-800 font-medium uppercase tracking-wider block">Shift Wise</span>
          <span className="text-2xl font-bold text-[#2744A0]">{stats.shiftwise}</span>
          <span className="text-[11px] text-blue-700 block mt-0.5">Shifts A, B, C</span>
        </div>
        <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 shadow-sm">
          <span className="text-xs text-emerald-800 font-medium uppercase tracking-wider block">Daily</span>
          <span className="text-2xl font-bold text-emerald-900">{stats.daily}</span>
          <span className="text-[11px] text-emerald-700 block mt-0.5">07:00 AM DOR</span>
        </div>
        <div className="bg-purple-50/70 rounded-xl p-4 border border-purple-200 shadow-sm">
          <span className="text-xs text-purple-800 font-medium uppercase tracking-wider block">Weekly</span>
          <span className="text-2xl font-bold text-purple-900">{stats.weekly}</span>
          <span className="text-[11px] text-purple-700 block mt-0.5">Monday 07:00</span>
        </div>
        <div className="bg-indigo-50/70 rounded-xl p-4 border border-indigo-200 shadow-sm">
          <span className="text-xs text-indigo-800 font-medium uppercase tracking-wider block">Monthly</span>
          <span className="text-2xl font-bold text-indigo-900">{stats.monthly}</span>
          <span className="text-[11px] text-indigo-700 block mt-0.5">1st of month</span>
        </div>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-900 text-sm font-semibold flex items-center gap-2.5 shadow-sm animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}
      {actionError && (
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-900 text-sm font-semibold flex items-center gap-2.5 shadow-sm animate-in fade-in">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Control Bar: Search, Filters & Add Button */}
      <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:bg-white focus-within:border-[#2744A0] transition-all w-full sm:w-64">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs outline-none bg-transparent font-medium text-gray-700"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
              <Filter size={12} /> Cadence:
            </span>
            <select
              value={cadenceFilter}
              onChange={(e) => setCadenceFilter(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-[#2744A0] outline-none"
            >
              <option value="All">All Cadences</option>
              <option value="Hourly">Hourly</option>
              <option value="Shift wise">Shift wise</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#2744A0] hover:bg-[#0e5a94] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <Plus size={16} />
          <span>Add Recipient Subscription</span>
        </button>
      </div>

      {/* Subscriptions Table / Cards */}
      <div className="bg-white rounded-2xl border border-sky-100 shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <Loader2 size={32} className="animate-spin text-[#2744A0] mx-auto mb-3" />
            <p className="text-sm font-medium">Loading report subscriptions...</p>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#152552]">No Subscriptions Found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Configure multiple recipients with their desired reports, custom filter parameters, and cadences.
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-2 bg-[#2744A0] text-white px-4 py-2 rounded-lg font-semibold text-xs shadow-md hover:bg-[#0e5a94] transition-all"
            >
              <Plus size={15} />
              <span>Create First Subscription</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sky-50/80 border-b border-sky-200 text-[11px] font-bold text-[#152552] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Recipient</th>
                  <th className="py-3.5 px-4">Cadence</th>
                  <th className="py-3.5 px-4">Subscribed Reports & Custom Filters</th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Last Dispatched</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {filteredSubscriptions.map((sub) => {
                  const isDispatchingThis = dispatchingId === sub.id;
                  const filters = sub.reportFilters || {};
                  return (
                    <tr key={sub.id} className="hover:bg-sky-50/30 transition-colors">
                      {/* Recipient */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2744A0] font-bold flex items-center justify-center shrink-0 text-xs">
                            {(sub.recipientName || sub.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            {sub.recipientName && (
                              <p className="font-bold text-[#152552] text-xs">{sub.recipientName}</p>
                            )}
                            <p className="font-medium text-gray-600 text-[11px] flex items-center gap-1">
                              <Mail size={12} className="text-gray-400" />
                              {sub.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Cadence */}
                      <td className="py-3.5 px-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getCadenceBadgeStyle(
                            sub.cadence
                          )}`}
                        >
                          <Clock size={12} />
                          {sub.cadence}
                        </span>
                      </td>

                      {/* Reports & Filters */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1.5 max-w-md">
                          {sub.reports.map((repKey) => {
                            const repFilter = filters[repKey] || {};
                            const filterEntries = Object.entries(repFilter).filter(
                              ([, v]) => v && v !== "All"
                            );
                            return (
                              <div
                                key={repKey}
                                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-gray-50 border border-gray-200/90 rounded-lg text-[11px]"
                              >
                                <span className="font-bold text-[#152552]">
                                  {reportMap.get(repKey) || repKey}
                                </span>
                                {filterEntries.length > 0 ? (
                                  <span className="flex items-center gap-1 text-[10px] text-[#2744A0] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                                    <Sliders size={10} className="text-amber-600" />
                                    {filterEntries.map(([k, v]) => `${k}:${v}`).join(", ")}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-gray-400 italic">
                                    (All parameters)
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Format */}
                      <td className="py-3.5 px-4 align-top">
                        <span className="font-semibold text-gray-600 text-[11px]">
                          {sub.formats === "Both" ? "ZIP (PDF & Excel)" : sub.formats}
                        </span>
                      </td>

                      {/* Last Dispatched */}
                      <td className="py-3.5 px-4 text-gray-500 text-[11px] align-top">
                        {sub.lastSentAt ? (
                          new Date(sub.lastSentAt).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        ) : (
                          <span className="text-gray-400 italic">Never triggered</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 align-top">
                        <button
                          onClick={() => handleToggleActive(sub)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                            sub.isActive
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              sub.isActive ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          {sub.isActive ? "Active" : "Paused"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right align-top">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Send Now button */}
                          <button
                            onClick={() => handleDispatchNow(sub)}
                            disabled={isDispatchingThis}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-[#2744A0] hover:bg-sky-100 border border-sky-200 transition-all disabled:opacity-50"
                            title="Dispatch live test email right now with custom filters"
                          >
                            {isDispatchingThis ? (
                              <Loader2 size={13} className="animate-spin text-[#2744A0]" />
                            ) : (
                              <Zap size={13} className="text-amber-500" />
                            )}
                            <span>Send Now</span>
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => openEditModal(sub)}
                            className="p-1 text-gray-500 hover:text-[#2744A0] hover:bg-gray-100 rounded-lg transition-all"
                            title="Edit subscription"
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(sub)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete subscription"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT SUBSCRIPTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sky-100">
            {/* Modal Header */}
            <div className="bg-[#2744A0] text-white p-5 rounded-t-2xl flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {editingSub ? "Edit Recipient Subscription" : "Add Recipient Subscription"}
                  </h3>
                  <p className="text-xs text-blue-100">
                    Assign reports, report-specific filters (Line, Station, Robot, Gun), and frequency.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveSubscription} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#152552] mb-1.5 block">
                      Recipient Name / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shift Lead / Maintenance Eng."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152552] mb-1.5 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. engineer@jsw.in"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Cadence Pills (matching screenshot design) */}
                <div>
                  <label className="text-xs font-bold text-[#152552] mb-2 block">
                    Cadence / Frequency <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                    <p className="text-xs text-[#2744A0] mb-3 font-medium">
                      Select frequency for automated dispatches
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {CADENCE_PILLS.map((pill) => {
                        const isSelected = formCadence === pill.value;
                        return (
                          <button
                            key={pill.value}
                            type="button"
                            onClick={() => setFormCadence(pill.value)}
                            className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-200 ${
                              isSelected
                                ? "bg-[#2744A0] text-white shadow-md hover:bg-[#0e5a94]"
                                : "bg-white text-[#152552] border border-sky-400 hover:border-[#2744A0] hover:bg-sky-100"
                            }`}
                          >
                            {isSelected && <span className="mr-1.5 font-bold">✓</span>}
                            {pill.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Row 3: Reports Selection & Report-Specific Filter Config */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-[#152552] block">
                        Subscribed Reports <span className="text-red-500">*</span> ({formReports.length} selected)
                      </label>
                      <span className="text-[11px] text-gray-500">
                        Click on any selected report or "Configure Filters" to set its Line, Station, Robot, Gun, etc.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormReports(AVAILABLE_REPORTS.map((r) => r.key))}
                        className="text-[11px] font-semibold text-[#2744A0] hover:underline"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormReports([]);
                          setConfiguringReportKey(null);
                        }}
                        className="text-[11px] font-semibold text-gray-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Reports List */}
                  <div className="border border-sky-200 rounded-xl max-h-60 overflow-y-auto p-3 bg-gray-50/50 space-y-4">
                    {["OEE & Overview", "Production Control", "Maintenance", "Robot Monitoring", "Third Party & Quality"].map(
                      (cat) => {
                        const reportsInCat = AVAILABLE_REPORTS.filter((r) => r.category === cat);
                        return (
                          <div key={cat} className="space-y-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              {cat}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {reportsInCat.map((rep) => {
                                const isChecked = formReports.includes(rep.key);
                                const isConfiguring = configuringReportKey === rep.key;
                                const capabilities = REPORT_FILTER_CAPABILITIES[rep.key] || [];
                                const currentFilter = formReportFilters[rep.key] || {};
                                const hasCustomFilters = Object.values(currentFilter).some(
                                  (v) => v && v !== "All"
                                );

                                return (
                                  <div
                                    key={rep.key}
                                    onClick={() => {
                                      if (isChecked) {
                                        setConfiguringReportKey(rep.key);
                                      }
                                    }}
                                    className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border text-xs transition-all ${
                                      isChecked
                                        ? isConfiguring
                                          ? "bg-blue-50/80 border-[#2744A0] ring-2 ring-[#2744A0]/60 shadow-sm cursor-pointer"
                                          : "bg-white border-blue-200 text-[#152552] hover:bg-sky-50/40 cursor-pointer"
                                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                                  >
                                    <label
                                      className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleReportInForm(rep.key)}
                                        className="rounded text-[#2744A0] focus:ring-0 shrink-0"
                                      />
                                      <span className="font-semibold truncate">{rep.label}</span>
                                    </label>

                                    {isChecked && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfiguringReportKey(isConfiguring ? null : rep.key);
                                        }}
                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 shadow-xs ${
                                          isConfiguring
                                            ? "bg-[#2744A0] text-white"
                                            : hasCustomFilters
                                            ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                                            : "bg-sky-50 text-[#2744A0] border border-sky-200 hover:bg-sky-100"
                                        }`}
                                        title="Configure report-specific filters"
                                      >
                                        <Sliders size={11} />
                                        <span>
                                          {isConfiguring ? "Configuring" : hasCustomFilters ? "Custom Filters" : "Filters"}
                                        </span>
                                        {capabilities.length > 0 && (
                                          <span className="text-[9px] opacity-75">
                                            ({capabilities.length})
                                          </span>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* ACTIVE REPORT FILTER CONFIGURATION DRAWER */}
                  {configuringReportKey && formReports.includes(configuringReportKey) && (
                    <div className="bg-sky-50/90 border-2 border-[#2744A0] rounded-2xl p-4 space-y-3.5 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-sky-200">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-[#2744A0] text-white rounded-lg shadow-sm">
                            <Settings2 size={16} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#152552] uppercase tracking-wider block">
                              Report Filters: {reportMap.get(configuringReportKey) || configuringReportKey}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              Parameters mapped specifically for this report
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleResetReportFilters(configuringReportKey)}
                            className="text-[11px] font-bold text-gray-600 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-all border border-gray-200/80 bg-white"
                          >
                            Reset to All
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfiguringReportKey(null)}
                            className="text-xs font-bold bg-[#2744A0] text-white hover:bg-[#0e5a94] px-3 py-1 rounded-lg transition-all shadow-xs"
                          >
                            Done
                          </button>
                        </div>
                      </div>

                      {/* Capabilities check */}
                      {(REPORT_FILTER_CAPABILITIES[configuringReportKey] || []).length === 0 ? (
                        <p className="text-xs text-gray-500 italic py-2">
                          This report is plant-wide and does not require sub-station or robot filters.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {/* 1. Area */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("area") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Area (Cluster)
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.area || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "area", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                {areaOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 2. Line */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("line") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Line
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.line || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "line", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                <option value="All">All Lines</option>
                                {dynamicLineOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 3. Station */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("station") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Station
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.station || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "station", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                <option value="All">All Stations</option>
                                {dynamicStationOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 4. Substation */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("substation") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Substation / Equipment
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.substation || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "substation", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                <option value="All">All Substations</option>
                                {dynamicSubstationOptions.map((sub) => (
                                  <option key={sub.SubStationId || sub.name} value={String(sub.SubStationId || sub.name)}>
                                    {sub.SubStationName || sub.name}
                                  </option>
                                ))}
                                <option value="SUB-01">SUB-01</option>
                                <option value="SUB-02">SUB-02</option>
                                <option value="SUB-03">SUB-03</option>
                              </select>
                            </div>
                          )}

                          {/* 5. Robot */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("robot") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Robot
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.robot || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "robot", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                <option value="All">All Robots</option>
                                {dynamicRobotOptions.map((r) => (
                                  <option key={r.value} value={r.value}>
                                    {r.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 6. Gun */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("gun") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Gun
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.gun || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "gun", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                {GUN_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 7. Shift */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("shift") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Shift
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.shift || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "shift", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                {SHIFT_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 8. Model */}
                          {REPORT_FILTER_CAPABILITIES[configuringReportKey]?.includes("model") && (
                            <div>
                              <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                                Model
                              </label>
                              <select
                                value={formReportFilters[configuringReportKey]?.model || "All"}
                                onChange={(e) =>
                                  handleUpdateReportFilter(configuringReportKey, "model", e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-[#2744A0] focus:ring-1 focus:ring-[#2744A0]"
                              >
                                {MODEL_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Formats and Active toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#152552] mb-1 block">
                      Attachment Format
                    </label>
                    <select
                      value={formFormats}
                      onChange={(e) => setFormFormats(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-gray-700 outline-none"
                    >
                      <option value="Both">Both (PDF & Excel ZIP)</option>
                      <option value="Excel">Excel Spreadsheet Only</option>
                      <option value="PDF">PDF Document Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152552] mb-1 block">
                      Subscription Status
                    </label>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsActive}
                        onChange={(e) => setFormIsActive(e.target.checked)}
                        className="rounded text-[#2744A0] focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        {formIsActive ? "Active (Sends automatically)" : "Paused (Do not send)"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-sky-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold border-2 border-sky-300 text-[#2744A0] hover:bg-sky-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#2744A0] hover:bg-[#0e5a94] text-white shadow-md flex items-center gap-2 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingSub ? "Save Changes" : "Create Subscription"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
