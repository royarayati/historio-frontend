// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group448IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group448Icon(props: Group448IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 4 8"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M2.529 6.524a.666.666 0 01-.187.46.629.629 0 01-.447.192.622.622 0 01-.353-.11.65.65 0 01-.233-.294.67.67 0 01.138-.711.618.618 0 01.692-.14.64.64 0 01.285.24c.07.108.107.234.107.363h-.002zm1.269-4.569c0 .386-.11.763-.318 1.085a1.916 1.916 0 01-.85.722.155.155 0 00-.07.06.163.163 0 00-.026.091c0 .173-.067.34-.186.462a.626.626 0 01-.898 0 .663.663 0 01-.186-.462c0-.29.082-.573.238-.814.155-.241.377-.43.637-.541a.638.638 0 00.268-.214.664.664 0 00-.156-.934.623.623 0 00-.899.21.667.667 0 00-.088.338.66.66 0 01-.202.428.624.624 0 01-.86 0A.66.66 0 010 1.958C0 1.438.2.941.558.573A1.877 1.877 0 011.904 0c.504 0 .989.206 1.346.573.357.368.557.866.557 1.385l-.01-.003z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Group448Icon;
/* prettier-ignore-end */
