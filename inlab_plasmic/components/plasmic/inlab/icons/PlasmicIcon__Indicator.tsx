// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type IndicatorIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function IndicatorIcon(props: IndicatorIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 6 6"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <circle cx={"3"} cy={"3"} r={"3"} fill={"currentColor"}></circle>
    </svg>
  );
}

export default IndicatorIcon;
/* prettier-ignore-end */
