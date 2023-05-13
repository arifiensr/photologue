import { useContext, useEffect, useRef, useState } from 'react'
import './modal.scss'
import psApi from '../../api/psApi'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../config/GlobalState'
import Follow from '../follow/Follow'

export default function Modal({ user, post }) {
  const token = JSON.parse(localStorage.getItem('token'))

  const { loggedUser } = useContext(GlobalContext)
  const [isFollow, setIsFollow] = useState(loggedUser.followingId.includes(user.id))
  const [posting, setPosting] = useState([])

  async function updatePost(e) {
    e.preventDefault()

    const data = {
      imageUrl: updatePostImageUrlRef.current.value,
      caption: updatePostCaptionRef.current.value,
    }

    const editPost = await psApi.updatePost(postId, data, token)
    console.log(editPost)
  }

  async function deletePost(e) {
    e.preventDefault()

    const deletePost = await psApi.deletePost(post.id, token)
    console.log(deletePost)
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
    <>
      {/* Update Post Modal */}
      {/* <div className="modal fade" id={`updatePostModal`} tabIndex={-1} aria-labelledby="updatePostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <form>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input ref={createPostImageUrlRef} type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="chooseImage" className="form-label">
                  Choose Image
                </label>
                <input type="file" accept="image/*" onChange={handleImages} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="caption" className="form-label">
                  Caption
                </label>
                <input ref={createPostCaptionRef} defaultValue={post?.caption} type="text" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-dark" onClick={updatePost}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Followers Modal */}
      <div className="modal fade followModal" id={`followersModal`} tabIndex={-1} aria-labelledby="followersModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content bg-secondary">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Followers</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.followers &&
                (user.followers.length !== 0 ? (
                  user.followers.map((follower, i) => {
                    return <Follow key={i} user={follower} />
                  })
                ) : (
                  <>No Follower</>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Following Modal */}
      <div className="modal fade followModal" id={`followingModal`} tabIndex={-1} aria-labelledby="followingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content bg-secondary">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Following</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.following &&
                (user?.following.length !== 0 ? (
                  user.following.map((following, i) => {
                    return <Follow key={i} user={following} />
                  })
                ) : (
                  <>No Following</>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
