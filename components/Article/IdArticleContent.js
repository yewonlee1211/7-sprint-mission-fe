import Image from "next/image";
import styles from "./IdArticleContent.module.css";
import Hearts from "../Hearts";
import DropOption from "../DropOption";
import dateFormat from "@/utils/dateFormat";
import axios from "axios";

export default function IdArticleContent({ data, router }) {
  const handleDeleteArticle = async () => {
    const res = await axios.patch(`http://localhost:5000/article/${data.id}`, {
      data: { deleted: true },
    });
    router.push("/article");
    return res.data;
  };

  const handlePatchArticle = async () => {
    window.sessionStorage.setItem("article", JSON.stringify(data));
    router.push(`/postarticle/${data.id}`);
  };

  return (
    <div className={styles.articleContent}>
      <div className={styles.header}>
        <div className={styles.titleHeader}>
          <div className={styles.title}>{data.title}</div>
          <DropOption
            onDelete={handleDeleteArticle}
            onPatch={handlePatchArticle}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.user}>
            <Image
              className={styles.userImg}
              src={"/user-default-img.svg"}
              width={40}
              height={40}
              alt="유저 이미지"
            />
            <div className={styles.nickname}>{data.user.nickname}</div>
            <div className={styles.date}>{dateFormat(data.updatedAt)}</div>
          </div>
          <div className={styles.line}></div>
          <Hearts
            heartId={data.AHeart.id}
            articleId={data.id}
            heartCount={data._count.AHeart}
            size="big"
          />
        </div>
        <div className={styles.longLine}></div>
      </div>
      <div className={styles.textContent}>{data.content}</div>
    </div>
  );
}
