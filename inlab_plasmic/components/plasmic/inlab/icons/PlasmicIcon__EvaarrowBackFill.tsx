// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type EvaarrowBackFillIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function EvaarrowBackFillIcon(props: EvaarrowBackFillIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 32 32"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M25.333 14.667H9.52l4.84-5.814a1.335 1.335 0 00-2.053-1.706l-6.667 8a1.58 1.58 0 00-.12.2c0 .066 0 .106-.093.173-.06.153-.092.316-.094.48.002.164.033.327.094.48 0 .067 0 .107.093.173.035.07.075.137.12.2l6.667 8a1.332 1.332 0 001.026.48 1.334 1.334 0 001.027-2.186l-4.84-5.814h15.813a1.333 1.333 0 100-2.666z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default EvaarrowBackFillIcon;
/* prettier-ignore-end */
