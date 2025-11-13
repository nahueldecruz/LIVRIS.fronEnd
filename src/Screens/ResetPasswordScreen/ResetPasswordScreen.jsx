import './ResetPasswordScreen.css'
import useForm from '../../hooks/useForm.jsx'
import AuthService from '../../services/AuthService.js'
import useFetch from '../../hooks/useFetch.jsx'
import { Link, useParams } from 'react-router'
import ButtonLoaderComponent from '../../Components/ButtonLoaderComponent/ButtonLoaderComponent.jsx'

const FORM_FIELDS = {
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword'
}

const initialFormState = {
  [FORM_FIELDS.NEW_PASSWORD]: '',
  [FORM_FIELDS.CONFIRM_PASSWORD]: ''
}

function ResetPasswordScreen() {

  const { "reset-token": resetToken } = useParams()
  const {
    loading,
    response,
    error,
    sendRequest,
  } = useFetch()

  const onReset = (resetFormState) => {
    sendRequest(async () => await AuthService.resetPassword(resetFormState, resetToken))
  }

  const {
    formState: resetFormState, 
    handleInputChange, 
    handleSubmit 
  } = useForm({ initialFormState, onSubmit: onReset })

  return (
    <>
      <div className='reset-screen'>
        <h2 className='reset-screen__title'>Actualiza contraseña</h2>
        <form className='reset-screen__form' onSubmit={handleSubmit}>
          <div className='reset-screen__form__input-container'>
            <label className='reset-screen__form__label' htmlFor={FORM_FIELDS.NEW_PASSWORD}>Nueva contraseña: </label>
            <input
              required 
              className='reset-screen__form__input'
              type='password'
              value={resetFormState.newPassword}
              name={FORM_FIELDS.NEW_PASSWORD}
              id={FORM_FIELDS.NEW_PASSWORD}
              onChange={handleInputChange} 
            />
            { error?.errors?.newPassword && <p className="reset-screen__error">{error.errors.newPassword}</p> }
          </div>


          <div className='reset-screen__form__input-container'>
            <label className='reset-screen__form__label' htmlFor={FORM_FIELDS.CONFIRM_PASSWORD}>Repita la contraseña: </label>
            <input
              required 
              className='reset-screen__form__input'
              type='password'
              value={resetFormState.confirmPassword}
              name={FORM_FIELDS.CONFIRM_PASSWORD}
              id={FORM_FIELDS.CONFIRM_PASSWORD}
              onChange={handleInputChange}
            />
            { error?.errors?.confirmPassword && <p className="reset-screen__error">{error.errors.confirmPassword}</p> }
          </div>
          {
            loading ? <ButtonLoaderComponent /> : (
              !response 
              ? <button className='reset-screen__form__button' type='submit' >Confirmar</button> 
              : <>
                  <button className='reset-screen__form__button' type='submit' disabled={true}>Actualizado</button>
                  <span className='reset-screen__form__span'>{response.message}</span>
                </>
            )
          }
          {
            error && <span className='reset-screen__error'>{error.message}</span>
          }
        <Link className='reset-screen__form__link' to='/login'>Iniciar Sesión</Link>
        </form>
      </div>
    </>
  )
}

export default ResetPasswordScreen