import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Wind, 
  BatteryCharging, 
  Zap, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function SolvynSmartGrid() {
  const [telemetry, setTelemetry] = useState({
    gridFrequency: 50.02,
    gridVoltage: 231.4,
    solarGenerationMW: 4.85,
    windGenerationMW: 2.30,
    bessSoC: 78.4,
    bessPowerMW: -1.80, // Charging
    bessTempC: 28.6,
    gridImportExportMW: 5.35,
    carbonOffsetTons: 142.8,
    operatingMode: 'HYBRID_OPTIMAL',
    status: 'NORMAL'
  });

  const [activeTab, setActiveTab] = useState('overview');

  // Live simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const deltaFreq = (Math.random() - 0.49) * 0.04;
        const newFreq = +(prev.gridFrequency + deltaFreq).toFixed(2);
        const newSolar = +(prev.solarGenerationMW + (Math.random() - 0.5) * 0.1).toFixed(2);
        const newWind = +(prev.windGenerationMW + (Math.random() - 0.5) * 0.08).toFixed(2);
        const newSoC = +(prev.bessSoC + (prev.bessPowerMW < 0 ? 0.05 : -0.05)).toFixed(1);
        const netDispatch = +(newSolar + newWind + prev.bessPowerMW).toFixed(2);

        return {
          ...prev,
          gridFrequency: Math.max(49.8, Math.min(50.2, newFreq)),
          solarGenerationMW: Math.max(0, newSolar),
          windGenerationMW: Math.max(0, newWind),
          bessSoC: Math.max(10, Math.min(99, newSoC)),
          gridImportExportMW: netDispatch
        };
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-screen font-sans">
      {/* Top Banner / SGrids Solvyn Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                Solvyn Grid OS <span className="text-xs px-2 py-0.5 ml-2 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-950/40">Powered by Siemens Eigen</span>
              </h1>
              <p className="text-xs text-slate-400">PPC Controller • BESS EMS • Multi-Source Renewable Dispatch (IEC 61850)</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">S7-1500 PPC: ACTIVE</span>
          </div>
          <button 
            onClick={() => setTelemetry(prev => ({ ...prev, bessPowerMW: prev.bessPowerMW < 0 ? 2.5 : -2.0 }))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Switch BESS Mode
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Net Active Power */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Net Dispatch</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{telemetry.gridImportExportMW}</span>
            <span className="text-xs text-slate-400">MW</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <span>● Exporting to 33kV Substation</span>
          </div>
        </div>

        {/* Grid Frequency */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Grid Frequency (PPC Droop)</span>
            <div className={`p-2 rounded-lg ${Math.abs(telemetry.gridFrequency - 50.0) < 0.08 ? 'bg-cyan-500/10 text-cyan-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{telemetry.gridFrequency}</span>
            <span className="text-xs text-slate-400">Hz</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
            <span>Target: 50.00 Hz (Droop: 4.0%)</span>
          </div>
        </div>

        {/* BESS SoC */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">BESS Battery State (SoC)</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <BatteryCharging className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{telemetry.bessSoC}</span>
            <span className="text-xs text-slate-400">%</span>
          </div>
          <div className="mt-2 text-[11px] text-purple-400 flex items-center gap-1">
            <span>{telemetry.bessPowerMW < 0 ? 'Charging from Solar (-1.8 MW)' : 'Discharging Peak (+2.5 MW)'}</span>
          </div>
        </div>

        {/* Carbon Offset */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Scope 2 Offset Today</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{telemetry.carbonOffsetTons}</span>
            <span className="text-xs text-slate-400">Tons CO₂e</span>
          </div>
          <div className="mt-2 text-[11px] text-teal-400 flex items-center gap-1">
            <span>ESG & CBAM Compliant Audit Log</span>
          </div>
        </div>
      </div>

      {/* Asset Breakdown Single-Line Diagram / Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left 2 Cols: Generation Sources */}
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            Hybrid Power Flow & Single-Line Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Solar Inverter Block */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sun className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">Solar PV Plant</span>
              </div>
              <p className="text-xl font-bold text-white">{telemetry.solarGenerationMW} <span className="text-xs text-slate-400">MW</span></p>
              <div className="mt-3 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between"><span>Inverters Online:</span><span className="text-slate-200">12 / 12</span></div>
                <div className="flex justify-between"><span>MPPT Efficiency:</span><span className="text-emerald-400">98.4%</span></div>
                <div className="flex justify-between"><span>PPC Setpoint:</span><span className="text-cyan-400">100% Uncurtailed</span></div>
              </div>
            </div>

            {/* Wind Turbine Block */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-sky-400 mb-2">
                <Wind className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">Wind Array</span>
              </div>
              <p className="text-xl font-bold text-white">{telemetry.windGenerationMW} <span className="text-xs text-slate-400">MW</span></p>
              <div className="mt-3 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between"><span>Turbines Active:</span><span className="text-slate-200">4 / 4</span></div>
                <div className="flex justify-between"><span>Wind Speed:</span><span className="text-slate-200">7.2 m/s</span></div>
                <div className="flex justify-between"><span>Pitch Angle:</span><span className="text-slate-200">1.8°</span></div>
              </div>
            </div>

            {/* BESS Container Block */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <BatteryCharging className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">BESS Container</span>
              </div>
              <p className="text-xl font-bold text-white">{Math.abs(telemetry.bessPowerMW)} <span className="text-xs text-slate-400">MW</span></p>
              <div className="mt-3 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between"><span>Cell Temp:</span><span className="text-emerald-400">{telemetry.bessTempC} °C</span></div>
                <div className="flex justify-between"><span>State of Health:</span><span className="text-emerald-400">99.1%</span></div>
                <div className="flex justify-between"><span>Cycle Count:</span><span className="text-slate-200">148</span></div>
              </div>
            </div>
          </div>

          {/* S7-1500 Controller Status Console */}
          <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <div className="text-slate-500 mb-1">// SIEMENS S7-1500 PPC AUTO-DISPATCH CYCLIC LOG (OB1 - 10ms)</div>
            <div>[FB_Solvyn_PPC]: Frequency deviation Δf = {(telemetry.gridFrequency - 50.0).toFixed(3)} Hz | Droop Response: OK</div>
            <div>[BESS_EMS_Manager]: Tariff Mode = OFF_PEAK | Absorbing excess solar generation</div>
            <div className="text-emerald-400">[IEC 61850 MMS Server]: Substation GOOSE trip circuit arm = READY</div>
          </div>
        </div>

        {/* Right Col: AI Intelligence (AURA) */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              AURA AI Optimization
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-semibold text-slate-200">Day-Ahead Solar Irradiance Forecast</div>
                <div className="text-[11px] text-slate-400 mt-1">Satellite model predicts cloud cover at 14:00. BESS dispatch ramp scheduled.</div>
                <div className="text-xs text-cyan-400 mt-2 font-mono">Accuracy: 96.2% (LSTM Model)</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-semibold text-slate-200">Dynamic Tariff Arbitrage</div>
                <div className="text-[11px] text-slate-400 mt-1">Peak window starts at 18:30 (₹8.40/kWh). Battery capacity reserved for peak discharge.</div>
                <div className="text-xs text-emerald-400 mt-2 font-mono">Projected Daily Savings: ₹42,500</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-xs font-semibold text-slate-200">Predictive Battery Cell Health</div>
                <div className="text-[11px] text-slate-400 mt-1">0 thermal or internal impedance anomalies detected across 4,200 LFP cells.</div>
                <div className="text-xs text-slate-300 mt-2 font-mono">Risk Level: ZERO</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
            Solvyn Platform Architecture • Full OT/IT Clean Energy Stack
          </div>
        </div>
      </div>
    </div>
  );
}
