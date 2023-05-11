import { CSSProperties, ReactNode } from "react";
import styles from "./Sphere.module.scss";

export default function Sphere({
  numPlanes = 12,
  numSpokes = 24,
  id,
}: {
  id: string;
  numPlanes?: number;
  numSpokes?: number;
}) {
  const planes: ReactNode[] = [];
  for (let i = 0; i < numPlanes; i++) {
    const spokes: ReactNode[] = [];

    for (let j = 0; j < numSpokes; j++) {
      spokes.push(
        <div
          key={`${id}-${i}-${j}`}
          className={styles.spoke}
          style={{ "--spoke": j } as CSSProperties}
        >
          <div className={styles.face} />
        </div>
      );
    }

    planes.push(
      <div
        key={`${id}-${i}`}
        className={styles.plane}
        style={
          {
            "--plane": i,
            "--planes": numPlanes,
            "--spokes": numSpokes,
          } as CSSProperties
        }
      >
        {spokes}
      </div>
    );
  }

  return <>{planes}</>;
}
