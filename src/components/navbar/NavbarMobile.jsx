import { Link, useNavigate } from 'react-router-dom'
import logoPhotologue from '../../assets/images/logo/photologue1.png'
import psApi from '../../api/psApi'
import './navbarmobile.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import { HashLink } from 'react-router-hash-link'

export default function NavbarMobile() {
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
    <section id="navbar-mobile" className="navbar-mobile fixed-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto navbar-mobile__content w-100 d-flex justify-content-around align-items-center">
            <HashLink to={`/#`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
              <i className="bx bx-home"></i>
            </HashLink>{' '}
            <HashLink to={`/u/${loggedUser.id}#`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
              <img src={loggedUser.profilePictureUrl} alt="" />
            </HashLink>
            <i className="bx bx-menu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarMobile"></i>
          </div>
        </div>
      </div>

      {/* Offcanvas Navbar */}
      <div className="offcanvas offcanvas-start navbar-mobile__hidden-navbar bg-secondary" tabIndex={-1} id="offcanvasNavbarMobile" aria-labelledby="offcanvasNavbarMobileLabel">
        <div className="offcanvas-header">
          <div className="offcanvas-title" id="offcanvasNavbarMobileLabel">
            <a className="text-primary d-inline text-decoration-none d-flex justify-content-center align-items-center" role="button">
              <img src={logoPhotologue} alt="" />
            </a>
          </div>
        </div>
        <div className="offcanvas-body p-0">
          <hr className="text-primary d-block" />
          <ul className="navbar__wrap_content-list nav nav-pills flex-column mt-2 mt-sm-0" id="menu">
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <HashLink to={'/#'} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                <i className="bx bx-home" data-bs-dismiss="offcanvas" aria-label="Close"></i>
                <span className="ms-2 d-inline" data-bs-dismiss="offcanvas" aria-label="Close">
                  Home
                </span>
              </HashLink>
            </li>
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <a href="#" type="button" className="nav-link text-primary d-flex align-items-center" aria-current="page">
                <i className="bx bx-notification"></i>
                <span className="ms-2 d-inline">Notification</span>
              </a>
            </li>
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <HashLink to={`/u/${loggedUser.id}#`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                <img src={loggedUser.profilePictureUrl} alt="" data-bs-dismiss="offcanvas" aria-label="Close" />
                <span className="ms-2 d-inline" data-bs-dismiss="offcanvas" aria-label="Close">
                  Profile
                </span>
              </HashLink>
            </li>
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <HashLink to={`/editprofile#`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
                <i className="bx bx-cog" data-bs-dismiss="offcanvas" aria-label="Close"></i>
                <span className="ms-2 d-inline" data-bs-dismiss="offcanvas" aria-label="Close">Edit Profile</span>
              </HashLink>
            </li>
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <div className="nav-link text-primary d-flex align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#createPostModal">
                <i className="bx bx-plus-circle"></i>
                <span className="ms-2 d-inline">Create Post</span>
              </div>
            </li>
            <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
              <button className="btn btn-primary fs-6 w-100 rounded shadow d-block" onClick={logoutUser}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
