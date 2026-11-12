import React, { useState } from 'react';

function PopupHmiOpmodes12hPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '561px', height: '580px', minHeight: '580px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '521px', height: '540px' }} />
      {/* Group Container Rectangle: Dummy8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '293px', top: '111px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: Dummy9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '319px', top: '111px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: Dummy10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '345px', top: '111px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: Dummy11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '371px', top: '111px', width: '25px', height: '25px' }} />
      {/* Group Container Rectangle: Dummy12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '397px', top: '111px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '77px', top: '106px', width: '29px', height: '30px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Group Container Rectangle: Dummy6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '241px', top: '111px', width: '25px', height: '25px' }} />
      {/* Header Label: Text_HmiPanelNo */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '171px', top: '50px', width: '160px', height: '23px' }}>
        <span className="truncate">Text HmiPanelNo</span>
      </div>
      {/* Diagnostic Row: State_OPMode8_Select_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '293px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode8 Select 1</span>
      </div>
      {/* Diagnostic Row: State_OPMode8_NotSelect_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '293px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode8 NotSelect 1</span>
      </div>
      {/* Group Container Rectangle: State_OPMode8_Vis_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '293px', top: '80px', width: '25px', height: '25px' }} />
      {/* Header Label: Descr_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '108px', top: '26px', width: '305px', height: '20px' }}>
        <span className="truncate">Descr OPMode</span>
      </div>
      {/* Group Container Rectangle: Dummy7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '267px', top: '111px', width: '25px', height: '25px' }} />
      {/* Header Label: Overview_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '1px', width: '519px', height: '25px' }}>
        <span className="truncate">Overview OPMode</span>
      </div>
      {/* Diagnostic Row: State_OPMode1_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '111px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode1 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode1_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '111px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode1 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode1_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '111px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode2_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '137px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode2 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode2_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '137px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode2 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode2_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '137px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode3_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '163px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode3 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode3_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '163px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode3 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode3_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '163px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode4_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode4 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode4_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode4 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode4_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode5_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '215px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode5 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode5_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '215px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode5 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode5_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '215px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode6_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode6 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode6_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode6 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode6_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '241px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode7_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '267px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode7 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode7_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '267px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode7 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode7_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '267px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode9_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '319px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode9 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode9_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '319px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode9 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode9_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '319px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode10_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '345px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode10 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode10_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '345px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode10 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode10_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '345px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode11_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '371px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode11 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode11_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '371px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode11 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode11_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '371px', top: '80px', width: '25px', height: '25px' }} />
      {/* Diagnostic Row: State_OPMode12_Select */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '397px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode12 Select</span>
      </div>
      {/* Diagnostic Row: State_OPMode12_NotSelect */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '397px', top: '80px', width: '25px', height: '25px' }}>
        <span className="truncate font-sans">State OPMode12 NotSelect</span>
      </div>
      {/* Group Container Rectangle: State_OPMode12_Vis */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '397px', top: '80px', width: '25px', height: '25px' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Button_Close */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '430px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Close</span>
      </button>
    </div>
  );
}

export default PopupHmiOpmodes12hPopupComponent;
