// 유저 인증, 인가용 커스텀 훅

// 쿠키에 유저 데이터 저장 (accessToken은 백엔드에서 쿠키로 설정됨)
export function userLogin(data) {
  window.localStorage.setItem("user", JSON.stringify(data.user));
  // accessToken은 백엔드에서 쿠키로 설정되므로 여기서는 설정하지 않음
}

// 로컬스토리지의 유저 데이터 삭제 (httpOnly 쿠키는 백엔드에서 관리)
export function userLogout() {
  window.localStorage.removeItem("user");
}

// 쿠키에서 accessToken, 로컬스토리지에서 user 데이터를 가져오기
export function userSetting() {
  const user = JSON.parse(window.localStorage.getItem("user") || "null");

  return { user };
}
