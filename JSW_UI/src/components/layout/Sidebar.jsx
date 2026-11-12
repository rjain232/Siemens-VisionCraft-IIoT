import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ChevronLeft, LogOut, Star } from "lucide-react";
import { groupTitles, navItems } from "../../config/appConfig";
import { useAuth } from "../../context/AuthContext";
function NavItem({ item, isOpen, isFavorite, onToggleFavorite }) {
  const location = useLocation();
  const isActive =
    item.to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.to);

  const groupLabel = groupTitles[item.group] || item.group;

  const navLinkContent = (
    <>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
          isActive
            ? "text-sky-700"
            : `text-gray-600 ${
                isOpen
                  ? "group-hover:text-gray-800"
                  : "group-hover:text-sky-600 group-hover:scale-120"
              }`
        }`}
      >
        <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
      </div>

      {isOpen && (
        <span className={`flex-1 truncate ${isActive ? "font-semibold" : ""}`}>
          {item.label}
        </span>
      )}

      {isOpen && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(item.to);
          }}
          className="ml-auto rounded-lg p-1.5 text-gray-400 opacity-0 transition-all duration-200 hover:bg-white/50 hover:text-sky-500 group-hover:opacity-100"
        >
          <Star
            size={16}
            strokeWidth={isFavorite ? 0 : 2}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite ? "text-sky-500" : ""}
          />
        </button>
      )}
    </>
  );

  return (
    <li>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>
          <NavLink
            to={item.to}
            end={item.to === "/"}
            className={`group relative flex items-center rounded-lg transition-all duration-200 ${
              isOpen ? "gap-2 px-2.5 py-1" : "justify-center px-1 py-1.5"
            } text-xs font-medium ${
              isActive
                ? "bg-sky-100/80 text-sky-600 shadow-[0_2px_12px_-2px_rgba(56,189,248,0.2)] ring-1 ring-sky-400/50 backdrop-blur-sm"
                : `text-gray-700 ${
                    isOpen
                      ? "hover:bg-white/40 hover:text-gray-800 hover:backdrop-blur-sm"
                      : "hover:bg-gray-100/60 hover:text-sky-600 hover:scale-110 hover:shadow-lg"
                  }`
            }`}
          >
            {navLinkContent}
          </NavLink>
        </Tooltip.Trigger>
        {!isOpen && (
          <Tooltip.Content
            side="right"
            className="rounded-lg bg-gray-900 px-3 py-2 text-white shadow-xl z-50"
          >
            <div className="mb-0.5 whitespace-nowrap text-[10px] font-medium text-gray-400">
              {groupLabel}
            </div>
            <div className="whitespace-nowrap text-xs font-medium">
              {item.label}
            </div>
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        )}
      </Tooltip.Root>
    </li>
  );
}

export default function Sidebar({ isOpen, onToggle }) {
  const { allowedPages, isSuperAdmin, logout, user } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("sidebarFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const scrollTimeoutRef = useRef(null);

  const handleScroll = (e) => {
    if (scrollTimeoutRef.current) return;

    const nav = e.target;
    setIsScrolled(nav.scrollTop > 5);
    setShowScrollBottom(
      nav.scrollHeight - nav.scrollTop - nav.clientHeight > 10,
    );

    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const toggleFavorite = (itemPath) => {
    setFavorites((prev) =>
      prev.includes(itemPath)
        ? prev.filter((p) => p !== itemPath)
        : [...prev, itemPath],
    );
  };

  const allowedKeys = new Set(allowedPages.map((page) => page.key));
  const visibleNavItems = navItems.filter((item) => {
    if (item.superAdminOnly) return isSuperAdmin;
    if (item.publicAfterLogin) return true;
    return allowedKeys.has(item.key);
  });

  const favoriteItems = visibleNavItems.filter((item) =>
    favorites.includes(item.to),
  );
  const nonFavoriteItems = visibleNavItems.filter(
    (item) => !favorites.includes(item.to),
  );
  const initials = String(user?.name || user?.email || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Tooltip.Provider>
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onToggle}
          />
        )}

        <aside
          className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col overflow-hidden border-r border-gray-200 bg-white shadow-[4px_0_30px_-4px_rgba(0,0,0,0.07)] backdrop-blur-2xl transition-all duration-300 lg:overflow-visible ${
            isOpen
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full lg:translate-x-0 lg:w-[72px]"
          }`}
        >
          <button
            onClick={onToggle}
            className="absolute -right-3 top-6 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-white/70 text-gray-400 shadow-md backdrop-blur-sm hover:bg-white hover:text-gray-600 lg:flex"
          >
            <ChevronLeft
              size={14}
              className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <nav
            className="sidebar-nav relative flex-1 overflow-x-hidden overflow-y-auto px-1.5 py-2 scroll-smooth lg:px-2"
            style={{
              scrollBehavior: "smooth",
              scrollSnapType: "y mandatory",
            }}
            onScroll={handleScroll}
          >
            {isScrolled && (
              <div className="pointer-events-none sticky top-0 z-10 h-3 bg-gradient-to-b from-gray-200/40 to-transparent" />
            )}

            {favoriteItems.length > 0 && (
              <div
                className="mb-2 scroll-snap-align-start"
                style={{ scrollSnapAlign: "start" }}
              >
                {isOpen && (
                  <p className="sticky top-0 mb-5 rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-600 backdrop-blur-sm z-20">
                    Favorites
                  </p>
                )}
                <ul className="space-y-0.5">
                  {favoriteItems.map((item) => (
                    <NavItem
                      key={item.to}
                      item={item}
                      isOpen={isOpen}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </ul>
                <div className="my-1.5 border-t border-gray-200" />
              </div>
            )}

            {(() => {
              const groups = {};
              nonFavoriteItems.forEach((item) => {
                if (!groups[item.group]) groups[item.group] = [];
                groups[item.group].push(item);
              });

              const groupEntries = Object.entries(groups);

              return groupEntries.map(([groupKey, items], index) => (
                <div key={groupKey} style={{ scrollSnapAlign: "start" }}>
                  <div className={isOpen ? "mb-2" : "mb-1"}>
                    {isOpen && (
                      <p className="sticky top-0 mb-2.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 backdrop-blur-sm z-20">
                        {groupTitles[groupKey]}
                      </p>
                    )}
                    <ul className="space-y-0.5">
                      {items.map((item) => (
                        <NavItem
                          key={item.to}
                          item={item}
                          isOpen={isOpen}
                          isFavorite={false}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </ul>
                  </div>

                  {index < groupEntries.length - 1 && (
                    <div
                      className={`${
                        isOpen
                          ? "my-1.5 border-t border-gray-200"
                          : "my-0.5 border-t border-gray-300/30"
                      }`}
                    />
                  )}
                </div>
              ));
            })()}

            {showScrollBottom && (
              <div className="pointer-events-none sticky bottom-0 z-10 h-3 bg-gradient-to-t from-gray-200/40 to-transparent" />
            )}
          </nav>

          <div className="border-t border-white/40 px-1.5 py-1.5 lg:px-2">
            <div
              className={`flex items-center rounded-lg bg-white/40 shadow-sm ring-1 ring-white/50 backdrop-blur-sm ${
                isOpen ? "gap-2 p-1.5" : "justify-center p-1"
              }`}
            >
              <div className="relative shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-xs font-bold text-white shadow-md shadow-sky-400/25">
                  {initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              </div>
              {isOpen && (
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-xs font-semibold text-gray-700">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-[10px] text-gray-500">
                    {user?.role || "user"}
                  </p>
                </div>
              )}
              {isOpen && (
                <button
                  onClick={logout}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/60 hover:text-sky-500"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              )}
            </div>
          </div>
        </aside>
      </>
    </Tooltip.Provider>
  );
}
