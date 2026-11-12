import React, { useState } from 'react';

function PopupOPModeComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '630px', height: '749px', minHeight: '749px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Rectangle TG1_14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '669px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '628px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '588px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '548px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '508px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Rectangle TG1_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '467px', width: '548px', height: '40px' }} />
      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '65px', width: '548px', height: '32px' }} />
      {/* Group Container Rectangle: Rectangle TG1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '101px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '26px', top: '110px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status</span>
      </div>
      {/* Header Label: Text field TG Status */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '0px', width: '589px', height: '47px' }}>
        <span className="truncate">Text field TG Status</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '141px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '151px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 1</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '182px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '187px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 2</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '222px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '228px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 3</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '263px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '271px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 4</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '304px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '312px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 5</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '345px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '26px', top: '352px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 6</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '385px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '393px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 7</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '426px', width: '548px', height: '40px' }} />
      {/* Diagnostic Row: Text field TG1 Status_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '435px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 8</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '472px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 9</span>
      </div>
      {/* Vertical Bus Line: Line_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '109px', top: '101px', height: '606px' }} />
      {/* Diagnostic Row: Text field TG1 Status_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '115px', top: '111px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 10</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '151px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 11</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '189px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 12</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '228px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 13</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '270px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 14</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '312px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 15</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '115px', top: '351px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 16</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '394px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 17</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '436px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 18</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '472px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 19</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '505px', top: '3px', width: '82px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Diagnostic Row: Text field TG1 Status_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '72px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 20</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '218px', top: '72px', width: '260px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 21</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '513px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 22</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '513px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 23</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '553px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 24</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '553px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 25</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '593px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 26</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '593px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 27</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '633px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 28</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '633px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 29</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '674px', width: '78px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 30</span>
      </div>
      {/* Diagnostic Row: Text field TG1 Status_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '114px', top: '674px', width: '440px', height: '21px' }}>
        <span className="truncate font-sans">Text field TG1 Status 31</span>
      </div>
    </div>
  );
}

export default PopupOPModeComponent;
