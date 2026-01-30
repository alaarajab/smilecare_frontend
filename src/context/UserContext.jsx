import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as backendApi from "../utils/api";
import { getToken, setToken, removeToken } from "../utils/token";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedTips, setSavedTips] = useState([]);
  const [loading, setLoading] = useState(true); // auth bootstrapping
  const [authError, setAuthError] = useState(""); // login errors, etc.

  // -------- Helpers --------
  const clearSession = () => {
    removeToken();
    setUser(null);
    setSavedTips([]);
  };

  const syncFromUser = (u) => {
    setUser(u || null);
    setSavedTips(Array.isArray(u?.savedTips) ? u.savedTips : []);
  };

  // -------- Bootstrapping: load current user if token exists --------
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    backendApi
      .getMe(token)
      .then((me) => {
        syncFromUser(me);
      })
      .catch(() => {
        clearSession();
      })
      .finally(() => setLoading(false));
  }, []);

  // -------- Auth: Login --------
  const login = async ({ email, password }) => {
    setAuthError("");

    try {
      // this should hit POST /api/login
      const data = await backendApi.login({ email, password });

      // Some backends return: { token, user }
      if (data?.token) setToken(data.token);

      if (data?.user) {
        syncFromUser(data.user);
        return data;
      }

      // If backend returns only { token }, fetch user
      const token = getToken();
      if (!token) throw new Error("Login succeeded but token was missing.");

      const me = await backendApi.getMe(token);
      syncFromUser(me);

      return { token, user: me };
    } catch (err) {
      // show meaningful message in UI
      const message =
        typeof err === "string" ? err : err?.message || "Bad Request";
      setAuthError(message);

      // important: don't keep a bad token around
      clearSession();

      // rethrow so the component can show it too
      throw message;
    }
  };

  // -------- Auth: Logout --------
  const logout = () => {
    setAuthError("");
    clearSession();
  };
  const register = async ({ name, email, password }) => {
    setAuthError("");

    try {
      // 1) create account
      await backendApi.register({ name, email, password });

      // 2) auto-login
      const data = await backendApi.login({ email, password });

      if (data?.token) setToken(data.token);

      if (data?.user) {
        syncFromUser(data.user);
        return data;
      }

      // fallback: fetch user
      const token = getToken();
      const me = await backendApi.getMe(token);
      syncFromUser(me);

      return { token, user: me };
    } catch (err) {
      const message =
        typeof err === "string" ? err : err?.message || "Bad Request";
      setAuthError(message);
      clearSession();
      throw message;
    }
  };

  // -------- Saved tips: Toggle --------
  const toggleSavedItem = async (tipId) => {
    const token = getToken();
    if (!token) {
      setAuthError("Please log in to save tips.");
      return;
    }

    try {
      const result = await backendApi.toggleSavedTip(tipId, token);
      console.log("TOGGLE RESULT:", result);

      // Preferred response: { savedTips: [...] }
      if (Array.isArray(result?.savedTips)) {
        setSavedTips(result.savedTips);
        return;
      }

      // Alternate response: { user: { savedTips: [...] } }
      if (result?.user) {
        syncFromUser(result.user);
        return;
      }

      // Fallback: if backend returns updated user directly
      if (result && Array.isArray(result?.savedTips)) {
        setSavedTips(result.savedTips);
      }
    } catch (err) {
      const message =
        typeof err === "string" ? err : err?.message || "Request failed";
      setAuthError(message);

      // If unauthorized, clear session
      if (
        String(message).toLowerCase().includes("unauthorized") ||
        String(message).includes("401")
      ) {
        clearSession();
      }

      throw message;
    }
  };
  const removeSavedItem = async (tipId) => {
    const token = getToken();
    if (!token) return;

    try {
      const result = await backendApi.toggleSavedTip(tipId, token);
      // toggle removes it if already saved

      if (Array.isArray(result?.savedTips)) {
        setSavedTips(result.savedTips);
      }
    } catch (err) {
      console.error("REMOVE SAVE FAILED:", err);
    }
  };

  const isItemSaved = (tipId) => savedTips.includes(tipId);

  const value = useMemo(
    () => ({
      user,
      savedTips,
      loading,
      authError,
      login,
      logout,
      register,
      toggleSavedItem,
      removeSavedItem,
      isItemSaved,
      setAuthError, // optional: allow UI to clear errors
    }),
    [user, savedTips, loading, authError],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
