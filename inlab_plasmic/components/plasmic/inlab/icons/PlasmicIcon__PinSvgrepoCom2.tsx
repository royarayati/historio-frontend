// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PinSvgrepoCom2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PinSvgrepoCom2Icon(props: PinSvgrepoCom2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M13.554 2.662a2.25 2.25 0 013.055-.02l.125.124L21.5 7.85a2.251 2.251 0 01-.389 3.408l-.136.084-4.897 2.798a.75.75 0 00-.28.282l-.044.091-1.803 4.514a.75.75 0 01-1.147.322l-.08-.07-3.237-3.236-4.951 4.96L3.47 21l.002-1.055 4.953-4.962L5.22 11.78a.75.75 0 01.157-1.18l.095-.046 4.495-1.797a.75.75 0 00.328-.254l.056-.09 2.756-5.168a2.25 2.25 0 01.447-.583zm6.85 6.215L15.64 3.791a.75.75 0 00-1.167.09l-.043.07-2.756 5.168a2.25 2.25 0 01-.989.959l-.161.072-3.439 1.374 5.894 5.891 1.38-3.457a2.25 2.25 0 01.813-1.018l.16-.101 4.897-2.798a.75.75 0 00.28-1.023l-.048-.074-.056-.067z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default PinSvgrepoCom2Icon;
/* prettier-ignore-end */
