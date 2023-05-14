import { type Dispatch, createContext, useContext } from "react";
import type { Node, Camera } from "../App";
import type { Action } from "../sceneReducer";

export interface SceneType {
  camera: Camera;
  nodes: Node[];
  activeNodeId: string | null;
  hoverNodeId: string | null;
}

export interface SceneContextType extends SceneType {
  dispatch: Dispatch<Action>;
}

const defaultSceneContext: SceneContextType = {
  camera: { zoom: 1, rotateX: 0, rotateZ: 0 },
  nodes: [],
  activeNodeId: null,
  hoverNodeId: null,
  dispatch: () => {},
};

export const SceneContext = createContext(defaultSceneContext);

export default function useSceneContext() {
  return useContext(SceneContext);
}
