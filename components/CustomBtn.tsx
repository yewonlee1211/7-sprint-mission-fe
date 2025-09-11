import { ReactNode } from "react";
import styles from "./CustomBtn.module.css";

interface Props {
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function CustomBtn({ text, onClick }: Props) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}
