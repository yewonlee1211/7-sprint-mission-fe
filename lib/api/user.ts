import { AxiosError } from "axios";
import apiClient from "../axios";

//회원가입
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

// 로그인
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

// 내정보가져오기
export async function getMyData() {
  try {
    const res = await apiClient.get("/auth");
    return res;
  } catch (e: any) {
    throw e;
  }
}

// 로그아웃
export async function postLogout() {
  try {
    const res = await apiClient.post("/auth/logout");
    return res;
  } catch (e) {
    throw e;
  }
}
