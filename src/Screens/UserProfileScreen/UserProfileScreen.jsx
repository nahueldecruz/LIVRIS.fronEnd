import { LuBookOpen, LuMessageCircle, LuUserPlus } from 'react-icons/lu'
import { useAuth } from '../../Contexts/AuthContext'
import './UserProfileScreen.css'
import { PiBooksLight } from 'react-icons/pi'
import UserLoaderComponent from '../../Components/UserLoaderComponent/UserLoaderComponent'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../../Contexts/UserContext'
import UsersService from '../../services/UsersService'
import useFetch from '../../hooks/useFetch'

function UserProfileScreen() {
    const { user_id: userId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { userData, setUserData } = useUsers()
    const { loading, response, error, sendRequest } = useFetch()
    
    const [ isMine, setIsMine ] = useState(false)
    const [ idToCompare, setIdToCompare ] = useState(null)


    useEffect(() => {
        if(!user) return
        
        let id = userId === 'me' ? user._id.toString() : userId.toString()
        setIdToCompare(id)
        setIsMine(id === user._id.toString())
    }, [userId, user])

    useEffect(() => {
        if (window.location.pathname.endsWith(`/${userId}/reviews`)) return
        navigate(`/user-detail/${userId}/reviews`)
    }, [userId])


    useEffect(() => {
        if(!idToCompare) return
        
        sendRequest(async () => await UsersService.getById(idToCompare))
    }, [idToCompare])

    useEffect(() => {
        if(response?.data?.user){
            setUserData(response?.data?.user)
        }
    },[response])
    
    return (
        <div className='user-profile-screen'>
            {   
                !userData ? <UserLoaderComponent /> : (
                    <div className='user-profile__container'>
                        <div className='user-profile__user'>
                            {
                                !isMine && (
                                    <button className='user-profile__add-friend'>
                                        <LuUserPlus className='user-profile__add-friend__icon' />
                                    </button>
                                )
                            }
                            <div className='user-profile__user__image-container'>
                                <img src={userData.image_url} alt={`Imagen de perfil de ${userData.name}`} />
                            </div>
                            <div className='user-profile__user__info'>
                                <h2 className='user-profile__user__name'>{userData.name}</h2>
                                <span className='user-profile__user__email'>{userData.email}</span>
                                <div className='user-profile__user__stats-container'>
                                    <div className='user-profile__stats'>
                                        <LuBookOpen className='user-profile__stats__icon'/>
                                        <span className='user-profile__stats__span'>{userData.reviews_count} reseñas</span>
                                    </div>
                                    <div className='user-profile__stats'>
                                        <LuMessageCircle className='user-profile__stats__icon'/>
                                        <span className='user-profile__stats__span'>{userData.comments_count} comentarios</span>
                                    </div>
                                    <div className='user-profile__stats'>
                                        <PiBooksLight className='user-profile__stats__icon'/>
                                        <span className='user-profile__stats__span'>libros en listas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='user-profile__links-container'>
                            <NavLink className={({ isActive }) => `user-profile__link ${isActive ? 'upl--active' : ''}`} to={`/user-detail/${userId}/reviews`}>
                                <LuBookOpen className='user-profile__link__icon'/>
                                <span className='user-profile__link__span'>{isMine ? "Mis Reseñas" : "Sus reseñas"}</span>
                            </NavLink>
                            <NavLink className={({ isActive }) => `user-profile__link ${isActive ? 'upl--active' : ''}`} to={`/user-detail/${userId}/comments`}>
                                <LuMessageCircle className='user-profile__link__icon'/>
                                <span className='user-profile__link__span'>{isMine ? "Mis Comentarios" : "Sus Comentarios"}</span>
                            </NavLink>
                            <NavLink className={({ isActive }) => `user-profile__link ${isActive ? 'upl--active' : ''}`} to={`/user-detail/${userId}/lists-books`}>
                                <PiBooksLight className='user-profile__link__icon'/>
                                <span className='user-profile__link__span'>{isMine ? "Mis Listas" : "Sus Listas"}</span>
                            </NavLink>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfileScreen