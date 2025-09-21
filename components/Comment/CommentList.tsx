import Image from "next/image";
import DropOptions from "../DropOptions";
import styles from "./CommentList.module.css";
import { dateFormating } from "@/utils/dateFormating";
import { useState } from "react";
import CustomBtn from "../CustomBtn";
import { checkBlank, checkMax } from "@/utils/checkValidInput";
import {
  deleteProductComment,
  patchProductComment,
  deleteArticleComment,
  patchArticleComment,
} from "@/lib/api/comment";
import { useAuth } from "@/contexts/AuthProvider";
import UserInfo from "../UserInfo";

interface CommentProps {
  type: "product" | "article";
  comment: any;
  id: string;
  onRefetch: () => void;
}

function Comment({ type, comment, id, onRefetch }: CommentProps) {
  const [isPatchMode, setIsPatchMode] = useState(false);
  const [value, setValue] = useState(comment.content);
  const { user } = useAuth();

  const handlePatchComment = async () => {
    try {
      if (type === "product") {
        await patchProductComment(id, comment.id, value);
      } else {
        await patchArticleComment(id, comment.id, value);
      }
      setIsPatchMode(false);
      onRefetch();
    } catch (error) {
      console.error("Error patching comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      if (type === "product") {
        await deleteProductComment(id, comment.id);
      } else {
        await deleteArticleComment(id, comment.id);
      }
      onRefetch();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (isPatchMode) {
    return (
      <div className={styles.postComment}>
        <textarea
          className={styles.input}
          placeholder="댓글을 입력해 주세요"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div className={styles.btn}>
          <CustomBtn
            text={`수정 완료`}
            onClick={handlePatchComment}
            valid={!checkBlank(value) && checkMax(value, 300)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comment}>
      <div className={styles.content}>
        <div className={styles.text}>{comment.content}</div>
        {/* {comment.user.id === user?.id && (
          <DropOptions
            type="comment"
            id=""
          />
        )} */}
      </div>
      <UserInfo user={comment.user} updatedAt={comment.updatedAt} />
    </div>
  );
}

interface CommentListProps {
  type: "product" | "article";
  data: any[];
  id: string;
  onRefetch: () => void;
}

export default function CommentList({
  type,
  data,
  id,
  onRefetch,
}: CommentListProps) {
  return (
    <div className={styles.commentList}>
      {data.map((comment) => {
        return (
          <Comment
            key={comment.id}
            type={type}
            comment={comment}
            id={id}
            onRefetch={onRefetch}
          />
        );
      })}
    </div>
  );
}
