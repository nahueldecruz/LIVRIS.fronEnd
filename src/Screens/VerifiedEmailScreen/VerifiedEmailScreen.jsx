import { Link } from "react-router-dom"
import './VerifiedEmailScreen.css'

function VerifiedEmailScreen() {

  return (
    <div className='verified-screen'>
      <div className="verified-screen__container">
        <h2 className="verified-screen__title">Email verificado con éxito</h2>
        <Link className="verified-screen__link" to={'/login'}>Inicia Sesión</Link>
      </div>
    </div>
  )
}

export default VerifiedEmailScreen