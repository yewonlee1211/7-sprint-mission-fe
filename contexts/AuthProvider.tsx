"use client";

import { getMyData, postLogin, postLogout } from "@/lib/api/user";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  email: string;
  nickname: string;
  img: string;
}

interface AuthContextType {
  user: User | null;
  getMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  getMe: async () => {},
  login: async () => {},
  logout: () => {},
  updateMe: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const currentPath = usePathname();
  const router = useRouter();

  async function getMe() {
    try {
      const res = await getMyData();
      const nextUser = res.data.user;
      setUser(nextUser);
    } catch (e) {
      return;
    }
  }

  async function login(email: string, password: string) {
    await postLogin(email, password);
    await getMe();
  }

  async function logout() {
    await postLogout();
    setUser(null);
    router.push("/");
  }

  async function updateMe() {
    return;
  }

  useEffect(() => {
    getMe();
  }, [currentPath, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe, getMe }}>
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
