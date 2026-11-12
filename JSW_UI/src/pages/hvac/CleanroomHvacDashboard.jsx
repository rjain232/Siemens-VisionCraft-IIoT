import React, { useState, useEffect } from "react";
import {
  Wind,
  Thermometer,
  Droplets,
  Gauge,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Fan,
  RefreshCw,
  Power,
  Sliders,
  Layers,
  Zap,
} from "lucide-react";

export default function CleanroomHvacDashboard() {
  const [autoMode, setAutoMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState("Bay_A_Litho");
  const [activeSubTab, setActiveSubTab] = useState("MONITORING");

  // Live Cleanroom Telemetry State
  const [telemetry, setTelemetry] = useState({
    temperature: 21.52,
    targetTemp: 21.50,
    humidity: 42.1,
    targetHumidity: 42.0,
    roomPressure: 45.4,
    targetPressure: 45.0,
    particleCount03: 14, // particles/m³ for ISO Class 1
    hepaDeltaP: 142.0,   // Pa
    supplyFanHz: 48.2,
    exhaustDamperPct: 35.0,
    chilledWaterPct: 24.5,
    reheatPct: 12.0,
    humidifierPct: 8.5,
    systemHealthy: true,
  });

  const zones = [
    { id: "Bay_A_Litho", name: "Bay A: EUV Lithography", isoClass: "ISO Class 1", targetP: "+45 Pa", icon: Zap },
    { id: "Bay_B_Etch", name: "Bay B: Plasma Etch & Deposition", isoClass: "ISO Class 3", targetP: "+35 Pa", icon: Layers },
    { id: "Bay_C_SMT", name: "Bay C: High-Density SMT & EEE", isoClass: "ISO Class 6", targetP: "+25 Pa", icon: Activity },
    { id: "Airlock_Gowning", name: "Airlock & Gowning Core", isoClass: "ISO Class 7", targetP: "+15 Pa", icon: ShieldCheck },
  ];

  // Simulated High-Precision Telemetry Jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => {
        const tempNoise = (Math.random() - 0.5) * 0.04;
        const rhNoise = (Math.random() - 0.5) * 0.2;
        const pNoise = (Math.random() - 0.5) * 0.4;
        const newTemp = Number((prev.temperature + tempNoise).toFixed(2));
        const newRh = Number((prev.humidity + rhNoise).toFixed(1));
        const newP = Number((prev.roomPressure + pNoise).toFixed(1));

        return {
          ...prev,
          temperature: Math.max(21.42, Math.min(21.58, newTemp)),
          humidity: Math.max(41.4, Math.min(42.6, newRh)),
          roomPressure: Math.max(44.2, Math.min(46.2, newP)),
          particleCount03: Math.floor(10 + Math.random() * 8),
          hepaDeltaP: Number((140 + Math.random() * 5).toFixed(1)),
        };
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-slate-950 text-slate-100 rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden font-sans">
      
      {/* Top Banner Header */}
      <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-900 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold shadow-lg">
            <Wind size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-wide">
                Cleanroom Precision HVAC & FMS
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ISO 14644-1 COMPLIANT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Semiconductor Wafer Fabrication & EEE Cleanroom Automation • S7-1517H Cascade Control
            </p>
          </div>
        </div>

        {/* Global Controls & Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-surface-900/80 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <span className="text-slate-400">Regulation Mode:</span>
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                autoMode
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-amber-600/30 text-amber-300 border border-amber-500/30"
              }`}
            >
              <Power size={12} />
              {autoMode ? "AUTO (Cascade PID)" : "MANUAL OVERRIDE"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">PLC ONLINE</span>
          </div>
        </div>
      </div>

      {/* Zone Selector Strip */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-2">
          Fab Zones:
        </span>
        {zones.map((z) => {
          const Icon = z.icon;
          const isActive = selectedZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => setSelectedZone(z.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition font-medium whitespace-nowrap ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md border border-cyan-400/30 font-bold"
                  : "bg-surface-900/60 text-slate-400 hover:text-white hover:bg-surface-850 border border-white/5"
              }`}
            >
              <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
              <span>{z.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
              }`}>
                {z.isoClass}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 space-y-5 overflow-y-auto">
        
        {/* Top KPI Cards (Ultra-Precision Loop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Temperature Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-cyan-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer size={16} className="text-cyan-400" />
                Air Temperature
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                ±0.10 °C Window
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                {telemetry.temperature.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-400">°C</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>Target: {telemetry.targetTemp.toFixed(2)} °C</span>
              <span className="text-emerald-400 font-bold">Deviation: +0.02 °C</span>
            </div>
          </div>

          {/* Relative Humidity Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-cyan-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets size={16} className="text-indigo-400" />
                Relative Humidity
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                ESD Safe (42±1%)
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                {telemetry.humidity.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">% RH</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>Target: {telemetry.targetHumidity.toFixed(1)} %</span>
              <span className="text-emerald-400 font-bold">ESD Risk: None</span>
            </div>
          </div>

          {/* Room Differential Pressure */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-cyan-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge size={16} className="text-emerald-400" />
                Room Pressure (ΔP)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                Positive Cascade
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                +{telemetry.roomPressure.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">Pa</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>Target: +{telemetry.targetPressure.toFixed(1)} Pa</span>
              <span className="text-emerald-400 font-bold">Outward Velocity: OK</span>
            </div>
          </div>

          {/* Particle Contamination Status */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-cyan-500/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-400" />
                Airborne Particles
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                ≥0.3 µm
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                {telemetry.particleCount03}
              </span>
              <span className="text-xs font-semibold text-slate-400">particles/m³</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>ISO 1 Limit: &lt;100</span>
              <span className="text-emerald-400 font-bold">100% Passed</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Air Handling Unit Actuators & Cascade Scheme */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Actuator Positions / VFD Status */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Fan size={18} className="text-cyan-400" />
                Subfab RAHU / MAU Actuator Modulations (PID Outputs)
              </span>
              <span className="text-xs font-mono text-slate-400">PROFINET Cyclic T10ms</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              
              {/* Supply Fan VFD */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Supply Fan Inverter (VFD):</span>
                  <span className="text-cyan-300 font-bold">{telemetry.supplyFanHz.toFixed(1)} Hz (96%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${(telemetry.supplyFanHz / 50) * 100}%` }}></div>
                </div>
              </div>

              {/* Chilled Water Valve */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Chilled Water Valve (6°C):</span>
                  <span className="text-indigo-300 font-bold">{telemetry.chilledWaterPct.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${telemetry.chilledWaterPct}%` }}></div>
                </div>
              </div>

              {/* Electric / Hot Water Reheat */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Trim Reheat Coil:</span>
                  <span className="text-amber-300 font-bold">{telemetry.reheatPct.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${telemetry.reheatPct}%` }}></div>
                </div>
              </div>

              {/* DI Humidifier */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ultrasonic DI Humidifier:</span>
                  <span className="text-emerald-300 font-bold">{telemetry.humidifierPct.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${telemetry.humidifierPct}%` }}></div>
                </div>
              </div>

            </div>

            {/* Filter Health Diagnostic */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-slate-300">ULPA Ceiling Filter Grid Differential Pressure:</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">{telemetry.hepaDeltaP} Pa (Clean &lt;200 Pa)</span>
            </div>
          </div>

          {/* Quick Actions & SCL Code Preview */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders size={18} className="text-cyan-400" />
                  S7-1500 Controller Block
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-600/20 text-cyan-300">
                  FB_Cleanroom_HVAC
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Executing automated feed-forward cascade regulation. Chilled water modulates dew point sub-cooling while trim reheat maintains strict ±0.1°C thermal stability over wafer stages.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-300 space-y-1">
                <div><span className="text-cyan-400">#SetPoint_Temp</span> := 21.50 °C;</div>
                <div><span className="text-indigo-400">#SetPoint_RH</span> := 42.0 %;</div>
                <div><span className="text-emerald-400">#SetPoint_Pressure</span> := +45.0 Pa;</div>
              </div>
              
              <a
                href="/siemens-hmi"
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md text-xs font-sans"
              >
                <span>Open Siemens Plant HMI View</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
