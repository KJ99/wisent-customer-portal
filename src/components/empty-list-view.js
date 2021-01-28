
const EmptyListView = ({ text, show, ...props }) => {
    return show ? (
        <section className='empty-list-view'>
            <p className='empty-list-label'>{text}</p>
        </section>
    ) : null
}

export default EmptyListView