"use client";

import { postProduct } from "@/lib/api/product";
import { useDescription, useName, usePrice } from "@/lib/useProductObject";
import styles from "./itemPost.module.css";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";

export default function ItemsPostPage() {
  const nameObj = useName();
  const priceObj = usePrice();
  const descObj = useDescription();

  async function handlePostArticle() {
    try {
      const res = postProduct({
        name: nameObj.element,
        price: priceObj.element,
        description: descObj.element,
      });
      //router.push(`/items/${res.data.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.postArticle}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>상품 등록하기</div>
          <CustomBtn text="등록" onClick={handlePostArticle} valid={false} />
        </div>
        <CustomInput object={nameObj} />
        <CustomInput object={descObj} />
        <CustomInput object={priceObj} />
      </div>
    </div>
  );
}
