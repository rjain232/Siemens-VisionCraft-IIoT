import React, { useState } from 'react';

function PopupPANELINITIALIZEDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '840px', height: '440px', minHeight: '440px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '800px', height: '400px' }} />
      {/* Group Container Rectangle: Frame_Orange */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '3px', top: '3px', width: '794px', height: '394px' }} />
      {/* Action Button: Button_Save */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '290px', top: '255px', width: '220px', height: '60px' }}>
        <span className="truncate w-full text-center">Save</span>
      </button>
      {/* Process Value IOField: Input_HMI_No */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '427px', top: '185px', width: '102px', height: '40px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text_Warning */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '85px', width: '400px', height: '70px' }}>
        <span className="truncate font-sans">Text Warning</span>
      </div>
      {/* Diagnostic Row: Text_HMI_No */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '272px', top: '185px', width: '150px', height: '40px' }}>
        <span className="truncate font-sans">Text HMI No</span>
      </div>
    </div>
  );
}

export default PopupPANELINITIALIZEDPopupComponent;
