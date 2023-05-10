import { useEffect, useRef, useState } from 'react'
import './modal.scss'
import psApi from '../../api/psApi'
import { Link } from 'react-router-dom'

export default function Modal({ user }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState(null)
  const createPostImageUrlRef = useRef()
  const createPostCaptionRef = useRef()

  function handleImages(e) {
    setImages(e.target.files[0])
  }

  async function createPost(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', images)

    const imageUrl = await psApi.uploadImage(formData, token)

    const data = {
      imageUrl: imageUrl.url,
      caption: createPostCaptionRef.current.value,
    }

    const newPost = await psApi.createPost(data, token)
    alert(newPost.message)
  }

  useEffect(() => {}, [])

  return (
    <>
      {console.log(user)}
      {/* Post Modal */}
      {/* <div className="modal fade" id={`postModal${item.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down">
          <div className="modal-content bg-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-auto modal-content-img">Left</div>
                <div className="col-3 modal-content-caption">Right</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Create Post Modal */}
      <div className="modal fade" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content bg-primary">
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
                <input ref={createPostCaptionRef} type="text" className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary" onClick={createPost}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Followers Modal */}
      <div className="modal fade" id={`followersModal`} tabIndex={-1} aria-labelledby="followersModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Followers</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.followers &&
                user?.followers.map((follower, i) => {
                  return (
                    <div key={i} className="col-12 follow">
                      <div>
                        <img src={follower.profilePictureUrl} alt="" />
                        <span>{follower.username}</span>
                      </div>
                      <button className="btn btn-dark">Follow</button>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Following Modal */}
      <div className="modal fade" id={`followingModal`} tabIndex={-1} aria-labelledby="followingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Following</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user?.following &&
                user?.following.map((following, i) => {
                  return (
                    <div key={i} className="col-12 follow">
                      <Link to={`/u/${following.id}`}>
                        <div>
                          <img src={following.profilePictureUrl} alt="" />
                          <span>{following.username}</span>
                        </div>
                      </Link>
                      <button className="btn btn-dark">Follow</button>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
