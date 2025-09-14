"use client";

import { ReactNode, SyntheticEvent } from "react";
import styles from "./CustomBtn.module.css";

interface Props {
  text?: string;
  children?: ReactNode;
  onClick: () => void;
  valid?: boolean;
  type?: string;
  round?: boolean;
}

export default function CustomBtn({
  text,
  onClick,
  valid = false,
  type,
  round = false,
}: Props) {
  const handleButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (valid) {
      onClick();
    }
  };

  const stylesOption = valid ? "" : styles.invalid;
  const stylesLength = type !== "long" ? styles.button : styles.longButton;
  const stylesRound = round ? styles.round : "";

  return (
    <button
      className={`${stylesLength} ${stylesOption} ${stylesRound}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}
