import React, { useState } from 'react';

function SewAPCComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1316px', height: '705px', minHeight: '705px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Rectangle_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '194px', top: '365px', width: '865px', height: '300px' }} />
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '195px', top: '113px', width: '866px', height: '250px' }} />
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '390px', top: '7px', width: '510px', height: '57px' }}>
        <span className="truncate">Sew APC</span>
      </div>
      {/* Header Selector: 符号 IO 域_7 */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '479px', top: '72px', width: '290px', height: '38px' }}>
        <span className="truncate tracking-wide">Symbol IO Field 7</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Diagnostic Row: Text field_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '194px', top: '113px', width: '866px', height: '31px' }}>
        <span className="truncate font-sans">Text field 1</span>
      </div>
      {/* Action Button: 按钮_2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-sm rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '279px', top: '171px', width: '140px', height: '60px' }}>
        <span className="truncate w-full text-center">Button 2</span>
      </button>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '65px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Group Container Rectangle: Frame_SendToDrive_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '201px', top: '369px', width: '199px', height: '294px' }} />
      {/* Diagnostic Row: Text_ConrolDataToDrive_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '205px', top: '373px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text ConrolDataToDrive 1</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '397px', width: '146px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 33</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '412px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 34</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '428px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 35</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_40 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '444px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 40</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '460px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 36</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '476px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 37</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '492px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 24</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_38 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '508px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 38</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '524px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 25</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '540px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 39</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '556px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 26</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '572px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 1</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '588px', width: '161px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 28</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '604px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 30</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '620px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 31</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-semibold text-[8px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '229px', top: '636px', width: '124px', height: '16px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 32</span>
      </div>
      {/* Siemens Status LED: LED_1_Left_23 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_22 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_21 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_20 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_19 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_18 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_40 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_17 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_39 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_16 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_38 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_37 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_36 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_35 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_34 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_33 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Group Container Rectangle: Frame_SendToDrive_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '405px', top: '369px', width: '199px', height: '294px' }} />
      {/* Diagnostic Row: Text_ConrolDataToDrive_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '407px', top: '372px', width: '148px', height: '23px' }}>
        <span className="truncate font-sans">Text ConrolDataToDrive 2</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '395px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 2</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '410px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 3</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '426px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 4</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '458px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 5</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '474px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 6</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '490px', width: '158px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 7</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '506px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 8</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '442px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 9</span>
      </div>
      {/* Diagnostic Row: Text_ConrolDataToDrive_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '407px', top: '372px', width: '148px', height: '23px' }}>
        <span className="truncate font-sans">Text ConrolDataToDrive 3</span>
      </div>
      {/* Siemens Status LED: LED_1_Left_8 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_7 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_5 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_4 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_3 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: Text_DigitalOutputs_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '522px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 10</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '538px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 11</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '554px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 12</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '586px', width: '158px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 13</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '602px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 14</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '618px', width: '158px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 15</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '634px', width: '124px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 16</span>
      </div>
      {/* Diagnostic Row: Text_DigitalOutputs_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '426px', top: '570px', width: '186px', height: '20px' }}>
        <span className="truncate font-sans">Text DigitalOutputs 17</span>
      </div>
      {/* Siemens Status LED: LED_1_Left_9 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_10 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_11 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_12 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_13 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_14 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_15 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '195px', top: '104px', width: '16px', height: '16px' }} />
      {/* Siemens Status LED: LED_1_Left_24 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '215px', top: '104px', width: '16px', height: '16px' }} />
      {/* Diagnostic Row: Text field_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '194px', top: '308px', width: '868px', height: '31px' }}>
        <span className="truncate font-sans">Text field 3</span>
      </div>
      {/* Diagnostic Row: Text field_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '622px', top: '447px', width: '94px', height: '29px' }}>
        <span className="truncate font-sans">Text field 8</span>
      </div>
      {/* Process Value IOField: FaultNo */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '724px', top: '446px', width: '65px', height: '31px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text field_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '622px', top: '411px', width: '94px', height: '29px' }}>
        <span className="truncate font-sans">Text field 2</span>
      </div>
      {/* Process Value IOField: FaultNo_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '724px', top: '410px', width: '65px', height: '31px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text field_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '622px', top: '375px', width: '94px', height: '29px' }}>
        <span className="truncate font-sans">Text field 4</span>
      </div>
      {/* Process Value IOField: FaultNo_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '724px', top: '374px', width: '65px', height: '31px' }}>
        <span>0.00</span>
      </div>
    </div>
  );
}

export default SewAPCComponent;
