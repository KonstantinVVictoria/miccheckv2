import { SVGProps } from "react";
import styles from "../commonstyles.module.css";
import { SVGIconProps } from "../commontypes";
export default function SVGIcon(
  config: SVGProps<SVGSVGElement> & SVGIconProps
) {
  const attributes = { ...config, selectable: undefined };
  return (
    <svg
      {...attributes}
      className={
        `${styles.svg_icon}` +
        ((config.selectable && ` ${styles.selectable}`) || "")
      }
    >
      {config.children}
    </svg>
  );
}
