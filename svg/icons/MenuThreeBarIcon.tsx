import { SVGIconProps } from "../commontypes";
import SVGIcon from "./Icon";

export default function MenuThreeBarIcon(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      selectable={config.selectable || false}
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke={config.fill || ""}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
}
