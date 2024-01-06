// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group1721IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group1721Icon(props: Group1721IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 21 21"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M11.286 17.476a8.738 8.738 0 10-8.738-8.739 8.749 8.749 0 008.738 8.739zm0-16.131a7.392 7.392 0 11-7.392 7.392 7.4 7.4 0 017.392-7.392zM.75 20.514a.751.751 0 00.53-.215l3.52-3.518a.751.751 0 00-1.056-1.063L.22 19.233a.75.75 0 00.53 1.281"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group1721Icon;
/* prettier-ignore-end */
