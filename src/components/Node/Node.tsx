import { Node as NodeClass } from "../../App";
import styles from "./Node.module.scss";
import Sphere from "../Sphere/Sphere";
import RectPrism from "../RectPrism/RectPrism";
import useSceneContext from "../../hooks/UseSceneContext";

export function Node({ node }: { node: NodeClass }) {
  const { dispatch, activeNodeId } = useSceneContext();

  const polygonVariables: Record<string, string> = {
    "--width": node.width + "px",
    "--height": node.height + "px",
    "--depth": node.depth + "px",
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
        transform: `scale3d(${node.scaleX}, ${node.scaleY}, ${node.scaleZ})`,
      }}
    >
      {node.type !== "group" && (
        <div className={styles.polygon} style={polygonVariables}>
          {node.type === "rectPrism" && <RectPrism />}
          {node.type === "sphere" && <Sphere id={node.id} />}
        </div>
      )}

      {node.children.map((child) => (
        <Node node={child} key={child.id} />
      ))}
    </div>
  );
}
