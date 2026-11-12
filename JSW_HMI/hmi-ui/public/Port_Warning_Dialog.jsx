import React, { useState, useMemo } from 'react';

export default function GeneratedScreen() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metrics = [
    { id: 'm1', title: 'Coil Output', value: '1,248 Tons', delta: '+12.4%', status: 'positive', subtext: 'vs 1,110T target', sparkline: [40, 55, 60, 75, 82, 94] },
    { id: 'm2', title: 'Line Speed', value: '450 m/min', delta: 'Optimal', status: 'positive', subtext: 'Max capacity 500 m/min', sparkline: [88, 92, 90, 94, 96, 95] },
    { id: 'm3', title: 'Tension Reel Stability', value: '98.5%', delta: '-0.3%', status: 'warning', subtext: 'Minor flutter detected', sparkline: [99, 99, 98, 98, 97, 98.5] },
    { id: 'm4', title: 'Critical Alerts', value: '0 Active', delta: '-2 Resolved', status: 'positive', subtext: 'All PLCs responding', sparkline: [3, 2, 2, 1, 0, 0] }
  ];

  const plcNodes = [
    { id: 'PLC_LINE4_ENTRY', ip: '192.168.1.101', vendor: 'Siemens S7-1500', cycle: '4.2ms', status: 'ONLINE', tags: 1420 },
    { id: 'PLC_MILL_STAND_1', ip: '192.168.1.102', vendor: 'Rockwell ControlLogix', cycle: '2.8ms', status: 'ONLINE', tags: 2840 },
    { id: 'PLC_MILL_STAND_2', ip: '192.168.1.103', vendor: 'Rockwell ControlLogix', cycle: '2.9ms', status: 'ONLINE', tags: 2790 },
    { id: 'PLC_TENSION_EXIT', ip: '192.168.1.104', vendor: 'Siemens S7-1500', cycle: '3.6ms', status: 'ONLINE', tags: 1680 },
    { id: 'PLC_COIL_CAR_AUTO', ip: '192.168.1.105', vendor: 'Schneider Modicon', cycle: '8.1ms', status: 'STANDBY', tags: 640 },
    { id: 'PLC_SAFETY_INTERLOCK', ip: '192.168.1.106', vendor: 'Pilz PNOZmulti', cycle: '1.2ms', status: 'ONLINE', tags: 320 }
  ];

  const analyticsKpis = [
    { label: 'Overall Equipment Effectiveness (OEE)', current: '89.4%', target: '85.0%' },
    { label: 'Mean Time Between Failures (MTBF)', current: '142 hrs', target: '120 hrs' },
    { label: 'Specific Energy Consumption', current: '74 kWh/T', target: '< 80 kWh/T' },
    { label: 'Surface Defect Rate (PPM)', current: '42 PPM', target: '< 50 PPM' }
  ];

  const safetyLogs = [
    { code: 'FLT-092', level: 'INFO', desc: 'Hydraulic Looper pressure auto-calibrated', ts: '11:42:10 AM' },
    { code: 'WRN-041', level: 'WARN', desc: 'Roll temperature sensor drift Stand 2 (+1.4°C)', ts: '10:15:22 AM' },
    { code: 'CLR-019', level: 'RESOLVED', desc: 'Exit guide interlock test cleared successfully', ts: '08:30:00 AM' }
  ];

  const initialBatches = [
    { id: 'COIL-78921', grade: '0.8mm CR Steel', stage: 'PROCESSING', progress: 94, speed: '448 m/min', operator: 'Shift A' },
    { id: 'COIL-78922', grade: '1.2mm Galvanized', stage: 'QUEUED', progress: 0, speed: '0 m/min', operator: 'Shift A' },
    { id: 'COIL-78923', grade: '0.5mm Tinplate', stage: 'INSPECTION', progress: 100, speed: '0 m/min', operator: 'QC Lab' },
    { id: 'COIL-78924', grade: '2.0mm Hot-Rolled', stage: 'PROCESSING', progress: 42, speed: '420 m/min', operator: 'Shift B' },
    { id: 'COIL-78925', grade: '1.0mm Dual-Phase', stage: 'QUEUED', progress: 0, speed: '0 m/min', operator: 'Shift B' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredBatches = useMemo(() => {
    return (initialBatches || []).filter(b => {
      const q = (searchQuery || '').toLowerCase().trim();
      const idStr = String(b.id || '').toLowerCase();
      const gradeStr = String(b.grade || '').toLowerCase();
      const matchesSearch = !q || idStr.includes(q) || gradeStr.includes(q);
      const matchesStage = filterStage === 'ALL' || b.stage === filterStage;
      return matchesSearch && matchesStage;
    });
  }, [searchQuery, filterStage]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col lg:flex-row font-sans antialiased w-full">
      <aside className="w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0f172a]/95 flex flex-col shrink-0">
        <div className="p-4 lg:p-5 border-b border-white/10 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 text-xs">
              JSW
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-white">Steel Monitor</h2>
              <p className="text-[10px] text-cyan-400 font-mono">PLANT-LINE-04</p>
            </div>
          </div>
          <div className="lg:hidden text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ONLINE
          </div>
        </div>

        <nav className="p-2 lg:p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {['Dashboard', 'Analytics', 'PLC Network', 'Safety & Faults', 'Reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveNav(tab)}
              className={`whitespace-nowrap lg:whitespace-normal px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between gap-3 shrink-0 ${
                activeNav === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab}</span>
              {tab === 'PLC Network' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex p-4 border-t border-white/10 bg-black/20 text-[11px] text-slate-400 items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>OPC-UA Live</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">v2.4.1</span>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="border-b border-white/10 px-5 lg:px-7 py-3.5 bg-[#111827]/60 backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm lg:text-base font-bold text-white tracking-tight">Cold Rolling Mill &bull; Line 4 Overview</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ONLINE</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Autonomous SCADA Telemetry & Batch Quality Feed</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={handleRefresh} className={`p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition text-xs ${isRefreshing ? 'animate-spin' : ''}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <button className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20">
              Export MES Telemetry
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-5">
          {activeNav === 'Dashboard' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {metrics.map(m => (
                  <div key={m.id} className="bg-[#1e293b]/70 border border-white/10 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-medium tracking-wide uppercase text-[10px]">{m.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${m.status === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {m.delta}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-baseline justify-between">
                      <span className="text-xl lg:text-2xl font-black text-white">{m.value}</span>
                      <span className="text-[10px] text-slate-400">{m.subtext}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#1e293b]/70 border border-white/10 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <h3 className="text-xs lg:text-sm font-bold text-white">Active Production Batches</h3>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <input
                      type="text"
                      placeholder="Search Coil..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-3 pr-3 py-1 bg-[#0b0f17] border border-white/10 rounded-lg text-xs text-slate-200"
                    />
                    <div className="flex bg-[#0b0f17] p-0.5 rounded-lg border border-white/10 text-xs">
                      {['ALL', 'PROCESSING', 'QUEUED'].map(stage => (
                        <button key={stage} onClick={() => setFilterStage(stage)} className={`px-2 py-0.5 rounded text-[10px] ${filterStage === stage ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 min-w-[600px]">
                    <tbody className="divide-y divide-white/5 font-mono">
                      {filteredBatches.map(b => (
                        <tr key={b.id} className="hover:bg-white/[0.03]">
                          <td className="py-3 px-4 font-bold text-white">{b.id}</td>
                          <td className="py-3 px-4">{b.grade}</td>
                          <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400">{b.stage}</span></td>
                          <td className="py-3 px-4">{b.progress}%</td>
                          <td className="py-3 px-4">{b.speed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeNav === 'PLC Network' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plcNodes.map(plc => (
                <div key={plc.id} className="bg-[#1e293b]/70 border border-white/10 p-4 rounded-xl">
                  <span className="font-mono text-xs font-bold text-white">{plc.id}</span>
                  <p className="text-xs text-slate-400 mt-1">{plc.vendor}</p>
                  <p className="text-[11px] font-mono text-cyan-400 mt-2">Cycle: {plc.cycle} &bull; {plc.status}</p>
                </div>
              ))}
            </div>
          )}

          {activeNav === 'Analytics' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analyticsKpis.map((kpi, idx) => (
                <div key={idx} className="bg-[#1e293b]/70 border border-white/10 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">{kpi.label}</span>
                  <p className="text-2xl font-black text-white mt-1">{kpi.current}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}