import { LuPencilLine, LuStar } from 'react-icons/lu'
import './ButtonAddReviewComponent.css'
import { useEffect, useState } from 'react'
import StarRatingInput from '../StarRatingInputComponent/StarRatingInputComponent'
import useForm from '../../hooks/useForm'
import ReviewsService from '../../services/ReviewsService'
import useFetch from '../../hooks/useFetch'

const FORM_FIELDS = {
    CONTENT: 'content',
    RATING: 'rating'
}

const initialFormState = {
    [FORM_FIELDS.CONTENT]: '',
    [FORM_FIELDS.RATING]: 0
}

function ButtonAddReviewComponent({ bookId, userId, onReviewCreated }) {

    const [ isAddReviewActive, setIsAddReviewActive ] = useState(false)

    const { loading, response, error, sendRequest } = useFetch()

    const onReview = (reviewFormState) => {
        sendRequest(async () => await ReviewsService.create(
            { userId, bookId, content: reviewFormState.content, rating: reviewFormState.rating }
        ))
    }
    
    useEffect(() => {
        if(response?.data?.review) {
            onReviewCreated()
            setIsAddReviewActive(false)
        }
    }, [response])

    const handleAddReviewToogle = () => {
        if(isAddReviewActive) {
            setIsAddReviewActive(false)
        } else {
            setIsAddReviewActive(true)
        }
    }
    
    const {
        formState: reviewFormState, 
        handleInputChange, 
        handleSubmit,
        setFormField
    } = useForm({ initialFormState, onSubmit: onReview })

    return (
        <div className='button-add-review'>
            <button className='button-add-review__container' onClick={handleAddReviewToogle}>
                <LuPencilLine className='button-add-review__icon'/>
                <span className='button-add-review__span'>Escribir mi reseña</span>
            </button>
            {
                isAddReviewActive && (
                    <form className='button-add-review__form' onSubmit={handleSubmit}>
                        <label className='button-add-review__form__label'>Tu puntuación</label>
                        <StarRatingInput onChange={(value) => setFormField([FORM_FIELDS.RATING], value)}/>

                        <label className='button-add-review__form__label' htmlFor={FORM_FIELDS.CONTENT}>Tu reseña</label>
                        <textarea
                            required
                            className='button-add-review__form__input'
                            value={ reviewFormState.content }
                            name={ FORM_FIELDS.CONTENT }
                            id={ FORM_FIELDS.CONTENT }
                            onChange={ handleInputChange }
                            placeholder='Comparte tu opinión sobre este libro...'
                        />
                        <div className='button-add-review__form__buttons-container'>
                            <button className='button-add-review__form__button bar--submit' type='submit' disabled={reviewFormState.rating === 0 || reviewFormState.content === ''}>Crear</button>
                            <button className='button-add-review__form__button' type='button' onClick={handleAddReviewToogle}>Cancelar</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default ButtonAddReviewComponent