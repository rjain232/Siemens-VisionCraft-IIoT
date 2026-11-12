import React, { useState } from 'react';

function PopupPNDEVDIAGCounterPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '732px', height: '373px', minHeight: '373px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '290px', height: '322px' }} />
      {/* Diagnostic Row: Text_ReadedDEVNumbers */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '163px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text ReadedDEVNumbers</span>
      </div>
      {/* Header Label: Text_Configured */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '37px', width: '130px', height: '25px' }}>
        <span className="truncate">Text Configured</span>
      </div>
      {/* Process Value IOField: Counter_Configured */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '38px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Faulty */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '112px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Faulty</span>
      </div>
      {/* Process Value IOField: Counter_Faulty */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '113px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Deaktivated */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '87px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Deaktivated</span>
      </div>
      {/* Process Value IOField: Counter_Deaktivated */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '88px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Text_Present */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '62px', width: '130px', height: '25px' }}>
        <span className="truncate">Text Present</span>
      </div>
      {/* Process Value IOField: Counter_Present */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '63px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Problem */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '137px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Problem</span>
      </div>
      {/* Process Value IOField: Counter_Problem */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '138px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_MaxDevices */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '266px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxDevices</span>
      </div>
      {/* Diagnostic Row: Text_MaxModules */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '291px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxModules</span>
      </div>
      {/* Process Value IOField: Counter_MaxDevices */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '267px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_Max_Modules */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '292px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Text_PNDEVCounter */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '3px', width: '288px', height: '30px' }}>
        <span className="truncate">Text PNDEVCounter</span>
      </div>
      {/* Diagnostic Row: Text_PLCSettings */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '241px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text PLCSettings</span>
      </div>
      {/* Diagnostic Row: Text_Lowest */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '185px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Lowest</span>
      </div>
      {/* Diagnostic Row: Text_Highest */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '210px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Highest</span>
      </div>
      {/* Process Value IOField: Counter_LowDevice */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '187px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_HighDevice */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '145px', top: '212px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Cancel Mode_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '206px', top: '278px', width: '82px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode 1</span>
      </button>
      {/* Group Container Rectangle: Background_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '8px', width: '290px', height: '322px' }} />
      {/* Diagnostic Row: Text_ReadedDEVNumbers_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '16px', top: '171px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text ReadedDEVNumbers 1</span>
      </div>
      {/* Header Label: Text_Configured_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '18px', top: '45px', width: '130px', height: '25px' }}>
        <span className="truncate">Text Configured 1</span>
      </div>
      {/* Process Value IOField: Counter_Configured_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '46px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Faulty_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '120px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Faulty 1</span>
      </div>
      {/* Process Value IOField: Counter_Faulty_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '121px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Deaktivated_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '95px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Deaktivated 1</span>
      </div>
      {/* Process Value IOField: Counter_Deaktivated_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '96px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Present_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '70px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Present 1</span>
      </div>
      {/* Process Value IOField: Counter_Present_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '71px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Problem_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '145px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Problem 1</span>
      </div>
      {/* Process Value IOField: Counter_Problem_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '146px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_MaxDevices_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '274px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxDevices 1</span>
      </div>
      {/* Diagnostic Row: Text_MaxModules_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '299px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxModules 1</span>
      </div>
      {/* Process Value IOField: Counter_MaxDevices_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '275px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_Max_Modules_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '300px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Text_PNDEVCounter_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '11px', width: '288px', height: '30px' }}>
        <span className="truncate">Text PNDEVCounter 1</span>
      </div>
      {/* Diagnostic Row: Text_PLCSettings_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '249px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text PLCSettings 1</span>
      </div>
      {/* Diagnostic Row: Text_Lowest_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '193px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Lowest 1</span>
      </div>
      {/* Diagnostic Row: Text_Highest_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '18px', top: '218px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Highest 1</span>
      </div>
      {/* Process Value IOField: Counter_LowDevice_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '195px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_HighDevice_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '153px', top: '220px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Cancel Mode_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '214px', top: '286px', width: '82px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode 2</span>
      </button>
      {/* Group Container Rectangle: Background_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '402px', top: '11px', width: '290px', height: '322px' }} />
      {/* Diagnostic Row: Text_ReadedDEVNumbers_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '410px', top: '174px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text ReadedDEVNumbers 2</span>
      </div>
      {/* Header Label: Text_Configured_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '412px', top: '48px', width: '130px', height: '25px' }}>
        <span className="truncate">Text Configured 2</span>
      </div>
      {/* Process Value IOField: Counter_Configured_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '49px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Faulty_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '123px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Faulty 2</span>
      </div>
      {/* Process Value IOField: Counter_Faulty_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '124px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Deaktivated_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '98px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Deaktivated 2</span>
      </div>
      {/* Process Value IOField: Counter_Deaktivated_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '99px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Present_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '73px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Present 2</span>
      </div>
      {/* Process Value IOField: Counter_Present_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '74px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Problem_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '148px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Problem 2</span>
      </div>
      {/* Process Value IOField: Counter_Problem_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '149px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_MaxDevices_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '277px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxDevices 2</span>
      </div>
      {/* Diagnostic Row: Text_MaxModules_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '302px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text MaxModules 2</span>
      </div>
      {/* Process Value IOField: Counter_MaxDevices_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '278px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_Max_Modules_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '303px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Text_PNDEVCounter_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '403px', top: '14px', width: '288px', height: '30px' }}>
        <span className="truncate">Text PNDEVCounter 2</span>
      </div>
      {/* Diagnostic Row: Text_PLCSettings_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '252px', width: '276px', height: '25px' }}>
        <span className="truncate font-sans">Text PLCSettings 2</span>
      </div>
      {/* Diagnostic Row: Text_Lowest_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '196px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Lowest 2</span>
      </div>
      {/* Diagnostic Row: Text_Highest_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '412px', top: '221px', width: '130px', height: '25px' }}>
        <span className="truncate font-sans">Text Highest 2</span>
      </div>
      {/* Process Value IOField: Counter_LowDevice_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '198px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: Counter_HighDevice_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '547px', top: '223px', width: '44px', height: '23px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Cancel Mode_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '608px', top: '289px', width: '82px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode 3</span>
      </button>
    </div>
  );
}

export default PopupPNDEVDIAGCounterPopupComponent;
