// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type HomePageSvgrepoComsvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function HomePageSvgrepoComsvgIcon(
  props: HomePageSvgrepoComsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      viewBox={"0 0 512 512"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g fill={"currentColor"}>
        <path
          d={
            "M0 48v416c0 26.508 21.492 48 48 48h416c26.508 0 48-21.492 48-48V48c0-26.508-21.492-48-48-48H48C21.492 0 0 21.492 0 48zm86.336 6c0 10.492-8.508 19-19 19s-19-8.508-19-19 8.508-19 19-19 19 8.508 19 19zm70.5 0c0 10.492-8.508 19-19 19s-19-8.508-19-19 8.508-19 19-19 19 8.508 19 19zm70.5 0c0 10.492-8.508 19-19 19s-19-8.508-19-19 8.508-19 19-19 19 8.508 19 19zM40 104h432v360c0 4.406-3.586 8-8 8H48c-4.414 0-8-3.594-8-8V104z"
          }
        ></path>

        <path
          d={
            "M264 192h152v32H264zM88 352h328v32H88zm0-160h120v120H88zm194.958 112H264v-32h152v32H298.958z"
          }
        ></path>
      </g>
    </svg>
  );
}

export default HomePageSvgrepoComsvgIcon;
/* prettier-ignore-end */
