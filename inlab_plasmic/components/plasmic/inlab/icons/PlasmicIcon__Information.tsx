// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type InformationIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function InformationIcon(props: InformationIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}
        stroke={"currentColor"}
        strokeWidth={"2"}
      ></path>

      <path
        d={"M12 8v5m0 3v-.011"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
      ></path>
    </svg>
  );
}

export default InformationIcon;
/* prettier-ignore-end */
