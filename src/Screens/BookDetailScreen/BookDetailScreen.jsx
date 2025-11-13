import './BookDetailScreen.css'
import BookDetailComponent from '../../Components/BookDetailComponent/BookDetailComponent'
import ReviewsListComponent from '../../Components/ReviewsListComponent/ReviewsListComponent'
import { useReviews } from '../../Contexts/ReviewsContext'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import ReviewsService from '../../services/ReviewsService'
import { useEffect, useState } from 'react'

function BookDetailScreen() {

    const { reviews, setReviews } = useReviews()
    const { loading, error, response, sendRequest } = useFetch()
    const { book_id: bookId } = useParams()

    const [refreshKey, setRefreshKey] = useState(0)
    const handleReviewCreated = () => {
        setRefreshKey(prev => prev + 1)
    }

    return (
        <div className='book-detail-screen'>
            <BookDetailComponent 
                bookId={ bookId }
                onReviewCreated={ handleReviewCreated }
                refreshKey={refreshKey}
            />
            <h4 className='book-detail-screen__reviews'>Reseñas de lectores</h4>
            <ReviewsListComponent 
                refreshKey={refreshKey}
            />
        </div>
    )
}

export default BookDetailScreen