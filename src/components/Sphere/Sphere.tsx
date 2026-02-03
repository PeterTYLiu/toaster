import type { CSSProperties, ReactElement } from "react";
import styles from "./Sphere.module.css";

export default function Sphere({ resolution = 5 }: { id: string; resolution?: number }) {
  const facesPerLayer = 4 * resolution;
  const numOfLayers = 2 * resolution;

  const faces: ReactElement[] = [];
  const faceHeight = 2 * Math.sin(Math.PI / (numOfLayers * 2));
  const faceWidthFactor = 2 * Math.sin(Math.PI / facesPerLayer);

  for (let layer = 0; layer < numOfLayers; layer++) {
    const xAngle = (layer * 180) / numOfLayers + 90 / numOfLayers;
    const bottomRadiusAtThisLayer = Math.cos(Math.PI / 2 - Math.PI * ((layer + 1) / numOfLayers));
    // const topRadiusAtThisLayer = Math.cos(Math.PI / 2 - Math.PI * (layer / numOfLayers));
    for (let face = 0; face < facesPerLayer; face++) {
      const zAngle = (face * 360) / facesPerLayer;
      faces.push(
        <div
          className={styles.face}
          key={`${face}-${layer}`}
          data-id={bottomRadiusAtThisLayer}
          style={
            {
              "--layers": numOfLayers,
              width: `calc(var(--radius) * ${faceWidthFactor})`,
              transform: `rotateZ(${zAngle}deg) rotateX(${xAngle}deg)`,
              height: `calc(var(--radius) * ${faceHeight})`,
            } as CSSProperties
          }
        />,
        // Make this work in the future
        // <svg
        //   className={styles.face}
        //   key={`${face}-${layer}`}
        //   data-id={bottomRadiusAtThisLayer}
        //   style={
        //     {
        //       "--layers": numOfLayers,
        //       width: `calc(var(--radius) * ${faceWidthFactor})`,
        //       transform: `rotateZ(${zAngle}deg) rotateX(${xAngle}deg)`,
        //       height: `calc(var(--radius) * ${faceHeight})`,
        //     } as CSSProperties
        //   }
        // >
        //   <polygon points={`0,0 1,1 1,1 0`} />
        // </svg>,
      );
    }
  }

  return <>{faces}</>;
}
