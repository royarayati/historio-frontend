// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type MdiaccountIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function MdiaccountIcon(props: MdiaccountIconProps) {
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
          "M16 6.333A4.333 4.333 0 1116 15a4.333 4.333 0 010-8.667zm0 13.334c2.825 0 5.332.574 7.096 1.456 1.823.911 2.57 1.986 2.57 2.877v1.667H6.334V24c0-.89.748-1.966 2.57-2.877 1.765-.882 4.272-1.456 7.097-1.456z"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
      ></path>
    </svg>
  );
}

export default MdiaccountIcon;
/* prettier-ignore-end */
