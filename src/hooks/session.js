

const useSession = () => {
    const getSessionItem = key => {
        return sessionStorage.getItem(key)
    }

    const setSessionItem = (key, value) => {
        sessionStorage.setItem(key, value)
    }

    const clearSessionItem = (key) => {
        sessionStorage.removeItem(key)
    }

    const clearAll = () => {
        sessionStorage.clear()
    }

    return [ getSessionItem, setSessionItem, clearSessionItem, clearAll ]
}

export default useSession