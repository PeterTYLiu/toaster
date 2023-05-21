import { Node as NodeClass } from "../../App";
import styles from "./Node.module.scss";
import Sphere from "../Sphere/Sphere";
import Cuboid from "../Cuboid/Cuboid";
import Pyramid from "../Pryamid/Pyramid";
import Prism from "../Prism/Prism";
import Null from "../Null/Null";
import useSceneContext from "../../hooks/UseSceneContext";
import { findNodeById } from "../../sceneReducer";

function findFurthestAncestor(
  element: Element,
  selector: string
): Element | undefined {
  if (!element.parentElement) {
    return undefined; // Reached the topmost ancestor without a match
  }

  const closestAncestor = element.parentElement.closest(selector);

  if (!closestAncestor) {
    return element.matches(selector) ? element : undefined; // No match, return the current element if it matches
  }

  return findFurthestAncestor(closestAncestor, selector); // Continue recursively searching
}

export function Node({ node }: { node: NodeClass }) {
  const { dispatch, activeNodeId, hoverNodeId, nodes } = useSceneContext();

  const targetNode = node.instanceOf
    ? findNodeById(nodes, node.instanceOf) ?? node
    : node;

  const solidVariables: Record<string, string> = {
    "--width": targetNode.width + "px",
    "--height": targetNode.height + "px",
    "--depth": targetNode.depth + "px",
    "--radius": targetNode.radius + "px",
  };

  // These variables are inherited from its parent and/or passed on to its children
  const inheitedVariables: Record<string, string> = {};
  if (targetNode.color) inheitedVariables["--bg"] = targetNode.color;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (activeNodeId === node.id)
          dispatch({ type: "setActiveNodeId", payload: null });

        // Check to see if the clicked element is a child of an instance;
        // if so, set the entire instance as selected
        const ancestorInstance = findFurthestAncestor(
          e.target as Element,
          "[data-instance-of]"
        );

        if (!ancestorInstance) {
          return dispatch({ type: "setActiveNodeId", payload: node.id });
        }

        if (activeNodeId === ancestorInstance.getAttribute("data-node-id"))
          dispatch({ type: "setActiveNodeId", payload: null });
        else
          dispatch({
            type: "setActiveNodeId",
            payload: ancestorInstance.getAttribute("data-node-id"),
          });
      }}
      data-instance-of={node.instanceOf}
      data-node-id={node.id}
      className={`${styles.node} ${
        activeNodeId === node.id || activeNodeId === node.instanceOf
          ? styles.active
          : ""
      } ${hoverNodeId === node.id ? styles.hovered : ""}`}
      style={{
        ...inheitedVariables,
        translate: `${node.translateX}px ${node.translateY}px ${node.translateZ}px`,
        transform: `rotateX(${node.rotateX}deg) rotateY(${node.rotateY}deg) rotateZ(${node.rotateZ}deg) scale3d(${node.scaleX}, ${node.scaleY}, ${node.scaleZ}) `,
      }}
    >
      {node.type !== "group" && (
        <div className={styles.solid} style={solidVariables}>
          {node.type === "cuboid" && <Cuboid />}
          {node.type === "sphere" && <Sphere id={node.id} />}
          {node.type === "pyramid" && (
            <Pyramid
              baseSides={targetNode.baseSides}
              radius={targetNode.radius}
              height={targetNode.height}
              id={node.id}
            />
          )}
          {node.type === "prism" && (
            <Prism
              baseSides={targetNode.baseSides}
              radius={targetNode.radius}
              height={targetNode.height}
              id={node.id}
              holeRadius={targetNode.holeRadius ?? 0}
            />
          )}
        </div>
      )}

      {activeNodeId === node.id && node.type === "group" && <Null />}

      {targetNode.children.map((child) => (
        <Node node={child} key={child.id + node.id} />
      ))}
    </div>
  );
}
