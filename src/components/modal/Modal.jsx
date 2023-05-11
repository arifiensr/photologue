import { useEffect, useRef, useState } from 'react'
import './modal.scss'
import psApi from '../../api/psApi'
import { Link } from 'react-router-dom'

export default function Modal({ user, post }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState()
  const [posting, setPosting] = useState([])
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

  useEffect(() => {
    async function getPostById() {
      // console.log(post);
      const posting = await psApi.getPostById(post.id, token)
      posting.data.isLike = post.isLike
      posting.data.totalLikes = post.totalLikes
      setPosting(posting.data)
    }
    getPostById()
  }, [post])

  useEffect(() => {
    if (!images) {
      setImagesPreview(undefined)
      return
    }

    const preview = URL.createObjectURL(images)
    setImagesPreview(preview)
    return () => URL.revokeObjectURL(objectUrl)
  }, [images])

  return (
    <>
      {/* Post Modal */}
      <div className="modal fade" id={`postModal${post?.id}`} tabIndex={-1} aria-labelledby="postModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <img src={posting.imageUrl} alt="" />
              <p>{posting.caption}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#updatePostModal">
                Edit Post
              </button>
              <button type="button" className="btn btn-dark" onClick={deletePost}>
                Delete Post
              </button>
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
      </div>

      {/* Create Post Modal */}
      <div className="modal fade" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <form>
              {/* <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input ref={createPostImageUrlRef} type="text" className="form-control" required />
              </div> */}
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
              <div className="mb-3">{images && <><img src={imagesPreview} alt="" /></>}</div>
              <button type="submit" className="btn btn-dark" onClick={createPost}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Update Post Modal */}
      <div className="modal fade" id={`updatePostModal`} tabIndex={-1} aria-labelledby="updatePostModalLabel" aria-hidden="true">
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
                (user.followers.length !== 0 ? (
                  user.followers.map((follower, i) => {
                    return (
                      <div key={i} className="col-12 follow">
                        <Link to={`/u/${follower.id}`}>
                          <div>
                            <img src={follower.profilePictureUrl} alt="" />
                            <span>{follower.username}</span>
                          </div>
                        </Link>
                        <button className="btn btn-dark">Follow</button>
                      </div>
                    )
                  })
                ) : (
                  <>No Follower</>
                ))}
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
                (user?.following.length !== 0 ? (
                  user.following.map((following, i) => {
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
