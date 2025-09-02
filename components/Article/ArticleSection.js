import CustomButtonSquare from "../CustomButtonSquare";
import InputBox from "../InputBox";
import SortOption from "../SortOption";
import ArticleItem from "./ArticleItem";
import styles from "./ArticleSection.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ArticleSection() {
  const [keyword, setKeyword] = useState("");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getArticles(keyword, setIsLoading, setArticles);
  }, [keyword]);

  let count = 1;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>게시글</div>
        <CustomButtonSquare
          text="글쓰기"
          onClick={() => {
            router.push(`/postArticle?mode=post`);
          }}
          valid={true}
        />
      </div>
      <div className={styles.option}>
        <InputBox
          keyword={keyword}
          onChange={setKeyword}
          placeholder={"검색할 상품을 입력해주세요"}
        />
        <SortOption />
      </div>
      {!isLoading && (
        <div className={styles.articleList}>
          {articles.map((article) => {
            const key = "a" + count;
            count += 1;
            return <ArticleItem key={key} article={article} />;
          })}
        </div>
      )}
    </div>
  );
}
