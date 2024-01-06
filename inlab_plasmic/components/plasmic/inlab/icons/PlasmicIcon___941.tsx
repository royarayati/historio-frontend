// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type _941IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function _941Icon(props: _941IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 33 15"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M5.867 13.089c2.688 0 4.285-2.102 4.285-5.662 0-1.34-.256-2.468-.747-3.34C8.695 2.732 7.47 2 5.925 2 3.627 2 2 3.545 2 5.713 2 7.75 3.465 9.23 5.479 9.23c1.238 0 2.241-.579 2.74-1.582h.124c0 2.417-.916 3.86-2.461 3.86-.908 0-1.611-.498-1.853-1.297H2.146c.315 1.736 1.788 2.879 3.721 2.879zm.066-5.361c-1.216 0-2.08-.865-2.08-2.073 0-1.18.908-2.08 2.087-2.08 1.18 0 2.088.915 2.088 2.11 0 1.178-.886 2.043-2.095 2.043zm7.31 5.258c.696 0 1.172-.498 1.172-1.157 0-.666-.476-1.157-1.172-1.157-.688 0-1.172.49-1.172 1.157 0 .66.484 1.157 1.172 1.157zm0-5.493c.696 0 1.172-.49 1.172-1.15 0-.666-.476-1.157-1.172-1.157-.688 0-1.172.49-1.172 1.157 0 .66.484 1.15 1.172 1.15zm8.027 5.339h1.81v-1.97h1.428V9.266H23.08V2.264h-2.666c-1.868 2.812-3.355 5.163-4.307 6.914v1.684h5.164v1.97zM17.859 9.2a79.584 79.584 0 013.34-5.398h.102V9.31h-3.442V9.2zm10.678 3.632h1.89V2.264h-1.883l-2.761 1.933v1.817l2.629-1.846h.125v8.665z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default _941Icon;
/* prettier-ignore-end */
