import React from "react"
import BarChart from "../charts/BarChart/BarChart"
import LineChart from "../charts/LineChart/LineChart"
import AreaChart from "../charts/AreaChart/AreaChart"
import ScatterPlot from "../charts/ScatterPlot/ScatterPlot"
import PieChart from "../charts/PieChart/PieChart"

import unemployment from "../data/unemployment.json"
import penguins from "../data/penguins.json"
import portfolio from "../data/portfolio.json"
import fruit from "../data/fruit.json"
import skinny_fruit from "../data/skinny_fruit.json"
import sales from "../data/sales.json"

const Test = React.memo(
  (): JSX.Element => {
    return (
      <div style={{width:'100%', height:'100%'}}>
        <PieChart
          data={fruit}
          label="label"
          value="value"
          legend="top-right"
          outerRadius={240}
          legendLabel="l"
          pieLabel={true}
        />
        <PieChart
          data={fruit}
          label="label"
          value="value"
          innerRadius={"85%"}
          outerRadius={"100%"}
          legend="left-top"
        />
        <AreaChart
          data={penguins}
          height="100%"
          width="100%"
          xKey="body_mass_g"
          xDataType="number"
          yKey="culmen_length_mm"
          xGrid={true}
          yGrid={true}
          xAxis="top"
          yAxis="right"
          xAxisLabel="Date"
          yAxisLabel="Number of fruit"
          legend={true}
          // legend="left-top"
          legendLabel="🐬"
        />
        <AreaChart
          data={skinny_fruit}
          height="300px"
          xKey="date"
          xDataType="date"
          yKey="value"
          groupBy="fruit"
          xGrid={true}
          yGrid={true}
          xAxis="bottom"
          yAxis="right"
          // xAxisLabel='Date'
          yAxisLabel="Number of fruit"
          // legend={"right-bottom"}
          // legend={"bottom-right"}
          // legendLabel='fdsafd'
        />
        <BarChart
          height="100%"
          data={fruit}
          xKey="label"
          yKey="value"
          // groupBy='fruit'
          xAxis="bottom"
          yAxis="left"
          yGrid={true}
          xAxisLabel="Date"
          yAxisLabel="Value"
          legend={"bottom"}
          // legendLabel={''}
        />
        <ScatterPlot
          height="100%"
          width="100%"
          data={penguins}
          xKey="flipper_length_mm"
          xDataType="number"
          yKey="body_mass_g"
          groupBy="species"
          yAxis="right"
          xAxis="bottom"
          // xGrid={true}
          // yGrid={true}
          xAxisLabel="Date"
          yAxisLabel="Value"
          legend="bottom"
        />
        <BarChart
          height='300'
          data={skinny_fruit}
          xKey='date'
          yKey='value'
          groupBy='fruit'
          xAxis='bottom'
          yAxis='left'
          yGrid={true}
          xAxisLabel='Date'
          yAxisLabel='Value'
          legend={"right"}
          // legendLabel={''}
        />
        <BarChart
          height='500'
          width='400'
          data={skinny_fruit}
          xKey='date'
          yKey='value'
          // groupBy='fruit'
          xAxis='bottom'
          yAxis='right'
          yGrid={true}
          // xAxisLabel="Date"
          // yAxisLabel="Value"
          // legend={true}
        />
        <LineChart
        height='100%'
        data={unemployment}
        xKey="date"
        xDataType="date"
        yKey="unemployment"
        groupBy="division"
        // xAxis="bottom"
        // yAxis="left"
        // xGrid={true}
        // yGrid={true}
        xAxisLabel='Date'
        yAxisLabel='Unemployment'
        // legend={'bottom-right'}
        // legendLabel="Locations"
      /> 
      <LineChart
        height='100%'
        width='100%'
        data={sales}
        xKey='year'
        xDataType='number'
        yKey='sales'
        yAxis='right'
        xAxis='bottom'
        xGrid={true}
        yGrid={true}
        xAxisLabel='Year'
        yAxisLabel='Sales'
        legend={"bottom-left"}
      />
        </div>
      
    )
  }
)

export default Test;