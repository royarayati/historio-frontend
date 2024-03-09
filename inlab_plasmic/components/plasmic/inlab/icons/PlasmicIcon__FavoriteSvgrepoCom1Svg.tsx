// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type FavoriteSvgrepoCom1SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function FavoriteSvgrepoCom1SvgIcon(
  props: FavoriteSvgrepoCom1SvgIconProps
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
        className={"clr-i-solid clr-i-solid-path-1"}
        d={
          "M34 16.78a2.22 2.22 0 00-1.29-4l-9-.34a.23.23 0 01-.2-.15l-3.11-8.4a2.22 2.22 0 00-4.17 0l-3.1 8.43a.23.23 0 01-.2.15l-9 .34a2.22 2.22 0 00-1.29 4l7.06 5.55a.23.23 0 01.08.24l-2.43 8.61a2.22 2.22 0 003.38 2.45l7.46-5a.22.22 0 01.25 0l7.46 5a2.2 2.2 0 002.55 0 2.2 2.2 0 00.83-2.4l-2.45-8.64a.22.22 0 01.08-.24z"
        }
      ></path>

      <path fill={"none"} d={"M0 0h36v36H0z"}></path>
    </svg>
  );
}

export default FavoriteSvgrepoCom1SvgIcon;
/* prettier-ignore-end */
