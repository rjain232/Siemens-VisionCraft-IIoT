import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { KPIShimmer } from "../../../../sharedComponents/Shimmer";
import EmptyState, { NoDataState } from "../../../../sharedComponents/EmptyState";
import {
  BatteryFull,
  BatteryLow,
  BatteryWarning,
  Cpu,
  Globe,
  HardDrive,
  Activity,
  MapPin,
} from "lucide-react";
import { masterApi } from "../../../../services/api";
import { useRobotHealth } from "../../../../hooks/useRobotHealth";
import FilterBar from "../../../../sharedComponents/FilterBar";
import { formatClusterName } from "../../../../utils/Formatters";

const normalizeName = (name) => (name || "").trim();

// ── KUKA-style robot arm SVG ──────────────────────────────────────────────────
const RobotArmSVG = memo(({ status }) => {
  const isActive    = status === "Active";
  const isBreakdown = status === "Breakdown";

  const armFill      = isBreakdown ? "#9ca3af" : "#E05F00";
  const armHighlight = isBreakdown ? "#d1d5db" : "#FF7820";
  const armShadow    = isBreakdown ? "#6b7280" : "#A84700";
  const elbowFill    = isBreakdown ? "#9ca3af" : "#E05F00";
  const elbowTip     = isBreakdown ? "#d1d5db" : "#FF9944";

  return (
    <svg viewBox="0 0 72 74" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="2"  y="65" width="44" height="9"  rx="3"   fill="#111827"/>
      <rect x="8"  y="53" width="32" height="14" rx="2"   fill="#1f2937"/>
      <rect x="12" y="57" width="24" height="7"  rx="1.5" fill="#374151"/>
      <circle cx="24" cy="53" r="9"   fill="#374151"/>
      <circle cx="24" cy="53" r="5.5" fill="#4b5563"/>
      <circle cx="24" cy="53" r="2.5" fill="#6b7280"/>
      <g
        style={{ transformOrigin: "24px 53px", transform: isBreakdown ? "rotate(15deg)" : undefined }}
        className={isActive ? "animate-robot-lower" : ""}
      >
        <rect x="20" y="14" width="8" height="41" rx="4"    fill={armFill}/>
        <rect x="21" y="16" width="3" height="37" rx="1.5"  fill={armHighlight} opacity="0.55"/>
        <rect x="26" y="18" width="1.5" height="33" rx="0.75" fill={armShadow} opacity="0.4"/>
        <circle cx="24" cy="14" r="8"   fill="#1f2937"/>
        <circle cx="24" cy="14" r="5"   fill={elbowFill}/>
        <circle cx="24" cy="14" r="2.5" fill={elbowTip}/>
        <g style={{ transformOrigin: "24px 14px" }} className={isActive ? "animate-robot-upper" : ""}>
          <rect x="24" y="10.5" width="32" height="8"   rx="4"    fill={armFill}/>
          <rect x="27" y="11.5" width="27" height="3"   rx="1.5"  fill={armHighlight} opacity="0.55"/>
          <rect x="27" y="17"   width="27" height="1.5" rx="0.75" fill={armShadow} opacity="0.4"/>
          <circle cx="56" cy="14.5" r="7" fill="#1f2937"/>
          <circle cx="56" cy="14.5" r="4" fill="#374151"/>
          <circle cx="56" cy="14.5" r="2" fill="#6b7280"/>
          <g style={{ transformOrigin: "56px 14.5px" }} className={isActive ? "animate-robot-tool" : ""}>
            <rect x="53.5" y="14.5" width="5" height="16" rx="2.5" fill="#4b5563"/>
            <rect x="54.5" y="27"   width="3" height="5"  rx="1.5" fill="#374151"/>
            <circle cx="56" cy="33.5" r="1.5" fill="#1f2937"/>
            {isActive && (
              <g>
                <circle cx="56" cy="33.5" r="5.5" fill="#FCD34D" className="animate-robot-spark"/>
                <circle cx="56" cy="33.5" r="3"   fill="#FEF9C3" className="animate-robot-spark-inner"/>
                <circle cx="56" cy="33.5" r="1.2" fill="white"/>
              </g>
            )}
          </g>
        </g>
      </g>
    </svg>
  );
});

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Active:    { dot: "bg-green-500", badge: "bg-green-100 text-green-700", pulse: true  },
  Breakdown: { dot: "bg-red-500",   badge: "bg-red-100 text-red-700",     pulse: true  },
  Idle:      { dot: "bg-amber-400", badge: "bg-amber-100 text-amber-700", pulse: false },
  Unknown:   { dot: "bg-gray-400",  badge: "bg-gray-100 text-gray-500",   pulse: false },
};

