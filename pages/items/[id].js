import Hearts from "@/components/Hearts";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/itemsId.module.css";
import DropOption from "@/components/DropOption";
import CommentSection from "@/components/Comment/CommentSection";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import { userSetting } from "@/lib/useAuth";
import { deleteProductById, getProductByIdServer } from "@/api/productApi";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const item = await getProductByIdServer(id, context.req);
    return {
      props: {
        item,
        id,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
}

export default function ItemsId({ item: initialItem, id }) {
  const [isOwn, setIsOwn] = useState(false);
  const [item, setItem] = useState(initialItem);
  const router = useRouter();

  const handleDeleteProduct = async () => {
    const res = await deleteProductById(item.id);
    router.push("/items");
    return res.data;
  };

  const handlePatchProduct = async () => {
    window.sessionStorage.setItem("product", JSON.stringify(item));
    router.push(`/postproduct`);
  };

  useEffect(() => {
    const checkUserOwnership = async () => {
      const { user } = userSetting();
      try {
        if (user && item.user) {
          const isOwner = user.id === item.user.id;
          setIsOwn(isOwner);
        } else {
          setIsOwn(false);
        }
      } catch (error) {
        console.error("Error checking ownership:", error);
        setIsOwn(false);
      }
    };

    checkUserOwnership();
  }, [item.user]);

  // 상품이 없는 경우
  if (!item) {
    return <div>상품을 찾을 수 없습니다.</div>;
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
                {isOwn && (
                  <DropOption
                    onDelete={handleDeleteProduct}
                    onPatch={handlePatchProduct}
                  />
                )}
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
                  <div className={styles.nickname}>{item.user?.nickname}</div>
                  <div className={styles.updatedAt}>{item.updatedAt} </div>
                </div>
              </div>
              {/* <Hearts
                heartId={item.productHeart?.id}
                heartCount={item._count?.productHeart}
                productId={id}
              /> */}
            </div>
          </div>
        </div>
        {/* <CommentSection type={"product"} id={id} />
        <CustomButtonSquare
          text="목록으로 돌아가기"
          onClick={() => {
            router.push("/items");
          }}
          valid={true}
          round={true}
        /> */}
      </div>
    </div>
  );
}
