
const ProgressBar = ({ active, ...props }) => {
    return active ? (
        <progress className="progress is-small is-primary" max="100">15%</progress>
    ) : null
}

export default ProgressBar