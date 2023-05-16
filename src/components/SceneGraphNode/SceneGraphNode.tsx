import { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./SceneGraphNode.module.scss";
import {
  IconFolder,
  IconBox,
  IconInnerShadowTopRight,
  IconPyramid,
} from "@tabler/icons-react";

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();

  let icon = <IconFolder size={20} />;

  switch (node.type) {
    case "cuboid":
      icon = <IconBox size={20} />;
      break;
    case "sphere":
      icon = <IconInnerShadowTopRight size={20} />;
      break;
    case "pyramid":
      icon = <IconPyramid size={20} />;
      break;
  }

  return (
    <div
      className={`${styles.node} ${
        activeNodeId === node.id ? styles.active : ""
      }`}
    >
      <div
        className={styles.parent}
        title={node.name}
        onClick={() => {
          dispatch({
            type: "setActiveNodeId",
            payload: activeNodeId === node.id ? null : node.id,
          });
        }}
        onPointerEnter={() => {
          dispatch({
            type: "setHoverNodeId",
            payload: node.id,
          });
        }}
        onPointerLeave={() => {
          dispatch({
            type: "setHoverNodeId",
            payload: null,
          });
        }}
      >
        {icon}
        <span className={styles.name}>
          {node.name || `unnamed ${node.type}`}
        </span>
      </div>
      <div className={styles.children}>
        {node.children.map((child) => (
          <SceneGraphNode node={child} key={child.id} />
        ))}
      </div>
    </div>
  );
}
