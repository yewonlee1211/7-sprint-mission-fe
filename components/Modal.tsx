import CustomBtn from "./CustomBtn";
import styles from "./Modal.module.css";

interface Props {
  text: string;
  btnText: string;
  onModal: () => void;
}

export default function Modal({ text, btnText, onModal }: Props) {
  return (
    <div className={styles.background} onClick={onModal}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.text}>{text}</div>
        <CustomBtn text={btnText} onClick={onModal} valid={true} />
      </div>
    </div>
  );
}
