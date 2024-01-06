// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Add2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Add2Icon(props: Add2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 32 32"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M24 17H8c-.547 0-1-.453-1-1 0-.547.453-1 1-1h16c.547 0 1 .453 1 1 0 .547-.453 1-1 1z"
        }
        fill={"currentColor"}
        fillOpacity={".4"}
      ></path>

      <path
        d={
          "M16 25c-.547 0-1-.453-1-1V8c0-.547.453-1 1-1 .547 0 1 .453 1 1v16c0 .547-.453 1-1 1z"
        }
        fill={"currentColor"}
        fillOpacity={".4"}
      ></path>
    </svg>
  );
}

export default Add2Icon;
/* prettier-ignore-end */
