import styles from "./Links.module.scss";
import {
  IconBrandGithub,
  IconShare,
  IconBrandLinkedin,
} from "@tabler/icons-react";

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
        <IconBrandGithub size={18} />
      </a>
      <a
        className="icon button"
        href="https://www.linkedin.com/in/peter-ty-liu/"
      >
        <IconBrandLinkedin size={18} />
      </a>
      <button className="icon" onClick={share}>
        <IconShare size={18} />
      </button>
    </div>
  );
}
