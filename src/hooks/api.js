import defaultConfig from '../api/api-config.json'
import findErrorMessage from "../api/findErrorMessage";
import {convertToCamelCase} from "../utilities/case-converter";
import useTokenStorage from "./token-storage";
import {useHistory} from "react-router";

const useApi = (config = defaultConfig) => {
    const [token, setToken, clearToken] = useTokenStorage()
    const history = useHistory()

    const callAction = async (action, data = null) => {
        try {
            const auth = token != null ? `${config.token_type} ${token}` : ''
            const res = await makeApiCall(`${config.host}${config.base_url}`, action, auth, data)
            const responseData = await res.json()
            if(res.ok) {
                return convertToCamelCase(responseData)
            } else {
                throw convertToCamelCase(responseData)
            }
        } catch (e) {
            console.log(e)
            if(e.internalCode >= 12 && e.internalCode < 20 ) {
                clearToken()
                history.replace('/auth')
            } else {
                throw findErrorMessage(e);
            }
        }
    }

    return {
        callAction: callAction
    }
}

const bodyOptions = (action, bodyData) => {
    return action.method === 'POST' || action.method === 'PATCH' ? { body:  action.body(bodyData) } : {}
}

const makeApiCall = async (baseUrl, action, auth, data) => {
    return fetch(`${baseUrl}${action.endpoint}`, {
        method: action.method,
        headers: {
            ...action.headers(),
            'Authorization': auth
        },
        cors: true,
        ...bodyOptions(action, data)
    })
}

export default useApi