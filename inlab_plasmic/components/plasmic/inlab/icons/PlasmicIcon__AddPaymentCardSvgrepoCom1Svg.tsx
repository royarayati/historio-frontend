// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AddPaymentCardSvgrepoCom1SvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function AddPaymentCardSvgrepoCom1SvgIcon(
  props: AddPaymentCardSvgrepoCom1SvgIconProps
) {
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
        d={
          "M21 12.5V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h8m5.5-4v2.5m0 2.5v-2.5m0 0H16m2.5 0H21M3 10h17.5M7 15h2"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default AddPaymentCardSvgrepoCom1SvgIcon;
/* prettier-ignore-end */
