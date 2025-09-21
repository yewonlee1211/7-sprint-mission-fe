"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./DropOptions.module.css";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api/product";

interface Props {
  type: string;
  id: string;
}

export default function DropOptions({ type, id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onPatch = () => {
    router.push(`/${type}/post/${id}`);
  };

  const onDelete = async () => {
    const response = await deleteProduct(id);
    router.push(`/${type}`);
  };

  return (
    <div
      className={styles.box}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <Image
        className={styles.dots}
        src={"/icon/ic_dots.svg"}
        width={24}
        height={24}
        alt="옵션 선택"
      />
      {isOpen && (
        <div
          className={styles.options}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.patch} onClick={onPatch}>
            수정하기
          </div>
          <div className={styles.delete} onClick={onDelete}>
            삭제하기
          </div>
          <div
            className={styles.background}
            onClick={() => {
              setIsOpen(false);
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
