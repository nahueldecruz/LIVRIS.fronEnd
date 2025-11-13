import { Link, useNavigate } from 'react-router'
import './LoginScreen.css'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import AuthService from '../../services/AuthService.js'
import { useAuth } from '../../Contexts/AuthContext.jsx'
import { useEffect } from 'react'
import ButtonLoaderComponent from '../../Components/ButtonLoaderComponent/ButtonLoaderComponent.jsx'

const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

const initialFormState = {
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: '',
}

function LoginScreen() {

  const { login } = useAuth()

  const navigate = useNavigate()

  const {
    loading,
    response,
    error,
    sendRequest,
  } = useFetch()

  const onLogin = (loginFormState) => {
    sendRequest(async () => await AuthService.login(loginFormState))
  }

  
  useEffect(()=>{
    if(response?.ok){
      login({
        userData: response.data.user,
        userToken: response.data.authorizationToken 
      })
      navigate('/books')
    }
  }, [response])

  const { 
    formState: loginFormState, 
    handleInputChange, 
    handleSubmit 
  } = useForm({ initialFormState, onSubmit: onLogin })

  return (
    <>
      <div className='login-screen'>
        <h1 className='login-screen__title'>Inicia Sesión</h1>
        <form className='login-screen__form' onSubmit={handleSubmit}>
          <div className='login-screen__form__input-container'>
            <label className='login-screen__form__label' htmlFor={FORM_FIELDS.EMAIL}>Email: </label>
            <input
              required 
              className='login-screen__form__input'
              type='email'
              value={loginFormState.email}
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              onChange={handleInputChange}
            />
            { error?.errors?.email && <p className="login-screen__error">{error.errors.email}</p> }
          </div>

          <div className='login-screen__form__input-container'>
            <label className='login-screen__form__label' htmlFor={FORM_FIELDS.PASSWORD}>Password: </label>
            <input
              required 
              className='login-screen__form__input'
              type='password'
              value={loginFormState.password}
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              onChange={handleInputChange}
            />
            { error?.errors?.password && <p className="login-screen__error">{error.errors.password}</p> }
          </div>
          {
            loading ? <ButtonLoaderComponent /> : (
              !response 
              ? <button className='login-screen__form__button' type='submit' >Iniciar Sesión</button> 
              : <>
                  <button className='login-screen__form__button' type='submit' disabled={true}>Iniciado</button>
                  <span className='login-screen__success'>{response.message}</span>
                </>
            )
          }
          {
            error?.message && <span className='login-screen__error'>{error.message}</span>
          }
          <div className='login-screen__form__link-container'>
            <Link className='login-screen__form__link' to='/register'>Crear Cuenta</Link>
            <Link className='login-screen__form__link login-screen__form__link--forgot-password' to='/forgot-password'>Olvidé mi contraseña</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginScreen