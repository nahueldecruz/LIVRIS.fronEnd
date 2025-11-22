import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LOCAL_STORAGE_KEYS from "../constants/localStorage";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION_TOKEN);
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false)
    }, []);

    const login = ({ userData, userToken }) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTHORIZATION_TOKEN, userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTHORIZATION_TOKEN);
        navigate('/login')
    };

    const contextValue = {
        user,
        token,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}