/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type NextSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function NextSvgrepoComSvgIcon(props: NextSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 48 48"}
      fill={"none"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M18.98 32.376l-10.29 7.02C6.7 40.753 4 39.325 4 36.916V11.005c0-2.411 2.7-3.839 4.691-2.48L27.684 21.48c1.746 1.191 1.746 3.768 0 4.956l-6.705 4.574v5.903a1 1 0 001.564.827l18.968-12.954a1 1 0 000-1.653L22.544 10.18a1 1 0 00-1.565.826v.94a1 1 0 11-2 0v-.94c0-2.411 2.7-3.837 4.692-2.477L42.64 21.482c1.745 1.191 1.745 3.763 0 4.956L23.671 39.392c-1.992 1.36-4.692-.066-4.692-2.478v-4.538zm0-2.421L7.562 37.743A1 1 0 016 36.917V11.005a1 1 0 011.564-.828l18.994 12.956a1 1 0 01.001 1.651L20.98 28.59v-3.672a1 1 0 10-2 0v5.037z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default NextSvgrepoComSvgIcon;
/* prettier-ignore-end */
