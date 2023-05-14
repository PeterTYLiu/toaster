import type { SceneType } from "./hooks/UseSceneContext";
import { Node, type Camera } from "./App";

function editPropertiesOnNodeById(
  nodes: Node[],
  id: string,
  properties: Partial<Node>
): Node[] {
  // Loop through nodes
  const thisNode = nodes.find((node) => node.id === id);
  const nodesToReturn = structuredClone(nodes) as Node[];
  if (thisNode) {
    const index = nodes.indexOf(thisNode);
    nodesToReturn[index] = { ...thisNode, ...properties };
  } else {
    nodesToReturn.forEach((node) => {
      node.children = editPropertiesOnNodeById(node.children, id, properties);
    });
  }
  return nodesToReturn;
}

function deleteNodeById(nodes: Node[], id: string): Node[] {
  // Loop through nodes
  const nodeToDelete = nodes.find((node) => node.id === id);
  const nodesToReturn = [...nodes];
  if (nodeToDelete) {
    const index = nodes.indexOf(nodeToDelete);
    nodesToReturn.splice(index, 1);
  } else {
    nodesToReturn.forEach((node) => {
      node.children = deleteNodeById(node.children, id);
    });
  }
  return nodesToReturn;
}

function findNodeById(nodes: Node[], id: string | null): Node | undefined {
  // Loop through nodes
  const thisNode = nodes.find((node) => node.id === id);
  if (thisNode) return thisNode;
  // Loop through nested nodes
  for (const node of nodes) {
    const foundChildNode = findNodeById(node.children, id);
    if (foundChildNode) return foundChildNode;
  }
}

interface BaseAction {
  type: string;
  payload: unknown;
}

interface UpdateNodeByIdAction extends BaseAction {
  type: "updateNodeById";
  payload: { id: string | null; properties: Partial<Node> };
}

interface SetActiveNodeIdAction extends BaseAction {
  type: "setActiveNodeId";
  payload: string | null; // String denotes a node ID
}

interface UpdateCameraAction extends BaseAction {
  type: "updateCamera";
  payload: Partial<Camera>;
}

interface NewNodeAction extends BaseAction {
  type: "newNode";
  payload: { properties: Partial<Node>; parentId?: string }; // Undefined parent ID means a top-level node
}

interface DeleteNodeByIdAction extends BaseAction {
  type: "deleteNodeById";
  payload: string; // This is the node ID
}

interface SetHoverNodeIdAction extends BaseAction {
  type: "setHoverNodeId";
  payload: string | null; // String denotes a node ID
}

export type Action =
  | UpdateNodeByIdAction
  | SetActiveNodeIdAction
  | UpdateCameraAction
  | NewNodeAction
  | DeleteNodeByIdAction
  | SetHoverNodeIdAction;

export function sceneReducer(oldScene: SceneType, action: Action): SceneType {
  const { type, payload } = action;
  const { activeNodeId: oldActiveNodeId, nodes: oldNodes } = oldScene;

  switch (type) {
    case "updateCamera":
      return { ...oldScene, camera: { ...oldScene.camera, ...payload } };
    case "setActiveNodeId":
      return { ...oldScene, activeNodeId: payload };
    case "setHoverNodeId":
      return { ...oldScene, hoverNodeId: payload };
    case "updateNodeById":
      if (!payload.id) return oldScene;
      const nodesToReturn = editPropertiesOnNodeById(
        oldNodes,
        payload.id,
        payload.properties
      );
      return { ...oldScene, nodes: nodesToReturn };
    case "newNode":
      const newNode = new Node(payload.properties);

      const parentNode = findNodeById(oldNodes, payload.parentId ?? null);

      if (!payload.parentId || !parentNode)
        return {
          ...oldScene,
          nodes: [...oldNodes, newNode],
          activeNodeId: newNode.id,
        };
      return {
        ...oldScene,
        nodes: editPropertiesOnNodeById(oldNodes, payload.parentId, {
          children: [...parentNode.children, newNode],
        }),
        activeNodeId: newNode.id,
      };
    case "deleteNodeById":
      return {
        ...oldScene,
        nodes: deleteNodeById(oldNodes, payload),
        activeNodeId: oldActiveNodeId === payload ? null : oldActiveNodeId,
      };
  }
}
