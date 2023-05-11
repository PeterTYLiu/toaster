import type { SceneType } from "./hooks/UseSceneContext";
import { Node, type Camera } from "./App";

function editPropertiesOnNodeById(
  nodes: Node[],
  id: string,
  properties: Partial<Node>
): Node[] {
  // Loop through nodes
  const thisNode = nodes.find((node) => node.id === id);
  const nodesToReturn = [...nodes];
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

interface NewTopLevelNodeAction extends BaseAction {
  type: "newTopLevelNode";
  payload: Node["type"];
}

interface DeleteNodeByIdAction extends BaseAction {
  type: "deleteNodeById";
  payload: string; // This is the node ID
}

export type Action =
  | UpdateNodeByIdAction
  | SetActiveNodeIdAction
  | UpdateCameraAction
  | NewTopLevelNodeAction
  | DeleteNodeByIdAction;

export function sceneReducer(oldScene: SceneType, action: Action): SceneType {
  const { type, payload } = action;
  const { activeNodeId: oldActiveNodeId, nodes: oldNodes } = oldScene;

  switch (type) {
    case "updateCamera":
      return { ...oldScene, camera: { ...oldScene.camera, ...payload } };
    case "setActiveNodeId":
      return { ...oldScene, activeNodeId: payload };
    case "updateNodeById":
      if (!payload.id) return oldScene;
      const nodesToReturn = editPropertiesOnNodeById(
        oldNodes,
        payload.id,
        payload.properties
      );
      return { ...oldScene, nodes: nodesToReturn };
    case "newTopLevelNode":
      const newNode = new Node(payload);
      return {
        ...oldScene,
        nodes: [...oldNodes, newNode],
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
