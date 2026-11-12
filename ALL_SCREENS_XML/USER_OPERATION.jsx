import React, { useState } from 'react';

function USEROPERATIONComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1318px', height: '713px', minHeight: '713px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Action Button: Move_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1184px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Fusszeile_Button_ManualOPMode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '95px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Manual OP</span>
      </button>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Header Label: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '384px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">USER OPERATION</span>
      </div>
      {/* Action Button: Move_Legend_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1091px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '64px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #1]</span>
        </div>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '446px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '523px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #7]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '601px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #8]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '138px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #2]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '215px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '292px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '369px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #5]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '64px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #9]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_14 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '446px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #14</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #14]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_15 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '4px', top: '522px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #15</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #15]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_16 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '4px', top: '599px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #16</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #16]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_10 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '136px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #10</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #10]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_11 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '214px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #11</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #11]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_12 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '292px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #12</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #12]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: LSicar_MoveValve_HmiCtrl_13 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '5px', top: '370px', width: '1273px', height: '72px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-[#027AAC] truncate">Station Device #13</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[9px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[FP: Station Device #13]</span>
        </div>
      </div>
    </div>
  );
}

export default USEROPERATIONComponent;
