import React, { useState } from 'react';

function PopupAndonLegendComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '306px', height: '436px', minHeight: '436px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Text box_30 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '4px', top: '20px', width: '188px', height: '24px' }}>
        <span className="truncate">Text box 30</span>
      </div>
      {/* Action Button: Textfeld_Legende */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[10px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '13px', top: '-1px', width: '170px', height: '25px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Action Button: Cancel Mode */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '195px', top: '3px', width: '71px', height: '42px' }}>
        <span className="truncate w-full text-center">Cancel Mode</span>
      </button>
      {/* Header Label: Text box_32 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[10px] flex items-center justify-center px-1.5 z-20" style={{ left: '4px', top: '45px', width: '188px', height: '24px' }}>
        <span className="truncate">Text box 32</span>
      </div>
      {/* Diagnostic Row: Text box_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '70px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 33</span>
      </div>
      {/* Diagnostic Row: Text box_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '95px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 34</span>
      </div>
      {/* Diagnostic Row: Text box_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '120px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 35</span>
      </div>
      {/* Diagnostic Row: Text box_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '145px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 36</span>
      </div>
      {/* Diagnostic Row: Text box_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '170px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 37</span>
      </div>
      {/* Diagnostic Row: Text box_38 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '196px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 38</span>
      </div>
      {/* Diagnostic Row: Text box_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '221px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 39</span>
      </div>
      {/* Diagnostic Row: Text box_40 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '246px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 40</span>
      </div>
      {/* Diagnostic Row: Text box_41 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '271px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 41</span>
      </div>
      {/* Diagnostic Row: Text box_42 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '296px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 42</span>
      </div>
      {/* Diagnostic Row: Text box_43 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '321px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 43</span>
      </div>
      {/* Diagnostic Row: Text box_44 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '346px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 44</span>
      </div>
      {/* Diagnostic Row: Text box_45 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[10px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '4px', top: '372px', width: '188px', height: '24px' }}>
        <span className="truncate font-sans">Text box 45</span>
      </div>
    </div>
  );
}

export default PopupAndonLegendComponent;
