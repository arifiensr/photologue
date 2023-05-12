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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    })

    const hiddenElements = document.querySelectorAll('.hidden')
    hiddenElements.forEach((el) => observer.observe(el))
  }, [])

  return (
      <section id="navbar-mobile" className="navbar-mobile fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto navbar-mobile__content w-100 d-flex justify-content-around align-items-center">
              <i className="bx bx-home"></i>
              <i className="bx bx-plus-circle"></i>
              <img src={loggedUser.profilePictureUrl} alt="" />
            </div>
          </div>
        </div>
      </section>
  )
}
