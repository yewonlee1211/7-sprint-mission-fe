// API 설정
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  TIMEOUT: 10000, // 10초
};

// 환경 설정
export const ENV_CONFIG = {
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
};
