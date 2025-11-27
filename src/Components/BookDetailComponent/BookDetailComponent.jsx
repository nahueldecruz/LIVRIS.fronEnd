import './BookDetailComponent.css'
import { useEffect, useState } from 'react'
import { useBooks } from '../../Contexts/BooksContext'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import BooksService from '../../services/BooksService'
import BookLoaderComponent from '../../Components/BookLoaderComponent/BookLoaderComponent'
import { LuArrowLeft, LuBookmarkCheck, LuBookMarked, LuBookmarkPlus, LuBookOpen, LuStar } from 'react-icons/lu'
import ButtonAddReviewComponent from '../ButtonAddReviewComponent/ButtonAddReviewComponent'
import { useAuth } from '../../Contexts/AuthContext'
import ReviewsService from '../../services/ReviewsService'
import UserBookService from '../../services/UserBookService'
import { STATUS_USER_BOOK } from '../../constants/statusUserBooks'

function BookDetailComponent({ onReviewCreated, bookId, refreshKey }) {
    const { selectedBook } = useBooks()
    const [ bookDetail, setBookDetail ] = useState(selectedBook)
    const { user } = useAuth()
    const navigate = useNavigate()

    const [ status, setStatus ] = useState('')
    const [ showStatusOptions, setShowStatusOptions ] = useState(false)

    const [ isReviewed, setIsReviewed ] = useState(false)
    const isReviewedFetch = useFetch()
    
    useEffect(() => {
        if(!user || !bookId) return
        isReviewedFetch.sendRequest(async () => await ReviewsService.getByUserIdAndBookId({ userId: user._id, bookId }))
    }, [user, bookId, refreshKey])

    useEffect(() => {
        if (isReviewedFetch.response?.ok) {
            setIsReviewed(true)
        } else {
            setIsReviewed(false)
        }
    }, [isReviewedFetch.response])

    const {
        response,
        error,
        loading,
        sendRequest
    } = useFetch()
    
    useEffect(() => {
        if(bookId){
            sendRequest(async () => await BooksService.getById(bookId))
        }
    }, [bookId, selectedBook, refreshKey])

    useEffect(() => {
        if (response?.data?.book) {
            setBookDetail(response.data.book)
        }
    }, [response])

    const statusBookFetch = useFetch()

    const handleStatusBook = (status) => {
        statusBookFetch.sendRequest(async () => await UserBookService.setStatus({ status, bookId }))
        setShowStatusOptions(false)
    }

    useEffect(() => {
        statusBookFetch.sendRequest(async () => await UserBookService.getByUserIdAndBookId(bookId))
    }, [])

    useEffect(() => {
        if (statusBookFetch.response?.data?.status) {
            setStatus(statusBookFetch.response?.data?.status.status)
        }
    }, [statusBookFetch.response])
    
    return (
        <div className='book-detail'>
            <button className='book-detail__button' onClick={() => navigate('/books')}>
                <LuArrowLeft className='book-detail__button-icon'/>
                <span className='book-detail__button-text'>Volver</span>
            </button>
            {
                loading ? <BookLoaderComponent /> : (
                    bookDetail && (
                        <>
                            <div className='book-detail__container'>
                                <div className='book-detail__image-container'>
                                    <img className='book-detail__image' src={bookDetail.cover_url} alt={`Imagen del libro: ${bookDetail.title}`} />
                                </div>
                                <div className='book-detail__info-container'>
                                    <h2 className='book-detail__info__title'>{bookDetail.title}</h2>
                                    <span className='book-detail__info__author'>{bookDetail.author_name}</span>
                                    <div className='book-detail__meta'>
                                        {
                                            bookDetail.category && <span className='book-detail__info__category'>{bookDetail.category}</span>
                                        }
                                        {
                                            bookDetail.published_year && <span className='book-detail__info__published-year'>{bookDetail.published_year}</span>
                                        }
                                        <div className='book-detail__meta__status'>
                                            <button 
                                                className='book-detail__status-options__button' 
                                                onClick={() => setShowStatusOptions(!showStatusOptions)}
                                            >
                                                <LuBookmarkPlus className='book-detail__status-options__icon'/>
                                                { 
                                                    status === STATUS_USER_BOOK.READ ? "Leído" : 
                                                    status === STATUS_USER_BOOK.READING ? "Leyendo" :
                                                    status === STATUS_USER_BOOK.WANT_TO_READ ? "Quiero leer" : "Agregar a la lista"
                                                }
                                            </button>
                                            {
                                                showStatusOptions && (
                                                    <div className='book-detail__status-options'>
                                                        <button 
                                                            className='book-detail__status' 
                                                            onClick={() => handleStatusBook(STATUS_USER_BOOK.READING)}
                                                        >
                                                            <LuBookOpen className='book-detail__status__icon bdsi--reading'/>
                                                            Leyendo
                                                        </button>
                                                        <button 
                                                            className='book-detail__status' 
                                                            onClick={() => handleStatusBook(STATUS_USER_BOOK.READ)}
                                                        >
                                                            <LuBookmarkCheck className='book-detail__status__icon bdsi--read'/>
                                                            Leído
                                                        </button>
                                                        <button 
                                                            className='book-detail__status' 
                                                            onClick={() => handleStatusBook(STATUS_USER_BOOK.WANT_TO_READ)}
                                                        >
                                                            <LuBookmarkPlus className='book-detail__status__icon bdsi--want-to-read'/>
                                                            Quiero leer
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        <div className='book-detail__rating-container'>
                                            <div className='book-detail__rating'>
                                                {
                                                    <LuStar
                                                        className={`book-detail__rating-icon ${bookDetail?.ratingAverage > 0 && "bdr--gold"}`}
                                                    />
                                                }
                                                <span className='book-detail__rating-span'>{bookDetail?.ratingAverage || 0}</span>
                                            </div>
                                            <span className='book-detal__reviews'>{bookDetail?.reviewsCount || 0} reseña</span>
                                        </div>
                                    }
                                    {
                                        !isReviewed && <ButtonAddReviewComponent
                                            bookId={ bookId }
                                            userId={ user?._id }
                                            onReviewCreated={ onReviewCreated }
                                        />
                                    }
                                </div>
                            </div>
                            <div className='book-detail__description'>
                                <span className='book-detail__description__title'>Sinopsis</span>
                                {
                                    bookDetail.description 
                                    ? <p className='book-detail__description__text'>{bookDetail.description}</p> 
                                    : <span className='book-detail__description__text book-detail__description__text--no-description'>No hay descripción..</span>
                                }
                            </div>
                        </>
                    )
                )
            }
        </div>
    )
}

export default BookDetailComponent