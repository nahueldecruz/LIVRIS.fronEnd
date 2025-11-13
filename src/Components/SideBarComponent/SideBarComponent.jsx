import { NavLink } from 'react-router-dom'
import './SideBarComponent.css'
import { useAuth } from '../../Contexts/AuthContext'
import { LuBookOpen, LuHouse, LuLogOut, LuUser, LuUsers } from "react-icons/lu";

function SideBarComponent() {
    const { logout, user } = useAuth()
    
    return (
        <div className='side-bar'>
            <div className='side-bar__header'>
                <LuBookOpen className='side-bar__icon'/>
                <div>
                    <h1 className='side-bar__title'>LiVris</h1>
                    <span className='side-bar__span'>Literatura Virtual</span>
                </div>
            </div>
            <div className='side-bar__links-container'>
                <NavLink className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={'/books'}>
                    <LuHouse className='side-bar__link-icon'/>
                    <span className='side-bar__link'>Explorar Libros</span>
                </NavLink>
                <NavLink className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={'/community'}>
                    <LuUsers className='side-bar__link-icon'/>
                    <span className='side-bar__link'>Usuarios</span>
                </NavLink>
                <NavLink className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={`/user-detail/me`}>
                    <LuUser className='side-bar__link-icon'/>
                    <span className='side-bar__link'>Mi Perfil</span>
                </NavLink>
            </div>
            <div className='side-bar__footer'>
                {
                    user?.name && user?.email && (
                        <div className='side-bar__user-info'>
                            <img className='side-bar__user__image' src={'/'} alt={`Imagen de email de ${user.name}`} />
                            <div className='side-bar__user-text'>
                                <span className='side-bar__user__name'>{user.name}</span>
                                <span className='side-bar__user__email'>{user.email}</span>
                            </div>
                        </div>
                    )
                }
                <button className='side-bar__button' onClick={logout}>
                    <LuLogOut className='side-bar__button-icon'/>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}

export default SideBarComponent