"use client";

import { getMyData, postLogin } from "@/lib/api/user";
import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
  nickname: string;
  img: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  updateMe: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function getMe() {
    const res = await getMyData();
    const nextUser = res.data.user;
    setUser(nextUser);
  }

  async function login(email: string, password: string) {
    await postLogin(email, password);
    await getMe();
  }

  async function logout() {
    return;
  }

  async function updateMe() {
    return;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
}
