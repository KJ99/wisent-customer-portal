import Popup from "./popup";
import {useState, useEffect} from "react";


const ErrorPopup = ({ error, ...props }) => {
    const [open, setOpen] = useState(error != null)
    useEffect(() => setOpen(error != null), [error])
    return (
        <Popup isActive={open}>
            <p style={{ textAlign: 'center' }} className={'has-text-danger'}>{error}</p>
            <section className='popup-close-container'>
                <button onClick={() => setOpen(false)} className='button is-primary'>Rozumiem</button>
            </section>
        </Popup>
    )
}

export default ErrorPopup