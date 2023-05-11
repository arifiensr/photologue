import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import './post.scss'
import { useEffect, useState } from 'react'
import psApi from '../../api/psApi'

export default function Post({ post }) {
  const [isLike, setIsLike] = useState(post.isLike)
  const token = JSON.parse(localStorage.getItem('token'))

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    post.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    post.totalLikes--
    setIsLike(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    })

    const hiddenElements = document.querySelectorAll('.timeline__post')
    hiddenElements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <>
      <div className="col-12 h-100 border-bottom pt-2 timeline__post">
        <Link to={`/u/${post.user?.id}`}>
          <div className="timeline__post-header d-inline">
            <img src={post.user?.profilePictureUrl} alt="" />
            <span className="fw-bold text-decoration-none">{post.user?.username}</span>
          </div>
        </Link>
        <img src={post.imageUrl} alt="" className="w-100 h-100 object-fit-contain mt-3" data-bs-toggle="modal" data-bs-target={`#postModal${post.id}`} />
        {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, post.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, post.id)} style={{ cursor: 'pointer' }}></i>}
        <p className="fw-bold">
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
        <p>
          <span className="fw-bold">{post.user?.username}</span> {post.caption}
        </p>
        {post.comments &&
          post.comments.map((comment, i) => {
            return (
              <>
                <p>
                  <span className="fw-bold">{comment.user.username}</span> {comment.comment}
                </p>
              </>
            )
          })}
        <p>ID Post: {post.id}</p>
      </div>
      <Modal post={post} />
    </>
  )
}
