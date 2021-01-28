
const SocialMediaLink = ({ icon, target, color, ...props }) => {
    return (
        <a href={target} target='_blank' rel={'noreferrer'}>
            <section className='social-media-icon' style={{ borderColor: color }}>
                <i className={`fab fa-${icon}`} style={{ color: color }} />
            </section>
        </a>
    )
}

export default SocialMediaLink