import { useEffect, useState } from "react";
import CustomBtn from "../CustomBtn";
import styles from "./CommentInput.module.css";
import { checkBlank, checkMax } from "@/utils/checkValidInput";
import { postProductComment, postArticleComment } from "@/lib/api/comment";
import { useAuth } from "@/contexts/AuthProvider";

interface CommentInputProps {
  type: "product" | "article";
  id: string;
  onRefetch: () => void;
}

export default function CommentInput({
  type,
  id,
  onRefetch,
}: CommentInputProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { user } = useAuth();

  const header = type === "article" ? "댓글 달기" : "문의하기";
  const placeholder =
    type === "article"
      ? "댓글을 입력해 주세요"
      : "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  const handlePostComment = async () => {
    try {
      if (type === "product") {
        await postProductComment(id, value);
      } else {
        await postArticleComment(id, value);
      }
      setValue("");
      onRefetch();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    if (!checkBlank(value) && checkMax(value, 300)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [value]);

  return (
    <div className={styles.postComment}>
      <div className={styles.header}>{header}</div>
      <textarea
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={styles.btn}>
        <CustomBtn text={`등록`} onClick={handlePostComment} valid={isValid} />
      </div>
    </div>
  );
}
