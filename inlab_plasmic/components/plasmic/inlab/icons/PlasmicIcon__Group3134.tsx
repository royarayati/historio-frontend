// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group3134IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group3134Icon(props: Group3134IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 231 144"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path stroke={"currentColor"} d={"M.5 144V0m115 144V0m115 144V0"}></path>
    </svg>
  );
}

export default Group3134Icon;
/* prettier-ignore-end */
