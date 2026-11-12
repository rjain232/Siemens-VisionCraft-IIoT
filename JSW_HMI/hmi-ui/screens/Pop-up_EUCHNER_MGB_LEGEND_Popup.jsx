import React, { useState } from 'react';

function PopupEUCHNERMGBLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '690px', height: '448px', minHeight: '448px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '380px', height: '408px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '100px', top: '100px', width: '378px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '153px', width: '155px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Header Label: Textfeld_3 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '55px', width: '155px', height: '20px' }}>
        <span className="truncate">Textfeld 3</span>
      </div>
      {/* Diagnostic Row: Textfeld_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '87px', width: '155px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 4</span>
      </div>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '109px', width: '155px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '131px', width: '155px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '170px', top: '153px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 10</span>
      </div>
      {/* Header Label: Textfeld_11 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '170px', top: '45px', width: '200px', height: '40px' }}>
        <span className="truncate">Textfeld 11</span>
      </div>
      {/* Diagnostic Row: Textfeld_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '170px', top: '87px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 12</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '170px', top: '109px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Diagnostic Row: Textfeld_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '170px', top: '131px', width: '200px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '178px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Diagnostic Row: Textfeld_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '201px', width: '300px', height: '40px' }}>
        <span className="truncate font-sans">Textfeld 16</span>
      </div>
      {/* Diagnostic Row: Textfeld_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '243px', width: '300px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 17</span>
      </div>
      {/* Diagnostic Row: Textfeld_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '264px', width: '300px', height: '39px' }}>
        <span className="truncate font-sans">Textfeld 18</span>
      </div>
      {/* Diagnostic Row: Textfeld_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '345px', width: '300px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 19</span>
      </div>
      {/* Diagnostic Row: Textfeld_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '366px', width: '300px', height: '39px' }}>
        <span className="truncate font-sans">Textfeld 20</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '289px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Schematic Trace: Handle_Top_DoorOff */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '283px', width: '17px' }} />
      {/* Schematic Trace: Handle_Top_DoorOff_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '323px', width: '17px' }} />
      {/* Siemens Graphic View: Lock */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '345px', width: '16px', height: '16px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="Lock" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Action Button: Pushbutton_Left_ON */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '250px', top: '100px', width: '100px', height: '30px' }}>
        <span className="truncate w-full text-center">Pushbutton Left ON</span>
      </button>
      {/* Action Button: Pushbutton_Right_ON */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '400px', top: '100px', width: '100px', height: '30px' }}>
        <span className="truncate w-full text-center">Pushbutton Right ON</span>
      </button>
      {/* Schematic Trace: Line_Automatic */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '16px', top: '221px', width: '6px' }} />
      {/* Group Container Rectangle: Frame_Door */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '58px', top: '216px', width: '6px', height: '10px' }} />
      {/* Schematic Trace: Doorhandle */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '58px', top: '221px', width: '3px' }} />
      {/* Action Button: Pushbutton_Middle_ON */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '550px', top: '100px', width: '100px', height: '30px' }}>
        <span className="truncate w-full text-center">Pushbutton Middle ON</span>
      </button>
      {/* Diagnostic Row: Text_ */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '36px', top: '214px', width: '8px', height: '14px' }}>
        <span className="truncate font-sans">Text</span>
      </div>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '304px', width: '300px', height: '39px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Siemens Status LED: Frame_Yellow_R25 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '100px', top: '160px', width: '100px', height: '30px' }} />
      {/* Siemens Status LED: Switch_Shadow_R6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '160px', width: '100px', height: '30px' }} />
      {/* Siemens Status LED: Switch_Red_R6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '400px', top: '160px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Handle_Down_DoorClosed */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '10px', top: '243px', width: '6px', height: '22px' }} />
    </div>
  );
}

export default PopupEUCHNERMGBLEGENDPopupComponent;
