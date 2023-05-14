import type { ReactNode, CSSProperties } from "react";
import styles from "./Pyramid.module.scss";

export default function Pyramid({
  baseSides,
  height,
  radius,
  id,
}: {
  baseSides: number;
  height: number;
  radius: number;
  id: string;
}) {
  const theta = (Math.PI * 2) / baseSides;
  const baseSideLength = radius * 2 * Math.sin(Math.PI / baseSides);
  const apothem = radius * Math.cos(Math.PI / baseSides);
  const sideHeight = Math.sqrt(apothem ** 2 + height ** 2);
  const sideInclination = (Math.atan(height / apothem) * 180) / Math.PI;

  const basePoints = [];
  for (let i = 0; i < baseSides; i++) {
    const angle = theta * i;

    const x = radius * Math.cos(angle) + radius;
    const y = radius * Math.sin(angle) + radius;
    basePoints.push(`${x},${y}`);
  }

  const sides: ReactNode[] = [];
  for (let i = 0; i < baseSides; i++) {
    let spokeRotationDegrees = (i * 360) / baseSides;
    if (baseSides % 2 === 0) spokeRotationDegrees += 180 / baseSides;

    sides.push(
      <div
        key={`${id}-${i}`}
        className={styles.spoke}
        style={{
          width: `${radius * 2}px`,
          left: `calc(50% - ${radius}px)`,
          transform: `rotateZ(${spokeRotationDegrees}deg)`,
        }}
      >
        <div
          className={styles.joint}
          style={{
            left: `${radius - apothem}px`,
            transform: `rotateY(-${sideInclination}deg)`,
          }}
        >
          <svg
            className={`${styles.face} ${styles.side}`}
            style={{
              width: baseSideLength + "px",
              height: sideHeight + "px",
              transform: `translateY(-${sideHeight / 2}px) translateX(${
                (sideHeight - baseSideLength) / 2
              }px) rotateZ(90deg)`,
            }}
          >
            <polygon
              points={`0,${sideHeight} ${
                baseSideLength / 2
              },0 ${baseSideLength},${sideHeight}`}
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <svg className={`${styles.face} ${styles.base}`}>
        <polygon points={basePoints.join(" ")} />
      </svg>
      {sides}
    </>
  );
}
