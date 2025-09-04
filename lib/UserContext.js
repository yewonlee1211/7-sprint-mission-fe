import { createContext, useContext, useEffect, useState } from "react";
import { getUser, loginPost } from "@/api/authApi";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  async function getMe() {
    setIsPending(true);
    try {
      const data = await getUser();
      setUser(data.user);
      const currentPath = window.location.pathname;
      const publicPages = ["/login", "/signup"];
      if (publicPages.includes(currentPath)) {
        window.location.href = "/items";
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }

  async function login(email, password) {
    try {
      console.log("됨?");
      const res = await loginPost(email, password);
      setUser(res.data.user);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isPending, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext 안에서 써야 합니다");
  }

  return userContext;
}
