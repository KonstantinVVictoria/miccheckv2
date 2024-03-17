import { SVGIconProps } from "../commontypes";
import SVGIcon from "./Icon";

export function RightArrow(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      selectable={config.selectable || false}
    >
      <path
        d="M20 4V20M4 12H16M16 12L12 8M16 12L12 16"
        stroke={config.fill || ""}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
}
export function LeftArrow(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      selectable={config.selectable || false}
    >
      <path
        d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16"
        stroke={config.fill || ""}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
}
