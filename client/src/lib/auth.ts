import type { AuthResponse, User } from '@/types';

const AUTH_STORAGE_KEY = 'allie-auth';

export type StoredAuth = {
  token: string;
  user: User;
};

function isBrowser() {
  return typeof window !== 'undefined';
}

export function saveAuth(auth: AuthResponse) {
  if (!isBrowser()) {
    return;
  }

  const storedAuth: StoredAuth = {
    token: auth.token,
    user: {
      _id: auth._id,
      name: auth.name,
      email: auth.email,
      phoneNumber: auth.phoneNumber,
      dateOfBirth: auth.dateOfBirth,
      role: auth.role,
      isAdmin: auth.isAdmin
    }
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedAuth));
}

export function getStoredAuth(): StoredAuth | null {
  if (!isBrowser()) {
    return null;
  }

  const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth) as StoredAuth;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function clearAuth() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}