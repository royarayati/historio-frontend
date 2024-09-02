// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type IonChatboxEllipsesOutlineIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function IonChatboxEllipsesOutlineIcon(
  props: IonChatboxEllipsesOutlineIconProps
) {
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
          "M25.5 4h-19A3.51 3.51 0 003 7.5v12A3.51 3.51 0 006.5 23H9v5l5.857-4.884a.5.5 0 01.321-.116H25.5a3.51 3.51 0 003.5-3.5v-12A3.51 3.51 0 0025.5 4v0z"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinejoin={"round"}
      ></path>

      <path
        d={
          "M10 15.5a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default IonChatboxEllipsesOutlineIcon;
/* prettier-ignore-end */
