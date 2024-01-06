// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ExportIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ExportIcon(props: ExportIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 40 40"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M24.067 12.083c-.317 0-.634-.116-.884-.366L19.8 8.333l-3.383 3.384a1.258 1.258 0 01-1.767 0 1.258 1.258 0 010-1.767l4.267-4.267a1.257 1.257 0 011.766 0L24.95 9.95a1.258 1.258 0 010 1.767c-.25.25-.567.366-.883.366z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M19.8 24.883a1.26 1.26 0 01-1.25-1.25V6.683c0-.683.567-1.25 1.25-1.25s1.25.567 1.25 1.25v16.95c0 .7-.567 1.25-1.25 1.25z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M20 34.583c-8.583 0-14.583-6-14.583-14.583 0-.683.566-1.25 1.25-1.25.683 0 1.25.567 1.25 1.25 0 7.117 4.966 12.083 12.083 12.083S32.083 27.117 32.083 20c0-.683.567-1.25 1.25-1.25.684 0 1.25.567 1.25 1.25 0 8.583-6 14.583-14.583 14.583z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ExportIcon;
/* prettier-ignore-end */
