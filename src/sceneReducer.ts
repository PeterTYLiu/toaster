import type { SceneType } from "./hooks/UseSceneContext";
import { Node, type Camera } from "./App";

function editPropertiesOnNodeById(nodes: Node[], id: string, properties: Partial<Node>): Node[] {
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

function deleteNodeById(nodes: Node[], id: string) {
  // Loop through nodes
  const nodeToDelete = nodes.find((node) => node.id === id);
  if (nodeToDelete) {
    const index = nodes.indexOf(nodeToDelete);
    nodes.splice(index, 1);
  } else {
    nodes.forEach((node) => {
      node.children = deleteNodeById(node.children, id);
    });
  }
  return nodes;
}

export function findNodeById(nodes: Node[], id: string | null): Node | undefined {
  // Loop through nodes
  const thisNode = nodes.find((node) => node.id === id);
  if (thisNode) return thisNode;
  // Loop through nested nodes
  for (const node of nodes) {
    const foundChildNode = findNodeById(node.children, id);
    if (foundChildNode) return foundChildNode;
  }
}

function findFirstInstanceOf(nodes: Node[], id: string): Node | undefined {
  // Loop through nodes
  const thisNode = nodes.find((node) => node.instanceOf === id);
  if (thisNode) return thisNode;
  // Loop through nested nodes
  for (const node of nodes) {
    const foundChildNode = findFirstInstanceOf(node.children, id);
    if (foundChildNode) return foundChildNode;
  }
}

function findParentNodeAndIndexByChildId(node: Node, id: string | null): [Node, number] | undefined {
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

function renewIdsOfBranchNodes(nodes: Node[]) {
  nodes.forEach((node) => {
    const newNodeId = crypto.randomUUID();

    while (findFirstInstanceOf(nodes, node.id)) {
      const instance = findFirstInstanceOf(nodes, node.id);
      if (!instance) continue;
      instance.instanceOf = newNodeId;
    }

    node.id = newNodeId;

    renewIdsOfBranchNodes(node.children);
  });
}

function findAllAncestorsByNodeId(nodes: Node[], id: string, ancestors: Node[] = []): Node[] | undefined {
  for (const node of nodes) {
    if (node.id === id) return ancestors;

    const newAncestors = findAllAncestorsByNodeId(node.children, id, [...ancestors, node]);
    if (newAncestors) return newAncestors;
  }

  return undefined;
}

function scrollSceneGraphNodeIntoView(id: string) {
  setTimeout(() => {
    const sceneGraphNode = document.getElementById(id + "graph");
    if (sceneGraphNode) sceneGraphNode.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 50);
}

interface BaseAction {
  type: string;
  payload: unknown;
}

interface SetNodesAction extends BaseAction {
  type: "setNodes";
  payload: Node[] | Node;
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

interface InsertNodeAction extends BaseAction {
  type: "insertNode";
  payload: { nodes: Node | Node[]; parentId?: string };
}

interface NewInstanceAction extends BaseAction {
  type: "newInstance";
  payload: string; // The ID of the node being instanced
}

interface DetachInstanceAction extends BaseAction {
  type: "detachInstance";
  payload: string; // The ID of the instance being detached
}

interface SetWireframeModeAction extends BaseAction {
  type: "setWireframeMode";
  payload: boolean;
}

export type Action =
  | SetNodesAction
  | UpdateNodeByIdAction
  | SetActiveNodeIdAction
  | UpdateCameraAction
  | NewNodeAction
  | DeleteNodeByIdAction
  | SetHoverNodeIdAction
  | CloneNodeAction
  | InsertNodeAction
  | NewInstanceAction
  | DetachInstanceAction
  | SetWireframeModeAction;

export function sceneReducer(oldScene: SceneType, action: Action): SceneType {
  const { type, payload } = action;
  const { activeNodeId: oldActiveNodeId, nodes: oldNodes } = oldScene;

  switch (type) {
    case "setNodes": {
      const nodesToSet = structuredClone(payload) as Node | Node[];

      return {
        ...oldScene,
        nodes: Array.isArray(nodesToSet) ? nodesToSet : [nodesToSet],
        activeNodeId: null,
      };
    }
    case "updateCamera":
      return { ...oldScene, camera: { ...oldScene.camera, ...payload } };
    case "setActiveNodeId": {
      if (!payload) return { ...oldScene, activeNodeId: payload };
      // The active node's ancestors need to have collapsed = false
      const nodesToReturn = structuredClone(oldNodes) as Node[];
      const nodesToEdit = findAllAncestorsByNodeId(nodesToReturn, payload);
      nodesToEdit?.forEach((n) => (n.collapsed = false));
      scrollSceneGraphNodeIntoView(payload);
      return { ...oldScene, activeNodeId: payload, nodes: nodesToReturn };
    }
    case "setHoverNodeId":
      return { ...oldScene, hoverNodeId: payload };
    case "updateNodeById": {
      if (!payload.id) return oldScene;
      const nodesToReturn = editPropertiesOnNodeById(oldNodes, payload.id, payload.properties);
      return { ...oldScene, nodes: nodesToReturn };
    }
    case "newNode": {
      const newNode = new Node(payload.properties);

      const parentNode = findNodeById(oldNodes, payload.parentId ?? null);

      scrollSceneGraphNodeIntoView(newNode.id);

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
      const instance = findFirstInstanceOf(oldNodes, payload);

      if (instance) {
        if (!confirm("This will delete all instances of this node. Continue?")) return oldScene;
      }

      const nodesToReturn = [...oldNodes];

      // Delete all instances
      while (findFirstInstanceOf(nodesToReturn, payload)) {
        deleteNodeById(nodesToReturn, findFirstInstanceOf(nodesToReturn, payload)?.id ?? "arbitraryString");
      }

      deleteNodeById(nodesToReturn, payload);

      return {
        ...oldScene,
        nodes: nodesToReturn,
        activeNodeId: oldActiveNodeId === payload ? null : oldActiveNodeId,
      };
    case "cloneNode": {
      const nodeToClone = findNodeById(oldNodes, payload);
      if (!nodeToClone) return oldScene;

      const clonedNode = structuredClone(nodeToClone) as Node;
      clonedNode.name += " clone";
      clonedNode.translateX += 100;
      renewIdsOfBranchNodes([clonedNode]);
      scrollSceneGraphNodeIntoView(clonedNode.id);

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
        [parentNode, index] = findParentNodeAndIndexByChildId(topLevelNode, payload) ?? [parentNode, index];
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
    case "insertNode": {
      const nodesToInsert = structuredClone(payload.nodes) as Node | Node[];

      if (Array.isArray(nodesToInsert)) {
        renewIdsOfBranchNodes(nodesToInsert);

        if (payload.parentId) {
          const parentNode = findNodeById(oldNodes, payload.parentId);
          if (!parentNode) return oldScene;
          return {
            ...oldScene,
            nodes: editPropertiesOnNodeById(oldNodes, payload.parentId, {
              children: [...parentNode.children, ...nodesToInsert],
            }),
          };
        }

        return { ...oldScene, nodes: [...oldNodes, ...nodesToInsert] };
      }

      renewIdsOfBranchNodes([nodesToInsert]);

      scrollSceneGraphNodeIntoView(nodesToInsert.id);

      if (payload.parentId) {
        const parentNode = findNodeById(oldNodes, payload.parentId);
        if (!parentNode) return oldScene;
        return {
          ...oldScene,
          nodes: editPropertiesOnNodeById(oldNodes, payload.parentId, {
            children: [...parentNode.children, nodesToInsert],
          }),
          activeNodeId: nodesToInsert.id,
        };
      }

      return {
        ...oldScene,
        nodes: [...oldNodes, nodesToInsert],
        activeNodeId: nodesToInsert.id,
      };
    }
    case "newInstance": {
      const nodeToInstance = findNodeById(oldNodes, payload);
      if (!nodeToInstance) return oldScene;

      const newInstance = structuredClone(nodeToInstance) as Node;

      newInstance.id = crypto.randomUUID();
      newInstance.name += " instance";
      newInstance.children = [];
      newInstance.instanceOf = nodeToInstance.id;
      newInstance.translateX += 100;

      scrollSceneGraphNodeIntoView(newInstance.id);

      const topLevelIndex = oldNodes.indexOf(nodeToInstance) + 1;

      // If it is a top level node
      if (topLevelIndex > 0) {
        const newNodes = [...oldNodes];
        newNodes.splice(topLevelIndex, 0, newInstance);
        return {
          ...oldScene,
          nodes: newNodes,
          activeNodeId: newInstance.id,
        };
      }

      let parentNode: Node | undefined = undefined;
      let index: number | undefined = undefined;
      for (const topLevelNode of oldNodes) {
        [parentNode, index] = findParentNodeAndIndexByChildId(topLevelNode, payload) ?? [parentNode, index];
      }

      if (!parentNode || typeof index !== "number") return oldScene;

      const newChildNodes = [...parentNode.children];
      newChildNodes.splice(index + 1, 0, newInstance);
      return {
        ...oldScene,
        nodes: editPropertiesOnNodeById(oldNodes, parentNode.id, {
          children: newChildNodes,
        }),
        activeNodeId: newInstance.id,
      };
    }
    case "detachInstance": {
      const instanceToDetach = findNodeById(oldNodes, payload);
      if (!instanceToDetach || !instanceToDetach.instanceOf) return oldScene;

      const motherNode = findNodeById(oldNodes, instanceToDetach.instanceOf);
      if (!motherNode) return oldScene;

      const newChildren = structuredClone(motherNode.children) as Node[];
      renewIdsOfBranchNodes(newChildren);

      return {
        ...oldScene,
        nodes: editPropertiesOnNodeById(oldNodes, instanceToDetach.id, {
          name: "Detached " + instanceToDetach.name,
          children: newChildren,
          instanceOf: undefined,
          color: motherNode.color,
          borderColor: motherNode.borderColor,
          width: motherNode.width,
          height: motherNode.height,
          depth: motherNode.depth,
          baseSides: motherNode.baseSides,
          radius: motherNode.radius,
          holeRadius: motherNode.holeRadius,
        }),
      };
    }
    case "setWireframeMode": {
      return {
        ...oldScene,
        wireframe: payload,
      };
    }
  }
}
