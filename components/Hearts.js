import Image from "next/image";
import IcHeart from "@/public/ic_heart.svg";
import IcHeartFilled from "@/public/ic_heart_filled.svg";
import styles from "./Hearts.module.css";
import { useState } from "react";
import { createHeart, deleteHeart } from "@/api/heartApi";

function heartSize(size) {
  switch (size) {
    case "big":
      return styles.big;
    case "middle":
      return styles.middle;
    case "small":
      return styles.small;
    default:
      return;
  }
}

function heartCounting(heartCount) {
  const result = heartCount < 9999 ? heartCount : `9999+`;
  return result;
}

// 여기서 id는 heart 기록의 아이디
export default function Hearts({
  heartId,
  productId,
  articleId,
  heartCount,
  isHearted,
  size = "middle",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const category = productId ? "productHeart" : "articleHeart";
  const id = heartId ? heartId.id : undefined;

  const handleHeartBtn = (e) => {
    e.preventDefault();

    // 아직 기존 데이터 전송 도중이라면(patch든 post든) 버튼 작동 막음
    if (isLoading) {
      return;
    }

    if (id) {
      deleteHeart(category, id, setIsLoading);
    } else {
      // id가 없다 -> 새롭게 좋아요를 누른 것 -> 좋아요 기록 생성
      createHeart(category, userId, productId, articleId, setIsLoading);
    }
  };

  return (
    <div className={`${styles.heart} ${heartSize(size)}`}>
      <Image
        src={isHearted ? IcHeartFilled : IcHeart}
        onClick={handleHeartBtn}
        className={`${styles.heartBtn} ${heartSize(size)}`}
        alt="이미지"
      />
      <div className={`${styles.heartCount} ${heartSize(size)}`}>
        {heartCounting(heartCount)}
      </div>
    </div>
  );
}
