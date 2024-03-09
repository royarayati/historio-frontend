// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CheckedCheckboxSvgrepoComsvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function CheckedCheckboxSvgrepoComsvgIcon(
  props: CheckedCheckboxSvgrepoComsvgIconProps
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

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm11.8 5.6a1 1 0 10-1.6-1.2l-5.308 7.078-2.185-2.185a1 1 0 00-1.414 1.414l3 3A1 1 0 0011.8 16.6l6-8z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default CheckedCheckboxSvgrepoComsvgIcon;
/* prettier-ignore-end */
