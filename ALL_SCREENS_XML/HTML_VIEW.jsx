import React, { useState } from 'react';

function HTMLVIEWComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1320px', height: '694px', minHeight: '694px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '2px', width: '500px', height: '30px' }}>
        <span className="truncate">HTML VIEW</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Header Label: Text_DeviceAdress */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '36px', width: '150px', height: '25px' }}>
        <span className="truncate">Text DeviceAdress</span>
      </div>
      {/* Process Value IOField: EA-Field_DeviceAdress */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '540px', top: '36px', width: '350px', height: '25px' }}>
        <span>0.00</span>
      </div>
      {/* Siemens Web View: 网络控件_1 */}
      <div className="absolute bg-white border border-[#9CAFB7] rounded-sm shadow-sm flex flex-col overflow-hidden z-20" style={{ left: '0px', top: '68px', width: '1280px', height: '586px' }}>
        <div className="bg-slate-100 px-2 py-1 border-b border-slate-300 text-[10px] font-mono text-slate-500">http://mes.plant.internal/viewer</div>
        <div className="flex-1 p-3 text-xs text-slate-600 font-sans">MES Production Dashboard Web View</div>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
    </div>
  );
}

export default HTMLVIEWComponent;
