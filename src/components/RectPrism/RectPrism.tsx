import styles from "./RectPrism.module.scss";

export default function RectPrism() {
  return (
    <>
      <div className={`${styles["face"]} ${styles.front}`} />
      <div className={`${styles["face"]} ${styles.back}`} />
      <div className={`${styles["face"]} ${styles.top}`} />
      <div className={`${styles["face"]} ${styles.bottom}`} />
      <div className={`${styles["face"]} ${styles.left}`} />
      <div className={`${styles["face"]} ${styles.right}`} />
    </>
  );
}
