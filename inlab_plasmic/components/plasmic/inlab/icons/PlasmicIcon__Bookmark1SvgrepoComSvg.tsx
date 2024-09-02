// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Bookmark1SvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Bookmark1SvgrepoComSvgIcon(
  props: Bookmark1SvgrepoComSvgIconProps
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
        d={
          "M10 10.5h4m-2-2v4M8.25 5h7.5c.69 0 1.25.588 1.25 1.313V19l-5-3.5L7 19V6.312C7 5.588 7.56 5 8.25 5z"
        }
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default Bookmark1SvgrepoComSvgIcon;
/* prettier-ignore-end */
