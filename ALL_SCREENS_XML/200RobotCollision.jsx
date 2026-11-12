import React, { useState } from 'react';

function Screen_200RobotCollisionComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '706px', minHeight: '706px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Graphic View: Graphic view_13 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '324px', top: '99px', width: '634px', height: '531px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_13" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-3px', top: '69px', width: '1274px', height: '597px' }} />
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '438px', top: '5px', width: '551px', height: '57px' }}>
        <span className="truncate">200RobotCollision</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Diagnostic Row: Text_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '807px', top: '91px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 3</span>
      </div>
      {/* Diagnostic Row: Text_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '822px', top: '617px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 4</span>
      </div>
      {/* Diagnostic Row: Text_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '648px', top: '611px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 5</span>
      </div>
      {/* Diagnostic Row: Text_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '398px', top: '91px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 6</span>
      </div>
      {/* Diagnostic Row: Text_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '744px', top: '583px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 18</span>
      </div>
      {/* Group Container Rectangle: Rectangle_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1002px', top: '120px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_71 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '994px', top: '115px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 71</span>
      </div>
      {/* Diagnostic Row: Text_72 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1025px', top: '141px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 72</span>
      </div>
      {/* Diagnostic Row: Text_73 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1039px', top: '169px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 73</span>
      </div>
      {/* Diagnostic Row: Text_74 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1031px', top: '197px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 74</span>
      </div>
      {/* Group Container Rectangle: 矩形_44 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1015px', top: '204px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_45 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1015px', top: '177px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_46 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1015px', top: '150px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1006px', top: '411px', width: '164px', height: '222px' }} />
      {/* Diagnostic Row: Text_75 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '998px', top: '406px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 75</span>
      </div>
      {/* Diagnostic Row: Text_76 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1029px', top: '432px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 76</span>
      </div>
      {/* Diagnostic Row: Text_77 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1043px', top: '460px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 77</span>
      </div>
      {/* Diagnostic Row: Text_78 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1035px', top: '488px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 78</span>
      </div>
      {/* Group Container Rectangle: 矩形_47 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '495px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_48 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '468px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_49 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '441px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_83 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1029px', top: '542px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 83</span>
      </div>
      {/* Diagnostic Row: Text_84 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '998px', top: '516px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 84</span>
      </div>
      {/* Group Container Rectangle: 矩形_53 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '551px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_54 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '578px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_55 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1019px', top: '605px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_85 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1035px', top: '598px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 85</span>
      </div>
      {/* Diagnostic Row: Text_86 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1043px', top: '570px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 86</span>
      </div>
      {/* Siemens Graphic View: Graphic view_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '749px', top: '581px', width: '60px', height: '30px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '749px', top: '545px', width: '60px', height: '30px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '734px', top: '503px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Siemens Graphic View: Graphic view_11 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '88px', top: '0px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_11" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_12 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '7px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_12" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '891px', top: '492px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 2</span>
      </div>
      {/* Diagnostic Row: Text_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '722px', top: '202px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 9</span>
      </div>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '101px', top: '0px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_3 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '7px', width: '472px', height: '35px' }}>
        <img src="/tia_graphics/200 Collision Zone.png" alt="Graphic view_3" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '296px', top: '202px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 7</span>
      </div>
      {/* Diagnostic Row: Text_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '580px', top: '475px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 8</span>
      </div>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '179px', top: '406px', width: '164px', height: '222px' }} />
      {/* Diagnostic Row: Text_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '171px', top: '401px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 10</span>
      </div>
      {/* Diagnostic Row: Text_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '202px', top: '427px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 11</span>
      </div>
      {/* Diagnostic Row: Text_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '216px', top: '455px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 12</span>
      </div>
      {/* Diagnostic Row: Text_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '208px', top: '483px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 13</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '490px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '463px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '436px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '202px', top: '537px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 14</span>
      </div>
      {/* Diagnostic Row: Text_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '171px', top: '511px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 15</span>
      </div>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '546px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '573px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '192px', top: '600px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '208px', top: '593px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 16</span>
      </div>
      {/* Diagnostic Row: Text_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '216px', top: '565px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 17</span>
      </div>
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '176px', top: '98px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '168px', top: '93px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 19</span>
      </div>
      {/* Diagnostic Row: Text_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '199px', top: '119px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 20</span>
      </div>
      {/* Diagnostic Row: Text_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '213px', top: '147px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 21</span>
      </div>
      {/* Diagnostic Row: Text_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '205px', top: '175px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 22</span>
      </div>
      {/* Group Container Rectangle: 矩形_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '182px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '155px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '189px', top: '128px', width: '17px', height: '17px' }} />
    </div>
  );
}

export default Screen_200RobotCollisionComponent;
