import { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./SceneGraphNode.module.scss";
import { IconFolder, IconBox, IconWorld } from "@tabler/icons-react";

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();

  let icon = <IconFolder />;

  switch (node.type) {
    case "rectPrism":
      icon = <IconBox />;
      break;
    case "sphere":
      icon = <IconWorld />;
      break;
  }

  return (
    <div
      className={`${styles.node} ${
        activeNodeId === node.id ? styles.active : ""
      }`}
    >
      <div className={styles.parent}>
        <span
          onClick={() => {
            dispatch({
              type: "setActiveNodeId",
              payload: activeNodeId === node.id ? null : node.id,
            });
          }}
        >
          {icon}
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
