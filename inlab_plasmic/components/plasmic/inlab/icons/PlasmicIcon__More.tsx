// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type MoreIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function MoreIcon(props: MoreIconProps) {
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
          "M5 10a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4zm-7 0a2 2 0 100 4 2 2 0 000-4z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default MoreIcon;
/* prettier-ignore-end */
