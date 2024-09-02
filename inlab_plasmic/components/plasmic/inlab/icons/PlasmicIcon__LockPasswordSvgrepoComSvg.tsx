// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LockPasswordSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LockPasswordSvgrepoComSvgIcon(
  props: LockPasswordSvgrepoComSvgIconProps
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
          "M5.25 10.055V8a6.75 6.75 0 0113.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121.53-.531 1.256-.741 2.371-.824zM6.75 8a5.25 5.25 0 0110.5 0v2.004C16.867 10 16.451 10 16 10H8c-.452 0-.867 0-1.25.004V8zM8 17a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default LockPasswordSvgrepoComSvgIcon;
/* prettier-ignore-end */
