import LOCAL_STORAGE_KEYS from '../../constants/localStorage'
import { Navigate, Outlet } from 'react-router'

function AuthMiddleWare() {
    const authorizationToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION_TOKEN)

    if(authorizationToken){
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
}

export default AuthMiddleWare