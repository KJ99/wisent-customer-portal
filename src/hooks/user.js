import useSession from "./session";


const useUser = () => {
    const [getSessionItem, setSessionItem, clearSessionItem] = useSession()
    const userKey = 'user'

    let user
    try {
        user = JSON.parse(getSessionItem(userKey))
    } catch (e) {
        user = null
    }

    const setUser = value => setSessionItem(userKey, JSON.stringify(value))
    const clearUser = () => clearSessionItem(userKey)

    return [user, setUser, clearUser]
}

export default useUser