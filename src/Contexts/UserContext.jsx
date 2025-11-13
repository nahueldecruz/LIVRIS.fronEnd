import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UsersService from "../services/UsersService";

export const UsersContext = createContext(null);

export function UsersContextProvider({ children }) {

    const [ userData, setUserData ] = useState(null)

    const contextValue = {
        setUserData,
        userData
    }

    return (
        <UsersContext.Provider value={ contextValue }>
            { children }
        </UsersContext.Provider>
    )
}

export const useUsers = () => {
    return useContext(UsersContext)
}