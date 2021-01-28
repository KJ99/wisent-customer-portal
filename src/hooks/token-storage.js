import useSession from "./session";


const useTokenStorage = () => {
    const [getSessionItem, setSessionItem, clearSessionItem] = useSession()
    const tokenKey = 'token'

    const token = getSessionItem(tokenKey)
    const setToken = value => setSessionItem(tokenKey, value)
    const clearToken = () => clearSessionItem(tokenKey)

    return [token, setToken, clearToken]
}

export default useTokenStorage