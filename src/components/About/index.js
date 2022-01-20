import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Faqs from '../Faqs'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    aboutFactoids: [],
    aboutFaqs: [],
  }

  componentDidMount() {
    this.getAboutPageDetails()
  }

  getAboutPageDetails = async () => {
    const {aboutFaqs} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.faq.map(eachFaq => ({
        answer: eachFaq.answer,
        category: eachFaq.category,
        qno: eachFaq.qno,
        question: eachFaq.question,
      }))
      const updateFactoidsData = data.factoids.map(each => ({
        banner: each.banner,
        id: each.id,
      }))
      aboutFaqs.push(updatedData)
      this.setState({
        aboutFaqs: updatedData,
        apiStatus: apiStatusConstants.success,
        aboutFactoids: updateFactoidsData,
      })
    } else {
      this.renderAboutFailure()
    }
  }

  renderAboutSuccess = () => {
    const {aboutFactoids, aboutFaqs} = this.state
    return (
      <div className="about-main-container" testid="faqsUnorderedList">
        <h1 className="about-title">About</h1>
        <p className="about-date">Last update on march 28th 2021.</p>
        <h1 className="about-heading">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul className="about-faqs-container" testid="faqsUnorderedList">
          {aboutFaqs.map(eachItem => (
            <Faqs faqDetails={eachItem} key={eachItem.qno} />
          ))}
        </ul>
        <div className="about-footer-container">
          <Footer />
        </div>
      </div>
    )
  }

  renderAboutFailure = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dgahohki4/image/upload/v1636698000/Group_7484_d8dbn4.png"
        className="failure-image"
        alt="failure"
      />
      <h1 className="failure-heading">PAGE NOT FOUND</h1>
    </div>
  )

  renderAboutLoading = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  renderAboutPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutSuccess()
      case apiStatusConstants.failure:
        return this.renderAboutFailure()
      case apiStatusConstants.inProgress:
        return this.renderAboutLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-app-container">{this.renderAboutPage()}</div>
      </>
    )
  }
}
export default About
