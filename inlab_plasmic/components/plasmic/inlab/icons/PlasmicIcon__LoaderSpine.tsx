// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LoaderSpineIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LoaderSpineIcon(props: LoaderSpineIconProps) {
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

      <g transform={"translate(80 50)"}>
        <circle
          fillOpacity={"1"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.875s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.875s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(45 -50.355 121.569)"}>
        <circle
          fillOpacity={".875"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.75s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.75s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(90 -15 65)"}>
        <circle
          fillOpacity={".75"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.625s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.625s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(135 -.355 41.569)"}>
        <circle
          fillOpacity={".625"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.5s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.5s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(180 10 25)"}>
        <circle
          fillOpacity={".5"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.375s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.375s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(-135 20.355 8.431)"}>
        <circle
          fillOpacity={".375"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.25s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.25s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(-90 35 -15)"}>
        <circle
          fillOpacity={".25"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"-0.125s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"-0.125s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>

      <g transform={"rotate(-45 70.355 -71.569)"}>
        <circle
          fillOpacity={".125"}
          fill={"currentColor"}
          r={"6"}
          cy={"0"}
          cx={"0"}
        >
          <animateTransform
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            values={"1.5 1.5;1 1"}
            begin={"0s"}
            type={"scale"}
            attributeName={"transform"}
          ></animateTransform>

          <animate
            begin={"0s"}
            values={"1;0"}
            repeatCount={"indefinite"}
            dur={"1s"}
            keyTimes={"0;1"}
            attributeName={"fill-opacity"}
          ></animate>
        </circle>
      </g>
    </svg>
  );
}

export default LoaderSpineIcon;
/* prettier-ignore-end */
