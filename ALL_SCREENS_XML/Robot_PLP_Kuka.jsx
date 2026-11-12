import React, { useState } from 'react';

function RobotPLPKukaComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1320px', height: '730px', minHeight: '730px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Graphic View: Zone01 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '710px', top: '47px', width: '522px', height: '643px' }}>
        <img src="/tia_graphics/Zone01.png" alt="Zone01" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Group Container Rectangle: Rectangle TG Control */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '241px', top: '104px', width: '465px', height: '354px' }} />
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Siemens Alarm Control View: nbgMessages */}
      <div className="absolute bg-[#F8FAFC] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col overflow-hidden text-xs text-[#262221] z-20" style={{ left: '19px', top: '459px', width: '687px', height: '203px' }}>
        <div className="bg-[#DEDFE1] border-b border-[#C3C3C3] px-2 py-1 flex items-center justify-between font-bold text-[10px]">
          <span className="flex items-center gap-1.5 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>ALARM & EVENT LOG</span>
          <span className="text-slate-500 font-mono">Siemens AlarmControl</span>
        </div>
        <div className="flex-1 p-2 space-y-1 font-mono text-[10px] overflow-y-auto bg-slate-50">
          <div className="flex items-center justify-between p-1 bg-red-50 text-red-700 border-l-2 border-red-500"><span>[FAULT] 140M1 Zone Emergency Circuit Disconnected</span><span>08:42:10</span></div>
          <div className="flex items-center justify-between p-1 bg-amber-50 text-amber-800 border-l-2 border-amber-500"><span>[WARN] Robot Gripper 190RB02 Pressure Threshold</span><span>08:41:55</span></div>
        </div>
      </div>
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Group Container Rectangle: Rectangle Robot Status */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '19px', top: '104px', width: '222px', height: '354px' }} />
      {/* Diagnostic Row: Text Filed E- Stop */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '207px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop</span>
      </div>
      {/* Diagnostic Row: Text Field In Auto On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '138px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Auto On</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '161px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position</span>
      </div>
      {/* Diagnostic Row: Text field PLP Status */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '19px', top: '103px', width: '222px', height: '31px' }}>
        <span className="truncate font-sans">Text field PLP Status</span>
      </div>
      {/* Diagnostic Row: Text Field Manual */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '138px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual</span>
      </div>
      {/* Diagnostic Row: Text Field System Ready */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '184px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field System Ready</span>
      </div>
      {/* Diagnostic Row: Text Field Motor On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '207px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Motor On</span>
      </div>
      {/* Diagnostic Row: Text Field In Cycle */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '230px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Cycle</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '253px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On</span>
      </div>
      {/* Diagnostic Row: Text Field On Path */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '276px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path</span>
      </div>
      {/* Diagnostic Row: Text Field ProgNumReq */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '299px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field ProgNumReq</span>
      </div>
      {/* Diagnostic Row: Text Field Task OK */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '322px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Task OK</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '161px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode</span>
      </div>
      {/* Diagnostic Row: Text Field Stop */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '184px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop</span>
      </div>
      {/* Diagnostic Row: Text Filed Error */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '230px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Error</span>
      </div>
      {/* Process Value IOField: IO Field Feedback Program */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '129px', top: '280px', width: '100px', height: '21px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text Field Feedback Program */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '134px', top: '250px', width: '89px', height: '30px' }}>
        <span className="truncate font-sans">Text Field Feedback Program</span>
      </div>
      {/* Diagnostic Row: Text Field In Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '345px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Home Pos</span>
      </div>
      {/* Diagnostic Row: Text Field In Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '368px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Work Pos</span>
      </div>
      {/* Diagnostic Row: Text Field In Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '24px', top: '391px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Pounce Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle Clear Style */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '251px', top: '262px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Clear Style */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '252px', top: '263px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Clear Style</span>
      </button>
      {/* Siemens Status LED: Clear Style Interlock */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '100px', top: '100px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '251px', top: '140px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style1 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '252px', top: '141px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style1</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock1 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '100px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '341px', top: '140px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style2 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '342px', top: '141px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style2</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock2 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '400px', top: '100px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '431px', top: '140px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style3 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '432px', top: '141px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style3</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock3 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '550px', top: '100px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '521px', top: '140px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style4 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '522px', top: '141px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style4</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock4 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '100px', top: '160px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '611px', top: '140px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style5 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '612px', top: '141px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style5</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock5 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '160px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '251px', top: '201px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style6 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '252px', top: '202px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style6</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock6 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '400px', top: '160px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '341px', top: '201px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style7 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '342px', top: '202px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style7</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock7 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '550px', top: '160px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '431px', top: '201px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style8 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '432px', top: '202px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style8</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock8 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '100px', top: '220px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '521px', top: '201px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style9 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '522px', top: '202px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style9</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock9 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '220px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Select Style10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '611px', top: '201px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Select Style10 */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '612px', top: '202px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Select Style10</span>
      </button>
      {/* Siemens Status LED: Select Style Interlock10 */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '400px', top: '220px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Go Home */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '251px', top: '380px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Go Home */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '252px', top: '381px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Go Home</span>
      </button>
      {/* Siemens Status LED: Go Home Interlock */}
      <div className="absolute rounded-full shadow-inner bg-[#16A34A] border-[#166534] border flex items-center justify-center z-20" style={{ left: '550px', top: '220px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Go Work */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '341px', top: '380px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Go Work */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '342px', top: '381px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Go Work</span>
      </button>
      {/* Siemens Status LED: Go Work Interlock */}
      <div className="absolute rounded-full shadow-inner bg-[#16A34A] border-[#166534] border flex items-center justify-center z-20" style={{ left: '100px', top: '280px', width: '100px', height: '30px' }} />
      {/* Group Container Rectangle: Rectangle Go Pounce */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '431px', top: '380px', width: '85px', height: '56px' }} />
      {/* Action Button: Button Go Pounce */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '432px', top: '381px', width: '83px', height: '54px' }}>
        <span className="truncate w-full text-center">Button Go Pounce</span>
      </button>
      {/* Siemens Status LED: Go Pounce Interlock */}
      <div className="absolute rounded-full shadow-inner bg-[#94A3B8] border-[#64748B] border flex items-center justify-center z-20" style={{ left: '250px', top: '280px', width: '100px', height: '30px' }} />
      {/* Diagnostic Row: Text field Select Style */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '103px', width: '465px', height: '31px' }}>
        <span className="truncate font-sans">Text field Select Style</span>
      </div>
      {/* Diagnostic Row: Text field TG Control */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '241px', top: '335px', width: '465px', height: '31px' }}>
        <span className="truncate font-sans">Text field TG Control</span>
      </div>
      {/* Diagnostic Row: Text Field To Home Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '345px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field To Home Pos</span>
      </div>
      {/* Diagnostic Row: Text Field To Work Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '368px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field To Work Pos</span>
      </div>
      {/* Diagnostic Row: Text Field To Pounce Pos */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '129px', top: '391px', width: '100px', height: '21px' }}>
        <span className="truncate font-sans">Text Field To Pounce Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '40px', top: '0px', width: '185px', height: '55px' }} />
      {/* Group Container Rectangle: Rectangle TGC_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '400px', top: '280px', width: '40px', height: '55px' }} />
      {/* Header Label: Text field TG1 Status_4 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '2px', top: '17px', width: '36px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 4</span>
      </div>
      {/* Header Label: Text Field TG5 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG5 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG5 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG5 In Work Pos</span>
      </div>
      {/* Header Label: Text Field TG5 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG5 Fault</span>
      </div>
      {/* Header Label: Text Field TG5 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG5 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '40px', top: '0px', width: '185px', height: '55px' }} />
      {/* Group Container Rectangle: Rectangle TGC_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '550px', top: '280px', width: '40px', height: '55px' }} />
      {/* Header Label: Text field TG1 Status_5 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '2px', top: '17px', width: '36px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 5</span>
      </div>
      {/* Header Label: Text Field TG6 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG6 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG6 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG6 In Work Pos</span>
      </div>
      {/* Header Label: Text Field TG6 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG6 Fault</span>
      </div>
      {/* Header Label: Text Field TG6 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG6 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '40px', top: '0px', width: '185px', height: '55px' }} />
      {/* Group Container Rectangle: Rectangle TGC_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '100px', top: '340px', width: '40px', height: '55px' }} />
      {/* Header Label: Text field TG1 Status_6 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '2px', top: '17px', width: '36px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 6</span>
      </div>
      {/* Header Label: Text Field TG7 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG7 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG7 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG7 In Work Pos</span>
      </div>
      {/* Header Label: Text Field TG7 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG7 Fault</span>
      </div>
      {/* Header Label: Text Field TG7 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG7 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '40px', top: '0px', width: '185px', height: '55px' }} />
      {/* Group Container Rectangle: Rectangle TGC_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '250px', top: '340px', width: '40px', height: '55px' }} />
      {/* Header Label: Text field TG1 Status_7 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '2px', top: '17px', width: '36px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status 7</span>
      </div>
      {/* Header Label: Text Field TG8 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG8 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG8 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG8 In Work Pos</span>
      </div>
      {/* Header Label: Text Field TG8 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG8 Fault</span>
      </div>
      {/* Header Label: Text Field TG8 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG8 In Home Pos</span>
      </div>
      {/* Group Container Rectangle: Rectangle TG1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '40px', top: '0px', width: '185px', height: '55px' }} />
      {/* Group Container Rectangle: Rectangle TGC */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '400px', top: '340px', width: '40px', height: '55px' }} />
      {/* Header Label: Text field TG1 Status */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '2px', top: '17px', width: '36px', height: '21px' }}>
        <span className="truncate">Text field TG1 Status</span>
      </div>
      {/* Header Label: Text Field TG1 In Pounce Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Pounce Pos</span>
      </div>
      {/* Header Label: Text Field TG1 In Work Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '28px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Work Pos</span>
      </div>
      {/* Header Label: Text Field TG1 Fault */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '43px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 Fault</span>
      </div>
      {/* Header Label: Text Field TG1 In Home Pos */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '132px', top: '6px', width: '90px', height: '21px' }}>
        <span className="truncate">Text Field TG1 In Home Pos</span>
      </div>
      {/* Header Selector: Select NC Locator */}
      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '403px', top: '64px', width: '290px', height: '37px' }}>
        <span className="truncate tracking-wide">Select NC Locator</span>
        <span className="text-[9px] text-white/90 ml-1">▼</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '384px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">Robot PLP Kuka</span>
      </div>
    </div>
  );
}

export default RobotPLPKukaComponent;
