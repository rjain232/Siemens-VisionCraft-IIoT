import React, { useState } from 'react';

function ALARMComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '709px', minHeight: '709px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '2px', width: '500px', height: '30px' }}>
        <span className="truncate">ALARM</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '0px', width: '510px', height: '57px' }}>
        <span className="truncate">ALARM</span>
      </div>
      {/* Action Button: Button_Language */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '97px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Language</span>
      </button>
      {/* Siemens Alarm Control View: acMessages */}
      <div className="absolute bg-[#F8FAFC] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col overflow-hidden text-xs text-[#262221] z-20" style={{ left: '0px', top: '100px', width: '1276px', height: '569px' }}>
        <div className="bg-[#DEDFE1] border-b border-[#C3C3C3] px-2 py-1 flex items-center justify-between font-bold text-[10px]">
          <span className="flex items-center gap-1.5 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>ALARM & EVENT LOG</span>
          <span className="text-slate-500 font-mono">Siemens AlarmControl</span>
        </div>
        <div className="flex-1 p-2 space-y-1 font-mono text-[10px] overflow-y-auto bg-slate-50">
          <div className="flex items-center justify-between p-1 bg-red-50 text-red-700 border-l-2 border-red-500"><span>[FAULT] 140M1 Zone Emergency Circuit Disconnected</span><span>08:42:10</span></div>
          <div className="flex items-center justify-between p-1 bg-amber-50 text-amber-800 border-l-2 border-amber-500"><span>[WARN] Robot Gripper 190RB02 Pressure Threshold</span><span>08:41:55</span></div>
        </div>
      </div>
      {/* Header Selector: Txt_AlarmClassFilter */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-medium text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '5px', top: '66px', width: '160px', height: '31px' }}>
        <span className="truncate tracking-wide">Txt AlarmClassFilter</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Action Button: Btn_AlarmClassFilter */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '167px', top: '66px', width: '109px', height: '31px' }}>
        <span className="truncate w-full text-center">AlarmClassFilter</span>
      </button>
      {/* Action Button: Btn_AlarmCodeView */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1184px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">AlarmCodeView</span>
      </button>
      {/* Siemens Graphic View: Graphic_BlockedRed */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1258px', top: '5px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="Graphic_BlockedRed" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '62px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
    </div>
  );
}

export default ALARMComponent;
