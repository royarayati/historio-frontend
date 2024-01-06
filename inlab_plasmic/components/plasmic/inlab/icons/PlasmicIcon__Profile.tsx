// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ProfileIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ProfileIcon(props: ProfileIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 20"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M0 15.488c0-3.157 4.329-3.52 7.585-3.52 1.875 0 7.583 0 7.583 3.54 0 3.155-4.328 3.52-7.583 3.52-1.876 0-7.585 0-7.585-3.54zm1.44 0c0 1.396 2.068 2.104 6.148 2.104s6.146-.702 6.146-2.085c0-1.396-2.068-2.104-6.146-2.104-4.078 0-6.148.702-6.148 2.085zm6.118-5.32A5.084 5.084 0 117.585 0a5.084 5.084 0 110 10.169h-.027zm-3.69-5.083A3.709 3.709 0 007.557 8.8l.027.684V8.8a3.717 3.717 0 10-3.718-3.715z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default ProfileIcon;
/* prettier-ignore-end */
