import { Link } from 'react-router-dom'
import './timelinepost.scss'
import { useContext, useEffect, useState } from 'react'
import psApi from '../../api/psApi'
import Post from './Post'
import { GlobalContext } from '../../config/GlobalState'
import setTime from '../../config/setTime'

export default function TimelinePost({ post }) {
  const [isLike, setIsLike] = useState(post.isLike)
  const [comment, setComment] = useState('')
  const { loggedUser, token } = useContext(GlobalContext)

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    console.log(like.message)
    post.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    console.log(unlike.message)
    post.totalLikes--
    setIsLike(false)
  }

  async function deletePost(e) {
    try {
      e.preventDefault()
      let text = 'Are you sure to delete this post?'
      if (confirm(text) === true) {
        const postId = post.id
        const deletePost = await psApi.deletePost(postId, token)
        alert(deletePost.message)
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
    alert(createComment.message)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timelinePost__show')
        } else {
          entry.target.classList.remove('timelinePost__show')
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.timelinePost__hidden')
    hiddenElements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <section id="timelinePost" className="timelinePost">
      <div className="h-100 border-bottom py-3 timelinePost__content timelinePost__hidden">
        <Link to={`/u/${post.user?.id}`} className="text-decoration-none">
          <div className="timelinePost__content-header d-inline">
            <img src={post.user?.profilePictureUrl} alt="" />
            <span className="fw-bold ps-2">{post.user?.username}</span>
          </div>
        </Link>
        <div className="timelinePost__content-image">
          <img src={post.imageUrl} alt="" className="pt-3" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`} />
        </div>
        <div className="timelinePost__content-icons">
          <div className="timelinePost__content-icons-left">
            {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
            <i className="bx bx-message-rounded" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`}></i>
            <i className="bx bx-share-alt"></i>
          </div>
          <div className="timelinePost__content-icons-right">
            {post.user?.id === loggedUser.id ? (
              <>
                <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${post.id}`}></i>
                <i className="bx bx-trash" onClick={deletePost}></i>
              </>
            ) : null}
          </div>
        </div>
        <div className="timelinePost__content-likes">
          <p className="fw-bold m-0 pb-2">
            <span>
              {post.totalLikes === 0 ? (
                <>
                  <span className="fw-normal">Be first to </span>like this
                </>
              ) : (
                <>
                  {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                </>
              )}
            </span>
            <span className="fw-light"> - {setTime(post.updatedAt)}</span>
          </p>
        </div>
        <div className="timelinePost__content-caption">
          <span className="fw-bold">{post.user?.username}</span> {post.caption}
        </div>
        <div className="timelinePost__content-comment">
          <form>
            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            {comment && <button onClick={createComment}>Post</button>}
          </form>
        </div>
      </div>
      <Post post={post} />

      {/* Post Modal */}
      {/* <div className="modal fade postModal" id={`postModal${post.id}`} tabIndex={-1} aria-labelledby="postModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <section id={`post${post.id}`} className="post">
                <div className="h-100 border-bottom post__content">
                  <Link to={`/u/${post.user?.id}`} className="text-decoration-none">
                    <div className="post__content-header d-inline">
                      <img src={post.user?.profilePictureUrl} alt="" />
                      <span className="fw-bold ps-2">{post.user?.username}</span>
                    </div>
                  </Link>
                  <div className="post__content-image">
                    <img src={post.imageUrl} alt="" className="pt-3" />
                  </div>
                  <div className="post__content-icons">
                    <div className="post__content-icons-left">
                      {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
                      <i className="bx bx-message-rounded"></i>
                      <i className="bx bx-share-alt"></i>
                    </div>
                    <div className="post__content-icons-right">
                      {post.user?.id === loggedUser.id ? (
                        <>
                          <i className="bx bx-edit-alt" data-bs-toggle="modal" data-bs-target={`#updatePostModal${post.id}`}></i>
                          <i className="bx bx-trash" onClick={deletePost}></i>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="post__content-likes">
                    <p className="fw-bold m-0 pb-2">
                      {post.totalLikes === 0 ? (
                        <>
                          <span className="fw-normal">Be first to </span>like this
                        </>
                      ) : (
                        <>
                          {post.totalLikes} {post.totalLikes === 1 ? 'like' : 'likes'}
                        </>
                      )}{' '}
                    </p>
                  </div>
                  <div className="post__content-caption">
                    <span className="fw-bold">{post.user?.username}</span> {post.caption}
                  </div>
                  <div className="post__content-comment">
                    {post.comments &&
                      post.comments.map((comment, i) => {
                        return (
                          <p key={i} className="d-flex justify-content-between">
                            <span className="fw-bold">{comment.user.username}</span> {comment.comment}
                            <span>{comment.user.id === loggedUser.id ? <i className="bx bxs-trash-alt" onClick={deleteComment}></i> : null}</span>
                          </p>
                        )
                      })}
                    <form>
                      <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                      {comment && <button onClick={createComment}>Post</button>}
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}
