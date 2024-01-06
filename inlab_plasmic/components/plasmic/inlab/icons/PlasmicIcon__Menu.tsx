// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type MenuIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function MenuIcon(props: MenuIconProps) {
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
          "M21 7.75H3A.755.755 0 012.25 7 .755.755 0 013 6.25h18a.755.755 0 01.75.75.755.755 0 01-.75.75zm0 5H3a.755.755 0 01-.75-.75.755.755 0 01.75-.75h18a.755.755 0 01.75.75.755.755 0 01-.75.75zm0 5H3a.755.755 0 01-.75-.75.755.755 0 01.75-.75h18a.755.755 0 01.75.75.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default MenuIcon;
/* prettier-ignore-end */
