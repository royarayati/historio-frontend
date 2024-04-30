// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BookmarkPlusSvgrepoComsvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BookmarkPlusSvgrepoComsvgIcon(
  props: BookmarkPlusSvgrepoComsvgIconProps
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
        "bi bi-bookmark-plus"
      )}
      stroke={"currentColor"}
      strokeWidth={"0"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g stroke={"none"}>
        <path
          d={
            "M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-1a1 1 0 00-1 1v12.566l4.723-2.482a.5.5 0 01.554 0L13 14.566V2a1 1 0 00-1-1H4z"
          }
        ></path>

        <path
          d={
            "M8 4a.5.5 0 01.5.5V6H10a.5.5 0 010 1H8.5v1.5a.5.5 0 01-1 0V7H6a.5.5 0 010-1h1.5V4.5A.5.5 0 018 4z"
          }
        ></path>
      </g>
    </svg>
  );
}

export default BookmarkPlusSvgrepoComsvgIcon;
/* prettier-ignore-end */
