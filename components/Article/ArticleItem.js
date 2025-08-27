import Image from "next/image";
import styles from "./ArticleItem.module.css";
import Hearts from "../Hearts";
import { useRouter } from "next/router";
import dateFormat from "@/utils/dateFormat";

export default function ArticleItem({ article }) {
  const router = useRouter();
  const updatedAt = dateFormat(article.updatedAt);

  return (
    <div
      className={styles.article}
      onClick={() => {
        router.push(`/article/${article.id}`);
      }}
    >
      <div className={styles.content}>
        <div className={styles.title}>{article.title}</div>
        <Image src={"/default.png"} alt="이미지" width={48} height={48} />
      </div>
      <div className={styles.info}>
        <div className={styles.user}>
          <Image
            src={"/user-default-img.svg"}
            className={styles.userImg}
            alt="이미지"
            width={24}
            height={24}
          />
          <div className={styles.nickname}>{article.nickname}</div>
          <div className={styles.updatedAt}>{updatedAt}</div>
        </div>
        <Hearts
          heartId={article.heartId}
          articleId={article.id}
          heartCount={article.heart_count}
          isHearted={article.isHearted}
          size="middle"
        />
      </div>
    </div>
  );
}
