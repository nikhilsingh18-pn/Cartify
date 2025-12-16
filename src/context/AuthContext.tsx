import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api, setToken, getToken } from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: User['role']) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cartify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const t = getToken();
    if (t) {
      api.auth.me().then((u) => {
        setUser(u);
        localStorage.setItem('cartify_user', JSON.stringify(u));
      }).catch(() => {});
    }
  }, []);

  const login = async (email: string, password: string) => {
    const tokenRes = await api.auth.login(email, password);
    setToken(tokenRes.access_token);
    const u = await api.auth.me();
    setUser(u);
    localStorage.setItem('cartify_user', JSON.stringify(u));
  };

  const register = async (name: string, email: string, password: string, role: User['role']) => {
    const tokenRes = await api.auth.register(name, email, password, role);
    setToken(tokenRes.access_token);
    const u = await api.auth.me();
    setUser(u);
    localStorage.setItem('cartify_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cartify_user');
    setToken(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('cartify_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
