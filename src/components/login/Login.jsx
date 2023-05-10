import { useContext, useRef } from 'react'
import './login.scss'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'

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
                  <input ref={loginEmailRef} type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPasswordLogin" className="form-label">
                    Password
                  </label>
                  <input ref={loginPasswordRef} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginUser}>
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
