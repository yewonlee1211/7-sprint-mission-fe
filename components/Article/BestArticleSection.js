import DefaultImg from "@/public/default.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BestArticleSection.module.css";
import Hearts from "../Hearts";
import { useRouter } from "next/router";
import dateFormat from "@/utils/dateFormat";
import { getBestArticles } from "@/api/articleApi";

function BestArticle({ article }) {
  const router = useRouter();

  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <div
      className={styles.item}
      onClick={() => {
        router.push(`/article/${article.id}`);
      }}
    >
      <div className={styles.bestMark}>
        <Image
          src={"/ic_medal.svg"}
          className={styles.medal}
          alt="메달"
          width={16}
          height={16}
        />
        Best
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>{article.title}</div>
        <Image src={DefaultImg} className={styles.articleImg} alt="이미지" />
      </div>
      <div className={styles.info}>
        <p className={styles.userName}>{article.nickname}</p>
        <Hearts
          heartId={article.heartId}
          articleId={article.id}
          heartCount={article.heart_count}
          isHearted={article.isHearted}
          size="small"
        />
        <p className={styles.date}>{dateFormat(article.updatedAt)}</p>
      </div>
    </div>
  );
}

export default function BestArticleSection() {
  const [bestArticles, setBestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBestArticles(setIsLoading, setBestArticles);
  }, []);

  let count = 1;

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  return (
    <div className={styles.bestArticleSection}>
      <div className={styles.title}>베스트 게시글</div>
      <div className={styles.list}>
        {bestArticles.map((bestArticle) => {
          const key = "a" + count;
          count += 1;
          return <BestArticle key={key} article={bestArticle} />;
        })}
      </div>
    </div>
  );
}
