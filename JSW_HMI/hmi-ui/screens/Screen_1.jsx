import React, { useState } from 'react';

function Screen1Component() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1366px', height: '768px', minHeight: '768px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-sm font-bold text-slate-600 mb-1">Siemens Simatic Panel Window</span>
        <span className="text-xs text-slate-500 font-mono">[Modal Window: Screen1]</span>
      </div>
    </div>
  );
}

export default Screen1Component;
