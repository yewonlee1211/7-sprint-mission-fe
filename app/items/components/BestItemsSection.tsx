import { getBestProductsByIdSSR } from "@/lib/api/productSSR";
import Item, { ItemInterface } from "./Item";
import styles from "./BestItemsSection.module.css";

export default async function BestItemsSection() {
  try {
    const bestItems = (await getBestProductsByIdSSR()) as ItemInterface[];

    return (
      <div className={styles.BestItemsSection}>
        <h2 className={styles.SectionTitle}>베스트 상품</h2>
        <ul className={styles.ItemsList}>
          {bestItems.map((bestItem) => {
            return (
              <li key={bestItem.id}>
                <Item item={bestItem} itemsSection="bestItem" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (e) {
    return (
      <div>
        <h2>베스트 상품</h2>
      </div>
    );
  }
}
