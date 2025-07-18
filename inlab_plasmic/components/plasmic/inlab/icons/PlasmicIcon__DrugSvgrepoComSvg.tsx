/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type DrugSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function DrugSvgrepoComSvgIcon(props: DrugSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      className={classNames("plasmic-default__svg", className, "icon")}
      version={"1.1"}
      viewBox={"0 0 1024 1024"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"#DAAAAB"} d={"M33.956 93.849H360.15v800.892H33.956z"}></path>

      <path
        fill={"#892127"}
        d={
          "M231.052 1024a216.18 216.18 0 0 1-216.02-216.02V239.787a216.02 216.02 0 0 1 432.04 0V807.82A216.18 216.18 0 0 1 231.051 1024m0-962.225A178.17 178.17 0 0 0 53.04 239.787V807.82a178.012 178.012 0 1 0 356.023 0V239.787A178.17 178.17 0 0 0 231.052 61.775"
        }
      ></path>

      <path
        fill={"#892127"}
        d={
          "M231.052 523.964H33.956V807.98a196.935 196.935 0 0 0 171.276 195.172 55.97 55.97 0 0 1 25.66-105.685A129.26 129.26 0 0 0 360.15 768.208V523.964H230.891z"
        }
      ></path>

      <path
        fill={"#DAAAAB"}
        d={"M392.822 45.967 715.762.005l112.847 792.903-322.94 45.96z"}
      ></path>

      <path
        fill={"#892127"}
        d={
          "m906.534 213.165 77.299 562.902a216.02 216.02 0 0 1-428.03 58.695l-77.299-562.901a216.02 216.02 0 1 1 428.03-58.696m39.611 568.034-77.298-562.902a178.044 178.044 0 1 0-352.816 48.111L593.33 829.31a178.012 178.012 0 1 0 352.815-47.63z"
        }
      ></path>

      <path
        fill={"#892127"}
        d={
          "m731.248 523.964-128.296 17.64-67.196 9.142-38.328-282.253A196.935 196.935 0 0 1 640.639 51.832a55.97 55.97 0 0 0 39.772 101.194A129.26 129.26 0 0 1 826.028 263.52l33.196 242z"
        }
      ></path>
    </svg>
  );
}

export default DrugSvgrepoComSvgIcon;
/* prettier-ignore-end */
