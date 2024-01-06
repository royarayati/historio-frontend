// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BookmarkSvgrepoCom1SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BookmarkSvgrepoCom1SvgIcon(
  props: BookmarkSvgrepoCom1SvgIconProps
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
          "M4 4a3 3 0 013-3h10a3 3 0 013 3v16.942c0 1.67-1.923 2.604-3.236 1.573L12 18.772l-4.764 3.743C5.923 23.546 4 22.611 4 20.942V4zm3-1a1 1 0 00-1 1v16.942l6-4.714 6 4.714V4a1 1 0 00-1-1H7z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BookmarkSvgrepoCom1SvgIcon;
/* prettier-ignore-end */
