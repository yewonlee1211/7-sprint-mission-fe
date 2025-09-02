import axios from "axios";
import testType from "../utils/validType";

// 쿠키는 withCredentials: true로 자동 전송되므로 별도 헤더 설정 불필요
const authHeaders = () => {
  return {};
};

export async function getComments(type, id, setDataFn, loadingFn) {
  testType(type);

  const comment = type === "article" ? "articleComment" : "productComment";

  loadingFn(true);
  try {
    const res = await axios.get(`/api/${comment}/${id}`, {
      headers: authHeaders(),
      withCredentials: true,
    });
    setDataFn(res.data);
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}

// 상품인지 자유게시물인지 타입, 이 코멘트가 달릴 원본 글의 아이디, 작성한 이용자의 아이디, 실제로 달릴 코멘트
export async function postComments(type, id, userId, content) {
  testType(type);
  const comment = type === "article" ? "articleComment" : "productComment";

  try {
    const res = await axios.post(
      `/api/${comment}/${id}`,
      {
        userId,
        content,
      },
      {
        withCredentials: true,
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function patchComments(type, id, commentId, value) {
  testType(type);
  const comment = type === "article" ? "articleComment" : "productComment";
  try {
    const res = await axios.patch(
      `/api/${comment}/${id}`,
      {
        data: { content: value },
        id: commentId,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteComments(type, id, commentId) {
  testType(type);
  const comment = type === "article" ? "articleComment" : "productComment";
  try {
    const res = await axios.patch(
      `/api/${comment}/${id}`,
      {
        data: { deleted: true },
        id: commentId,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
