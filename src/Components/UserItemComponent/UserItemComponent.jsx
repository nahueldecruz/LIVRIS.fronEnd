import { Link } from 'react-router-dom'
import './UserItemComponent.css'

function UserItemComponent({ userId, name, email, createdAt, imageUrl }) {
    return (
        <Link className='user-item' to={`../user-detail/${userId}`}>
            <div className='user-item__image'>
                <img src={imageUrl} alt={`Imagen de perfil de ${name}`} />
            </div>
            <div className='user-item__text'>
                <span className='user-item__name'>{name}</span>
                <span className='user-item__email'>{email}</span>
            </div>
        </Link>
    )
}

export default UserItemComponent