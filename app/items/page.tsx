"use client";

import { getProducts } from "@/lib/api/product";
import ItemsList from "./components/ItemsList";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import SellingItemsHeader from "./components/SellingItemsHeader";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
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
        const res = await getProducts();
        console.log(res);
        setItems(res.data || []);
      } catch (err: any) {
        console.error("상품 데이터 로드 실패:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading]); // user와 authLoading이 변경될 때만 실행

  if (authLoading || loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div style={{ marginTop: "200px" }}>
      <SellingItemsHeader />
      <ItemsList itemsSection="selling" items={items} />
    </div>
  );
}
