import React, { useState } from 'react';

function MB150firststationLOADINGSTANDFIFOComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1402px', height: '690px', minHeight: '690px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '65px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '47px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Siemens Graphic View: OPMode4_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1160px', top: '0px', width: '88px', height: '58px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Title_OPOverview_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '433px', top: '13px', width: '500px', height: '30px' }}>
        <span className="truncate">Title OPOverview ScreenOverview X390 Y2</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_1 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '18px', top: '73px', width: '1239px', height: '577px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #1</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
    </div>
  );
}

export default MB150firststationLOADINGSTANDFIFOComponent;
