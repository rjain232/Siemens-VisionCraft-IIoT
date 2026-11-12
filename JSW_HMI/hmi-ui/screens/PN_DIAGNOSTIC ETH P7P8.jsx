import React, { useState } from 'react';

function PNDIAGNOSTICETHP7P8Component() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '2519px', height: '865px', minHeight: '865px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '485px', top: '446px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #8]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '289px', top: '446px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '293px', top: '277px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #9]</span>
        </div>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '2px', width: '500px', height: '30px' }}>
        <span className="truncate">PN DIAGNOSTIC ETH P7P8</span>
      </div>
      {/* Action Button: PN-Diag_Reset */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '93px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">PN-Diag Reset</span>
      </button>
      {/* Action Button: PN-Diag_ReadNew */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '184px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">PN-Diag ReadNew</span>
      </button>
      {/* Header Label: Textfeld_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '292px', top: '8px', width: '95px', height: '22px' }}>
        <span className="truncate">Textfeld 1</span>
      </div>
      {/* Siemens Status LED: LED_1_Left_2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '0px', top: '0px', width: '100px', height: '30px' }} />
      {/* Siemens Status LED: LED_1_Left_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '0px', top: '0px', width: '100px', height: '30px' }} />
      {/* Header Label: Textfeld_4 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '292px', top: '35px', width: '95px', height: '22px' }}>
        <span className="truncate">Textfeld 4</span>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: PN-Diag_Counters */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1093px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">PN-Diag Counters</span>
      </button>
      {/* Action Button: PN-Diag_LegendᆉY2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1184px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '51px', top: '92px', width: '203px', height: '123px' }} />
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '485px', top: '101px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #7]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1579px', top: '619px', width: '171px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #2]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '81px', top: '101px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_11 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '293px', top: '101px', width: '170px', height: '105px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #11</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #11]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1942px', top: '495px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '485px', top: '274px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #5]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_10 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1604px', top: '81px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #10</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #10]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '2123px', top: '495px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_16 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1375px', top: '728px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #16</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #16]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '880px', top: '104px', width: '170px', height: '100px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #1]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_13 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '2023px', top: '203px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #13</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #13]</span>
        </div>
      </div>
      {/* Schematic Trace: 线_4 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '190px', top: '162px', width: '60px' }} />
      {/* Vertical Bus Line: 线_6 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '253px', top: '143px', height: '19px' }} />
      {/* Schematic Trace: 线_26 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '254px', top: '142px', width: '129px' }} />
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_17 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '61px', top: '269px', width: '170px', height: '105px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #17</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #17]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_18 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '680px', top: '101px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #18</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #18]</span>
        </div>
      </div>
      {/* Vertical Bus Line: 线_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '156px', top: '162px', height: '145px' }} />
      {/* Schematic Trace: 线_3 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '363px', top: '152px', width: '23px' }} />
      {/* Schematic Trace: 线_5 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '156px', top: '162px', width: '20px' }} />
      {/* Vertical Bus Line: 线_7 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '363px', top: '153px', height: '54px' }} />
      {/* Schematic Trace: 线_8 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '363px', top: '207px', width: '220px' }} />
      {/* Vertical Bus Line: 线_9 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '583px', top: '179px', height: '27px' }} />
      {/* Schematic Trace: 线_10 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '376px', top: '163px', width: '14px' }} />
      {/* Vertical Bus Line: 线_11 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '376px', top: '163px', height: '54px' }} />
      {/* Schematic Trace: 线_12 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '376px', top: '217px', width: '402px' }} />
      {/* Vertical Bus Line: 线_13 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '778px', top: '179px', height: '37px' }} />
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_20 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1760px', top: '371px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #20</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #20]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_21 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1941px', top: '371px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #21</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #21]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_22 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '2123px', top: '371px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #22</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #22]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_23 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '2309px', top: '371px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #23</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #23]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_24 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1579px', top: '495px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #24</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #24]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_25 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1760px', top: '495px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #25</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #25]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_26 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1802px', top: '607px', width: '171px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #26</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #26]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '2309px', top: '495px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #2]</span>
        </div>
      </div>
      {/* Schematic Trace: 线_2 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '136px', top: '331px', width: '37px' }} />
      {/* Vertical Bus Line: 线_14 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '136px', top: '331px', height: '59px' }} />
      {/* Vertical Bus Line: 线_15 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '348px', top: '333px', height: '56px' }} />
      {/* Vertical Bus Line: 线_16 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '364px', top: '345px', height: '45px' }} />
      {/* Vertical Bus Line: 线_17 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '603px', top: '349px', height: '40px' }} />
      {/* Schematic Trace: 线_24 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '136px', top: '390px', width: '212px' }} />
      {/* Schematic Trace: 线_25 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '364px', top: '390px', width: '238px' }} />
      {/* Schematic Trace: 线_29 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '120px', top: '343px', width: '52px' }} />
      {/* Vertical Bus Line: 线_30 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '120px', top: '343px', height: '215px' }} />
      {/* Vertical Bus Line: 线_31 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '418px', top: '521px', height: '37px' }} />
      {/* Schematic Trace: 线_35 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '418px', top: '558px', width: '186px' }} />
      {/* Schematic Trace: 线_36 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '120px', top: '558px', width: '286px' }} />
      {/* Schematic Trace: 线_22 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '616px', top: '558px', width: '182px' }} />
      {/* Schematic Trace: 线_32 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '811px', top: '558px', width: '188px' }} />
      {/* Vertical Bus Line: 线_34 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '999px', top: '523px', height: '36px' }} />
      {/* Schematic Trace: 线_37 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '348px', top: '333px', width: '56px' }} />
      {/* Schematic Trace: 线_38 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '364px', top: '345px', width: '40px' }} />
      {/* Vertical Bus Line: 线_39 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '407px', top: '521px', height: '37px' }} />
      {/* Vertical Bus Line: 线_18 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '604px', top: '514px', height: '44px' }} />
      {/* Vertical Bus Line: 线_19 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '615px', top: '514px', height: '44px' }} />
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_12 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '680px', top: '446px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #12</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #12]</span>
        </div>
      </div>
      {/* Vertical Bus Line: 线_20 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '809px', top: '521px', height: '37px' }} />
      {/* Vertical Bus Line: 线_21 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '798px', top: '521px', height: '37px' }} />
      {/* Siemens Faceplate Modular Container: LSicar_DeviceDiag_14 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '880px', top: '446px', width: '170px', height: '97px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #14</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #14]</span>
        </div>
      </div>
      {/* Vertical Bus Line: 线_27 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '999px', top: '514px', height: '44px' }} />
    </div>
  );
}

export default PNDIAGNOSTICETHP7P8Component;
