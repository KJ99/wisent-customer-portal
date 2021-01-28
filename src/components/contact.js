import '../assets/css/contact.css'
import SocialMediaLink from "./social-media-link";
import TeleContactItem from "./tele-contact-item";
const Contact = ({ light, ...props }) => {
    return (
        <section className='contact-container'>
            <section className={`contact-tele-row ${light ? 'contact-section-light' : ''}`}>
                <TeleContactItem title={'Restauracja'} email={'wisentbar@gmail.com'} phone={'+48567498340'} />
                <TeleContactItem title={'Reklama'} email={'reklamawisent@gmail.com'} phone={'+48234098675'} />
                <TeleContactItem title={'Współpraca'} email={'wisentrelatbar@gmail.com'} phone={'+48650456123'} />
            </section>
            <section className={'contact-social-media-row'}>
                <SocialMediaLink icon={'facebook'} color={'#4064AC'} target={'https://www.facebook.com/'}/>
                <SocialMediaLink icon={'instagram'} color={'#7B1D46'} target={'https://www.instagram.com/'}/>
                <SocialMediaLink icon={'twitter'} color={'#1DA1F2'} target={'http://twitter.com/'}/>
            </section>
        </section>
    )
}

export default Contact