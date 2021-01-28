

import {useState, useEffect} from "react";
import ReservationDatePicker from "../components/reservation-date-picker";
import HourSelect from "../components/hour-select";
import emailValidator from 'email-validator'
import * as moment from "moment";
import useApi from "../hooks/api";
import * as Actions from '../api/api-actions'

const ReserveScreen = ({ ...props }) => {
    const api = useApi()
    const [date, setDate] = useState(new Date())
    const [availablePlaces, setAvailablePlaces] = useState(0)
    const [data, setData] = useState({
        hour: null,
        numberOfPlaces: null,
        name: null,
        email: null,
        phone: null,
    })

    const [errors, setErrors] = useState({
        hour: null,
        numberOfPlaces: null,
        name: null,
        email: null,
    })

    const [formError, setFormError] = useState(null)

    const [reservation, setReservation] = useState(null)

    const [processing, setProcessing] = useState(false)

    return reservation == null ? (
        <section className='reservation-container'>
            <section className='form-row'>
                <p className='label'>Wybierz dzień rezerwacji</p>
                <ReservationDatePicker date={date} onAccepted={data => {
                    setDate(data.date)
                    setAvailablePlaces(data.places)
                }} />
            </section>
            <Form places={availablePlaces}>
                <p className='has-text-danger'>{formError}</p>
                <section className='form-container'>
                    <section className='form-section'>
                        <p className='form-section-title'>Dane rezerwacji</p>
                        <section className='form-row'>
                            <p className='label'>Wybierz godzinę</p>
                            <p className='has-text-danger'>{errors.hour}</p>
                            <HourSelect hour={data.hour} onChange={hour => setData({ ...data, hour: hour })} />
                        </section>
                        <section className='form-row'>
                            <p className='label'>Podaj liczbę miejsc</p>
                            <p className='has-text-danger'>{errors.numberOfPlaces}</p>
                            <input className="input places-input" type="number" placeholder="Liczba miejsc" onChange={evt => {
                                setErrors({ ...errors, numberOfPlaces: getNumberPlacesError(evt.target.value, availablePlaces) })
                                setData({ ...data, numberOfPlaces: evt.target.value })
                            }} />
                        </section>
                    </section>
                    <section className='form-section contact-section'>
                        <p className='form-section-title'>Dane kontaktowe</p>
                        <section className='form-row'>
                            <p className='label'>Imię</p>
                            <p className='has-text-danger'>{errors.name}</p>
                            <input className="input places-input" type="text" placeholder="Imię" onChange={evt => {
                                setErrors({ ...errors, name: getNameError(evt.target.value) })
                                setData({ ...data, name: evt.target.value })
                            }} />
                        </section>

                        <section className='form-row'>
                            <p className='label'>Email</p>
                            <p className='has-text-danger'>{errors.email}</p>
                            <input className="input places-input" type="text" placeholder="Email" onChange={evt => {
                                setErrors({ ...errors, email: getEmailError(evt.target.value) })
                                setData({ ...data, email: evt.target.value })
                            }} />
                        </section>

                        <section className='form-row'>
                            <p className='label'>Numer telefonu (opcjonalny)</p>
                            <input className="input places-input" type="tel" placeholder="Numer telefonu" onChange={evt => {
                                setData({ ...data, phone: evt.target.value })
                            }} />
                        </section>
                    </section>
                </section>
                <section className='submit-row'>
                    <button onClick={() => {
                        const errors = getAllErrors(data, availablePlaces)
                        const isValid = Object.values(errors).find(item => item != null) === undefined
                        if(isValid && !processing) {
                            setProcessing(true)
                            const reservationDate = prepareDate(date, data.hour)
                            const dataToSend = {
                                date: reservationDate,
                                numberOfSeats: parseInt(data.numberOfPlaces),
                                contactInfo: {
                                    email: data.email,
                                    name: data.name,
                                    phoneNumber: data.phone
                                }
                            }
                            api.callAction(Actions.Reservations.reserve(), dataToSend)
                                .then((data) => {
                                    console.log(data)
                                    setFormError(null)
                                    setReservation(data)
                                })
                                .catch(e => {
                                    setFormError(e)
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    })
                                })
                                .finally(() => setProcessing(false))
                        }
                        setErrors(errors)
                    }} className={`button is-success ${processing ? 'is-loading' : ''}`}>Rezerwuj</button>
                </section>
            </Form>
        </section>
    ) : <ReservationPreview reservation={reservation} />
}
const getAllErrors = (data, maxPlaces) => {
    return {
        hour: data.hour == null ? 'Podanie godziny jest wymagane' : null,
        numberOfPlaces: getNumberPlacesError(data.numberOfPlaces, maxPlaces),
        name: getNameError(data.name),
        email: getEmailError(data.email)
    }
}

const getEmailError = value => {
    return isEmailValid(value) ? null : 'Podany adres email jest nieprawidłowy'
}

const isEmailValid = (value) => {
    return emailValidator.validate(value)
}


const getNameError = value => {
    return isNameValid(value) ? null : 'Imię jest wymagane'
}

const isNameValid = (value) => {
    return value?.trim()?.length > 0
}


const getNumberPlacesError = (value, maxPlaces) => {
    let message = null
    if(!isNumberOfPlacesValid(value)) {
        message = 'Liczba miejsc musi być liczbą całkowitą dodatnią'
    } else if(value > maxPlaces) {
        message = 'Przekroczono dostępną liczbę miejsc'
    }
    return message
}

const isNumberOfPlacesValid = (value) => {
    const numVal = Number(value)
    return !isNaN(numVal) && Number.isInteger(numVal) && numVal > 0
}

const prepareDate = (day, hour) => {
    const preparedDay = moment.unix(day.getTime() / 1000).format('YYYY-MM-DD')
    return `${preparedDay} ${hour}`
}

const Form = ({ places, ...props }) => {
    return places > 0 ? (
        <section className='frame'>
            {props.children}
        </section>
    ) : null
}

const ReservationPreview = ({ reservation, ...props }) => {
    return (
        <section className='reservation-summary-container frame'>
            <p className='reservation-summary-title'>Rezerwacja założona!</p>
            <table>
                <tbody>
                    <tr><td className='reservation-summary-label'>Numer rezerwacji</td><td>{reservation.number}</td></tr>
                    <tr><td className='reservation-summary-label'>Data rezerwacji</td><td>{reservation.date}</td></tr>
                    <tr><td className='reservation-summary-label'>Liczba miejsc</td><td>{reservation.numberOfSeats}</td></tr>
                </tbody>
            </table>
        </section>
    )
}

export default ReserveScreen