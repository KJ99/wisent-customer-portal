import '../assets/css/homepage-block.css'

export const HomepageBlock = ({ ...props }) => {
    return (
        <section className={'homepage-block'}>
            {props.children}
        </section>
    )
}

export const HomepageBlockItem = ({ ...props }) => {
    return (
        <section className={'homepage-block-item '}>
            {props.children}
        </section>
    )
}