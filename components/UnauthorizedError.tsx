"use client";

import apiClient from "@/lib/axios";
import { useEffect, useState } from "react";

export default function UnauthorizedError() {
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        setIsRefreshing(true);

        const response = await apiClient.post("/auth/refresh/token");

        if (response.status === 200) {
          window.location.reload();
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        window.location.href = "/";
      } finally {
        setIsRefreshing(false);
      }
    };

    refreshToken();
  }, []);

  return (
    <div>
      {isRefreshing ? (
        <h2>토큰을 갱신하고 있습니다...</h2>
      ) : (
        <h2>인증에 실패했습니다.</h2>
      )}
    </div>
  );
}
