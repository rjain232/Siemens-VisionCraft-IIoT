import React, { useState } from 'react';

function PopupSafetyGateComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '483px', height: '622px', minHeight: '622px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Text field TG Status */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '0px', width: '394px', height: '47px' }}>
        <span className="truncate">Text field TG Status</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '315px', top: '3px', width: '76px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Group Container Rectangle: Background_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '37px', width: '368px', height: '32px' }} />
      {/* Header Label: Text field TG1 Status_22 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '51px', top: '43px', width: '126px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 22</span>
      </div>
      {/* Header Label: Text field TG1 Status_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '191px', top: '43px', width: '78px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 1</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1px', top: '74px', width: '367px', height: '40px' }} />
      {/* Diagnostic Row: Textfeld_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '7px', top: '83px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 1</span>
      </div>
      {/* Diagnostic Row: Textfeld_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '83px', width: '245px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 2</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1px', top: '115px', width: '367px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1px', top: '156px', width: '367px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1px', top: '238px', width: '367px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1px', top: '197px', width: '367px', height: '40px' }} />
      {/* Diagnostic Row: Textfeld_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '7px', top: '121px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 10</span>
      </div>
      {/* Diagnostic Row: Textfeld_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '121px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 13</span>
      </div>
      {/* Diagnostic Row: Textfeld_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '7px', top: '161px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '156px', top: '161px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 14</span>
      </div>
      {/* Diagnostic Row: Textfeld_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '7px', top: '206px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 6</span>
      </div>
      {/* Diagnostic Row: Textfeld_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '161px', top: '206px', width: '110px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 15</span>
      </div>
      {/* Diagnostic Row: Textfeld_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '7px', top: '249px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 8</span>
      </div>
      {/* Diagnostic Row: Textfeld_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '155px', top: '249px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 21</span>
      </div>
      {/* Vertical Bus Line: Line_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '152px', top: '74px', height: '203px' }} />
      {/* Group Container Rectangle: Background_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '368px', height: '32px' }} />
      {/* Header Label: Text field TG1 Status_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '142px', top: '7px', width: '126px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 2</span>
      </div>
      {/* Group Container Rectangle: Background_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '12px', top: '382px', width: '368px', height: '32px' }} />
      {/* Diagnostic Row: Text field TG1 Status_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '63px', top: '388px', width: '126px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 4</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '203px', top: '388px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 3</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '13px', top: '419px', width: '367px', height: '40px' }} />
      {/* Diagnostic Row: Textfeld_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '428px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 19</span>
      </div>
      {/* Diagnostic Row: Textfeld_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '167px', top: '428px', width: '245px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 18</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '13px', top: '460px', width: '367px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '13px', top: '501px', width: '367px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '13px', top: '542px', width: '367px', height: '40px' }} />
      {/* Diagnostic Row: Textfeld_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '167px', top: '466px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 16</span>
      </div>
      {/* Diagnostic Row: Textfeld_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '506px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 12</span>
      </div>
      {/* Diagnostic Row: Textfeld_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '168px', top: '506px', width: '275px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 11</span>
      </div>
      {/* Diagnostic Row: Textfeld_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '551px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 9</span>
      </div>
      {/* Diagnostic Row: Textfeld_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '173px', top: '551px', width: '133px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 7</span>
      </div>
      {/* Vertical Bus Line: Line_2 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '164px', top: '419px', height: '163px' }} />
      {/* Group Container Rectangle: Background_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '12px', top: '345px', width: '368px', height: '32px' }} />
      {/* Diagnostic Row: Text field TG1 Status_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '352px', width: '197px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 5</span>
      </div>
      {/* Diagnostic Row: Textfeld_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '20px', top: '468px', width: '140px', height: '20px' }}>
        <span className="truncate font-sans">Textfeld 3</span>
      </div>
    </div>
  );
}

export default PopupSafetyGateComponent;
