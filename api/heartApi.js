import { useUser } from "@/lib/UserContext";
import axios from "axios";

export async function deleteHeart(category, id, loadingFn) {
  loadingFn(true);
  try {
    const res = await axios.delete(`/api/${category}/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}

export async function createHeart(
  category,
  userId,
  productId,
  articleId,
  loadingFn
) {
  loadingFn(true);
  try {
    const res = await axios.post(
      `/api/${category}`,
      {
        data: {
          userId,
          ...(productId ? { productId } : {}),
          ...(articleId ? { articleId } : {}),
        },
      },
      {
        withCredentials: true,
      }
    );
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}
