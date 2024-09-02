// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PersonCropSquareFillSvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function PersonCropSquareFillSvgrepoComSvgIcon(
  props: PersonCropSquareFillSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 56 56"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265zm14.227-17.39c-4.477 0-8.04-3.797-8.04-8.836 0-4.711 3.563-8.555 8.04-8.555 4.476 0 8.039 3.844 8.039 8.555 0 5.039-3.563 8.836-8.04 8.836zm0 3.656c8.297 0 13.898 4.57 16.547 9.492-.024.445-.516.727-1.22.727H12.708c-.703 0-1.219-.282-1.242-.727 2.648-4.922 8.25-9.492 16.547-9.492z"
        }
      ></path>
    </svg>
  );
}

export default PersonCropSquareFillSvgrepoComSvgIcon;
/* prettier-ignore-end */
