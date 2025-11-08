/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type FilterSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function FilterSvgrepoComSvgIcon(props: FilterSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g fill={"none"} fillRule={"evenodd"} stroke={"none"} strokeWidth={"1"}>
        <path d={"M0 0h24v24H0z"}></path>

        <path
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeWidth={"2"}
          d={"M4 5h12M4 12h6m4 0h6M8 19h12"}
        ></path>

        <circle
          cx={"18"}
          cy={"5"}
          r={"2"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeWidth={"2"}
        ></circle>

        <circle
          cx={"12"}
          cy={"12"}
          r={"2"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeWidth={"2"}
        ></circle>

        <circle
          cx={"6"}
          cy={"19"}
          r={"2"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeWidth={"2"}
        ></circle>
      </g>
    </svg>
  );
}

export default FilterSvgrepoComSvgIcon;
/* prettier-ignore-end */
