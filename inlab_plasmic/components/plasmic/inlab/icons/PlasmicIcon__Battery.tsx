// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BatteryIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BatteryIcon(props: BatteryIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 19 8"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M5.38 3.655L8.45 0H1a1 1 0 00-1 1v6a1 1 0 001 1h6.377l.746-1.923H6.438C5.7 6.077 5 5.522 5 4.667c0-.412.162-.745.374-1.006l.005-.006zm6.495-1.728L12.62 0H18a1 1 0 011 1v6a1 1 0 01-1 1h-6.454l3.064-3.65c.215-.253.39-.594.39-1.018 0-.858-.709-1.405-1.438-1.405h-1.687z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default BatteryIcon;
/* prettier-ignore-end */
