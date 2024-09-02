// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BookmarkFill1227SvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function BookmarkFill1227SvgrepoComSvgIcon(
  props: BookmarkFill1227SvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"-5 0 20 20"}
      version={"1.1"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M10 2v16.998c0 .891-1.077 1.337-1.707.707l-2.586-2.586a1 1 0 00-1.414 0l-2.586 2.586c-.63.63-1.707.184-1.707-.707V2a2 2 0 012-2h6a2 2 0 012 2"
        }
        fill={"currentColor"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default BookmarkFill1227SvgrepoComSvgIcon;
/* prettier-ignore-end */
