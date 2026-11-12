import React, { useState } from 'react';

function Screen_190RobotCollisionComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '706px', minHeight: '706px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-3px', top: '69px', width: '1274px', height: '597px' }} />
      {/* Siemens Graphic View: Graphic view_13 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '324px', top: '87px', width: '634px', height: '531px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_13" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_5 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '101px', top: '0px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_5" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_9 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '7px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_9" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '438px', top: '5px', width: '551px', height: '57px' }}>
        <span className="truncate">190RobotCollision</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Diagnostic Row: Text_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '694px', top: '69px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 3</span>
      </div>
      {/* Diagnostic Row: Text_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '627px', top: '514px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 4</span>
      </div>
      {/* Diagnostic Row: Text_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '459px', top: '491px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 5</span>
      </div>
      {/* Diagnostic Row: Text_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '476px', top: '68px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 6</span>
      </div>
      {/* Diagnostic Row: Text_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '542px', top: '488px', width: '84px', height: '76px' }}>
        <span className="truncate font-sans">Text 18</span>
      </div>
      {/* Group Container Rectangle: Rectangle_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '893px', top: '75px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_71 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '885px', top: '70px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 71</span>
      </div>
      {/* Diagnostic Row: Text_72 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '916px', top: '96px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 72</span>
      </div>
      {/* Diagnostic Row: Text_73 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '930px', top: '124px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 73</span>
      </div>
      {/* Diagnostic Row: Text_74 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '922px', top: '152px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 74</span>
      </div>
      {/* Group Container Rectangle: 矩形_44 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '906px', top: '159px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_45 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '906px', top: '132px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_46 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '906px', top: '105px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '809px', top: '415px', width: '164px', height: '222px' }} />
      {/* Diagnostic Row: Text_75 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '801px', top: '410px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 75</span>
      </div>
      {/* Diagnostic Row: Text_76 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '832px', top: '436px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 76</span>
      </div>
      {/* Diagnostic Row: Text_77 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '846px', top: '464px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 77</span>
      </div>
      {/* Diagnostic Row: Text_78 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '838px', top: '492px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 78</span>
      </div>
      {/* Group Container Rectangle: 矩形_47 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '499px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_48 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '472px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_49 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '445px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_83 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '832px', top: '546px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 83</span>
      </div>
      {/* Diagnostic Row: Text_84 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '801px', top: '520px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 84</span>
      </div>
      {/* Group Container Rectangle: 矩形_53 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '555px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_54 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '582px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_55 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '822px', top: '609px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_85 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '838px', top: '602px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 85</span>
      </div>
      {/* Diagnostic Row: Text_86 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '846px', top: '574px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 86</span>
      </div>
      {/* Siemens Graphic View: Graphic view_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '565px', top: '493px', width: '60px', height: '28px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '565px', top: '457px', width: '60px', height: '33px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '562px', top: '409px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Siemens Graphic View: Graphic view_11 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '88px', top: '0px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_11" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_12 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '7px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_12" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '414px', top: '147px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 2</span>
      </div>
      {/* Diagnostic Row: Text_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '414px', top: '378px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 9</span>
      </div>
      {/* Diagnostic Row: Text_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '398px', top: '497px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 8</span>
      </div>
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '176px', top: '86px', width: '164px', height: '227px' }} />
      {/* Diagnostic Row: Text_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '168px', top: '81px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 19</span>
      </div>
      {/* Diagnostic Row: Text_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '199px', top: '107px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 20</span>
      </div>
      {/* Diagnostic Row: Text_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '213px', top: '135px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 21</span>
      </div>
      {/* Diagnostic Row: Text_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '205px', top: '163px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 22</span>
      </div>
      {/* Group Container Rectangle: 矩形_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '170px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '143px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '116px', width: '17px', height: '17px' }} />
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '101px', top: '0px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_3 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '7px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_3" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '414px', top: '90px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 23</span>
      </div>
      {/* Diagnostic Row: Text_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '573px', top: '357px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 24</span>
      </div>
      {/* Diagnostic Row: Text_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '759px', top: '86px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 25</span>
      </div>
      {/* Diagnostic Row: Text_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '573px', top: '86px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 26</span>
      </div>
      {/* Siemens Graphic View: Graphic view_10 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '53px', top: '0px', width: '247px', height: '25px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_10" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_14 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '5px', width: '247px', height: '25px' }}>
        <img src="/tia_graphics/190 Collision Zone2.png" alt="Graphic view_14" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '375px', top: '606px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 27</span>
      </div>
      {/* Diagnostic Row: Text_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '459px', top: '570px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 28</span>
      </div>
      {/* Group Container Rectangle: Rectangle_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '972px', top: '415px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '964px', top: '410px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 29</span>
      </div>
      {/* Diagnostic Row: Text_30 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '995px', top: '436px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 30</span>
      </div>
      {/* Diagnostic Row: Text_31 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1009px', top: '464px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 31</span>
      </div>
      {/* Diagnostic Row: Text_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1001px', top: '492px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 32</span>
      </div>
      {/* Group Container Rectangle: 矩形_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '985px', top: '499px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '985px', top: '472px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '985px', top: '445px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '165px', top: '192px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 7</span>
      </div>
      {/* Diagnostic Row: Text_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '196px', top: '218px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 33</span>
      </div>
      {/* Diagnostic Row: Text_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '210px', top: '246px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 34</span>
      </div>
      {/* Diagnostic Row: Text_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '202px', top: '274px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 35</span>
      </div>
      {/* Group Container Rectangle: 矩形_14 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '186px', top: '281px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_15 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '186px', top: '254px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_16 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '186px', top: '227px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '219px', top: '394px', width: '164px', height: '224px' }} />
      {/* Diagnostic Row: Text_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '211px', top: '389px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 10</span>
      </div>
      {/* Diagnostic Row: Text_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '242px', top: '415px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 11</span>
      </div>
      {/* Diagnostic Row: Text_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '256px', top: '443px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 12</span>
      </div>
      {/* Diagnostic Row: Text_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '248px', top: '471px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 13</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '478px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '451px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '232px', top: '424px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '595px', top: '548px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_47 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '587px', top: '543px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 47</span>
      </div>
      {/* Diagnostic Row: Text_48 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '618px', top: '569px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 48</span>
      </div>
      {/* Diagnostic Row: Text_49 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '632px', top: '597px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 49</span>
      </div>
      {/* Diagnostic Row: Text_50 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '624px', top: '625px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 50</span>
      </div>
      {/* Group Container Rectangle: 矩形_26 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '608px', top: '632px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_27 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '608px', top: '605px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_28 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '608px', top: '578px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_51 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '215px', top: '499px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 51</span>
      </div>
      {/* Diagnostic Row: Text_52 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '246px', top: '525px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 52</span>
      </div>
      {/* Diagnostic Row: Text_53 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '260px', top: '553px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 53</span>
      </div>
      {/* Diagnostic Row: Text_54 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '252px', top: '581px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 54</span>
      </div>
      {/* Group Container Rectangle: 矩形_29 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '236px', top: '588px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_30 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '236px', top: '561px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '236px', top: '534px', width: '17px', height: '17px' }} />
    </div>
  );
}

export default Screen_190RobotCollisionComponent;
