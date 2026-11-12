import React, { useState } from 'react';

function PopupIFSIGNALSLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '367px', height: '240px', minHeight: '240px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '327px', height: '200px' }} />
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '85px', width: '250px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '236px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '107px', width: '300px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '132px', width: '250px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Diagnostic Row: Textfeld_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '154px', width: '310px', height: '35px' }}>
        <span className="truncate font-sans">Textfeld 3</span>
      </div>
      {/* Header Label: Textfeld_4 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '10px', width: '210px', height: '75px' }}>
        <span className="truncate">Textfeld 4</span>
      </div>
    </div>
  );
}

export default PopupIFSIGNALSLEGENDPopupComponent;
