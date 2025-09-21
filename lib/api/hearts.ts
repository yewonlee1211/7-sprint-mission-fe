import apiClient from "../axios";

export async function deleteHeart(category: string, id: string) {
  try {
    const res = await apiClient.delete(`/${category}/${id}`);
  } catch (e) {
    console.error(e);
  } finally {
  }
}

export async function createHeart(
  category: string,
  productId?: string,
  articleId?: string
) {
  try {
    const res = await apiClient.post(`/${category}`, {
      ...(productId && { productId }),
      ...(articleId && { articleId }),
    });
  } catch (e) {
    console.error(e);
  }
}

export async function getHeart(category: string, id?: string) {
  try {
    const res = await apiClient.get(`/${category}/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
