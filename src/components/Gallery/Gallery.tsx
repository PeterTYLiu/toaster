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
        {galleryItems.map(({ model, imageUrl }) => (
          <div key={imageUrl} className={styles.item}>
            <img width="150" height="150" loading="lazy" src={`images/${imageUrl}`} />
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  if (!confirm("Launch new model? You will lose your current model and progress")) return;
                  // Re-trigger the animation on the world space
                  const world = document.getElementById("world");
                  world?.classList.remove("animated");
                  setTimeout(() => {
                    world?.classList.add("animated");
                    dispatch({
                      type: "setNodes",
                      payload: model,
                    });
                  }, 20);
                  setIsGalleryOpen(false);
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
                    payload: { nodes: model },
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
