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

export async function postLogin(email: string, password: string) {
  try {
    const res = await apiClient.post("/auth", {
      email,
      password,
    });
    return res;
  } catch (e) {
    throw e;
  }
}

export async function getMyData() {
  try {
    const res = await apiClient.get("/auth");
    return res;
  } catch (e) {
    throw e;
  }
}
