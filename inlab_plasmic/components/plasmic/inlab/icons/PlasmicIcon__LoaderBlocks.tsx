// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LoaderBlocksIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LoaderBlocksIcon(props: LoaderBlocksIconProps) {
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

      <path fill={"currentColor"} d={"M19 19h20v20H19z"}>
        <animate
          calcMode={"discrete"}
          begin={"0s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M40 19h20v20H40z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.125s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M61 19h20v20H61z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.25s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M19 40h20v20H19z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.875s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M61 40h20v20H61z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.375s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M19 61h20v20H19z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.75s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M40 61h20v20H40z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.625s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>

      <path fill={"currentColor"} d={"M61 61h20v20H61z"}>
        <animate
          calcMode={"discrete"}
          begin={"0.5s"}
          repeatCount={"indefinite"}
          dur={"1s"}
          keyTimes={"0;0.125;1"}
          values={"rgba(65, 141, 255, 0.323);#418dff;#418dff"}
          attributeName={"fill"}
        ></animate>
      </path>
    </svg>
  );
}

export default LoaderBlocksIcon;
/* prettier-ignore-end */
