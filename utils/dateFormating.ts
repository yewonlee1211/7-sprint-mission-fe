export function dateFormating(rawDate: string) {
  const now = new Date();
  const date = new Date(rawDate);
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffHours < 1) {
    return `${Math.ceil(diffTime / (1000 * 60))}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}. ${month}. ${day}`;
  }
}
