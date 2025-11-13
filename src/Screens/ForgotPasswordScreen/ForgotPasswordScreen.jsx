import './ForgotPasswordScreen.css'
import useForm from '../../hooks/useForm.jsx'
import AuthService from '../../services/AuthService.js'
import useFetch from '../../hooks/useFetch.jsx'
import { Link } from 'react-router'
import ButtonLoaderComponent from '../../Components/ButtonLoaderComponent/ButtonLoaderComponent.jsx'

const FORM_FIELDS = {
  EMAIL: 'email'
}

const initialFormState = {
  [FORM_FIELDS.EMAIL]: ''
}

function ForgotPasswordScreen() {

  const {
    loading,
    response,
    error,
    sendRequest,
  } = useFetch()

  const onForgot = (forgotFormState) => {
    sendRequest(async () => await AuthService.forgotPassword(forgotFormState))
  }

  const { 
    formState: forgotFormState, 
    handleInputChange, 
    handleSubmit 
  } = useForm({ initialFormState, onSubmit: onForgot })

  return (
    <>
      <div className='forgot-screen'>
        <h2 className='forgot-screen__title'>Restablecer contraseña</h2>
        <form className='forgot-screen__form' onSubmit={handleSubmit}>
          <div className='forgot-screen__form__input-container'>
            <label className='forgot-screen__form__label' htmlFor={FORM_FIELDS.EMAIL}>Ingrese el email: </label>
            <input
              required 
              className='forgot-screen__form__input'
              type='email'
              value={forgotFormState.email}
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              onChange={handleInputChange}
            />
            { error?.errors?.email && <p className="forgot-screen__error">{error.errors.email}</p> }
          </div>
          {
            loading ? <ButtonLoaderComponent /> : (
              !response 
              ? <button className='forgot-screen__form__button' type='submit' >Confirmar</button> 
              : <>
                  <button className='forgot-screen__form__button' type='submit' disabled={true}>Enviado</button>
                  <span className='forgot-screen__form__span'>{response.message}</span>
                </>
            )
          }
          {
            error?.message && <span className='forgot-screen__error'>{error.message}</span>
          }
          <Link className='forgot-screen__form__link' to='/login'>Volver al inicio</Link>
        </form>
      </div>
    </>
  )
}

export default ForgotPasswordScreen