import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  Pause, 
  RotateCw, 
  Layers, 
  Server, 
  Sliders, 
  TrendingUp,
  AlertTriangle,
  Radio,
  CheckCircle2,
  HardDrive,
  Gauge,
  Power,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Maximize2,
  Lock,
  Unlock,
  Wrench,
  Zap,
  Volume2,
  Check
} from 'lucide-react';

export default function LineMB200HMI() {
  // Navigation Screens matching Siemens MTP1500 Panel
  const [activeScreen, setActiveScreen] = useState('OVERVIEW'); // 'OVERVIEW', 'BSL010', 'BSL015', 'BSL020', 'SEW_DRIVES', 'ALARMS'
  
  // Real PLC Tags from Line MB150/MB200 SICAR Standard
  const [tags, setTags] = useState({
    // Line Coordination
    Line_Auto_Running: true,
    Operating_Mode: 'AUTO', // 'AUTO', 'MANUAL', 'TIPTRONIC'
    Safety_OK: true,
    E_Stop_Active: false,
    Fault_Active: false,
    CycleTimeSeconds: 42.4,
    TotalParts: 1420,
    TargetParts: 1500,

    // Station BSL010 (Clamping & Part Seating)
    BSL010_DK01_Clamp_Adv: true,
    BSL010_DK01_Clamp_Ret: false,
    BSL010_DK02_Locator_Up: true,
    BSL010_Part_Seated: true,
    BSL010_StepNumber: 12,
    BSL010_CycleTime: 18.2,

    // Station BSL015 (KUKA Welding Robot R01)
    BSL015_R01_InHome: false,
    BSL015_R01_Working: true,
    BSL015_R01_ReleasePermitted: true,
    BSL015_WeldHead_Clamped: true,
    BSL015_Gas_Flow_OK: true,
    BSL015_StepNumber: 24,
    BSL015_CycleTime: 28.5,

    // Station BSL020 (Lifter & Indexing Shuttle)
    BSL020_Lifter_UpperPos: true,
    BSL020_Lifter_LowerPos: false,
    BSL020_Shuttle_InPos: true,
    BSL020_SafetyGate_Closed: true,
    BSL020_StepNumber: 8,
    BSL020_CycleTime: 14.1,

    // SEW Movidrive Servo Axes (MB220-XM1, YM1, MB210-U1)
    SEW_XM1_ActPos: 420.5,
    SEW_XM1_SetPos: 420.0,
    SEW_XM1_Speed_RPM: 1200,
    SEW_XM1_Torque_Nm: 24.8,
    SEW_YM1_ActPos: 185.2,
    SEW_YM1_SetPos: 185.0,
    SEW_YM1_Speed_RPM: 950,
    SEW_YM1_Torque_Nm: 18.2,
    SEW_U1_BeltSpeed_RPM: 1450,
    Drive_Ready: true,

    // Active Alarms Buffer
    ActiveAlarms: [
      { id: 1042, time: '14:02:15', station: 'BSL015', text: 'Warning: Welding Wire Spool < 15% Remaining', level: 'WARN' },
      { id: 1018, time: '13:48:30', station: 'SEW_XM1', text: 'Notice: Axis Lubrication Cycle Due in 4 Hours', level: 'INFO' }
    ]
  });

  const [connected, setConnected] = useState(true);
  const [pressedButtons, setPressedButtons] = useState({});
  const wsRef = useRef(null);

  // WebSocket Connection to JSW Backend Gateway
  useEffect(() => {
    let isSubscribed = true;
    function connect() {
      const wsUrl = `ws://${window.location.hostname}:5055/ws/siemens-hmi`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => isSubscribed && setConnected(true);
      ws.onmessage = (e) => {
        if (!isSubscribed) return;
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === 'UPDATE' || payload.type === 'SNAPSHOT') {
            setTags(prev => ({ ...prev, ...payload.data }));
          }
        } catch (_) {}
      };
      ws.onclose = () => {
        if (!isSubscribed) return;
        setConnected(false);
        setTimeout(connect, 3000);
      };
    }
    connect();
    return () => { isSubscribed = false; wsRef.current?.close(); };
  }, []);

  // Momentary Button Click Handlers (Emulates Physical Touchscreen HMI SetBitWhileKeyPressed)
  const handleButtonDown = (buttonId, tagKey, value) => {
    setPressedButtons(prev => ({ ...prev, [buttonId]: true }));
    setTags(prev => ({ ...prev, [tagKey]: value }));

    // Send command to PLC gateway
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        action: 'WRITE_TAG',
        tag: tagKey,
        value: value
      }));
    }
  };

  const handleButtonUp = (buttonId, tagKey, resetValue) => {
    setPressedButtons(prev => ({ ...prev, [buttonId]: false }));
    if (resetValue !== undefined) {
      setTags(prev => ({ ...prev, [tagKey]: resetValue }));
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          action: 'WRITE_TAG',
          tag: tagKey,
          value: resetValue
        }));
      }
    }
  };

  // Toggle Functionality
  const toggleTag = (tagKey) => {
    const newVal = !tags[tagKey];
    setTags(prev => ({ ...prev, [tagKey]: newVal }));
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: 'WRITE_TAG', tag: tagKey, value: newVal }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e222b] text-slate-100 font-sans select-none rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
      
      {/* 1. MTP1500 TOP STATUS & COORDINATION BAR (Siemens SICAR Standard) */}
      <div className="bg-[#14171f] border-b border-slate-700 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Line Identifier & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-sky-400">
            <Cpu className="h-4 w-4" />
            <span>LINE MB150 / MB200</span>
          </div>
          <div className="text-xs font-medium text-slate-300">
            PLC: <span className="font-mono text-emerald-400">CPU 1517F-3 PN/DP</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`h-2.5 w-2.5 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-slate-400">{connected ? 'PLC Online (10ms)' : 'Reconnecting...'}</span>
          </div>
        </div>

        {/* Center: Mode Indicator & Emergency Status */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded text-xs font-bold tracking-wider uppercase border ${
            tags.Operating_Mode === 'AUTO' ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400' :
            tags.Operating_Mode === 'MANUAL' ? 'bg-amber-950/70 border-amber-500 text-amber-400' :
            'bg-sky-950/70 border-sky-500 text-sky-400'
          }`}>
            MODE: {tags.Operating_Mode}
          </div>

          <div className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold border ${
            tags.Safety_OK ? 'bg-emerald-950/50 border-emerald-600/60 text-emerald-400' : 'bg-rose-950 border-rose-500 text-rose-400'
          }`}>
            {tags.Safety_OK ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            <span>{tags.Safety_OK ? 'SAFETY OK' : 'SAFETY TRIPPED'}</span>
          </div>
        </div>

        {/* Right: Master Coordination Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleTag('Line_Auto_Running')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition shadow ${
              tags.Line_Auto_Running ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {tags.Line_Auto_Running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {tags.Line_Auto_Running ? 'STOP LINE' : 'START AUTO'}
          </button>

          <button 
            onClick={() => setTags(prev => ({ 
              ...prev, 
              Operating_Mode: prev.Operating_Mode === 'AUTO' ? 'MANUAL' : prev.Operating_Mode === 'MANUAL' ? 'TIPTRONIC' : 'AUTO' 
            }))}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200"
          >
            SWITCH MODE
          </button>

          <button 
            onClick={() => setTags(prev => ({ ...prev, ActiveAlarms: [] }))}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-800 border border-rose-700 text-xs font-semibold text-rose-200"
          >
            <Check className="h-3.5 w-3.5" />
            ACK ALARMS
          </button>
        </div>
      </div>

      {/* 2. MTP1500 NAVIGATION TABS */}
      <div className="bg-[#181c24] border-b border-slate-700 px-4 py-1.5 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'OVERVIEW', label: '1. Plant Overview' },
          { id: 'BSL010', label: '2. BSL010 (Clamping)' },
          { id: 'BSL015', label: '3. BSL015 (R01 Robot)' },
          { id: 'BSL020', label: '4. BSL020 (Lifter/Shuttle)' },
          { id: 'SEW_DRIVES', label: '5. SEW Servo Axes' },
          { id: 'ALARMS', label: `6. Alarm Table (${tags.ActiveAlarms.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id)}
            className={`px-3.5 py-1.5 rounded-t-md transition font-semibold flex items-center gap-1.5 ${
              activeScreen === tab.id 
                ? 'bg-[#242936] text-sky-400 border-t-2 border-sky-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. DYNAMIC HMI SCREEN CONTENT */}
      <div className="flex-1 p-5 overflow-y-auto bg-[#1a1e27]">
        
        {/* ======================================================== */}
        {/* SCREEN 1: OVERVIEW */}
        {/* ======================================================== */}
        {activeScreen === 'OVERVIEW' && (
          <div className="space-y-5">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#212634] border border-slate-700/80 rounded-lg p-3">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Takt Cycle Time</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">{tags.CycleTimeSeconds}s</div>
                <div className="text-[10px] text-emerald-400 mt-1">● Target: 45.0s (Nominal)</div>
              </div>
              <div className="bg-[#212634] border border-slate-700/80 rounded-lg p-3">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Production Completed</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">{tags.TotalParts} / {tags.TargetParts}</div>
                <div className="text-[10px] text-cyan-400 mt-1">● Shift Progress: 94.6%</div>
              </div>
              <div className="bg-[#212634] border border-slate-700/80 rounded-lg p-3">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Line Status</span>
                <div className={`text-2xl font-bold mt-1 ${tags.Line_Auto_Running ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {tags.Line_Auto_Running ? 'AUTOMATIC' : 'STANDBY'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">PROFINET Bus: 100% Health</div>
              </div>
              <div className="bg-[#212634] border border-slate-700/80 rounded-lg p-3">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Safety Circuit</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">CLOSED</div>
                <div className="text-[10px] text-emerald-400 mt-1">Dual-Channel Fail-Safe OK</div>
              </div>
            </div>

            {/* Visual Line Diagram with Interactive Stations */}
            <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-400" />
                Line MB150/MB200 Synchronous Flow Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Station 1 Card */}
                <div 
                  onClick={() => setActiveScreen('BSL010')}
                  className="p-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 cursor-pointer transition hover:border-sky-500 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sky-400">Station BSL010</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">PART SEATED</span>
                  </div>
                  <p className="text-xs text-slate-300">Pneumatic Clamping & Positioning</p>
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Clamp 01: <strong className="text-emerald-400">{tags.BSL010_DK01_Clamp_Adv ? 'ADVANCED' : 'RETRACTED'}</strong></span>
                    <span>Step: <strong>{tags.BSL010_StepNumber}</strong></span>
                  </div>
                  <div className="mt-3 text-[11px] text-sky-400 group-hover:underline flex items-center gap-1">
                    Open Station Screen <ChevronRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Station 2 Card */}
                <div 
                  onClick={() => setActiveScreen('BSL015')}
                  className="p-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 cursor-pointer transition hover:border-sky-500 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sky-400">Station BSL015</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">ROBOT BUSY</span>
                  </div>
                  <p className="text-xs text-slate-300">KUKA Robot R01 Spot Welding</p>
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Release: <strong className="text-emerald-400">{tags.BSL015_R01_ReleasePermitted ? 'PERMITTED' : 'HELD'}</strong></span>
                    <span>Step: <strong>{tags.BSL015_StepNumber}</strong></span>
                  </div>
                  <div className="mt-3 text-[11px] text-sky-400 group-hover:underline flex items-center gap-1">
                    Open Station Screen <ChevronRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Station 3 Card */}
                <div 
                  onClick={() => setActiveScreen('BSL020')}
                  className="p-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 cursor-pointer transition hover:border-sky-500 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sky-400">Station BSL020</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">LIFTER UP</span>
                  </div>
                  <p className="text-xs text-slate-300">Vertical Lifter & Indexing Shuttle</p>
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Position: <strong className="text-purple-400">{tags.BSL020_Lifter_UpperPos ? 'UPPER LIMIT' : 'LOWER LIMIT'}</strong></span>
                    <span>Step: <strong>{tags.BSL020_StepNumber}</strong></span>
                  </div>
                  <div className="mt-3 text-[11px] text-sky-400 group-hover:underline flex items-center gap-1">
                    Open Station Screen <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 2: BSL010 (CLAMPS & PNEUMATICS) */}
        {/* ======================================================== */}
        {activeScreen === 'BSL010' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-sky-400" />
                Station BSL010 — Pneumatic Clamping & Part Seating
              </h2>
              <span className="text-xs font-mono text-slate-400">DB_BSL010 / SICAR FB110</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cylinder 1: Clamp DK01 */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Clamp Cylinder DK01</h3>
                <div className="flex items-center gap-4 my-3">
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    tags.BSL010_DK01_Clamp_Adv ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● ADVANCED (E0.4)
                  </div>
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    !tags.BSL010_DK01_Clamp_Adv ? 'bg-amber-950 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● RETRACTED (E0.5)
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onMouseDown={() => handleButtonDown('b1', 'BSL010_DK01_Clamp_Adv', true)}
                    className="flex-1 py-2.5 rounded bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-xs font-bold text-white transition shadow"
                  >
                    ADVANCE CLAMP (A4.1)
                  </button>
                  <button 
                    onMouseDown={() => handleButtonDown('b2', 'BSL010_DK01_Clamp_Adv', false)}
                    className="flex-1 py-2.5 rounded bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-xs font-bold text-white transition shadow"
                  >
                    RETRACT CLAMP (A4.2)
                  </button>
                </div>
              </div>

              {/* Cylinder 2: Part Seating Locator */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Locator Cylinder DK02</h3>
                <div className="flex items-center gap-4 my-3">
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    tags.BSL010_DK02_Locator_Up ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● LOCATOR UP (E0.6)
                  </div>
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    !tags.BSL010_DK02_Locator_Up ? 'bg-amber-950 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● LOCATOR DOWN (E0.7)
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => toggleTag('BSL010_DK02_Locator_Up')}
                    className="flex-1 py-2.5 rounded bg-sky-700 hover:bg-sky-600 active:bg-sky-800 text-xs font-bold text-white transition shadow"
                  >
                    TOGGLE LOCATOR (A4.3)
                  </button>
                  <button 
                    onClick={() => toggleTag('BSL010_Part_Seated')}
                    className={`flex-1 py-2.5 rounded text-xs font-bold text-white transition shadow ${
                      tags.BSL010_Part_Seated ? 'bg-emerald-800' : 'bg-rose-800'
                    }`}
                  >
                    PART SENSOR: {tags.BSL010_Part_Seated ? 'DETECTED' : 'EMPTY'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 3: BSL015 (KUKA WELDING ROBOT R01) */}
        {/* ======================================================== */}
        {activeScreen === 'BSL015' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-sky-400" />
                Station BSL015 — KUKA Robot R01 Spot Welding Handshake
              </h2>
              <span className="text-xs font-mono text-slate-400">DB_BSL015_R01 / KUKA KRC4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Interlocks */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-3">Robot Safety Interlocks</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-800/80 rounded">
                    <span>Robot In Home (A20.0):</span>
                    <strong className={tags.BSL015_R01_InHome ? 'text-emerald-400' : 'text-slate-400'}>
                      {tags.BSL015_R01_InHome ? 'TRUE' : 'FALSE'}
                    </strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-800/80 rounded">
                    <span>Release Permitted (E12.1):</span>
                    <strong className="text-emerald-400">PERMITTED</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-800/80 rounded">
                    <span>Weld Shielding Gas:</span>
                    <strong className="text-emerald-400">PRESSURE OK</strong>
                  </div>
                </div>
              </div>

              {/* Pushbutton Commands */}
              <div className="md:col-span-2 bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-3">Operator Commands & Step Execution</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => toggleTag('BSL015_R01_ReleasePermitted')}
                    className={`py-3 rounded text-xs font-bold text-white transition shadow ${
                      tags.BSL015_R01_ReleasePermitted ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-slate-700'
                    }`}
                  >
                    {tags.BSL015_R01_ReleasePermitted ? 'RELEASE ROBOT (ACTIVE)' : 'HOLD ROBOT'}
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, BSL015_R01_InHome: !prev.BSL015_R01_InHome }))}
                    className="py-3 rounded bg-sky-700 hover:bg-sky-600 active:bg-sky-800 text-xs font-bold text-white transition shadow"
                  >
                    HOME POSITION REQUEST
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, BSL015_StepNumber: prev.BSL015_StepNumber + 1 }))}
                    className="py-3 rounded bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200"
                  >
                    STEP ADVANCE (TIPTRONIC)
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, BSL015_StepNumber: 1 }))}
                    className="py-3 rounded bg-amber-900/60 hover:bg-amber-800 border border-amber-700 text-xs font-bold text-amber-200"
                  >
                    RESET STEP SEQUENCE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 4: BSL020 (LIFTER & SHUTTLE) */}
        {/* ======================================================== */}
        {activeScreen === 'BSL020' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-400" />
                Station BSL020 — Vertical Lifter & Indexing Shuttle
              </h2>
              <span className="text-xs font-mono text-slate-400">DB_BSL020 / SICAR LP01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lifter Controls */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Vertical Lifter LP01</h3>
                <div className="flex items-center gap-4 my-3">
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    tags.BSL020_Lifter_UpperPos ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● UPPER LIMIT (E4.0)
                  </div>
                  <div className={`p-2 rounded text-xs font-bold flex-1 text-center border ${
                    !tags.BSL020_Lifter_UpperPos ? 'bg-amber-950 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    ● LOWER LIMIT (E4.1)
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, BSL020_Lifter_UpperPos: true }))}
                    className="flex-1 py-2.5 rounded bg-sky-700 hover:bg-sky-600 text-xs font-bold text-white"
                  >
                    MOVE LIFTER UP
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, BSL020_Lifter_UpperPos: false }))}
                    className="flex-1 py-2.5 rounded bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white"
                  >
                    MOVE LIFTER DOWN
                  </button>
                </div>
              </div>

              {/* Shuttle Controls */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Indexing Shuttle Transfer</h3>
                <div className="p-3 bg-slate-800 rounded mb-4 text-xs space-y-1">
                  <div className="flex justify-between"><span>Shuttle Position:</span><strong className="text-emerald-400">IN POSITION</strong></div>
                  <div className="flex justify-between"><span>Light Curtain:</span><strong className="text-emerald-400">CLEAR (UNBLOCKED)</strong></div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleTag('BSL020_Shuttle_InPos')}
                    className="flex-1 py-2.5 rounded bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white"
                  >
                    CYCLE SHUTTLE FWD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 5: SEW MOVIDRIVE SERVO AXES */}
        {/* ======================================================== */}
        {activeScreen === 'SEW_DRIVES' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 text-sky-400" />
                SEW Movidrive & MTX Servo Drives
              </h2>
              <span className="text-xs font-mono text-slate-400">GSDML-V2.25-SEW-MTX / PROFINET</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Axis 1 */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-200">Axis MB220-XM1 (X-Transfer)</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">DRIVE READY</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2 bg-slate-800 rounded"><span>Act Pos:</span> <strong className="text-white font-mono">{tags.SEW_XM1_ActPos} mm</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Set Pos:</span> <strong className="text-sky-400 font-mono">{tags.SEW_XM1_SetPos} mm</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Speed:</span> <strong className="text-white font-mono">{tags.SEW_XM1_Speed_RPM} RPM</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Torque:</span> <strong className="text-white font-mono">{tags.SEW_XM1_Torque_Nm} Nm</strong></div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, SEW_XM1_ActPos: +(prev.SEW_XM1_ActPos + 10).toFixed(1) }))}
                    className="flex-1 py-2 rounded bg-sky-700 hover:bg-sky-600 text-xs font-bold text-white"
                  >
                    JOG POS (+)
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, SEW_XM1_ActPos: +(prev.SEW_XM1_ActPos - 10).toFixed(1) }))}
                    className="flex-1 py-2 rounded bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white"
                  >
                    JOG NEG (-)
                  </button>
                </div>
              </div>

              {/* Axis 2 */}
              <div className="bg-[#212634] border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-200">Axis MB220-YM1 (Y-Gantry)</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">DRIVE READY</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2 bg-slate-800 rounded"><span>Act Pos:</span> <strong className="text-white font-mono">{tags.SEW_YM1_ActPos} mm</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Set Pos:</span> <strong className="text-sky-400 font-mono">{tags.SEW_YM1_SetPos} mm</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Speed:</span> <strong className="text-white font-mono">{tags.SEW_YM1_Speed_RPM} RPM</strong></div>
                  <div className="p-2 bg-slate-800 rounded"><span>Torque:</span> <strong className="text-white font-mono">{tags.SEW_YM1_Torque_Nm} Nm</strong></div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, SEW_YM1_ActPos: +(prev.SEW_YM1_ActPos + 10).toFixed(1) }))}
                    className="flex-1 py-2 rounded bg-sky-700 hover:bg-sky-600 text-xs font-bold text-white"
                  >
                    JOG POS (+)
                  </button>
                  <button 
                    onClick={() => setTags(prev => ({ ...prev, SEW_YM1_ActPos: +(prev.SEW_YM1_ActPos - 10).toFixed(1) }))}
                    className="flex-1 py-2 rounded bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white"
                  >
                    JOG NEG (-)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 6: ALARMS */}
        {/* ======================================================== */}
        {activeScreen === 'ALARMS' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Active Alarms & Diagnostic Buffer (BSL020 Standard)
              </h2>
              <button 
                onClick={() => setTags(prev => ({ ...prev, ActiveAlarms: [] }))}
                className="px-3 py-1 bg-rose-800 hover:bg-rose-700 rounded text-xs font-bold text-white"
              >
                Acknowledge All Alarms
              </button>
            </div>

            <div className="bg-[#212634] border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181c24] text-slate-400 border-b border-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3">Alarm ID</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Station / Device</th>
                    <th className="p-3">Alarm Description</th>
                    <th className="p-3">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-mono">
                  {tags.ActiveAlarms.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-slate-500 font-sans">
                        No active alarms in PLC diagnostic buffer. Line running normal.
                      </td>
                    </tr>
                  ) : (
                    tags.ActiveAlarms.map(alarm => (
                      <tr key={alarm.id} className="hover:bg-slate-800/40">
                        <td className="p-3 text-sky-400">{alarm.id}</td>
                        <td className="p-3 text-slate-300">{alarm.time}</td>
                        <td className="p-3 text-slate-200">{alarm.station}</td>
                        <td className="p-3 text-slate-100 font-sans">{alarm.text}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            alarm.level === 'WARN' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-sky-950 text-sky-400 border border-sky-800'
                          }`}>
                            {alarm.level}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* 4. MTP1500 FOOTER BAR */}
      <div className="bg-[#14171f] border-t border-slate-700 px-4 py-2 flex justify-between items-center text-[11px] text-slate-400">
        <div>Siemens WinCC Unified MTP1500 Comfort • Runtime Emulation V20.0 Upd4</div>
        <div className="font-mono text-slate-500">Project: MB150_200_30072026_R32.ap20</div>
      </div>
    </div>
  );
}
