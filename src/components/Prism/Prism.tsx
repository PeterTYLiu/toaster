import type { ReactNode } from "react";
import styles from "./Prism.module.scss";

export default function Prism({
  baseSides,
  height,
  radius,
  id,
  holeRadius,
}: {
  baseSides: number;
  height: number;
  radius: number;
  id: string;
  holeRadius: number;
}) {
  const theta = (Math.PI * 2) / baseSides;

  const baseSideLength = radius * 2 * Math.sin(Math.PI / baseSides);
  const apothem = radius * Math.cos(Math.PI / baseSides);

  const holeApothem = -holeRadius * Math.cos(Math.PI / baseSides);
  const holeSideLength = holeRadius * 2 * Math.sin(Math.PI / baseSides);

  const basePoints: string[] = [];
  const baseHolePoints: string[] = [];
  const sides: ReactNode[] = [];

  for (let i = 0; i < baseSides; i++) {
    // Add a point on the base
    const angle = theta * i;
    const x = radius * Math.cos(angle) + radius;
    const y = radius * Math.sin(angle) + radius;
    basePoints.push(`${x},${y}`);

    if (holeRadius) {
      const holeX = holeRadius * Math.cos(angle) + radius;
      const holeY = holeRadius * Math.sin(angle) + radius;
      baseHolePoints.push(`${holeX},${holeY}`);
    }

    // Add a side of the prism
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
          className={styles.side}
          style={{
            left: `${radius - apothem}px`,
            top: `-${baseSideLength / 2 - 1}px`,
            translate: `-${height / 2}px 0 ${height / 2}px`,
            height: baseSideLength + "px",
            width: height + "px",
          }}
        />

        {!!holeRadius && (
          <div
            className={styles.side}
            style={{
              left: `${radius + holeApothem}px`,
              top: `-${holeSideLength / 2 - 1}px`,
              translate: `-${height / 2}px 0 ${height / 2}px`,
              height: holeSideLength + "px",
              width: height + "px",
            }}
          />
        )}
      </div>
    );
  }

  let pathPoints = `M ${basePoints.join(" L ")} Z`;
  if (holeRadius) pathPoints += ` M ${baseHolePoints.join(" L ")} Z`;

  const path = <path fillRule="evenodd" stroke="black" d={pathPoints} />;

  return (
    <>
      <svg className={`${styles.face} ${styles.base}`}>{path}</svg>
      <svg className={`${styles.face} ${styles.top}`}>{path}</svg>
      {sides}
    </>
  );
}
