// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Icons8CloseSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Icons8CloseSvgIcon(props: Icons8CloseSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 50 50"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"none"}
        stroke={"currentColor"}
        strokeWidth={"4"}
        strokeMiterlimit={"10"}
        d={"M7.741 7.741l34.618 34.618m-.101-34.617l-34.64 34.64"}
      ></path>
    </svg>
  );
}

export default Icons8CloseSvgIcon;
/* prettier-ignore-end */
