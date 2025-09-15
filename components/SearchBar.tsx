import { ChangeEvent } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    onChange(newValue);
  };
  return (
    <div>
      <input
        className={styles.input}
        value={value}
        placeholder="검색할 단어를 입력해 주세요"
        onChange={onSearchValueChange}
      />
    </div>
  );
}
