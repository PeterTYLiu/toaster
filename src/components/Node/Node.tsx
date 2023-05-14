import { Node as NodeClass } from "../../App";
import styles from "./Node.module.scss";
import Sphere from "../Sphere/Sphere";
import RectPrism from "../RectPrism/RectPrism";
import Pyramid from "../Pryamid/Pyramid";
import useSceneContext from "../../hooks/UseSceneContext";

export function Node({ node }: { node: NodeClass }) {
  const { dispatch, activeNodeId } = useSceneContext();

  const solidVariables: Record<string, string> = {
    "--width": node.width + "px",
    "--height": node.height + "px",
    "--depth": node.depth + "px",
    "--radius": node.radius + "px",
  };

  // These variables are inherited from its parent and/or passed on to its children
  const inheitedVariables: Record<string, string> = {};
  if (node.borderColor) inheitedVariables["--borderColor"] = node.borderColor;
  if (node.color) inheitedVariables["--bg"] = node.color;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (activeNodeId === node.id)
          dispatch({ type: "setActiveNodeId", payload: null });
        else dispatch({ type: "setActiveNodeId", payload: node.id });
      }}
      className={`${styles.node} ${
        activeNodeId === node.id ? styles.active : ""
      }`}
      style={{
        ...inheitedVariables,
        translate: `${node.translateX}px ${node.translateY}px ${node.translateZ}px`,
        transform: `rotateX(${node.rotateX}deg) rotateY(${node.rotateY}deg) rotateZ(${node.rotateZ}deg) scale3d(${node.scaleX}, ${node.scaleY}, ${node.scaleZ}) `,
      }}
    >
      {node.type !== "group" && (
        <div className={styles.solid} style={solidVariables}>
          {node.type === "rectPrism" && <RectPrism />}
          {node.type === "sphere" && <Sphere id={node.id} />}
          {node.type === "pyramid" && (
            <Pyramid
              baseSides={node.baseSides}
              radius={node.radius}
              height={node.height}
              id={node.id}
            />
          )}
        </div>
      )}

      {node.children.map((child) => (
        <Node node={child} key={child.id} />
      ))}
    </div>
  );
}
