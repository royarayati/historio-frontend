// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type WiFiSignalLightIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function WiFiSignalLightIcon(props: WiFiSignalLightIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 14"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M8.133 8.94c.64 0 1.26.168 1.808.488l.222.13a.297.297 0 01.06.466l-1.894 1.889a.299.299 0 01-.422 0l-1.881-1.877a.297.297 0 01.058-.465l.219-.13a3.571 3.571 0 011.83-.501zm0-3.47a7.04 7.04 0 014.362 1.505l.176.138c.14.11.153.318.026.443l-1.13 1.128a.299.299 0 01-.39.028l-.137-.102a4.858 4.858 0 00-2.907-.96c-1.06 0-2.08.34-2.923.971l-.138.104a.299.299 0 01-.39-.028L3.552 7.57a.297.297 0 01.026-.443l.175-.138a7.04 7.04 0 014.38-1.52z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M8.133 2c2.524 0 4.939.89 6.85 2.523l.163.14c.132.112.14.313.017.435l-1.127 1.124a.298.298 0 01-.402.018l-.14-.117A8.33 8.33 0 008.133 4.18a8.33 8.33 0 00-5.377 1.955l-.14.118a.299.299 0 01-.402-.017L1.087 5.112a.297.297 0 01.017-.436l.162-.139A10.513 10.513 0 018.133 2z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default WiFiSignalLightIcon;
/* prettier-ignore-end */
