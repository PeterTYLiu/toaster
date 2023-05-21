import useSceneContext from "../../hooks/UseSceneContext";
import SceneGraphNode from "../SceneGraphNode/SceneGraphNode";
import { nodeTypesMap } from "../../nodeProperties";
import type { Node } from "../../App";
import styles from "./SceneGraph.module.scss";

export default function SceneGraph() {
  const { nodes, dispatch } = useSceneContext();

  return (
    <div className={styles.panel}>
      <section className={styles.buttons}>
        {Object.entries(nodeTypesMap).map(([key, value]) => {
          return (
            <button
              key={key}
              className="icon"
              title={`Add top-level ${key}`}
              onClick={() =>
                dispatch({
                  type: "newNode",
                  payload: {
                    properties: {
                      type: key as Node["type"],
                      translateX: 500,
                      translateY: 500,
                      translateZ: 130,
                      radius: 150,
                    },
                  },
                })
              }
            >
              {value.addIcon}
            </button>
          );
        })}
      </section>
      <section className={styles.graph}>
        {nodes.map((node) => (
          <SceneGraphNode node={node} key={node.id} />
        ))}
      </section>
    </div>
  );
}
