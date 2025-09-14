// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicPaths = ["/", "/login", "/signup"];
  const token = request.cookies.get("refreshToken")?.value;

  // 공개 페이지인 경우. 토큰 있으면 -> items 페이지로
  if (publicPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/items", request.url));
    }
  } else {
    // 공개 페이지가 아닌 경우. 토큰 없으면 -> 랜딩 페이지로
    if (!token) {
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
