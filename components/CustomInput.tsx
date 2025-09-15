import { checkBlank } from "@/utils/checkValidInput";
import { ChangeEvent, useState } from "react";
import styles from "./CustomInput.module.css";
import Image from "next/image";

interface CustomObject {
  id: string;
  element: any;
  setElement: (value: any) => void;
  korText: string;
  placeholderText?: string;
  checkValid: (value?: string) => boolean;
  invalidText: string;
  secret?: boolean;
  long?: boolean;
}

interface Props {
  object: CustomObject;
  auto?: string;
  password?: string;
  long?: boolean;
}

export default function CustomInput({
  object,
  auto = "off",
  password,
  long = object.long,
}: Props) {
  const { element, checkValid, invalidText } = object;
  const [isVisible, setIsVisible] = useState(false);

  const isValid = !checkValid(password);
  const inputStyles =
    isValid && !checkBlank(element)
      ? `${styles.input} ${styles.invalid}`
      : styles.input;
  const inputType = object.secret && !isVisible ? "password" : "text";

  const IcVisible = isVisible
    ? "icon/btn_visibility_on_24px.svg"
    : "icon/btn_visibility_off_24px.svg";

  const onVisible = () => {
    setIsVisible((prev) => {
      return !prev;
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    object.setElement(value);
  };

  if (long) {
    return (
      <div className={styles.customInput}>
        <label className={styles.text}>{object.korText}</label>
        <textarea
          className={`${inputStyles} ${long ? styles.long : ""}`}
          placeholder={object.placeholderText}
          value={object.element}
          onChange={handleChange}
        />
        {isValid && !checkBlank(element) && (
          <div className={styles.invalidText}>{invalidText}</div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.customInput}>
      <label className={styles.text} htmlFor={object.id}>
        {object.korText}
      </label>
      <input
        id={object.id}
        name={object.id}
        className={inputStyles}
        placeholder={object.placeholderText}
        value={object.element}
        onChange={handleChange}
        type={inputType}
        autoComplete={auto}
      />
      {object.secret && (
        <Image
          className={styles.icVisible}
          src={IcVisible}
          width={24}
          height={24}
          alt="비밀번호 숨기기"
          onClick={onVisible}
        />
      )}
      {isValid && !checkBlank(element) && (
        <div className={styles.invalidText}>{invalidText}</div>
      )}
    </div>
  );
}
