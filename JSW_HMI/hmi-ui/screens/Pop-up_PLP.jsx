import React, { useState } from 'react';

function PopupPLPComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '512px', height: '539px', minHeight: '539px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '472px', height: '499px' }} />
      {/* Group Container Rectangle: Rectangle TG Status */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '1px', width: '372px', height: '43px' }} />
      {/* Group Container Rectangle: Rectangle TG1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '31px', width: '372px', height: '55px' }} />
      {/* Header Label: Text Field TG1 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '186px', top: '36px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG1 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '275px', top: '36px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Work Pos</span>
      </div>
      {/* Header Label: Text field TG1 Status */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '8px', top: '62px', width: '47px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status</span>
      </div>
      {/* Header Label: Text Field TG1 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '8px', top: '36px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 Fault</span>
      </div>
      {/* Header Label: Text Field TG1 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '97px', top: '36px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '86px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG2 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '91px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG2 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG2 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '91px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG2 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG2 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '116px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG2 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG2 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '91px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG2 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG2 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '91px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG2 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '141px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG3 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '146px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG3 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG3 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '146px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG3 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG3 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '171px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG3 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG3 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '146px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG3 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG3 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '146px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG3 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '196px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG4 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '201px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG4 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG4 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '201px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG4 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG4 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '227px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG4 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG4 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '201px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG4 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG4 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '201px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG4 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '251px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG5 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '256px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG5 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG5 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '256px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG5 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG5 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '281px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG5 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG5 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '256px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG5 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG5 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '256px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG5 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '306px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG6 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '311px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG6 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG6 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '311px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG6 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG6 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '336px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG6 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG6 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '311px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG6 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG6 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '311px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG6 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '361px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG7 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '366px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG7 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG7 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '366px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG7 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG7 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '392px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG7 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG7 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '366px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG7 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG7 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '366px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG7 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '416px', width: '372px', height: '55px' }} />
      {/* Diagnostic Row: Text Field TG8 In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '186px', top: '421px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG8 In Pounce Pos</span>
      </div>
      {/* Diagnostic Row: Text Field TG8 In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '275px', top: '421px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG8 In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text field TG8 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '446px', width: '47px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG8 Status</span>
      </div>
      {/* Diagnostic Row: Text Field TG8 Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '8px', top: '421px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG8 Fault</span>
      </div>
      {/* Diagnostic Row: Text Field TG8 In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '97px', top: '421px', width: '90px', height: '21px' }}>
        <span className="truncate font-sans">Text Field TG8 In Home Pos</span>
      </div>
      {/* Header Label: Text field TG Status */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '0px', width: '373px', height: '31px' }}>
        <span className="truncate">Text field TG Status</span>
      </div>
      {/* Action Button: Move_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '382px', top: '0px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
    </div>
  );
}

export default PopupPLPComponent;
