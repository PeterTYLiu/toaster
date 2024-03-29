import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./PropertiesPanel.module.scss";
import { nodeTypesMap } from "../../nodeProperties";
import { IconTrash, IconCopy, IconLink, IconUnlink, IconArrowUpRight } from "@tabler/icons-react";
import Links from "../Links/Links";
import type { Node } from "../../App";
import { findNodeById } from "../../sceneReducer";
import { Fragment } from "react";
import PropertyInput, { type PropertyInputStaticProps } from "../PropertyInput/PropertyInput";
import { smallIconSize } from "../../nodeProperties";

const transformsMap: Partial<Record<keyof Node, PropertyInputStaticProps>> = {
  translateX: { label: "Translate X", unit: "px", sliderMin: -500, sliderMax: 500 },
  translateY: { label: "Translate Y", unit: "px", sliderMin: -500, sliderMax: 500 },
  translateZ: { label: "Translate Z", unit: "px", sliderMin: -500, sliderMax: 500 },
  scaleX: { label: "Scale X", step: 0.01, unit: "×", sliderMin: -3, sliderMax: 3 },
  scaleY: { label: "Scale Y", step: 0.01, unit: "×", sliderMin: -3, sliderMax: 3 },
  scaleZ: { label: "Scale Z", step: 0.01, unit: "×", sliderMin: -3, sliderMax: 3 },
  rotateX: { label: "Rotate X", unit: "°", sliderMin: -180, sliderMax: 180 },
  rotateY: { label: "Rotate Y", unit: "°", sliderMin: -180, sliderMax: 180 },
  rotateZ: { label: "Rotate Z", unit: "°", sliderMin: -180, sliderMax: 180 },
};

const dimensionsMap: Partial<Record<keyof Node, PropertyInputStaticProps>> = {
  radius: { label: "Radius", min: 0, unit: "px", sliderMin: 0, sliderMax: 200 },
  holeRadius: { label: "Hole radius", min: 0, unit: "px", sliderMin: 0, sliderMax: 200 },
  baseSides: { label: "Sides", min: 3, max: 16, sliderMin: 3, sliderMax: 16 },
  depth: { label: "Depth", min: 0, unit: "px", sliderMin: 0, sliderMax: 400 },
  width: { label: "Width", min: 0, unit: "px", sliderMin: 0, sliderMax: 400 },
  height: { label: "Height", min: 0, unit: "px", sliderMin: 0, sliderMax: 400 },
};

export default function PropertiesPanel() {
  const { nodes, dispatch, activeNodeId } = useSceneContext();

  const activeNode = findNodeById(nodes, activeNodeId);

  if (!activeNode)
    return (
      <div className={styles.properties}>
        <div>
          <h1 title="v1.1.5">🍞 Toaster</h1>
          <h2>
            Pure CSS 3D Editor
            <br />
            by Peter Liu
          </h2>
          <br />
          <p>Every part of the model is HTML elements with CSS transforms. No canvas, no WebGL.</p>
          <br />
          <Links />
        </div>
        <details>
          <summary>
            <h2>Instructions and tips</h2>
          </summary>
          <section>
            <ul>
              <li>
                Scroll to zoom, drag to rotate, <kbd>CTRL</kbd> + drag to change elevation
              </li>
              <li>To reflect a node about an axis, you can scale that axis to -1</li>
              <li>
                Use <strong>instancing</strong> to create nodes with linked properties and geometry
              </li>
              <li>
                <strong>Use spheres sparingly!</strong> They have hundreds of elements and can cause significant performance degradation
              </li>
              <li>
                Use <strong>groups</strong> to share properties between solids without a parent solid
              </li>
              <li>A prism with many sides approximates a cylinder</li>
              <li>A pyramid with many sides approximates a cone</li>
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
                () => alert("Model copied to clipboard as JSON! Paste it somewhere for safekeeping or share with someone"),
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
            to include it in the gallery (with full credit to you). Don't forget to include the JSON.
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
          <p className={styles.hint}>
            Node type: {activeNode.type}
            {!!activeNode.instanceOf ? " (instance)" : ""}
          </p>
        </section>
      </details>
      <div className={styles.controls}>
        {!!activeNode.instanceOf && (
          <>
            <p className={styles.hint}>Instances inherit dimensions and styles from their mother node</p>
            <button
              onClick={() => {
                dispatch({
                  type: "setActiveNodeId",
                  payload: activeNode.instanceOf ?? null,
                });
              }}
            >
              <IconArrowUpRight size={smallIconSize} />
              Go to mother node
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "detachInstance",
                  payload: activeNode.id,
                });
              }}
            >
              <IconUnlink size={smallIconSize} />
              Detach instance
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "cloneNode",
                  payload: activeNode.id,
                });
              }}
            >
              <IconCopy size={smallIconSize} />
              Duplicate instance
            </button>
          </>
        )}
        {!activeNode.instanceOf && (
          <>
            <button
              onClick={() => {
                dispatch({
                  type: "newInstance",
                  payload: activeNode.id,
                });
              }}
            >
              <IconLink size={smallIconSize} />
              Create new instance
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "cloneNode",
                  payload: activeNode.id,
                });
              }}
            >
              <IconCopy size={smallIconSize} />
              Clone
            </button>
          </>
        )}
        <button
          onClick={() => {
            dispatch({
              type: "deleteNodeById",
              payload: activeNode.id,
            });
          }}
        >
          <IconTrash size={smallIconSize} />
          Delete
        </button>
      </div>
      {!activeNode.instanceOf && (
        <details open>
          <summary>
            <h2>Add child nodes</h2>
          </summary>
          <section>
            <div className={styles.inline}>
              {Object.entries(nodeTypesMap).map(([key, value]) => {
                return (
                  <button
                    className="icon"
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
                    {value.addIcon}
                  </button>
                );
              })}
            </div>
          </section>
        </details>
      )}
      {activeNode.type !== "group" && !activeNode.instanceOf && (
        <details open>
          <summary>
            <h2>Dimensions</h2>
          </summary>
          <section>
            {Object.entries(dimensionsMap).map(([key, value]) => {
              if (!nodeTypesMap[activeNode.type].dimensions[key as keyof Node]) return <Fragment key={key} />;

              return (
                <PropertyInput
                  key={key}
                  {...value}
                  value={(activeNode[key as keyof Node] as number | undefined) ?? value.min}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: "updateNodeById",
                      payload: {
                        id: activeNodeId,
                        properties: { [key]: e.target.valueAsNumber ?? 0 },
                      },
                    })
                  }
                />
              );
            })}
          </section>
        </details>
      )}
      {!activeNode.instanceOf && (
        <details open>
          <summary>
            <h2>Styling</h2>
          </summary>
          <section className={styles["color-picker-section"]}>
            <label>
              Color
              <div>
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
              </div>
            </label>
            <button
              aria-selected={!activeNode.color}
              aria-label="Inherit colour from parent node"
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
          </section>
        </details>
      )}
      <details open>
        <summary>
          <h2>Transforms</h2>
        </summary>
        <section>
          <p className={styles.hint}>Transforms apply to the node and its children</p>
          {Object.entries(transformsMap).map(([key, value]) => {
            return (
              <PropertyInput
                {...value}
                key={key}
                value={activeNode[key as keyof Node] as number}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: "updateNodeById",
                    payload: {
                      id: activeNodeId,
                      properties: { [key]: e.target.valueAsNumber ?? 0 },
                    },
                  })
                }
              />
            );
          })}
        </section>
      </details>
    </div>
  );
}
