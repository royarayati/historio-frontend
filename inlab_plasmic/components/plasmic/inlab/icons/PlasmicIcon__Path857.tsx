// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Path857IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Path857Icon(props: Path857IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 15"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M15 2.802v4.842h-4.485a1.804 1.804 0 00-1.313.496 1.91 1.91 0 00-.591 1.304v2.4H7.099l-1.092 2.07a.646.646 0 01-.76.303.666.666 0 01-.375-.303l-1.092-2.07h-.875a1.803 1.803 0 01-1.314-.496A1.908 1.908 0 011 10.043v-7.24c.021-.499.234-.968.59-1.305.358-.337.83-.516 1.315-.495h10.191a1.8 1.8 0 011.313.496c.356.337.569.806.59 1.304v0z"
        }
        stroke={"currentColor"}
        strokeWidth={"1.5"}
      ></path>
    </svg>
  );
}

export default Path857Icon;
/* prettier-ignore-end */
