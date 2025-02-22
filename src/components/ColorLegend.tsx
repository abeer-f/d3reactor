import React, { useEffect } from "react"
import { ColorLegendProps } from "../../types"

export const ColorLegend = ({
  colorScale,
  circleRadius = 10,
  tickSpacing = circleRadius * 2 + 6,
  tickTextOffset = circleRadius * 1.2 + 3,
  legendLabel = "",
  legendPosition,
  legendWidth,
  legendHeight,
  setLegendOffset,
  margin, // margin of chart
  xAxisPosition = false,
  yAxisPosition = false,
  cWidth,
  cHeight,
  EXTRA_LEGEND_MARGIN = 6,
  fontSize = 16,
  xPosition,
  yPosition,
}: ColorLegendProps) => {
  const domain = colorScale.domain()
  // Make space for legend label
  let longestWord: number
  let labelHeightOffset: number
  if (legendLabel) {
    longestWord = legendLabel.length
    labelHeightOffset = 1.5
  } else {
    longestWord = 0
    labelHeightOffset = 0
  }

  // determine legend placement for any chart except pie,
  // or if no manual legend coordinates are passed in
  if (!xPosition && !yPosition) {
    let correctForAxis = 0
    xPosition = 0
    yPosition = cHeight / 2 - legendHeight / 2
    switch (legendPosition) {
      case "top":
        xPosition = (cWidth - margin.left - margin.right) / 2 - legendWidth / 2
        yPosition = legendHeight / 2 - margin.top + EXTRA_LEGEND_MARGIN
        break
      case "left-top":
        xPosition = EXTRA_LEGEND_MARGIN - margin.left
        yPosition = legendHeight / 2 - margin.top + EXTRA_LEGEND_MARGIN
        break
      case "right-top":
        xPosition =
          cWidth -
          margin.left -
          margin.right -
          legendWidth -
          EXTRA_LEGEND_MARGIN +
          20
        yPosition = legendHeight / 2 - margin.top + EXTRA_LEGEND_MARGIN
        break
      case "bottom":
        xPosition = (cWidth - margin.left - margin.right) / 2 - legendWidth / 2
        correctForAxis = xAxisPosition === "top" ? margin.bottom : margin.top
        yPosition =
          cHeight - legendHeight / 2 - correctForAxis - EXTRA_LEGEND_MARGIN
        break
      case "left-bottom":
        xPosition = EXTRA_LEGEND_MARGIN - margin.left
        correctForAxis = xAxisPosition === "top" ? margin.bottom : margin.top
        yPosition =
          cHeight - legendHeight / 2 - correctForAxis - EXTRA_LEGEND_MARGIN
        break
      case "right-bottom":
        xPosition =
          cWidth -
          margin.left -
          margin.right -
          legendWidth -
          EXTRA_LEGEND_MARGIN +
          20
        correctForAxis = xAxisPosition === "top" ? margin.bottom : margin.top
        yPosition =
          cHeight - legendHeight / 2 - correctForAxis - EXTRA_LEGEND_MARGIN
        break
      case "left":
        xPosition = -margin.left + EXTRA_LEGEND_MARGIN
        break
      case "top-left":
        xPosition = -margin.left + EXTRA_LEGEND_MARGIN
        yPosition = legendHeight / 2 - margin.top + EXTRA_LEGEND_MARGIN
        break
      case "bottom-left":
        xPosition = -margin.left + EXTRA_LEGEND_MARGIN
        correctForAxis = xAxisPosition === "top" ? margin.bottom : margin.top
        yPosition =
          cHeight - legendHeight / 2 - correctForAxis - EXTRA_LEGEND_MARGIN
        break
      case "top-right":
        correctForAxis = yAxisPosition === "left" ? margin.right : margin.left
        xPosition = cWidth - legendWidth - correctForAxis - EXTRA_LEGEND_MARGIN
        yPosition = legendHeight / 2 - margin.top + EXTRA_LEGEND_MARGIN
        break
      case "bottom-right":
        correctForAxis = yAxisPosition === "left" ? margin.right : margin.left
        xPosition = cWidth - legendWidth - correctForAxis - EXTRA_LEGEND_MARGIN
        correctForAxis = xAxisPosition === "top" ? margin.bottom : margin.top
        yPosition =
          cHeight - legendHeight / 2 - correctForAxis - EXTRA_LEGEND_MARGIN
        break
      case "right":
      default:
        correctForAxis = yAxisPosition === "left" ? margin.right : margin.left
        xPosition = cWidth - legendWidth - correctForAxis - EXTRA_LEGEND_MARGIN
    }
  }

  const rectHeight =
    tickSpacing * (domain.length + labelHeightOffset) + EXTRA_LEGEND_MARGIN * 2
  // trying to make the legend no taller than the chart:
  // const rectHeight = Math.min(tickSpacing*(domain.length + labelHeightOffset) + EXTRA_LEGEND_MARGIN*2, cHeight);

  // iterate thru category names, create color swab & text for each
  const legend = domain.map((domainValue: string, i: number) => {
    if (domainValue.length > longestWord) longestWord = domainValue.length
    return (
      <g
        className="tick"
        key={domainValue}
        transform={`translate(${EXTRA_LEGEND_MARGIN + circleRadius},
                   ${
                     (i + labelHeightOffset) * tickSpacing +
                     EXTRA_LEGEND_MARGIN -
                     rectHeight / 2 +
                     circleRadius
                   })`}
      >
        <circle fill={colorScale(domainValue)} r={circleRadius} />
        <text x={tickTextOffset} dy=".32em">
          {domainValue}
        </text>
      </g>
    )
  })

  const rectWidth =
    tickTextOffset +
    circleRadius * 2 +
    (longestWord * (fontSize + 1)) / 2 +
    EXTRA_LEGEND_MARGIN * 2 //+1 by fontSize is a bit of a kludge

  useEffect(() => setLegendOffset([rectWidth, rectHeight]), [])

  const style: React.CSSProperties | undefined = {
    margin: "0px 0px",
    padding: "0px 0px",
    maxHeight: "100%",
    width: rectWidth > 0 ? rectWidth : 20,
    height: rectHeight > 0 ? rectHeight : 20,
    border: "1px solid $tooltip-border",
    borderRadius: "3px",
    color: "#3f517e",
    // You can also use a fixed width and ommit the white-sapce.
    whiteSpace: "nowrap",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px",
  }
  return (
    <g
      data-test-id="color-legend"
      transform={`translate(${xPosition}, ${yPosition})`}
    >
      <foreignObject
        x={0}
        y={-rectHeight / 2}
        width={rectWidth > 0 ? rectWidth : 20}
        height={rectHeight > 0 ? rectHeight : 20}
        pointerEvents="none"
        // style={fill: 'red'}
      >
        <div style={style}></div>
      </foreignObject>

      <text
        className={"sectionLabel" /* TODO: implement CSS */}
        x={rectWidth / 2 /* Where to put Legend title label */}
        y={
          -rectHeight / 2 +
          EXTRA_LEGEND_MARGIN / 2 +
          16 /* Where to put Legend title label */
        }
        textAnchor={"middle"}
      >
        {legendLabel}
      </text>
      {legend}
    </g>
  )
}
