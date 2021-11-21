/* eslint-disable no-unused-vars */
import "./App.css"
import BarChart from "./charts/BarChart/BarChart"
import LineChart from "./charts/LineChart/LineChart"
import AreaChart from "./charts/AreaChart/AreaChart"
import ScatterPlot from "./charts/ScatterPlot/ScatterPlot"
import aapl from "./data/aapl.json"
import unemployment from "./data/unemployment.json"
import sales from "./data/sales.json"
import penguins from "./data/penguins.json"
import portfolio from "./data/portfolio.json"
import countries from "./data/countries.json"
import fruit from "./data/fruit.json"
import skinny_fruit from "./data/skinny_fruit.json"

function App() {
  return (
    <div className="App" style={{backgroundColor: 'rgb(64,64,64)'}}>
      <AreaChart
        data={penguins}
        height="100%"
        width="100%"
        xData={{ key: "body_mass_g", dataType: "number" }}
        yData={{ key: "culmen_length_mm", dataType: "number" }}
        groupBy='species'
        xAxis="bottom"
        yAxis="left"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
      />
      {/* <AreaChart
        data={skinny_fruit}
        xData={{ key: "date", dataType: "date" }}
        yData={{ key: "value", dataType: "number" }}
        groupBy='fruit'
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value" 
        height='100%' width='100%' // WHY are these mandatory?
      /> */}
    </div>
  )
}

export default App
