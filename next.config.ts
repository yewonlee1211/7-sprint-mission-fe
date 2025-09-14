import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVG 파일을 위한 설정
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 로컬 이미지 파일 허용
    domains: [],
    // 이미지 최적화 설정
    formats: ["image/webp", "image/avif"],
    // 개발 환경에서 이미지 최적화 비활성화
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
