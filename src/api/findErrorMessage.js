const errorMessages = {
    unknown: 'Wystąpił nieoczekiwany błąd'
}

export default code => {
    let message
    switch (code) {
        default:
            message = errorMessages.unknown
    }
    return message
}