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

// 8글자 이상인지 확인 (8글자 이상이면 true)
export function checkLength(value: string) {
  return value.trim().length >= 8;
}

//두 값이 일치하는지 확인 (일치하면 true)
export function checkMismatch(value: string, standard: string) {
  return value === standard;
}
