import React, { useState } from 'react';

function Screen_10SubMenusComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '138px', height: '808px', minHeight: '808px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Diagnostic Row: txtOverview_15 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '715px', width: '100px', height: '53px' }}>
        <span className="truncate font-sans">txtOverview 15</span>
      </div>
      {/* Diagnostic Row: txtOverview_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '658px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 1</span>
      </div>
      {/* Diagnostic Row: txtOverview_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '601px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 2</span>
      </div>
      {/* Diagnostic Row: txtOverview_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '542px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 3</span>
      </div>
      {/* Diagnostic Row: txtOverview_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '482px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 4</span>
      </div>
      {/* Diagnostic Row: txtOverview_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '422px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 5</span>
      </div>
      {/* Diagnostic Row: txtOverview_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '362px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 6</span>
      </div>
      {/* Diagnostic Row: txtOverview_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '302px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 7</span>
      </div>
      {/* Diagnostic Row: txtOverview_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '242px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 8</span>
      </div>
      {/* Diagnostic Row: txtOverview_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '182px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 9</span>
      </div>
      {/* Diagnostic Row: txtOverview_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '-2px', top: '122px', width: '100px', height: '52px' }}>
        <span className="truncate font-sans">txtOverview 10</span>
      </div>
      {/* Header Label: txtOverview_11 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '-2px', top: '62px', width: '100px', height: '52px' }}>
        <span className="truncate">txtOverview 11</span>
      </div>
      {/* Header Label: txtOverview_12 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '-2px', top: '2px', width: '100px', height: '52px' }}>
        <span className="truncate">txtOverview 12</span>
      </div>
      {/* Schematic Trace: 线_1 */}
      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '0px', top: '418px', width: '97px' }} />
    </div>
  );
}

export default Screen_10SubMenusComponent;
