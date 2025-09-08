import { ReactNode } from "react";
import styles from "./CustomBtn.module.css";

interface Props {
  text: string;
  children?: ReactNode;
  onClick?: any;
}

export default function CustomBtn({ text }: Props) {
  return <button className={styles.btn}>{text}</button>;
}
