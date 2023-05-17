import styles from "./Null.module.scss";
import Cuboid from "../Cuboid/Cuboid";
import type { CSSProperties } from "react";

export default function Null() {
  return (
    <div
      style={
        {
          "--width": "2px",
          "--height": "30px",
          "--depth": "2px",
        } as CSSProperties
      }
    >
      <div className={styles.x}>
        <Cuboid />
      </div>
      <div className={styles.y}>
        <Cuboid />
      </div>
      <div className={styles.z}>
        <Cuboid />
      </div>
    </div>
  );
}
