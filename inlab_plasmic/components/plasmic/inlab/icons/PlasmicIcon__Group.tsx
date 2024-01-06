// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type GroupIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function GroupIcon(props: GroupIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 6 32"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M2.776 4.552a1.776 1.776 0 100-3.552 1.776 1.776 0 000 3.552zm0 13.024a1.776 1.776 0 100-3.552 1.776 1.776 0 000 3.552zm0 13.024a1.776 1.776 0 100-3.552 1.776 1.776 0 000 3.552z"
        }
        fill={"currentColor"}
        stroke={"currentColor"}
        strokeWidth={"1.776"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default GroupIcon;
/* prettier-ignore-end */
