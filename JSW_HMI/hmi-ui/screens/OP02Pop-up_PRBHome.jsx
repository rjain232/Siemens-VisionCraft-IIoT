import React, { useState } from 'react';

function OP02PopupPRBHomeComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '365px', height: '383px', minHeight: '383px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Text field TG Status */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '0px', width: '273px', height: '47px' }}>
        <span className="truncate">Text field TG Status</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '195px', top: '3px', width: '76px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Group Container Rectangle: Rectangle TG1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '52px', width: '265px', height: '29px' }} />
      {/* Header Label: Textfeld_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '57px', width: '21px', height: '20px' }}>
        <span className="truncate">Textfeld 1</span>
      </div>
      {/* Header Label: Textfeld_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '50px', top: '56px', width: '245px', height: '20px' }}>
        <span className="truncate">Textfeld 2</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '84px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '9px', top: '89px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '116px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '9px', top: '121px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '148px', width: '265px', height: '29px' }} />
      {/* Group Container Rectangle: Rectangle TG1_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '180px', width: '265px', height: '29px' }} />
      {/* Group Container Rectangle: Rectangle TG1_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '212px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '153px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 18</span>
      </div>
      {/* Diagnostic Row: Textfeld_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '88px', width: '245px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 3</span>
      </div>
      {/* Diagnostic Row: Textfeld_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '121px', width: '245px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 4</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '152px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '3px', top: '245px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '185px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '187px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 11</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '279px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '217px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 10</span>
      </div>
      {/* Diagnostic Row: Textfeld_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '218px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 12</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '4px', top: '314px', width: '265px', height: '29px' }} />
      {/* Diagnostic Row: Textfeld_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '250px', width: '21px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 16</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '250px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Vertical Bus Line: Line_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '37px', top: '52px', height: '291px' }} />
    </div>
  );
}

export default OP02PopupPRBHomeComponent;
