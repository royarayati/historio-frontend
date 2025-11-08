/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LastTrackButtonSvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function LastTrackButtonSvgrepoComSvgIcon(
  props: LastTrackButtonSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 36 36"}
      aria-hidden={"true"}
      role={"img"}
      className={classNames(
        "plasmic-default__svg",
        className,
        "iconify iconify--twemoji"
      )}
      preserveAspectRatio={"xMidYMid meet"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"#3B88C3"}
        d={
          "M36 32a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4h28a4 4 0 014 4v28z"
        }
      ></path>

      <path
        fill={"#FFF"}
        d={"M9 18L21 7v9.166L31 7v22l-10-9.167V29zm0 11H5V7h4z"}
      ></path>
    </svg>
  );
}

export default LastTrackButtonSvgrepoComSvgIcon;
/* prettier-ignore-end */
