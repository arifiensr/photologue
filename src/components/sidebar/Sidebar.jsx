import { useContext, useEffect, useState } from 'react'
import './sidebar.scss'
import { GlobalContext } from '../../config/GlobalState'
import { Link } from 'react-router-dom'
import psApi from '../../api/psApi'

export default function Sidebar() {
  const { loggedUser, setIsLogin } = useContext(GlobalContext)
  const [following, setFollowing] = useState([])
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    async function getFollowing() {
      const followingByUserId = await psApi.getFollowingByUserId(loggedUser.id, token, { params: { size: 10, page: 1 } })
      setFollowing(followingByUserId.data.users)
    }
    getFollowing()
  }, [])

  return (
    <section id="sidebar" className="sidebar position-fixed m-0">
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar__wrap d-flex flex-column justify-content-between col-auto min-vh-100">
            <div className="sidebar__wrap_content mt-4">
              <div className="sidebar__wrap_content-title d-flex justify-content-center align-items-center">
                <a className="text-primary d-none d-sm-inline text-decoration-none d-flex justify-content-center align-items-center" role="button">
                  <span className="fs-4 fw-bold">Your Following</span>
                </a>
              </div>
              <hr className="text-primary d-none d-sm-block" />
              <ul className="sidebar__wrap_content-list nav nav-pills flex-column mt-2 mt-sm-0" id="menu">
                {following &&
                  following.map((following, i) => {
                    return (
                      <li key={i} className="nav-item my-sm-2 my-3 mx-3 fs-6">
                        <Link to={`/u/${following.id}`} className="nav-link text-primary text-center text-sm-start d-flex justify-content-between align-items-center p-0" aria-current="page">
                          <div>
                            <img src={following.profilePictureUrl} alt="" />
                            <span className="ms-2 d-none d-sm-inline">{following.username}</span>
                          </div>
                          <button className="border-0 fw-bold text-primary ms-4 bg-secondary">Profile</button>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
