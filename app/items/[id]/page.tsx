import { getProductByIdSSR } from "@/lib/api/productSSR";
import styles from "./itemId.module.css";
import Image from "next/image";
import UserInfo from "@/components/UserInfo";
import UnauthorizedError from "@/components/UnauthorizedError";
import DropOptions from "@/components/DropOptions";
import Hearts from "@/components/Hearts";
import TagList from "@/components/TagList";
import CommentSection from "@/components/Comment/CommentSection";

interface Props {
  params: {
    id: string;
  };
}

export default async function ItemIdPage({ params }: Props) {
  const { id } = await params;

  try {
    const item = await getProductByIdSSR(id);
    console.log(item);

    return (
      <div className={styles.background}>
        <div className={styles.item}>
          <div className={styles.content}>
            <Image
              src={"/img/default.png"}
              width={486}
              height={486}
              alt="제품 상세 이미지"
              priority={true}
            />
            <div className={styles.itemInfo}>
              <div className={styles.textInfo}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemTitle}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemPrice}>{item.price} </div>
                  </div>
                  {item.isOwn && <DropOptions type="items" id={id} />}
                </div>
                <div className={styles.itemText}>
                  <div className={styles.subTitle}>상품 소개</div>
                  <div className={styles.itemDesc}>{item.description} </div>
                </div>
                <div className={styles.itemTags}>
                  <div className={styles.subTitle}>상품 태그</div>
                  <TagList tagList={item.tag} />
                </div>
              </div>
              <div className={styles.subInfo}>
                <UserInfo user={item.user} updatedAt={item.updatedAt} />
                <Hearts productId={item.id} size="big" />
              </div>
            </div>
          </div>
          <CommentSection type="product" id={id} />
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        return <UnauthorizedError />;
      }
      return <div>Error</div>;
    }
    return;
  }
}
