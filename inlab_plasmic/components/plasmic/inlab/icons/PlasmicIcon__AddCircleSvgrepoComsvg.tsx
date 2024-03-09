// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AddCircleSvgrepoComsvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function AddCircleSvgrepoComsvgIcon(
  props: AddCircleSvgrepoComsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <circle
        cx={"12"}
        cy={"12"}
        r={"10"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
      ></circle>

      <path
        d={"M15 12h-3m0 0H9m3 0V9m0 3v3"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
      ></path>
    </svg>
  );
}

export default AddCircleSvgrepoComsvgIcon;
/* prettier-ignore-end */
