import styles from "./Links.module.scss";
import {
  IconBrandGithub,
  IconShare,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const iconSize = 20;

function share() {
  if (navigator.share)
    return navigator.share({
      title: "Toaster | Pure CSS 3D Editor",
      url: "https://petertyliu.github.io/toaster",
      text: "Toaster is a pure CSS 3D editor using CSS 3D functions and SVG; no canvas nor WebGL!",
    });

  navigator.clipboard.writeText("https://petertyliu.github.io/toaster").then(
    () => alert("Copied link to clipboard!"),
    () => alert("Could not share :(")
  );
}

export default function Links() {
  return (
    <div className={styles.links}>
      <a className="icon button" href="https://github.com/PeterTYLiu/toaster">
        <IconBrandGithub size={iconSize} />
      </a>
      <a
        className="icon button"
        href="https://www.linkedin.com/in/peter-ty-liu/"
      >
        <IconBrandLinkedin size={iconSize} />
      </a>
      <button className="icon" onClick={share} title="share">
        <IconShare size={iconSize} />
      </button>
    </div>
  );
}
