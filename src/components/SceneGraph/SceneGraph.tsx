import useSceneContext from "../../hooks/UseSceneContext";
import SceneGraphNode from "../SceneGraphNode/SceneGraphNode";
import styles from "./SceneGraph.module.scss";

export default function SceneGraph() {
  const { nodes, dispatch } = useSceneContext();

  return (
    <div className={styles.graph}>
      <button
        onClick={() => dispatch({ type: "newTopLevelNode", payload: "sphere" })}
      >
        Add Sphere
      </button>
      <button
        onClick={() =>
          dispatch({ type: "newTopLevelNode", payload: "rectPrism" })
        }
      >
        Add Cube
      </button>

      <hr />
      {nodes.map((node) => (
        <SceneGraphNode node={node} key={node.id} />
      ))}
    </div>
  );
}
