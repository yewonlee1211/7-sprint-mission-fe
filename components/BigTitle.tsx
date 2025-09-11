import styles from "./BigTitle.module.css";
import Image from "next/image";
import Link from "next/link";

export default function BigTitle() {
  return (
    <Link className={styles.title} href={"/"}>
      <Image
        src={"/icon/panda_logo.svg"}
        width={103}
        height={103}
        alt="메인 로고"
      />
      <h1 className={styles.titleText}>판다마켓</h1>
    </Link>
  );
}
