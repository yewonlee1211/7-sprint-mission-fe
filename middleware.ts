// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicPaths = ["/", "/login", "/signup"];

  // accessToken과 refreshToken 모두 체크
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasValidToken = accessToken || refreshToken;

  // 공개 페이지인 경우
  if (publicPaths.includes(pathname)) {
    // 토큰이 있으면 items 페이지로 리다이렉트
    if (hasValidToken) {
      return NextResponse.redirect(new URL("/items", request.url));
    }
  } else {
    // 보호된 페이지인 경우
    if (!hasValidToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    // 페이지 경로만 포함, 정적 파일들 제외
    "/((?!api|_next/static|_next/image|favicon.ico|icon|img|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
