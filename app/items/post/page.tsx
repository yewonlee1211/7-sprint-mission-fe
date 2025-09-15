"use client";

import { postProduct } from "@/lib/api/product";
import {
  useDescription,
  useName,
  usePrice,
  useTag,
} from "@/lib/useProductObject";
import styles from "./itemPost.module.css";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TagList from "@/components/TagList";
import { useRouter } from "next/navigation";

export default function ItemsPostPage() {
  const nameObj = useName();
  const priceObj = usePrice();
  const descObj = useDescription();
  const tagObj = useTag();
  const router = useRouter();

  async function handlePostArticle() {
    try {
      const res = await postProduct({
        name: nameObj.element,
        price: priceObj.element,
        description: descObj.element,
        tags: tagObj.tagList,
      });
      router.push(`/items/${res.data.id}`);
      return;
    } catch (e) {
      console.error(e);
    }
  }

  const postValid = () => {
    return (
      nameObj.checkValid() && priceObj.checkValid() && descObj.checkValid()
    );
  };

  return (
    <div className={styles.postArticle}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>상품 등록하기</div>
          <CustomBtn
            text="등록"
            onClick={handlePostArticle}
            valid={postValid()}
          />
        </div>
        <CustomInput object={nameObj} />
        <CustomInput object={descObj} />
        <CustomInput object={priceObj} />
        <CustomInput object={tagObj} />
        <TagList tagList={tagObj.tagList} onDelete={tagObj.setTags} />
      </div>
    </div>
  );
}
