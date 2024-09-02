// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type AddSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function AddSvgrepoComSvgIcon(props: AddSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      version={"1.1"}
      viewBox={"0 0 472.615 472.615"}
      xmlSpace={"preserve"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M0 109.02v363.542h363.648V109.02H0zm290.825 191.634h-99.154v99.154h-19.692v-99.154H72.824v-19.692h99.155v-99.15h19.692v99.15h99.154v19.692z"
        }
      ></path>

      <path d={"M109.073.054v89.273h274.271v274.269h89.271V.054z"}></path>
    </svg>
  );
}

export default AddSvgrepoComSvgIcon;
/* prettier-ignore-end */
