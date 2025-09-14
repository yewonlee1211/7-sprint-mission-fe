"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import CustomLink from "./CustomLink";
import CustomBtn from "./CustomBtn";

interface Props {
  link: string;
  text: string;
}

function PageLink({ link, text }: Props) {
  const pathname = usePathname();

  function blueText(link: string) {
    if (pathname === "/") {
      return false;
    }
    return pathname.startsWith(link);
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
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div className={`${styles.landingLink} ${styles.Link}`}>
          <Link href="/" className={styles.IconLink}>
            <Image
              className={styles.logoIcon}
              src={"/icon/panda_logo.svg"}
              alt="판다 로고 아이콘"
              width={40}
              height={40}
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
              src={"/icon/ic_user.svg"}
              className={styles.userImg}
              alt="이미지"
              width={40}
              height={40}
            />
            <div className={styles.userNickname}>{user.nickname}</div>
            <CustomBtn text="로그아웃" onClick={logout} valid={true} />
          </div>
        ) : (
          <CustomLink text="로그인" link="/login" />
        )}
      </div>
    </header>
  );
}
