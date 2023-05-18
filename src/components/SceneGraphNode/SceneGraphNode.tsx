import { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./SceneGraphNode.module.scss";
import {
  IconFolder,
  IconBox,
  IconInnerShadowTopRight,
  IconPyramid,
  IconCylinder,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

const iconSize = 18;

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();

  let icon = <IconFolder size={iconSize} />;

  switch (node.type) {
    case "cuboid":
      icon = <IconBox size={iconSize} />;
      break;
    case "sphere":
      icon = <IconInnerShadowTopRight size={iconSize} />;
      break;
    case "pyramid":
      icon = <IconPyramid size={iconSize} />;
      break;
    case "prism":
      icon = <IconCylinder size={iconSize} />;
      break;
  }

  return (
    <div
      id={node.id + "graph"}
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
        {node.children.length ? (
          <button
            className={styles.collapser}
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
            {node.collapsed ? (
              <IconChevronRight size={14} />
            ) : (
              <IconChevronDown size={14} />
            )}
          </button>
        ) : (
          <div className={styles["collapser-placeholder"]} />
        )}
        {icon}
        <span className={styles.name}>
          {node.name || `unnamed ${node.type}`}
        </span>
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
