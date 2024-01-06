// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type _IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function _Icon(props: _IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 8 12"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M.438 7.077h3.144L1.938 11.32c-.237.612.407.93.825.44l5.082-6.054A.568.568 0 008 5.332c0-.233-.186-.405-.438-.405H4.418L6.057.68c.237-.607-.408-.93-.82-.44L.15 6.293a.57.57 0 00-.15.374c0 .238.186.41.438.41z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default _Icon;
/* prettier-ignore-end */
