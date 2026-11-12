import React, { useState } from 'react';

function PopupCURVEFCYCLETIMESPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '680px', height: '360px', minHeight: '360px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '640px', height: '320px' }} />
      {/* Siemens Trend / Cycle Times Control: 趋势控件_1 */}
      <div className="absolute bg-[#1E293B] border border-[#475569] rounded-sm shadow-md flex flex-col p-2 text-white overflow-hidden z-20" style={{ left: '0px', top: '0px', width: '640px', height: '320px' }}>
        <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold mb-1 font-mono">
          <span>CYCLE TIME TREND (ms)</span>
          <span className="text-emerald-400">REALTIME</span>
        </div>
        <div className="flex-1 flex items-end gap-1.5 border-b border-l border-slate-600 p-1">
          <div className="w-1/6 bg-cyan-500 h-[60%] rounded-t-sm"></div>
          <div className="w-1/6 bg-cyan-400 h-[75%] rounded-t-sm"></div>
          <div className="w-1/6 bg-cyan-500 h-[50%] rounded-t-sm"></div>
          <div className="w-1/6 bg-cyan-400 h-[90%] rounded-t-sm"></div>
          <div className="w-1/6 bg-emerald-500 h-[65%] rounded-t-sm"></div>
        </div>
      </div>
      {/* Action Button: ButtonClose */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '568px', top: '0px', width: '72px', height: '32px' }}>
        <span className="truncate w-full text-center">ButtonClose</span>
      </button>
    </div>
  );
}

export default PopupCURVEFCYCLETIMESPopupComponent;
