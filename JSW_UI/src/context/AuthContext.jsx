import { createContext, useContext, useEffect, useMemo, useState } from "react";
import appConfig from "../config/appConfig";
import {
  accessApi,
  authApi,
  clearAuth,
  getStoredAuth,
  storeAuth,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth();
  const [user, setUser] = useState(storedAuth.user);
  const [allowedPages, setAllowedPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const isAuthenticated = Boolean(user);
  const role = String(user?.role || "").toLowerCase();
  const isAdmin = appConfig.roleGroups.adminAccess.includes(role);
  const isSuperAdmin = appConfig.roleGroups.superAdminAccess.includes(role);

  useEffect(() => {
    authApi
      .me()
      .then((data) => {
        setUser(data.user);
        storeAuth({ user: data.user });
        return accessApi.myPages();
      })
      .then((data) => {
        setAllowedPages(data.pages || []);
      })
      .catch(() => {
        clearAuth();
        setUser(null);
        setAllowedPages([]);
      })
      .finally(() => {
        setLoadingPages(false);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      setAllowedPages([]);
      setLoadingPages(false);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    const authResult = await authApi.login({ email, password });
    storeAuth(authResult);
    setUser(authResult.user);
    setLoadingPages(true);
    accessApi
      .myPages()
      .then((data) => setAllowedPages(data.pages || []))
      .catch(() => setAllowedPages([]))
      .finally(() => setLoadingPages(false));
    return authResult;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    clearAuth();
    setUser(null);
    setAllowedPages([]);
  };

  const value = useMemo(
    () => ({
      user,
      allowedPages,
      loadingPages,
      isAuthenticated,
      isAdmin,
      isSuperAdmin,
      login,
      logout,
    }),
    [user, allowedPages, loadingPages, isAuthenticated, isAdmin, isSuperAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
};
