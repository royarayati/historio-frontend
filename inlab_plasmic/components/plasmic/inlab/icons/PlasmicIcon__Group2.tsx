// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group2Icon(props: Group2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 29 28"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={"M25 11.667a10.667 10.667 0 10-21.333 0"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>

      <path
        d={
          "M1 17.584v-2.501a2.667 2.667 0 012.02-2.587l2.32-.581a.799.799 0 01.993.776v7.284a.8.8 0 01-.994.777l-2.32-.58A2.667 2.667 0 011 17.585v-.001zm26.667 0v-2.501a2.667 2.667 0 00-2.02-2.587l-2.32-.581a.8.8 0 00-.994.776v7.284a.8.8 0 00.994.777l2.32-.58a2.666 2.666 0 002.02-2.587v-.001zM25 21v.667a2.667 2.667 0 01-2.667 2.666h-4.666"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
      ></path>

      <path
        d={"M16.333 26.333h-4a2 2 0 010-4h4a2 2 0 110 4z"}
        stroke={"currentColor"}
        strokeWidth={"2"}
      ></path>
    </svg>
  );
}

export default Group2Icon;
/* prettier-ignore-end */
