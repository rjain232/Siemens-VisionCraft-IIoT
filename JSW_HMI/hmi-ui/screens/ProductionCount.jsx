import React, { useState } from 'react';

function ProductionCountComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1317px', height: '707px', minHeight: '707px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Selector: Symbolic IO field_1 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '14px', top: '70px', width: '400px', height: '72px' }}>
        <span className="truncate tracking-wide">Symbolic IO field 1</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Header Label: Casella di testo_26 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '4px', top: '6px', width: '1273px', height: '53px' }}>
        <span className="truncate">Casella di testo 26</span>
      </div>
      {/* Diagnostic Row: Casella di testo_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '864px', top: '147px', width: '400px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 14</span>
      </div>
      {/* Process Value IOField: IO 域_82 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '217px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_83 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_84 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_85 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '864px', top: '183px', width: '106px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 21</span>
      </div>
      {/* Diagnostic Row: Casella di testo_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '972px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 23</span>
      </div>
      {/* Diagnostic Row: Casella di testo_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1070px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 24</span>
      </div>
      {/* Diagnostic Row: Casella di testo_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1168px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 25</span>
      </div>
      {/* Process Value IOField: IO 域_86 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '252px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_87 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_88 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_89 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_90 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '287px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_92 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_93 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_94 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_95 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '323px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_96 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_97 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_98 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_120 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '359px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_122 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_123 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_81 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_124 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '394px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_80 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_78 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_45 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_46 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '429px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_47 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_48 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_49 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_51 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '464px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_52 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '972px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_53 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1070px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_54 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1168px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_66 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '864px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 15</span>
      </div>
      {/* Process Value IOField: IO 域_68 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '998px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '998px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 17</span>
      </div>
      {/* Process Value IOField: IO 域_69 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '998px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '998px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 18</span>
      </div>
      {/* Process Value IOField: IO 域_71 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '864px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '864px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 19</span>
      </div>
      {/* Process Value IOField: IO 域_72 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1131px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1131px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 20</span>
      </div>
      {/* Process Value IOField: IO 域_79 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1131px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1131px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 29</span>
      </div>
      {/* Diagnostic Row: Casella di testo_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '438px', top: '147px', width: '400px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 1</span>
      </div>
      {/* Process Value IOField: IO 域_25 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '217px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_26 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_27 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_28 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '438px', top: '183px', width: '106px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 8</span>
      </div>
      {/* Diagnostic Row: Casella di testo_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '546px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 9</span>
      </div>
      {/* Diagnostic Row: Casella di testo_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '644px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 10</span>
      </div>
      {/* Diagnostic Row: Casella di testo_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '742px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 12</span>
      </div>
      {/* Process Value IOField: IO 域_29 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '252px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_30 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_31 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_32 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_33 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '287px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_34 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_35 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_36 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_37 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '323px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_38 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_39 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_40 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_41 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '359px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_42 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_43 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_24 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_44 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '394px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_23 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_21 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_4 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '429px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_5 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_6 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_7 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_8 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '464px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_9 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_10 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_11 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_12 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '499px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_13 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '546px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_14 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '644px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_15 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '742px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_16 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '438px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 2</span>
      </div>
      {/* Process Value IOField: IO 域_17 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '572px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '572px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 3</span>
      </div>
      {/* Process Value IOField: IO 域_18 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '572px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '572px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 4</span>
      </div>
      {/* Process Value IOField: IO 域_19 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '438px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '438px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 5</span>
      </div>
      {/* Process Value IOField: IO 域_20 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '705px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '705px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 6</span>
      </div>
      {/* Process Value IOField: IO 域_22 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '705px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '705px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 13</span>
      </div>
      {/* Diagnostic Row: Casella di testo_47 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '14px', top: '147px', width: '400px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 47</span>
      </div>
      {/* Process Value IOField: IO 域_76 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '217px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_77 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_55 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_56 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '217px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_43 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '14px', top: '183px', width: '106px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 43</span>
      </div>
      {/* Diagnostic Row: Casella di testo_49 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '122px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 49</span>
      </div>
      {/* Diagnostic Row: Casella di testo_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '220px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 27</span>
      </div>
      {/* Diagnostic Row: Casella di testo_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '318px', top: '183px', width: '96px', height: '34px' }}>
        <span className="truncate font-sans">Casella di testo 28</span>
      </div>
      {/* Process Value IOField: IO 域_57 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '252px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_60 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_61 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_62 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '252px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_65 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '287px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_67 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_70 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_73 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '287px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_74 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '323px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_75 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_99 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_100 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '323px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_103 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '359px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_104 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_105 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_106 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '359px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_107 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '394px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_108 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_109 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_110 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '394px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_111 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '429px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_112 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_113 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_114 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '429px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_115 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '464px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_116 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_117 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_118 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '464px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_101 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '499px', width: '106px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_102 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '122px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_119 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '220px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_121 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '318px', top: '499px', width: '96px', height: '34px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_162 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_69 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '14px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 69</span>
      </div>
      {/* Process Value IOField: IO 域_171 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '148px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_72 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '148px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 72</span>
      </div>
      {/* Process Value IOField: IO 域_164 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '148px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_70 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '148px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 70</span>
      </div>
      {/* Process Value IOField: IO 域_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '14px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '14px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 11</span>
      </div>
      {/* Process Value IOField: IO 域_161 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '281px', top: '621px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_68 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '281px', top: '602px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 68</span>
      </div>
      {/* Process Value IOField: IO 域_50 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '281px', top: '552px', width: '132px', height: '46px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '281px', top: '535px', width: '132px', height: '17px' }}>
        <span className="truncate font-sans">Casella di testo 22</span>
      </div>
      {/* Process Value IOField: IO 域_244 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '440px', top: '90px', width: '176px', height: '52px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_55 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '440px', top: '70px', width: '176px', height: '19px' }}>
        <span className="truncate font-sans">Casella di testo 55</span>
      </div>
      {/* Process Value IOField: IO 域_243 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '620px', top: '90px', width: '176px', height: '52px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_53 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '620px', top: '70px', width: '176px', height: '19px' }}>
        <span className="truncate font-sans">Casella di testo 53</span>
      </div>
      {/* Process Value IOField: IO 域_91 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '801px', top: '90px', width: '176px', height: '52px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '801px', top: '70px', width: '176px', height: '19px' }}>
        <span className="truncate font-sans">Casella di testo 16</span>
      </div>
      {/* Process Value IOField: IO 域_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '983px', top: '89px', width: '176px', height: '52px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Casella di testo_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '983px', top: '69px', width: '176px', height: '19px' }}>
        <span className="truncate font-sans">Casella di testo 7</span>
      </div>
      {/* Action Button: Button_15 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1161px', top: '69px', width: '102px', height: '72px' }}>
        <span className="truncate w-full text-center">15</span>
      </button>
    </div>
  );
}

export default ProductionCountComponent;
