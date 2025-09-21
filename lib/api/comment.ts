import apiClient from "../axios";

// 상품 댓글 조회
export async function getProductComments(productId: string) {
  try {
    const response = await apiClient.get(`/productComment/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product comments:", error);
    throw error;
  }
}

// 상품 댓글 작성
export async function postProductComment(productId: string, content: string) {
  try {
    const response = await apiClient.post(`/productComment/${productId}`, {
      data: { content },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting product comment:", error);
    throw error;
  }
}

// 상품 댓글 수정
export async function patchProductComment(
  productId: string,
  commentId: string,
  content: string
) {
  try {
    const response = await apiClient.patch(`/productComment/${commentId}`, {
      data: { content },
    });
    return response.data;
  } catch (error) {
    console.error("Error patching product comment:", error);
    throw error;
  }
}

// 상품 댓글 삭제
export async function deleteProductComment(
  productId: string,
  commentId: string
) {
  try {
    const response = await apiClient.delete(`/productComment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product comment:", error);
    throw error;
  }
}

// 아티클 댓글 조회
export async function getArticleComments(articleId: string) {
  try {
    const response = await apiClient.get(`/articleComment/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article comments:", error);
    throw error;
  }
}

// 아티클 댓글 작성
export async function postArticleComment(articleId: string, content: string) {
  try {
    const response = await apiClient.post(`/articleComment/${articleId}`, {
      data: { content },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting article comment:", error);
    throw error;
  }
}

// 아티클 댓글 수정
export async function patchArticleComment(
  articleId: string,
  commentId: string,
  content: string
) {
  try {
    const response = await apiClient.patch(`/articleComment/${commentId}`, {
      data: { content },
    });
    return response.data;
  } catch (error) {
    console.error("Error patching article comment:", error);
    throw error;
  }
}

// 아티클 댓글 삭제
export async function deleteArticleComment(
  articleId: string,
  commentId: string
) {
  try {
    const response = await apiClient.delete(`/articleComment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article comment:", error);
    throw error;
  }
}
