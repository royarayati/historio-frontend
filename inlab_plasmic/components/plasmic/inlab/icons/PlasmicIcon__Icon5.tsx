// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Icon5IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Icon5Icon(props: Icon5IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      className={classNames("plasmic-default__svg", className, "icon glyph")}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M6 20a1 1 0 01-.71-.29l-4-4a1 1 0 011.42-1.42L6 17.59l3.29-3.3a1 1 0 011.42 1.42l-4 4A1 1 0 016 20z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M6 20a1 1 0 01-1-1V4a1 1 0 012 0v15a1 1 0 01-1 1zm14-3h-5a1 1 0 010-2h5a1 1 0 010 2zm0-5h-7a1 1 0 010-2h7a1 1 0 010 2zm0-5H10a1 1 0 010-2h10a1 1 0 010 2z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Icon5Icon;
/* prettier-ignore-end */
