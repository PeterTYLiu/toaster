import styles from "./Gallery.module.scss";
import type { Node } from "../../App";
import { useState } from "react";
import useSceneContext from "../../hooks/UseSceneContext";
import { IconChevronUp } from "@tabler/icons-react";
import { snowman } from "../../models/snowman";
import { starDestroyer } from "../../models/starDestroyer";
import { optimus } from "../../models/optimus";
import { toaster } from "../../models/toaster";

const galleryItems: { model: Node | Node[]; imageUrl: string }[] = [
  { model: snowman, imageUrl: "snowman.jpg" },
  { model: starDestroyer, imageUrl: "starDestroyer.jpg" },
  { model: optimus, imageUrl: "optimus.jpg" },
  { model: toaster, imageUrl: "toaster.jpg" },
];

export default function Gallery() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { dispatch } = useSceneContext();

  return (
    <div className={`${styles.gallery} ${isGalleryOpen ? styles.active : ""}`}>
      <button
        className={styles.header}
        onClick={() => setIsGalleryOpen(!isGalleryOpen)}
        aria-label={isGalleryOpen ? "Close gallery" : "Open gallery"}
      >
        <h2>🖼️ Gallery</h2>
        <IconChevronUp className={styles.chevron} />
      </button>
      <div className={styles.inner}>
        {galleryItems.map((item) => (
          <div key={item.imageUrl} className={styles.item}>
            <img width="150" height="150" loading="lazy" src={`images/${item.imageUrl}`} />
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  if (!confirm("Launch new model? You will lose your current model and progress")) return;
                  setIsGalleryOpen(false);
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
                onClick={() => {
                  setIsGalleryOpen(false);
                  dispatch({
                    type: "insertNode",
                    payload: { nodes: item.model },
                  });
                }}
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
