// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Rectangle23IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Rectangle23Icon(props: Rectangle23IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 1 4"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={"M0 0a1 1 0 011 1v2a1 1 0 01-1 1V0z"}
        fill={"currentColor"}
        fillOpacity={".6"}
      ></path>
    </svg>
  );
}

export default Rectangle23Icon;
/* prettier-ignore-end */
