import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import useRefetch from "@/lib/useRefetch";
import { getComments } from "@/api/commentsApi";
import testType from "@/utils/validType";

export default function CommentSection({ type, id }) {
  // isLoading: 데이터 fetch가 완료되어야 화면이 렌더링 되게 하기 위한 상태관리. article과 comments 둘 다 확인
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [refetch, handleRefetch] = useRefetch();

  testType(type);

  useEffect(() => {
    getComments(type, id, setComments, setIsLoading);
  }, [refetch]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <CommentInput type={type} id={id} onRefetch={handleRefetch} />
      <CommentList
        type={type}
        data={comments}
        id={id}
        onRefetch={handleRefetch}
      />
    </>
  );
}
