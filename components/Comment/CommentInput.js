import { useEffect, useState } from "react";
import CustomButtonSquare from "../CustomButtonSquare";
import styles from "./CommentInput.module.css";
import validInput from "@/utils/checkValidInput";
import { postComments } from "@/api/commentsApi";
import testType from "@/utils/validType";
import { useUser } from "@/lib/UserContext";

export default function CommentInput({ type, id, onRefetch }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { user, accessToken } = useUser();

  testType(type);

  const header = type === "article" ? "댓글 달기" : "문의하기";
  const placeholder =
    type === "article"
      ? "댓글을 입력해 주세요"
      : "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  const handlePostComment = async () => {
    await postComments(type, id, user.id, value);
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
