import React, { useState } from 'react';

function Screen_190RB06V23Component() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '708px', minHeight: '708px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '181px', top: '100px', width: '790px', height: '526px' }}>
        <img src="/tia_graphics/190RB06_J5_Gripper.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Header Label: Title_ScreenOverview_X390_Y2_2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '392px', top: '4px', width: '510px', height: '57px' }}>
        <span className="truncate">190RB06 V23</span>
      </div>
      {/* Action Button: Fusszeile_Button_ManualOPMode1_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1181px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP 4</span>
      </button>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '78px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 1</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '144px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 3</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1130px', top: '144px', width: '139px', height: '57px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 4</span>
      </div>
      {/* Diagnostic Row: 文本域_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '964px', top: '95px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #19</span>
      </div>
      {/* Diagonal Trace: Line_19 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '911px', top: '143px', width: '68px', height: '20px' }}>
        <line x1="0" y1="0" x2="68" y2="20" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Schematic Trace: Line_2 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '891px', top: '245px', width: '132px' }} />
      {/* Diagnostic Row: 文本域_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1047px', top: '300px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #4</span>
      </div>
      {/* Diagonal Trace: Line_5 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '887px', top: '316px', width: '160px', height: '47px' }}>
        <line x1="0" y1="0" x2="160" y2="47" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_3 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '897px', top: '421px', width: '142px', height: '12px' }}>
        <line x1="0" y1="0" x2="142" y2="12" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1023px', top: '543px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #5</span>
      </div>
      {/* Diagonal Trace: Line_6 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '911px', top: '560px', width: '104px', height: '13px' }}>
        <line x1="0" y1="0" x2="104" y2="13" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_11 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '700px', top: '385px', width: '27px', height: '87px' }}>
        <line x1="0" y1="0" x2="27" y2="87" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '632px', top: '582px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #6</span>
      </div>
      {/* Diagonal Trace: Line_7 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '594px', top: '569px', width: '33px', height: '36px' }}>
        <line x1="0" y1="0" x2="33" y2="36" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '435px', top: '509px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Diagonal Trace: Line_1 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '515px', top: '478px', width: '15px', height: '26px' }}>
        <line x1="0" y1="0" x2="15" y2="26" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '319px', top: '582px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #7</span>
      </div>
      {/* Diagonal Trace: Line_4 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '377px', top: '542px', width: '22px', height: '35px' }}>
        <line x1="0" y1="0" x2="22" y2="35" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_8 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '192px', top: '566px', width: '73px', height: '27px' }}>
        <line x1="0" y1="0" x2="73" y2="27" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '47px', top: '583px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #8</span>
      </div>
      {/* Diagonal Trace: Line_9 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '193px', top: '472px', width: '74px', height: '19px' }}>
        <line x1="0" y1="0" x2="74" y2="19" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '374px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Diagonal Trace: Line_10 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '157px', top: '361px', width: '90px', height: '38px' }}>
        <line x1="0" y1="0" x2="90" y2="38" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_12 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '191px', top: '226px', width: '81px', height: '98px' }}>
        <line x1="0" y1="0" x2="81" y2="98" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '13px', top: '95px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #16</span>
      </div>
      {/* Diagonal Trace: Line_15 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '153px', top: '127px', width: '92px', height: '25px' }}>
        <line x1="0" y1="0" x2="92" y2="25" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_17 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '399px', top: '252px', width: '41px', height: '91px' }}>
        <line x1="0" y1="0" x2="41" y2="91" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagonal Trace: Line_20 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '434px', top: '109px', width: '99px', height: '140px' }}>
        <line x1="0" y1="0" x2="99" y2="140" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '300px', top: '68px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #20</span>
      </div>
      {/* Diagnostic Row: 文本域_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '453px', top: '69px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #13</span>
      </div>
      {/* Diagonal Trace: Line_13 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '548px', top: '117px', width: '26px', height: '30px' }}>
        <line x1="0" y1="0" x2="26" y2="30" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: 文本域_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '653px', top: '81px', width: '134px', height: '40px' }}>
        <span className="truncate font-sans">Signal #14</span>
      </div>
      {/* Diagonal Trace: Line_14 */}
      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '755px', top: '134px', width: '10px', height: '48px' }}>
        <line x1="0" y1="0" x2="10" y2="48" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />
      </svg>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_44 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '338px', top: '111px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 44</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_45 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '338px', top: '131px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 45</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_46 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '365px', top: '131px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 46</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '487px', top: '108px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 5</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '487px', top: '128px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 6</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '514px', top: '128px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 7</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '693px', top: '121px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 8</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '693px', top: '141px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 9</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '720px', top: '141px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 10</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1001px', top: '135px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 11</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1001px', top: '155px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 12</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1028px', top: '155px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 13</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1082px', top: '360px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 14</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1082px', top: '340px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 15</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1109px', top: '360px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 16</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1057px', top: '588px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 17</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1057px', top: '608px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 18</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1084px', top: '608px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 19</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '675px', top: '622px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 20</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '675px', top: '642px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 21</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '702px', top: '642px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 22</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '476px', top: '549px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 23</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '476px', top: '569px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 24</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '503px', top: '569px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 25</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '365px', top: '622px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 26</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '365px', top: '642px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 27</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '392px', top: '642px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 28</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '627px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 29</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '647px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 30</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '113px', top: '647px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 31</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '58px', top: '414px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 32</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '58px', top: '434px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 33</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '85px', top: '434px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 34</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '134px', width: '52px', height: '19px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 35</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '77px', top: '154px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 36</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '154px', width: '25px', height: '21px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 37</span>
      </div>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '90px', width: '131px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '105px', height: '36px' }}>
        <span className="truncate font-sans">Signal #15</span>
      </div>
      {/* Siemens Status LED: 圆_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '360px', top: '90px', width: '165px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '366px', top: '96px', width: '132px', height: '36px' }}>
        <span className="truncate font-sans">Signal #12</span>
      </div>
      {/* Siemens Status LED: 圆_5 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '475px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '495px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '640px', top: '90px', width: '165px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '646px', top: '96px', width: '132px', height: '36px' }}>
        <span className="truncate font-sans">Signal #17</span>
      </div>
      {/* Siemens Status LED: 圆_3 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '755px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_4 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '775px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '920px', top: '90px', width: '165px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '926px', top: '96px', width: '132px', height: '36px' }}>
        <span className="truncate font-sans">Signal #2</span>
      </div>
      {/* Siemens Status LED: 圆_7 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '1035px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_8 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '1055px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '185px', width: '165px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '191px', width: '132px', height: '36px' }}>
        <span className="truncate font-sans">Signal #3</span>
      </div>
      {/* Siemens Status LED: 圆_9 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '199px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_10 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '199px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Rectangle_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '360px', top: '185px', width: '131px', height: '48px' }} />
      {/* Diagnostic Row: 文本域_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '366px', top: '191px', width: '105px', height: '36px' }}>
        <span className="truncate font-sans">Signal #9</span>
      </div>
      {/* Siemens Status LED: 圆_11 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '475px', top: '199px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: 圆_12 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '495px', top: '199px', width: '16px', height: '16px' }} />
    </div>
  );
}

export default Screen_190RB06V23Component;
