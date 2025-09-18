import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "./config";
import { postLogout } from "./api/user";

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

// _retry 플래그를 위한 타입 확장
interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 응답 인터셉터: 401 발생 시 토큰 갱신 시도 후 재시도
apiClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest = (error.config || {}) as RetryAxiosRequestConfig;
    const status = error.response?.status;
    console.log("인터셉터 내부");
    console.error(error);

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 백엔드의 리프레시 엔드포인트 호출 (쿠키 기반), 토큰 갱신 후 원 요청 재시도
        await apiClient.post("/auth/refresh/token", {
          _retry: true,
        } as RetryAxiosRequestConfig);
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
