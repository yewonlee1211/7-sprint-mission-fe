// 유효한 값이 입력되었는지 검사하는 함수

// 빈칸인지 체크 (빈칸이면 true)
export function checkBlank(value: any) {
  return value.trim() === "";
}

//맞는 이메일 형식인지 체크 (제대로 된 형식이면 true)
export function checkEmail(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}

// n글자 이상인지 확인 (n글자 이상이면 true, 기본 8)
export function checkMin(value: string, n = 8) {
  return value.trim().length >= n;
}

// n글자 이하인지 확인(기본 5)
export function checkMax(value: string, n = 5) {
  return value.trim().length <= n;
}

//두 값이 일치하는지 확인 (일치하면 true)
export function checkMismatch(value: string, standard?: string) {
  return value === standard;
}

// 숫자인지 확인
export function checkNumber(value: string) {
  return Number(value) > 0 && Number.isInteger(Number(value));
}
