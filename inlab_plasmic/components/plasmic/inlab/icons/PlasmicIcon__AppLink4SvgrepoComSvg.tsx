// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AppLink4SvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function AppLink4SvgrepoComSvgIcon(
  props: AppLink4SvgrepoComSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      viewBox={"0 0 512 512"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g fill={"currentColor"}>
        <path
          d={
            "M243.905 46.304v210.988h24.191V46.304l27.829 27.813 17.104-17.104L256.001 0l-57.014 57.013 17.104 17.104z"
          }
        ></path>

        <path
          d={
            "M376.909 152.534v24.191h54.792v311.084H80.299V176.725h54.808v-24.191h-79V512h399.786V152.534z"
          }
        ></path>
      </g>
    </svg>
  );
}

export default AppLink4SvgrepoComSvgIcon;
/* prettier-ignore-end */
