import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./PropertiesPanel.module.scss";
import type { Node } from "../../App";
import {
  IconBox,
  IconInnerShadowTopRight,
  IconPyramid,
  IconTrash,
  IconCopy,
} from "@tabler/icons-react";

const propertiesMap: Record<
  Node["type"],
  Partial<Record<keyof Node, boolean>>
> = {
  group: {},
  cuboid: { width: true, height: true, depth: true },
  pyramid: { radius: true, baseSides: true, height: true },
  sphere: { radius: true },
  cylinder: {},
};

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

  if (!activeNode)
    return (
      <div className={styles.properties}>
        <div>
          <h1>Toaster</h1>
          <h2>
            Pure CSS 3D Editor
            <br />
            (work in progress!)
          </h2>
          <br />
          <p>
            A 3D editor entirely using CSS 3D functions. Inspired by{" "}
            <a href="http://tridiv.com/" target="_blank">
              tridiv.com
            </a>{" "}
            with some important improvements:
          </p>
          <ul>
            <li>
              A node tree with parenting, grouping, and property inheritence
            </li>
            <li>Spheres and n-sided pyramids</li>
            <li>X/Y/Z scaling for all nodes/solids</li>
          </ul>
          <a href="https://github.com/PeterTYLiu/toaster">Github</a>
        </div>
        <div>
          <button
            style={{ display: "block" }}
            onClick={() => {
              const type = "text/plain";
              const blob = new Blob([JSON.stringify(nodes)], { type });
              const data = [new ClipboardItem({ [type]: blob })];

              navigator.clipboard.write(data).then(
                () =>
                  alert(
                    "Model copied to clipboard as JSON! Paste it somewhere for safekeeping or share with someone"
                  ),
                () => alert("Copy failed")
              );
            }}
          >
            Save model as JSON
          </button>
          <br />
          <label>To load a model, paste your JSON here:</label>
          <textarea
            autoCorrect="off"
            spellCheck="false"
            rows={8}
            value={JSON.stringify(nodes)}
            onChange={(e) =>
              dispatch({
                type: "setNodes",
                payload: JSON.parse(e.target.value),
              })
            }
          />
        </div>
      </div>
    );

  return (
    <div className={styles.properties}>
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
          <p className={styles.hint}>Node type: {activeNode.type}</p>
        </section>
      </details>
      <div className={styles.inline}>
        <button
          onClick={() => {
            dispatch({
              type: "cloneNode",
              payload: activeNode.id,
            });
          }}
        >
          <IconCopy size={20} />
          Clone
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "deleteNodeById",
              payload: activeNode.id,
            });
          }}
        >
          <IconTrash size={20} />
          Delete
        </button>
      </div>
      <details open>
        <summary>
          <h2>Add child nodes</h2>
        </summary>
        <section>
          <div className={styles.inline}>
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
              <IconInnerShadowTopRight size={20} />
            </button>
            <button
              onClick={() => {
                if (!activeNodeId) return;
                dispatch({
                  type: "newNode",
                  payload: {
                    parentId: activeNodeId,
                    properties: { type: "cuboid", translateX: 100 },
                  },
                });
              }}
            >
              <IconBox size={20} />
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
              <IconPyramid size={20} />
            </button>
          </div>
        </section>
      </details>
      <details open>
        <summary>
          <h2>Dimensions</h2>
        </summary>
        <section>
          {propertiesMap[activeNode.type].radius && (
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
          {propertiesMap[activeNode.type].baseSides && (
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
          {propertiesMap[activeNode.type].width && (
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
          )}
          {propertiesMap[activeNode.type].height && (
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
          )}
          {propertiesMap[activeNode.type].depth && (
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
      </details>{" "}
      <details open>
        <summary>
          <h2>Transforms</h2>
        </summary>
        <section>
          <p className={styles.hint}>
            Transforms apply to the node and its children
          </p>
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
    </div>
  );
}
