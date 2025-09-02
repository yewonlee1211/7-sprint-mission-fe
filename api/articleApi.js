import axios from "axios";

export async function getArticles(keyword, loadingFn, setFn) {
  loadingFn(true);
  try {
    const res = await axios.get("/api/article", {
      params: { keyword, limit: 4 },
      withCredentials: true,
    });
    setFn(res.data);
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}

export async function getBestArticles(loadingFn, setFn) {
  loadingFn(true);
  try {
    const res = await axios.get("/api/article", {
      params: { limit: 3, orderBy: "hearts" },
      withCredentials: true,
    });
    console.log(res.data);
    setFn(res.data);
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}
