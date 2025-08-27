import Hearts from "@/components/Hearts";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/itemsId.module.css";
import DropOption from "@/components/DropOption";
import CommentSection from "@/components/Comment/CommentSection";

export default function ItemsId() {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const handleDeleteProduct = async () => {
    const res = await axios.patch(`http://localhost:5000/product/${item.id}`, {
      data: { deleted: true },
    });
    router.push("/items");
    return res.data;
  };

  const handlePatchProduct = async () => {
    window.sessionStorage.setItem("product", JSON.stringify(item));
    alert("수정 버튼 작동됨");
    // router.push(`/postproduct/${item.id}`);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    async function getProductById(id) {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/product/${id}`);
        setItem(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    getProductById(id);
  }, [id]);

  if (isLoading) {
    return <div>뭐지</div>;
  }

  return (
    <div className={styles.background}>
      <div className={styles.item}>
        <div className={styles.content}>
          <Image
            src={"/default.png"}
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
                <DropOption
                  onDelete={handleDeleteProduct}
                  onPatch={handlePatchProduct}
                />
              </div>
              <div className={styles.itemText}>
                <div className={styles.subTitle}>상품 소개</div>
                <div className={styles.itemDesc}>{item.description} </div>
              </div>
              <div className={styles.itemTags}>
                <div className={styles.subTitle}>상품 태그</div>
                <div className={styles.itemTag}>나중에 태그를..</div>
              </div>
            </div>
            <div className={styles.subInfo}>
              <div className={styles.userInfo}>
                <Image
                  className={styles.userImg}
                  src={"/user-default-img.svg"}
                  width={40}
                  height={40}
                  alt="유저 이미지"
                />
                <div className={styles.subTextData}>
                  {/* <div className={styles.nickname}>{item.user.nickname}</div> */}
                  <div className={styles.updatedAt}>{item.updatedAt} </div>
                </div>
              </div>
              <Hearts
                heartId={item.PHeart.id}
                heartCount={item._count.PHeart}
                productId={id}
              />
            </div>
          </div>
        </div>
        <CommentSection type={"product"} id={item.id} />
      </div>
    </div>
  );
}
