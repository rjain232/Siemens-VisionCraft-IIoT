import React, { useState } from 'react';

function PopupPRODDATASCLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '380px', height: '325px', minHeight: '325px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '340px', height: '285px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '328px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Textfeld_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '70px', top: '196px', width: '255px', height: '89px' }}>
        <span className="truncate font-sans">Textfeld 11</span>
      </div>
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '238px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '23px', top: '219px', width: '30px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '190px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Header Label: Textfeld_10 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '34px', width: '208px', height: '28px' }}>
        <span className="truncate">Textfeld 10</span>
      </div>
      {/* Header Label: Textfeld_14 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '63px', width: '315px', height: '35px' }}>
        <span className="truncate">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '100px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Diagnostic Row: Textfeld_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '70px', top: '100px', width: '270px', height: '96px' }}>
        <span className="truncate font-sans">Textfeld 3</span>
      </div>
      {/* Diagnostic Row: Textfeld_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '133px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 4</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '249px', top: '3px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
    </div>
  );
}

export default PopupPRODDATASCLEGENDPopupComponent;
