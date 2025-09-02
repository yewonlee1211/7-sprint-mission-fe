import styles from "./CustomButtonSquare.module.css";

export default function CustomButtonSquare({
  text,
  onClick,
  valid = false,
  type = "normal",
  round = false,
}) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (valid) {
      onClick();
    }
  };

  const stylesOption = valid ? "" : styles.invalid;
  const stylesLength = type === "normal" ? styles.button : styles.longButton;
  const stylesRound = round ? styles.round : "";

  return (
    <button
      className={`${stylesLength} ${stylesOption} ${stylesRound}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}
