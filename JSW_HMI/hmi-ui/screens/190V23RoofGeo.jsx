import React, { useState } from 'react';

function Screen_190V23RoofGeoComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1313px', height: '673px', minHeight: '673px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Move_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1182px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '279px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 2</span>
      </button>
      {/* Siemens Faceplate Modular Container: 面板容器_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1090px', top: '4px', width: '88px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #2]</span>
        </div>
      </div>
      {/* Siemens Graphic View: OPMode1_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1164px', top: '6px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode1_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode4_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1090px', top: '4px', width: '88px', height: '58px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '95px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 1</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '187px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 3</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '997px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 4</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_5 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '902px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 5</span>
      </button>
      {/* Header Label: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '384px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">190V23RoofGeo</span>
      </div>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '212px', top: '150px', width: '864px', height: '387px' }}>
        <img src="/tia_graphics/V23MB190RoofGeo.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '67px', width: '100%' }} />
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '90px', width: '152px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '122px', height: '36px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Siemens Status LED: 圆_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '360px', top: '90px', width: '152px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '366px', top: '96px', width: '122px', height: '36px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Siemens Status LED: 圆_3 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '475px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_4 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '495px', top: '104px', width: '16px', height: '16px' }} />
    </div>
  );
}

export default Screen_190V23RoofGeoComponent;
