// proforcetech/shoppro/shoppro-06bf0ed64f7d8a05ba37c69644472fc852ae8c80/frontend/src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User, DecodedToken } from '../types';
import apiClient from '../api/client';
import authService from '../features/auth/auth.service';

type AuthContextType = {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.clear();
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await authService.login(credentials);
      const decoded: DecodedToken = jwtDecode(response.access_token);
      const user: User = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.access_token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
    } catch (error) {
      console.error('Auth context login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};