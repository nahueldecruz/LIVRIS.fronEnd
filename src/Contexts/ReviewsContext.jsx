import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ReviewsService from "../services/ReviewsService";

export const ReviewsContext = createContext(null);

export function ReviewsContextProvider({ children }) {

    const [ reviews, setReviews ] = useState([])

    const contextValue = {
        reviews,
        setReviews
    }

    return (
        <ReviewsContext.Provider value={ contextValue }>
            { children }
        </ReviewsContext.Provider>
    )
}

export const useReviews = () => {
    return useContext(ReviewsContext)
}