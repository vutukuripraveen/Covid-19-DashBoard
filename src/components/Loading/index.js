import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'

const Loading = () => (
  <div>
    <Header />
    <div className="loader-component">
      <Loader
        type="TailSpin"
        className="loader"
        color="#00BFFF"
        height={50}
        width={50}
      />
    </div>
  </div>
)

export default Loading
