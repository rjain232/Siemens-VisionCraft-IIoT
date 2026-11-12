import React, { useState } from 'react';

function PopupCycleTimeLegendComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '730px', height: '160px', minHeight: '160px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '61px', top: '2px', width: '209px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Header Label: Textfeld_3 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '37px', width: '140px', height: '20px' }}>
        <span className="truncate">Textfeld 3</span>
      </div>
      {/* Header Label: Textfeld_11 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '155px', top: '37px', width: '145px', height: '20px' }}>
        <span className="truncate">Textfeld 11</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '288px', top: '1px', width: '71px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '100px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Header Label: Textfeld_13 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '145px', top: '1px', width: '200px', height: '20px' }}>
        <span className="truncate">Textfeld 13</span>
      </div>
      {/* Diagnostic Row: Textfeld_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '250px', top: '100px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 4</span>
      </div>
      {/* Header Label: Textfeld_12 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '145px', top: '1px', width: '202px', height: '20px' }}>
        <span className="truncate">Textfeld 12</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '400px', top: '100px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Header Label: Textfeld_14 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '145px', top: '1px', width: '200px', height: '20px' }}>
        <span className="truncate">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '550px', top: '100px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Header Label: Textfeld_9 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '145px', top: '1px', width: '200px', height: '20px' }}>
        <span className="truncate">Textfeld 9</span>
      </div>
    </div>
  );
}

export default PopupCycleTimeLegendComponent;
