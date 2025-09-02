import apiClient from "@/lib/axios";
import axios from "axios";

export async function getProductById(id, loadingFn, setFn, ownFn) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  loadingFn(true);
  try {
    const res = await apiClient.get(`/product/${id}`);
    setFn(res.data);
    ownFn(user.id === res.data.user.id);
    console.log(res.data);
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}

// 서버 사이드에서 사용할 함수 (토큰을 매개변수로 받음)
export async function getProductByIdServer(id, req) {
  try {
    const headers = {
      "Content-Type": "application/json",
      // SSR에서는 브라우저 쿠키가 자동 포함되지 않으므로 수동 전달
      ...(req?.headers?.cookie ? { Cookie: req.headers.cookie } : {}),
    };
    const response = await apiClient.get(`/product/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// 클라이언트 사이드에서 사용할 함수 (쿠키는 withCredentials로 자동 전송)
export async function getProductByIdClient(id) {
  try {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function postProduct() {
  const res = await apiClient.post("/product", {
    data: {
      title,
      content,
      userId,
    },
  });

  return res;
}

export async function deleteProductById(id) {
  await apiClient.patch(`/product/${id}`, {
    data: { deleted: true },
  });
}
