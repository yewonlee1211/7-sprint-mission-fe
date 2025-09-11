"use client";

import CustomBtn from "@/components/CustomBtn";
import CunstomInput from "@/components/CustomInput";
import Modal from "@/components/Modal";
import { postSignup } from "@/lib/api/user";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { AxiosError } from "axios";
import styles from "./signup.module.css";
import Link from "next/link";
import BigTitle from "@/components/BigTitle";
import SimpleLogin from "@/components/SimpleLogin";

export default function SignupPage() {
  const emailObj = useEmail();
  const passwordObj = usePassword();
  const nicknameObj = useNickname();
  const passwordConfirmationObj = usePasswordConfirmation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSignup = async () => {
    try {
      const res = await postSignup(
        emailObj.element,
        nicknameObj.element,
        passwordObj.element
      );
      router.push("/items");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 422) {
          setIsModalOpen(true);
        }
      }
    }
  };

  const noEvent = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.signup}>
      {isModalOpen && (
        <Modal
          text="사용 중인 이메일입니다."
          btnText="확인"
          onModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <div className={styles.main}>
        <BigTitle />
        <form onSubmit={noEvent} className={styles.content}>
          <CunstomInput object={emailObj} auto="email" />
          <CunstomInput object={nicknameObj} />
          <CunstomInput object={passwordObj} auto="new-password" />
          <CunstomInput
            object={passwordConfirmationObj}
            password={passwordObj.element}
            auto="new-password"
          />
          <CustomBtn
            text="회원가입"
            onClick={onSignup}
            valid={
              emailObj.checkValid() &&
              nicknameObj.checkValid() &&
              passwordObj.checkValid() &&
              passwordConfirmationObj.checkValid(passwordObj.element)
            }
            type="long"
            round={true}
          />
        </form>
        <SimpleLogin />
        <div className={styles.toLogin}>
          이미 회원이신가요?
          <Link href="/login" className={styles.link}>
            <span>로그인</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
