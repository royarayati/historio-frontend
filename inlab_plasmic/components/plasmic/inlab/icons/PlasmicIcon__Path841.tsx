// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Path841IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Path841Icon(props: Path841IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 3 3"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M1.321 0a1.3 1.3 0 00-.736.233C.368.383.2.597.1.846a1.4 1.4 0 00.293 1.486 1.306 1.306 0 001.445.29c.242-.103.449-.279.594-.504a1.392 1.392 0 00.12-1.28 1.363 1.363 0 00-.29-.443A1.29 1.29 0 001.322 0zm0 2.049a.653.653 0 01-.368-.117.681.681 0 01-.244-.308A.703.703 0 01.854.88a.649.649 0 01.724-.15.67.67 0 01.3.251.699.699 0 01.065.644.681.681 0 01-.364.374.644.644 0 01-.258.05z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Path841Icon;
/* prettier-ignore-end */
