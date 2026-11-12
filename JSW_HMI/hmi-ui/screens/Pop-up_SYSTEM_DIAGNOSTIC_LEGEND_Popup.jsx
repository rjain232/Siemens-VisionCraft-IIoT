import React, { useState } from 'react';

function PopupSYSTEMDIAGNOSTICLEGENDPopupComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '370px', height: '353px', minHeight: '353px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '0px', width: '330px', height: '313px' }} />
      {/* Action Button: Text_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1px', top: '1px', width: '328px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Header Label: Text_DeviceInOperation */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '35px', top: '38px', width: '200px', height: '20px' }}>
        <span className="truncate">Text DeviceInOperation</span>
      </div>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-xs rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '239px', top: '1px', width: '90px', height: '61px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Siemens Graphic View: Graphic_DeviceInOperation */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '38px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_DeviceInOperation" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic_DeviceCannotBeAccessed */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '61px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_DeviceCannotBeAccessed" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Header Label: Text_DeviceCannotBeAccessed */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[9px] flex items-center justify-center px-1.5 z-20" style={{ left: '35px', top: '61px', width: '200px', height: '20px' }}>
        <span className="truncate">Text DeviceCannotBeAccessed</span>
      </div>
      {/* Siemens Graphic View: Graphic_ErrorsInDevice */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '85px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_ErrorsInDevice" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_ErrorsInDevice */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '85px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text ErrorsInDevice</span>
      </div>
      {/* Siemens Graphic View: Graphic_DeviceDeactivated */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '107px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_DeviceDeactivated" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_DeviceDeactivated */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '107px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text DeviceDeactivated</span>
      </div>
      {/* Siemens Graphic View: Graphic_InputOutputDataNotAvailable */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '130px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_InputOutputDataNotAvailable" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_InputOutputDataNotAvailable */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '130px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text InputOutputDataNotAvailable</span>
      </div>
      {/* Siemens Graphic View: Graphic_MaintenanceRequired */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '153px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_MaintenanceRequired" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_MaintenanceRequired */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '153px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text MaintenanceRequired</span>
      </div>
      {/* Siemens Graphic View: Graphic_MaintenanceRecommended */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '176px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_MaintenanceRecommended" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_MaintenanceRecommended */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '176px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text MaintenanceRecommended</span>
      </div>
      {/* Diagnostic Row: Text_SuperimposedSymbol */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '268px', width: '285px', height: '35px' }}>
        <span className="truncate font-sans">Text SuperimposedSymbol</span>
      </div>
      {/* Diagnostic Row: Text_CurrentConfiguration */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '199px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text CurrentConfiguration</span>
      </div>
      {/* Siemens Graphic View: Graphic_CurrentConfiguration */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '199px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_CurrentConfiguration" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic_SuperimposedSymbol */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '268px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_SuperimposedSymbol" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Diagnostic Row: Text_StopEgUpdateBootOwnInitialization */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '222px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text StopEgUpdateBootOwnInitialization</span>
      </div>
      {/* Diagnostic Row: Text_Stop */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[9px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '35px', top: '245px', width: '285px', height: '20px' }}>
        <span className="truncate font-sans">Text Stop</span>
      </div>
      {/* Siemens Graphic View: Graphic_StopEgUpdateBootOwnInitialization */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '222px', width: '20px', height: '20px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_StopEgUpdateBootOwnInitialization" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Siemens Graphic View: Graphic_Stop */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '10px', top: '246px', width: '20px', height: '18px' }}>
        <img src="/tia_graphics/SICAR_FlexibleProcessLine.png" alt="Graphic_Stop" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
    </div>
  );
}

export default PopupSYSTEMDIAGNOSTICLEGENDPopupComponent;
