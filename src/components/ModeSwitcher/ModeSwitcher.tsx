import useSceneContext from "../../hooks/UseSceneContext";
import styles from "./ModeSwitcher.module.css";

export default function ModeSwitcher() {
  const { dispatch, wireframe } = useSceneContext();

  return (
    <div className={styles["mode-switcher"]}>
      <button aria-selected={!wireframe} onClick={() => dispatch({ type: "setWireframeMode", payload: false })}>
        Solid
      </button>
      <button aria-selected={wireframe} onClick={() => dispatch({ type: "setWireframeMode", payload: true })}>
        Wireframe
      </button>
    </div>
  );
}
