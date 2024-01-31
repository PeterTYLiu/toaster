import styles from "./Links.module.scss";
import { IconBrandGithub, IconShare, IconBrandLinkedin } from "@tabler/icons-react";
import { iconSize } from "../../nodeProperties";

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
      <a className="icon button" href="https://github.com/PeterTYLiu/toaster" title="Github">
        <IconBrandGithub size={iconSize} />
      </a>
      <a title="LinkedIn" className="icon button" href="https://www.linkedin.com/in/peter-ty-liu/">
        <IconBrandLinkedin size={iconSize} />
      </a>
      <button className="icon" onClick={share} title="share">
        <IconShare size={iconSize} />
      </button>
      <a className="icon button" href="https://u24.gov.ua" title="Donate to Ukraine" style={{ textDecoration: "none", fontSize: "1.3rem" }}>
        🇺🇦
      </a>
    </div>
  );
}
