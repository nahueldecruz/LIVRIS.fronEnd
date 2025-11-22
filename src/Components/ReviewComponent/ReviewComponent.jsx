import { LuMessageCircle, LuPencilLine, LuStar, LuTrash2 } from 'react-icons/lu'
import './ReviewComponent.css'
import { useAuth } from '../../Contexts/AuthContext'
import useFetch from '../../hooks/useFetch'
import ReviewsService from '../../services/ReviewsService'
import { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import StarRatingInput from '../StarRatingInputComponent/StarRatingInputComponent'


function ReviewComponent({ reviewId, userName, userUrlImage, content, createdAt, rating, bookTitle, isEdited, userOwnerId, fetchReviews}) {
    const FORM_FIELDS = {
        CONTENT: 'content',
        RATING: 'rating'
    }
    
    const initialFormState = {
        [FORM_FIELDS.CONTENT]: content,
        [FORM_FIELDS.RATING]: rating
    }

    const { user } = useAuth()

    const createdDate = new Date(createdAt)
    const year = createdDate.getFullYear()
    const day = createdDate.getDate()
    const month = createdDate.getMonth()
    
    const monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const reviewCreatedDate = `${day} de ${monthNames[month]}, ${year}`


    const [ showModal, setShowModal ] = useState(false)
    const deleteFetch = useFetch()

    const onDelete = () => {
        setShowModal(false)
        deleteFetch.sendRequest(async () => await ReviewsService.deleteById(reviewId))
    }
    

    const [ isEditing, setIsEditing ] = useState(false)

    const updateFetch = useFetch()

    const onUpdate = (reviewFormState) => {
        setIsEditing(false)
        updateFetch.sendRequest(async () => await ReviewsService.updateById(reviewFormState, reviewId))
    }

    const {
        formState: reviewFormState, 
        handleInputChange, 
        handleSubmit,
        setFormField
    } = useForm({ initialFormState, onSubmit: onUpdate })
    
    useEffect(() => {
        if(deleteFetch.response?.ok || updateFetch.response?.ok) {
            fetchReviews()
        }
    }, [deleteFetch.response, updateFetch.response])
    return (
        <>
            {
                !isEditing ? (
                    <div className='review'>
                        <div className='review__header'>
                            <div className='review__user__container'>
                                <div className='review__user__image'>
                                    <img src={userUrlImage} alt={`Foto de perfil de ${userName}`}/>
                                </div>
                                <div className='review__user__text'>
                                    <span className='review__user__name'>{userName}</span>
                                    <span className='reviews__created_at'>{`${reviewCreatedDate} ${isEdited ? "-- editado" : ""}`}</span>
                                </div>
                            </div>
                            <div className='review__rating'>
                                {
                                    [1, 2, 3, 4, 5].map((value) => (
                                        <LuStar
                                        key={value}
                                        className={`review__rating__star ${value <= rating && "rrs--gold"}`}
                                        />
                                    ))
                                }
                            </div>
                            {
                                userOwnerId === user._id && (
                                    !showModal ? (
                                        <div className='review__buttons-container'>
                                            <button className='review__button' onClick={() => setIsEditing(true)}><LuPencilLine className='review__button__icon'/></button>
                                            <button onClick={() => setShowModal(true)} className='review__button'><LuTrash2 className='review__button__icon'/></button>
                                        </div>
                                    ) : (
                                        <div className="review__buttons-container">
                                            <div className="review__modal-content">
                                                <h3 className='review__modal__title'>¿Eliminar reseña?</h3>
                                                <p className='review__modal__text'>Esta acción no se puede deshacer.</p>
                                                <div className='review__modal__buttons-container'>
                                                    <button className='review__modal__button' onClick={onDelete}>
                                                        Sí, eliminar
                                                    </button>

                                                    <button className='review__modal__button' onClick={() => setShowModal(false)}>Cancelar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div className='review__content-container'>
                            {
                                bookTitle && <span className='review__content__book'>Libro:
                                    {
                                        <span className='review__content__book-title'> {bookTitle}</span>
                                    }
                                </span>
                            }
                            <p className='review__content'>{content}</p>
                        </div>
                        <div className='review__section-comments'>
                            <button className='comments__button'>
                                <LuMessageCircle className='comments__button__icon'/>
                                <span className='comments__button__span'>{"comentarios"}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='review'>
                        <div className='review__header'>
                                <div className='review__user__container'>
                                    <div className='review__user__image'>
                                        <img src={userUrlImage} alt={`Foto de perfil de ${userName}`}/>
                                    </div>
                                    <div className='review__user__text'>
                                        <span className='review__user__name'>{userName}</span>
                                        <span className='reviews__created_at'>{`${reviewCreatedDate} ${isEdited ? "-- editado" : ""}`}</span>
                                    </div>
                                </div>
                        </div>
                        <form className='review__edit__form' onSubmit={ handleSubmit }>
                            <label className='review__edit__form__label'>Tu puntuación</label>
                            <StarRatingInput 
                                onChange={(value) => setFormField([FORM_FIELDS.RATING], value)}
                                initialRating={rating}
                            />

                            <label className='review__edit__form__label' htmlFor={FORM_FIELDS.CONTENT}>Tu reseña</label>
                            <textarea
                                required
                                className='review__edit__form__input'
                                value={ reviewFormState.content }
                                name={ FORM_FIELDS.CONTENT }
                                id={ FORM_FIELDS.CONTENT }
                                onChange={ handleInputChange }
                                placeholder='Comparte tu opinión sobre este libro...'
                            />
                            <div className='review__edit__form__buttons-container'>
                                <button className='review__edit__form__button ref--submit' type='submit' disabled={reviewFormState.rating === 0 || reviewFormState.content === ''}>Editar</button>
                                <button className='review__edit__form__button' type='button' onClick={() => setIsEditing(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default ReviewComponent