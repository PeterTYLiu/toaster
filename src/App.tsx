import { type CSSProperties, useReducer, useState } from "react";
import styles from "./App.module.scss";
import SceneGraph from "./components/SceneGraph/SceneGraph";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import { Node as NodeComponent } from "./components/Node/Node";
import { SceneContext } from "./hooks/UseSceneContext";
import { sceneReducer } from "./sceneReducer";
import Links from "./components/Links/Links";
import { IconX } from "@tabler/icons-react";
import { optimus } from "./models/optimus";
import Gallery from "./components/Gallery/Gallery";

type NodeType = "group" | "cuboid" | "prism" | "sphere" | "pyramid";

export class Node {
  // Identity
  id: string;
  name: string;
  type: NodeType;
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
}

const defaultCamera: Camera = {
  zoom: 0.5,
  rotateX: 80,
  rotateZ: 10,
};

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [scene, dispatch] = useReducer(sceneReducer, {
    camera: defaultCamera,
    activeNodeId: null,
    nodes: [optimus],
    hoverNodeId: null,
  });

  return (
    <SceneContext.Provider value={{ ...scene, dispatch }}>
      <nav className={styles.nav}>
        <div>
          <h1>🍞 Toaster</h1>
          <h2>Pure CSS 3D editor by Peter Liu</h2>
        </div>
        <Links />
      </nav>
      {bannerVisible && (
        <div className={styles.banner}>
          <span>🛠️ View on a larger screen for editing tools!</span>
          <button className="icon" onClick={() => setBannerVisible(false)}>
            <IconX size={18} />
          </button>
        </div>
      )}

      <div className={styles.lower}>
        <SceneGraph />
        <main
          className={styles.main}
          onClick={() => dispatch({ type: "setActiveNodeId", payload: null })}
          onWheel={(e) => {
            e.stopPropagation();
            const newZoom = scene.camera.zoom + e.deltaY / 100;
            dispatch({
              type: "updateCamera",
              payload: { zoom: Math.max(Math.min(newZoom, 30), 0.05) },
            });
          }}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerMove={(e) => {
            if (!isDragging) return;

            dispatch({
              type: "updateCamera",
              payload: {
                rotateZ: scene.camera.rotateZ - e.movementX,

                rotateX: Math.min(
                  Math.max(scene.camera.rotateX - e.movementY, 0),
                  87
                ),
              },
            });
          }}
        >
          <div
            className={styles.world}
            style={
              {
                "--rotate-x": `${scene.camera.rotateX}deg`,
                "--rotate-z": `${scene.camera.rotateZ}deg`,
                "--zoom": scene.camera.zoom,
              } as CSSProperties
            }
          >
            {scene.nodes.map((node) => (
              <NodeComponent node={node} key={node.id} />
            ))}
          </div>
        </main>
        <Gallery />
        <PropertiesPanel />
      </div>
    </SceneContext.Provider>
  );
}

export default App;
