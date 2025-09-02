import apiClient from "@/lib/axios";

export async function loginPost(email, password) {
  const res = await apiClient.post(
    "http://localhost:5000/auth",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return res;
}

export async function getUser() {
  const res = await apiClient.get("/auth");
  return res.data;
}
