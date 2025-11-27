import { Link } from 'react-router-dom'
import './BookItemComponent.css'
import { useEffect, useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import useFetch from '../../hooks/useFetch'
import UserBookService from '../../services/UserBookService'

function BookItemComponent({ id, title, authorName, category, coverUrl, isMine, userBookId, fetchBooks }) {

    const [ showModal, setShowModal ] = useState(false)

    const {
        laoding,
        response,
        error,
        sendRequest
    } = useFetch()

    const onDelete = () => {
        sendRequest(async () => await UserBookService.deleteById(userBookId))
    }

    useEffect(() => {
        if(!response?.ok) return
        fetchBooks()
    }, [response])

    return (
        <div className='book-item'>
            {
                isMine && (
                    <button onClick={() => setShowModal(true)} className='book-item__button'><LuTrash2 className='book-item__button-icon'/></button> 
                )
            }
            {
                showModal && (
                    <div className="book-item__modal-content">
                        <h3 className='book-item__modal__title'>¿Sacar de la lista?</h3>
                        <div className='book-item__modal__buttons-container'>
                            <button className='book-item__modal__button bi--delete' onClick={onDelete}>
                                Sí, sacar
                            </button>

                            <button className='book-item__modal__button' onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                )
            }
            <Link to={`/book-detail/${id}`} className='book-item__container'>
                <div className='book-item__image-container'>
                    <img src={coverUrl} alt={`Imagen de portada del libro ${title}`} />
                </div>
                <div className='book-item__info'>
                    <span className='book-item__title'>{title}</span>
                    <span className='book-item__author'>{authorName}</span>
                    {
                        category ? <span className='book-item__category'>{category}</span> : ''
                    }
                </div>
            </Link>
        </div>
    )
}

export default BookItemComponent