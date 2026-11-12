import React, { useState } from 'react';

function PopupEEMLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '690px', height: '536px', minHeight: '536px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '430px', height: '496px' }} />
      {/* Action Button: Text_Legend1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '86px', top: '96px', width: '140px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Text_Legend2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[9px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '32px', width: '325px', height: '20px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Text_ButtonsLeds */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[9px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '56px', width: '150px', height: '20px' }}>
        <span className="truncate w-full text-center">Text ButtonsLeds</span>
      </button>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '337px', top: '3px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Text_P-Meas1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '78px', width: '60px', height: '40px' }}>
        <span className="truncate font-sans">Text P-Meas1</span>
      </div>
      {/* Diagnostic Row: Text_P-Meas2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '76px', width: '350px', height: '54px' }}>
        <span className="truncate font-sans">Text P-Meas2</span>
      </div>
      {/* Diagnostic Row: Text_Control+1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '190px', width: '60px', height: '40px' }}>
        <span className="truncate font-sans">Text Control+1</span>
      </div>
      {/* Diagnostic Row: Text_UIPE1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '232px', width: '60px', height: '40px' }}>
        <span className="truncate font-sans">Text UIPE1</span>
      </div>
      {/* Siemens Status LED: Symbol_Meas1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '100px', width: '100px', height: '30px' }} />
      {/* Siemens Status LED: Symbol_RefMeas1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '400px', top: '100px', width: '100px', height: '30px' }} />
      {/* Siemens Status LED: Symbol1_RefMeas1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '550px', top: '100px', width: '100px', height: '30px' }} />
      {/* Diagnostic Row: Text_Meas2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '132px', width: '350px', height: '18px' }}>
        <span className="truncate font-sans">Text Meas2</span>
      </div>
      {/* Diagnostic Row: Text_RefMeas2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '151px', width: '350px', height: '18px' }}>
        <span className="truncate font-sans">Text RefMeas2</span>
      </div>
      {/* Diagnostic Row: Text_DevNo_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '170px', width: '350px', height: '18px' }}>
        <span className="truncate font-sans">Text DevNo 3</span>
      </div>
      {/* Diagnostic Row: Text_Control+2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '193px', width: '350px', height: '35px' }}>
        <span className="truncate font-sans">Text Control+2</span>
      </div>
      {/* Action Button: Button_ResetText_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '75px', top: '235px', width: '350px', height: '35px' }}>
        <span className="truncate w-full text-center">ResetText 4</span>
      </button>
      {/* Diagnostic Row: Text_InfoMachine1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '274px', width: '60px', height: '40px' }}>
        <span className="truncate font-sans">Text InfoMachine1</span>
      </div>
      {/* Siemens Status LED: Symbol2_RefMeas1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '100px', top: '160px', width: '100px', height: '30px' }} />
      {/* Diagnostic Row: Text_InfoMachine2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '277px', width: '350px', height: '35px' }}>
        <span className="truncate font-sans">Text InfoMachine2</span>
      </div>
      {/* Diagnostic Row: Text_ScreenContent */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '318px', width: '150px', height: '20px' }}>
        <span className="truncate font-sans">Text ScreenContent</span>
      </div>
      {/* Diagnostic Row: Text_MeasPoint */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '340px', width: '415px', height: '35px' }}>
        <span className="truncate font-sans">Text MeasPoint</span>
      </div>
      {/* Siemens Status LED: Symbol3_RefMeas1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '160px', width: '100px', height: '30px' }} />
      {/* Diagnostic Row: Text_GraphDisplay1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '377px', width: '415px', height: '35px' }}>
        <span className="truncate font-sans">Text GraphDisplay1</span>
      </div>
      {/* Diagnostic Row: Text_GraphDisplay2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '414px', width: '415px', height: '35px' }}>
        <span className="truncate font-sans">Text GraphDisplay2</span>
      </div>
      {/* Diagnostic Row: Text_GraphDisplay3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '451px', width: '415px', height: '35px' }}>
        <span className="truncate font-sans">Text GraphDisplay3</span>
      </div>
    </div>
  );
}

export default PopupEEMLEGENDPopupComponent;
