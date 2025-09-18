import Image from "next/image";
import styles from "./UserInfo.module.css";
import { dateFormating } from "@/utils/dateFormating";

type User = {
  id: string;
  nickname: string;
};

interface Props {
  user: User;
  updatedAt: string;
}

export default function UserInfo({ user, updatedAt }: Props) {
  return (
    <div className={styles.userInfo}>
      <Image
        className={styles.userImg}
        src={"/icon/ic_user.svg"}
        width={40}
        height={40}
        alt="유저 이미지"
      />
      <div className={styles.subTextData}>
        <div className={styles.nickname}>{user.nickname}</div>
        <div className={styles.updatedAt}>{dateFormating(updatedAt)} </div>
      </div>
    </div>
  );
}
