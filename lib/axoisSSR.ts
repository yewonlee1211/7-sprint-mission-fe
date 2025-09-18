import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "./config";
import { postLogout } from "./api/user";
import { cookies } from "next/headers";

// 기본 axios 인스턴스 생성
const SSRClient = axios.create({
  // 동일 출처 프록시 경유
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터: 서버 사이드에서는 리프레쉬 토큰 요청할 이유가 없음
SSRClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    console.log("SSR 인터셉터 내부 - 상태:", status);
    console.error("SSR 에러:", error);

    return Promise.reject(error);
  }
);

export default SSRClient;
