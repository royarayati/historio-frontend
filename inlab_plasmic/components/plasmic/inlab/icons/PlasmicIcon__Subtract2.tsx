// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Subtract2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Subtract2Icon(props: Subtract2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 23 12"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M11.291 1H3a2 2 0 00-2 2v6a2 2 0 002 2h5.99a1.638 1.638 0 00-.04 1H3a3 3 0 01-3-3V3a3 3 0 013-3h9.132l-.84 1zm1.416 10H20a2 2 0 002-2V3a2 2 0 00-2-2h-4.996c.117-.324.135-.679.041-1H20a3 3 0 013 3v6a3 3 0 01-3 3h-8.133l.84-1z"
        }
        fill={"currentColor"}
        fillOpacity={".3"}
      ></path>
    </svg>
  );
}

export default Subtract2Icon;
/* prettier-ignore-end */
