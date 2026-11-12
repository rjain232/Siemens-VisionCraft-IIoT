import React, { useState } from 'react';

function PopupPRODDATACTLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '370px', height: '496px', minHeight: '496px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '330px', height: '456px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '328px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Textfeld_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '70px', top: '364px', width: '255px', height: '88px' }}>
        <span className="truncate font-sans">Textfeld 11</span>
      </div>
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '412px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '23px', top: '392px', width: '30px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '364px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Header Label: Textfeld_10 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '34px', width: '205px', height: '28px' }}>
        <span className="truncate">Textfeld 10</span>
      </div>
      {/* Diagnostic Row: Textfeld_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '101px', width: '205px', height: '25px' }}>
        <span className="truncate font-sans">Textfeld 12</span>
      </div>
      {/* Header Label: Textfeld_14 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '64px', width: '318px', height: '35px' }}>
        <span className="truncate">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '127px', width: '318px', height: '40px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '218px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Diagnostic Row: Textfeld_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '70px', top: '218px', width: '255px', height: '74px' }}>
        <span className="truncate font-sans">Textfeld 3</span>
      </div>
      {/* Diagnostic Row: Textfeld_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '251px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 4</span>
      </div>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '292px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '70px', top: '292px', width: '255px', height: '70px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '324px', width: '55px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 7</span>
      </div>
      {/* Diagnostic Row: Text_IONoMeasure */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '169px', width: '100px', height: '25px' }}>
        <span className="truncate font-sans">Text IONoMeasure</span>
      </div>
      {/* Diagnostic Row: Text_IOMeasureRun */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '115px', top: '169px', width: '100px', height: '25px' }}>
        <span className="truncate font-sans">Text IOMeasureRun</span>
      </div>
      {/* Diagnostic Row: Text_IOMeasureHold */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '220px', top: '169px', width: '100px', height: '25px' }}>
        <span className="truncate font-sans">Text IOMeasureHold</span>
      </div>
      {/* Diagnostic Row: Text_NoMeasure */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '195px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Text NoMeasure</span>
      </div>
      {/* Diagnostic Row: Text_MeasureRun */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '115px', top: '195px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Text MeasureRun</span>
      </div>
      {/* Diagnostic Row: Text_MeasureHold */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '220px', top: '195px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Text MeasureHold</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '239px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
    </div>
  );
}

export default PopupPRODDATACTLEGENDPopupComponent;
