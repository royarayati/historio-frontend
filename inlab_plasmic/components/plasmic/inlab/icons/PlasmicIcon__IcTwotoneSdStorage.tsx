// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type IcTwotoneSdStorageIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function IcTwotoneSdStorageIcon(props: IcTwotoneSdStorageIconProps) {
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
          "M24 27.417h.75V4.583H14.13l-.22.22-6.44 6.44-.22.22v15.954H24zm-10.356-24H24c1.052 0 1.917.864 1.917 1.916v21.334A1.924 1.924 0 0124 28.583H8a1.925 1.925 0 01-1.917-1.916v-15.69l7.561-7.56zm.273 6.666v3.834H12.75v-3.834h1.167zm2.833 0h1.167v3.834H16.75v-3.834zm4 0h1.167v3.834H20.75v-3.834z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
      ></path>
    </svg>
  );
}

export default IcTwotoneSdStorageIcon;
/* prettier-ignore-end */
