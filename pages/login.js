import Image from "next/image";
import styles from "@/styles/login.module.css";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButtonSquare from "@/components/CustomButtonSquare";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { userLogin, userSetting } from "@/lib/useAuth";
import { useEmail, usePassword } from "@/lib/useEmailPassword";
import SimpleLogin from "@/components/SimpleLogin";
import BigTitle from "@/components/BigTitle";
import Modal from "@/components/Modal";
import { loginPost } from "@/api/authApi";

function Login() {
  const emailObject = useEmail();
  const passwordObject = usePassword();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //로그인 post 함수

  const onLogin = async () => {
    try {
      const res = await loginPost(emailObject.element, passwordObject.element);
      userLogin(res.data);
      router.push("/items");
    } catch (e) {
      setIsModalOpen(true);
    }
  };

  // 페이지 로딩될 때, 만약 이미 로그인 된 상태라면 items 페이지로 이동

  return (
    <div className={styles.login}>
      {isModalOpen && (
        <Modal
          text="비밀번호가 일치하지 않습니다."
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
          <CustomInput object={passwordObject} />
          <CustomButtonSquare
            text="로그인"
            onClick={onLogin}
            valid={emailObject.checkValid() && passwordObject.checkValid()}
            type="long"
            round={true}
          />
          <SimpleLogin />
          <div className={styles.toSignup}>
            판다마켓이 처음이신가요?
            <Link href="/signup" className={styles.link}>
              <span>회원가입</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.useLayout = false;

export default Login;
