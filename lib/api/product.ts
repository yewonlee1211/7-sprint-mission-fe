import apiClient from "../axios";

export async function getProducts(params: {
  keyword: string;
  order: string;
  page: number;
}) {
  try {
    const res = await apiClient.get("/product", { params });
    return res;
  } catch (e: unknown) {
    // AxiosError인지 확인
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function postProduct(data: {
  name: string;
  price: string;
  description: string;
}) {
  const res = await apiClient.post("/product", { data });

  return res;
}
