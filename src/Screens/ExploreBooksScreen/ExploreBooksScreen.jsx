import { useEffect, useState } from 'react';
import BookCardComponent from '../../Components/BookCardComponent/BookCardComponent'
import useFetch from '../../hooks/useFetch';
import './ExploreBooksScreen.css'
import { LuBookOpen, LuSearch } from "react-icons/lu";
import BooksService from '../../services/BooksService';
import useForm from '../../hooks/useForm';
import BookLoaderComponent from '../../Components/BookLoaderComponent/BookLoaderComponent';

const FORM_FIELDS = {
  QUERY: 'query'
}

const initialFormState = {
  [FORM_FIELDS.QUERY]: ''
}

function ExploreBooksScreen() {
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const {
        response,
        error,
        loading,
        sendRequest
    } = useFetch()

    const onSearch = (exploreFormState) => {
        const newQuery = exploreFormState.query.trim();

        if (!newQuery) {
            setSearchQuery("")
            setPage(1)
            sendRequest(async () => await BooksService.getAll({ page: 1 }))
            return
        }

        setSearchQuery(newQuery)
        setPage(1)
        sendRequest(async () => await BooksService.getByQuery({ query: newQuery, page: 1 }))
    };
    
    useEffect(() => {
        if(!searchQuery){
            sendRequest(async () => await BooksService.getAll({ page }))
        } else {
            sendRequest(async () => await BooksService.getByQuery({ query: searchQuery, page }))
        }
    }, [page, searchQuery])

    const { 
        formState: exploreFormState, 
        handleInputChange, 
        handleSubmit 
    } = useForm({ initialFormState, onSubmit: onSearch })

    return (
        <div className='exlore-screen'>
            <div className='explore-screen__text-container'>
                <div className='explore-screen__text'>
                    <LuBookOpen className='explore-screen__icon'/>
                    <h2 className='explore-screen__title'>Explorar Biblioteca</h2>
                </div>
                <span className='explore-screen__span'>Descubre, lee y comparte tus opiniones sobre los mejores libros</span>
            </div>
            <form className='explore__form' onSubmit={handleSubmit}>
                <input className='explore__form__input' 
                    placeholder='Buscar por titulo, autor...'
                    type='text'
                    value={exploreFormState.query}
                    name={FORM_FIELDS.QUERY}
                    id={FORM_FIELDS.QUERY}
                    onChange={handleInputChange}
                />
                <button className='explore__form__button' type='submit'>
                    <LuSearch className='explore__form__icon-button' />
                </button>
            </form>
            {
                !loading ? (
                    <div className='exlore-screen__books-container'>
                        {
                            response?.data?.books.map((book)=>{
                                return (
                                    <BookCardComponent
                                        key={book.api_id}
                                        apiId={book.api_id}
                                        title={book.title}
                                        author={book.author_name}
                                        category={book.category}
                                        description={book.description}
                                        coverUrl={book.cover_url}
                                        publishedYear={book.published_year}
                                        ratingAverage={book.ratingAverage}
                                        reviewsCount={book.reviewsCount}
                                    />
                                )
                            })
                        }
                    </div> 
                ) : <BookLoaderComponent className='exlore-screen__searching' />
            }
            {
                response?.data?.books.length === 0 && (
                    <div className='exlore-screen__message-fail-search'>
                        <LuBookOpen className='exlore-screen__message__icon'/>
                        <h3 className='exlore-screen__message__sub-title'>No se encontraron libros</h3>
                        <span className='exlore-screen__message__span'>Intenta con otra búsqueda</span>
                    </div>
                )
            }
            {
                response?.data?.books && (
                    <div className="explore__pagination">
                        <button className='explore__pagination__button' disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
                        <span className='explore__pagination__span' >Página {page}</span>
                        <button className='explore__pagination__button' disabled={response.data.books.length < 9 || response.data.books.length === 0} onClick={() => setPage(page + 1)}>Siguiente</button>
                    </div>
                )
            }
        </div>
    )
}

export default ExploreBooksScreen