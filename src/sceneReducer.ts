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

function findParentNodeAndIndexByChildId(
  node: Node,
  id: string | null
): [Node, number] | undefined {
  // Loop through children
  const foundChild = node.children.find((child) => child.id === id);
  if (foundChild) {
    const index = node.children.indexOf(foundChild);
    return [node, index];
  }
  // Loop through children
  for (const child of node.children) {
    const foundGrandChildAndIndex = findParentNodeAndIndexByChildId(child, id);
    if (foundGrandChildAndIndex) return foundGrandChildAndIndex;
  }
}

function renewIdsOfBranchNodes(node: Node) {
  node.id = crypto.randomUUID();
  node.children.forEach((child) => renewIdsOfBranchNodes(child));
}

function findAllAncestorsByNodeId(
  nodes: Node[],
  id: string,
  ancestors: Node[] = []
): Node[] | undefined {
  for (const node of nodes) {
    if (node.id === id) return ancestors;

    const newAncestors = findAllAncestorsByNodeId(node.children, id, [
      ...ancestors,
      node,
    ]);
    if (newAncestors) return newAncestors;
  }

  return undefined;
}

interface BaseAction {
  type: string;
  payload: unknown;
}

interface setNodesAction extends BaseAction {
  type: "setNodes";
  payload: Node[];
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

interface CloneNodeAction extends BaseAction {
  type: "cloneNode";
  payload: string; // The ID of the node you're cloning
}

export type Action =
  | setNodesAction
  | UpdateNodeByIdAction
  | SetActiveNodeIdAction
  | UpdateCameraAction
  | NewNodeAction
  | DeleteNodeByIdAction
  | SetHoverNodeIdAction
  | CloneNodeAction;

export function sceneReducer(oldScene: SceneType, action: Action): SceneType {
  const { type, payload } = action;
  const { activeNodeId: oldActiveNodeId, nodes: oldNodes } = oldScene;

  switch (type) {
    case "setNodes":
      return { ...oldScene, nodes: payload };
    case "updateCamera":
      return { ...oldScene, camera: { ...oldScene.camera, ...payload } };
    case "setActiveNodeId": {
      if (!payload) return { ...oldScene, activeNodeId: payload };
      // The active node's ancestors need to have collapsed = false
      const nodesToReturn = structuredClone(oldNodes) as Node[];
      const nodesToEdit = findAllAncestorsByNodeId(nodesToReturn, payload);
      nodesToEdit?.forEach((n) => (n.collapsed = false));
      return { ...oldScene, activeNodeId: payload, nodes: nodesToReturn };
    }
    case "setHoverNodeId":
      return { ...oldScene, hoverNodeId: payload };
    case "updateNodeById": {
      if (!payload.id) return oldScene;
      const nodesToReturn = editPropertiesOnNodeById(
        oldNodes,
        payload.id,
        payload.properties
      );
      return { ...oldScene, nodes: nodesToReturn };
    }
    case "newNode": {
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
    }
    case "deleteNodeById":
      return {
        ...oldScene,
        nodes: deleteNodeById(oldNodes, payload),
        activeNodeId: oldActiveNodeId === payload ? null : oldActiveNodeId,
      };
    case "cloneNode": {
      const nodeToClone = findNodeById(oldNodes, payload);
      if (!nodeToClone) return oldScene;

      const clonedNode = structuredClone(nodeToClone) as Node;
      clonedNode.name += " clone";
      renewIdsOfBranchNodes(clonedNode);

      const topLevelIndex = oldNodes.indexOf(nodeToClone) + 1;

      // If it is a top level node
      if (topLevelIndex > 0) {
        const newNodes = [...oldNodes];
        newNodes.splice(topLevelIndex, 0, clonedNode);
        return {
          ...oldScene,
          nodes: newNodes,
          activeNodeId: clonedNode.id,
        };
      }

      let parentNode: Node | undefined = undefined;
      let index: number | undefined = undefined;
      for (const topLevelNode of oldNodes) {
        [parentNode, index] = findParentNodeAndIndexByChildId(
          topLevelNode,
          payload
        ) ?? [parentNode, index];
      }

      if (!parentNode || typeof index !== "number") return oldScene;

      const newChildNodes = [...parentNode.children];
      newChildNodes.splice(index + 1, 0, clonedNode);
      return {
        ...oldScene,
        nodes: editPropertiesOnNodeById(oldNodes, parentNode.id, {
          children: newChildNodes,
        }),
        activeNodeId: clonedNode.id,
      };
    }
  }
}
