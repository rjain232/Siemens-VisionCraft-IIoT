import React, { useState } from 'react';

function Screen_200FX1LayoutComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '706px', minHeight: '706px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
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
      {/* Diagnostic Row: 文本域_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1107px', top: '71px', width: '139px', height: '22px' }}>
        <span className="truncate font-sans">Signal #3</span>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_Valve8Pos_LeftHomeRightWork_WithPB_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1099px', top: '95px', width: '160px', height: '53px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Valve 8-Pos PB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Valve 8-Pos PB]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1107px', top: '160px', width: '156px', height: '23px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_Valve8Pos_LeftHomeRightWork_WithPB_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1099px', top: '183px', width: '160px', height: '53px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Valve 8-Pos PB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Valve 8-Pos PB]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1107px', top: '246px', width: '135px', height: '23px' }}>
        <span className="truncate font-sans">Signal #2</span>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_Valve8Pos_LeftHomeRightWork_WithPB_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1099px', top: '271px', width: '160px', height: '53px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Valve 8-Pos PB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Valve 8-Pos PB]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1124px', top: '475px', width: '104px', height: '23px' }}>
        <span className="truncate font-sans">Signal #22</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_23 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1171px', top: '508px', width: '96px', height: '32px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #23</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_22 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1061px', top: '508px', width: '96px', height: '32px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #22</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
      </div>
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
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '982px', top: '13px', width: '88px', height: '58px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '95px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 1</span>
      </button>
      {/* Siemens Faceplate Modular Container: LSicar_Valve8Pos_LeftHomeRightWork_WithPB_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1099px', top: '356px', width: '160px', height: '53px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Valve 8-Pos PB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Valve 8-Pos PB]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1107px', top: '330px', width: '139px', height: '22px' }}>
        <span className="truncate font-sans">Signal #4</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '424px', top: '537px', width: '62px', height: '46px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '951px', top: '383px', width: '59px', height: '50px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '296px', top: '523px', width: '69px', height: '45px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '684px', top: '588px', width: '172px', height: '60px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #9]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_14 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '33px', top: '195px', width: '58px', height: '51px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #14</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #14]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '678px', top: '183px', width: '59px', height: '48px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '439px', top: '192px', width: '59px', height: '47px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_20 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '534px', top: '612px', width: '150px', height: '51px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #20</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #20]</span>
        </div>
      </div>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '20px', top: '214px', width: '860px', height: '259px' }}>
        <img src="/tia_graphics/J5MB200UB.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagonal Trace: Line_9 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '559px', top: '146px', width: '94px', height: '182px' }}>
        <line x1="0" y1="0" x2="94" y2="182" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Siemens Faceplate Modular Container: 面板容器_10 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '498px', top: '116px', width: '153px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #10</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #10]</span>
        </div>
      </div>
      {/* Diagonal Trace: Line_2 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '703px', top: '221px', width: '20px', height: '91px' }}>
        <line x1="0" y1="0" x2="20" y2="91" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_5 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '753px', top: '170px', width: '92px', height: '151px' }}>
        <line x1="0" y1="0" x2="92" y2="151" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_3 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '514px', top: '184px', width: '62px', height: '132px' }}>
        <line x1="0" y1="0" x2="62" y2="132" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_17 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '109px', top: '190px', width: '171px', height: '117px' }}>
        <line x1="0" y1="0" x2="171" y2="117" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_6 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '752px', top: '357px', width: '177px', height: '7px' }}>
        <line x1="0" y1="0" x2="177" y2="7" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_10 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '558px', top: '396px', width: '165px', height: '104px' }}>
        <line x1="0" y1="0" x2="165" y2="104" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_13 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '603px', top: '398px', width: '127px', height: '171px' }}>
        <line x1="0" y1="0" x2="127" y2="171" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_1 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '445px', top: '359px', width: '219px', height: '135px' }}>
        <line x1="0" y1="0" x2="219" y2="135" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_8 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '328px', top: '395px', width: '248px', height: '99px' }}>
        <line x1="0" y1="0" x2="248" y2="99" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_18 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '218px', top: '401px', width: '62px', height: '96px' }}>
        <line x1="0" y1="0" x2="62" y2="96" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_16 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '71px', top: '325px', width: '85px', height: '136px' }}>
        <line x1="0" y1="0" x2="85" y2="136" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Siemens Faceplate Modular Container: 面板容器_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '914px', top: '208px', width: '149px', height: '54px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '12px', top: '502px', width: '143px', height: '50px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #5]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '520px', top: '522px', width: '62px', height: '46px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '188px', top: '522px', width: '60px', height: '47px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #2]</span>
        </div>
      </div>
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
      {/* Diagnostic Row: 文本域_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '168px', top: '499px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #19</span>
      </div>
      {/* Diagnostic Row: 文本域_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '12px', top: '461px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #6</span>
      </div>
      {/* Diagnostic Row: 文本域_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '277px', top: '500px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #7</span>
      </div>
      {/* Diagnostic Row: 文本域_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '398px', top: '494px', width: '100px', height: '40px' }}>
        <span className="truncate font-sans">Signal #8</span>
      </div>
      {/* Diagnostic Row: 文本域_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '513px', top: '501px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #9</span>
      </div>
      {/* Diagnostic Row: 文本域_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '534px', top: '571px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #10</span>
      </div>
      {/* Diagnostic Row: 文本域_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '684px', top: '565px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Diagnostic Row: 文本域_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '931px', top: '343px', width: '100px', height: '40px' }}>
        <span className="truncate font-sans">Signal #12</span>
      </div>
      {/* Diagnostic Row: 文本域_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '503px', top: '94px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Signal #13</span>
      </div>
      {/* Diagnostic Row: 文本域_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '914px', top: '166px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #15</span>
      </div>
      {/* Diagnostic Row: 文本域_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '12px', top: '175px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #16</span>
      </div>
      {/* Diagnostic Row: 文本域_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '415px', top: '169px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #17</span>
      </div>
      {/* Diagnostic Row: 文本域_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '653px', top: '160px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Signal #18</span>
      </div>
      {/* Diagnostic Row: 文本域_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-1px', top: '82px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #5</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '384px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">200FX1Layout</span>
      </div>
      {/* Diagnostic Row: 文本域_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '767px', top: '114px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Signal #20</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '776px', top: '136px', width: '148px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #7]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '129px', top: '123px', width: '144px', height: '51px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #8]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '82px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #21</span>
      </div>
      {/* Diagnostic Row: 文本域_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '282px', top: '82px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #23</span>
      </div>
      {/* Diagonal Trace: Line_11 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '355px', top: '151px', width: '68px', height: '134px' }}>
        <line x1="0" y1="0" x2="68" y2="134" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_4 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '198px', top: '146px', width: '221px', height: '158px' }}>
        <line x1="0" y1="0" x2="221" y2="158" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_12 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '778px', top: '194px', width: '133px', height: '129px' }}>
        <line x1="0" y1="0" x2="133" y2="129" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '913px', top: '264px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Signal #24</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_12 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '922px', top: '286px', width: '148px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #12</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #12]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '921px', top: '433px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Signal #25</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_13 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '930px', top: '455px', width: '148px', height: '58px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #13</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #13]</span>
        </div>
      </div>
      {/* Diagnostic Row: 文本域_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '911px', top: '548px', width: '140px', height: '40px' }}>
        <span className="truncate font-sans">Signal #26</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_15 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '914px', top: '590px', width: '149px', height: '54px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #15</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #15]</span>
        </div>
      </div>
      {/* Diagonal Trace: Line_14 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '754px', top: '274px', width: '161px', height: '75px' }}>
        <line x1="0" y1="0" x2="161" y2="75" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_15 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '754px', top: '367px', width: '166px', height: '74px' }}>
        <line x1="0" y1="0" x2="166" y2="74" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Vertical Bus Line: Line_7 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '746px', top: '389px', height: '173px' }} />
      {/* Diagonal Trace: Line_19 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '778px', top: '386px', width: '132px', height: '186px' }}>
        <line x1="0" y1="0" x2="132" y2="186" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-1px', top: '126px', width: '120px', height: '40px' }}>
        <span className="truncate font-sans">Signal #27</span>
      </div>
      {/* Siemens Faceplate Modular Container: 面板容器_11 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '282px', top: '123px', width: '150px', height: '51px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #11</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #11]</span>
        </div>
      </div>
      {/* Action Button: Button_Back_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '122px', top: '606px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Button_Back_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '8px', top: '606px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Siemens Graphic View: OPMode4_Foreground_Blocked_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '1090px', top: '7px', width: '88px', height: '58px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
    </div>
  );
}

export default Screen_200FX1LayoutComponent;
