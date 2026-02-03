import type { CSSProperties, ReactElement } from "react";
import styles from "./Sphere.module.css";

export default function Sphere({ resolution = 8 }: { id: string; resolution?: number }) {
  const numOfLayers = resolution;
  const facesPerLayer = numOfLayers * 2;

  const faces: ReactElement[] = [];
  const normalizedFaceSideLength = 2 * Math.sin(Math.PI / facesPerLayer);

  for (let layer = 0; layer < numOfLayers; layer++) {
    const xAngle = (layer * 180) / numOfLayers + 90 / numOfLayers;
    // Use these to actually shape the faces in the future
    // const bottomRadiusAtThisLayer = Math.cos(Math.PI / 2 - Math.PI * ((layer + 1) / numOfLayers));
    // const topRadiusAtThisLayer = Math.cos(Math.PI / 2 - Math.PI * (layer / numOfLayers));
    for (let face = 0; face < facesPerLayer; face++) {
      const zAngle = (face * 360) / facesPerLayer;
      faces.push(
        <div
          className={styles.face}
          key={`${face}-${layer}`}
          style={
            {
              "--layers": numOfLayers,
              "--normalized-face-side-length": normalizedFaceSideLength,
              transform: `rotateZ(${zAngle}deg) rotateX(${xAngle}deg)`,
            } as CSSProperties
          }
        />,
      );
    }
  }

  return <>{faces}</>;
}
