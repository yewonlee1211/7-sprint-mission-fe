"use client";

import Image from "next/image";
import IcHeart from "@/public/icon/ic_heart.svg";
import IcHeartFilled from "@/public/icon/ic_heart_filled.svg";
import styles from "./Hearts.module.css";
import { MouseEvent, useEffect, useState } from "react";
import { createHeart, deleteHeart, getHeart } from "@/lib/api/hearts";

function heartSize(size: string) {
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

function heartCounting(heartCount: number) {
  const result = heartCount < 9999 ? heartCount : `9999+`;
  return result;
}

interface Props {
  productId?: string;
  articleId?: string;
  size?: string;
}

// 여기서 id는 heart 기록의 아이디
export default function Hearts({
  productId,
  articleId,
  size = "middle",
}: Props) {
  const category = productId ? "productHeart" : "articleHeart";
  const [heart, setHeart] = useState({
    id: "",
    count: 0,
    isHearted: false,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleHeartBtn = async (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (heart.id) {
      await deleteHeart(category, heart.id);
      setIsClicked((prev) => !prev);
    } else {
      await createHeart(category, productId, articleId);
      setIsClicked((prev) => !prev);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await getHeart(category, productId || articleId);
      console.log(res);
      setIsLoading(false);
    };

    getData();
  }, [isClicked]);

  if (isLoading) {
    return;
  }

  return (
    <div className={`${styles.heart} ${heartSize(size)}`}>
      <Image
        src={heart.isHearted ? IcHeartFilled : IcHeart}
        onClick={handleHeartBtn}
        className={`${styles.heartBtn} ${heartSize(size)}`}
        alt="이미지"
      />
      <div className={`${styles.heartCount} ${heartSize(size)}`}>
        {heartCounting(heart.count)}
      </div>
    </div>
  );
}
