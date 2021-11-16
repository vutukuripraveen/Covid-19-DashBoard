import Linkify from 'react-linkify'
import {Component} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {faqsList: []}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()
    const listItems = data.faq.map(eachFaq => ({
      question: eachFaq.question,
      answer: eachFaq.answer,
    }))
    this.setState({faqsList: listItems})
  }

  render() {
    const {faqsList} = this.state

    return (
      <div className="about-container">
        <Header />
        <div className="about-section">
          <h1 className="about-heading1">About</h1>
          <p className="about-paragraph">Last update on Nov 1st 2021.</p>
          <h2 className="about-heading2">
            COVID-19 vaccines be ready for distribution
          </h2>
          {faqsList.map(each => (
            <ul className="list-items-container" key={each.question}>
              <li className="question">{each.question}</li>
              <Linkify>
                <li className="answer">{each.answer}</li>
              </Linkify>
            </ul>
          ))}
        </div>

        <Footer />
      </div>
    )
  }
}
export default About
