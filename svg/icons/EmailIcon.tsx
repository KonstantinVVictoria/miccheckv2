import { SVGIconProps } from "../commontypes";
import SVGIcon from "./Icon";

export default function EmailIcon(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 -64 512 512"
      xmlns="http://www.w3.org/2000/svg"
      selectable={config.selectable || false}
    >
      <g id="_34_Envelope" data-name="34 Envelope" transform="translate(0 -64)">
        <path
          id="Path_45"
          d="M480,64H32A31.992,31.992,0,0,0,0,96V416a31.992,31.992,0,0,0,32,32H480a31.992,31.992,0,0,0,32-32V96A31.992,31.992,0,0,0,480,64Zm-64,64L256,256,96,128Zm32,256H64V160L256,320,448,160Z"
          fillRule="evenodd"
          fill={config.fill || ""}
        />
      </g>
    </SVGIcon>
  );
}
