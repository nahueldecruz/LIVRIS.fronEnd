import './RegisterScreen.css'
import useForm from '../../hooks/useForm.jsx'
import AuthService from '../../services/AuthService.js'
import useFetch from '../../hooks/useFetch.jsx'
import { Link } from 'react-router'
import ButtonLoaderComponent from '../../Components/ButtonLoaderComponent/ButtonLoaderComponent.jsx'

const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password'
}

const initialFormState = {
  [FORM_FIELDS.NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: '',
}

function RegisterScreen() {

  const {
    loading,
    response,
    error,
    sendRequest,
  } = useFetch()

  const onRegister = (registerFormState) => {
    sendRequest(async () => await AuthService.register(registerFormState))
  }
  
  const { 
    formState: registerFormState, 
    handleInputChange, 
    handleSubmit 
  } = useForm({ initialFormState, onSubmit: onRegister })
  return (
    <>
      <div className='register-screen'>
        <h1 className='register-screen__title'>Registrate</h1>
        <form className='register-screen__form' onSubmit={handleSubmit}>
          <div className='register-screen__form__input-container'>
            <label className='register-screen__form__label' htmlFor={FORM_FIELDS.NAME}>Nombre: </label>
            <input
              required 
              className='register-screen__form__input'
              type='text'
              value={registerFormState.name}
              name={FORM_FIELDS.NAME}
              id={FORM_FIELDS.NAME}
              onChange={handleInputChange}
            />
            { error?.errors?.name && <p className="register-screen__error">{error.errors.name}</p> }
          </div>

          <div className='register-screen__form__input-container'>
            <label className='register-screen__form__label' htmlFor={FORM_FIELDS.EMAIL}>Email: </label>
            <input
              required 
              className='register-screen__form__input'
              type='email'
              value={registerFormState.email}
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              onChange={handleInputChange}
            />
            { error?.errors?.email && <p className="register-screen__error">{error.errors.email}</p> }
          </div>

          <div className='register-screen__form__input-container'>
            <label className='register-screen__form__label' htmlFor={FORM_FIELDS.PASSWORD}>Password: </label>
            <input
              required 
              className='register-screen__form__input'
              type='password'
              value={registerFormState.password}
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              onChange={handleInputChange}
            />
            { error?.errors?.password && <p className="register-screen__error">{error.errors.password}</p> }
          </div>
          {
            loading ? <ButtonLoaderComponent /> : (
              !response 
              ? <button className='register-screen__form__button' type='submit' >Registrar</button> 
              : <>
                  <button className='register-screen__form__button' type='submit' disabled={true}>Registrado</button>
                  <span className='register-screen__form__span'>{response.message}</span>
                </>
            )

          }
          {
            error?.message && <span className='register-screen__error'>{error.message}</span>
          }
          <Link className='register-screen__form__link' to='/login'>Iniciar Sesión</Link>
        </form>
      </div>
    </>
  )
}

export default RegisterScreen