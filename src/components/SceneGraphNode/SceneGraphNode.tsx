import { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./SceneGraphNode.module.scss";

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();
  return (
    <div
      className={`${styles.node} ${
        activeNodeId === node.id ? styles.active : ""
      }`}
    >
      <div className={styles.parent}>
        <button
          onClick={() => {
            dispatch({
              type: "setActiveNodeId",
              payload: activeNodeId === node.id ? null : node.id,
            });
          }}
        >
          {node.name || `unnamed ${node.type}`}
        </button>
      </div>
      <div className={styles.children}>
        {node.children.map((child) => (
          <SceneGraphNode node={child} key={child.id} />
        ))}
      </div>
    </div>
  );
}
