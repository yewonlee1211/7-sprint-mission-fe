import styles from "./ItemsList.module.css";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUtils";

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

  return (
    <div className={`${styles.item} ${styles[itemsSection]}`}>
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
  items: Item[];
  itemsSection: string;
}

function ItemsList({ items, itemsSection }: ListProps) {
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
