// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type IonnotificationsIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function IonnotificationsIcon(props: IonnotificationsIconProps) {
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
          "M26.429 21.598v.002l.136.164.17.207a1.199 1.199 0 01.157 1.282l-.001.001c-.213.446-.669.744-1.235.744H6.351c-.574 0-1.031-.3-1.243-.745l-.001-.003a1.197 1.197 0 01.158-1.282h0l.006-.007a43.897 43.897 0 01.3-.363h0l.03-.037c.673-.812 1.32-1.593 1.76-2.805.438-1.209.647-2.774.647-5.172 0-2.006.402-3.576 1.149-4.789.74-1.204 1.87-2.137 3.468-2.795l.055-.022.052-.03c.116-.064.221-.148.31-.248l.147-.166.064-.213C13.693 3.852 14.84 3 16 3s2.308.852 2.747 2.323l.061.203.138.161c.092.107.202.197.325.266l.051.028.054.023c1.375.565 2.367 1.307 3.09 2.252v.001c.981 1.28 1.526 3.047 1.526 5.33 0 2.397.21 3.96.648 5.17.439 1.21 1.085 1.99 1.755 2.801l.034.04z"
        }
        stroke={"currentColor"}
        strokeWidth={"2"}
      ></path>

      <path
        d={
          "M16 30a5.004 5.004 0 004.402-2.633.25.25 0 00-.22-.367H11.82a.25.25 0 00-.222.367A5.005 5.005 0 0016 30z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default IonnotificationsIcon;
/* prettier-ignore-end */
