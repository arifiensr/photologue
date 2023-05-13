import { Link } from 'react-router-dom'
import './post.scss'
import { useEffect, useRef, useState } from 'react'
import psApi from '../../api/psApi'

export default function Post({ post }) {
  const [isLike, setIsLike] = useState(post.isLike)
  const [comment, setComment] = useState('')
  const [postModal, setPostModal] = useState([])
  const [refresh, setRefresh] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    postModal.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    postModal.totalLikes--
    setIsLike(false)
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
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     console.log(entry)
    //     if (entry.isIntersecting) {
    //       entry.target.classList.add('show')
    //     } else {
    //       entry.target.classList.remove('show')
    //     }
    //   })
    // })
    // const hiddenElements = document.querySelectorAll('.timeline__post')
    // hiddenElements.forEach((el) => observer.observe(el))

    async function getPostById(id) {
      const postId = id
      const getPostId = await psApi.getPostById(postId, token)
      getPostId.data.totalLikes = post.totalLikes
      getPostId.data.isLike = post.isLike
      setPostModal(getPostId.data)
    }
    getPostById(post.id)
  }, [refresh])

  return (
    <>
      <div className="modal fade postModal" id={`postModal${postModal.id}`} tabIndex={-1} aria-labelledby="postModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <section id={`post${postModal.id}`} className="post">
                <div className="h-100 border-bottom post__content">
                  <Link to={`/u/${postModal.user?.id}`} className="text-decoration-none">
                    <div className="post__content-header d-inline">
                      <img src={postModal.user?.profilePictureUrl} alt="" />
                      <span className="fw-bold ps-2">{postModal.user?.username}</span>
                    </div>
                  </Link>
                  <div className="post__content-image">
                    <img src={postModal.imageUrl} alt="" className="pt-3"/>
                  </div>
                  <div className="post__content-icons">
                    {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, postModal.id)} style={{ cursor: 'pointer' }}></i>}
                    <i className="bx bx-message-rounded"></i>
                    <i className="bx bx-share-alt"></i>
                  </div>
                  <div className="post__content-likes">
                    <p className="fw-bold m-0 pb-2">
                      {postModal.totalLikes === 0 ? (
                        <>
                          <span className="fw-normal">Be first to </span>like this
                        </>
                      ) : (
                        <>
                          {postModal.totalLikes} {postModal.totalLikes === 1 ? 'like' : 'likes'}
                        </>
                      )}{' '}
                    </p>
                  </div>
                  <div className="post__content-caption">
                    <span className="fw-bold">{postModal.user?.username}</span> {postModal.caption}
                  </div>
                  <div className="post__content-comment">
                    {postModal.comments && postModal.comments.map((comment, i) => {
                      return (
                        <p key={i}><span className='fw-bold'>{comment.user.username}</span> {comment.comment}</p>
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
      </div>
    </>
  )
}
