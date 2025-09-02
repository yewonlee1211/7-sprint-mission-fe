import { postProduct } from "@/api/productApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/postArticle.module.css";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import { useDescription, useName, usePrice } from "@/lib/useNewProduct";

export default function PostProduct() {
  const nameObj = useName();
  const priceObj = usePrice();
  const descObj = useDescription();

  const router = useRouter();

  async function handlePostArticle() {
    try {
      const res = postProduct();
      router.push(`/items/${res.data.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const item = JSON.parse(window.sessionStorage.getItem("product"));
    console.log(item);
  }, []);

  return (
    <div className={styles.postArticle}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>상품 등록하기</div>
          <CustomButtonSquare
            text="등록"
            onClick={handlePostArticle}
            valid={false}
          />
        </div>
      </div>
    </div>
  );
}
