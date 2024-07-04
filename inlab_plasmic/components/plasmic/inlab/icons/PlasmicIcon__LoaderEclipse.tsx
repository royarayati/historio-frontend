// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LoaderEclipseIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LoaderEclipseIcon(props: LoaderEclipseIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 100 100"}
      preserveAspectRatio={"xMidYMid"}
      style={{
        background: '0 0"',

        ...(style || {}),
      }}
      shapeRendering={"auto"}
      display={"block"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M10 50a40 40 0 0080 0 40 42 0 01-80 0"}>
        <animateTransform
          values={"0 50 51;360 50 51"}
          keyTimes={"0;1"}
          repeatCount={"indefinite"}
          dur={"1s"}
          type={"rotate"}
          attributeName={"transform"}
        ></animateTransform>
      </path>
    </svg>
  );
}

export default LoaderEclipseIcon;
/* prettier-ignore-end */
