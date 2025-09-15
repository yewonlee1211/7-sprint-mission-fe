import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./DropOptions.module.css";

interface Props {
  onPatch: () => void;
  onDelete: () => void;
}

export default function DropOptions({ onPatch, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
