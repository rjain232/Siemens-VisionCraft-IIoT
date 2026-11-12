import React, { useState } from 'react';

function OrderManagementComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1403px', height: '673px', minHeight: '673px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '44px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '46px', width: '100%' }} />
      {/* Header Label: Title_OPMode1_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '418px', top: '5px', width: '500px', height: '30px' }}>
        <span className="truncate">Title OPMode1 ScreenOverview X390 Y2</span>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_1 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '2px', top: '70px', width: '1273px', height: '555px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #1</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
    </div>
  );
}

export default OrderManagementComponent;
