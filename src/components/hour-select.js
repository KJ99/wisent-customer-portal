

const HourSelect = ({ hour, onChange, ...props }) => {
    const hours = [
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00'
    ]


    return (
        <section className='hour-select'>
            {hours.map((item, index) => (
                <HourItem hour={item} key={index} selected={hour === item} onClick={() => {
                    if(typeof onChange === 'function') {
                        onChange(item)
                    }
                }} />
            ))}
        </section>
    )
}

const HourItem = ({ hour, selected, onClick, ...props }) => {
    const stateStyle = selected ? 'hour-select-item-active' : 'hour-select-item-inactive'
    return (
        <section onClick={onClick} className={`hour-select-item ${stateStyle}`}>
            <p>{hour}</p>
        </section>
    )
}

export default HourSelect