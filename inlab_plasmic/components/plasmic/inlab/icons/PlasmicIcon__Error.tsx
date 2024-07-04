// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ErrorIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ErrorIcon(props: ErrorIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 512 512"}
      version={"1.1"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M256 42.667c117.803 0 213.333 95.53 213.333 213.333S373.803 469.333 256 469.333 42.667 373.803 42.667 256 138.197 42.667 256 42.667zm48.917 134.25L256 225.835l-48.917-48.918-30.166 30.166L225.835 256l-48.918 48.917 30.166 30.166L256 286.165l48.917 48.918 30.166-30.166L286.165 256l48.918-48.917-30.166-30.166z"
        }
        fill={"currentColor"}
        stroke={"none"}
        strokeWidth={"1"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default ErrorIcon;
/* prettier-ignore-end */
