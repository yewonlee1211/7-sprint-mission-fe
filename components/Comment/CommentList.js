import Image from "next/image";
import DropOption from "./DropOption";
import styles from "./CommentList.module.css";
import dateFormat from "@/utils/dateFormat";
import { useState } from "react";
import CustomButtonSquare from "../CustomButtonSquare";
import validInput from "@/utils/validInput";
import axios from "axios";
import { deleteComments, patchComments } from "@/utils/commentsApi";

function Comment({ type, comment, id, onRefetch }) {
  const [isPatchMode, setIsPatchMode] = useState(false);
  const [value, setValue] = useState(comment.content);

  const handlePatchComment = async () => {
    await patchComments(type, id, comment.id);
    setIsPatchMode(false);
    onRefetch();
  };

  const handleDeleteComment = async () => {
    await deleteComments(type, id, comment.id);
    onRefetch();
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
          <CustomButtonSquare
            text={`수정 완료`}
            onClick={handlePatchComment}
            valid={validInput(value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comment}>
      <div className={styles.content}>
        <div className={styles.text}>{comment.content}</div>
        <DropOption
          onPatch={() => {
            setIsPatchMode(true);
          }}
          onDelete={handleDeleteComment}
        />
      </div>
      <div className={styles.info}>
        <Image
          className={styles.userImg}
          src="/user-default-img.svg"
          width={32}
          height={32}
          alt="유저 이미지"
        />
        <div className={styles.detail}>
          <div className={styles.nickname}>{comment.user.nickname}</div>
          <div className={styles.date}>{dateFormat(comment.updatedAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default function CommentList({ type, data, id, onRefetch }) {
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
