/*
 * 이미지 URL을 검증하고 기본 이미지를 반환하는 함수
 * @param imageUrl - 검증할 이미지 URL
 * @returns 유효한 이미지 URL 또는 기본 이미지 경로
 */
export function getImageUrl(imageUrl: string | null | undefined): string {
  // null, undefined, 빈 문자열 체크
  if (!imageUrl || imageUrl.trim() === "") {
    return "/img/default.png";
  }

  return imageUrl;
}

/*
 * 이미지 URL 배열에서 첫 번째 유효한 이미지를 반환하는 함수
 * @param imageUrls - 이미지 URL 배열
 * @returns 첫 번째 유효한 이미지 URL 또는 기본 이미지 경로
 */
export function getFirstValidImage(
  imageUrls: (string | null | undefined)[]
): string {
  for (const url of imageUrls) {
    if (url && url.trim() !== "") {
      return url;
    }
  }

  return "/img/default.png";
}
