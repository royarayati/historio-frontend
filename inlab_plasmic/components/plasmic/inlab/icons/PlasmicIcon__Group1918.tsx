// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group1918IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group1918Icon(props: Group1918IconProps) {
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
          "M6.462 22A4.454 4.454 0 012 17.565V6.436A4.454 4.454 0 016.462 2h4.907a4.456 4.456 0 014.465 4.436v.932a.755.755 0 11-1.51 0v-.932A2.948 2.948 0 0011.369 3.5H6.462A2.947 2.947 0 003.51 6.436v11.129A2.947 2.947 0 006.462 20.5h4.918a2.938 2.938 0 002.944-2.924v-.943a.755.755 0 111.51 0v.943A4.444 4.444 0 0111.38 22H6.462zm11.972-6.555a.745.745 0 010-1.06l1.651-1.634H9.8a.75.75 0 110-1.5h10.289l-1.652-1.635a.746.746 0 010-1.06.76.76 0 011.067 0l2.946 2.913c.06.06.11.13.147.206l.005.013v.012l.005.012a.759.759 0 01.056.248v.07a.743.743 0 01-.072.284l-.007.014v.022l-.007.013a.708.708 0 01-.12.155L19.5 15.447a.758.758 0 01-1.067 0l.001-.002z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group1918Icon;
/* prettier-ignore-end */