const getCfg = (status) => STATUS_CONFIG[status] || STATUS_CONFIG.Unknown;

// ── Live count strip ──────────────────────────────────────────────────────────
const StatusStrip = ({ robots, lastUpdated, statusFilter, onFilterChange }) => {
  const counts = useMemo(() => {
    const c = { Total: 0, Active: 0, Breakdown: 0, Idle: 0, Unknown: 0 };
    robots.forEach(({ HealthStatus: s }) => {
      c.Total++;
      if (s in c) c[s]++;
      else c.Unknown++;
    });
    return c;
  }, [robots]);

  const pills = [
    { label: "Total",     val: counts.Total,     color: "text-[#0e71ad]", bg: "bg-blue-50  border-blue-100",  activeRing: "ring-[#0e71ad]",  key: null        },
    { label: "Active",    val: counts.Active,    color: "text-green-600", bg: "bg-green-50 border-green-100", activeRing: "ring-green-500",  key: "Active"    },
    { label: "Breakdown", val: counts.Breakdown, color: "text-red-600",   bg: "bg-red-50   border-red-100",   activeRing: "ring-red-500",    key: "Breakdown" },
    { label: "Idle",      val: counts.Idle,      color: "text-amber-600", bg: "bg-amber-50 border-amber-100", activeRing: "ring-amber-400",  key: "Idle"      },
    { label: "Unknown",   val: counts.Unknown,   color: "text-gray-500",  bg: "bg-gray-50  border-gray-100",  activeRing: "ring-gray-400",   key: "Unknown"   },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
      {pills.map(({ label, val, color, bg, activeRing, key }) => {
        const isActive = statusFilter === key;
        return (
          <button
            key={label}
            onClick={() => onFilterChange(isActive ? null : key)}
            className={`flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${bg} ${
                 isActive ? `ring-2 ${activeRing} scale-105` : "hover:scale-105"
              }`}
            title={key ? `Filter by ${label}` : "Show all"}
          >
            <span className={`text-base font-bold ${color}`}>{val}</span>
            <span className="text-[11px] text-gray-400">{label}</span>
            {isActive && <span className="text-[9px] font-bold text-gray-400 ml-0.5">✕</span>}
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-2">
        {statusFilter && (
          <span className="text-[10px] font-semibold text-[#0e71ad] bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5 hidden sm:inline">
            Showing: {statusFilter}
          </span>
        )}
        {lastUpdated && (
          <span className="text-[10px] font-medium text-gray-400 hidden sm:inline">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-full px-3 py-1">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 animate-ping opacity-60" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
          </span>
          Live
        </span>
      </div>
    </div>
  );
};

// ── Robot card ────────────────────────────────────────────────────────────────
const RobotCard = memo(({ name, status, batteryStatus, lastUpdatedTime }) => {
  const cfg         = getCfg(status);
  const isBreakdown = status === "Breakdown";

  const tooltipTitle = lastUpdatedTime instanceof Date
    ? `${name} — Last updated: ${lastUpdatedTime.toLocaleTimeString()}`
    : name;

  return (
    <div
      title={tooltipTitle}
      className="bg-white rounded-2xl cursor-pointer flex flex-col items-center overflow-hidden"
      style={{
        border: isBreakdown ? "1px solid #fecaca" : "1px solid #f1f5f9",
        boxShadow: isBreakdown
          ? "0 0 0 2px rgba(220,38,38,0.15), 0 4px 6px rgba(15,23,42,0.08), 0 8px 16px rgba(15,23,42,0.08)"
          : "0 4px 6px rgba(15,23,42,0.08), 0 8px 16px rgba(15,23,42,0.08)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = isBreakdown
          ? "0 0 0 2px rgba(220,38,38,0.25), 0 8px 16px rgba(15,23,42,0.12), 0 16px 32px rgba(15,23,42,0.10)"
          : "0 8px 16px rgba(15,23,42,0.12), 0 16px 32px rgba(15,23,42,0.10)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isBreakdown
          ? "0 0 0 2px rgba(220,38,38,0.15), 0 4px 6px rgba(15,23,42,0.08), 0 8px 16px rgba(15,23,42,0.08)"
          : "0 4px 6px rgba(15,23,42,0.08), 0 8px 16px rgba(15,23,42,0.08)";
      }}
    >
      <div className="w-full flex flex-col items-center gap-3 p-4">
        {/* Name + status dot */}
        <div className="w-full flex items-center justify-between">
          <p className="text-[12px] font-bold text-gray-800 truncate leading-tight">{name}</p>
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0 ml-1">
            {cfg.pulse && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-60`} />
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.dot}`} />
          </span>
        </div>

        {/* Robot arm SVG */}
        <div
          className="relative w-14 h-14 rounded-xl bg-gray-50 border flex items-center justify-center p-1.5"
          style={{ borderColor: isBreakdown ? "#fecaca" : "#f3f4f6" }}
        >
          <RobotArmSVG status={status} />
          {isBreakdown && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-black leading-none">
              ⚠
            </span>
          )}
        </div>

        {/* Status badge */}
        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${cfg.badge} w-full text-center`}>
          {status}
        </span>

        {/* Battery */}
        <div className="flex items-center gap-1.5">
          {batteryStatus === "High" ? (
            <BatteryFull className="text-green-500 w-4 h-4 flex-shrink-0" />
          ) : batteryStatus === "Low" ? (
            <BatteryLow className="text-red-500 w-4 h-4 flex-shrink-0" />
          ) : (
            <BatteryWarning className="text-gray-300 w-4 h-4 flex-shrink-0" />
          )}
          <span className="text-[11px] text-gray-500 font-medium">
            {batteryStatus !== "Unknown" ? batteryStatus : "—"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Station column ────────────────────────────────────────────────────────────
const StationColumn = memo(({ station, robotHealthMap, onSelect, statusFilter, lastUpdated }) => {
  const robots = [];
  const seen = new Set();
  (station.SubStations || []).forEach((ss) => {
    if (!/RB\d+/i.test(ss.SubStationName || "")) return;
    const key = normalizeName(ss.SubStationName);
    if (seen.has(key)) return;
    seen.add(key);
    robots.push(ss);
  });

  if (!station.StationName && robots.length === 0) return null;

  // Apply status filter
  const visibleRobots = statusFilter
    ? robots.filter((r) => {
      const h = robotHealthMap[normalizeName(r.SubStationName)];
      return (h?.HealthStatus || "Unknown") === statusFilter;
    })
    : robots;

  if (statusFilter && visibleRobots.length === 0) return null;

  const activeCount = robots.filter((r) => {
    const h = robotHealthMap[normalizeName(r.SubStationName)];
    return h?.HealthStatus === "Active";
  }).length;

  return (
    <div
      className="flex flex-col gap-3 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] rounded-2xl p-4 h-fit shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
    >
      {/* Station header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold text-[#1e3a8a]">{station.StationName}</h3>
          <div className="h-[2px] w-5 bg-[#0e71ad] rounded-full mt-1" />
        </div>
        <span className="text-[11px] font-semibold text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
          {activeCount}/{robots.length} Active
        </span>
      </div>
       {/* Robot cards grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {visibleRobots.map((r) => {
          const health = robotHealthMap[normalizeName(r.SubStationName)] || null;
          return (
            <div key={r.SubStationId} onClick={() => onSelect(r, health)}>
              <RobotCard
                name={r.SubStationName}
                status={health?.HealthStatus || "Unknown"}
                batteryStatus={health?.BatteryStatus || "Unknown"}
                lastUpdatedTime={lastUpdated}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ── Modal ─────────────────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, robot }) => {
  const closeRef   = useRef(null);
  const overlayRef = useRef(null);

  // Body scroll lock
  useEffect(() => {
    document.body.classList.toggle("modal-open", isOpen);
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  // Escape key + focus on open
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = overlayRef.current?.querySelector('[role="dialog"]');
    if (!modal) return;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen || !robot) return null;

  const status  = robot.HealthStatus || "Unknown";
  const battery = robot.BatteryStatus || "Unknown";
  const cfg     = getCfg(status);

  const infoItems = [
    { icon: Cpu,       label: "Robot Name",   value: robot.SubStationName },
    { icon: HardDrive, label: "Make",       value: robot.Make        || "—" },
    { icon: Globe,     label: "IP Address", value: robot.IP          || "—" },
    { icon: MapPin,    label: "Station",    value: robot.stationName || "—" },
    { icon: Activity,  label: "Line",       value: robot.lineName    || "—" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Robot details — ${robot.SubStationName}`}
        className="bg-white rounded-2xl w-full max-w-[580px] overflow-hidden"
        style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.18), 0 2px 8px rgba(15,23,42,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-5 px-7 py-5" style={{ background: "#f0f7fc", borderBottom: "1px solid #dbeafe" }}>
          <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center p-2 flex-shrink-0"
            style={{ border: "1px solid #bfdbfe", boxShadow: "0 2px 10px rgba(14,113,173,0.12)" }}>
            <RobotArmSVG status={status} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#0e71ad] uppercase tracking-widest mb-0.5">Robot Details</p>
            <p className="text-[22px] font-bold text-[#1e3a8a] leading-tight truncate">{robot.SubStationName}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                {cfg.pulse && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-60`} />
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.dot}`} />
              </span>
              <span className={`text-[12px] font-semibold px-3 py-0.5 rounded-full ${cfg.badge}`}>{status}</span>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-blue-100 hover:text-[#0e71ad] transition-colors text-sm font-bold flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Battery bar */}
        <div className="flex items-center gap-3 px-7 py-3.5" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Battery</span>
          <div className="flex items-center gap-1.5">
            {battery === "High" ? (
              <BatteryFull className="text-green-500 w-5 h-5" />
            ) : battery === "Low" ? (
              <BatteryLow className="text-red-500 w-5 h-5" />
            ) : (
              <BatteryWarning className="text-gray-300 w-5 h-5" />
            )}
            <span className={`text-sm font-bold ${battery === "High" ? "text-green-600" : battery === "Low" ? "text-red-600" : "text-gray-400"}`}>
              {battery !== "Unknown" ? battery : "—"}
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="px-7 py-5">
          <div className="grid grid-cols-2 gap-3">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl px-4 py-3.5" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={13} className="text-[#0e71ad]" />
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                </div>
                <p className="text-[14px] font-bold text-gray-800 truncate leading-tight" title={value}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Robot Layout ──────────────────────────────────────────────────────────────
const RobotLayout = () => {
  const [clusters, setClusters]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [filters, setFilters]       = useState({ cluster: "", line: "" });
  const [modalOpen, setModalOpen]   = useState(false);
  const [selected, setSelected]     = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const { data: healthList, lastUpdated } = useRobotHealth();

  const robotHealthMap = useMemo(() => {
    const map = {};
    (healthList || []).forEach((r) => { map[normalizeName(r.Robot_Name)] = r; });
    return map;
  }, [healthList]);

  const clusterOptions = useMemo(
    () => clusters.map((c) => ({ label: formatClusterName(c.ClusterName), value: String(c.ClusterId) })),
    [clusters]
  );
  const selectedCluster = useMemo(
    () => clusters.find((c) => String(c.ClusterId) === filters.cluster),
    [clusters, filters.cluster]
  );
  const lineOptions = useMemo(
    () => (selectedCluster?.Lines || []).map((l) => ({ label: l.LineName, value: String(l.LineId) })),
    [selectedCluster]
  );

  useEffect(() => {
    if (!filters.cluster && clusters.length)
      setFilters({ cluster: String(clusters[0].ClusterId), line: "" });
  }, [clusters]);

  useEffect(() => {
    if (selectedCluster?.Lines?.length)
      setFilters((prev) => ({ ...prev, line: prev.line || String(selectedCluster.Lines[0].LineId) }));
  }, [selectedCluster]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await masterApi.getMasterData();
        if (!cancelled) setClusters(res?.data || []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const selectedLine = useMemo(
    () => selectedCluster?.Lines?.find((l) => String(l.LineId) === filters.line) || null,
    [selectedCluster, filters.line]
  );

  const rawStations = selectedLine?.Stations || [];

  // Sort: stations with any Breakdown robot float to top
  const stations = useMemo(() => {
    if (!rawStations.length) return rawStations;
    return [...rawStations].sort((a, b) => {
      const hasBreakdown = (s) =>
        (s.SubStations || []).some((ss) => {
          if (!/RB\d+/i.test(ss.SubStationName || "")) return false;
          return robotHealthMap[normalizeName(ss.SubStationName)]?.HealthStatus === "Breakdown";
        });
      return Number(hasBreakdown(b)) - Number(hasBreakdown(a));
    });
  }, [rawStations, robotHealthMap]);

  const allRobots = useMemo(() => {
    const all = [];
    rawStations.forEach((s) =>
      (s.SubStations || []).forEach((ss) => {
        if (!/RB\d+/i.test(ss.SubStationName || "")) return;
        const h = robotHealthMap[normalizeName(ss.SubStationName)];
        all.push({ HealthStatus: h?.HealthStatus || "Unknown" });
      })
    );
    return all;
  }, [rawStations, robotHealthMap]);

  const handleSelect = useCallback((robot, health, station) => {
    setSelected({
      ...robot,
      ...(health || {}),
      stationName: station.StationName,
      lineName: selectedLine?.LineName,
    });
    setModalOpen(true);
  }, [selectedLine]);

  const handleClose = useCallback(() => setModalOpen(false), []);

  if (loading) return <div className="p-4"><KPIShimmer /></div>;
  if (error)   return <div className="px-4 py-6 text-red-500 text-sm">{error}</div>;

  const noLines = clusters.length > 0 && Boolean(filters.cluster) && lineOptions.length === 0;

  return (
    <div>
      <div className="px-4 pt-3 pb-2">
        <FilterBar
          config={[
            { key: "cluster", label: "Cluster", type: "select", options: clusterOptions },
            { key: "line",    label: "Line",    type: "select", options: lineOptions    },
          ]}
          filters={filters}
          onChange={setFilters}
        />
      </div>

      {allRobots.length > 0 && (
        <StatusStrip
          robots={allRobots}
          lastUpdated={lastUpdated}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      )}

      <div className="px-4 pb-6">
        {noLines ? (
          <EmptyState icon={Activity} color="sky" title="No lines available for selected area" />
        ) : stations.length === 0 ? (
          <NoDataState subtitle="Try selecting a different line" />
        ) : (
          <div className="flex flex-wrap items-start gap-6">
            {stations.map((station) => (
              <StationColumn
                key={station.StationId}
                station={station}
                robotHealthMap={robotHealthMap}
                statusFilter={statusFilter}
                lastUpdated={lastUpdated}
                onSelect={(robot, health) => handleSelect(robot, health, station)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={handleClose} robot={selected} />
    </div>
  );
};

export default function RobotHealth() {
  return <RobotLayout />;
}
