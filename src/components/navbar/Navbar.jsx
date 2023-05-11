import { Link, useNavigate } from 'react-router-dom'
import psApi from '../../api/psApi'
import './navbar.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import Modal from '../modal/Modal'

export default function Navbar() {
  const { loggedUser, setIsLogin } = useContext(GlobalContext)
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('token'))

  async function logoutUser(e) {
    try {
      e.preventDefault()

      // * API Logout User
      await psApi.logoutUser(token)
      localStorage.clear()
      setIsLogin(false)
      navigate('/')
    } catch (err) {
      alert(`${err.response.data.message}`)
    }
  }

  return (
    <>
      <section id="" className="">
        <div className="container">
          <div className="row">
            <div className="col-12 border border-black rounded shadow w-100">
              <ul className="list-unstyled">
                <li>
                  <Link to={'/'}>Home</Link>
                </li>
                <li>
                  <Link to={`/u/${loggedUser.id}`}>Profile</Link>
                </li>
                <li>
                  <Link to={`/editprofile`}>Edit Profile</Link>
                </li>
                <li data-bs-toggle="modal" data-bs-target="#createPostModal" style={{ cursor: 'pointer' }}>
                  Create Post
                </li>
                <li>
                  <Link to={'/test'}>Test</Link>
                </li>
                <li>
                  <button className="btn btn-danger" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal />
      </section>
    </>
  )
}
