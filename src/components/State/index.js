import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import objectPath from 'object-path'
import {format} from 'date-fns'
import {Component} from 'react'
import Header from '../Header'
import EachStateTotal from '../EachStateTotal'
import CovidGraph from '../CovidGraph'
import Footer from '../Footer'
import './index.css'

class State extends Component {
  state = {
    totalTested: '',
    date: '',
    category: 'confirmed',
    output: [],
    eachStateTotalData: [],
    isLoading: true,
    forBarGraph: {},
    forLineGraphs: {},
  }

  componentDidMount() {
    this.getDateAndTested()
    this.getDatesData()
  }

  getDatesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      'https://data.covid19india.org/v4/min/timeseries.min.json',
    )
    const fetchedData = await response.json()
    const data = fetchedData[id].dates
    this.getBargraphsData(data)
    this.getLineGraphsData(data)
  }

  getBargraphsData = data => {
    const datesKeysList = Object.keys(data)

    const allDatesLabels = []
    datesKeysList.forEach(item =>
      allDatesLabels.push(format(new Date(item), 'd MMM').toString()),
    )
    const allTendatesLabels = allDatesLabels.reverse().splice(0, 10)

    const dateCountConfirmedList = []
    const dateCountRecoveredList = []
    const dateCountDeceasedList = []
    const dateCountActiveList = []

    allTendatesLabels.reverse().forEach(label => {
      datesKeysList.forEach(item => {
        if (format(new Date(item), 'd MMM').toString() === label) {
          if (format(new Date(item), 'y').toString() === '2021') {
            dateCountConfirmedList.push(data[item].delta.confirmed)
            if (
              Number.isNaN(data[item].delta.deceased) ||
              data[item].delta.deceased === undefined
            ) {
              dateCountDeceasedList.push(0)
            } else {
              dateCountDeceasedList.push(data[item].delta.deceased)
            }
            if (
              Number.isNaN(data[item].delta.recovered) ||
              data[item].delta.recovered === undefined
            ) {
              dateCountRecoveredList.push(0)
            } else {
              dateCountRecoveredList.push(data[item].delta.recovered)
            }
            dateCountActiveList.push(
              data[item].total.confirmed -
                data[item].total.recovered -
                data[item].total.deceased,
            )
          }
        }
      })
    })

    const barGraphsDataObject = {
      forDateLabels: allTendatesLabels,
      forConfirmedCases: dateCountConfirmedList,
      forRecoveredCases: dateCountRecoveredList,
      forDeceasedCases: dateCountDeceasedList,
      forActiveCases: dateCountActiveList,
    }
    this.setState({forBarGraph: barGraphsDataObject})
  }

  getLineGraphsData = data => {
    const datesKeysList = Object.keys(data)
    const allMonthsLabels = []
    datesKeysList.forEach(item =>
      allMonthsLabels.push(format(new Date(item), 'MMM Y').toString()),
    )
    const confirmedList = []
    const recoveredList = []
    const activeList = []
    const deceasedList = []
    const testedList = []
    const vaccinatedOneList = []
    const vaccinatedTwoList = []

    const allUniQueMonthlabels = [...new Set(allMonthsLabels)]

    allUniQueMonthlabels.forEach(label => {
      datesKeysList.forEach(item => {
        if (format(new Date(item), 'MMM Y').toString() === label) {
          if (
            format(new Date(item), 'd').toString() ===
            new Date(
              new Date(item).getFullYear(),
              new Date(item).getMonth() + 1,
              0,
            )
              .getDate()
              .toString()
          ) {
            deceasedList.push(data[item].total.deceased)
            confirmedList.push(data[item].total.confirmed)
            recoveredList.push(data[item].total.recovered)
            vaccinatedOneList.push(
              (data[item].total.confirmed / data[item].total.tested).toFixed(2),
            )
            if (
              Number.isNaN(data[item].total.vaccinated1) ||
              data[item].total.vaccinated1 === undefined
            ) {
              vaccinatedTwoList.push(0)
            } else {
              vaccinatedTwoList.push(data[item].total.vaccinated1)
            }

            testedList.push(data[item].total.tested)
            activeList.push(
              data[item].total.confirmed -
                data[item].total.recovered -
                data[item].total.deceased,
            )
          }
        }
      })
    })
    allUniQueMonthlabels.splice(10, 1)

    const LineGraphsDataObject = {
      forMonthLabels: allUniQueMonthlabels,
      forConfirmedCases: confirmedList,
      forRecoveredCases: recoveredList,
      forDeceasedCases: deceasedList,
      forActiveCases: activeList,
      forTestedCases: testedList,
      forVaccinatedOneCases: vaccinatedOneList,
      forVaccinatedTwoCases: vaccinatedTwoList,
    }
    this.setState({forLineGraphs: LineGraphsDataObject})
  }

  getDateAndTested = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    const distData = data[id].districts
    const eachState = data[id].total

    const {TT} = data
    const {total} = TT
    const {tested} = total
    this.setState({totalTested: tested})

    const getData = Object.keys(data)
      .filter(each => each === id)
      .map(e => objectPath.get(data, `${e}.meta.last_updated`))

    const date = new Date(getData)

    const ans = date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    this.setState({
      date: ans,
      output: distData,
      eachStateTotalData: eachState,
      isLoading: false,
    })
  }

  getStateName = () => {
    const {match, statesList} = this.props
    const {params} = match
    const {id} = params
    const stateName = statesList.filter(each => each.state_code === id)
    return stateName[0].state_name
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal})
  }

  getCategoryWiseData = () => {
    const {output, category} = this.state

    const distNamesList = Object.keys(output)
    const categoryLower = category.toLowerCase()

    const categoryData = distNamesList.map(element => ({
      distName: element,
      value: output[element].total[categoryLower],
    }))

    categoryData.sort((a, b) => b.value - a.value)
    const removeNonValues = categoryData.filter(eachDist => eachDist.value > 0)

    const activeCases = distNamesList.map(element => ({
      distName: element,
      value:
        output[element].total.confirmed -
        output[element].total.recovered -
        output[element].total.deceased,
    }))
    activeCases.sort((a, b) => b.value - a.value)
    const removeActiveNullValues = activeCases.filter(each => each.value > 0)
    if (categoryLower === 'active') {
      return removeActiveNullValues
    }
    return removeNonValues
  }

  render() {
    const stateNameVal = this.getStateName()
    const {
      totalTested,
      date,
      category,
      eachStateTotalData,
      isLoading,
      forBarGraph,
      forLineGraphs,
    } = this.state
    const cat = this.getCategoryWiseData()

    return (
      <div className="state-bg-container">
        <Header />
        <div className="state-container">
          <div className="state-info">
            <div className="state-details-container">
              <div className="state-name-container">
                <h1 className="state-name">{stateNameVal}</h1>
              </div>
              <div>
                <p className="updated-date">{date}</p>
              </div>
            </div>
            <div>
              <p className="tests-heading">Tested</p>
              <p className="tests-count">{totalTested}</p>
            </div>
          </div>
          {isLoading ? (
            <div className="State-loader-container">
              <Loader type="Oval" color="#007BFF" height="50" width="50" />
            </div>
          ) : (
            <EachStateTotal
              onGetCategory={this.onGetCategory}
              eachStateTotalData={eachStateTotalData}
            />
          )}

          <div className="total-districts-container">
            <h1 className={`districts-heading ${category}-dist-color`}>
              Top Districts
            </h1>
            <div className="districts">
              {cat.map(each => (
                <div className="districts-container" key={each.distName}>
                  <p className="district-name">{each.distName}</p>
                  <p className="district-values">{each.value}</p>
                </div>
              ))}
            </div>
            <div className="covid-graphs-main-container">
              <CovidGraph
                forBarGraph={forBarGraph}
                forLineGraphs={forLineGraphs}
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
export default State
