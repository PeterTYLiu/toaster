import useSceneContext from "../../hooks/UseSceneContext";
import SceneGraphNode from "../SceneGraphNode/SceneGraphNode";
import styles from "./SceneGraph.module.scss";

export default function SceneGraph() {
  const { nodes, dispatch } = useSceneContext();

  return (
    <div className={styles.graph}>
      <button
        onClick={() =>
          dispatch({
            type: "newNode",
            payload: {
              properties: {
                type: "sphere",
                translateX: 500,
                translateY: 500,
                translateZ: 130,
                radius: 150,
              },
            },
          })
        }
      >
        Add Sphere
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "newNode",
            payload: {
              properties: {
                type: "rectPrism",
                translateX: 500,
                translateY: 500,
                translateZ: 100,
              },
            },
          })
        }
      >
        Add Cube
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "newNode",
            payload: {
              properties: {
                type: "pyramid",
                translateX: 500,
                translateY: 500,
                translateZ: 100,
              },
            },
          })
        }
      >
        Add Pyramid
      </button>

      {nodes.map((node) => (
        <SceneGraphNode node={node} key={node.id} />
      ))}
    </div>
  );
}
