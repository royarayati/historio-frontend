// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type UpArrowSvgrepoCom1SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function UpArrowSvgrepoCom1SvgIcon(
  props: UpArrowSvgrepoCom1SvgIconProps
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

      <g fill={"currentColor"}>
        <path
          d={
            "M184.025 259.35h26.422c6.953 0 12.609 5.652 12.609 12.605v75.034c0 8.708 7.082 15.792 15.788 15.792h34.314c8.706 0 15.786-7.084 15.786-15.792v-75.034c0-6.952 5.658-12.605 12.611-12.605h26.422c4.412 0 7.584-1.494 8.93-4.208 1.347-2.71.619-6.141-2.046-9.658l-69.012-90.966c-2.591-3.412-6.089-5.295-9.85-5.295-3.76 0-7.258 1.883-9.849 5.295l-69.012 90.966c-2.667 3.517-3.393 6.949-2.046 9.658 1.347 2.714 4.521 4.208 8.933 4.208z"
          }
        ></path>

        <path
          d={
            "M256 0C114.842 0 .002 114.84.002 256S114.842 512 256 512s255.998-114.84 255.998-256S397.158 0 256 0zm0 66.785c104.334 0 189.216 84.879 189.216 189.215S360.334 445.215 256 445.215 66.783 360.336 66.783 256 151.667 66.785 256 66.785z"
          }
        ></path>
      </g>
    </svg>
  );
}

export default UpArrowSvgrepoCom1SvgIcon;
/* prettier-ignore-end */
