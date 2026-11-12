import React, { useState } from 'react';

function PopupATDCComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '435px', height: '539px', minHeight: '539px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Process Value IOField: Robot Name */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '2px', top: '2px', width: '393px', height: '48px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-1px', top: '49px', width: '395px', height: '450px' }} />
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '315px', top: '4px', width: '76px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '29px', top: '63px', width: '324px', height: '402px' }} />
      {/* Diagnostic Row: Text Filed E- Stop_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '339px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop 17</span>
      </div>
      {/* Diagnostic Row: Text Field In Auto On_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '99px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Auto On 9</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '123px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 17</span>
      </div>
      {/* Header Label: Text field Robot Status_5 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '31px', top: '64px', width: '324px', height: '30px' }}>
        <span className="truncate">Text field Robot Status 5</span>
      </div>
      {/* Diagnostic Row: Text Field Manual_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '267px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual 17</span>
      </div>
      {/* Diagnostic Row: Text Field System Ready_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '147px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field System Ready 9</span>
      </div>
      {/* Diagnostic Row: Text Field Motor On_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '171px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Motor On 9</span>
      </div>
      {/* Diagnostic Row: Text Field In Cycle_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '195px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Cycle 9</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '219px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On 17</span>
      </div>
      {/* Diagnostic Row: Text Field On Path_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '243px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path 17</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '291px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode 17</span>
      </div>
      {/* Diagnostic Row: Text Field Stop_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '315px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop 17</span>
      </div>
      {/* Diagnostic Row: Text Filed Error_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '363px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Error 9</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '387px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault 9</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '411px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault 1</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '41px', top: '434px', width: '298px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault 2</span>
      </div>
    </div>
  );
}

export default PopupATDCComponent;
