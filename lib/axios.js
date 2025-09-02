import axios from "axios";
import { API_CONFIG } from "./config";

// 기본 axios 인스턴스 생성
const apiClient = axios.create({
  // 동일 출처 프록시 경유
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (쿠키는 자동으로 전송되므로 별도 처리 불필요)
apiClient.interceptors.request.use(
  (config) => {
    // 쿠키는 withCredentials: true로 자동 전송됨
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트 (단, 이미 로그인/회원가입 페이지에서는 제외)
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const publicPages = ["/login", "/signup"];
        if (!publicPages.includes(currentPath)) {
          window.location.href = "/login";
        }
      }
      return;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
