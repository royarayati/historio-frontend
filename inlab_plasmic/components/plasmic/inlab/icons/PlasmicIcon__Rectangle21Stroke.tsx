// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Rectangle21StrokeIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Rectangle21StrokeIcon(props: Rectangle21StrokeIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 23 12"}
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
          "M3 0h17a3 3 0 013 3v6a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3zm0 1a2 2 0 00-2 2v6a2 2 0 002 2h17a2 2 0 002-2V3a2 2 0 00-2-2H3z"
        }
        fill={"currentColor"}
        fillOpacity={".6"}
      ></path>
    </svg>
  );
}

export default Rectangle21StrokeIcon;
/* prettier-ignore-end */
