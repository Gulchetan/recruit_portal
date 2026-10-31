"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getSession,
  registerUser as registerUserLib,
  setSession,
  validateLogin,
} from "@/lib/auth";
import { ensureSeeded, flushAppStorage } from "@/lib/storage";
import type { Session, UserRole } from "@/lib/types";

interface AuthContextValue {
  session: Session | null;
  ready: boolean;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => string | null;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setSessionState(getSession());
  }, []);

  useEffect(() => {
    ensureSeeded();
    refresh();
    setReady(true);
  }, [refresh]);

  const login = useCallback(
    (email: string, password: string) => {
      const user = validateLogin(email, password);
      if (!user) return "Invalid email or password.";
      setSession(user);
      setSessionState(getSession());
      return null;
    },
    []
  );

  const logout = useCallback(() => {
    flushAppStorage();
    setSessionState(null);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  const register = useCallback(
    (data: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }) => {
      const result = registerUserLib(data);
      if (!result.ok) return result.error;
      setSession(result.user);
      setSessionState(getSession());
      return null;
    },
    []
  );

  const value = useMemo(
    () => ({ session, ready, login, logout, register, refresh }),
    [session, ready, login, logout, register, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
