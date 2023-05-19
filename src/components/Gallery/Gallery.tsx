import styles from "./Gallery.module.scss";
import { IconChevronUp } from "@tabler/icons-react";

export default function Gallery() {
  return (
    <div className={styles.gallery}>
      <header>
        <span>🖼️ Gallery</span>
        <IconChevronUp />
      </header>
      <div></div>
    </div>
  );
}
