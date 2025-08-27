import { useEffect, useState } from "react";
import CustomButtonSquare from "../CustomButtonSquare";
import styles from "./CommentInput.module.css";
import validInput from "@/utils/validInput";
import { useUser } from "@/lib/UserContext";
import { postComments } from "@/utils/commentsApi";
import testType from "@/utils/validType";

export default function CommentInput({ type, id, onRefetch }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const userId = useUser().userId;

  testType(type);

  const header = type === "article" ? "댓글 달기" : "문의하기";
  const placeholder =
    type === "article"
      ? "댓글을 입력해 주세요"
      : "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  const handlePostComment = async () => {
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!isValid) {
      alert("댓글을 작성해 주세요.");
      return;
    }

    await postComments(type, id, userId, value);
    onRefetch();
  };

  useEffect(() => {
    if (validInput(value)) {
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
        <CustomButtonSquare
          text={`등록`}
          onClick={handlePostComment}
          valid={isValid}
        />
      </div>
    </div>
  );
}
