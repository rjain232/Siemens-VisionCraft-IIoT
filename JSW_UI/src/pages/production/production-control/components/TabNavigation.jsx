import { useState, useRef, useEffect, useCallback } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  AlertTriangle,
  FileText,
  ChevronDown,
} from "lucide-react";

const iconMap = {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  AlertTriangle,
  FileText,
};

const abbreviateLabel = (label) => {
  const abbreviations = {
    "Production Overview": "Overview",
    "Hourly Production Report": "Hourly Rpt",
    "Buffer Trend": "Buffer",
    "Station Cycle Time": "Station CT",
    "Shift Summary Report": "Shift Rpt",
    "Detailed Production Count Report": "Prod Count",
    "Annual Graph": "Annual",
    "Line Cycle Time": "Line CT",
    "MTBF/MTTR": "MTBF/MTTR",
    Bottleneck: "Bottleneck",
  };
  return abbreviations[label] || label.substring(0, 8);
};

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  coreTabs = [],
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const btnRef = useRef(null);

  const computePosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const padding = 12;

    let dropWidth;
    if (vw < 425) dropWidth = Math.max(vw - padding * 2, 200);
    else if (vw < 640) dropWidth = Math.min(vw - 32, 380);
    else if (vw < 1024) dropWidth = Math.min(360, vw - 40);
    else if (vw < 1440) dropWidth = Math.min(440, vw - 60);
    else dropWidth = Math.min(520, vw - 80);

    let left = rect.right - dropWidth;
    if (left < padding) left = padding;
    if (left + dropWidth > vw - padding) left = vw - padding - dropWidth;

    setDropdownPos({
      top: rect.bottom + 6,
      left,
      width: dropWidth,
    });
  }, []);

  const handleToggle = () => {
    if (!dropdownOpen) computePosition();
    setDropdownOpen((prev) => !prev);
  };

  // Responsive tab visibility - 1, 2, 3, 4, 5 tabs visible based on screen
  const visibleCount = (() => {
    const w = window.innerWidth;
    if (w < 425) return 1;
    if (w < 640) return 2;
    if (w < 1024) return 3;
    if (w < 1440) return 4;
    return 5;
  })();

  const mainTabs =
    coreTabs.length > 0
      ? tabs.filter((t) => coreTabs.includes(t.id))
      : tabs.slice(0, visibleCount);
  const moreTabs =
    coreTabs.length > 0
      ? tabs.filter((t) => !coreTabs.includes(t.id))
      : tabs.slice(visibleCount);
  const isActiveInMore = moreTabs.some((t) => t.id === activeTab);

  const renderTabLabel = (tab) => {
    const w = window.innerWidth;
    if (w < 640) return null;
    if (w < 1024) return abbreviateLabel(tab.label);
    return tab.label;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    const handleScroll = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [dropdownOpen]);

  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex items-center gap-0.5 overflow-x-auto">
        <div className="flex items-center gap-0.5 min-w-min">
          {mainTabs.map((tab) => {
            const Icon =
              typeof tab.icon === "string" ? iconMap[tab.icon] : tab.icon;
            const isActive = activeTab === tab.id;
            const label = renderTabLabel(tab);

            return (
              <div
                key={tab.id}
                className="relative group"
                title={window.innerWidth < 640 ? tab.label : ""}
              >
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-1.5 sm:px-2.5 md:px-3 lg:px-3.5 xl:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "text-sky-600 border-sky-600 bg-sky-50/50"
                      : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {label && <span className="hidden sm:inline">{label}</span>}
                </button>
                {window.innerWidth < 640 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {tab.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {moreTabs.length > 0 && (
          <div>
            <button
              ref={btnRef}
              onClick={handleToggle}
              className={`flex items-center gap-1 px-1.5 sm:px-2.5 md:px-3 lg:px-3.5 xl:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActiveInMore
                  ? "text-sky-600 border-sky-600 bg-sky-50/50"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50/50"
              }`}
            >
              <span className="hidden sm:inline">More</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-[200] bg-black/10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div
                  ref={dropdownRef}
                  className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl z-[300] max-h-[75vh] overflow-y-auto"
                  style={{
                    top: dropdownPos.top + "px",
                    left: dropdownPos.left + "px",
                    width: dropdownPos.width + "px",
                  }}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-3">
                    {moreTabs.map((tab) => {
                      const Icon =
                        typeof tab.icon === "string"
                          ? iconMap[tab.icon]
                          : tab.icon;
                      const isActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            onTabChange(tab.id);
                            setDropdownOpen(false);
                          }}
                          className={`flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 md:px-3 md:py-3 rounded-lg transition-all border text-center sm:text-left overflow-hidden ${
                            isActive
                              ? "bg-sky-50 text-sky-600 border-sky-300"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              size={16}
                              className={`shrink-0 ${isActive ? "text-sky-600" : "text-gray-500"}`}
                            />
                          )}
                          <span className="text-xs font-medium leading-tight wrap-break min-w-0 w-full">
                            {tab.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
