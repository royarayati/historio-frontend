// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type EmptyCircleSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function EmptyCircleSvgrepoComSvgIcon(
  props: EmptyCircleSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 300 300"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M150 0C67.29 0 0 67.29 0 150s67.29 150 150 150 150-67.29 150-150S232.71 0 150 0zm0 270c-66.169 0-120-53.832-120-120S83.831 30 150 30s120 53.832 120 120-53.832 120-120 120z"
        }
      ></path>
    </svg>
  );
}

export default EmptyCircleSvgrepoComSvgIcon;
/* prettier-ignore-end */
