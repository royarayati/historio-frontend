// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Evaedit2OutlineIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Evaedit2OutlineIcon(props: Evaedit2OutlineIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 20 20"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M15.833 16.667H4.167a.834.834 0 000 1.666h11.666a.834.834 0 000-1.666zM4.167 15h.075l3.475-.317c.38-.038.736-.205 1.008-.475l7.5-7.5a1.6 1.6 0 00-.058-2.258l-2.284-2.283a1.667 1.667 0 00-2.216-.059l-7.5 7.5c-.27.272-.437.628-.475 1.009l-.359 3.475a.833.833 0 00.834.908zm8.558-11.667L15 5.608l-1.667 1.625L11.1 5l1.625-1.667zm-7.417 7.425L10 6.1l2.25 2.25-4.667 4.667-2.5.233.225-2.492z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Evaedit2OutlineIcon;
/* prettier-ignore-end */
