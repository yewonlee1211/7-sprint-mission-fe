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

export default apiClient;
