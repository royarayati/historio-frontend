// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group5IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group5Icon(props: Group5IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 26 27"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M15.363 26.667H10.51a1.334 1.334 0 01-1.303-1.048l-.542-2.512a10.67 10.67 0 01-2.047-1.183l-2.45.78a1.333 1.333 0 01-1.56-.604l-2.43-4.201a1.341 1.341 0 01.257-1.652l1.9-1.734a10.799 10.799 0 010-2.362l-1.9-1.73a1.341 1.341 0 01-.257-1.653l2.426-4.204a1.333 1.333 0 011.56-.604l2.45.78c.325-.24.664-.464 1.013-.667.337-.189.684-.361 1.039-.514l.544-2.51A1.333 1.333 0 0110.51 0h4.853a1.333 1.333 0 011.302 1.05l.549 2.51a10.912 10.912 0 012.047 1.183l2.45-.78a1.333 1.333 0 011.559.604l2.427 4.204a1.343 1.343 0 01-.258 1.652l-1.9 1.733a10.8 10.8 0 010 2.363l1.9 1.733c.46.424.567 1.11.258 1.652l-2.427 4.204a1.333 1.333 0 01-1.56.604l-2.45-.78c-.635.469-1.321.865-2.045 1.181l-.55 2.506a1.333 1.333 0 01-1.302 1.048zM12.931 8a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group5Icon;
/* prettier-ignore-end */
