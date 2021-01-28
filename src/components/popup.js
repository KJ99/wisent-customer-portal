

const Popup = ({ isActive, ...props }) => {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-content popup-frame">
                {props.children}
            </div>
        </div>
    )
}

export default Popup