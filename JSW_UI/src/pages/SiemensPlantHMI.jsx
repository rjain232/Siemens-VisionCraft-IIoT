import React, { useState, useEffect, useRef } from 'react';

export default function SiemensPlantHMI() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0); // 0..4 (5 screens from pptx)
  const [pressedBtn, setPressedBtn] = useState(null);

  // Screens extracted directly from D:\TIA v20\hmi screen.pptx
  const screens = [
    { id: 'STATION_OVERVIEW', name: 'Type', label: '1. Station Overview', img: '/hmi_assets/image1.png' },
    { id: 'STATION_MODIFY', name: 'Style.Modify', label: '2. Station Modify', img: '/hmi_assets/image2.png' },
    { id: 'ROBOT_STATUS', name: 'Robot', label: '3. Robot Status', img: '/hmi_assets/image3.png' },
    { id: 'SYSTEM_SETTINGS', name: 'System', label: '4. System & Settings', img: '/hmi_assets/image4.png' },
    { id: 'PRODUCTION_STATUS', name: 'ProdData', label: '5. Production Status', img: '/hmi_assets/image5.png' },
  ];

  // Dynamic tag state from D:\TIA v20\hmi tags.xlsx
  const [tags, setTags] = useState({
    Line_Auto_Running: true,
    Operating_Mode: 'AUTO',
    UserTags_Hardware_Acknowledge: false,
    Alarm_Mute: false,
    AlarmText: 'LineHighAlarm.Astop.Astop_140LHLC1 : 140LHLoadLC1_Grating fault',
    MB140_SeqNo: 104,
    MB140_BIW_No: 2045,
    MB140_Variant: 'Variant A',
    WeldSpotCountSummary: 48,
    DayActualProduction: 840,
    PLC_PreviousCycleTime: 55,
  });

  const wsRef = useRef(null);

  // Connect to Backend WebSocket
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsPort = window.location.port === '5055' ? '5055' : '5055';
    const wsUrl = `${protocol}//${window.location.hostname}:${wsPort}/ws/siemens-hmi`;
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'TAGS_UPDATE' || payload.type === 'UPDATE' || payload.type === 'SNAPSHOT') {
            setTags(prev => ({ ...prev, ...payload.data }));
          }
        } catch (_) {}
      };
    } catch (e) {}

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const sendTagCommand = (tag, value, btnId) => {
    setPressedBtn(btnId);
    setTimeout(() => setPressedBtn(null), 300);
    setTags(prev => ({ ...prev, [tag]: value }));

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'WRITE_TAG', action: 'WRITE_TAG', tag, value }));
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-black text-white font-sans select-none overflow-hidden items-center justify-center p-2">
      
      {/* 16:9 Industrial Panel Bezel (Siemens SIMATIC HMI Unified Comfort MTP1500 frame) */}
      <div className="relative w-full max-w-[1550px] aspect-[16/9] max-h-[92vh] bg-slate-900 border-4 border-slate-700 rounded shadow-2xl overflow-hidden flex flex-col">
        
        {/* ===================================================================== */}
        {/* EXACT BACKGROUND LAYER (Rendered 1:1 Pixel-Perfect from Siemens TIA) */}
        {/* ===================================================================== */}
        <div className="absolute inset-0 z-0">
          <img 
            src={screens[activeScreenIndex].img} 
            alt={screens[activeScreenIndex].name}
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        {/* ===================================================================== */}
        {/* INTERACTIVE CLICKABLE TOUCH HOTSPOTS (Overlaying exact TIA Buttons)  */}
        {/* ===================================================================== */}
        <div className="relative z-10 w-full h-full">

          {/* 1. Header ON/OFF Button (Top Left) */}
          <button 
            onClick={() => sendTagCommand('Line_Auto_Running', !tags.Line_Auto_Running, 'ONOFF')}
            className={`absolute top-[0.6%] left-[0.4%] w-[6.4%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'ONOFF' ? 'border-yellow-300 bg-yellow-500/40' : 'hover:border-yellow-400/80 bg-transparent'
            }`}
            title="Toggle ON/OFF"
          />

          {/* 2. Header START Button */}
          <button 
            onClick={() => sendTagCommand('Line_Auto_Running', true, 'START')}
            className={`absolute top-[0.6%] left-[6.9%] w-[6.4%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'START' ? 'border-sky-300 bg-sky-500/40' : 'hover:border-sky-400/80 bg-transparent'
            }`}
            title="Line START"
          />

          {/* 3. Header AUTO Button */}
          <button 
            onClick={() => sendTagCommand('Operating_Mode', 'AUTO', 'AUTO')}
            className={`absolute top-[0.6%] left-[13.4%] w-[6.4%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'AUTO' ? 'border-sky-300 bg-sky-500/40' : 'hover:border-sky-400/80 bg-transparent'
            }`}
            title="Operating Mode AUTO"
          />

          {/* 4. Header MANUAL Button */}
          <button 
            onClick={() => sendTagCommand('Operating_Mode', 'MANUAL', 'MANUAL')}
            className={`absolute top-[0.6%] left-[19.9%] w-[6.4%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'MANUAL' ? 'border-amber-300 bg-amber-500/40' : 'hover:border-amber-400/80 bg-transparent'
            }`}
            title="Operating Mode MANUAL"
          />

          {/* 5. Header ALARM MUTE */}
          <button 
            onClick={() => sendTagCommand('Alarm_Mute', !tags.Alarm_Mute, 'MUTE')}
            className={`absolute top-[0.6%] left-[71.5%] w-[6.2%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'MUTE' ? 'border-blue-300 bg-blue-500/40' : 'hover:border-blue-400/80 bg-transparent'
            }`}
            title="Alarm Mute"
          />

          {/* 6. Header RESET ALL */}
          <button 
            onClick={() => {
              sendTagCommand('UserTags_Hardware_Acknowledge', true, 'RESET');
              setTimeout(() => sendTagCommand('UserTags_Hardware_Acknowledge', false, 'RESET'), 500);
            }}
            className={`absolute top-[0.6%] left-[78.0%] w-[6.2%] h-[8%] rounded cursor-pointer transition border-2 ${
              pressedBtn === 'RESET' ? 'border-red-300 bg-red-500/40' : 'hover:border-red-400/80 bg-transparent'
            }`}
            title="RESET All (Hardware Acknowledge)"
          />

          {/* 7. Header HOME Icon */}
          <button 
            onClick={() => setActiveScreenIndex(0)}
            className="absolute top-[0.6%] left-[93.5%] w-[4.5%] h-[8%] rounded cursor-pointer transition border-2 hover:border-white/80 bg-transparent"
            title="Back to Station Overview"
          />

          {/* 8. Back Button (Top Left of Body) */}
          <button 
            onClick={() => setActiveScreenIndex(0)}
            className="absolute top-[13.0%] left-[0.4%] w-[6.4%] h-[8%] rounded cursor-pointer transition border-2 hover:border-white/80 bg-transparent"
            title="Back"
          />

          {/* =================================================================== */}
          {/* RIGHT SIDEBAR NAVIGATION MENU (Exact Hotspots from TIA WinCC)       */}
          {/* =================================================================== */}
          
          {/* Menu 1: Type (Slide 1: Station Overview) */}
          <button 
            onClick={() => setActiveScreenIndex(0)}
            className={`absolute top-[8.8%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 ${
              activeScreenIndex === 0 ? 'border-white bg-white/20' : 'hover:border-sky-300 bg-transparent'
            }`}
            title="Screen 1: Type / Station Data Overview"
          />

          {/* Menu 2: Robot (Slide 3: Robot Status) */}
          <button 
            onClick={() => setActiveScreenIndex(2)}
            className={`absolute top-[17.5%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 ${
              activeScreenIndex === 2 ? 'border-white bg-white/20' : 'hover:border-sky-300 bg-transparent'
            }`}
            title="Screen 2: Robot Status & Welding"
          />

          {/* Menu 3: SEW-Drives */}
          <button 
            onClick={() => setActiveScreenIndex(2)}
            className="absolute top-[26.2%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 hover:border-sky-300 bg-transparent"
            title="SEW-Drives Telemetry"
          />

          {/* Menu 4: Alarm */}
          <button 
            onClick={() => setActiveScreenIndex(2)}
            className="absolute top-[35.0%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 hover:border-sky-300 bg-transparent"
            title="Alarm System"
          />

          {/* Menu 5: ProdData (Slide 5: Shift Production Status) */}
          <button 
            onClick={() => setActiveScreenIndex(4)}
            className={`absolute top-[43.7%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 ${
              activeScreenIndex === 4 ? 'border-white bg-white/20' : 'hover:border-sky-300 bg-transparent'
            }`}
            title="Screen 5: Production Data & Shift Plan"
          />

          {/* Menu 6: Diagnostic */}
          <button 
            onClick={() => setActiveScreenIndex(3)}
            className="absolute top-[52.4%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 hover:border-sky-300 bg-transparent"
            title="Diagnostic"
          />

          {/* Menu 7: System (Slide 4: System & Settings 1) */}
          <button 
            onClick={() => setActiveScreenIndex(3)}
            className={`absolute top-[61.1%] right-0 w-[9.2%] h-[8.5%] rounded-l cursor-pointer transition border-2 ${
              activeScreenIndex === 3 ? 'border-white bg-white/20' : 'hover:border-sky-300 bg-transparent'
            }`}
            title="Screen 4: System & Settings / Safety Signature"
          />

          {/* Menu 8: Style.View */}
          <button 
            onClick={() => setActiveScreenIndex(0)}
            className="absolute top-[69.8%] right-0 w-[9.2%] h-[7.5%] rounded-l cursor-pointer transition border-2 hover:border-sky-300 bg-transparent"
            title="Style.View"
          />

          {/* Menu 9: Style.Write (Slide 2: Station Data Modify) */}
          <button 
            onClick={() => setActiveScreenIndex(1)}
            className={`absolute top-[77.5%] right-0 w-[9.2%] h-[7.5%] rounded-l cursor-pointer transition border-2 ${
              activeScreenIndex === 1 ? 'border-white bg-white/20' : 'hover:border-sky-300 bg-transparent'
            }`}
            title="Screen 3: Station Data Modify / Style.Write"
          />

        </div>

        {/* Status Bar Indicator */}
        <div className="absolute bottom-1 left-2 z-20 flex items-center space-x-2 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LIVE WINCC UNIFIED MTP1500</span>
          <span className="text-slate-500">|</span>
          <span className="text-sky-400">{screens[activeScreenIndex].label}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Click any right sidebar tab or header button</span>
        </div>

      </div>

    </div>
  );
}
