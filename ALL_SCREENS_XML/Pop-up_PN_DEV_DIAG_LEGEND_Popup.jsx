import React, { useState } from 'react';

function PopupPNDEVDIAGLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '470px', height: '592px', minHeight: '592px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '430px', height: '552px' }} />
      {/* Action Button: Text_Legend1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '428px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_NoName */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '204px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV NoName</span>
      </div>
      {/* Header Label: Text_Symbol_PN-DEV_OK */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '29px', width: '170px', height: '20px' }}>
        <span className="truncate">Text Symbol PN-DEV OK</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_Faulty */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '109px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV Faulty</span>
      </div>
      {/* Header Label: Text_Symbol_PN-DEV_NotPresent */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '10px', top: '64px', width: '170px', height: '20px' }}>
        <span className="truncate">Text Symbol PN-DEV NotPresent</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_Deaktivated */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '86px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV Deaktivated</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_NoName */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '199px', width: '235px', height: '35px' }}>
        <span className="truncate font-sans">Text PN-DEV NoName</span>
      </div>
      {/* Header Label: Text_PN-DEV_OK */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '185px', top: '26px', width: '155px', height: '39px' }}>
        <span className="truncate">Text PN-DEV OK</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_Faulty */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '111px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV Faulty</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_Deaktivated */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '89px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV Deaktivated</span>
      </div>
      {/* Action Button: Text_Legend2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[9px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '365px', width: '120px', height: '20px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '339px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Text_PN-DEV_NotPresent */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '67px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV NotPresent</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_WasFaulty */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '131px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV WasFaulty</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_WasFaulty */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '133px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV WasFaulty</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_Problem */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '154px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV Problem</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_Problem */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '155px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV Problem</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_PN-DEV_WasProblem */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '176px', width: '170px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol PN-DEV WasProblem</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_WasProblem */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '177px', width: '235px', height: '20px' }}>
        <span className="truncate font-sans">Text PN-DEV WasProblem</span>
      </div>
      {/* Diagnostic Row: Text_Symbol_DevNo */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '236px', width: '34px', height: '20px' }}>
        <span className="truncate font-sans">Text Symbol DevNo</span>
      </div>
      {/* Diagnostic Row: Text_DevNo */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '49px', top: '236px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Text DevNo</span>
      </div>
      {/* Diagnostic Row: Text_SubordinateMoldulError */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '49px', top: '258px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Text SubordinateMoldulError</span>
      </div>
      {/* Diagnostic Row: Symbol_Tec-Unit_Type */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '185px', top: '239px', width: '74px', height: '16px' }}>
        <span className="truncate font-sans">Symbol Tec-Unit Type</span>
      </div>
      {/* Diagnostic Row: Symbol_MLFB */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '327px', width: '62px', height: '20px' }}>
        <span className="truncate font-sans">Symbol MLFB</span>
      </div>
      {/* Diagnostic Row: Text_MLFB */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '75px', top: '327px', width: '350px', height: '35px' }}>
        <span className="truncate font-sans">Text MLFB</span>
      </div>
      {/* Action Button: Button_Reset */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '387px', width: '60px', height: '40px' }}>
        <span className="truncate w-full text-center">Reset</span>
      </button>
      {/* Action Button: Button_ResetText */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '75px', top: '379px', width: '347px', height: '56px' }}>
        <span className="truncate w-full text-center">ResetText</span>
      </button>
      {/* Action Button: Button_ReadNew */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '440px', width: '60px', height: '40px' }}>
        <span className="truncate w-full text-center">ReadNew</span>
      </button>
      {/* Action Button: Button_ResetText_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '75px', top: '435px', width: '347px', height: '55px' }}>
        <span className="truncate w-full text-center">ResetText 1</span>
      </button>
      {/* Action Button: Button_ReadNew_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '493px', width: '60px', height: '40px' }}>
        <span className="truncate w-full text-center">ReadNew 1</span>
      </button>
      {/* Action Button: Button_ResetText_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '75px', top: '490px', width: '347px', height: '55px' }}>
        <span className="truncate w-full text-center">ResetText 2</span>
      </button>
      {/* Siemens Graphic View: Grafikanzeige_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '261px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Grafikanzeige_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Schematic Trace: PN-Line_Vertical */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '182px', top: '266px', width: '100px' }} />
      {/* Diagnostic Row: Text_SubordinateMoldulError_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '49px', top: '280px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Text SubordinateMoldulError 1</span>
      </div>
      {/* Diagnostic Row: Text_SubordinateMoldulError_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '49px', top: '302px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Text SubordinateMoldulError 2</span>
      </div>
      {/* Diagnostic Row: Text_PN-DEV_NoName_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '303px', top: '287px', width: '74px', height: '18px' }}>
        <span className="truncate font-sans">Text PN-DEV NoName 1</span>
      </div>
      {/* Siemens Graphic View: Grafikanzeige_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '283px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Grafikanzeige_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Grafikanzeige_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '305px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Grafikanzeige_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_PN-DEV_NoName_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '303px', top: '258px', width: '108px', height: '18px' }}>
        <span className="truncate font-sans">Text PN-DEV NoName 2</span>
      </div>
      {/* Schematic Trace: PN-Line_Vertical_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '182px', top: '297px', width: '100px' }} />
    </div>
  );
}

export default PopupPNDEVDIAGLEGENDPopupComponent;
