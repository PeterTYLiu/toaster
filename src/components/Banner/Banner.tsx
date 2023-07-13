import { IconX } from "@tabler/icons-react";
import styles from "./Banner.module.scss";
import { useRef } from "react";

export default function Banner() {
  const bannerRef = useRef<null | HTMLDialogElement>(null);
  return (
    <dialog className={styles.banner} open ref={bannerRef}>
      <div>
        <span>🛠️ View on a larger screen to use editor tools!</span>
        <button className="icon" onClick={() => bannerRef?.current?.close()}>
          <IconX size={18} />
        </button>
      </div>
    </dialog>
  );
}
