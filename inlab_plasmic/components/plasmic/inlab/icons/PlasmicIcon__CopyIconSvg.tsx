// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CopyIconSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CopyIconSvgIcon(props: CopyIconSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 64 64"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M53.98 9.143h-3.97c-.082 0-.155.028-.232.047V5.023C49.778 2.253 47.473 0 44.64 0H10.217C7.384 0 5.08 2.253 5.08 5.023v46.843c0 2.77 2.305 5.023 5.138 5.023h6.037v2.268c0 2.67 2.216 4.843 4.941 4.843H53.98c2.725 0 4.942-2.173 4.942-4.843v-45.17c0-2.671-2.217-4.844-4.942-4.844zM7.11 51.866V5.023c0-1.649 1.394-2.991 3.106-2.991H44.64c1.712 0 3.106 1.342 3.106 2.99v46.844c0 1.649-1.394 2.991-3.106 2.991H10.217c-1.712 0-3.106-1.342-3.106-2.99zm49.778 7.29c0 1.551-1.306 2.812-2.91 2.812H21.195c-1.604 0-2.91-1.26-2.91-2.811v-2.268H44.64c2.833 0 5.138-2.253 5.138-5.023V11.128c.077.018.15.047.233.047h3.968c1.604 0 2.91 1.26 2.91 2.811v45.17z"
        }
      ></path>

      <path
        d={
          "M38.603 13.206H16.254a1.015 1.015 0 100 2.032h22.35a1.015 1.015 0 100-2.032zm0 8.127H16.254a1.015 1.015 0 100 2.032h22.35a1.015 1.015 0 100-2.032zm0 8.127H16.254a1.015 1.015 0 100 2.032h22.35a1.015 1.015 0 100-2.032zm-10.159 8.127h-12.19a1.015 1.015 0 100 2.032h12.19a1.015 1.015 0 100-2.032z"
        }
      ></path>
    </svg>
  );
}

export default CopyIconSvgIcon;
/* prettier-ignore-end */
