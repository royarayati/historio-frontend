// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group3IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group3Icon(props: Group3IconProps) {
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
          "M0 .75A.75.75 0 01.75 0h4.5a.75.75 0 110 1.5H1.5v3.75a.75.75 0 01-1.5 0V.75zm18 0a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 11-1.5 0V1.5h-3.75A.75.75 0 0118 .75zM.75 18a.75.75 0 01.75.75v3.75h3.75a.75.75 0 110 1.5H.75a.75.75 0 01-.75-.75v-4.5A.75.75 0 01.75 18zm22.5 0a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 110-1.5h3.75v-3.75a.75.75 0 01.75-.75zM6 6h1.5v1.5H6V6z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={"M10.5 3H3v7.5h7.5V3zm-6 1.5H9V9H4.5V4.5zm3 12H6V18h1.5v-1.5z"}
        fill={"currentColor"}
      ></path>

      <path
        d={"M10.5 13.5H3V21h7.5v-7.5zm-6 1.5H9v4.5H4.5V15zm12-9H18v1.5h-1.5V6z"}
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M13.5 3H21v7.5h-7.5V3zM15 4.5V9h4.5V4.5H15zM12 12v3h1.5v1.5H12V18h3v-3h1.5v3H18v-1.5h3V15h-4.5v-3H12zm3 3h-1.5v-1.5H15V15zm6 3h-1.5v1.5h-3V21H21v-3zm-6 3v-1.5h-3V21h3z"
        }
        fill={"currentColor"}
      ></path>

      <path d={"M18 13.5h3V12h-3v1.5z"} fill={"currentColor"}></path>
    </svg>
  );
}

export default Group3Icon;
/* prettier-ignore-end */
