// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Path840IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Path840Icon(props: Path840IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 3 3"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M1.328 2.732c.263 0 .52-.08.738-.23.218-.15.389-.364.49-.613A1.402 1.402 0 002.266.4a1.317 1.317 0 00-.68-.374A1.294 1.294 0 00.82.104a1.33 1.33 0 00-.596.503 1.394 1.394 0 00.165 1.725c.25.256.587.4.94.4zm0-2.054c.132 0 .261.04.371.116.11.075.196.183.246.308a.705.705 0 01-.145.749.65.65 0 01-.728.149.672.672 0 01-.3-.253A.697.697 0 01.856.88a.659.659 0 01.473-.202z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Path840Icon;
/* prettier-ignore-end */
