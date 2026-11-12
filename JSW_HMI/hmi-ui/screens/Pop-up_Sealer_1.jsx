import React, { useState } from 'react';

function PopupSealer1Component() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '435px', height: '690px', minHeight: '690px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Process Value IOField: Robot Name */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '2px', top: '2px', width: '393px', height: '48px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: Background */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '-1px', top: '49px', width: '395px', height: '601px' }} />
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '315px', top: '4px', width: '76px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Group Container Rectangle: 矩形_4 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '31px', top: '68px', width: '324px', height: '517px' }} />
      {/* Diagnostic Row: Text Filed E- Stop_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '333px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop 17</span>
      </div>
      {/* Diagnostic Row: Text Field In Auto On_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '98px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Auto On 9</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '121px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 17</span>
      </div>
      {/* Diagnostic Row: Text field Robot Status_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '33px', top: '69px', width: '324px', height: '26px' }}>
        <span className="truncate font-sans">Text field Robot Status 5</span>
      </div>
      {/* Diagnostic Row: Text Field Manual_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '263px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual 17</span>
      </div>
      {/* Diagnostic Row: Text Field System Ready_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '145px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field System Ready 9</span>
      </div>
      {/* Diagnostic Row: Text Field Motor On_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '168px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Motor On 9</span>
      </div>
      {/* Diagnostic Row: Text Field In Cycle_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '192px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Cycle 9</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '215px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On 17</span>
      </div>
      {/* Diagnostic Row: Text Field On Path_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '239px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path 17</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '286px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode 17</span>
      </div>
      {/* Diagnostic Row: Text Field Stop_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '310px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop 17</span>
      </div>
      {/* Diagnostic Row: Text Filed Error_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '357px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Error 9</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '380px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault 9</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '404px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 18</span>
      </div>
      {/* Diagnostic Row: Text Filed E- Stop_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '546px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop 18</span>
      </div>
      {/* Diagnostic Row: Text Field Manual_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '475px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual 18</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '428px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On 18</span>
      </div>
      {/* Diagnostic Row: Text Field On Path_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '451px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path 18</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '498px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode 18</span>
      </div>
      {/* Diagnostic Row: Text Field Stop_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '39px', top: '522px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop 18</span>
      </div>
      {/* Diagnostic Row: Text Filed E- Stop_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '333px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop 19</span>
      </div>
      {/* Diagnostic Row: Text Field In Auto On_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '98px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Auto On 10</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '121px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 19</span>
      </div>
      {/* Diagnostic Row: Text Field Manual_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '263px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual 19</span>
      </div>
      {/* Diagnostic Row: Text Field System Ready_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '145px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field System Ready 10</span>
      </div>
      {/* Diagnostic Row: Text Field Motor On_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '168px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Motor On 10</span>
      </div>
      {/* Diagnostic Row: Text Field In Cycle_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '192px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field In Cycle 10</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '215px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On 19</span>
      </div>
      {/* Diagnostic Row: Text Field On Path_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '239px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path 19</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '286px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode 19</span>
      </div>
      {/* Diagnostic Row: Text Field Stop_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '310px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop 19</span>
      </div>
      {/* Diagnostic Row: Text Filed Error_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '357px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Error 10</span>
      </div>
      {/* Diagnostic Row: Text Filed Process Fault_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '380px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed Process Fault 10</span>
      </div>
      {/* Diagnostic Row: Text Field Home Position_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '404px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Home Position 20</span>
      </div>
      {/* Diagnostic Row: Text Filed E- Stop_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '546px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Filed E- Stop 20</span>
      </div>
      {/* Diagnostic Row: Text Field Manual_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '475px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Manual 20</span>
      </div>
      {/* Diagnostic Row: Text Field Cycle On_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '428px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Cycle On 20</span>
      </div>
      {/* Diagnostic Row: Text Field On Path_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '451px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field On Path 20</span>
      </div>
      {/* Diagnostic Row: Text Field Tryout Mode_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '498px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Tryout Mode 20</span>
      </div>
      {/* Diagnostic Row: Text Field Stop_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '200px', top: '522px', width: '148px', height: '21px' }}>
        <span className="truncate font-sans">Text Field Stop 20</span>
      </div>
    </div>
  );
}

export default PopupSealer1Component;
