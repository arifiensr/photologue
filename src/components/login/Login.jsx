import { useContext, useRef } from 'react'
import './login.scss'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'
import logoPhotologue from '../../assets/images/logo/photologue1.png'
import getLoggedUser from '../../config/getLoggedUser'

export default function Login() {
  const { setIsLogin, setLoggedUser } = useContext(GlobalContext)

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  async function loginUser(e) {
    try {
      e.preventDefault()
      const [email, password] = [loginEmailRef.current.value, loginPasswordRef.current.value]

      // * API Login User
      const login = await psApi.loginUser(email, password)
      localStorage.setItem('token', JSON.stringify(login.token))
      const loggedUser = await getLoggedUser(login.token)
      setLoggedUser(loggedUser)
      setIsLogin(true)
    } catch (err) {
      console.log(err)
      alert(`${err.response.data.message}`)
    }
  }
  return (
    <section id="login" className="login d-flex flex-column justify-content-start align-items-center h-100">
      <div className="login__wrap">
        <div className="login__wrap-title d-flex justify-content-center">
          <img src={logoPhotologue} alt="" />
        </div>
        <form className="login__wrap-form" autoComplete="off">
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-envelope"></i>
            </span>
            <input ref={loginEmailRef} type="email" autoComplete="new-password" required />
            <label htmlFor="inputEmailLabel">Email</label>
          </div>
          <div className="input-box">
            <span className="input-box__icon">
              <i className="bx bxs-lock-alt"></i>
            </span>
            <input ref={loginPasswordRef} type="password" autoComplete="new-password" required />
            <label htmlFor="inputPasswordLabel">Password</label>
          </div>
          <div className="remember-forgot mb-4">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-3" onClick={loginUser}>
            Login
          </button>
          <div className="register d-flex justify-content-center mt-4">
            <p>
              Don't have an account?{' '}
              <a href="#" className="register-link">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="login__sample-user d-block d-sm-none">
        <p className="fw-bold m-0">You can use this account.</p>
        <span>
          Email: chrispratt@gmail.com
          <br />
          Password: pass123
        </span>
      </div>
    </section>
  )
}
