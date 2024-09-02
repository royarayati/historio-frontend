// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BookmarkRemoveSvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function BookmarkRemoveSvgrepoComSvgIcon(
  props: BookmarkRemoveSvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 16 16"}
      fill={"none"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        fillRule={"evenodd"}
        d={
          "M2 3.25A2.25 2.25 0 014.25 1h7.5A2.25 2.25 0 0114 3.25v10.83a1 1 0 01-1.478.878L8.12 12.564a.25.25 0 00-.238 0l-4.403 2.394A1 1 0 012 14.08V3.25zM5.75 6a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z"
        }
        clipRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default BookmarkRemoveSvgrepoComSvgIcon;
/* prettier-ignore-end */
