import React, { useState } from 'react';

function PopupMOVELEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '440px', height: '545px', minHeight: '545px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Rechteck_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '400px', height: '505px' }} />
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '398px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Siemens Polygon Shape: Arrow_ADV_Left_Fast */}
      <div className="absolute bg-[#027AAC] opacity-80 rounded-sm z-10" style={{ left: '24px', top: '195px', width: '15px', height: '30px' }} />
      {/* Siemens Polygon Shape: Arrow_RTN_Right_Fast */}
      <div className="absolute bg-[#027AAC] opacity-80 rounded-sm z-10" style={{ left: '78px', top: '195px', width: '15px', height: '30px' }} />
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '125px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '147px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Header Label: Textfeld_3 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '37px', width: '165px', height: '20px' }}>
        <span className="truncate">Textfeld 3</span>
      </div>
      {/* Header Label: Textfeld_4 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '59px', width: '165px', height: '20px' }}>
        <span className="truncate">Textfeld 4</span>
      </div>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '81px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '103px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '180px', top: '125px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Diagnostic Row: Textfeld_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '180px', top: '147px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 10</span>
      </div>
      {/* Header Label: Textfeld_11 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '180px', top: '37px', width: '120px', height: '20px' }}>
        <span className="truncate">Textfeld 11</span>
      </div>
      {/* Header Label: Textfeld_12 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '180px', top: '59px', width: '200px', height: '20px' }}>
        <span className="truncate">Textfeld 12</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '180px', top: '74px', width: '141px', height: '33px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Diagnostic Row: Textfeld_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '180px', top: '103px', width: '165px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '172px', width: '100px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Diagnostic Row: Textfeld_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '190px', width: '280px', height: '40px' }}>
        <span className="truncate font-sans">Textfeld 16</span>
      </div>
      {/* Diagnostic Row: Textfeld_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '232px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 17</span>
      </div>
      {/* Diagnostic Row: Textfeld_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '259px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 18</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '309px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Action Button: PB_ADV */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '230px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB ADV</span>
      </button>
      {/* Action Button: PB_RTN */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '67px', top: '230px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB RTN</span>
      </button>
      {/* Action Button: PB_ADV_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '257px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB ADV 1</span>
      </button>
      {/* Action Button: PB_RTN_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '67px', top: '257px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB RTN 1</span>
      </button>
      {/* Action Button: PB_ON */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '284px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB ON</span>
      </button>
      {/* Action Button: PB_OFF */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '67px', top: '284px', width: '36px', height: '24px' }}>
        <span className="truncate w-full text-center">PB OFF</span>
      </button>
      {/* Action Button: Safety */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '445px', width: '90px', height: '25px' }}>
        <span className="truncate w-full text-center">Safety</span>
      </button>
      {/* Action Button: Teil_vorh */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '416px', width: '90px', height: '25px' }}>
        <span className="truncate w-full text-center">Teil vorh</span>
      </button>
      {/* Actuator Badge: Position_LeftEnd */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border-[#C3C3C3] font-semibold border rounded-sm flex items-center justify-center text-[10px] leading-tight px-0.5 z-20" style={{ left: '13px', top: '311px', width: '30px', height: '20px' }}>
        <span className="truncate">LeftEnd</span>
      </div>
      {/* Actuator Badge: Position_LeftSlow */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border-[#C3C3C3] font-semibold border rounded-sm flex items-center justify-center text-[10px] leading-tight px-0.5 z-20" style={{ left: '73px', top: '311px', width: '30px', height: '20px' }}>
        <span className="truncate">LeftSlow</span>
      </div>
      {/* Action Button: InterlockADV */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '389px', width: '90px', height: '25px' }}>
        <span className="truncate w-full text-center">InterlockADV</span>
      </button>
      {/* Action Button: ADV_Fast */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '361px', width: '90px', height: '25px' }}>
        <span className="truncate w-full text-center">ADV Fast</span>
      </button>
      {/* Action Button: ADV_Slow */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '334px', width: '90px', height: '25px' }}>
        <span className="truncate w-full text-center">ADV Slow</span>
      </button>
      {/* Action Button: Feedback DeviceON */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '473px', width: '90px', height: '25px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Diagnostic Row: Textfeld_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '286px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 7</span>
      </div>
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '309px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Diagnostic Row: Textfeld_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '335px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 19</span>
      </div>
      {/* Diagnostic Row: Textfeld_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '363px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 20</span>
      </div>
      {/* Diagnostic Row: Textfeld_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '390px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 21</span>
      </div>
      {/* Diagnostic Row: Textfeld_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '418px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 22</span>
      </div>
      {/* Diagnostic Row: Textfeld_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '446px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 23</span>
      </div>
      {/* Diagnostic Row: Textfeld_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '476px', width: '280px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 24</span>
      </div>
    </div>
  );
}

export default PopupMOVELEGENDPopupComponent;
