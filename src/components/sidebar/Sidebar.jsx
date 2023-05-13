import { useContext, useEffect } from 'react'
import './sidebar.scss'
import { GlobalContext } from '../../config/GlobalState'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { loggedUser, setIsLogin } = useContext(GlobalContext)

  useEffect(() => {
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
  }, [])

  return (
    <section id="sidebar" className="sidebar position-fixed m-0">
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar__wrap d-flex flex-column justify-content-between col-auto min-vh-100">
            <div className="sidebar__wrap_content mt-4">
              <div className="sidebar__wrap_content-title d-flex justify-content-center align-items-center">
                <a className="text-primary d-none d-sm-inline text-decoration-none d-flex justify-content-center align-items-center" role="button">
                  <span className="fs-4 fw-bold">Suggestion</span>
                </a>
              </div>
              <hr className="text-primary d-none d-sm-block" />
              <ul className="sidebar__wrap_content-list nav nav-pills flex-column mt-2 mt-sm-0" id="menu">
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <img src={loggedUser.profilePictureUrl} alt="" />
                    <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
                <li className="nav-item my-sm-2 my-3 mx-3 fs-6">
                  <Link to={`/u/${loggedUser.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                    <div>
                      <img src={loggedUser.profilePictureUrl} alt="" />
                      <span className="ms-2 d-none d-sm-inline">{loggedUser.username}</span>
                    </div>
                    <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Follow</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
