import { LuBookOpen } from "react-icons/lu"
import "./BookLoaderComponent.css"

function BookLoaderComponent() {
    return (
        <div className="book-loader__container">
        <div className="book-loader__icon-wrapper">
            <LuBookOpen className="book-loader__icon" />
        </div>
            <p className="book-loader__text">Cargando...</p>
        </div>
    )
}

export default BookLoaderComponent