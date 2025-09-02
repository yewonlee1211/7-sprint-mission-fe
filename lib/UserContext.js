import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/api/authApi";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMe() {
    try {
      const data = await getUser();
      setUser(data.user);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext 안에서 써야 합니다");
  }

  return userContext;
}
