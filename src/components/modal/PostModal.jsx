import { Link } from 'react-router-dom'
import './postmodal.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import psApi from '../../api/psApi'
import { GlobalContext } from '../../config/GlobalState'
import setTime from '../../config/setTime'
import { compressAccurately } from 'image-conversion'

export default function PostModal({ post }) {
  const [isLike, setIsLike] = useState(post.isLike)
  const [comment, setComment] = useState('')
  const [postModal, setPostModal] = useState([])
  const { loggedUser } = useContext(GlobalContext)
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(post.imageUrl)
  const createPostCaptionRef = useRef()
  const updatePostCaptionRef = useRef(post.caption)

  async function handleImages(e) {
    const compressedImageBlob = await compressAccurately(e.target.files[0], 900)
    const compressedImage = new File([compressedImageBlob], 'photologue-compressed-image', { type: 'image/jpeg' })
    setImages(compressedImage)
    setImagesPreview(URL.createObjectURL(compressedImage))
  }

  async function updatePost(e) {
    e.preventDefault()

    let imageUrl = { url: post.imageUrl }

    console.log(images)
    if (images) {
      const formData = new FormData()
      formData.append('image', images)

      imageUrl = await psApi.uploadImage(formData, token)
    }

    const data = {
      imageUrl: imageUrl.url,
      caption: updatePostCaptionRef.current.value,
    }

    const updatePost = await psApi.updatePost(post.id, data, token)
    alert(updatePost.message)
    window.location.reload()
  }

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    console.log(like.message)
    postModal.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    console.log(unlike.message)
    postModal.totalLikes--
    setIsLike(false)
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
    window.location.reload()
  }

  async function deletePost(e) {
    try {
      e.preventDefault()
      let text = 'Are you sure to delete this post?'
      if (confirm(text) === true) {
        const postId = postModal.id
        const deletePost = await psApi.deletePost(postId, token)
        window.location.reload()
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  async function createComment(e) {
    e.preventDefault()

    const data = {
      postId: post.id,
      comment: comment,
    }

    const createComment = await psApi.createComment(data, token)

    setComment('')
    getPostById(post.id)
    alert(createComment.message)
  }

  async function deleteComment(e, id) {
    e.preventDefault()

    let text = 'Are you sure to delete this comment?'
    if (confirm(text) === true) {
      const deleteComment = await psApi.deleteComment(id, token)
      console.log(deleteComment)
      getPostById(post.id)
    }
  }

  async function getPostById(id) {
    const postId = id
    const getPostId = await psApi.getPostById(postId, token)
    getPostId.data.totalLikes = post.totalLikes
    getPostId.data.isLike = post.isLike
    setPostModal(getPostId.data)
  }

  async function doubleClickToLike(e, id) {
    const heartIcon = document.querySelector(`.heart-icon-${id}`)
    setTimeout(() => {
      heartIcon.style.scale = '1.5'
    }, 0)
    setTimeout(() => {
      heartIcon.style.scale = '1'
    }, 200)
    setTimeout(() => {
      heartIcon.style.scale = '0'
    }, 600)
    likePost(e, id)
  }

  useEffect(() => {
    getPostById(post.id)
  }, [])

  return (
    <>
      {/* Post Modal */}
      <div className="modal fade postModal" id={`postModal${postModal.id}`} tabIndex={-1} aria-labelledby="postModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <section id={`post${postModal.id}`} className="post">
                <div className="h-100 border-bottom post__content">
                  <Link to={`/u/${postModal.user?.id}`} className="text-decoration-none">
                    <div className="post__content-header d-inline" data-bs-dismiss="modal" aria-label="Close">
                      <img src={postModal.user?.profilePictureUrl} alt="" />
                      <span className="fw-bold ps-2">{postModal.user?.username}</span>
                    </div>
                  </Link>
                  <div className="post__content-image">
                    <img src={postModal.imageUrl} alt="" className="pt-3" onDoubleClick={(e) => doubleClickToLike(e, postModal.id)} />
                    <i className={`bx bxs-heart heart-icon-${post.id}`}></i>
                  </div>
                  <div className="post__content-icons">
                    <div className="post__content-icons-left">
                      {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i>}
                      <i className="bx bx-message-rounded" onClick={() => document.getElementById('comment-input').focus()}></i>
                      <i className="bx bx-share-alt"></i>
                    </div>
                    <div className="post__content-icons-right">
                      {postModal.user?.id === loggedUser.id ? (
                        <>
                          <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${postModal.id}`}></i>
                          <i className="bx bx-trash" onClick={deletePost}></i>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="post__content-likes">
                    <p className="fw-bold m-0 pb-2">
                      <span>
                        {postModal.totalLikes === 0 ? (
                          <>
                            <span className="fw-normal">Be first to </span>like this
                          </>
                        ) : (
                          <>
                            {postModal.totalLikes} {postModal.totalLikes === 1 ? 'like' : 'likes'}
                          </>
                        )}
                      </span>
                      <span className="fw-light"> - {setTime(postModal.updatedAt)}</span>
                    </p>
                  </div>
                  <div className="post__content-caption">
                    <Link to={`/u/${postModal.user?.id}`} className="fw-bold text-decoration-none text-black">
                      <img src={postModal.user?.profilePictureUrl} alt="" data-bs-dismiss="modal" aria-label="Close" />
                      <span data-bs-dismiss="modal" aria-label="Close">
                        {' '}
                        {postModal.user?.username}
                      </span>
                    </Link>
                    <span> {postModal.caption}</span>
                  </div>
                  <div className="post__content-comment">
                    {postModal.comments &&
                      postModal.comments.map((comment, i) => {
                        return (
                          <div key={i} className="d-flex justify-content-between">
                            <span>
                              <Link to={`/u/${comment.user?.id}`} className="fw-bold text-decoration-none text-black">
                                <img src={comment.user?.profilePictureUrl} alt="" data-bs-dismiss="modal" aria-label="Close" />
                                <span data-bs-dismiss="modal" aria-label="Close">
                                  {' '}
                                  {comment.user.username}
                                </span>
                              </Link>{' '}
                              {comment.comment}
                            </span>
                            <span>{comment.user.id === loggedUser.id ? <i className="bx bxs-trash-alt" onClick={(e) => deleteComment(e, comment.id)}></i> : null}</span>
                          </div>
                        )
                      })}
                    <form>
                      <input id="comment-input" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                      {comment && <button onClick={createComment}>Post</button>}
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="modal fade createPost" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="createPostModalLabel">
                Create Post
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-upload">
                  <label htmlFor="chooseImage" className="form-label">
                    <i className="bx bxs-cloud-upload"></i> Choose Image
                  </label>
                  <input id="chooseImage" type="file" accept="image/*" onChange={handleImages} className="form-control" required />
                </div>
                <div className="input-box">
                  <span className="input-box__icon">
                    <i className="bx bxs-edit"></i>
                  </span>
                  <input ref={createPostCaptionRef} type="text" autoComplete="new-password" required />
                  <label>Caption</label>
                </div>
              </form>
              <div className="mb-3 image-preview d-flex justify-content-center">
                {images && (
                  <>
                    <img src={imagesPreview} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={createPost}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Post */}
      <div className="modal fade updatePost" id={`updatePostModal${postModal.id}`} tabIndex={-1} aria-labelledby="updatePostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="updatePostModalLabel">
                Update Post
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-upload">
                  <label htmlFor="chooseImage" className="form-label">
                    <i className="bx bxs-cloud-upload"></i> Choose Image
                  </label>
                  <input id="chooseImage" type="file" accept="image/*" onChange={handleImages} className="form-control" required />
                </div>
                <div className="input-box">
                  <span className="input-box__icon">
                    <i className="bx bxs-edit"></i>
                  </span>
                  <input ref={updatePostCaptionRef} defaultValue={postModal.caption} type="text" autoComplete="new-password" required />
                  <label>Caption</label>
                </div>
              </form>
              <div className="mb-3 image-preview">
                <img src={imagesPreview} alt="" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={updatePost}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
