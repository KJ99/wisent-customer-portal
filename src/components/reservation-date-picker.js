import '../assets/css/reservation.css'
import DatePicker from "react-datepicker";
import * as Actions from '../api/api-actions'
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import useApi from "../hooks/api";
import * as moment from "moment";


const ReservationDatePicker = ({ date, onAccepted, ...props }) => {
    const api = useApi()
    const [feedbackMessage, setFeedbackMessage] = useState({
        message: null,
        style: null
    })
    return (
        <section>
            <DatePicker dateFormat='yyyy-MM-dd' selected={date} onChange={date => {
                if(date.getTime() > Date.now()) {
                    const requestedDate = moment.unix(date.getTime() / 1000).format('YYYY-MM-DD')
                    api.callAction(Actions.Reservations.availablePlaces(requestedDate))
                        .then(data => {
                            setFeedbackMessage({
                                message: `Liczba dostępnych miejsc tego dnia: ${data.availablePlaces}`,
                                style: data.availablePlaces > 0 ? 'has-text-success' : 'has-text-danger'
                            })
                            if(typeof onAccepted === 'function') {
                                onAccepted({
                                    date: date,
                                    places: data.availablePlaces
                                })
                            }
                        })
                        .catch(e => {
                            setFeedbackMessage({
                                message: 'Liczba dostępnych miejsc tego dnia: 0',
                                style: 'has-text-danger'
                            })
                        })
                } else {
                    setFeedbackMessage({
                        message: 'Data rezerwacji musi być późniejsza niż obecna data',
                        style: 'has-text-danger'
                    })
                }
            }} />
            <DateFeedback
                message={feedbackMessage.message}
                messageStyle={feedbackMessage.style}/>
        </section>
    )
}

//has-text-danger
const DateFeedback = ({ message, messageStyle, ...props }) => {
    return <p className={`${messageStyle}`}>{message}</p>
}

export default ReservationDatePicker