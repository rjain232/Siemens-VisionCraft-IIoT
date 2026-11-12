import React, { useState } from 'react';

function RobotCollisionComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '706px', minHeight: '706px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '438px', top: '5px', width: '510px', height: '57px' }}>
        <span className="truncate">RobotCollision</span>
      </div>
      {/* Top Header Divider Line */}
      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '64px', width: '100%' }} />
      {/* Group Container Rectangle: 矩形_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '6px', top: '69px', width: '1262px', height: '597px' }} />
      {/* Action Button: Button_Back */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '2px', top: '2px', width: '90px', height: '60px' }}>
        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">Back</span></span>
      </button>
      {/* Siemens Graphic View: Graphic view_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '596px', top: '199px', width: '147px', height: '35px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '595px', top: '149px', width: '153px', height: '35px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '637px', top: '107px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 1</span>
      </div>
      {/* Diagnostic Row: Text_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '884px', top: '183px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 2</span>
      </div>
      {/* Diagnostic Row: Text_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '884px', top: '532px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 3</span>
      </div>
      {/* Diagnostic Row: Text_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '334px', top: '532px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 4</span>
      </div>
      {/* Diagnostic Row: Text_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '334px', top: '184px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 5</span>
      </div>
      {/* Diagnostic Row: Text_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '637px', top: '246px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 6</span>
      </div>
      {/* Siemens Graphic View: Graphic view_3 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '595px', top: '510px', width: '153px', height: '35px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_3" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic view_5 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '596px', top: '560px', width: '147px', height: '35px' }}>
        <img src="/tia_graphics/Robotcollisioin.png" alt="Graphic view_5" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '637px', top: '468px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 7</span>
      </div>
      {/* Diagnostic Row: Text_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '637px', top: '607px', width: '88px', height: '35px' }}>
        <span className="truncate font-sans">Text 8</span>
      </div>
      {/* Group Container Rectangle: Rectangle_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '5px', width: '164px', height: '111px' }} />
      {/* Diagnostic Row: Text_13 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '140px', height: '35px' }}>
        <span className="truncate font-sans">Text 13</span>
      </div>
      {/* Header Label: Text_14 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '31px', top: '26px', width: '123px', height: '35px' }}>
        <span className="truncate">Text 14</span>
      </div>
      {/* Header Label: Text_15 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '44px', top: '54px', width: '88px', height: '35px' }}>
        <span className="truncate">Text 15</span>
      </div>
      {/* Diagnostic Row: Text_16 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '37px', top: '82px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 16</span>
      </div>
      {/* Group Container Rectangle: 矩形_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '89px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_5 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '62px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '21px', top: '35px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_7 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '5px', width: '161px', height: '111px' }} />
      {/* Diagnostic Row: Text_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '140px', height: '35px' }}>
        <span className="truncate font-sans">Text 33</span>
      </div>
      {/* Header Label: Text_34 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '32px', top: '26px', width: '121px', height: '35px' }}>
        <span className="truncate">Text 34</span>
      </div>
      {/* Header Label: Text_35 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '45px', top: '54px', width: '87px', height: '35px' }}>
        <span className="truncate">Text 35</span>
      </div>
      {/* Diagnostic Row: Text_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '38px', top: '82px', width: '134px', height: '35px' }}>
        <span className="truncate font-sans">Text 36</span>
      </div>
      {/* Group Container Rectangle: 矩形_20 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '18px', top: '35px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_21 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '18px', top: '62px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_22 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '18px', top: '89px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '5px', width: '164px', height: '111px' }} />
      {/* Diagnostic Row: Text_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '140px', height: '35px' }}>
        <span className="truncate font-sans">Text 9</span>
      </div>
      {/* Header Label: Text_10 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '31px', top: '26px', width: '123px', height: '35px' }}>
        <span className="truncate">Text 10</span>
      </div>
      {/* Header Label: Text_11 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '44px', top: '54px', width: '88px', height: '35px' }}>
        <span className="truncate">Text 11</span>
      </div>
      {/* Diagnostic Row: Text_12 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '37px', top: '82px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 12</span>
      </div>
      {/* Group Container Rectangle: 矩形_10 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '89px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_9 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '62px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_8 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '35px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: Rectangle_6 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '8px', top: '5px', width: '164px', height: '111px' }} />
      {/* Diagnostic Row: Text_29 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '86px', top: '96px', width: '140px', height: '35px' }}>
        <span className="truncate font-sans">Text 29</span>
      </div>
      {/* Header Label: Text_30 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '31px', top: '26px', width: '123px', height: '35px' }}>
        <span className="truncate">Text 30</span>
      </div>
      {/* Header Label: Text_31 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '44px', top: '54px', width: '88px', height: '35px' }}>
        <span className="truncate">Text 31</span>
      </div>
      {/* Diagnostic Row: Text_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '37px', top: '82px', width: '136px', height: '35px' }}>
        <span className="truncate font-sans">Text 32</span>
      </div>
      {/* Group Container Rectangle: 矩形_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '35px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '62px', width: '17px', height: '17px' }} />
      {/* Group Container Rectangle: 矩形_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '20px', top: '89px', width: '17px', height: '17px' }} />
    </div>
  );
}

export default RobotCollisionComponent;
