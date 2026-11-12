import React, { useState } from 'react';

function ProductionCountSummaryComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1317px', height: '673px', minHeight: '673px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Casella di testo_26 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '4px', top: '6px', width: '1273px', height: '53px' }}>
        <span className="truncate">Casella di testo 26</span>
      </div>
      {/* Header Label: Casella di testo_47 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '881px', height: '49px' }}>
        <span className="truncate">Casella di testo 47</span>
      </div>
      {/* Header Label: Casella di testo_20 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '50px', width: '97px', height: '99px' }}>
        <span className="truncate">Casella di testo 20</span>
      </div>
      {/* Process Value IOField: IO 域_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '197px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '0px', top: '151px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 8</span>
      </div>
      {/* Process Value IOField: IO 域_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '295px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_46 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '392px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_47 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '491px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_50 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '588px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_51 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_52 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '198px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1px', top: '201px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 13</span>
      </div>
      {/* Process Value IOField: IO 域_55 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '296px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_56 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '393px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_57 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '491px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_60 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '588px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '99px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 14</span>
      </div>
      {/* Diagnostic Row: Casella di testo_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '196px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 15</span>
      </div>
      {/* Diagnostic Row: Casella di testo_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '392px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 16</span>
      </div>
      {/* Diagnostic Row: Casella di testo_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '491px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 17</span>
      </div>
      {/* Diagnostic Row: Casella di testo_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '588px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 18</span>
      </div>
      {/* Diagnostic Row: Casella di testo_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '295px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 19</span>
      </div>
      {/* Header Label: Casella di testo_21 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '99px', top: '50px', width: '194px', height: '49px' }}>
        <span className="truncate">Casella di testo 21</span>
      </div>
      {/* Header Label: Casella di testo_22 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '295px', top: '50px', width: '194px', height: '49px' }}>
        <span className="truncate">Casella di testo 22</span>
      </div>
      {/* Header Label: Casella di testo_7 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '491px', top: '50px', width: '389px', height: '49px' }}>
        <span className="truncate">Casella di testo 7</span>
      </div>
      {/* Process Value IOField: IO 域_61 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_62 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '198px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1px', top: '251px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 23</span>
      </div>
      {/* Process Value IOField: IO 域_65 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '296px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_67 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '393px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_70 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '491px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_73 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '588px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '686px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 1</span>
      </div>
      {/* Diagnostic Row: Casella di testo_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '783px', top: '101px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 2</span>
      </div>
      {/* Process Value IOField: IO 域_4 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '687px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_5 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '783px', top: '151px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_6 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '687px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_7 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '783px', top: '201px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_8 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '687px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_9 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '783px', top: '251px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Casella di testo_3 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '881px', height: '49px' }}>
        <span className="truncate">Casella di testo 3</span>
      </div>
      {/* Header Label: Casella di testo_28 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '51px', width: '97px', height: '99px' }}>
        <span className="truncate">Casella di testo 28</span>
      </div>
      {/* Process Value IOField: IO 域_20 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_21 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '197px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '0px', top: '152px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 29</span>
      </div>
      {/* Process Value IOField: IO 域_22 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '295px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_23 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '392px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_24 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '491px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_25 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '588px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_26 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_27 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '198px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1px', top: '202px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 30</span>
      </div>
      {/* Process Value IOField: IO 域_28 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '296px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_29 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '393px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_30 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '492px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_31 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '589px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '99px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 31</span>
      </div>
      {/* Diagnostic Row: Casella di testo_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '196px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 32</span>
      </div>
      {/* Diagnostic Row: Casella di testo_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '392px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 27</span>
      </div>
      {/* Diagnostic Row: Casella di testo_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '491px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 25</span>
      </div>
      {/* Diagnostic Row: Casella di testo_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '588px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 24</span>
      </div>
      {/* Diagnostic Row: Casella di testo_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '295px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 10</span>
      </div>
      {/* Header Label: Casella di testo_4 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '99px', top: '51px', width: '194px', height: '49px' }}>
        <span className="truncate">Casella di testo 4</span>
      </div>
      {/* Header Label: Casella di testo_5 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '295px', top: '51px', width: '194px', height: '49px' }}>
        <span className="truncate">Casella di testo 5</span>
      </div>
      {/* Header Label: Casella di testo_6 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '491px', top: '51px', width: '389px', height: '49px' }}>
        <span className="truncate">Casella di testo 6</span>
      </div>
      {/* Process Value IOField: IO 域_10 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '99px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_11 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '198px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1px', top: '252px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 9</span>
      </div>
      {/* Process Value IOField: IO 域_12 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '296px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_13 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '393px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_19 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '492px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_14 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '589px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '686px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 11</span>
      </div>
      {/* Diagnostic Row: Casella di testo_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '783px', top: '102px', width: '97px', height: '49px' }}>
        <span className="truncate font-sans">Casella di testo 12</span>
      </div>
      {/* Process Value IOField: IO 域_15 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '686px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_16 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '783px', top: '152px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_17 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '687px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_18 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '784px', top: '202px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_32 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '687px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_33 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '784px', top: '252px', width: '97px', height: '49px' }}>
        <span>0.00</span>
      </div>
    </div>
  );
}

export default ProductionCountSummaryComponent;
