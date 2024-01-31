import { type CSSProperties, useReducer, useRef } from "react";
import styles from "./App.module.scss";
import SceneGraph from "./components/SceneGraph/SceneGraph";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import { Node as NodeComponent } from "./components/Node/Node";
import { SceneContext } from "./hooks/UseSceneContext";
import { sceneReducer } from "./sceneReducer";
import Links from "./components/Links/Links";
import { snowman } from "./models/snowman";
import Gallery from "./components/Gallery/Gallery";
import ModeSwitcher from "./components/ModeSwitcher/ModeSwitcher";
import Zoom from "./components/Zoom/Zoom";
import Banner from "./components/Banner/Banner";

type NodeType = "group" | "cuboid" | "prism" | "sphere" | "pyramid";

export class Node {
  // Identity
  id: string;
  name: string;
  type: NodeType;
  instanceOf?: string; // This references another node's ID
  // Styling
  color?: string | undefined;
  borderColor?: string | undefined;
  opacity: number;
  // Transforms
  translateX: number;
  translateY: number;
  translateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  // Dimensions
  width: number;
  height: number;
  depth: number;
  radius: number;
  holeRadius?: number;
  // Geometry
  baseSides: number;
  // Collapsed node in scene tree
  collapsed?: boolean;
  // Children
  children: Node[];

  constructor(input: Partial<Node>) {
    this.id = crypto.randomUUID();
    this.name = `New ${input.type ?? "cuboid"}`;
    this.type = input.type ?? "cuboid";
    this.instanceOf = input.instanceOf ?? undefined;
    this.translateX = input.translateX ?? 0;
    this.translateY = input.translateY ?? 0;
    this.translateZ = input.translateZ ?? 0;
    this.scaleX = input.scaleX ?? 1;
    this.scaleY = input.scaleY ?? 1;
    this.scaleZ = input.scaleZ ?? 1;
    this.rotateX = input.rotateX ?? 0;
    this.rotateY = input.rotateY ?? 0;
    this.rotateZ = input.rotateZ ?? 0;
    this.depth = input.depth ?? 200;
    this.width = input.width ?? 200;
    this.height = input.height ?? 200;
    this.radius = input.radius ?? 200;
    this.holeRadius = input.holeRadius ?? 0;
    this.opacity = input.opacity ?? 1;
    this.color = input.color ?? undefined;
    this.borderColor = input.borderColor ?? undefined;
    this.baseSides = 3;
    this.children = [];
  }
}

export interface Camera {
  zoom: number;
  rotateX: number;
  rotateZ: number;
  translateZ: number;
}

const defaultCamera: Camera = {
  zoom: 0.5,
  rotateX: 80,
  rotateZ: 10,
  translateZ: -150,
};

function App() {
  const [scene, dispatch] = useReducer(sceneReducer, {
    camera: defaultCamera,
    activeNodeId: null,
    nodes: snowman,
    hoverNodeId: null,
    wireframe: false,
  });
  const pointerDownCoords = useRef<[number, number]>([0, 0]);

  return (
    <SceneContext.Provider value={{ ...scene, dispatch }}>
      <nav className={styles.nav}>
        <div>
          <h1>🍞 Toaster</h1>
          <h2>Pure CSS 3D editor by Peter Liu</h2>
        </div>
        <Links />
      </nav>
      <Banner />
      <div className={styles.lower}>
        <SceneGraph />
        <div className={styles.workspace}>
          <main
            dir="ltr"
            className={styles.main}
            onPointerDown={(e) => {
              e.preventDefault();
              pointerDownCoords.current = [e.clientX, e.clientY];
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              if (e.clientX !== pointerDownCoords.current[0] || e.clientY !== pointerDownCoords.current[1]) return;
              dispatch({ type: "setActiveNodeId", payload: null });
            }}
            onWheel={(e) => {
              e.stopPropagation();
              const newZoom = scene.camera.zoom + e.deltaY / 180;
              dispatch({
                type: "updateCamera",
                payload: { zoom: newZoom },
              });
            }}
            onContextMenu={(e) => {
              if (e.ctrlKey) e.preventDefault();
            }}
            onPointerMove={(e) => {
              e.preventDefault();
              // Pan on ctrl + left click + drag
              if (e.buttons === 1 && e.ctrlKey) {
                return dispatch({
                  type: "updateCamera",
                  payload: {
                    translateZ: scene.camera.translateZ - e.movementY,
                  },
                });
              }
              // Rotate on left click + drag
              if (e.buttons === 1) {
                return dispatch({
                  type: "updateCamera",
                  payload: {
                    rotateZ: scene.camera.rotateZ - e.movementX,
                    rotateX: Math.min(Math.max(scene.camera.rotateX - e.movementY, 0), 87),
                  },
                });
              }
            }}
          >
            <div
              className={`${styles.world} animated`}
              id="world"
              style={
                {
                  "--rotate-x": `${scene.camera.rotateX}deg`,
                  "--rotate-z": `${scene.camera.rotateZ}deg`,
                  "--translate-z": `${scene.camera.translateZ}px`,
                  "--zoom": scene.camera.zoom,
                } as CSSProperties
              }
            >
              {scene.nodes.map((node) => (
                <NodeComponent node={node} key={node.id} />
              ))}
            </div>
          </main>
          <ModeSwitcher />
          <Zoom />
          <Gallery />
        </div>
        <PropertiesPanel />
      </div>
    </SceneContext.Provider>
  );
}

export default App;
