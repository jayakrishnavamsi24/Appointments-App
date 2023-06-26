import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import './index.css'
import AppointmentItem from '../AppointmentItem'

const d1 = format(new Date('2028-03-19'), 'dd MMMM yyyy, EEEE')
const d2 = format(new Date('2029-08-12'), 'dd MMMM yyyy, EEEE')
const d3 = format(new Date('2030-10-06'), 'dd MMMM yyyy, EEEE')

const initialAppointmentList = [
  //   {
  //     id: uuidv4(),
  //     title: 'Sai Kiran (Music Director)',
  //     date: d1,
  //     isStarred: false,
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Karthikeya (CEO, KCS pvt.Ltd)',
  //     date: d2,
  //     isStarred: true,
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Jaswanth (Founder, JSW Technologies)',
  //     date: d3,
  //     isStarred: false,
  //   },
]

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentList,
    filteredList: [],
    title: '',
    date: '',
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {appointmentsList, title, date} = this.state

    if (title === '') {
      alert('Enter Title')
      return
    }
    if (date === '') {
      alert('Enter Date')
      return
    }

    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterStarred = () => {
    const {appointmentsList, filteredList} = this.state
    if (filteredList.length === 0) {
      const starFilteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
      this.setState({filteredList: starFilteredList})
    } else {
      this.setState({filteredList: []})
    }
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, filteredList, title, date} = this.state
    let requiredList
    let btnStyle

    if (filteredList.length === 0) {
      requiredList = appointmentsList
      btnStyle = 'normal-btn'
    } else {
      requiredList = filteredList
      btnStyle = 'filtered-btn'
    }

    return (
      <div className="bg-container">
        <div className="card">
          <div className="top-container">
            <form className="left-container" onSubmit={this.onAddAppointment}>
              <h1 className="title"> Add Appointment </h1>
              <label htmlFor="title" className="input-heading">
                {' '}
                Title{' '}
              </label>
              <br />
              <input
                id="title"
                value={title}
                onChange={this.onTitleChange}
                placeholder="Title"
                type="text"
              />
              <br />
              <label htmlFor="date" className="input-heading">
                {' '}
                Date{' '}
              </label>
              <br />
              <input
                id="date"
                value={date}
                onChange={this.onDateChange}
                type="date"
              />
              <div>
                <button className="add-btn" type="submit">
                  {' '}
                  Add{' '}
                </button>
              </div>
            </form>
            <div className="right-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="bottom-container">
            <div className="title-container">
              <h1 className="bottom-title"> Appointments </h1>
              <button
                onClick={this.filterStarred}
                className={`${btnStyle} starred-btn`}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {requiredList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
