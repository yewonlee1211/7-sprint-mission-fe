"use client";

import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { getProductComments, getArticleComments } from "@/lib/api/comment";

interface CommentSectionProps {
  type: "product" | "article";
  id: string;
}

export default function CommentSection({ type, id }: CommentSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(true);

  const handleRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      let data;

      if (type === "product") {
        data = await getProductComments(id);
      } else {
        data = await getArticleComments(id);
      }

      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refetch, type, id]);

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
