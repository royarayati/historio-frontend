// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type VectorIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function VectorIcon(props: VectorIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 48 48"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M43.826 0H4.174A4.174 4.174 0 000 4.174v39.652A4.174 4.174 0 004.174 48h39.652A4.174 4.174 0 0048 43.826V4.174A4.174 4.174 0 0043.826 0z"
        }
        fill={"currentColor"}
        fillOpacity={".12"}
      ></path>
    </svg>
  );
}

export default VectorIcon;
/* prettier-ignore-end */
