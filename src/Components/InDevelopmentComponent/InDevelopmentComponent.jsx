import { LuConstruction } from 'react-icons/lu'
import './InDevelopmentComponent.css'
import { IoConstructOutline } from 'react-icons/io5'

function InDevelopmentComponent() {
  return (
    <div className='in-development-component'>
        <div className="in-development-loader__wrapper">
            <IoConstructOutline  className='in-development-loader__icon'/>
        </div>
        <div className='in-development__message'>
            <LuConstruction className='in-development__message__icon'/>
            <h2 className='in-development__message__sub-title'>Próximamente</h2>
            <LuConstruction className='in-development__message__icon'/>
        </div>
        <span className='in-development__message__span'>Esta sección aún está en desarrollo. ¡Vuelve pronto!</span>
    </div>
  )
}

export default InDevelopmentComponent