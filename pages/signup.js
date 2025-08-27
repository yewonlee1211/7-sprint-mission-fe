import { useState, useEffect } from "react";
import styles from "@/styles/signup.module.css";
import Image from "next/image";
import CustomInput from "@/components/CustomInput";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import useAuth from "@/lib/useAuth";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";
import SimpleLogin from "@/components/SimpleLogin";
import BigTitle from "@/components/BigTitle";

function Signup() {
  const emailObject = useEmail();
  const passwordObject = usePassword();
  const nicknameObject = useNickname();
  const passwordConfirmationObject = usePasswordConfirmation();
  const { userSetting, userLogin } = useAuth();

  const router = useRouter();

  // 회원가입 함수
  const onSignup = async () => {
    try {
      const res = await axios.post(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          email: emailObject.element,
          nickname: nicknameObject.element,
          password: passwordObject.element,
          passwordConfirmation: passwordConfirmationObject.element,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken } = res.data;

      // 회원가입 성공시 items 페이지로 이동

      if (accessToken) {
        userLogin(res.data);
        router.push("/items");
      }
    } catch (e) {
      console.error(e);
      alert("사용 중인 이메일입니다.");
    }
  };

  // 페이지 로딩될 때, 만약 이미 로그인 된 상태라면 items 페이지로 이동
  useEffect(() => {
    const { accessToken } = userSetting();

    if (accessToken) {
      router.push("/items");
    }
  }, []);

  return (
    <div className={styles.signup}>
      <div className={styles.main}>
        <BigTitle />
        <form className={styles.content}>
          <CustomInput object={emailObject} />
          <CustomInput object={nicknameObject} />
          <CustomInput object={passwordObject} />
          <CustomInput
            object={passwordConfirmationObject}
            password={passwordObject.element}
          />
          <CustomButtonSquare
            text="회원가입"
            onClick={onSignup}
            valid={
              emailObject.checkValid() &&
              nicknameObject.checkValid() &&
              passwordObject.checkValid() &&
              passwordConfirmationObject.checkValid(passwordObject.element)
            }
            type="long"
          />
          <SimpleLogin />
          <div className={styles.toLogin}>
            이미 회원이신가요?
            <Link href="/login" className={styles.link}>
              <span>로그인</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

Signup.useLayout = false;

export default Signup;
