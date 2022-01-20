import Linkify from 'react-linkify'
import './index.css'

const Faqs = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails
  return (
    <li className="faq-container">
      <p className="faq-question">{question}</p>
      <Linkify>
        <p className="faq-answer">{answer}</p>
      </Linkify>
    </li>
  )
}
export default Faqs
