"use client";

import { getProductById, patchProduct } from "@/lib/api/product";
import {
  useDescription,
  useName,
  usePrice,
  useTag,
} from "@/lib/useProductObject";
import styles from "../itemPost.module.css";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import TagList from "@/components/TagList";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductData {
  id: string;
  name: string;
  price: string;
  description: string;
  tags?: string[];
}

export default function ItemsPostEditPage({
  params,
}: {
  params: { id: string };
}) {
  const nameObj = useName();
  const priceObj = usePrice();
  const descObj = useDescription();
  const tagObj = useTag();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const pathname = usePathname();

  const id = pathname.split("/").pop() as string;

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(id);
        setProductData(data);

        // 초기 세팅
        nameObj.setElement(data.name);
        priceObj.setElement(data.price);
        descObj.setElement(data.description);
        tagObj.setTags(data.tag);
      } catch (error) {
        console.error("상품 데이터 가져오기 실패:", error);
        // 에러 발생 시 상품 목록으로 이동
        router.push("/items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // 상품 수정 함수
  async function handleUpdateProduct() {
    try {
      const res = await patchProduct(id, {
        name: nameObj.element,
        price: priceObj.element,
        description: descObj.element,
        tags: tagObj.tagList.map((tag) => tag.content),
      });

      // 수정 성공 시 상품 상세 페이지로 이동
      router.push(`/items/${id}`);
      return;
    } catch (e) {
      console.error("상품 수정 실패:", e);
    }
  }

  const updateValid = () => {
    return (
      nameObj.checkValid() && priceObj.checkValid() && descObj.checkValid()
    );
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className={styles.postArticle}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerText}>상품 수정하기</div>
          </div>
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  // 상품 데이터가 없을 때
  if (!productData) {
    return (
      <div className={styles.postArticle}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerText}>상품 수정하기</div>
          </div>
          <div>상품을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postArticle}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>상품 수정하기</div>
          <CustomBtn
            text="수정"
            onClick={handleUpdateProduct}
            valid={updateValid()}
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
