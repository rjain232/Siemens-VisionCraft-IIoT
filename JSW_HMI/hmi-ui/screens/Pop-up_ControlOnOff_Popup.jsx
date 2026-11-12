import React, { useState } from 'react';

function PopupControlOnOffPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '350px', height: '183px', minHeight: '183px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '310px', height: '143px' }} />
      {/* Header Label: Overview_SafetyDialog */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '1px', width: '308px', height: '25px' }}>
        <span className="truncate">Overview SafetyDialog</span>
      </div>
      {/* Header Label: Descr_ONOFF */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '3px', top: '26px', width: '184px', height: '25px' }}>
        <span className="truncate">Descr ONOFF</span>
      </div>
      {/* Action Button: Button_Power_Off */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '110px', top: '73px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Power Off</span>
      </button>
      {/* Action Button: Button_Close */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '219px', top: '1px', width: '90px', height: '59px' }}>
        <span className="truncate w-full text-center">Close</span>
      </button>
      {/* Action Button: Button_Cancel */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '210px', top: '73px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel</span>
      </button>
      {/* Action Button: Button_Power_On */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '73px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Power On</span>
      </button>
    </div>
  );
}

export default PopupControlOnOffPopupComponent;
