// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group1917IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group1917Icon(props: Group1917IconProps) {
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
          "M8.25 22.002a6.249 6.249 0 01-1.7-12.263 6.147 6.147 0 013.241-.037l6.594-6.588a3.752 3.752 0 012.67-1.112 2.95 2.95 0 012.948 2.946 3.756 3.756 0 01-1.112 2.673l-.56.56a1.68 1.68 0 01-1.179.487h-1.318v.834a1.668 1.668 0 01-1.668 1.667h-.834v1.322a1.655 1.655 0 01-.489 1.178l-.542.542a6.107 6.107 0 01-.039 3.233 6.277 6.277 0 01-5.36 4.524 6.396 6.396 0 01-.652.034zm0-10.832a4.583 4.583 0 104.41 5.824 4.5 4.5 0 00-.083-2.75.834.834 0 01.2-.862l.89-.891v-1.323a1.666 1.666 0 011.666-1.666h.834v-.834a1.667 1.667 0 011.667-1.666h1.322l.56-.56a2.1 2.1 0 00.619-1.493 1.281 1.281 0 00-1.28-1.28 2.1 2.1 0 00-1.495.619l-6.945 6.941a.835.835 0 01-.864.2 4.556 4.556 0 00-1.5-.258l-.001-.001zm-2.089 5.832A.834.834 0 107.829 17a.834.834 0 00-1.668.002z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group1917Icon;
/* prettier-ignore-end */
