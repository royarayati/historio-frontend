// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CheckboxUncheckedSvgrepoComSvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function CheckboxUncheckedSvgrepoComSvgIcon(
  props: CheckboxUncheckedSvgrepoComSvgIconProps
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
          "M4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874c.427.218.987.218 2.105.218h9.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.986.218-2.104V7.197c0-1.118 0-1.678-.218-2.105a2.001 2.001 0 00-.875-.874C18.48 4 17.92 4 16.8 4H7.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 00-.874.874C4 5.52 4 6.08 4 7.2z"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default CheckboxUncheckedSvgrepoComSvgIcon;
/* prettier-ignore-end */
