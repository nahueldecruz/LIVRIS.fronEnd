import { NavLink } from 'react-router-dom'
import './SideBarComponent.css'
import { useAuth } from '../../Contexts/AuthContext'
import { useSideBar } from '../../Contexts/SideBarContext'
import { LuBookOpen, LuHouse, LuLogOut, LuUser, LuUsers } from "react-icons/lu";
import { FiSidebar } from 'react-icons/fi';
import { useEffect, useState } from 'react';

function SideBarComponent() {
    const { logout, user } = useAuth()
    const { toggleSideBar, closeSideBar } = useSideBar()
    
    const widthScreen = window.innerWidth
    const [ isMobile, setIsMobile ] = useState(widthScreen <= 768)

    useEffect(() => {
        if (widthScreen <= 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [ widthScreen ])
    
    return (
        <div className='side-bar'>
            <div className='side-bar__header'>
                <LuBookOpen className='side-bar__icon'/>
                <div>
                    <h1 className='side-bar__title'>LiVris</h1>
                    <span className='side-bar__span'>Literatura Virtual</span>
                </div>
                <button className='side-bar__header__button'>
                    <FiSidebar className='side-bar__header__icon' onClick={toggleSideBar}/>
                </button>
            </div>
            <div className='side-bar__links-container'>
                <NavLink onClick={isMobile && closeSideBar} className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={'/books'}>
                    <LuHouse className='side-bar__link-icon'/>
                    <span className='side-bar__link'>Explorar Libros</span>
                </NavLink>
                <NavLink onClick={isMobile && closeSideBar} className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={'/community'}>
                    <LuUsers className='side-bar__link-icon'/>
                    <span className='side-bar__link'>Usuarios</span>
                </NavLink>
                <NavLink onClick={isMobile && closeSideBar} className={({ isActive }) => `side-bar__icon-link-container ${isActive ? 'sbi--active' : ''}`} to={`/user-detail/me`}>
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