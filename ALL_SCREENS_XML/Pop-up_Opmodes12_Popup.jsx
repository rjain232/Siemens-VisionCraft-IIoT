import React, { useState } from 'react';

function PopupOpmodes12PopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '685px', height: '307px', minHeight: '307px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '645px', height: '267px' }} />
      {/* Diagnostic Row: Descr_HmiPanel */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1px', top: '208px', width: '56px', height: '40px' }}>
        <span className="truncate font-sans">Descr HmiPanel</span>
      </div>
      {/* Schematic Trace: Linie1_LightGrey */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '207px', width: '520px' }} />
      {/* Schematic Trace: Linie1_DarkGrey */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '207px', width: '520px' }} />
      {/* Schematic Trace: Linie1_LightGrey_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '249px', width: '520px' }} />
      {/* Schematic Trace: Linie1_DarkGrey_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '10px', top: '248px', width: '520px' }} />
      {/* Header Label: Overview_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '1px', width: '643px', height: '25px' }}>
        <span className="truncate">Overview OPMode</span>
      </div>
      {/* Header Label: Descr_OPMode */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '1px', top: '26px', width: '550px', height: '40px' }}>
        <span className="truncate">Descr OPMode</span>
      </div>
      {/* Action Button: OPMode1_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode1 wide</span>
      </button>
      {/* Action Button: OPMode2_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '10px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode2 wide</span>
      </button>
      {/* Action Button: OPMode3_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '115px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode3 wide</span>
      </button>
      {/* Action Button: OPMode4_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '116px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode4 wide</span>
      </button>
      {/* Action Button: OPMode5_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '220px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode5 wide</span>
      </button>
      {/* Action Button: OPMode6_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '221px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode6 wide</span>
      </button>
      {/* Action Button: OPMode7_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '326px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode7 wide</span>
      </button>
      {/* Action Button: OPMode8_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '326px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode8 wide</span>
      </button>
      {/* Action Button: OPMode9_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '430px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode9 wide</span>
      </button>
      {/* Action Button: OPMode10_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '430px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode10 wide</span>
      </button>
      {/* Action Button: OPMode11_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '535px', top: '71px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode11 wide</span>
      </button>
      {/* Action Button: OPMode12_wide */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '535px', top: '136px', width: '100px', height: '60px' }}>
        <span className="truncate w-full text-center">OPMode12 wide</span>
      </button>
      {/* Action Button: Overview_HMI-OP */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '554px', top: '207px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Overview HMI-OP</span>
      </button>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '554px', top: '1px', width: '90px', height: '60px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Siemens Graphic View: OPMode1_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode1_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode2_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode2_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode3_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '115px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode3_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode4_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '115px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode4_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode5_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '220px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode5_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode6_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '221px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode6_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode7_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '326px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode7_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode8_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '326px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode8_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode9_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '430px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode9_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode10_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '430px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode10_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode11_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '535px', top: '71px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode11_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode12_Foreground_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '535px', top: '136px', width: '100px', height: '60px' }}>
        <img src="/tia_graphics/SICAR_Model.png" alt="OPMode12_Foreground_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode1_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '93px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode1_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode2_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '93px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode2_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode3_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '199px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode3_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode4_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '199px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode4_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode5_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '303px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode5_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode6_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '305px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode6_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode7_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '408px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode7_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode8_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '408px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode8_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode9_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '514px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode9_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode10_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '514px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode10_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode11_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '618px', top: '75px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode11_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: OPMode12_Blocked */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '618px', top: '139px', width: '14px', height: '14px' }}>
        <img src="/tia_graphics/SICAR_Blocked-Orange-14x14_1.png" alt="OPMode12_Blocked" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
    </div>
  );
}

export default PopupOpmodes12PopupComponent;
