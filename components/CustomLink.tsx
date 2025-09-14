import Link from "next/link";
import styles from "./CustomLink.module.css";

interface Props {
  text: string;
  link: string;
  round?: boolean;
}

export default function CustomLink({ text, link, round = false }: Props) {
  const linkStyle = round ? `${styles.link} ${styles.round}` : styles.link;

  return (
    <Link className={linkStyle} href={link}>
      {text}
    </Link>
  );
}
