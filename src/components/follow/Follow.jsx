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

  return (
    <section id="follows" className="follows">
      <div className="follow">
        {/* <Link to={`/u/${user.id}`} className="text-decoration-none">
          <div data-bs-dismiss="modal" aria-label="Close">
            <img src={user.profilePictureUrl} alt="" />
            <span>{user.username}</span>
          </div>
        </Link> */}
        <a href={`/u/${user.id}`} className="text-decoration-none">
          <div>
            <img src={user.profilePictureUrl} alt="" />
            <span>{user.username}</span>
          </div>
        </a>
        {user.id !== loggedUser.id ? (
          !isFollow ? (
            <>
              <button className="ms-4 button-solid" onClick={followUser}>
                Follow
              </button>
            </>
          ) : (
            <>
              <button className="ms-4 button-empty" onClick={unfollowUser}>
                Unfollow
              </button>
            </>
          )
        ) : (
          <a href={`/u/${loggedUser.id}`}>
            <button className="ms-4 button-solid">My Profile</button>
          </a>
        )}
      </div>
    </section>
  )
}
