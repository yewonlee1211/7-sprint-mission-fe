import Hearts from "@/components/Hearts";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/itemsId.module.css";
import DropOption from "@/components/DropOption";
import CommentSection from "@/components/Comment/CommentSection";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import {
  deleteProductById,
  getProductByIdServer,
  getProductByIdClient,
} from "@/api/productApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/useAuth";

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
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 리액트 쿼리를 사용하여 상품 데이터 관리
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdClient(id),
    initialData: initialItem, // SSR 데이터를 초기값으로 사용
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
  });

  // 사용자 소유권 확인
  const isOwn = user && item && user.id === item.user?.id;

  const handleDeleteProduct = async () => {
    try {
      await deleteProductById(item.id);
      // 쿼리 캐시에서 해당 상품 데이터 제거
      queryClient.removeQueries({ queryKey: ["product", id] });
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 중 오류 발생:", error);
    }
  };

  const handlePatchProduct = async () => {
    router.push(`/postproduct`);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div>상품을 불러오는 중 오류가 발생했습니다.</div>;
  }

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
              <Hearts
                heartId={item.productHeart?.id}
                heartCount={item._count?.productHeart}
                productId={id}
              />
            </div>
          </div>
        </div>
        <CommentSection type={"product"} id={id} />
        <CustomButtonSquare
          text="목록으로 돌아가기"
          onClick={() => {
            router.push("/items");
          }}
          valid={true}
          round={true}
        />
      </div>
    </div>
  );
}
