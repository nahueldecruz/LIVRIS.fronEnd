import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksService from "../services/BooksService";
import useFetch from "../hooks/useFetch";

export const BooksContext = createContext(null);

export function BooksContextProvider({ children }) {

    const [selectedBook, setSelectedBook] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(selectedBook) {
            saveBook(selectedBook)
        }
    }, [selectedBook]);

    const {
        response,
        error,
        loading,
        sendRequest
    } = useFetch()

    const saveBook = (selectedBook) => {
        sendRequest(async () => await BooksService.save(selectedBook))
    }
    
    useEffect(() => {
        if(response?.data?.bookSaved) {
            navigate(`/book-detail/${response.data.bookSaved._id}`)
        }
    }, [response])
    
    const contextValue = {
        setSelectedBook,
        loading,
        selectedBook
    }

    return (
        <BooksContext.Provider value={ contextValue }>
            { children }
        </BooksContext.Provider>
    )
}

export const useBooks = () => {
    return useContext(BooksContext)
}