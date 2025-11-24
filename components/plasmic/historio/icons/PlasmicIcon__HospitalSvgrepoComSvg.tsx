/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type HospitalSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function HospitalSvgrepoComSvgIcon(
  props: HospitalSvgrepoComSvgIconProps
) {
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
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M7 6H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 7.52 2 8.08 2 9.2v8.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3.52 21 4.08 21 5.2 21h13.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 19.48 22 18.92 22 17.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 6 19.92 6 18.8 6H17M2 10h2m16 0h2M2 14h2m16 0h2M12 6v4m-2-2h4m3 13V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C15.48 3 14.92 3 13.8 3h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C7 4.52 7 5.08 7 6.2V21zm-3 0v-4a2 2 0 1 0-4 0v4z"
        }
      ></path>
    </svg>
  );
}

export default HospitalSvgrepoComSvgIcon;
/* prettier-ignore-end */
