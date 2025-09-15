import { AxiosError } from "axios";
import apiClient from "../axios";

export async function getProducts() {
  try {
    const res = await apiClient.get("/product");
    return res;
  } catch (e: unknown) {
    // AxiosError인지 확인
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
