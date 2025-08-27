import CustomButtonSquare from "./CustomButtonSquare";
import styles from "./Modal.module.css";

export default function Modal({ text, modalText, onModal }) {
  return (
    <div className={styles.background} onClick={onModal}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.text}>{text}</div>
        <CustomButtonSquare text={modalText} onClick={onModal} valid={true} />
      </div>
    </div>
  );
}
