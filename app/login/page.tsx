"use client";

import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import Modal from "@/components/Modal";
import { useEmail, usePassword } from "@/lib/useEmailPassword";
import { SyntheticEvent, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { postLogin } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import BigTitle from "@/components/BigTitle";
import SimpleLogin from "@/components/SimpleLogin";

export default function LoginPage() {
  const emailObj = useEmail();
  const passwordObj = usePassword();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      const res = await postLogin(emailObj.element, passwordObj.element);
      router.push("/items");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          setIsModalOpen(true);
        }
      }
    }
  };

  const noEvent = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.login}>
      {isModalOpen && (
        <Modal
          text="비밀번호가 일치하지 않습니다."
          btnText="확인"
          onModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <div className={styles.main}>
        <BigTitle />
        <form onSubmit={noEvent} className={styles.content}>
          <CustomInput object={emailObj} />
          <CustomInput object={passwordObj} />
          <CustomBtn
            text="로그인"
            onClick={onLogin}
            valid={emailObj.checkValid() && passwordObj.checkValid()}
            type="long"
            round={true}
          />
        </form>
        <SimpleLogin />
        <div className={styles.toSignup}>
          판다마켓이 처음이신가요?
          <Link href="/signup" className={styles.link}>
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
