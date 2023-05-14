import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./PropertiesPanel.module.scss";
import { Node } from "../../App";

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

export default function PropertiesPanel() {
  const { nodes, dispatch, activeNodeId } = useSceneContext();

  const activeNode = findNodeById(nodes, activeNodeId);

  if (!activeNode) return <div className={styles.properties} />;

  return (
    <div className={styles.properties}>
      <p>{activeNode.id}</p>
      <details open>
        <summary>
          <h2>Node name</h2>
        </summary>
        <section>
          <input
            value={activeNode.name}
            placeholder="Node name"
            onChange={(e) =>
              dispatch({
                type: "updateNodeById",
                payload: {
                  id: activeNodeId,
                  properties: { name: e.target.value },
                },
              })
            }
          />
        </section>
      </details>
      <details open>
        <summary>
          <h2>Transforms</h2>
        </summary>
        <section>
          <label>
            <span>Translate X</span>
            <input
              type="number"
              value={activeNode.translateX}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { translateX: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Translate Y</span>
            <input
              type="number"
              value={activeNode.translateY}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { translateY: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Translate Z</span>
            <input
              type="number"
              value={activeNode.translateZ}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { translateZ: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Scale X</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={activeNode.scaleX}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { scaleX: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Scale Y</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={activeNode.scaleY}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { scaleY: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Scale Z</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={activeNode.scaleZ}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { scaleZ: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Rotate X</span>
            <input
              type="number"
              min="-360"
              max="360"
              value={activeNode.rotateX}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { rotateX: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Rotate Y</span>
            <input
              type="number"
              min="-360"
              max="360"
              value={activeNode.rotateY}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { rotateY: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>

          <label>
            <span>Rotate Z</span>
            <input
              type="number"
              min="-360"
              max="360"
              value={activeNode.rotateZ}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { rotateZ: e.target.valueAsNumber },
                  },
                })
              }
            />
          </label>
        </section>
      </details>
      <details open>
        <summary>
          <h2>Dimensions</h2>
        </summary>
        <section>
          {(activeNode.type === "sphere" || activeNode.type === "pyramid") && (
            <label>
              <span>Radius</span>
              <input
                type="number"
                value={activeNode.radius}
                onChange={(e) =>
                  dispatch({
                    type: "updateNodeById",
                    payload: {
                      id: activeNodeId,
                      properties: { radius: e.target.valueAsNumber },
                    },
                  })
                }
              />
            </label>
          )}
          {activeNode.type === "pyramid" && (
            <label>
              <span>Base sides</span>
              <input
                min="3"
                type="number"
                value={activeNode.baseSides}
                onChange={(e) =>
                  dispatch({
                    type: "updateNodeById",
                    payload: {
                      id: activeNodeId,
                      properties: { baseSides: e.target.valueAsNumber },
                    },
                  })
                }
              />
            </label>
          )}
          {activeNode.type !== "sphere" && (
            <>
              <label>
                <span>Width</span>
                <input
                  type="number"
                  value={activeNode.width}
                  onChange={(e) =>
                    dispatch({
                      type: "updateNodeById",
                      payload: {
                        id: activeNodeId,
                        properties: { width: e.target.valueAsNumber },
                      },
                    })
                  }
                />
              </label>
              <label>
                <span>Height</span>
                <input
                  type="number"
                  value={activeNode.height}
                  onChange={(e) =>
                    dispatch({
                      type: "updateNodeById",
                      payload: {
                        id: activeNodeId,
                        properties: { height: e.target.valueAsNumber },
                      },
                    })
                  }
                />
              </label>
              <label>
                <span>Depth</span>
                <input
                  type="number"
                  value={activeNode.depth}
                  onChange={(e) =>
                    dispatch({
                      type: "updateNodeById",
                      payload: {
                        id: activeNodeId,
                        properties: { depth: e.target.valueAsNumber },
                      },
                    })
                  }
                />
              </label>
            </>
          )}
        </section>
      </details>
      <details open>
        <summary>
          <h2>Styling</h2>
        </summary>
        <section>
          <label>
            <span>Color</span>
            <input
              type="color"
              value={activeNode.color}
              onChange={(e) =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { color: e.target.value },
                  },
                })
              }
            />
            <button
              onClick={() =>
                dispatch({
                  type: "updateNodeById",
                  payload: {
                    id: activeNodeId,
                    properties: { color: undefined },
                  },
                })
              }
            >
              inherit
            </button>
          </label>
        </section>
      </details>

      <button
        onClick={() => {
          if (!activeNodeId) return;
          dispatch({
            type: "newNode",
            payload: {
              parentId: activeNodeId,
              properties: { type: "sphere", translateX: 100 },
            },
          });
        }}
      >
        Add child sphere
      </button>
      <button
        onClick={() => {
          if (!activeNodeId) return;
          dispatch({
            type: "newNode",
            payload: {
              parentId: activeNodeId,
              properties: { type: "rectPrism", translateX: 100 },
            },
          });
        }}
      >
        Add child cube
      </button>
      <button
        onClick={() => {
          if (!activeNodeId) return;
          dispatch({
            type: "newNode",
            payload: {
              parentId: activeNodeId,
              properties: { type: "pyramid", translateX: 100 },
            },
          });
        }}
      >
        Add child pyramid
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "deleteNodeById",
            payload: activeNode.id,
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
