import { LuUser } from "react-icons/lu"
import "./UserLoaderComponent.css"

function UserLoaderComponent() {
    return (
        <div className="user-loader__container">
        <div className="user-loader__icon-wrapper">
            <LuUser className="user-loader__icon" />
        </div>
            <p className="user-loader__text">Cargando...</p>
        </div>
    )
}

export default UserLoaderComponent