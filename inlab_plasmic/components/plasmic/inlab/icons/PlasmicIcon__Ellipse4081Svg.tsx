// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Ellipse4081SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Ellipse4081SvgIcon(props: Ellipse4081SvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      xmlSpace={"preserve"}
      viewBox={"0 0 256 256"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M127.857 206.23c-70.905 0-126.45-34.425-126.45-78.373s55.545-78.374 126.45-78.374 126.45 34.425 126.45 78.374-55.546 78.373-126.45 78.373zm0-139.887c-59.404 0-109.59 28.17-109.59 61.514 0 33.343 50.186 61.513 109.59 61.513 59.406 0 109.59-28.167 109.59-61.513 0-33.344-50.184-61.514-109.59-61.514z"
        }
        fill={"currentColor"}
        fillRule={"nonzero"}
        opacity={"1"}
      ></path>
    </svg>
  );
}

export default Ellipse4081SvgIcon;
/* prettier-ignore-end */
