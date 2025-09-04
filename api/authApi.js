import apiClient from "@/lib/axios";

export async function loginPost(email, password) {
  const res = await apiClient.post("/auth", {
    email,
    password,
  });
  return res;
}

export async function getUser() {
  try {
    const res = await apiClient.get("/auth");
    return res.data;
  } catch (e) {
    if (e.response?.status === 401) {
      await getRefreshToken();
    }
  }
}

async function getRefreshToken() {
  try {
    await apiClient.get("/auth/refresh/token");
    return;
  } catch (e) {
    if (e.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const publicPages = ["/login", "/signup"];
        if (!publicPages.includes(currentPath)) {
          window.location.href = "/login";
        }
      }
    }
  }
}
