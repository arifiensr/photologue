import { Link, useNavigate } from 'react-router-dom'
import logoPhotologue from '../../assets/images/logo/photologue1.png'
import psApi from '../../api/psApi'
import './navbar.scss'
import { useContext, useRef, useState } from 'react'
import { GlobalContext } from '../../config/GlobalState'

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
    <section id="navbar" className="navbar p-0 position-fixed">
      <div className="container-fluid">
        <div className="row">
          <div className="navbar__wrap d-flex flex-column justify-content-between col-auto min-vh-100">
            <div className="navbar__wrap_content mt-4">
              <div className="navbar__wrap_content-title d-flex justify-content-center align-items-center">
                <a className="text-primary d-none d-xl-inline text-decoration-none d-flex justify-content-center align-items-center" role="button">
                  <img src={logoPhotologue} alt="" />
                </a>
              </div>
              <hr className="text-primary d-none d-xl-block" />
              <ul className="navbar__wrap_content-list nav nav-pills flex-column mt-2 mt-sm-0" id="menu">
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={'/'} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                    <i className="bx bx-home"></i>
                    <span className="ms-2 d-none d-xl-inline">Home</span>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <a href="#" type="button" className="nav-link text-primary d-flex align-items-center" aria-current="page">
                    <i className="bx bx-notification"></i>
                    <span className="ms-2 d-none d-xl-inline">Notification</span>
                  </a>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-xl-inline">Profile</span>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/editprofile`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                    <i className="bx bx-cog"></i>
                    <span className="ms-2 d-none d-xl-inline">Edit Profile</span>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <div className="nav-link text-primary d-flex align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#createPostModal">
                    <i className="bx bx-plus-circle"></i>
                    <span className="ms-2 d-none d-xl-inline">Create Post</span>
                  </div>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <button className="btn btn-primary fs-6 w-100 rounded shadow d-none d-xl-block" onClick={logoutUser}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
