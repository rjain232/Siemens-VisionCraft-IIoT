import React, { useState } from 'react';

function PopupALARMHISTORYLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '370px', height: '140px', minHeight: '140px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '330px', height: '100px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '328px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Header Label: Textfeld_11 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '33px', width: '230px', height: '60px' }}>
        <span className="truncate">Textfeld 11</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '239px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
    </div>
  );
}

export default PopupALARMHISTORYLEGENDPopupComponent;
