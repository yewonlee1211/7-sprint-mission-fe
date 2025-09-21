"use client";

import styles from "./ItemsList.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getProducts } from "@/lib/api/product";
import Item, { ItemInterface } from "./Item";
import apiClient from "@/lib/axios";

interface Props {
  params: { order: string; keyword: string; page: number; maxpage: number };
  itemsSection: string;
  setParams: (params: {
    order: string;
    keyword: string;
    page: number;
    maxpage: number;
  }) => void;
}

function ItemsList({ params, itemsSection, setParams }: Props) {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProducts(params);
        console.log(res);
        setParams({ ...params, maxpage: res.data.pagination.totalPages });
        setItems(res.data.products || []);
      } catch (err: any) {
        console.error("상품 데이터 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, params.keyword, params.order, params.page]);

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
