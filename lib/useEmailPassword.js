import { useState } from "react";
import {
  checkBlank,
  checkEmail,
  checkLength,
  checkMismatch,
} from "@/utils/checkValidInput";

// email, nickname, password, passwordConfirmation을 모은 커스텀 훅
// 각각 useEmail(), usePassword() 등은 객체를 리턴한다
// 객체는 element(스테이터스), 스테이터스 설정 함수, 한국어 문자열, placeholderText, 유효성 검사 함수, 유효성 검사 문구, 감춤 여부로 구성된다

// 용도는 로그인 페이지, 이메일 페이지에서 한꺼번에 입력되는 값들을 관리하고.. 암튼 input에 필요한 것 모아둠

export function useEmail() {
  const [email, setEmail] = useState("");

  return {
    element: email,
    setElement: setEmail,
    korText: "이메일",
    placeholderText: "이메일을 입력해주세요",
    checkValid: () => {
      return checkEmail(email);
    },
    invalidText: "유효하지 않은 형식입니다",
    secret: false,
  };
}

export function useNickname() {
  const [nickname, setNickname] = useState("");

  return {
    element: nickname,
    setElement: setNickname,
    korText: "닉네임",
    placeholderText: "닉네임을 입력해주세요",
    checkValid: () => {
      return !checkBlank(nickname);
    },
    invalidText: "",
    secret: false,
  };
}

export function usePassword() {
  const [password, setPassword] = useState("");

  return {
    element: password,
    setElement: setPassword,
    korText: "비밀번호",
    placeholderText: "비밀번호를 입력해주세요",
    checkValid: () => {
      return checkLength(password);
    },
    invalidText: "비밀번호는 8글자 이상이어야 합니다",
    secret: true,
  };
}

export function usePasswordConfirmation() {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return {
    element: passwordConfirmation,
    setElement: setPasswordConfirmation,
    korText: "비밀번호 확인",
    placeholderText: "비밀번호를 다시 한 번 입력해주세요",
    checkValid: (password) => {
      return checkMismatch(passwordConfirmation, password);
    },
    invalidText: "비밀번호가 일치하지 않습니다",
    secret: true,
  };
}
