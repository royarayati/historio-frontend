// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AddIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function AddIcon(props: AddIconProps) {
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
          "M18 12.75H6a.755.755 0 01-.75-.75.755.755 0 01.75-.75h12a.755.755 0 01.75.75.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M12 18.75a.755.755 0 01-.75-.75V6a.755.755 0 01.75-.75.755.755 0 01.75.75v12a.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default AddIcon;
/* prettier-ignore-end */
