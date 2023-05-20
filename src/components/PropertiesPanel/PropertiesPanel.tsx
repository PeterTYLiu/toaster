import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./PropertiesPanel.module.scss";
import { nodeTypesMap } from "../../nodeProperties";
import { IconTrash, IconCopy } from "@tabler/icons-react";
import Links from "../Links/Links";
import type { Node } from "../../App";
import { findNodeById } from "../../sceneReducer";
import { Fragment } from "react";

const transformsMap: Partial<
  Record<keyof Node, { label: string; step?: number }>
> = {
  translateX: { label: "Translate X" },
  translateY: { label: "Translate Y" },
  translateZ: { label: "Translate Z" },
  scaleX: { label: "Scale X", step: 0.01 },
  scaleY: { label: "Scale Y", step: 0.01 },
  scaleZ: { label: "Scale Z", step: 0.01 },
  rotateX: { label: "Rotate X" },
  rotateY: { label: "Rotate Y" },
  rotateZ: { label: "Rotate Z" },
};

const dimensionsMap: Partial<
  Record<keyof Node, { label: string; min?: number; max?: number }>
> = {
  radius: { label: "Radius", min: 0 },
  baseSides: { label: "Sides", min: 3, max: 16 },
  depth: { label: "Depth", min: 0 },
  width: { label: "Width", min: 0 },
  height: { label: "Height", min: 0 },
};

export default function PropertiesPanel() {
  const { nodes, dispatch, activeNodeId } = useSceneContext();

  const activeNode = findNodeById(nodes, activeNodeId);

  if (!activeNode)
    return (
      <div className={styles.properties}>
        <div>
          <h1>🍞 Toaster</h1>
          <h2>
            Pure CSS 3D Editor
            <br />
            by Peter Liu
          </h2>
          <br />
          <Links />
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
        </div>
        <details>
          <summary>
            <h2>Instructions and tips</h2>
          </summary>
          <section>
            <ul>
              <li>Scroll to zoom, click & drag to rotate</li>
              <li>
                To reflect a node about an axis, you can scale that axis to -1
              </li>

              <li>
                <strong>Use spheres sparingly!</strong> They have hundreds of
                elements and can cause significant perfromance degredation
              </li>
              <li>
                Use <strong>groups</strong> to share properties between solids
                without a parent solid
              </li>
            </ul>
          </section>
        </details>
        <div>
          <button
            style={{ width: "100%" }}
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
          <p>To load a model, paste your JSON here:</p>
          <textarea
            autoCorrect="off"
            spellCheck="false"
            rows={8}
            style={{ width: "100%", margin: "12px 0" }}
            value={JSON.stringify(nodes)}
            onChange={(e) =>
              dispatch({
                type: "setNodes",
                payload: JSON.parse(e.target.value),
              })
            }
          />
          <p>
            If you make something really cool, feel free to make an issue in the{" "}
            <a href="https://github.com/PeterTYLiu/toaster" target="_blank">
              github repo
            </a>{" "}
            to include it in the gallery (with full credit to you). Don't forget
            to include the JSON
          </p>
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
            {Object.entries(nodeTypesMap).map(([key, value]) => {
              return (
                <button
                  key={key}
                  title={`Add child ${key}`}
                  onClick={() => {
                    if (!activeNodeId) return;
                    dispatch({
                      type: "newNode",
                      payload: {
                        parentId: activeNodeId,
                        properties: {
                          type: key as Node["type"],
                          translateX: 100,
                        },
                      },
                    });
                  }}
                >
                  {value.icon}
                </button>
              );
            })}
          </div>
        </section>
      </details>
      {activeNode.type !== "group" && (
        <details open>
          <summary>
            <h2>Dimensions</h2>
          </summary>
          <section>
            {Object.entries(dimensionsMap).map(([key, value]) => {
              if (!nodeTypesMap[activeNode.type].dimensions[key as keyof Node])
                return <Fragment key={key} />;

              return (
                <label key={key}>
                  <span>{value.label}</span>
                  <input
                    type="number"
                    min={value.min}
                    max={value.max}
                    value={activeNode[key as keyof Node] as number}
                    onChange={(e) =>
                      dispatch({
                        type: "updateNodeById",
                        payload: {
                          id: activeNodeId,
                          properties: { [key]: e.target.valueAsNumber },
                        },
                      })
                    }
                  />
                </label>
              );
            })}
          </section>
        </details>
      )}
      <details open>
        <summary>
          <h2>Styling</h2>
        </summary>
        <section>
          <label>
            <span>Color</span>
            <div className={styles["color-picker"]}>
              <input
                type="color"
                className={!!activeNode.color ? styles.active : ""}
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
                className={!activeNode.color ? styles.active : ""}
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
            </div>
          </label>
        </section>
      </details>
      <details open>
        <summary>
          <h2>Transforms</h2>
        </summary>
        <section>
          <p className={styles.hint}>
            Transforms apply to the node and its children
          </p>
          {Object.entries(transformsMap).map(([key, value]) => {
            return (
              <label key={key}>
                <span>{value.label}</span>
                <input
                  type="number"
                  step={value.step}
                  value={activeNode[key as keyof Node] as number}
                  onChange={(e) =>
                    dispatch({
                      type: "updateNodeById",
                      payload: {
                        id: activeNodeId,
                        properties: { [key]: e.target.valueAsNumber },
                      },
                    })
                  }
                />
              </label>
            );
          })}
        </section>
      </details>
    </div>
  );
}
