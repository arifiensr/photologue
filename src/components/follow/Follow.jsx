import { useContext, useState } from 'react'
import { GlobalContext } from '../../config/GlobalState'
import { Link } from 'react-router-dom'
import psApi from '../../api/psApi'
import './follow.scss'

export default function Follow({ user }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const { loggedUser } = useContext(GlobalContext)
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(user.id))

  async function getLoggedUser() {
    // * API Get Logged User
    const loggedUser = await psApi.getLoggedUser(token)

    // * API Get Followers and Following by User ID
    const followingByUserId = await psApi.getFollowingByUserId(loggedUser.data.id, token, { params: { size: 10, page: 1 } })
    const followersByUserId = await psApi.getFollowersByUserId(loggedUser.data.id, token, { params: { size: 10, page: 1 } })

    loggedUser.data.following = followingByUserId.data.users
    loggedUser.data.followers = followersByUserId.data.users
    loggedUser.data.followingId = followingByUserId.data.users.map((user) => user.id)

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser.data))
  }

  async function followUser(e) {
    e.preventDefault()

    const data = {
      userIdFollow: user.id,
    }
    const responseFollow = await psApi.followUser(data, token)
    console.log(responseFollow)

    getLoggedUser()
    setIsFollow(true)
  }

  async function unfollowUser(e) {
    e.preventDefault()

    const responseUnfollow = await psApi.unfollowUser(user.id, token)
    console.log(responseUnfollow)

    getLoggedUser()
    setIsFollow(false)
  }
  return (
    <section id="follows" className="follows">
      <div className="follow">
        <Link to={`/u/${user.id}`} className="text-decoration-none">
          <div>
            <img src={user.profilePictureUrl} alt="" />
            <span>{user.username}</span>
          </div>
        </Link>
        {/* <button className="btn btn-primary">Follow</button> */}
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
