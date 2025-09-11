import apiClient from "../axios";

export async function postSignup(
  email: string,
  nickname: string,
  password: string
) {
  try {
    const res = await apiClient.post("/auth/signup", {
      email,
      nickname,
      password,
    });
    return res;
  } catch (e) {
    throw e;
  }
}
