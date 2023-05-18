import { useContext, useState } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import { Link } from 'react-router-dom'
import psApi from '../../api/psApi'
import './follow.scss'
import getLoggedUser from '../../config/getLoggedUser'

export default function Follow({ user }) {
  const { loggedUser, token } = useContext(GlobalContext)
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(user.id))

  async function followUser(e) {
    e.preventDefault()
    const data = {
      userIdFollow: user.id,
    }
    const responseFollow = await psApi.followUser(data, token)
    console.log(responseFollow)

    getLoggedUser(token)
    setIsFollow(true)
  }

  async function unfollowUser(e) {
    e.preventDefault()

    const responseUnfollow = await psApi.unfollowUser(user.id, token)
    console.log(responseUnfollow)

    getLoggedUser(token)
    setIsFollow(false)
  }

  function dismissModal() {
    const truck_modal = document.querySelector('#staticBackdrop')
    const modal = new bootstrap.Modal(truck_modal, {
      backdrop: 'static',
    })

    modal.hide()
  }

  return (
    <section id="follows" className="follows">
      <div className="follow">
        <Link to={`/u/${user.id}`} className="text-decoration-none" onClick={dismissModal}>
          <div>
            <img src={user.profilePictureUrl} alt="" />
            <span>{user.username}</span>
          </div>
        </Link>
        {user.id !== loggedUser.id ? (
          !isFollow ? (
            <>
              <button className="ms-4" onClick={followUser}>
                Follow
              </button>
            </>
          ) : (
            <>
              <button className="ms-4" onClick={unfollowUser}>
                Unfollow
              </button>
            </>
          )
        ) : (
          <Link to={`/u/${loggedUser.id}`}>
            <button className="ms-4">My Profile</button>
          </Link>
        )}
      </div>
    </section>
  )
}
