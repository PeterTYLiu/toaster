import useSceneContext from "../../hooks/UseSceneContext";
import SceneGraphNode from "../SceneGraphNode/SceneGraphNode";
import styles from "./SceneGraph.module.scss";
import {
  IconBox,
  IconInnerShadowTopRight,
  IconPyramid,
  IconCylinder,
  IconFolder,
} from "@tabler/icons-react";

export default function SceneGraph() {
  const { nodes, dispatch } = useSceneContext();

  return (
    <div className={styles.panel}>
      <section className={styles.buttons}>
        <button
          className="icon"
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
          <IconInnerShadowTopRight size={20} />
        </button>
        <button
          className="icon"
          onClick={() =>
            dispatch({
              type: "newNode",
              payload: {
                properties: {
                  type: "cuboid",
                  translateX: 500,
                  translateY: 500,
                  translateZ: 100,
                },
              },
            })
          }
        >
          <IconBox size={20} />
        </button>
        <button
          className="icon"
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
          <IconPyramid size={20} />
        </button>
        <button
          className="icon"
          onClick={() =>
            dispatch({
              type: "newNode",
              payload: {
                properties: {
                  type: "prism",
                  translateX: 500,
                  translateY: 500,
                  translateZ: 100,
                },
              },
            })
          }
        >
          <IconCylinder size={20} />
        </button>
        <button
          className="icon"
          onClick={() =>
            dispatch({
              type: "newNode",
              payload: {
                properties: {
                  type: "group",
                  translateX: 500,
                  translateY: 500,
                  translateZ: 100,
                },
              },
            })
          }
        >
          <IconFolder size={20} />
        </button>
      </section>
      <section className={styles.graph}>
        {nodes.map((node) => (
          <SceneGraphNode node={node} key={node.id} />
        ))}
      </section>
    </div>
  );
}
