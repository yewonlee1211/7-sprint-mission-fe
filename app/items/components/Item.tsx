import styles from "./ItemsList.module.css";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUtils";
import Link from "next/link";

export interface ItemInterface {
  id: string;
  name: string;
  descripton: string;
  price: string;
  images: string;
  heart_count: string;
  createdAt: string;
}

interface ItemProps {
  item: ItemInterface;
  itemsSection: string;
}

export default function Item({ item, itemsSection }: ItemProps) {
  const { name, price, images, heart_count } = item;

  return (
    <Link
      className={`${styles.item} ${styles[itemsSection]}`}
      href={`/items/${item.id}`}
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
          {heart_count}
        </div>
      </div>
    </Link>
  );
}
