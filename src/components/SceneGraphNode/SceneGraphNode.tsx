import { IconArrowUpRight, IconChevronDown, IconChevronRight, IconCopy, IconLink, IconTrash, IconUnlink } from "@tabler/icons-react";
import { CSSProperties, useRef, type MouseEventHandler } from "react";
import type { Node } from "../../App";
import useSceneContext from "../../hooks/UseSceneContext";
import { nodeTypesMap, smallIconSize } from "../../nodeProperties";
import styles from "./SceneGraphNode.module.css";

export default function SceneGraphNode({ node }: { node: Node }) {
  const { dispatch, activeNodeId } = useSceneContext();
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const contextMenuAnchorName = "--" + node.id + "anchor";

  const showContextMenu: MouseEventHandler = (e) => {
    e.preventDefault();
    // Necessary because of https://github.com/whatwg/html/issues/10905
    setTimeout(() => {
      contextMenuRef.current?.showPopover();
    }, 170);
  };

  const hideContextMenu = () => {
    contextMenuRef.current?.hidePopover();
  };

  return (
    <div
      id={node.id + "graph"}
      style={{ "--anchor-name": contextMenuAnchorName } as CSSProperties}
      className={`${styles.node} ${activeNodeId === node.id ? styles.active : ""}`}
    >
      <div
        onContextMenu={showContextMenu}
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
      <div popover="auto" ref={contextMenuRef} className={styles["context-menu"]}>
        <div>
          {!!node.instanceOf && (
            <>
              <button
                onClick={() => {
                  hideContextMenu();
                  dispatch({
                    type: "setActiveNodeId",
                    payload: node.instanceOf ?? null,
                  });
                }}
              >
                <IconArrowUpRight size={smallIconSize} />
                Go to mother node
              </button>
              <button
                onClick={() => {
                  hideContextMenu();
                  dispatch({
                    type: "detachInstance",
                    payload: node.id,
                  });
                }}
              >
                <IconUnlink size={smallIconSize} />
                Detach instance
              </button>
              <button
                onClick={() => {
                  hideContextMenu();
                  dispatch({
                    type: "cloneNode",
                    payload: node.id,
                  });
                }}
              >
                <IconCopy size={smallIconSize} />
                Duplicate instance
              </button>
            </>
          )}
          {!node.instanceOf && (
            <>
              <button
                onClick={() => {
                  hideContextMenu();
                  dispatch({
                    type: "newInstance",
                    payload: node.id,
                  });
                }}
              >
                <IconLink size={smallIconSize} />
                Create new instance
              </button>
              <button
                onClick={() => {
                  hideContextMenu();
                  dispatch({
                    type: "cloneNode",
                    payload: node.id,
                  });
                }}
              >
                <IconCopy size={smallIconSize} />
                Clone
              </button>
            </>
          )}
          <button
            onClick={() => {
              hideContextMenu();
              dispatch({
                type: "deleteNodeById",
                payload: node.id,
              });
            }}
          >
            <IconTrash size={smallIconSize} />
            Delete
          </button>
        </div>
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
