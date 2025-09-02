import PandaLogo from "@/public/panda-logo.svg";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomButtonSquare from "./CustomButtonSquare";
import { useEffect, useState } from "react";
import { userLogout, userSetting } from "@/lib/useAuth";
import axios from "axios";
import { useUser } from "@/lib/UserContext";

function PageLink({ link, text }) {
  const router = useRouter();

  function blueText(link) {
    if (router.asPath === "/") {
      return false;
    }

    return router.asPath.includes(link);
  }

  return (
    <div
      className={`${styles.pageLink} ${blueText(link) ? styles.blueText : ""}`}
    >
      <Link href={link}>{text}</Link>
    </div>
  );
}

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div className={`${styles.landingLink} ${styles.Link}`}>
          <Link href="/" className={styles.IconLink}>
            <Image
              className={styles.logoIcon}
              src={PandaLogo}
              alt="판다 로고 아이콘"
            />
          </Link>
          <h1 className={styles.logoTitle}>
            <Link href="/">판다마켓</Link>
          </h1>
        </div>
        <div className={`${styles.pagesLink} ${styles.Link}`}>
          <PageLink link="/article" text={"자유게시판"} />
          <PageLink link="/items" text={"중고마켓"} />
        </div>
        {user ? (
          <div className={styles.userInfo}>
            <Image
              src={"/user-default-img.svg"}
              className={styles.userImg}
              alt="이미지"
              width={40}
              height={40}
            />
            <div className={styles.userNickname}>{user.nickname}</div>
            <CustomButtonSquare
              text="로그아웃"
              onClick={async () => {
                try {
                  await axios.post(
                    "/api/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                } catch (e) {
                  console.error("로그아웃 에러:", e);
                } finally {
                  userLogout();
                  setIsLogin(false);
                }
              }}
              valid={true}
            />
          </div>
        ) : (
          <CustomButtonSquare
            text="로그인"
            onClick={() => {
              router.push("/login");
            }}
            valid={true}
          />
        )}
      </div>
    </header>
  );
}
