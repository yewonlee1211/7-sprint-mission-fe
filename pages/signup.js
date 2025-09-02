import { useState, useEffect } from "react";
import styles from "@/styles/signup.module.css";
import CustomInput from "@/components/CustomInput";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";
import SimpleLogin from "@/components/SimpleLogin";
import BigTitle from "@/components/BigTitle";
import Modal from "@/components/Modal";
import { userLogin, userSetting } from "@/lib/useAuth";

function Signup() {
  const emailObject = useEmail();
  const passwordObject = usePassword();
  const nicknameObject = useNickname();
  const passwordConfirmationObject = usePasswordConfirmation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // 회원가입 함수
  const onSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          email: emailObject.element,
          nickname: nicknameObject.element,
          password: passwordObject.element,
        },
        {
          withCredentials: true,
        }
      );

      // 회원가입 성공시 items 페이지로 이동
      // accessToken은 백엔드에서 쿠키로 설정됨
      userLogin(res.data);
      router.push("/items");
    } catch (e) {
      console.error(e);
      setIsModalOpen(true);
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
      {isModalOpen && (
        <Modal
          text="사용 중인 이메일입니다."
          modalText="확인"
          onModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
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
            round={true}
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
