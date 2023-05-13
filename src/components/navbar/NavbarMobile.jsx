import { Link, useNavigate } from 'react-router-dom'
import psApi from '../../api/psApi'
import './navbarmobile.scss'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import Modal from '../modal/Modal'

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

  // useEffect(() => {
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     console.log(entry)
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add('show')
  //     } else {
  //       entry.target.classList.remove('show')
  //     }
  //   })
  // })

  // const hiddenElements = document.querySelectorAll('.hidden')
  // hiddenElements.forEach((el) => observer.observe(el))
  // }, [])

  return (
    <section id="navbar-mobile" className="navbar-mobile fixed-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto navbar-mobile__content w-100 d-flex justify-content-around align-items-center">
            <Link to={`/`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
              <i className="bx bx-home"></i>
            </Link>
            <i className="bx bx-plus-circle" data-bs-toggle="modal" data-bs-target="#createPostModal"></i>
            <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary d-flex align-items-center" aria-current="page">
              <img src={loggedUser.profilePictureUrl} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
