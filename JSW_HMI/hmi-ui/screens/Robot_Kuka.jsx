import React, { useState } from 'react';

function RobotKukaComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1383px', height: '915px', minHeight: '915px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Header Selector: Select Robot */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '487px', top: '68px', width: '290px', height: '37px' }}>
        <span className="truncate tracking-wide">Select Robot</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Action Button: Button_Collision */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '93px', top: '2px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Collision</span>
      </button>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '252px', top: '816px', width: '497px', height: '59px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 3</span>
      </div>
      {/* Process Value IOField: Robot Name */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '275px', top: '816px', width: '192px', height: '52px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Button_Collision_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1253px', top: '802px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Collision 3</span>
      </button>
      {/* Action Button: Button_Collision_6 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1253px', top: '802px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Collision 6</span>
      </button>
      {/* Action Button: 140RB03 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '100px', top: '100px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB03</span>
      </button>
      {/* Action Button: 140RB01_5 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '220px', top: '100px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB01 5</span>
      </button>
      {/* Action Button: 140RB01_1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '340px', top: '100px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB01 1</span>
      </button>
      {/* Action Button: 140RB01_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '460px', top: '100px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB01 2</span>
      </button>
      {/* Action Button: 140RB01_3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '100px', top: '170px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB01 3</span>
      </button>
      {/* Action Button: 140RB01_4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '220px', top: '170px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">140RB01 4</span>
      </button>
      {/* Header Selector: Select Robot_1 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '398px', top: '8px', width: '473px', height: '48px' }}>
        <span className="truncate tracking-wide">Select Robot 1</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Group Container Rectangle: 矩形_50 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '90px', width: '328px', height: '297px' }} />
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '47px', width: '17px', height: '17px' }} />
      {/* Header Label: 文本_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '56px', top: '26px', width: '39px', height: '22px' }}>
        <span className="truncate">Signal #1</span>
      </div>
      {/* Header Label: 文本_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '20px', top: '26px', width: '39px', height: '22px' }}>
        <span className="truncate">Signal #2</span>
      </div>
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '47px', width: '17px', height: '17px' }} />
      {/* Header Label: 文本_3 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '11px', top: '47px', width: '16px', height: '17px' }}>
        <span className="truncate">Signal #3</span>
      </div>
      {/* Diagnostic Row: 文本_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '67px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #4</span>
      </div>
      {/* Diagnostic Row: 文本_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '87px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #5</span>
      </div>
      {/* Diagnostic Row: 文本_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '107px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #6</span>
      </div>
      {/* Diagnostic Row: 文本_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '127px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #7</span>
      </div>
      {/* Diagnostic Row: 文本_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '147px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #8</span>
      </div>
      {/* Diagnostic Row: 文本_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '167px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #9</span>
      </div>
      {/* Diagnostic Row: 文本_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '187px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #10</span>
      </div>
      {/* Diagnostic Row: 文本_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '207px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #11</span>
      </div>
      {/* Diagnostic Row: 文本_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '227px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #12</span>
      </div>
      {/* Diagnostic Row: 文本_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '11px', top: '247px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #13</span>
      </div>
      {/* Diagnostic Row: 文本_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '12px', top: '267px', width: '15px', height: '17px' }}>
        <span className="truncate font-sans">Signal #14</span>
      </div>
      {/* Header Label: 文本_15 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '139px', top: '26px', width: '39px', height: '22px' }}>
        <span className="truncate">Signal #15</span>
      </div>
      {/* Header Label: 文本_16 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '109px', top: '26px', width: '39px', height: '22px' }}>
        <span className="truncate">Signal #16</span>
      </div>
      {/* Header Label: 文本_17 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '100px', top: '47px', width: '16px', height: '17px' }}>
        <span className="truncate">Signal #17</span>
      </div>
      {/* Diagnostic Row: 文本_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '67px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #18</span>
      </div>
      {/* Diagnostic Row: 文本_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '87px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #19</span>
      </div>
      {/* Diagnostic Row: 文本_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '107px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #20</span>
      </div>
      {/* Diagnostic Row: 文本_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '127px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #21</span>
      </div>
      {/* Diagnostic Row: 文本_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '147px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #22</span>
      </div>
      {/* Diagnostic Row: 文本_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '167px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #23</span>
      </div>
      {/* Diagnostic Row: 文本_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '187px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #24</span>
      </div>
      {/* Diagnostic Row: 文本_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '207px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #25</span>
      </div>
      {/* Diagnostic Row: 文本_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '227px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #26</span>
      </div>
      {/* Diagnostic Row: 文本_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '247px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #27</span>
      </div>
      {/* Diagnostic Row: 文本_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '267px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #28</span>
      </div>
      {/* Header Label: 文本_29 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '198px', top: '47px', width: '16px', height: '17px' }}>
        <span className="truncate">Signal #29</span>
      </div>
      {/* Diagnostic Row: 文本_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '69px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #30</span>
      </div>
      {/* Diagnostic Row: 文本_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '89px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #31</span>
      </div>
      {/* Diagnostic Row: 文本_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '109px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #32</span>
      </div>
      {/* Header Label: 文本_33 */}
      <div className="absolute bg-transparent text-[#262221] font-semibold text-[8px] flex items-center justify-center px-1.5 z-20" style={{ left: '271px', top: '47px', width: '16px', height: '16px' }}>
        <span className="truncate">Signal #33</span>
      </div>
      {/* Diagnostic Row: 文本_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '271px', top: '69px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #34</span>
      </div>
      {/* Diagnostic Row: 文本_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '271px', top: '89px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #35</span>
      </div>
      {/* Diagnostic Row: 文本_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '206px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #36</span>
      </div>
      {/* Diagnostic Row: 文本_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '226px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #37</span>
      </div>
      {/* Diagnostic Row: 文本_38 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '246px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #38</span>
      </div>
      {/* Diagnostic Row: 文本_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '198px', top: '266px', width: '16px', height: '17px' }}>
        <span className="truncate font-sans">Signal #39</span>
      </div>
      {/* Header Label: Text field_DoDockRel1_1 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '0px', width: '171px', height: '27px' }}>
        <span className="truncate">Text field DoDockRel1 1</span>
      </div>
      {/* Vertical Bus Line: 线_1 */}
      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '187px', top: '0px', height: '298px' }} />
      {/* Header Label: Text field_DoDockRel1_2 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '196px', top: '1px', width: '124px', height: '27px' }}>
        <span className="truncate">Text field DoDockRel1 2</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockRel1_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '143px', width: '124px', height: '48px' }}>
        <span className="truncate font-sans">Text field DoDockRel1 3</span>
      </div>
      {/* Group Container Rectangle: 矩形_52 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '67px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '87px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '107px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '127px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '147px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '167px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '187px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '207px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_15 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '227px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_17 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '247px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_19 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '267px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '67px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '87px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '107px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '127px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '147px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_16 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '167px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_18 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '187px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_20 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '207px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_21 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '227px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_22 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '247px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_23 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '63px', top: '267px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_24 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '47px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_25 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '47px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_26 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '66px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_27 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '86px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_28 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '106px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_29 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '126px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_30 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '146px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '166px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_32 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '186px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_33 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '206px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_34 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '226px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_35 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '246px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_36 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '122px', top: '266px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_37 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '66px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_38 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '86px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_39 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '106px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_40 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '126px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_41 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '146px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_42 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '166px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_43 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '186px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_44 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '206px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_45 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '226px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_46 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '246px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_47 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '152px', top: '266px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_48 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '47px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_49 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '68px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_51 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '88px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_53 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '108px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_54 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '287px', top: '47px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_55 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '287px', top: '68px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_56 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '287px', top: '88px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_57 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '206px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_58 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '226px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_59 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '246px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_60 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '213px', top: '266px', width: '17px', height: '17px' }} />
      {/* Siemens Alarm Control View: acABBMessages */}
      <div className="absolute bg-[#F8FAFC] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col overflow-hidden text-xs text-[#262221] z-20" style={{ left: '735px', top: '125px', width: '528px', height: '522px' }}>
        <div className="bg-[#DEDFE1] border-b border-[#C3C3C3] px-2 py-1 flex items-center justify-between font-bold text-[10px]">
          <span className="flex items-center gap-1.5 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>ALARM & EVENT LOG</span>
          <span className="text-slate-500 font-mono">Siemens AlarmControl</span>
        </div>
        <div className="flex-1 p-2 space-y-1 font-mono text-[10px] overflow-y-auto bg-slate-50">
          <div className="flex items-center justify-between p-1 bg-red-50 text-red-700 border-l-2 border-red-500"><span>[FAULT] 140M1 Zone Emergency Circuit Disconnected</span><span>08:42:10</span></div>
          <div className="flex items-center justify-between p-1 bg-amber-50 text-amber-800 border-l-2 border-amber-500"><span>[WARN] Robot Gripper 190RB02 Pressure Threshold</span><span>08:41:55</span></div>
        </div>
      </div>
      {/* Group Container Rectangle: Rectangle Segment Status */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '303px', top: '125px', width: '284px', height: '520px' }} />
      {/* Group Container Rectangle: Rectangle Robot Status */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '19px', top: '125px', width: '284px', height: '394px' }} />
      {/* Diagnostic Row: Text Filed E- Stop */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '228px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop</span>
      </div>
      {/* Diagnostic Row: Text Field In Auto On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '159px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Auto On</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '182px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position</span>
      </div>
      {/* Diagnostic Row: Text field Robot Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '124px', width: '284px', height: '31px' }}>
        <span className="truncate font-sans">Text field Robot Status</span>
      </div>
      {/* Group Container Rectangle: Rectangle Collision Zone */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '19px', top: '520px', width: '283px', height: '125px' }} />
      {/* Group Container Rectangle: ClearZone1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone1</span>
      </div>
      {/* Group Container Rectangle: ClearZone2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '59px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone2</span>
      </div>
      {/* Group Container Rectangle: ClearZone3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone3</span>
      </div>
      {/* Group Container Rectangle: ClearZone4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '128px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone4</span>
      </div>
      {/* Group Container Rectangle: ClearZone5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '162px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone5</span>
      </div>
      {/* Group Container Rectangle: ClearZone6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone6</span>
      </div>
      {/* Group Container Rectangle: ClearZone7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '232px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone7</span>
      </div>
      {/* Group Container Rectangle: ClearZone8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '552px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '552px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '266px', top: '552px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone8</span>
      </div>
      {/* Group Container Rectangle: ClearZone9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone9</span>
      </div>
      {/* Group Container Rectangle: ClearZone10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '59px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone10</span>
      </div>
      {/* Group Container Rectangle: ClearZone11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone11</span>
      </div>
      {/* Group Container Rectangle: ClearZone12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '128px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone12</span>
      </div>
      {/* Group Container Rectangle: ClearZone13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '162px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone13</span>
      </div>
      {/* Group Container Rectangle: ClearZone14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone14</span>
      </div>
      {/* Group Container Rectangle: ClearZone15 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone15 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_15 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '232px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone15</span>
      </div>
      {/* Group Container Rectangle: ClearZone16 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone16 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '575px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_16 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '575px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '266px', top: '575px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone16</span>
      </div>
      {/* Group Container Rectangle: ClearZone17 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone17 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_17 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone17</span>
      </div>
      {/* Group Container Rectangle: ClearZone18 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone18 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_18 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '59px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone18</span>
      </div>
      {/* Group Container Rectangle: ClearZone19 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone19 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_19 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone19</span>
      </div>
      {/* Group Container Rectangle: ClearZone20 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone20 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_20 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '128px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone20</span>
      </div>
      {/* Group Container Rectangle: ClearZone21 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone21 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_21 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '162px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone21</span>
      </div>
      {/* Group Container Rectangle: ClearZone22 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone22 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_22 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone22</span>
      </div>
      {/* Group Container Rectangle: ClearZone23 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone23 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_23 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '232px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone23</span>
      </div>
      {/* Group Container Rectangle: ClearZone24 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone24 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '598px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_24 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '598px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '266px', top: '598px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone24</span>
      </div>
      {/* Group Container Rectangle: ClearZone25 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone25 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_25 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '24px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone25</span>
      </div>
      {/* Group Container Rectangle: ClearZone26 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone26 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_26 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '59px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '59px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone26</span>
      </div>
      {/* Group Container Rectangle: ClearZone27 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone27 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_27 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone27</span>
      </div>
      {/* Group Container Rectangle: ClearZone28 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone28 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_28 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '128px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '128px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone28</span>
      </div>
      {/* Group Container Rectangle: ClearZone29 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone29 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_29 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '162px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '162px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone29</span>
      </div>
      {/* Group Container Rectangle: ClearZone30 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone30 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_30 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '197px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone30</span>
      </div>
      {/* Group Container Rectangle: ClearZone31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '232px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone31</span>
      </div>
      {/* Group Container Rectangle: ClearZone32 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: ReqZone32 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '621px', width: '31px', height: '20px' }} />
      {/* Group Container Rectangle: Fault_32 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '266px', top: '621px', width: '31px', height: '20px' }} />
      {/* Diagnostic Row: TextZone32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '266px', top: '621px', width: '31px', height: '20px' }}>
        <span className="truncate font-sans">TextZone32</span>
      </div>
      {/* Diagnostic Row: Text field Robot Collision Zone */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '519px', width: '284px', height: '31px' }}>
        <span className="truncate font-sans">Text field Robot Collision Zone</span>
      </div>
      {/* Diagnostic Row: Text Field Manual */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '159px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual</span>
      </div>
      {/* Diagnostic Row: Text Field System Ready */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '205px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field System Ready</span>
      </div>
      {/* Diagnostic Row: Text Field Motor On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '228px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Motor On</span>
      </div>
      {/* Diagnostic Row: Text Field In Cycle */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '251px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Cycle</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '274px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On</span>
      </div>
      {/* Diagnostic Row: Text Field On Path */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '297px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path</span>
      </div>
      {/* Diagnostic Row: Text Field ProgNumReq */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '320px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field ProgNumReq</span>
      </div>
      {/* Diagnostic Row: Text Field Task OK */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '25px', top: '343px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Task OK</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '182px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode</span>
      </div>
      {/* Diagnostic Row: Text Field Stop */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '205px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop</span>
      </div>
      {/* Diagnostic Row: Text Filed Error */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '251px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Error</span>
      </div>
      {/* Process Value IOField: IO Field Feedback Program */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '160px', top: '369px', width: '128px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field Feedback Program */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '341px', width: '114px', height: '30px' }}>
        <span className="truncate font-sans">Text Field Feedback Program</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '274px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '159px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg1</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '179px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg2</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '199px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg3</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '219px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg4</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '239px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg5</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '259px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg6</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '279px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg7</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '299px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg8</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '319px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg9</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '339px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg10</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '359px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg11</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '379px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg12</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '399px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg13</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '419px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg14</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '439px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg15</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '459px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg16</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '479px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg17</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '499px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg18</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '519px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg19</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '539px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg20</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '559px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg21</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '579px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg22</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '599px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg23</span>
      </div>
      {/* Diagnostic Row: Text field_DoOutSeg24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '310px', top: '619px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoOutSeg24</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '159px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg1</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '179px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg2</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '199px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg3</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '219px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg4</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '239px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg5</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '259px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg6</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '279px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg7</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '299px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg8</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '319px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg9</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '339px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg10</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '359px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg11</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '379px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg12</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '399px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg13</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '419px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg14</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '439px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg15</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '459px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg16</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '479px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg17</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '499px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg18</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '519px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg19</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '539px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg20</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '559px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg21</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '579px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg22</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '599px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg23</span>
      </div>
      {/* Diagnostic Row: Text field_DoFinishSeg24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '444px', top: '619px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoFinishSeg24</span>
      </div>
      {/* Diagnostic Row: Text field Segment Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '303px', top: '124px', width: '284px', height: '31px' }}>
        <span className="truncate font-sans">Text field Segment Status</span>
      </div>
      {/* Diagnostic Row: Text field Weld Spot Count */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '403px', width: '284px', height: '31px' }}>
        <span className="truncate font-sans">Text field Weld Spot Count</span>
      </div>
      {/* Group Container Rectangle: Rectangle Dock Status */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '588px', top: '125px', width: '147px', height: '520px' }} />
      {/* Diagnostic Row: Text field Dock Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '588px', top: '124px', width: '147px', height: '31px' }}>
        <span className="truncate font-sans">Text field Dock Status</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockRel1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '159px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockRel1</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockRel2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '205px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockRel2</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockRel3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '251px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockRel3</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockRel4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '297px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockRel4</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockEnd1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '179px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockEnd1</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockEnd2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '225px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockEnd2</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockEnd3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '271px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockEnd3</span>
      </div>
      {/* Diagnostic Row: Text field_DoDockEnd4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '317px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoDockEnd4</span>
      </div>
      {/* Diagnostic Row: Text field World Zone */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '588px', top: '346px', width: '147px', height: '31px' }}>
        <span className="truncate font-sans">Text field World Zone</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '381px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone1</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '404px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone2</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '427px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone3</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '450px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone4</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '473px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone5</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '496px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone6</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '519px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone7</span>
      </div>
      {/* Diagnostic Row: Text field_DoWorldZone8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '594px', top: '542px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text field DoWorldZone8</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '297px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 1</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '160px', top: '320px', width: '128px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 2</span>
      </div>
      {/* Diagnostic Row: Text Field Feedback Program_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '31px', top: '357px', width: '114px', height: '30px' }}>
        <span className="truncate font-sans">Text Field Feedback Program 1</span>
      </div>
      {/* Process Value IOField: IO Field Feedback Program_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '27px', top: '379px', width: '128px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field WeldSpotCount */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '53px', top: '433px', width: '147px', height: '21px' }}>
        <span className="truncate font-sans">Text Field WeldSpotCount</span>
      </div>
      {/* Process Value IOField: IO Field Weld Spot Count */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '204px', top: '435px', width: '61px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: Rectangle Bypass Weld Count */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '180px', top: '460px', width: '85px', height: '55px' }} />
      {/* Action Button: Button Bypass Weld Count */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '181px', top: '461px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Bypass Weld Count</span>
      </button>
      {/* Diagnostic Row: Text Field WeldSpotCount_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '51px', top: '462px', width: '24px', height: '21px' }}>
        <span className="truncate font-sans">Text Field WeldSpotCount 1</span>
      </div>
      {/* Process Value IOField: IO Field Weld Spot Count_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '72px', top: '462px', width: '37px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field WeldSpotCount_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '116px', top: '462px', width: '24px', height: '21px' }}>
        <span className="truncate font-sans">Text Field WeldSpotCount 2</span>
      </div>
      {/* Process Value IOField: IO Field Weld Spot Count_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '137px', top: '462px', width: '37px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field WeldSpotCount_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '51px', top: '487px', width: '24px', height: '21px' }}>
        <span className="truncate font-sans">Text Field WeldSpotCount 3</span>
      </div>
      {/* Process Value IOField: IO Field Weld Spot Count_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '72px', top: '487px', width: '37px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field WeldSpotCount_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '116px', top: '487px', width: '24px', height: '21px' }}>
        <span className="truncate font-sans">Text Field WeldSpotCount 4</span>
      </div>
      {/* Process Value IOField: IO Field Weld Spot Count_4 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '137px', top: '487px', width: '37px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Button_Collision_9 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '184px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Collision 9</span>
      </button>
    </div>
  );
}

export default RobotKukaComponent;
