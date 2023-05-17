import { useParams } from 'react-router-dom'
import './profile.scss'
import { useContext, useEffect, useState } from 'react'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'
import Modal from '../modal/Modal'
import Post from '../post/Post'

export default function Profile() {
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const { loggedUser, setLoggedUser } = useContext(GlobalContext)

  const [userById, setUserById] = useState([])
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(id))

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
    setLoggedUser(loggedUser.data)
  }

  async function followUser(e) {
    e.preventDefault()

    const data = {
      userIdFollow: id,
    }
    const responseFollow = await psApi.followUser(data, token)
    console.log(responseFollow)

    getLoggedUser()
    setIsFollow(true)
  }

  async function unfollowUser(e) {
    e.preventDefault()

    const responseUnfollow = await psApi.unfollowUser(id, token)
    console.log(responseUnfollow)

    getLoggedUser()
    setIsFollow(false)
  }

  useEffect(() => {
    async function getUserById(id) {
      const userById = await psApi.getUserById(id, token)
      const followingByUserId = await psApi.getFollowingByUserId(id, token, { params: { size: 10, page: 1 } })
      const followersByUserId = await psApi.getFollowersByUserId(id, token, { params: { size: 10, page: 1 } })

      userById.data.following = followingByUserId.data.users
      userById.data.followers = followersByUserId.data.users

      const userPosts = await psApi.getPostByUserId(id, token, { params: { size: 20, page: 1 } })
      userById.data.totalPosts = userPosts.data.totalItems
      userById.data.posts = userPosts.data.posts

      setUserById(userById.data)
    }
    getUserById(id)
  }, [id])

  return (
    <section id="profile" className="profile min-vh-100">
      {/* Profile Header */}
      <div className="profile__header">
        <div className="container">
          <div className="row">
            <div className="col-4 profile__header-image">
              <img src={userById.profilePictureUrl} alt="" />
            </div>
            <div className="col-8 profile__header-caption">
              <div className="profile__header-caption-1">
                <span>{userById.username}</span>
                {userById.id !== loggedUser.id ? (
                  !isFollow ? (
                    <>
                      <button className="ms-4" onClick={followUser}>
                        Follow
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="ms-4 p-1 p-sm-2" onClick={unfollowUser}>
                        Unfollow
                      </button>
                    </>
                  )
                ) : null}
              </div>
              <div className="profile__header-caption-2 d-flex gap-3 mt-3 gap-sm-5">
                <span className="text-center">
                  <span className="fw-bold">{userById.totalPosts}</span> posts
                </span>
                <span className="text-center cursor" data-bs-toggle="modal" data-bs-target="#followersModal">
                  <span className="fw-bold">{userById.totalFollowers}</span> followers
                </span>
                <span className="text-center cursor" data-bs-toggle="modal" data-bs-target="#followingModal">
                  <span className="fw-bold">{userById.totalFollowing}</span> following
                </span>
              </div>
              <div className="profile__header-caption-3 mt-3 d-none d-sm-block">
                {userById.name && <p className="fw-bold">{userById.name}</p>}
                {userById.bio && <p>{userById.bio}</p>}
                {userById.website && (
                  <a href={userById.website} target="_blank">
                    {userById.website}
                  </a>
                )}
              </div>
            </div>
            <div className="col-12 profile__header-mobile d-block d-sm-none mt-2">
              {userById.name && <p className="fw-bold m-0">{userById.name}</p>}
              {userById.bio && <p className="m-0">{userById.bio}</p>}
              {userById.website && (
                <a href={userById.website} target="_blank">
                  {userById.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Posts */}
      <div className="profile__posts">
        <div className="container">
          <div className="row row-cols-3">
            {userById.posts &&
              userById.posts.map((post, i) => {
                return (
                  <div key={i} className="col profile__posts-post">
                    <img src={post.imageUrl} alt="" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`} />
                    <Post post={post} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <Modal user={userById} />
    </section>
  )
}