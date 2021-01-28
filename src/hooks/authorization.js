import {useHistory, useLocation} from "react-router";
import useTokenStorage from "./token-storage";

const useAuthorization = () => {
    const history = useHistory()
    const location = useLocation()
    const [token] = useTokenStorage()
    if(token == null) {
        history.replace({
            pathname: '/auth',
            state: {
                backToUrl: location.pathname
            }
        })
    }
}

export default useAuthorization