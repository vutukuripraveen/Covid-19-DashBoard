import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isToggleActive: false}

  onClickToggleButton = () => {
    this.setState(prevState => ({isToggleActive: !prevState.isToggleActive}))
  }

  onClickClose = () => {
    this.setState({isToggleActive: false})
  }

  showDropDownMenu = () => (
    <div className="mobile-view-header">
      <div>
        <ul className="navBar">
          <Link to="/" className="link">
            <li className="item">Home</li>
          </Link>

          <Link to="/about" className="link">
            <li className="item">About</li>
          </Link>
        </ul>
      </div>
      <button className="close" type="button" onClick={this.onClickClose}>
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  render() {
    const {isToggleActive} = this.state

    return (
      <>
        <div className="header-container">
          <Link to="/" className="link">
            <h1 className="logo">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <ul className="navBar">
            <Link to="/" className="link">
              <li className="item">Home</li>
            </Link>

            <Link to="/about" className="link">
              <li className="item">About</li>
            </Link>
          </ul>
        </div>

        <div className="mobile-menu">
          <div className="mobile-header-container">
            <Link to="/" className="link">
              <h1 className="logo">
                COVID19<span className="india">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="toggle-button"
              onClick={this.onClickToggleButton}
            >
              <img
                src="https://res.cloudinary.com/dbweo4cmc/image/upload/v1625949520/add-to-queue_1_n0hju7.png"
                alt="menu"
              />
            </button>
          </div>

          <div className="menu">
            {isToggleActive ? this.showDropDownMenu() : ''}
          </div>
        </div>
      </>
    )
  }
}

export default Header
