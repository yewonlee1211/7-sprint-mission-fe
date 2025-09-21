import SSRClient from "../axoisSSR";
import { cookies } from "next/headers";
// 서버사이드용 함수 (쿠키 포함)
export async function getProductByIdSSR(id: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await SSRClient.get(`/product/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data;
  } catch (error) {
    console.error("SSR 상품 요청 실패:", error);

    throw error;
  }
}

// best 상품 호출
export async function getBestProductsByIdSSR() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await SSRClient.get(`/product`, {
      params: {
        order: "좋아요순",
        limit: 4,
      },
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error("SSR 상품 요청 실패:", error);

    throw error;
  }
}
