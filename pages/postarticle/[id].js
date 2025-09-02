import CustomButtonSquare from "@/components/CustomButtonSquare";
import { useUser } from "@/lib/UserContext";
import styles from "@/styles/postArticle.module.css";
import validInput from "@/utils/checkValidInput";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// post인지, patch인지 구분을 할 수 있어야 하는데..?

export default function PatchArticle() {
  const initData = JSON.parse(window.sessionStorage.getItem("article"));

  const { userId } = useUser();

  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState(initData.title);
  const [content, setContent] = useState(initData.content);
  const [validPost, setValidPost] = useState(false);

  async function patchNewArticle() {
    try {
      const res = await axios.patch(
        `/api/article/${id}`,
        {
          data: {
            title,
            content,
            userId,
          },
        },
        { withCredentials: true }
      );
      router.push(`/article/${res.data.id}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (validInput(title) && validInput(content)) {
      setValidPost(true);
    } else {
      setValidPost(false);
    }
  }, [title, content]);

  return (
    <div className={styles.postArticle}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>게시글 쓰기</div>
          <CustomButtonSquare
            text="등록"
            onClick={patchNewArticle}
            valid={validPost}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>*제목</div>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className={styles.box}>
          <div className={styles.text}>*내용</div>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="내용을 입력해 주세요"
          />
        </div>
      </div>
    </div>
  );
}
