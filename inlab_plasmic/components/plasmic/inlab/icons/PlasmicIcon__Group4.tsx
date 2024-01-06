// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group4IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group4Icon(props: Group4IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 28 28"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M12.667 23.333c5.89 0 10.666-4.775 10.666-10.666S18.558 2 12.667 2 2 6.776 2 12.667c0 5.89 4.776 10.666 10.667 10.666zM26 26l-5.8-5.8"
        }
        stroke={"currentColor"}
        strokeWidth={"2.667"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      ></path>
    </svg>
  );
}

export default Group4Icon;
/* prettier-ignore-end */
