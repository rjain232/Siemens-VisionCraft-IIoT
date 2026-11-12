import React, { useState } from 'react';

function SYSTEMDIAGNOSTICDEVICEVIEWComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1320px', height: '709px', minHeight: '709px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '2px', width: '510px', height: '57px' }}>
        <span className="truncate">SYSTEM DIAGNOSTIC DEVICE-VIEW</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: SysDiag_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1185px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Siemens System Diagnostic View: 系统诊断控制_1 */}
      <div className="absolute bg-[#DEDFE1] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col p-2 overflow-hidden z-20" style={{ left: '0px', top: '66px', width: '1280px', height: '603px' }}>
        <span className="font-bold text-xs text-[#027AAC] mb-1">PROFINET System Hardware Topology</span>
        <div className="flex-1 bg-white rounded border border-[#C3C3C3] p-2 font-mono text-[10px] text-slate-700">
          <p className="text-emerald-600 font-bold">✔ PLC S7-1500 (192.168.0.10) - Normal Operation</p>
          <p className="text-emerald-600 font-bold">✔ ET200SP Remote IO Rack 1 - OK</p>
          <p className="text-emerald-600 font-bold">✔ KUKA KRC4 Industrial Robot Controller - OK</p>
        </div>
      </div>
    </div>
  );
}

export default SYSTEMDIAGNOSTICDEVICEVIEWComponent;
