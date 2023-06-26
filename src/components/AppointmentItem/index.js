import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onStarClicked = () => {
    toggleIsStarred(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-title-cont">
        <p className="card-title"> {title} </p>
        <button
          onClick={onStarClicked}
          id="star"
          data-testid="star"
          type="button"
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="card-date"> {`Date: ${date}`} </p>
    </li>
  )
}

export default AppointmentItem
