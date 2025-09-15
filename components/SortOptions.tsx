import { SyntheticEvent } from "react";

// 정렬 옵션 타입 정의
type SortOption = "최신순" | "좋아요순" | string;

interface Props {
  currentOrderBy: SortOption;
  onChange: (orderBy: SortOption) => void;
}

const sortOptions = ["최신순", "좋아요순"];

export default function SortOptions({ currentOrderBy, onChange }: Props) {
  const onOrderByChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    const newOrderBy = e.currentTarget.value;
    if (newOrderBy) {
      onChange(newOrderBy);
    }
  };

  return (
    <select value={currentOrderBy} onChange={onOrderByChange}>
      {sortOptions.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </select>
  );
}
