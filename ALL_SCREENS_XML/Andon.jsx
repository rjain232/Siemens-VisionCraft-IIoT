import React, { useState } from 'react';

function AndonComponent() {
  const [activeTab, setActiveTab] = useState('main');
  const [activeActuator, setActiveActuator] = useState(1);

  return (
    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '1314px', height: '673px', minHeight: '673px' }}>
      {/* Siemens TIA Portal Engineering Background */}
      <div className="absolute inset-0 bg-[#CED3D7]" />
      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

      {/* Header Label: Title_ScreenOverview_X390_Y2 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '7px', width: '1265px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Diagnostic Row: Text box_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '346px', top: '188px', width: '590px', height: '89px' }}>
        <span className="truncate font-sans">Text box 3</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '9px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 1</span>
      </div>
      {/* Process Value IOField: IO 域_19 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '9px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '261px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 5</span>
      </div>
      {/* Process Value IOField: IO 域_21 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '261px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_3 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 3</span>
      </div>
      {/* Process Value IOField: IO 域_5 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '93px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '177px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 4</span>
      </div>
      {/* Process Value IOField: IO 域_20 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '177px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '345px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 6</span>
      </div>
      {/* Process Value IOField: IO 域_22 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '345px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_11 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '9px', top: '52px', width: '252px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_18 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '431px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 18</span>
      </div>
      {/* Process Value IOField: IO 域_42 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '431px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_19 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '683px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 19</span>
      </div>
      {/* Process Value IOField: IO 域_43 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '683px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_20 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '515px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 20</span>
      </div>
      {/* Process Value IOField: IO 域_44 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '515px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_21 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '599px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 21</span>
      </div>
      {/* Process Value IOField: IO 域_45 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '599px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_22 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '767px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 22</span>
      </div>
      {/* Process Value IOField: IO 域_46 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '767px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_23 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '431px', top: '52px', width: '252px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_25 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1105px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 25</span>
      </div>
      {/* Process Value IOField: IO 域_48 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1105px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_28 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1189px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 28</span>
      </div>
      {/* Process Value IOField: IO 域_51 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1189px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_29 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '853px', top: '52px', width: '252px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '9px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 7</span>
      </div>
      {/* Process Value IOField: IO 域_23 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '9px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '177px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 8</span>
      </div>
      {/* Process Value IOField: IO 域_24 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '177px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text box_32 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '262px', top: '278px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 32</span>
      </div>
      {/* Diagnostic Row: Text box_33 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '514px', top: '278px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 33</span>
      </div>
      {/* Diagnostic Row: Text box_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '764px', top: '278px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 34</span>
      </div>
      {/* Diagnostic Row: Text box_35 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1017px', top: '278px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 35</span>
      </div>
      {/* Diagnostic Row: Text box_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '373px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 36</span>
      </div>
      {/* Diagnostic Row: Text box_37 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '262px', top: '373px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 37</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_38 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '93px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 38</span>
      </div>
      {/* Process Value IOField: IO 域_6 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '93px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '261px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 39</span>
      </div>
      {/* Process Value IOField: IO 域_7 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '261px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_24 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '853px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 24</span>
      </div>
      {/* Process Value IOField: IO 域_47 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '853px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_26 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '937px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 26</span>
      </div>
      {/* Process Value IOField: IO 域_49 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '937px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_27 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1021px', top: '97px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 27</span>
      </div>
      {/* Process Value IOField: IO 域_50 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1021px', top: '142px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '937px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 9</span>
      </div>
      {/* Process Value IOField: IO 域_8 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '937px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_10 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1021px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 10</span>
      </div>
      {/* Process Value IOField: IO 域_9 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1021px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_14 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1105px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 14</span>
      </div>
      {/* Process Value IOField: IO 域_10 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1105px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Action Button: Move_Legend */}
      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white font-bold text-[11px] rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '1182px', top: '7px', width: '90px', height: '44px' }}>
        <span className="truncate w-full text-center">Legend</span>
      </button>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_17 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1189px', top: '188px', width: '84px', height: '44px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 17</span>
      </div>
      {/* Process Value IOField: IO 域_11 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1189px', top: '233px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO field_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '9px', top: '7px', width: '168px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_13 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '262px', top: '52px', width: '84px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_12 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '346px', top: '52px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_13 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '767px', top: '52px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_15 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '683px', top: '52px', width: '84px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_14 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1188px', top: '53px', width: '84px', height: '44px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_16 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '1104px', top: '53px', width: '84px', height: '44px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_2 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_31 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_4 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '100px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 2</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_12 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_32 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_3 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_30 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_1 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_57 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_33 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_56 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_34 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_35 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_36 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_58 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_37 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_59 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_37 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_68 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_53 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_67 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '250px', top: '100px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 67</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_66 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_65 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_52 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_64 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_41 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_40 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_63 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_39 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_62 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_61 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_60 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_38 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_69 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_54 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_15 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_48 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_27 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_47 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '400px', top: '100px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 47</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_46 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_45 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_26 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_44 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_25 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_18 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_43 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_17 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_42 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_41 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_40 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_16 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_49 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_28 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_29 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_58 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_35 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_57 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '550px', top: '100px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 57</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_56 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_55 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_34 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_54 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_33 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_32 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_53 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_31 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_52 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_51 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_50 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_30 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_59 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_36 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Text box_1 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '514px', top: '373px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 1</span>
      </div>
      {/* Diagnostic Row: Text box_2 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '278px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 2</span>
      </div>
      {/* Diagnostic Row: Text box_4 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '764px', top: '373px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 4</span>
      </div>
      {/* Diagnostic Row: Text box_5 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '1017px', top: '373px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 5</span>
      </div>
      {/* Diagnostic Row: Text box_6 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '10px', top: '469px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 6</span>
      </div>
      {/* Diagnostic Row: Text box_7 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '262px', top: '469px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 7</span>
      </div>
      {/* Diagnostic Row: Text box_8 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '514px', top: '469px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 8</span>
      </div>
      {/* Diagnostic Row: Text box_9 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-sm flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '764px', top: '469px', width: '255px', height: '96px' }}>
        <span className="truncate font-sans">Text box 9</span>
      </div>
      {/* Process Value IOField: IO 域_55 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_78 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_65 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_77 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '100px', top: '160px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 77</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_76 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_75 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_64 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_74 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_63 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_62 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_73 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_61 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_72 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_71 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_70 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_60 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_79 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_66 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_67 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_88 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_73 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_89 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '250px', top: '160px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 89</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_87 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_86 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_72 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_85 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_71 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_70 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_84 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_69 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_83 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_82 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_81 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_68 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_80 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_74 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_75 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_98 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_81 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Diagnostic Row: Title_ScreenOverview_X390_Y2_99 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '400px', top: '160px', width: '630px', height: '30px' }}>
        <span className="truncate font-sans">Title ScreenOverview X390 Y2 99</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_97 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_96 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '0px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_80 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '185px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_95 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '313px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_79 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '504px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Process Value IOField: IO 域_78 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_94 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '31px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_77 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '31px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_93 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '0px', width: '630px', height: '30px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_92 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '31px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_91 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '632px', top: '64px', width: '184px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_76 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '817px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Header Label: Title_ScreenOverview_X390_Y2_90 */}
      <div className="absolute bg-transparent text-[#027AAC] font-bold text-sm tracking-wide flex items-center justify-center px-1.5 z-20" style={{ left: '945px', top: '64px', width: '189px', height: '32px' }}>
        <span className="truncate">Andon</span>
      </div>
      {/* Process Value IOField: IO 域_82 */}
      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '1136px', top: '64px', width: '126px', height: '32px' }}>
        <span>0.00</span>
      </div>
      {/* Group Container Rectangle: Rectangle_36 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '297px', top: '0px', width: '115px', height: '81px' }} />
      {/* Header Label: Text_38 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '297px', top: '15px', width: '115px', height: '51px' }}>
        <span className="truncate">Text 38</span>
      </div>
      {/* Group Container Rectangle: Rectangle_37 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '87px', width: '144px', height: '46px' }} />
      {/* Diagnostic Row: Text_39 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '5px', top: '90px', width: '133px', height: '38px' }}>
        <span className="truncate font-sans">Text 39</span>
      </div>
      {/* Group Container Rectangle: Rectangle_38 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '80px', top: '90px', width: '144px', height: '46px' }} />
      {/* Header Label: Text_40 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '8px', top: '10px', width: '133px', height: '27px' }}>
        <span className="truncate">Text 40</span>
      </div>
      {/* Group Container Rectangle: Rectangle_39 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '143px', top: '87px', width: '155px', height: '46px' }} />
      {/* Diagnostic Row: Text_41 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '97px', width: '64px', height: '28px' }}>
        <span className="truncate font-sans">Text 41</span>
      </div>
      {/* Group Container Rectangle: Rectangle_40 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '143px', top: '0px', width: '155px', height: '46px' }} />
      {/* Header Label: Text_42 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '183px', top: '9px', width: '76px', height: '32px' }}>
        <span className="truncate">Text 42</span>
      </div>
      {/* Group Container Rectangle: Rectangle_31 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '297px', top: '0px', width: '115px', height: '81px' }} />
      {/* Header Label: Text_33 */}
      <div className="absolute bg-transparent text-[#262221] font-bold text-sm flex items-center justify-center px-1.5 z-20" style={{ left: '297px', top: '15px', width: '115px', height: '51px' }}>
        <span className="truncate">Text 33</span>
      </div>
      {/* Group Container Rectangle: Rectangle_32 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '0px', top: '87px', width: '144px', height: '46px' }} />
      {/* Diagnostic Row: Text_34 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-bold text-xs flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '5px', top: '90px', width: '133px', height: '38px' }}>
        <span className="truncate font-sans">Text 34</span>
      </div>
      {/* Group Container Rectangle: Rectangle_33 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '360px', top: '90px', width: '144px', height: '46px' }} />
      {/* Header Label: Text_35 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-xs flex items-center justify-center px-1.5 z-20" style={{ left: '8px', top: '10px', width: '133px', height: '27px' }}>
        <span className="truncate">Text 35</span>
      </div>
      {/* Group Container Rectangle: Rectangle_34 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '143px', top: '87px', width: '155px', height: '46px' }} />
      {/* Diagnostic Row: Text_36 */}
      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] font-medium text-[11px] flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '189px', top: '97px', width: '64px', height: '28px' }}>
        <span className="truncate font-sans">Text 36</span>
      </div>
      {/* Group Container Rectangle: Rectangle_35 */}
      <div className="absolute bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm pointer-events-none z-0" style={{ left: '143px', top: '0px', width: '155px', height: '46px' }} />
      {/* Header Label: Text_37 */}
      <div className="absolute bg-transparent text-[#262221] font-medium text-[11px] flex items-center justify-center px-1.5 z-20" style={{ left: '183px', top: '9px', width: '76px', height: '32px' }}>
        <span className="truncate">Text 37</span>
      </div>
    </div>
  );
}

export default AndonComponent;
