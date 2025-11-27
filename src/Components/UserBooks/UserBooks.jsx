import { useNavigate, useParams } from 'react-router-dom'
import './UserBooks.css'
import { useAuth } from '../../Contexts/AuthContext'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import UserBookService from '../../services/UserBookService'
import BookItemComponent from '../BookItemComponent/BookItemComponent'
import BookLoaderComponent from '../BookLoaderComponent/BookLoaderComponent'
import { LuBookOpen } from 'react-icons/lu'

function UserBooks() {
    const { status, user_id: userId } = useParams()
    const { user } = useAuth()
    const [ idToCompare, setIdToCompare ] = useState(null)
    const [ isMine, setIsMine ] = useState(false)

    useEffect(() => {
        if(!user) return
        
        let id = userId === 'me' ? user._id.toString() : userId.toString()
        setIdToCompare(id)
        setIsMine(id === user._id.toString())
    }, [userId, user])

    const {
        loading,
        response,
        error,
        sendRequest
    } = useFetch()

    const fetchBooks = () => {
        sendRequest(async () => await UserBookService.getByUserIdAndStatus({ userId: idToCompare, status }))
    }
    
    useEffect(() => {
        if(!status) return

        fetchBooks()
    }, [status, idToCompare])
    
    return (
        <div>
            {
                loading ? <BookLoaderComponent /> : (
                    response?.data?.books.length != 0 ? (
                        <div className='user-books__container'> 
                            {
                                response?.data?.books.map((book) => {
                                    return (
                                        <BookItemComponent 
                                            key={book.book_id}
                                            id={book.book_id}
                                            title={book.title}
                                            authorName={book.author_name}
                                            coverUrl={book.cover_url}
                                            category={book.category}
                                            isMine={isMine}
                                            userBookId={book.user_book_id}
                                            fetchBooks={fetchBooks}
                                        />
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className='user-books__message-empty'>
                            <LuBookOpen className='user-books__message__icon'/>
                            <h3 className='user-books__message__sub-title'>No hay libros en esta lista</h3>
                        </div>
                    )
                )     
            }
        </div>
    )
}

export default UserBooks