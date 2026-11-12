import React, { useState } from 'react';

function CallServiceButtonsComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1308px', height: '715px', minHeight: '715px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_OPMode1_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '5px', top: '7px', width: '1262px', height: '30px' }}>
        <span className="truncate">Title OPMode1 ScreenOverview X390 Y2</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_5 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '0px', top: '33px', width: '622px', height: '206px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #5</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Header Label: Text box_5 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '622px', height: '30px' }}>
        <span className="truncate">Text box 5</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_7 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '0px', top: '33px', width: '622px', height: '206px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #7</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Header Label: Text box_7 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '622px', height: '30px' }}>
        <span className="truncate">Text box 7</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_8 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '0px', top: '33px', width: '622px', height: '206px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #8</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Header Label: Text box_8 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '622px', height: '30px' }}>
        <span className="truncate">Text box 8</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_1 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '5px', top: '73px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #1</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Header Label: Text box_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '5px', top: '40px', width: '622px', height: '30px' }}>
        <span className="truncate">Text box 1</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_2 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '645px', top: '73px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #2</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Header Label: Text box_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '645px', top: '40px', width: '622px', height: '30px' }}>
        <span className="truncate">Text box 2</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_3 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '5px', top: '285px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #3</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Diagnostic Row: Text box_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '5px', top: '252px', width: '622px', height: '30px' }}>
        <span className="truncate font-sans">Text box 3</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_4 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '645px', top: '285px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #4</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Diagnostic Row: Text box_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '645px', top: '252px', width: '622px', height: '30px' }}>
        <span className="truncate font-sans">Text box 4</span>
      </div>
      {/* Action Button: Button_15 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1170px', top: '8px', width: '98px', height: '31px' }}>
        <span className="truncate w-full text-center">15</span>
      </button>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_6 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '5px', top: '496px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #6</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Diagnostic Row: Text box_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '5px', top: '463px', width: '622px', height: '30px' }}>
        <span className="truncate font-sans">Text box 6</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_9 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '645px', top: '496px', width: '619px', height: '179px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #9</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Diagnostic Row: Text box_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '645px', top: '463px', width: '622px', height: '30px' }}>
        <span className="truncate font-sans">Text box 9</span>
      </div>
    </div>
  );
}

export default CallServiceButtonsComponent;
