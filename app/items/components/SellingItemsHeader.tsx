import CustomBtn from "@/components/CustomBtn";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { Dispatch, SetStateAction } from "react";
import styles from "./SellingItemsHeader.module.css";
import CustomLink from "@/components/CustomLink";

type Value = {
  order: string;
  keyword: string;
  page: number;
};

interface Props {
  value: Value;
  setValue: Dispatch<SetStateAction<Value>>;
}

export default function SellingItemsHeader({ value, setValue }: Props) {
  const changeValue = (key: keyof Value, newValue: string | number) => {
    setValue((prev: Value) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div className={styles.SellingItemsHeader}>
      <div className={styles.SectionTitle}>판매 중인 상품</div>
      <SearchBar
        value={value.keyword}
        onChange={(keyword: string) => changeValue("keyword", keyword)}
      />
      <CustomLink text="상품 등록하기" link="/items/post" />
      <SortOptions
        currentOrderBy={value.order}
        onChange={(order: string) => changeValue("order", order)}
      />
    </div>
  );
}
