"use client";

import styles from "./ItemsList.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getProducts } from "@/lib/api/product";
import Item, { ItemInterface } from "./Item";
import apiClient from "@/lib/axios";

interface Props {
  params: { order: string; keyword: string; page: number };
  itemsSection: string;
}

function ItemsList({ params, itemsSection }: Props) {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    console.log("=== ItemsList useEffect 실행 ===");
    console.log("현재 쿠키:", document.cookie);
    console.log("axios withCredentials:", apiClient.defaults.withCredentials);
    console.log("axios baseURL:", apiClient.defaults.baseURL);

    if (authLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProducts(params);
        setItems(res.data || []);
      } catch (err: any) {
        console.error("상품 데이터 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
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
