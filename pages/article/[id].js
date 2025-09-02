import IdArticleContent from "@/components/Article/IdArticleContent";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/articleId.module.css";
import CommentSection from "@/components/Comment/CommentSection";

export default function ArticleId() {
  // isLoading: 데이터 fetch가 완료되어야 화면이 렌더링 되게 하기 위한 상태관리
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    async function getArticleById(id) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/article/${id}`, {
          withCredentials: true,
        });
        setArticle(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    getArticleById(id);
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.articleId}>
      <div className={styles.articleIdBox}>
        <div className={styles.content}>
          <IdArticleContent data={article} router={router} />
          <CommentSection type={"article"} id={article.id} />
        </div>
        <CustomButtonSquare
          text="목록으로 돌아가기"
          onClick={() => {
            router.push("/article");
          }}
          valid={true}
        />
      </div>
    </div>
  );
}
