import PropTypes from 'prop-types'
import './loader.css'

function Loader({ isSubmitted, jobData }) {
  return (
    <div className={`loading ${isSubmitted && jobData === false ? '' : 'hidden'}`}>
      <div className="ball first"></div>
      <div className="ball second"></div>
      <div className="ball third"></div>
    </div>
  )
}

export default Loader

Loader.propTypes = {
  isSubmitted: PropTypes.bool,
  jobData: PropTypes.oneOfType([ 
      PropTypes.bool,
      PropTypes.object
  ])
}
