import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { useSubTab } from "../../context/SubTabContext";
import { useState, useEffect, useRef } from "react";

const pageHierarchy = {
  "/dashboard": { name: "Dashboard", parent: null },
  "/oee": { name: "OEE", parent: "/production" },
  "/robot-monitoring": { name: "Robot Monitoring", parent: "/production" },
  "/production-control": { name: "Production Control", parent: "/production" },
  "/maintenance": { name: "Maintenance", parent: "/production" },
"/production": { name: "Production", parent: "/dashboard" },
  "/process-configurator": {
    name: "Process Configurator",
    parent: "/configuration",
  },
  "/third-party-report": { name: "Third Party Report", parent: "/configuration" },
  "/configuration": { name: "Configuration", parent: "/dashboard" },
  "/part-marriage": { name: "Part Marriage", parent: "/operations" },
  "/operations": { name: "Operations", parent: "/dashboard" },
  "/share-reports": { name: "Share Reports", parent: "/reports" },
  "/reports": { name: "Reports", parent: "/dashboard" },
  "/access-configuration": {
    name: "Access Configuration",
    parent: "/administration",
  },
  "/user-management": { name: "User Management", parent: "/administration" },
  "/administration": { name: "Administration", parent: "/dashboard" },
  "/about": { name: "About", parent: "/help" },
  "/help": { name: "Help", parent: "/dashboard" },
};

const navigablePaths = new Set([
  "/dashboard",
  "/oee",
  "/robot-monitoring",
  "/production-control",
  "/maintenance",
"/process-configurator",
   "/third-party-report",
  "/part-marriage",
  "/share-reports",
  "/access-configuration",
  "/user-management",
  "/about",
  "/help",
]);

// Abbreviate breadcrumb names for tablet/mobile view
const abbreviateName = (name) => {
  const abbreviations = {
    Production: "Prod",
    "Robot Monitoring": "Robot",
    "Production Control": "Prod Ctrl",
    OEE: "OEE",
    Configuration: "Config",
    "Process Configurator": "Config",
   "Third Party Report": "3P Data",
    Operations: "Ops",
    "Part Marriage": "Parts",
    Reports: "Reports",
    "Share Reports": "Share",
    Administration: "Admin",
    "Access Configuration": "Access",
    "User Management": "Users",
    Help: "Help",
    About: "About",
  };
  return abbreviations[name] || name.substring(0, 6);
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const { currentSubTab } = useSubTab();
  const [screenSize, setScreenSize] = useState("lg");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const dropdownRef = useRef(null);
  const prevSubTabRef = useRef(currentSubTab);

  // Detect screen size on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger highlight animation when breadcrumb changes
  useEffect(() => {
    if (currentSubTab !== prevSubTabRef.current) {
      setIsHighlighting(true);
      prevSubTabRef.current = currentSubTab;

      const timer = setTimeout(() => {
        setIsHighlighting(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [currentSubTab]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  // Build breadcrumb trail
  const breadcrumbs = [];
  let path = pathname;
  while (path && path !== "/dashboard") {
    const page = pageHierarchy[path];
    if (!page) break;
    breadcrumbs.unshift({ path, name: page.name });
    path = page.parent;
  }

  // Determine which breadcrumbs to show based on screen size
  const getVisibleBreadcrumbs = () => {
    if (screenSize === "sm") {
      // Mobile: show only last crumb + current subtab
      return breadcrumbs.slice(-1);
    }
    if (screenSize === "md") {
      // Tablet: show last 2 crumbs
      return breadcrumbs.slice(-2);
    }
    // Desktop: show all crumbs
    return breadcrumbs;
  };

  const visibleBreadcrumbs = getVisibleBreadcrumbs();
  const hiddenBreadcrumbs = breadcrumbs.slice(
    0,
    breadcrumbs.length - visibleBreadcrumbs.length,
  );

  if (
    pathname === "/dashboard" ||
    pathname === "/master" ||
    pathname.startsWith("/login")
  )
    return null;

  // Abbreviate on BOTH sm and md — mobile needs the short names more than tablet does,
  // not less. Previously this only fired on "md", so phones showed full-length names.
  const renderBreadcrumbName = (name) => {
    if (screenSize === "sm" || screenSize === "md") {
      return abbreviateName(name);
    }
    return name;
  };

  const iconSize = screenSize === "sm" ? 14 : 16;
  const textSize = screenSize === "sm" ? "text-xs" : "text-sm";

  // Cap how wide the (unabbreviated, dynamic) current sub-tab label is allowed to get,
  // so a long title like "Detailed Production Count Report" ellipsizes instead of
  // pushing the row wider than the viewport.
  const subTabMaxWidth =
    screenSize === "sm"
      ? "max-w-[110px]"
      : screenSize === "md"
        ? "max-w-[180px]"
        : "max-w-none";

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-2 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-6">
      <div
        className={`flex items-center gap-1 sm:gap-2 ${textSize} min-w-0 overflow-x-auto`}
      >
        <Link
          to="/dashboard"
          className="flex items-center gap-0.5 sm:gap-1 text-gray-500 hover:text-gray-700 whitespace-nowrap flex-shrink-0"
        >
          <Home size={iconSize} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        {/* Show dropdown for hidden breadcrumbs on mobile/tablet */}
        {hiddenBreadcrumbs.length > 0 && screenSize !== "lg" && (
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-0.5 text-gray-400 hover:text-gray-600 px-1 flex-shrink-0"
              title="More breadcrumbs"
            >
              <MoreHorizontal size={iconSize} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max">
                {hiddenBreadcrumbs.map((crumb) => (
                  <Link
                    key={crumb.path}
                    to={crumb.path}
                    className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 whitespace-nowrap"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {crumb.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Show visible breadcrumbs */}
        {visibleBreadcrumbs.map((crumb, idx) => {
          const isLast =
            idx === visibleBreadcrumbs.length - 1 && !currentSubTab;
          const isNavigable = navigablePaths.has(crumb.path);
          return (
            <div
              key={crumb.path}
              className="flex items-center gap-1 sm:gap-2 min-w-0"
            >
              <ChevronRight
                size={iconSize}
                className="text-gray-300 flex-shrink-0"
              />
              {isLast || !isNavigable ? (
                <span className="font-medium text-gray-900 truncate">
                  {renderBreadcrumbName(crumb.name)}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-gray-700 truncate"
                >
                  {renderBreadcrumbName(crumb.name)}
                </Link>
              )}
            </div>
          );
        })}

        {/* Current subtab */}
        {currentSubTab && (
          <div
            className={`flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink rounded-md px-2 py-1 transition-all ${
              isHighlighting ? "animate-highlight-pulse" : ""
            }`}
          >
            <ChevronRight
              size={iconSize}
              className="text-gray-300 flex-shrink-0"
            />
            <span
              className={`font-medium text-gray-900 truncate text-xs sm:text-sm ${subTabMaxWidth}`}
            >
              {currentSubTab}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
