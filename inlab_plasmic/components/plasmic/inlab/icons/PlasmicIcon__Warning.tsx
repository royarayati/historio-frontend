// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type WarningIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function WarningIcon(props: WarningIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 512 512"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M256 34.297L0 477.703h512L256 34.297zm0 387.753c-9.22 0-16.696-7.475-16.696-16.696s7.475-16.696 16.696-16.696c9.22 0 16.696 7.475 16.696 16.696S265.22 422.05 256 422.05zm-16.696-77.913V177.181h33.391v166.956h-33.391z"
        }
      ></path>
    </svg>
  );
}

export default WarningIcon;
/* prettier-ignore-end */
