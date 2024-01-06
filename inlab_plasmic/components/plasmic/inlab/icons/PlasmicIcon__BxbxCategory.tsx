// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BxbxCategoryIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BxbxCategoryIcon(props: BxbxCategoryIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 32 32"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M13.333 4h-8A1.333 1.333 0 004 5.333v8a1.333 1.333 0 001.333 1.334h8a1.333 1.333 0 001.334-1.334v-8A1.333 1.333 0 0013.333 4zM12 12H6.667V6.667H12V12zm14.667-8h-8a1.333 1.333 0 00-1.334 1.333v8a1.333 1.333 0 001.334 1.334h8A1.333 1.333 0 0028 13.333v-8A1.334 1.334 0 0026.667 4zm-1.334 8H20V6.667h5.333V12zm-12 5.333h-8A1.333 1.333 0 004 18.667v8A1.333 1.333 0 005.333 28h8a1.333 1.333 0 001.334-1.333v-8a1.333 1.333 0 00-1.334-1.334zm-1.333 8H6.667V20H12v5.333zm10.667-8a5.339 5.339 0 00-5.334 5.334A5.339 5.339 0 0022.667 28 5.339 5.339 0 0028 22.667a5.339 5.339 0 00-5.333-5.334zm0 8A2.67 2.67 0 0120 22.667 2.67 2.67 0 0122.667 20a2.67 2.67 0 012.666 2.667 2.67 2.67 0 01-2.666 2.666z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BxbxCategoryIcon;
/* prettier-ignore-end */
