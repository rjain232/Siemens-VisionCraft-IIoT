import React, { useState } from 'react';

function StyleWriteComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1400px', height: '711px', minHeight: '711px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Schematic Trace: 线_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '0px', top: '85px', width: '1360px' }} />
      {/* Header Selector: 符号 IO 域_1 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '454px', top: '39px', width: '500px', height: '42px' }}>
        <span className="truncate tracking-wide">Symbol IO Field 1</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Action Button: Button_Special_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1086px', top: '8px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Special 2</span>
      </button>
      {/* Action Button: Button_Special_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1178px', top: '8px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Special 3</span>
      </button>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '6px', top: '8px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Header Label: Title_OPMode1_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '454px', top: '7px', width: '500px', height: '30px' }}>
        <span className="truncate">Title OPMode1 ScreenOverview X390 Y2</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_1 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '74px', top: '87px', width: '1119px', height: '584px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #1</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
    </div>
  );
}

export default StyleWriteComponent;
