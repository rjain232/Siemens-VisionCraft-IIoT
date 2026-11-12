import React, { useState } from 'react';

function Screen_190RB02StandJ5Component() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '692px', minHeight: '692px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '414px', top: '157px', width: '358px', height: '495px' }}>
        <img src="/tia_graphics/190RB02_GR_Stand_J5_1.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Header Label: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '3px', width: '510px', height: '57px' }}>
        <span className="truncate">190RB02 Stand J5</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '78px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 5</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '144px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 6</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '144px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 7</span>
      </div>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1088px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 1</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1181px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 4</span>
      </button>
      {/* Diagonal Trace: Line_10 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '763px', top: '202px', width: '156px', height: '19px' }}>
        <line x1="0" y1="0" x2="156" y2="19" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '857px', top: '297px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Diagonal Trace: Line_4 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '774px', top: '306px', width: '72px', height: '17px' }}>
        <line x1="0" y1="0" x2="72" y2="17" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_1 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '294px', top: '411px', width: '122px', height: '16px' }}>
        <line x1="0" y1="0" x2="122" y2="16" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Group Container Rectangle: Rectangle_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '90px', width: '152px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '122px', height: '36px' }}>
        <span className="truncate font-sans">Signal #19</span>
      </div>
      {/* Siemens Status LED: 圆_5 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_44 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '897px', top: '337px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 44</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_45 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '897px', top: '357px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 45</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_46 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '924px', top: '357px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 46</span>
      </div>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '360px', top: '90px', width: '152px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '366px', top: '96px', width: '122px', height: '36px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Siemens Status LED: 圆_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '475px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '495px', top: '104px', width: '16px', height: '16px' }} />
    </div>
  );
}

export default Screen_190RB02StandJ5Component;
