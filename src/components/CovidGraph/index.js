import {Component} from 'react'
import './index.css'
import BarGraph from '../BarGraph'
import LineGraph from '../LineGraph'

class CovidGraph extends Component {
  state = {barGraphs: true, lineGraphs: false}

  getBarGraphs = () => {
    this.setState({barGraphs: true, lineGraphs: false})
  }

  getLineGraphs = () => {
    this.setState({barGraphs: false, lineGraphs: true})
  }

  render() {
    const {forBarGraph, forLineGraphs} = this.props
    const {barGraphs, lineGraphs} = this.state
    return (
      <div className="graphs-container ">
        <div>
          <div className="toggler-container">
            <h1 className="spread-heading ">Spread Trends</h1>
            <div className="toggles">
              <button
                className="get-bar-graphs btn toggler-button"
                type="button"
                onClick={this.getBarGraphs}
              >
                Daily
              </button>
              <button
                className="get-line-graphs btn toggler-button "
                type="button"
                onClick={this.getLineGraphs}
              >
                Cumulative
              </button>
            </div>
          </div>
        </div>
        <div className="bar-and-line-graphs">
          {barGraphs && <BarGraph forBarGraph={forBarGraph} />}
          {lineGraphs && <LineGraph forLineGraphs={forLineGraphs} />}
        </div>
      </div>
    )
  }
}
export default CovidGraph
