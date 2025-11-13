import { useParams } from 'react-router-dom'
import { useReviews } from '../../Contexts/ReviewsContext.jsx'
import './ReviewsListComponent.css'
import { useAuth } from '../../Contexts/AuthContext.jsx'
import { useEffect, useState } from 'react'
import ReviewComponent from '../ReviewComponent/ReviewComponent.jsx'
import { LuBookOpen, LuPencilLine } from 'react-icons/lu'
import UsersService from '../../services/UsersService.js'
import useFetch from '../../hooks/useFetch.jsx'
import ReviewsService from '../../services/ReviewsService.js'

function ReviewsListComponent({ refreshKey }) {

    const { book_id: bookId } = useParams()
    const { user } = useAuth()
    const { user_id: userId } = useParams()
    const { reviews, setReviews } = useReviews()
    const [ idToCompare, setIdToCompare ] = useState(null)
    const [ isMine, setIsMine ] = useState(false)

    const { loading, error, response, sendRequest } = useFetch()

    useEffect(() => {
        if(!userId || !user) return
        
        let id = userId === 'me' ? user._id.toString() : userId.toString()
        setIdToCompare(id)
        setIsMine(id === user._id.toString())
    }, [userId, user])

    useEffect(() => {
        if(!user && userId === 'me') return

        if(bookId){
            sendRequest(async () => await ReviewsService.getByBookId(bookId))
        } else if(userId && userId === 'me') {
            sendRequest(async () => await ReviewsService.getByUserId(idToCompare))
        } else if(userId) {
            sendRequest(async () => await ReviewsService.getByUserId(idToCompare))
        }
    }, [idToCompare, bookId, refreshKey])

    useEffect(() => {
        if(response?.data?.reviews){
            setReviews(response.data.reviews)
        }
    }, [response])

    return (
        <div className='reviews-list'>
            {
                response?.data?.reviews.length > 0 ? (
                    response.data.reviews.map((rev) => {
                        return (
                            <ReviewComponent 
                                key={rev.review_id}
                                rating={rev.review_rating}
                                content={rev.review_content}
                                createdAt={rev.review_created_at}
                                userName={rev.user_name}
                                userUrlImage={rev.user_url_image}
                                bookTitle={!bookId ? rev.book_title : null}
                            />
                        )
                    })
                ) : ( bookId ? (
                    <div className='reviews-list__message-empty'>
                        <LuPencilLine className='reviews-list__message__icon'/>
                        <h3 className='reviews-list__message__sub-title'>No hay reseñas para este libro</h3>
                        <span className='reviews-list__message__span'>Sé el primero en dejar su reseña</span>
                    </div>
                    ) : (
                        <div className='reviews-list__message-empty'>
                            <LuBookOpen className='reviews-list__message__icon'/>
                            <h3 className='reviews-list__message__sub-title'>El usuario no ha dejado reseñas</h3>
                            <span className='reviews-list__message__span'>...</span>
                        </div>
                    )      
                )
            }
        </div>
    )
}

export default ReviewsListComponent