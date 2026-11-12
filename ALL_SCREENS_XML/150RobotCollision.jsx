import React, { useState } from 'react';

function Screen_150RobotCollisionComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '706px', minHeight: '706px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Rectangle_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '160px', top: '488px', width: '164px', height: '112px' }} />
      {/* Group Container Rectangle: Rectangle_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '918px', top: '113px', width: '164px', height: '112px' }} />
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-3px', top: '69px', width: '1274px', height: '597px' }} />
      {/* Siemens Graphic View: Graphic view_13 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '324px', top: '99px', width: '634px', height: '531px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_13" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '438px', top: '5px', width: '551px', height: '57px' }}>
        <span className="truncate">150RobotCollision</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Diagnostic Row: Text_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '746px', top: '95px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 3</span>
      </div>
      {/* Diagnostic Row: Text_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '734px', top: '600px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 4</span>
      </div>
      {/* Diagnostic Row: Text_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '450px', top: '616px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 5</span>
      </div>
      {/* Diagnostic Row: Text_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '461px', top: '80px', width: '84px', height: '39px' }}>
        <span className="truncate font-sans">Text 6</span>
      </div>
      {/* Diagnostic Row: Text_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '603px', top: '471px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 18</span>
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '597px', top: '578px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 2</span>
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
      {/* Siemens Graphic View: Graphic view_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '40px', width: '122px', height: '30px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '0px', width: '122px', height: '30px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '603px', top: '75px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Siemens Graphic View: Graphic view_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '40px', width: '122px', height: '30px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_3 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '0px', top: '0px', width: '122px', height: '30px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_3" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '597px', top: '182px', width: '84px', height: '73px' }}>
        <span className="truncate font-sans">Text 8</span>
      </div>
      {/* Diagnostic Row: Text_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '947px', top: '190px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 7</span>
      </div>
      {/* Group Container Rectangle: 矩形_11 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '197px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_12 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '170px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '955px', top: '162px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 9</span>
      </div>
      {/* Diagnostic Row: Text_23 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '941px', top: '134px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 23</span>
      </div>
      {/* Group Container Rectangle: 矩形_13 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '143px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '910px', top: '108px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 24</span>
      </div>
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '918px', top: '457px', width: '164px', height: '112px' }} />
      {/* Diagnostic Row: Text_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '947px', top: '534px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 10</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '541px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '514px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_11 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '955px', top: '506px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 11</span>
      </div>
      {/* Diagnostic Row: Text_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '941px', top: '478px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 12</span>
      </div>
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '931px', top: '487px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '910px', top: '452px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 13</span>
      </div>
      {/* Diagnostic Row: Text_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '183px', top: '509px', width: '123px', height: '35px' }}>
        <span className="truncate font-sans">Text 14</span>
      </div>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '173px', top: '518px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '565px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 15</span>
      </div>
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '173px', top: '572px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '173px', top: '545px', width: '17px', height: '17px' }} />
      {/* Diagnostic Row: Text_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '197px', top: '537px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 16</span>
      </div>
      {/* Diagnostic Row: Text_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '152px', top: '483px', width: '174px', height: '35px' }}>
        <span className="truncate font-sans">Text 17</span>
      </div>
    </div>
  );
}

export default Screen_150RobotCollisionComponent;
