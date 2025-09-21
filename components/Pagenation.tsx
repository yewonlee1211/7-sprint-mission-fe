"use client";

import Image from "next/image";
import styles from "./Pagenation.module.css";

// 페이지가 속한 범위 찾기. [1,2,3,4,5], [6,7,8,9,10], [11,12] 등의 배열을 리턴한다.
// 파라미터는 현재 페이지와 전체 페이지 2개 입력
function pageFieldFind(page: number, maxPage: number): number[] {
  const oneToFive = [1, 2, 3, 4, 5];
  const num = Math.floor((page - 1) / 5) * 5;
  const result = oneToFive.map((n) => {
    if (num + n > maxPage) {
      return undefined;
    } else {
      return num + n;
    }
  });
  const pageFieldArray = result.filter(
    (item): item is number => item !== undefined
  );
  return pageFieldArray;
}

interface Props {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}

export default function Pagenation({ page, maxPage, setPage }: Props) {
  const currentPage = page;
  const totalPages = maxPage;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // 페이지 변경
  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newPage = Number(e.currentTarget.textContent);
    setPage(newPage);
  };

  // 페이지 왼, 오 버튼
  const handlePageLeftRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const pageArray = pageFieldFind(currentPage, totalPages);
    const isLeftButton =
      e.currentTarget.getAttribute("data-direction") === "left";
    const newPage = isLeftButton
      ? Math.max((pageArray[0] || 1) - 5, 1)
      : (pageArray[pageArray.length - 1] || 1) + 1;
    setPage(newPage);
  };

  // 현재 페이지에 클래스 추가
  function currentPageClass(p: number, currentPage: number) {
    if (p === currentPage) {
      return styles.CurrentPage;
    } else {
      return "";
    }
  }

  // 페이지가 1개 이하면 페이지네이션 숨기기
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.PageButtonBox}>
      <ol className={styles.PageButtonList}>
        <button
          key="pageLeftButton"
          className={`${styles.PageButton} ${
            !hasPrevPage ? styles.disabled : ""
          }`}
          onClick={handlePageLeftRight}
          disabled={!hasPrevPage}
          data-direction="left"
        >
          <Image
            src={"/icon/ic_arrow_left.svg"}
            width={16}
            height={16}
            alt="왼쪽버튼"
          />
        </button>
        {pageFieldFind(currentPage, totalPages).map((p: number) => {
          return (
            <button
              key={p}
              className={`${styles.PageButton} ${currentPageClass(
                p,
                currentPage
              )}`}
              onClick={handlePageChange}
            >
              {p}
            </button>
          );
        })}
        {pageFieldFind(currentPage, totalPages).length === 5 && (
          <button
            key="pageRightButton"
            className={`${styles.PageButton} ${
              !hasNextPage ? styles.disabled : ""
            }`}
            onClick={handlePageLeftRight}
            disabled={!hasNextPage}
            data-direction="right"
          >
            <Image
              src={"/icon/ic_arrow_right.svg"}
              width={16}
              height={16}
              alt="오른쪽버튼"
            />
          </button>
        )}
      </ol>
    </div>
  );
}
