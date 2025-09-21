"use client";

import styles from "./ItemsList.module.css";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUtils";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getProducts } from "@/lib/api/product";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";

interface Item {
  id: string;
  name: string;
  descripton: string;
  price: string;
  images: string;
  favoriteCount: string;
  createdAt: string;
}

interface ItemProps {
  item: Item;
  itemsSection: string;
}

function Item({ item, itemsSection }: ItemProps) {
  const { name, descripton, price, images, favoriteCount, createdAt } = item;
  const router = useRouter();

  return (
    <div
      className={`${styles.item} ${styles[itemsSection]}`}
      onClick={() => {
        router.push(`/items/${item.id}`);
      }}
    >
      <img
        className={`${styles.itemImg} ${styles[itemsSection]}`}
        src={getImageUrl(images)}
        alt={name}
      />
      <div className={`${styles.itemInfo} ${styles[itemsSection]}`}>
        <div className={`${styles.itemText} ${styles[itemsSection]}`}>
          <div className={styles.itemTitle}>{name}</div>
          <div className={styles.itemPrice}>{price}</div>
        </div>
        <div className={`${styles.itemHeart} ${styles[itemsSection]}`}>
          <Image
            src={"/icon/ic_heart.svg"}
            alt="heart icon"
            width={16}
            height={16}
          />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}

interface ListProps {
  params: { order: string; keyword: string; page: number };
  itemsSection: string;
}

function ItemsList({ params, itemsSection }: ListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading: authLoading } = useAuth();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    console.log("=== ItemsList useEffect 실행 ===");
    console.log("현재 쿠키:", document.cookie);
    console.log("axios withCredentials:", apiClient.defaults.withCredentials);
    console.log("axios baseURL:", apiClient.defaults.baseURL);

    if (authLoading || isRequesting) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsRequesting(true); // 요청 시작
        setLoading(true);
        const res = await getProducts(params);
        setItems(res.data || []);
      } catch (err: any) {
        console.error("상품 데이터 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        // setIsRequesting(false); // 요청 완료
      }
    };

    fetchData();
  }, [authLoading, params]);

  if (authLoading || loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <ul className={`${styles.itemsList} ${styles[itemsSection]}`}>
      {items.map((item) => (
        <li key={item.id}>
          <Item itemsSection={itemsSection} item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ItemsList;
