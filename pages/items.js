import styles from "@/styles/itemsId.module.css";
import { getProductByIdServer, getProductByIdClient } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";

export async function getServerSideProps(context) {
  const id = "2";

  try {
    const item = await getProductByIdServer(id, context.req);

    return {
      props: {
        item,
        id,
      },
    };
  } catch (error) {
    // 401 에러인 경우 빈 props로 반환하고 클라이언트에서 처리
    if (error.response?.status === 401) {
      return {
        props: {
          item: null,
          id,
          authError: true,
        },
      };
    }

    // 404 에러인 경우에만 notFound 반환
    if (error.response?.status === 404) {
      return { notFound: true };
    }

    return {
      props: {
        item: null,
        id,
        error: true,
      },
    };
  }
}

export default function ItemsId({ item: initialItem, id }) {
  return (
    <div className={styles.background}>
      <div>페이지 노출 중</div>
      <div>아이템 ID: {id}</div>
      <div>아이템 이름: {initialItem?.name || "N/A"}</div>
      <button
        onClick={async () => {
          await getProductByIdClient(id);
        }}
      >
        임시클릭용
      </button>
    </div>
  );
}
