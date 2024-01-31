import { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./SceneGraphNode.module.css";
import { nodeTypesMap, smallIconSize } from "../../nodeProperties";
import { IconChevronDown, IconChevronRight, IconLink } from "@tabler/icons-react";

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();

  return (
    <div id={node.id + "graph"} className={`${styles.node} ${activeNodeId === node.id ? styles.active : ""}`}>
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
        {node.children.length ? (
          <button
            className={styles.collapser}
            aria-label={`Collpase ${node.name}`}
            aria-pressed={node.collapsed}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "updateNodeById",
                payload: {
                  id: node.id,
                  properties: { collapsed: !node.collapsed },
                },
              });
            }}
          >
            {node.collapsed ? <IconChevronRight size={14} /> : <IconChevronDown size={14} />}
          </button>
        ) : (
          <div className={styles["collapser-placeholder"]} />
        )}
        {node.instanceOf ? <IconLink size={smallIconSize} color="#5ff" /> : nodeTypesMap[node.type].icon}
        <span className={styles.name}>{node.name || `unnamed ${node.type}`}</span>
      </div>
      {!!node.children.length && !node.collapsed && (
        <div className={styles.children}>
          {node.children.map((child) => (
            <SceneGraphNode node={child} key={child.id} />
          ))}
        </div>
      )}
    </div>
  );
}
