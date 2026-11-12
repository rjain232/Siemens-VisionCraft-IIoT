import React, { useState } from 'react';

function PopupOVERVIEWLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '400px', height: '520px', minHeight: '520px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '360px', height: '480px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '358px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '148px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '126px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Header Label: Textfeld_3 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '37px', width: '140px', height: '20px' }}>
        <span className="truncate">Textfeld 3</span>
      </div>
      {/* Header Label: Textfeld_4 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '60px', width: '140px', height: '20px' }}>
        <span className="truncate">Textfeld 4</span>
      </div>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '82px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '104px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '126px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Diagnostic Row: Textfeld_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '148px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 10</span>
      </div>
      {/* Header Label: Textfeld_11 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '155px', top: '37px', width: '110px', height: '20px' }}>
        <span className="truncate">Textfeld 11</span>
      </div>
      {/* Header Label: Textfeld_12 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '155px', top: '60px', width: '200px', height: '20px' }}>
        <span className="truncate">Textfeld 12</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '82px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Diagnostic Row: Textfeld_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '104px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 14</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '269px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Textfeld_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '207px', width: '335px', height: '54px' }}>
        <span className="truncate font-sans">Textfeld 7</span>
      </div>
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '170px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '154px', top: '163px', width: '200px', height: '36px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Schematic Trace: Linie_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '270px', width: '340px' }} />
      {/* Schematic Trace: Linie_2 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '271px', width: '340px' }} />
      {/* Action Button: Textfeld_Legende_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[9px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '281px', width: '340px', height: '20px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Textfeld_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '309px', width: '345px', height: '36px' }}>
        <span className="truncate font-sans">Textfeld 16</span>
      </div>
      {/* Diagnostic Row: Textfeld_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '227px', top: '347px', width: '35px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 17</span>
      </div>
      {/* Diagnostic Row: Textfeld_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '308px', top: '347px', width: '45px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 18</span>
      </div>
      {/* Diagnostic Row: Textfeld_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '269px', top: '346px', width: '32px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 20</span>
      </div>
      {/* Diagnostic Row: Textfeld_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '183px', top: '347px', width: '32px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 19</span>
      </div>
      {/* Group Container Rectangle: V_01 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '198px', top: '368px', width: '3px', height: '11px' }} />
      {/* Group Container Rectangle: H_01 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '191px', top: '379px', width: '17px', height: '3px' }} />
      {/* Diagnostic Row: Textfeld_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '347px', width: '168px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 21</span>
      </div>
      {/* Diagnostic Row: Textfeld_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '380px', width: '330px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 22</span>
      </div>
      {/* Diagnostic Row: Textfeld_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '400px', width: '25px', height: '18px' }}>
        <span className="truncate font-sans">Textfeld 23</span>
      </div>
      {/* Diagnostic Row: Textfeld_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '127px', top: '400px', width: '25px', height: '18px' }}>
        <span className="truncate font-sans">Textfeld 24</span>
      </div>
      {/* Diagnostic Row: Textfeld_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '234px', top: '400px', width: '25px', height: '18px' }}>
        <span className="truncate font-sans">Textfeld 25</span>
      </div>
      {/* Diagnostic Row: Textfeld_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '50px', top: '399px', width: '75px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 26</span>
      </div>
      {/* Diagnostic Row: Textfeld_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '157px', top: '400px', width: '75px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 27</span>
      </div>
      {/* Diagnostic Row: Textfeld_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '264px', top: '400px', width: '75px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 28</span>
      </div>
      {/* Diagnostic Row: Textfeld_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '422px', width: '345px', height: '52px' }}>
        <span className="truncate font-sans">Textfeld 29</span>
      </div>
    </div>
  );
}

export default PopupOVERVIEWLEGENDPopupComponent;
