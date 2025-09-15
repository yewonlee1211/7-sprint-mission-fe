"use client";

import { useState } from "react";
import { checkBlank, checkMax, checkNumber } from "@/utils/checkValidInput";

// name, url, duedate, price 등을 모은 커스텀 훅
// 각각 usename() 등은 객체를 리턴한다
// 객체는 element(스테이터스), 스테이터스 설정 함수, 한국어 문자열, placeholderText, 유효성 검사 함수, 유효성 검사 문구, 감춤 여부로 구성된다

// 용도는 페이지에서 한꺼번에 입력되는 값들을 관리하고.. 암튼 input에 필요한 것 모아둠

export function useName() {
  const [name, setName] = useState("");

  return {
    id: "name",
    element: name,
    setElement: setName,
    korText: "상품명",
    placeholderText: "상품명을 입력해주세요",
    checkValid: () => {
      return !checkBlank(name);
    },
    invalidText: "상품명을 입력해주세요",
    secret: false,
  };
}

export function usePrice() {
  const [price, setPrice] = useState("");

  return {
    id: "price",
    element: price,
    setElement: setPrice,
    korText: "판매가격",
    placeholderText: "판매 가격을 입력해주세요",
    checkValid: () => {
      return checkNumber(price);
    },
    invalidText: "숫자를 입력해주세요",
    secret: false,
  };
}

export function useDescription() {
  const [description, setDescription] = useState("");

  return {
    id: "description",
    element: description,
    setElement: setDescription,
    korText: "상품 소개",
    placeholderText: "상품 소개를 입력해주세요",
    checkValid: () => {
      return !checkBlank(description) && checkMax(description, 300);
    },
    invalidText: "상품 소개는 최대 300자까지 입력 가능합니다",
    secret: false,
    long: true,
  };
}

export function useTag() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTag = (value: string) => {
    if (value !== value.trim() && checkMax(tag) && !checkBlank(tag)) {
      if (!tags.includes(tag)) {
        setTags((prev) => {
          return [...prev, tag];
        });
      }
      setTag("");
    } else {
      setTag(value.trim());
    }
  };

  return {
    id: "tag",
    element: tag,
    setElement: handleTag,
    korText: "태그",
    placeholderText: "태그를 입력해주세요",
    checkValid: () => {
      return !checkBlank(tag) && checkMax(tag);
    },
    invalidText: "5글자 이내로 입력해주세요",
    secret: false,
    tagList: tags,
    setTags: setTags,
  };
}
