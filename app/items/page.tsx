import BestItemsSection from "./components/BestItemsSection";
import SellingItemsSection from "./components/SellingItemsSection";
import styles from "./items.module.css";

export default function ItemsPage() {
  return (
    <div className={styles.main}>
      <BestItemsSection />
      <SellingItemsSection />
    </div>
  );
}
