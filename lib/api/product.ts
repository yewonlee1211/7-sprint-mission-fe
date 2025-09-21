import apiClient from "../axios";

// lib/api/product.ts

export async function getProducts(params: {
  keyword: string;
  order: string;
  page: number;
}) {
  try {
    console.log("=== getProducts 호출 ===");
    console.log("현재 쿠키:", document.cookie);
    console.log("axios withCredentials:", apiClient.defaults.withCredentials);

    const res = await apiClient.get("/product", { params });
    console.log("API 응답 성공:", res.status);
    return res;
  } catch (e: unknown) {
    console.error("=== getProducts 에러 ===");
    console.error("에러:", e);

    if (e instanceof Error) {
      throw e;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function getProductById(id: string) {
  try {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function postProduct(data: {
  name: string;
  price: string;
  description: string;
  tags?: string[];
}) {
  try {
    const res = await apiClient.post("/product", { data });
    return res;
  } catch (e: unknown) {
    // AxiosError인지 확인
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function patchProduct(
  id: string,
  data: {
    name?: string;
    price?: string;
    description?: string;
    tags?: string[];
    deleted?: boolean;
  }
) {
  try {
    const response = await apiClient.patch(`/product/${id}`, { data });
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await apiClient.delete(`/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
