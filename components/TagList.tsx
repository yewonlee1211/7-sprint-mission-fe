"use client";

import Image from "next/image";
import styles from "./TagList.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TagProps {
  tag: string;
  onDelete?: Dispatch<SetStateAction<string[]>>;
  flag: Dispatch<SetStateAction<boolean>>;
}

export function Tag({ tag, onDelete, flag }: TagProps) {
  const handleDeleteTag = onDelete
    ? () => {
        onDelete((prev) => prev.filter((origin) => origin !== tag));
        flag((prev) => !prev);
      }
    : () => {};

  return (
    <li className={styles.tag}>
      <div className={styles.text}>{tag}</div>
      {onDelete && (
        <Image
          className={styles.icon}
          src={"/icon/ic_delete.svg"}
          width={20}
          height={20}
          alt="태그 삭제"
          onClick={handleDeleteTag}
        />
      )}
    </li>
  );
}

interface Tag {
  content: string;
}

interface Props {
  tagList: Tag[];
  onDelete?: Dispatch<SetStateAction<string[]>>;
}

export default function TagList({ tagList, onDelete }: Props) {
  const [click, setClick] = useState(false);
  useEffect(() => {}, [click]);

  return (
    <ul className={styles.list}>
      {tagList.map((tag, index) => {
        return (
          <Tag
            key={index}
            tag={tag.content}
            onDelete={onDelete}
            flag={setClick}
          />
        );
      })}
    </ul>
  );
}
