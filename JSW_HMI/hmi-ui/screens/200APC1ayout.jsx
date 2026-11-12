import React, { useState } from 'react';

function Screen_200APC1ayoutComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '711px', minHeight: '711px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '65px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '189px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 2</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '283px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 3</span>
      </button>
      {/* Siemens Faceplate Modular Container: 面板容器_24 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1092px', top: '4px', width: '88px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #24</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #24]</span>
        </div>
      </div>
      {/* Siemens Graphic View: OPMode1_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1166px', top: '6px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode1_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode4_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1092px', top: '4px', width: '88px', height: '58px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Action Button: Tec-Unit_LegendᆉY2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1184px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '95px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 1</span>
      </button>
      {/* Action Button: lOPMode1_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '991px', top: '3px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">lOPMode1 4</span>
      </button>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '30px', top: '126px', width: '1170px', height: '343px' }}>
        <img src="/tia_graphics/APC1.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Polygon Shape: Polygon_3 */}
      <div className="absolute bg-[#027AAC] opacity-80 rounded-sm z-10" style={{ left: '553px', top: '48px', width: '16px', height: '143px' }} />
      {/* Siemens Polygon Shape: Polygon_5 */}
      <div className="absolute bg-[#027AAC] opacity-80 rounded-sm z-10" style={{ left: '552px', top: '481px', width: '16px', height: '143px' }} />
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '459px', top: '513px', width: '201px', height: '23px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 2</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '220px', top: '212px', width: '59px', height: '49px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #8]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '214px', top: '313px', width: '61px', height: '49px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '8px', top: '209px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #3]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '13px', top: '167px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '6px', top: '407px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #4]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '6px', top: '364px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #2</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1123px', top: '204px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #5]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1125px', top: '403px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_10 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1077px', top: '313px', width: '59px', height: '49px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #10</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #10]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_11 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '853px', top: '313px', width: '59px', height: '49px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #11</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #11]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_14 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '313px', top: '218px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #14</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #14]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '176px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #7</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '13px', top: '577px', width: '234px', height: '81px' }} />
      {/* Siemens Status LED: LED_1_Left_33 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: Text_DigitalOutputs_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '46px', top: '610px', width: '179px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 30</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '46px', top: '634px', width: '179px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 1</span>
      </div>
      {/* Siemens Status LED: LED_1_Left_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: Text field Select Style */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '13px', top: '572px', width: '234px', height: '31px' }}>
        <span className="truncate font-sans">Text field Select Style</span>
      </div>
      {/* Diagnostic Row: 文本域_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '191px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #18</span>
      </div>
      {/* Diagnostic Row: 文本域_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '192px', top: '292px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #19</span>
      </div>
      {/* Diagnostic Row: 文本域_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '832px', top: '292px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #20</span>
      </div>
      {/* Diagnostic Row: 文本域_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1040px', top: '292px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #21</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_16 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '568px', top: '619px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #16</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #16]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '619px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #10</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_25 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1113px', top: '562px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #25</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #25]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '990px', top: '566px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #15</span>
      </div>
      {/* Diagnostic Row: 文本域_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '990px', top: '623px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #16</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_22 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1113px', top: '618px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #22</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #22]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '714px', top: '619px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #17</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_23 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '837px', top: '619px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #23</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #23]</span>
        </div>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '459px', top: '82px', width: '201px', height: '23px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 1</span>
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '77px', top: '116px', width: '155px', height: '60px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '958px', top: '116px', width: '205px', height: '60px' }}>
        <span className="truncate font-sans">Text 2</span>
      </div>
      {/* Diagnostic Row: 文本域_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '70px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #5</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '380px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">200APC1ayout</span>
      </div>
      {/* Action Button: 按钮_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '300px', top: '70px', width: '140px', height: '60px' }}>
        <span className="truncate w-full text-center">Button 2</span>
      </button>
      {/* Siemens Status LED: 圆_9 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Action Button: 按钮_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '300px', top: '502px', width: '140px', height: '60px' }}>
        <span className="truncate w-full text-center">Button 1</span>
      </button>
      {/* Siemens Status LED: 圆_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Action Button: 按钮_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '677px', top: '502px', width: '140px', height: '60px' }}>
        <span className="truncate w-full text-center">Button 4</span>
      </button>
      {/* Siemens Status LED: 圆_3 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Action Button: 按钮_5 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '837px', top: '502px', width: '140px', height: '60px' }}>
        <span className="truncate w-full text-center">Button 5</span>
      </button>
      {/* Siemens Status LED: 圆_4 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: 文本域_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1123px', top: '162px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #6</span>
      </div>
      {/* Diagnostic Row: 文本域_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1124px', top: '362px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #8</span>
      </div>
      {/* Diagnostic Row: 文本域_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '280px', top: '352px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #9</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '280px', top: '392px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #2]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '428px', top: '392px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #7]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '428px', top: '352px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '805px', top: '218px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #9]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '805px', top: '177px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #12</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_12 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '978px', top: '474px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #12</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #12]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '977px', top: '432px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #3</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_13 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '964px', top: '218px', width: '146px', height: '52px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #13</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #13]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '960px', top: '177px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #13</span>
      </div>
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '493px', width: '290px', height: '72px' }} />
      {/* Group Container Rectangle: Rectangle_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '474px', width: '284px', height: '41px' }} />
      {/* Diagnostic Row: Text_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '476px', width: '288px', height: '41px' }}>
        <span className="truncate font-sans">Text 11</span>
      </div>
      {/* Header Selector: Symbolic IO field_3 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '10px', top: '517px', width: '282px', height: '48px' }}>
        <span className="truncate tracking-wide">Symbolic IO field 3</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '265px', top: '569px', width: '165px', height: '50px' }}>
        <span className="truncate w-full text-center">Manual OP 4</span>
      </button>
    </div>
  );
}

export default Screen_200APC1ayoutComponent;
