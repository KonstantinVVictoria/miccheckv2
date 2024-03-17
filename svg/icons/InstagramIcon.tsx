import { SVGIconProps } from "../commontypes";
import SVGIcon from "./Icon";

export default function InstagramIcon(config: SVGIconProps) {
  return (
    <SVGIcon
      width={config.width}
      height={config.height}
      viewBox="0 0 512 512"
      id="_66_Instagram"
      xmlns="http://www.w3.org/2000/svg"
      selectable={config.selectable || false}
    >
      <path
        id="Path_86"
        d="M480,0H32A31.981,31.981,0,0,0,0,32V480a31.981,31.981,0,0,0,32,32H480a31.981,31.981,0,0,0,32-32V32A31.981,31.981,0,0,0,480,0ZM192,256s5.062-64,64-64,64,64,64,64,1.844,64-64,64S192,256,192,256ZM448,448H64V224h68.531a128.013,128.013,0,1,0,246.938,0H448Zm0-288H352V64h96Z"
        fillRule="evenodd"
        fill={config.fill || ""}
      />
    </SVGIcon>
  );
}
