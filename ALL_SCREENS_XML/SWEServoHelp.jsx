import React, { useState } from 'react';

function SWEServoHelpComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '681px', minHeight: '681px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Selector: 符号 IO 域_8 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '579px', top: '239px', width: '653px', height: '291px' }}>
        <span className="truncate tracking-wide">Symbol IO Field 8</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Header Selector: 符号 IO 域_14 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '61px', top: '239px', width: '490px', height: '293px' }}>
        <span className="truncate tracking-wide">Symbol IO Field 14</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Header Selector: 符号 IO 域_15 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '454px', top: '130px', width: '696px', height: '39px' }}>
        <span className="truncate tracking-wide">Symbol IO Field 15</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Diagnostic Row: 文本域_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '62px', top: '132px', width: '260px', height: '43px' }}>
        <span className="truncate font-sans">Signal #39</span>
      </div>
      {/* Process Value IOField: IO Field_ROBOT INFO_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '332px', top: '132px', width: '76px', height: '45px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: 矩形_24 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '16px', top: '90px', width: '1246px', height: '551px' }} />
      {/* Diagnostic Row: 文本域_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '65px', top: '187px', width: '487px', height: '52px' }}>
        <span className="truncate font-sans">Signal #1</span>
      </div>
      {/* Diagnostic Row: 文本域_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '590px', top: '193px', width: '383px', height: '29px' }}>
        <span className="truncate font-sans">Signal #2</span>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '65px', width: '100%' }} />
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '241px', top: '4px', width: '768px', height: '57px' }}>
        <span className="truncate">SWEServoHelp</span>
      </div>
    </div>
  );
}

export default SWEServoHelpComponent;
