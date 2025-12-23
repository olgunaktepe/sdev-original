'use client';

import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
const authSessionKey = '_MINTON_AUTH_KEY_';
export function AuthProvider({
  children
}) {
  const router = useRouter();
  const getSession = () => {
    const fetchedCookie = getCookie(authSessionKey)?.toString();
    if (!fetchedCookie) return;else return JSON.parse(fetchedCookie);
  };
  const [user, setUser] = useState(getSession());
  const saveSession = user => {
    setCookie(authSessionKey, JSON.stringify(user));
    setUser(user);
  };
  const removeSession = () => {
    deleteCookie(authSessionKey);
    setUser(undefined);
    router.push('/auth/login');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!hasCookie(authSessionKey),
    saveSession,
    removeSession
  }}>
            {children}
        </AuthContext.Provider>;
}