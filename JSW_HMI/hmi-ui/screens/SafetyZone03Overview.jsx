import React, { useState } from 'react';

function SafetyZone03OverviewComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1382px', height: '700px', minHeight: '700px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Action Button: Button_Overview_LegendᆉY2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1185px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '4px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Group Container Rectangle: Rectangle_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '341px', top: '585px', width: '917px', height: '8px' }} />
      {/* Siemens Graphic View: Graphic view_15 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '32px', top: '351px', width: '42px', height: '35px' }}>
        <img src="/tia_graphics/SICAR_Rollerblade_Horizontal_77x34.png" alt="Graphic view_15" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Group Container Rectangle: Rectangle_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '19px', top: '136px', width: '1160px', height: '8px' }} />
      {/* Group Container Rectangle: Rectangle_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1175px', top: '212px', width: '160px', height: '8px' }} />
      {/* Group Container Rectangle: Rectangle_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1169px', top: '503px', width: '173px', height: '8px' }} />
      {/* Group Container Rectangle: Rectangle_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '19px', top: '585px', width: '248px', height: '8px' }} />
      {/* Optical Safety Light Barrier: 图形 IO 域_26 */}
      <div className="absolute flex items-center justify-center z-15 pointer-events-none" style={{ left: '16px', top: '299px', width: '15px', height: '122px' }}>
        <img src="/tia_graphics/barr_V_yellow.png" alt="Light Barrier" className="w-full h-full object-fill opacity-90 drop-shadow-sm" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Optical Safety Light Barrier: 图形 IO 域_15 */}
      <div className="absolute flex items-center justify-center z-15 pointer-events-none" style={{ left: '1244px', top: '299px', width: '15px', height: '122px' }}>
        <img src="/tia_graphics/barr_V_yellow.png" alt="Light Barrier" className="w-full h-full object-fill opacity-90 drop-shadow-sm" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Action Button: Button_Overview_LegendᆉY2_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1092px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: 文本域_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1204px', top: '69px', width: '58px', height: '19px' }}>
        <span className="truncate font-sans">Signal #2</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1179px', top: '136px', width: '14px', height: '11px' }} />
      {/* Diagonal Trace: 线_1 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '1193px', top: '152px', width: '47px', height: '13px' }}>
        <line x1="0" y1="0" x2="47" y2="13" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1192px', top: '136px', width: '48px', height: '11px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1239px', top: '136px', width: '14px', height: '11px' }} />
      {/* Action Button: Button_Overview_LegendᆉY2_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '986px', top: '2px', width: '103px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Emergency Stop Safety Icon: Emerg_3 */}
      <div className="absolute flex items-center justify-center z-20 pointer-events-auto cursor-pointer" style={{ left: '1204px', top: '83px', width: '52px', height: '56px' }}>
        <img src="/tia_graphics/Emerg_red.png" alt="E-Stop" className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '384px', top: '4px', width: '510px', height: '57px' }}>
        <span className="truncate">SafetyZone03Overview</span>
      </div>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '664px', top: '347px', width: '42px', height: '35px' }}>
        <img src="/tia_graphics/SICAR_Rollerblade_Horizontal_77x34.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '267px', top: '583px', width: '14px', height: '11px' }} />
      {/* Diagonal Trace: 线_2 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '280px', top: '598px', width: '47px', height: '13px' }}>
        <line x1="0" y1="0" x2="47" y2="13" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '280px', top: '583px', width: '48px', height: '11px' }} />
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '327px', top: '583px', width: '14px', height: '11px' }} />
      {/* Emergency Stop Safety Icon: Emerg_1 */}
      <div className="absolute flex items-center justify-center z-20 pointer-events-auto cursor-pointer" style={{ left: '334px', top: '588px', width: '52px', height: '56px' }}>
        <img src="/tia_graphics/Emerg_red.png" alt="E-Stop" className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Emergency Stop Safety Icon: Emerg_4 */}
      <div className="absolute flex items-center justify-center z-20 pointer-events-auto cursor-pointer" style={{ left: '560px', top: '80px', width: '52px', height: '56px' }}>
        <img src="/tia_graphics/Emerg_red.png" alt="E-Stop" className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '331px', top: '641px', width: '58px', height: '19px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Action Button: Button_Overview_LegendᆉY2_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '106px', top: '2px', width: '103px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Siemens Faceplate Modular Container: Faceplate container_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '71px', top: '156px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #9]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_23 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '394px', top: '156px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #23</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #23]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '71px', top: '437px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '394px', top: '437px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '231px', top: '156px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #2]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '231px', top: '437px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_16 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '460px', top: '323px', width: '152px', height: '87px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #16</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #16]</span>
        </div>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_5 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '712px', top: '301px', width: '362px', height: '136px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #5</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '745px', top: '157px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #7]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_24 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '745px', top: '437px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #24</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #24]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_20 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1089px', top: '323px', width: '152px', height: '87px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #20</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #20]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '894px', top: '156px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '894px', top: '437px', width: '110px', height: '140px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #8]</span>
        </div>
      </div>
      {/* Siemens Enclosing Station Cell Container: Faceplate container_10 */}
      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '77px', top: '301px', width: '362px', height: '136px' }}>
        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">
          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">Station Device #10</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '557px', top: '68px', width: '58px', height: '19px' }}>
        <span className="truncate font-sans">Signal #3</span>
      </div>
    </div>
  );
}

export default SafetyZone03OverviewComponent;
