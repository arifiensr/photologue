import { useContext, useRef } from 'react'
import './login.scss'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'
import logoPhotologue from '../../assets/images/logo/photologue1.png'

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

      async function getLoggedUser() {
        // * API Get Logged User
        const loggedUser = await psApi.getLoggedUser(login.token)

        // * API Get Followers and Following by User ID
        const followingByUserId = await psApi.getFollowingByUserId(loggedUser.data.id, login.token, { params: { size: 10, page: 1 } })
        const followersByUserId = await psApi.getFollowersByUserId(loggedUser.data.id, login.token, { params: { size: 10, page: 1 } })

        loggedUser.data.following = followingByUserId.data.users
        loggedUser.data.followers = followersByUserId.data.users
        loggedUser.data.followingId = followingByUserId.data.users.map((user) => user.id)

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser.data))
        setLoggedUser(loggedUser.data)
      }
      getLoggedUser()

      setIsLogin(true)
    } catch (err) {
      alert(`${err.response.data.message}`)
    }
  }
  return (
    <section id="login" className="login">
      <div className="login__wrap">
        <div className="login__wrap-title d-flex justify-content-center">
          <img src={logoPhotologue} alt="" />
        </div>
        <form className="login__wrap-form">
          <div className="form-floating mb-4">
            <input ref={loginEmailRef} type="email" className="form-control" placeholder="email" id="loginEmail" required />
            <label htmlFor="loginEmail">Email</label>
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="form-floating mb-4">
            <input ref={loginPasswordRef} type="password" className="form-control" placeholder="email" id="loginPassword" required />
            <label htmlFor="loginPassword">Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot mb-4">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className='text-decoration-none fw-bold'>Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-3" onClick={loginUser}>
            Login
          </button>
          <div className="register d-flex justify-content-center mt-4">
            <p>
              Don't have an account?{' '}
              <a href="#" className="text-decoration-none fw-bold register-link">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
