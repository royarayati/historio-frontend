// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type JamhomeIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function JamhomeIcon(props: JamhomeIconProps) {
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
          "M26.667 26.667V12.176L16 5.776l-10.667 6.4v14.49h5.334V23a5.333 5.333 0 1110.666 0v3.667h5.334zm-8 2.666V23a2.667 2.667 0 00-5.334 0v6.333h-8a2.667 2.667 0 01-2.666-2.666V12.176A2.667 2.667 0 013.96 9.889l10.667-6.4a2.667 2.667 0 012.744 0l10.667 6.4a2.668 2.668 0 011.294 2.287v14.49a2.667 2.667 0 01-2.666 2.667h-8z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default JamhomeIcon;
/* prettier-ignore-end */
