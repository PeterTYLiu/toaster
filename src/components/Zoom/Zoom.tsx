import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { MAX_ZOOM, MIN_ZOOM } from "../../constants";
import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./Zoom.module.css";

export default function Zoom() {
  const { dispatch, camera } = useSceneContext();
  const { zoom } = camera;

  return (
    <div className={styles.zoom}>
      <button
        className="icon"
        aria-label="Zoom in"
        title="Zoom in"
        disabled={zoom >= MAX_ZOOM}
        onClick={() => dispatch({ type: "updateCamera", payload: { zoom: zoom * 1.15 } })}
      >
        <IconZoomIn size={20} />
      </button>
      <button
        className="icon"
        aria-label="Zoom out"
        title="Zoom out"
        disabled={zoom <= MIN_ZOOM}
        onClick={() => dispatch({ type: "updateCamera", payload: { zoom: zoom * 0.85 } })}
      >
        <IconZoomOut size={20} />
      </button>
    </div>
  );
}
