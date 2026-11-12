import React, { useState } from 'react';

function MainComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1276px', height: '673px', minHeight: '673px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Group Container Rectangle: Overview_01_Shadow_3 */}
      <div className="absolute bg-[#E2E8F0] border-2 border-[#CBD5E1] shadow-md rounded-md pointer-events-none z-0" style={{ left: '645px', top: '146px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_1 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '60px', top: '140px', width: '217px', height: '208px' }} />
      {/* Siemens Graphic View: PosDev_Lifter_3 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '645px', top: '213px', width: '207px', height: '125px' }}>
        <img src="/tia_graphics/Lifter.png" alt="PosDev_Lifter_3" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Card Header Text: Overview_01_Text_3 */}
      <div className="absolute text-sm font-bold text-[#027AAC] tracking-wide flex items-center px-2 z-20" style={{ left: '642px', top: '144px', width: '212px', height: '31px' }}>
        <span className="truncate">Station 130 APC Lifter</span>
      </div>
      {/* Card Header Text: Overview_01_TextTyp_3 */}
      <div className="absolute text-xs text-slate-500 font-mono flex items-center px-2 z-20" style={{ left: '642px', top: '178px', width: '180px', height: '26px' }}>
        <span className="truncate">Type: Model-3</span>
      </div>
      {/* Card Hit-Target Overlay: Overview_01_Button_1 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '642px', top: '144px', width: '217px', height: '208px' }} />
      {/* Card Hit-Target Overlay: Overview_01_Button_6 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '642px', top: '144px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_01_Shadow_1 */}
      <div className="absolute bg-[#E2E8F0] border-2 border-[#CBD5E1] shadow-md rounded-md pointer-events-none z-0" style={{ left: '65px', top: '146px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_2 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '350px', top: '140px', width: '217px', height: '208px' }} />
      {/* Siemens Graphic View: PosDev_Lifter_1 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '65px', top: '213px', width: '207px', height: '125px' }}>
        <img src="/tia_graphics/Lifter.png" alt="PosDev_Lifter_1" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Card Header Text: Overview_01_Text_1 */}
      <div className="absolute text-sm font-bold text-[#027AAC] tracking-wide flex items-center px-2 z-20" style={{ left: '62px', top: '144px', width: '212px', height: '31px' }}>
        <span className="truncate">Station 110 APC Lifter</span>
      </div>
      {/* Card Header Text: Overview_01_TextTyp_1 */}
      <div className="absolute text-xs text-slate-500 font-mono flex items-center px-2 z-20" style={{ left: '62px', top: '178px', width: '180px', height: '26px' }}>
        <span className="truncate">Type: Model-1</span>
      </div>
      {/* Card Hit-Target Overlay: Overview_01_Button_2 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '61px', top: '141px', width: '217px', height: '208px' }} />
      {/* Card Hit-Target Overlay: Overview_01_Button_3 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '61px', top: '143px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_01_Shadow_4 */}
      <div className="absolute bg-[#E2E8F0] border-2 border-[#CBD5E1] shadow-md rounded-md pointer-events-none z-0" style={{ left: '935px', top: '146px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '930px', top: '140px', width: '217px', height: '208px' }} />
      {/* Siemens Graphic View: PosDev_Lifter_4 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '935px', top: '213px', width: '207px', height: '125px' }}>
        <img src="/tia_graphics/Lifter.png" alt="PosDev_Lifter_4" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Card Header Text: Overview_01_Text_4 */}
      <div className="absolute text-sm font-bold text-[#027AAC] tracking-wide flex items-center px-2 z-20" style={{ left: '932px', top: '144px', width: '212px', height: '31px' }}>
        <span className="truncate">Station 140 APC Lifter</span>
      </div>
      {/* Card Header Text: Overview_01_TextTyp_4 */}
      <div className="absolute text-xs text-slate-500 font-mono flex items-center px-2 z-20" style={{ left: '932px', top: '178px', width: '180px', height: '26px' }}>
        <span className="truncate">Type: Model-4</span>
      </div>
      {/* Card Hit-Target Overlay: Overview_01_Button_7 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '931px', top: '143px', width: '217px', height: '208px' }} />
      {/* Card Hit-Target Overlay: Overview_01_Button_8 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '931px', top: '142px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_01_Shadow_2 */}
      <div className="absolute bg-[#E2E8F0] border-2 border-[#CBD5E1] shadow-md rounded-md pointer-events-none z-0" style={{ left: '355px', top: '146px', width: '217px', height: '208px' }} />
      {/* Group Container Rectangle: Overview_3 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '640px', top: '140px', width: '217px', height: '208px' }} />
      {/* Siemens Graphic View: PosDev_Lifter_2 */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '355px', top: '213px', width: '207px', height: '125px' }}>
        <img src="/tia_graphics/Lifter.png" alt="PosDev_Lifter_2" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />
      </div>
      {/* Card Header Text: Overview_01_Text_2 */}
      <div className="absolute text-sm font-bold text-[#027AAC] tracking-wide flex items-center px-2 z-20" style={{ left: '352px', top: '144px', width: '212px', height: '31px' }}>
        <span className="truncate">Station 120 APC Lifter</span>
      </div>
      {/* Card Header Text: Overview_01_TextTyp_2 */}
      <div className="absolute text-xs text-slate-500 font-mono flex items-center px-2 z-20" style={{ left: '352px', top: '178px', width: '180px', height: '26px' }}>
        <span className="truncate">Type: Model-2</span>
      </div>
      {/* Card Hit-Target Overlay: Overview_01_Button_4 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '352px', top: '143px', width: '217px', height: '208px' }} />
      {/* Card Hit-Target Overlay: Overview_01_Button_5 */}
      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '352px', top: '143px', width: '217px', height: '208px' }} />
    </div>
  );
}

export default MainComponent;
