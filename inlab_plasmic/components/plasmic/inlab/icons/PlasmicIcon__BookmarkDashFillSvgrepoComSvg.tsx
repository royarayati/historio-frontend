// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BookmarkDashFillSvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function BookmarkDashFillSvgrepoComSvgIcon(
  props: BookmarkDashFillSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 16 16"}
      fill={"currentColor"}
      className={classNames(
        "plasmic-default__svg",
        className,
        "bi bi-bookmark-dash-fill"
      )}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fillRule={"evenodd"}
        d={
          "M2 15.5V2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.74.439L8 13.069l-5.26 2.87A.5.5 0 012 15.5zM6 6a.5.5 0 000 1h4a.5.5 0 000-1H6z"
        }
      ></path>
    </svg>
  );
}

export default BookmarkDashFillSvgrepoComSvgIcon;
/* prettier-ignore-end */
