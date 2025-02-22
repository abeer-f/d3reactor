import React from "react"
import * as d3 from "d3"

import {
  ArcProps,
  Data,
  Margin,
  ScaleFunc,
  xAccessorFunc,
  yAccessorFunc,
} from "../../types"

export const Arc = React.memo(
  ({
    data,
    key,
    fill = "none",
    stroke,
    strokeWidth = "1px",
    d,
    setTooltip,
  }: ArcProps): JSX.Element => {
    let cellCenter = {
      cx: 0,
      cy: 0,
      tooltipData: data,
    }
    const onMouseMove = (e: any) => {
      if (setTooltip) {
        cellCenter = {
          cx: e.pageX,
          cy: e.pageY,
          tooltipData: data,
        }
        setTooltip(cellCenter)
      }
    }

    const onMouseLeave = (e: any) => {
      if (setTooltip) {
        setTooltip ? setTooltip(false) : null
      }
    }

    return (
      <path
        className="arc"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        d={d}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseLeave={(e) => onMouseLeave(e)}
      />
    )
  }
)
