import { useState, useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import appConfig, { navItems, routeToPageKey } from "../../config/appConfig";
import { useAuth } from "../../context/AuthContext";
import SplashScreen from "../splash/SplashScreen";

const MIN_SPLASH_MS = 2000;

export default function ProtectedRoute({
  requireAdmin = false,
  requireSuperAdmin = false,
}) {
  const location = useLocation();
  const { allowedPages, isAdmin, isAuthenticated, isSuperAdmin, loadingPages } =
    useAuth();

  const [showSplash, setShowSplash] = useState(loadingPages);
  const splashStartRef = useRef(Date.now());

  useEffect(() => {
    if (!loadingPages && showSplash) {
      const elapsed = Date.now() - splashStartRef.current;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      const t = setTimeout(() => setShowSplash(false), remaining);
      return () => clearTimeout(t);
    }
  }, [loadingPages, showSplash]);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={appConfig.routes.login}
        replace
        state={{ from: location }}
      />
    );
  }

  if (loadingPages || showSplash) {
    return <SplashScreen visible={!loadingPages ? showSplash : true} />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to={appConfig.routes.dashboard} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to={appConfig.routes.dashboard} replace />;
  }

  const pageKey = routeToPageKey[location.pathname];
  const allowedKeys = new Set(allowedPages.map((page) => page.key));
  const firstAllowedPath =
    navItems.find((item) => allowedKeys.has(item.key) && !item.superAdminOnly)
      ?.to || appConfig.routes.login;
  const hasPageAccess =
    !pageKey ||
    pageKey === "about" ||
    pageKey === "help" ||
    (pageKey === "user-management" && isSuperAdmin) ||
    allowedKeys.has(pageKey);

  if (!hasPageAccess) {
    return <Navigate to={firstAllowedPath} replace />;
  }

  return <Outlet />;
}
