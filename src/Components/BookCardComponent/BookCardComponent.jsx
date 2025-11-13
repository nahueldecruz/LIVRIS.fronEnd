import { Link } from 'react-router-dom';
import './BookCardComponent.css'
import { FaStar } from "react-icons/fa6";
import { useBooks } from '../../Contexts/BooksContext';
import { LuStar } from 'react-icons/lu';

function BookCardComponent({ title, author, category, description, coverUrl, publishedYear, apiId, ratingAverage, reviewsCount }) {

    const { setSelectedBook } = useBooks()

    const handleSaveBook = () => {
        const selected = { title, author_name: author, category, description, cover_url: coverUrl, published_year: publishedYear, api_id: apiId, reviewsCount, ratingAverage }

        setSelectedBook(selected)
    }

    return (
        <button className='book-card' onClick={handleSaveBook}>
            <div className='book-card__image-container'>
                <img className='book-card__image' src={coverUrl} alt={`Imagen de portada de ${title}`} />
            </div>
            <div className='book-card__info-container'>
                <h3 className='book-card__title'>{title}</h3>
                <span className='book-card__author'>{author}</span>
                {
                    category && <span className='book-card__category'>{category}</span>
                }
                <div className='book-card__rating'>
                    {
                        <LuStar
                            className={`book-card__icon-star ${ratingAverage > 0 && "bci--gold"}`}
                        />
                    }
                    <span className='book-card__rating-average'>{ratingAverage || 0}</span>
                    <span className='book-card__rating-reviews'>{`(reseñas: ${reviewsCount || 0})`}</span>
                </div>
            </div>
        </button>
    )
}

export default BookCardComponent