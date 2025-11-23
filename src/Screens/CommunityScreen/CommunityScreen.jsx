import { LuSearch, LuUser, LuUserPlus, LuUsers } from 'react-icons/lu'
import './CommunityScreen.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'
import UsersService from '../../services/UsersService'
import UserItemComponent from '../../Components/UserItemComponent/UserItemComponent'
import UserLoaderComponent from '../../Components/UserLoaderComponent/UserLoaderComponent'

const FORM_FIELDS = {
  QUERY: 'query'
}

const initialFormState = {
  [FORM_FIELDS.QUERY]: ''
}

function CommunityScreen() {
    const [page, setPage] = useState(1)

    const {
        response,
        error,
        loading,
        sendRequest
    } = useFetch()

    useEffect(() => {
        if(comunnityFormState.query !== ""){
            onSearch(comunnityFormState)
        }
    }, [page]);
    
    const onSearch = (comunnityFormState) => {
        sendRequest(async () => await UsersService.getByQuery(comunnityFormState, page))
    }

    const { 
        formState: comunnityFormState, 
        handleInputChange, 
        handleSubmit 
    } = useForm({ initialFormState, onSubmit: onSearch })

    return (
        <div className='community-screen'>
            <div className='community__header'>
                <div className='community__header__title-container'>
                    <LuUsers className='community__header__icon'/>
                    <h2 className='community__header__title'>Comunidad</h2>
                </div>
                <span className='community__header__text'>Conecta con otros lectores y comparte tu pasión por los libros</span>
            </div>
            <form className='community__form' onSubmit={handleSubmit}>
                <input 
                    className='community__form__input'
                    type='text'
                    value={comunnityFormState.query}
                    name={FORM_FIELDS.QUERY}
                    id={FORM_FIELDS.QUERY}
                    onChange={handleInputChange}
                    placeholder='Buscar por nombre o email...'
                />
                <button className='community__form__button' type='submit' disabled={comunnityFormState.query === ""}>
                    <LuSearch className='community__form__icon-button' />
                </button>
            </form>
            {
                !loading ? (
                    <div className='comunnity__users-container'>
                        {
                            response?.data?.users.map((user)=>{
                                return (
                                    <UserItemComponent
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        email={user.email}
                                        createdAt={user.createdAt}
                                        imageUrl={user.image_url}
                                    />
                                )
                            })
                        }
                    </div> 
                ) : <UserLoaderComponent className='comunnity__users__searching' />
            }
            {
                response?.data?.users.length === 0 && (
                    <div className='comunnity__message-fail-search'>
                        <LuUsers className='comunnity__message__icon'/>
                        <h3 className='comunnity__message__sub-title'>No se encontraron usuarios</h3>
                        <span className='comunnity__message__span'>Intenta con otra búsqueda</span>
                    </div>
                )
            }
            {
                response?.data?.users && (
                    <div className="comunnity__pagination">
                        <button className='comunnity__pagination__button' disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
                        <span className='comunnity__pagination__span' >Página {page}</span>
                        <button className='comunnity__pagination__button' disabled={response.data.users.length < 12} onClick={() => setPage(page + 1)}>Siguiente</button>
                    </div>
                )
            }
        </div>
    )
}

export default CommunityScreen