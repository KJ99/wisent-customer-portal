import '../assets/css/contact.css'

const TeleContactItem = ({ title, email, phone, ...props }) => {
    return (
        <section>
            <p className='contact-section-title'>{title}</p>
            <p className='contact-section-element'>
                <i className="fas fa-at contact-icon"/>
                {email}
            </p>
            <p className='contact-section-element'>
                <i className="fas fa-phone contact-icon"/>
                {phone}
            </p>
        </section>
    )
}

export default TeleContactItem