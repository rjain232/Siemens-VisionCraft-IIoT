import React, { useState } from 'react';

function PopupVISIONOFFSETVALUESComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '435px', height: '675px', minHeight: '675px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Process Value IOField: Robot Name */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '2px', top: '2px', width: '393px', height: '48px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-1px', top: '49px', width: '395px', height: '586px' }} />
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '315px', top: '4px', width: '76px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '9px', top: '62px', width: '378px', height: '540px' }} />
      {/* Header Label: Text field Robot Status_5 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '63px', width: '378px', height: '30px' }}>
        <span className="truncate">Text field Robot Status 5</span>
      </div>
      {/* Process Value IOField: FaultNo */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '251px', top: '99px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text field_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '20px', top: '117px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 8</span>
      </div>
      {/* Diagnostic Row: Text field_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '20px', top: '195px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 1</span>
      </div>
      {/* Process Value IOField: FaultNo_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '251px', top: '176px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: FaultNo_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '250px', top: '331px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text field_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '350px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 2</span>
      </div>
      {/* Diagnostic Row: Text field_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '272px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 3</span>
      </div>
      {/* Process Value IOField: FaultNo_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '250px', top: '254px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: FaultNo_4 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '250px', top: '495px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text field_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '514px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 4</span>
      </div>
      {/* Diagnostic Row: Text field_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '436px', width: '223px', height: '29px' }}>
        <span className="truncate font-sans">Text field 5</span>
      </div>
      {/* Process Value IOField: FaultNo_5 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '250px', top: '418px', width: '108px', height: '63px' }}>
        <span>0.00</span>
      </div>
    </div>
  );
}

export default PopupVISIONOFFSETVALUESComponent;
