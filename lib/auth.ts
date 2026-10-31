import { STATIC_USERS, STORAGE_KEYS } from "./constants";
import { addRegisteredUser, getRegisteredUsers } from "./storage";
import type { Session, User, UserRole } from "./types";

export function getAllUsers(): User[] {
  return [...STATIC_USERS, ...getRegisteredUsers()];
}

export function findUserByEmail(email: string): User | undefined {
  return getAllUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function validateLogin(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return user;
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}): { ok: true; user: User } | { ok: false; error: string } {
  if (findUserByEmail(data.email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  if (data.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  const user: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role,
  };
  addRegisteredUser(user);
  return { ok: true, user };
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(user: User): Session {
  const session: Session = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return session;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.session);
}

export function userToSession(user: User): Session {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}
