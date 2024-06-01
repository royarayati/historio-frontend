// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ShareSvgrepoComsvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ShareSvgrepoComsvgIcon(props: ShareSvgrepoComsvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 458.624 458.624"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M339.588 314.529a71.683 71.683 0 00-38.621 11.239l-112.682-78.67a72.036 72.036 0 002.798-19.871c0-6.896-.989-13.557-2.798-19.871l109.64-76.547c11.764 8.356 26.133 13.286 41.662 13.286 39.79 0 72.047-32.257 72.047-72.047S379.378 0 339.588 0c-39.79 0-72.047 32.257-72.047 72.047 0 5.255.578 10.373 1.646 15.308l-112.424 78.491c-10.974-6.759-23.892-10.666-37.727-10.666-39.79 0-72.047 32.257-72.047 72.047s32.256 72.047 72.047 72.047c13.834 0 26.753-3.907 37.727-10.666l113.292 79.097a72.108 72.108 0 00-2.514 18.872c0 39.79 32.257 72.047 72.047 72.047s72.047-32.257 72.047-72.047-32.257-72.048-72.047-72.048z"
        }
      ></path>
    </svg>
  );
}

export default ShareSvgrepoComsvgIcon;
/* prettier-ignore-end */
