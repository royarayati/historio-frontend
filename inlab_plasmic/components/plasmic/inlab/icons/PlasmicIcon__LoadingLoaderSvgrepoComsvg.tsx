// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LoadingLoaderSvgrepoComsvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function LoadingLoaderSvgrepoComsvgIcon(
  props: LoadingLoaderSvgrepoComsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      viewBox={"0 0 512 512"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M116.364 221.091H23.273C10.42 221.091 0 231.511 0 244.364s10.42 23.273 23.273 23.273h93.091c12.853 0 23.273-10.42 23.273-23.273-.001-12.853-10.421-23.273-23.273-23.273z"
        }
        fill={"#2d50a7"}
      ></path>

      <path
        d={
          "M488.727 221.091h-93.091c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h93.091c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.273-23.273z"
        }
        fill={"#73a1fb"}
      ></path>

      <path
        d={
          "M140.805 326.645L74.98 392.471c-9.089 9.089-9.089 23.823 0 32.912 4.544 4.544 10.501 6.816 16.457 6.816s11.913-2.273 16.455-6.816l65.825-65.826c9.089-9.089 9.089-23.824 0-32.912s-23.825-9.089-32.912 0z"
        }
        fill={"#355ec9"}
      ></path>

      <path
        d={
          "M256 11.636c-12.853 0-23.273 10.42-23.273 23.273v46.545c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V34.909c0-12.853-10.42-23.273-23.273-23.273zm148.105 51.708L338.28 129.17c-9.089 9.089-9.089 23.824 0 32.912 4.544 4.544 10.501 6.817 16.457 6.817s11.913-2.273 16.455-6.817l65.825-65.826c9.089-9.089 9.089-23.824 0-32.912-9.087-9.089-23.825-9.089-32.912 0z"
        }
        fill={"#c4d9fd"}
      ></path>

      <path
        d={
          "M256 360.727c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V384c0-12.853-10.42-23.273-23.273-23.273z"
        }
        fill={"#3d6deb"}
      ></path>

      <path
        d={
          "M371.192 326.645c-9.086-9.089-23.824-9.089-32.912 0-9.089 9.087-9.089 23.824 0 32.912l65.825 65.826a23.202 23.202 0 0016.457 6.816 23.2 23.2 0 0016.455-6.816c9.089-9.089 9.089-23.824 0-32.912l-65.825-65.826z"
        }
        fill={"#5286fa"}
      ></path>
    </svg>
  );
}

export default LoadingLoaderSvgrepoComsvgIcon;
/* prettier-ignore-end */
