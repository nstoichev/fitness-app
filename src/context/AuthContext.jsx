/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register: authService.register,
    login: authService.login,
    signInWithGoogle: authService.signInWithGoogle,
    logout: authService.logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
