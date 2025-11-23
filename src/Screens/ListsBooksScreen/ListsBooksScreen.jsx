import { NavLink, Outlet } from 'react-router-dom'
import './ListsBooksScreen.css'

function ListsBooksScreen() {
    return (
        <div className='lists-books-screen'>
            <div className='list-books__links-container'>
                <NavLink className={({ isActive }) => `list-books__link ${isActive ? 'lbs--active' : ''}`} to={'./reading'}>Leyendo</NavLink>
                <NavLink className={({ isActive }) => `list-books__link ${isActive ? 'lbs--active' : ''}`} to={'./read'}>Leído</NavLink>
                <NavLink className={({ isActive }) => `list-books__link ${isActive ? 'lbs--active' : ''}`} to={'./want_to_read'}>Quiero Leer</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default ListsBooksScreen