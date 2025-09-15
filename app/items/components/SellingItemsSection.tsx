"use client";

import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import SellingItemsHeader from "./SellingItemsHeader";
import { useAuth } from "@/contexts/AuthProvider";
import { getProducts } from "@/lib/api/product";

export default function SellingItemsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoading: authLoading } = useAuth();

  const [params, setParams] = useState({
    order: "최신순",
    keyword: "",
    page: 1,
  });

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProducts(params);
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
  }, [authLoading, params]);

  if (authLoading || loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div>
      <SellingItemsHeader value={params} setValue={setParams} />
      <ItemsList itemsSection="selling" items={items} />
    </div>
  );
}
