import React, { useState } from 'react';

function PopupHmiOpmodes24hPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '780px', height: '581px', minHeight: '581px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '1px', width: '740px', height: '540px' }} />
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '74px', top: '100px', width: '34px', height: '38px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Header Label: Text_HmiPanelNo */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '322px', top: '50px', width: '160px', height: '23px' }}>
        <span className="truncate">Text HmiPanelNo</span>
      </div>
      {/* Diagnostic Row: State_OPMode8_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '293px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode8 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode8_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '293px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode8 NotSelect</span>
      </div>
      {/* Header Label: Descr_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '174px', top: '26px', width: '305px', height: '20px' }}>
        <span className="truncate">Descr OPMode</span>
      </div>
      {/* Header Label: Overview_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '1px', width: '657px', height: '25px' }}>
        <span className="truncate">Overview OPMode</span>
      </div>
      {/* Diagnostic Row: State_OPMode1_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '111px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode1 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode1_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '111px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode1 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode2_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '137px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode2 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode2_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '137px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode2 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode3_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '163px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode3 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode3_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '163px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode3 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode4_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode4 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode4_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode4 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode5_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '215px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode5 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode5_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '215px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode5 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode6_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode6 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode6_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode6 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode7_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '267px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode7 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode7_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '267px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode7 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode9_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '319px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode9 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode9_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '319px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode9 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode10_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '345px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode10 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode10_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '345px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode10 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode11_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '371px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode11 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode11_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '371px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode11 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode12_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '397px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode12 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode12_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '397px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode12 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode13_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '424px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode13 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode13_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '424px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode13 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode14_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '450px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode14 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode14_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '450px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode14 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode15_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '476px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode15 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode15_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '476px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode15 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode16_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '502px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode16 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode16_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '502px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode16 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode17_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '528px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode17 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode17_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '528px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode17 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode18_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '554px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode18 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode18_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '554px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode18 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode19_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '580px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode19 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode19_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '580px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode19 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode20_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '606px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode20 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode20_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '606px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode20 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode21_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '632px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode21 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode21_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '632px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode21 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode22_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '658px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode22 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode22_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '658px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode22 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode23_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '684px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode23 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode23_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '684px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode23 NotSelect</span>
      </div>
      {/* Diagnostic Row: State_OPMode24_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '710px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode24 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode24_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '710px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode24 NotSelect</span>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Button_Close */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '647px', top: '0px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Close</span>
      </button>
      {/* Group Container Rectangle: State_OPMode8_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '182px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode1_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode2_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '26px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode3_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '52px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode4_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '78px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode5_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '104px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode6_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '130px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode7_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '156px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode9_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '208px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode10_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '234px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode11_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '260px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode12_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '286px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode13_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '313px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode14_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '339px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode15_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '365px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode16_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '391px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode17_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '417px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode18_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '443px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode19_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '469px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode20_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '495px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode21_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '521px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode22_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '547px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode23_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '573px', top: '0px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: State_OPMode24_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '599px', top: '0px', width: '25px', height: '25px' }} />
    </div>
  );
}

export default PopupHmiOpmodes24hPopupComponent;
