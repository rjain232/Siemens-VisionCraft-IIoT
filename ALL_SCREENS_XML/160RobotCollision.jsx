import React, { useState } from 'react';

function Screen_160RobotCollisionComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '707px', minHeight: '707px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Siemens Graphic View: Graphic view_13 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '333px', top: '98px', width: '634px', height: '531px' }}>
        <img src="/tia_graphics/160 Collision Zone_1.png" alt="Graphic view_13" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '70px', width: '1274px', height: '597px' }} />
      {/* Siemens Graphic View: Graphic view_11 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '331px', top: '353px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/160 Collision Zone_1.png" alt="Graphic view_11" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_12 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '239px', top: '353px', width: '410px', height: '35px' }}>
        <img src="/tia_graphics/160 Collision Zone_1.png" alt="Graphic view_12" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '438px', top: '5px', width: '551px', height: '57px' }}>
        <span className="truncate">160RobotCollision</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Diagnostic Row: Text_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '449px', top: '616px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 5</span>
      </div>
      {/* Diagnostic Row: Text_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '449px', top: '77px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 6</span>
      </div>
      {/* Group Container Rectangle: Rectangle_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '259px', width: '164px', height: '328px' }} />
      {/* Diagnostic Row: Text_75 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '72px', top: '257px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 75</span>
      </div>
      {/* Diagnostic Row: Text_76 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '103px', top: '283px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 76</span>
      </div>
      {/* Diagnostic Row: Text_77 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '117px', top: '311px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 77</span>
      </div>
      {/* Diagnostic Row: Text_78 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '339px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 78</span>
      </div>
      {/* Group Container Rectangle: 矩形_47 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '346px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_48 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '319px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_49 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '292px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_83 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '103px', top: '393px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 83</span>
      </div>
      {/* Diagnostic Row: Text_84 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '72px', top: '367px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 84</span>
      </div>
      {/* Group Container Rectangle: 矩形_53 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '402px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_54 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '429px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_55 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '93px', top: '456px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_85 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '109px', top: '449px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 85</span>
      </div>
      {/* Diagnostic Row: Text_86 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '117px', top: '421px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 86</span>
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '351px', top: '209px', width: '84px', height: '60px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '544px', top: '461px', width: '84px', height: '60px' }}>
        <span className="truncate font-sans">Text 2</span>
      </div>
      {/* Diagnostic Row: Text_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '71px', top: '473px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 3</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '92px', top: '508px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '108px', top: '555px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 4</span>
      </div>
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '92px', top: '535px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '92px', top: '562px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '116px', top: '527px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 7</span>
      </div>
      {/* Diagnostic Row: Text_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '102px', top: '499px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 8</span>
      </div>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1031px', top: '238px', width: '164px', height: '328px' }} />
      {/* Diagnostic Row: Text_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1023px', top: '236px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 9</span>
      </div>
      {/* Diagnostic Row: Text_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1054px', top: '262px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 10</span>
      </div>
      {/* Diagnostic Row: Text_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1068px', top: '290px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 11</span>
      </div>
      {/* Diagnostic Row: Text_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1060px', top: '318px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 12</span>
      </div>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '325px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '298px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '271px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1054px', top: '372px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 13</span>
      </div>
      {/* Diagnostic Row: Text_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1023px', top: '346px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 14</span>
      </div>
      {/* Group Container Rectangle: 矩形_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '381px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '408px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1044px', top: '435px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1060px', top: '428px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 15</span>
      </div>
      {/* Diagnostic Row: Text_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1068px', top: '400px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 16</span>
      </div>
      {/* Diagnostic Row: Text_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1022px', top: '452px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 17</span>
      </div>
      {/* Group Container Rectangle: 矩形_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1043px', top: '487px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1059px', top: '534px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 18</span>
      </div>
      {/* Group Container Rectangle: 矩形_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1043px', top: '514px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '1043px', top: '541px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1067px', top: '506px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 19</span>
      </div>
      {/* Diagnostic Row: Text_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1053px', top: '478px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 20</span>
      </div>
    </div>
  );
}

export default Screen_160RobotCollisionComponent;
