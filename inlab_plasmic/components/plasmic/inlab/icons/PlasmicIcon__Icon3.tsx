// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Icon3IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Icon3Icon(props: Icon3IconProps) {
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
          "M22 22.75H2a.755.755 0 01-.75-.75.755.755 0 01.75-.75h20a.755.755 0 01.75.75.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M21 22.75H3a.755.755 0 01-.75-.75V6c0-3.02 1.73-4.75 4.75-4.75h10c3.02 0 4.75 1.73 4.75 4.75v16a.755.755 0 01-.75.75zm-17.25-1.5h16.5V6c0-2.22-1.03-3.25-3.25-3.25H7C4.78 2.75 3.75 3.78 3.75 6v15.25z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M15 22.75H9a.755.755 0 01-.75-.75v-6.06a1.694 1.694 0 011.69-1.69h4.13a1.694 1.694 0 011.69 1.69V22a.771.771 0 01-.76.75zm-5.25-1.5h4.5v-5.31a.189.189 0 00-.117-.175.189.189 0 00-.073-.015H9.93a.19.19 0 00-.19.19v5.31h.01zm2.25-9.5a.755.755 0 01-.75-.75V6a.755.755 0 01.75-.75.755.755 0 01.75.75v5a.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>

      <path
        d={
          "M14.5 9.25h-5a.755.755 0 01-.75-.75.755.755 0 01.75-.75h5a.755.755 0 01.75.75.755.755 0 01-.75.75z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Icon3Icon;
/* prettier-ignore-end */
