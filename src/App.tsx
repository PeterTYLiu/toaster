import { type CSSProperties, useReducer } from "react";
import styles from "./App.module.scss";
import SceneGraph from "./components/SceneGraph/SceneGraph";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import { Node as NodeComponent } from "./components/Node/Node";
import { SceneContext } from "./hooks/UseSceneContext";
import { sceneReducer } from "./sceneReducer";

type NodeType = "group" | "rectPrism" | "cylinder" | "sphere" | "cone";

export class Node {
  // Identity
  id: string;
  name: string;
  type: NodeType;
  // Children
  children: Node[];
  // Styling
  color: string | undefined;
  borderColor: string | undefined;
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

  width: number;
  height: number;
  depth: number;

  constructor(type: NodeType, color?: string, borderColor?: string) {
    this.id = crypto.randomUUID();
    this.name = `New ${type}`;
    this.type = type;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0;
    this.children = [];
    this.depth = 400;
    this.width = 400;
    this.height = 400;
    this.opacity = 1;
    this.color = color;
    this.borderColor = borderColor;
  }
}

export interface Camera {
  zoom: number;
  rotateX: number;
  rotateZ: number;
}

const defaultCamera: Camera = {
  zoom: 1,
  rotateX: 100,
  rotateZ: 60,
};

function App() {
  const [scene, dispatch] = useReducer(sceneReducer, {
    camera: defaultCamera,
    activeNodeId: null,
    nodes: [new Node("sphere", "#bbbbbb", "black")],
  });

  return (
    <SceneContext.Provider value={{ ...scene, dispatch }}>
      <nav>
        <input
          type="range"
          min="0"
          max="90"
          value={scene.camera.rotateX}
          onChange={(e) =>
            dispatch({
              type: "updateCamera",
              payload: { rotateX: parseInt(e.target.value) },
            })
          }
        />

        <input
          type="range"
          min="0"
          max="360"
          value={scene.camera.rotateZ}
          onChange={(e) =>
            dispatch({
              type: "updateCamera",
              payload: { rotateZ: parseInt(e.target.value) },
            })
          }
        />
      </nav>
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
              payload: {
                ...scene.camera,
                zoom: Math.max(Math.min(newZoom, 30), 0.05),
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
            This is the world
            {scene.nodes.map((node) => (
              <NodeComponent node={node} key={node.id} />
            ))}
          </div>
        </main>
        <PropertiesPanel />
      </div>
    </SceneContext.Provider>
  );
}

export default App;
