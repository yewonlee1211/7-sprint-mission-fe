"use client";

import { useState } from "react";
import ItemsList from "./ItemsList";
import SellingItemsHeader from "./SellingItemsHeader";
import styles from "./SellingItemsSection.module.css";
import Pagenation from "@/components/Pagenation";

export default function SellingItemsSection() {
  const [params, setParams] = useState({
    order: "최신순",
    keyword: "",
    maxpage: 10,
    page: 1,
  });

  return (
    <div className={styles.SellingItemsSection}>
      <SellingItemsHeader value={params} setValue={setParams} />
      <ItemsList
        itemsSection="selling"
        params={params}
        setParams={(params) => setParams(params)}
      />
      <Pagenation
        page={params.page}
        maxPage={params.maxpage}
        setPage={(page) => setParams({ ...params, page })}
      />
    </div>
  );
}
