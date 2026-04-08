'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  _id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ _id: decoded._id, username: decoded.username || '', role: decoded.role });
        axios.defaults.headers.common['Authorization'] = token;
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await axios.post('http://localhost:5000/login', { identifier, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
    const decoded: any = jwtDecode(token);
    setUser({ _id: decoded._id, username: decoded.username || '', role: decoded.role });
  };

  const register = async (username: string, password: string, email: string) => {
    await axios.post('http://localhost:5000/register', { username, password, email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};