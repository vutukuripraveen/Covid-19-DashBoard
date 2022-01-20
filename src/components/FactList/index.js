import './index.css'

const FactsList = props => {
  const {banner} = props

  return (
    <div testid="faqsUnorderedList">
      <li className="facts">{banner}</li>
    </div>
  )
}

export default FactsList
