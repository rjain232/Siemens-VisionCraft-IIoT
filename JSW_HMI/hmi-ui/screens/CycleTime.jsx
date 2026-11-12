import React, { useState } from 'react';

function CycleTimeComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1313px', height: '728px', minHeight: '728px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Faceplate Modular Container: Faceplate container_1 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '135px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #1]</span>
        </div>
      </div>
      {/* Vertical Bus Line: Line_22 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '128px', top: '84px', height: '400px' }} />
      {/* Schematic Trace: Line_46 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '110px', top: '355px', width: '17px' }} />
      {/* Schematic Trace: Line_47 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '111px', top: '420px', width: '17px' }} />
      {/* Schematic Trace: Line_48 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '112px', top: '484px', width: '17px' }} />
      {/* Diagnostic Row: Casella di testo_56 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '271px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 56</span>
      </div>
      {/* Diagnostic Row: Casella di testo_57 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '339px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 57</span>
      </div>
      {/* Diagnostic Row: Casella di testo_59 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '405px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 59</span>
      </div>
      {/* Diagnostic Row: Casella di testo_60 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '468px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 60</span>
      </div>
      {/* Schematic Trace: Line_49 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '109px', top: '224px', width: '17px' }} />
      {/* Diagnostic Row: Casella di testo_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '209px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 7</span>
      </div>
      {/* Diagnostic Row: Casella di testo_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '143px', width: '48px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 8</span>
      </div>
      {/* Schematic Trace: Line_50 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '109px', top: '158px', width: '17px' }} />
      {/* Schematic Trace: Line_51 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '109px', top: '103px', width: '17px' }} />
      {/* Schematic Trace: Line_52 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '110px', top: '286px', width: '17px' }} />
      {/* Diagnostic Row: Casella di testo_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '87px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 27</span>
      </div>
      {/* Diagnostic Row: Casella di testo_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '171px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 31</span>
      </div>
      {/* Diagnostic Row: Casella di testo_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '242px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 32</span>
      </div>
      {/* Diagnostic Row: Casella di testo_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 35</span>
      </div>
      {/* Diagnostic Row: Casella di testo_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '388px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 37</span>
      </div>
      {/* Diagnostic Row: Casella di testo_38 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '460px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 38</span>
      </div>
      {/* Diagnostic Row: Casella di testo_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '524px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 39</span>
      </div>
      {/* Diagnostic Row: Casella di testo_40 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '597px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 40</span>
      </div>
      {/* Diagnostic Row: Casella di testo_41 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '671px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 41</span>
      </div>
      {/* Diagnostic Row: Casella di testo_42 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '739px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 42</span>
      </div>
      {/* Diagnostic Row: Casella di testo_43 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '809px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 43</span>
      </div>
      {/* Diagnostic Row: Casella di testo_44 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '884px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 44</span>
      </div>
      {/* Diagnostic Row: Casella di testo_45 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '955px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 45</span>
      </div>
      {/* Diagnostic Row: Casella di testo_46 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1026px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 46</span>
      </div>
      {/* Diagnostic Row: Casella di testo_47 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1106px', top: '577px', width: '151px', height: '35px' }}>
        <span className="truncate font-sans">Casella di testo 47</span>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_2 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '206px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #2]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_3 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '277px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #3]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_4 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '348px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #4</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #4]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_5 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '419px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #5</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #5]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_6 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '490px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #6</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #6]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_7 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '563px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #7</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #7]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_8 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '634px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #8]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_9 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '707px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #9</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #9]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_10 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '778px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #10</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #10]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_11 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '927px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #11</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #11]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_12 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '993px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #12</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #12]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_13 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1066px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #13</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #13]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_14 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '850px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #14</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #14]</span>
        </div>
      </div>
      {/* Siemens Faceplate Modular Container: Faceplate container_15 */}
      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '1139px', top: '81px', width: '64px', height: '420px' }}>
        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">
          <span className="text-[9px] font-bold text-[#027AAC] truncate">Device #15</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[8px] text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">
          <span className="truncate">[Device #15]</span>
        </div>
      </div>
      {/* Schematic Trace: Line_23 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '133px', top: '286px', width: '1103px' }} />
      {/* Schematic Trace: Line_45 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '130px', top: '483px', width: '1110px' }} />
      {/* Header Label: Casella di testo_26 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '6px', top: '6px', width: '1267px', height: '47px' }}>
        <span className="truncate">Casella di testo 26</span>
      </div>
      {/* Action Button: Move_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1183px', top: '7px', width: '90px', height: '44px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Vertical Bus Line: Line_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '39px', top: '168px', height: '122px' }} />
      {/* Diagnostic Row: Casella di testo_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '626px', top: '614px', width: '67px', height: '30px' }}>
        <span className="truncate font-sans">Casella di testo 2</span>
      </div>
      {/* Vertical Bus Line: Line_2 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '757px', top: '566px', height: '122px' }} />
    </div>
  );
}

export default CycleTimeComponent;
