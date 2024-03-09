// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type FavoriteSvgrepoComsvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function FavoriteSvgrepoComsvgIcon(
  props: FavoriteSvgrepoComsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 36 36"}
      version={"1.1"}
      preserveAspectRatio={"xMidYMid meet"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        className={"clr-i-outline clr-i-outline-path-1"}
        d={
          "M27.19 34a2.22 2.22 0 01-1.24-.38l-7.46-5a.22.22 0 00-.25 0l-7.46 5a2.22 2.22 0 01-3.38-2.41l2.45-8.64a.23.23 0 00-.08-.24l-7.06-5.55a2.22 2.22 0 011.29-4l9-.34a.23.23 0 00.2-.15l3.1-8.43a2.22 2.22 0 014.17 0l3.1 8.43a.23.23 0 00.2.15l9 .34a2.22 2.22 0 011.29 4L27 22.33a.22.22 0 00-.08.24l2.45 8.64A2.23 2.23 0 0127.19 34zm-8.82-7.42a2.21 2.21 0 011.23.42l7.46 5a.22.22 0 00.34-.25l-2.45-8.64a2.21 2.21 0 01.77-2.35l7.06-5.55a.22.22 0 00-.13-.4l-9-.34a2.22 2.22 0 01-2-1.46l-3.1-8.43a.22.22 0 00-.42 0L15.06 13a2.22 2.22 0 01-2 1.46l-9 .34a.22.22 0 00-.13.4L11 20.76a2.22 2.22 0 01.77 2.35l-2.44 8.64a.21.21 0 00.08.24.2.2 0 00.26 0l7.46-5a2.22 2.22 0 011.23-.37z"
        }
      ></path>

      <path fill={"none"} d={"M0 0h36v36H0z"}></path>
    </svg>
  );
}

export default FavoriteSvgrepoComsvgIcon;
/* prettier-ignore-end */
