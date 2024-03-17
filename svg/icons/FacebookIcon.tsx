import { SVGIconProps } from "../commontypes";
import SVGIcon from "./Icon";

export default function FacebookIcon(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 0 512 512"
      id="_67_facebook"
      xmlns="http://www.w3.org/2000/SVGIcon"
      selectable={config.selectable || false}
    >
      <path
        id="Path_87"
        data-name="Path 87"
        fill={config.fill || ""}
        d="M480,512H32A31.981,31.981,0,0,1,0,480V32A31.981,31.981,0,0,1,32,0H480a31.981,31.981,0,0,1,32,32V480A31.981,31.981,0,0,1,480,512ZM448,64H64V448H448ZM256,192c0-35.281,29.188-64,59.438-64H352v64H320v32h32v64H320v96H256V288H224V224h32Z"
        fillRule="evenodd"
      />
    </SVGIcon>
  );
}
