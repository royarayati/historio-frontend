/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PrinterSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PrinterSvgrepoComSvgIcon(props: PrinterSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 64 64"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M57.788 14.031H52.5V5.97a4 4 0 00-4-4h-33a4 4 0 00-4 4v8.062H6.212A6.22 6.22 0 000 20.243v26.27a6.22 6.22 0 006.212 6.213h2.38a1 1 0 100-2h-2.38A4.217 4.217 0 012 46.514v-26.27a4.217 4.217 0 014.212-4.213h51.576A4.217 4.217 0 0162 20.243v26.27a4.217 4.217 0 01-4.212 4.213H56a1 1 0 100 2h1.788A6.22 6.22 0 0064 46.514v-26.27a6.22 6.22 0 00-6.212-6.213zM13.5 5.97c0-1.103.897-2 2-2h33c1.103 0 2 .897 2 2v8h-37v-8z"
        }
      ></path>

      <path
        d={
          "M44 45.032H20a.999.999 0 100 1.998h24a.999.999 0 100-1.998zm0 7H20a.999.999 0 100 1.998h24a.999.999 0 100-1.998z"
        }
      ></path>

      <circle cx={"7.959"} cy={"21.841"} r={"2"}></circle>

      <circle cx={"14.286"} cy={"21.841"} r={"2"}></circle>

      <circle cx={"20.612"} cy={"21.841"} r={"2"}></circle>

      <path
        d={"M11 62.031h42v-26H11v26zm2.404-23.596h37.192v21.193H13.404V38.435z"}
      ></path>
    </svg>
  );
}

export default PrinterSvgrepoComSvgIcon;
/* prettier-ignore-end */
