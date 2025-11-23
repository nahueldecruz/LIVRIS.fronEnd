import { useParams } from 'react-router-dom'
import './UserBooks.css'
import { useAuth } from '../../Contexts/AuthContext'

function UserBooks() {
    const { status, user_id: userId } = useParams()
    const { user } = useAuth()

    return (
        <div>
            {status}
        </div>
    )
}

export default UserBooks