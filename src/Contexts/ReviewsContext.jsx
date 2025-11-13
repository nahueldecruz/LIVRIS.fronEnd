import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ReviewsService from "../services/ReviewsService";

export const ReviewsContext = createContext(null);

export function ReviewsContextProvider({ children }) {

    /* const [ userId, setUserId ] = useState(null)
    const [ bookId, setBookId ] = useState(null)


    const { 
        loading: loadReviewsUser,
        response: resReviewsUser,
        error: errReviewsUser,
        sendRequest: sendReqReviewsUser
    } = useFetch()

    useEffect(() => {
        if(!userId){
            return setUserId(null)
        }
        sendReqReviewsUser(async () => await ReviewsService.getByUserId(userId))
    }, [userId])

    const { 
        loading: loadReviewsBook,
        response: resReviewsBook,
        error: errReviewsBook,
        sendRequest: sendReqReviewsBook
    } = useFetch()

    useEffect(() => {
        if(!bookId){
            return setBookId(null)
        }
        sendReqReviewsBook(async () => await ReviewsService.getByBookId(bookId))
    }, [bookId])

    const contextValue = {
        setUserId,
        setBookId,
        reviewsBook: {
            loading: loadReviewsBook,
            response: resReviewsBook,
            error: errReviewsBook,
            sendRequest: sendReqReviewsBook
        },
        reviewsUser: {
            loading: loadReviewsUser,
            response: resReviewsUser,
            error: errReviewsUser,
            sendRequest: sendReqReviewsUser
        }
    } */

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