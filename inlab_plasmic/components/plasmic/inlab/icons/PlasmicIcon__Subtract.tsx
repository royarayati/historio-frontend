// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type SubtractIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function SubtractIcon(props: SubtractIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 44 30"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M24.267 30H44V0H0a5.6 5.6 0 015.6 5.6v5.733C5.6 21.643 13.957 30 24.267 30z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default SubtractIcon;
/* prettier-ignore-end */
