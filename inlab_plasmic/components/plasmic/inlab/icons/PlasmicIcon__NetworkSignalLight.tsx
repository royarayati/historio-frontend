// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type NetworkSignalLightIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function NetworkSignalLightIcon(props: NetworkSignalLightIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 20 14"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M12 4h1a1 1 0 011 1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1V5a1 1 0 011-1zM7.5 6h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1V7a1 1 0 011-1zM3 7.5h1a1 1 0 011 1V11a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5a1 1 0 011-1z"
        }
        fill={"currentColor"}
      ></path>

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M16.5 2h1a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V3a1 1 0 011-1z"
        }
        fill={"currentColor"}
        fillOpacity={".18"}
      ></path>

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={
          "M12 4h1a1 1 0 011 1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1V5a1 1 0 011-1zM7.5 6h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1V7a1 1 0 011-1zM3 7.5h1a1 1 0 011 1V11a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5a1 1 0 011-1z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default NetworkSignalLightIcon;
/* prettier-ignore-end */
