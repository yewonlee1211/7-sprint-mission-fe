"use client";

import { useState } from "react";
import ItemsList from "./ItemsList";
import SellingItemsHeader from "./SellingItemsHeader";

export default function SellingItemsSection() {
  const [params, setParams] = useState({
    order: "최신순",
    keyword: "",
    page: 1,
  });

  return (
    <div>
      <SellingItemsHeader value={params} setValue={setParams} />
      <ItemsList itemsSection="selling" params={params} />
    </div>
  );
}
