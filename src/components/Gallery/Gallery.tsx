import styles from "./Gallery.module.scss";
import type { Node } from "../../App";
import { useState } from "react";
import useSceneContext from "../../hooks/UseSceneContext";
import { IconChevronUp } from "@tabler/icons-react";
import { snowman } from "../../models/snowman";
import { starDestroyer } from "../../models/starDestroyer";
import { optimus } from "../../models/optimus";

const galleryItems: { model: Node | Node[]; imageUrl: string }[] = [
  { model: snowman, imageUrl: "snowman.png" },
  { model: starDestroyer, imageUrl: "starDestroyer.png" },
  { model: optimus, imageUrl: "optimus.png" },
];

export default function Gallery() {
  const [isActive, setisActive] = useState(false);
  const { dispatch } = useSceneContext();

  return (
    <div className={`${styles.gallery} ${isActive ? styles.active : ""}`}>
      <header onClick={() => setisActive(!isActive)}>
        <h2>🖼️ Gallery</h2>
        <IconChevronUp className={styles.chevron} />
      </header>
      <div className={styles.inner}>
        {galleryItems.map((item) => (
          <div key={item.imageUrl} className={styles.item}>
            <img
              width="150"
              height="150"
              loading="lazy"
              src={`images/${item.imageUrl}`}
            />
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  if (
                    !confirm(
                      "Launch new model? You will lose your current model and progress"
                    )
                  )
                    return;
                  dispatch({
                    type: "setNodes",
                    payload: item.model,
                  });
                }}
              >
                Launch
              </button>
              <button
                className={styles.insert}
                onClick={() =>
                  dispatch({
                    type: "insertNode",
                    payload: { nodes: item.model },
                  })
                }
              >
                Insert
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
