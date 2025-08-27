import Image from "next/image";
import Link from "next/link";
import styles from "./SimpleLogin.module.css";

export default function SimpleLogin() {
  return (
    <div className={styles.simpleLogin}>
      <div className={styles.text}>간편 로그인하기</div>
      <Link href="https://www.google.com" target="_blank">
        <Image
          src="/ic_google.svg"
          width={42}
          height={42}
          alt="구글 간편로그인"
        />
      </Link>
      <Link href="https://www.kakaocorp.com/page" target="_blank">
        <Image
          src="/ic_kakaotalk.svg"
          width={42}
          height={42}
          alt="카카오톡 간편로그인"
        />
      </Link>
    </div>
  );
}
