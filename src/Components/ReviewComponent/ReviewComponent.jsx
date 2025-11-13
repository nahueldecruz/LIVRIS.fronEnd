import { LuMessageCircle, LuStar } from 'react-icons/lu'
import './ReviewComponent.css'
import { FaStar } from 'react-icons/fa'

function ReviewComponent({ userName, userUrlImage, content, createdAt, rating, bookTitle}) {

    const createdDate = new Date(createdAt)
    const year = createdDate.getFullYear()
    const day = createdDate.getDate()
    const month = createdDate.getMonth()
    
    const monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    
    const reviewCreatedDate = `${day} de ${monthNames[month]}, ${year}`

    return (
        <div className='review'>
            <div className='review__header'>
                <div className='review__user__container'>
                    <div className='review__user__image'>
                        <img src={userUrlImage} alt={`Foto de perfil de ${userName}`}/>
                    </div>
                    <div className='review__user__text'>
                        <span className='review__user__name'>{userName}</span>
                        <span className='reviews__created_at'>{reviewCreatedDate}</span>
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
    )
}

export default ReviewComponent