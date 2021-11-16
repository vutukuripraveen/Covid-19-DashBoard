import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-component">
      <img
        src="https://res.cloudinary.com/dgahohki4/image/upload/v1636698000/Group_7484_d8dbn4.png"
        alt="NotFound"
        className="image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-description">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <Link to="/" className="button-container">
        <button type="button" className="button">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
