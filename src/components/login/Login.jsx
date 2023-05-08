import { useContext, useRef } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'

export default function Login() {
  const { isLogin, setIsLogin } = useContext(GlobalContext)

  const userData = JSON.parse(localStorage.getItem('userData'))

  const loginEmailRef = useRef(userData ? userData.email : null)
  const loginPasswordRef = useRef()
  async function login(e) {
    try {
      e.preventDefault()

      const [email, password] = [loginEmailRef.current.value, loginPasswordRef.current.value]

      const login = await psApi.loginUser(email, password)
      localStorage.setItem('token', JSON.stringify(login.token))

      setIsLogin(true)
    } catch (err) {
      alert(`${err.response.data.message}`)
    }
  }
  return (
    <>
      <section id="login" className="login">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Login</h3>
              <form className="login__form">
                <div className="mb-3">
                  <label htmlFor="inputEmailLogin" className="form-label email-label">
                    Email address
                  </label>
                  <input ref={loginEmailRef} type="email" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPasswordLogin" className="form-label">
                    Password
                  </label>
                  <input ref={loginPasswordRef} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={login}>
                  Submit
                </button>
                <button className="btn btn-secondary ms-2 signup-button">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
