import { LuBookOpen, LuLoader } from "react-icons/lu"
import "./LoaderComponent.css"

function LoaderComponent() {
    return (
        <div className="loader__container">
        <div className="loader__icon-wrapper">
            <LuLoader className="loader__icon" />
        </div>
            <p className="loader__text">Cargando...</p>
        </div>
    )
}

export default LoaderComponent