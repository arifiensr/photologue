import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import './post.scss'
import { useState } from 'react'
import psApi from '../../api/psApi'

export default function Post({ item }) {
  
  const [isLike, setIsLike] = useState(item.isLike)
  const token = JSON.parse(localStorage.getItem('token'))

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    item.totalLikes++
    setIsLike(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    item.totalLikes--
    setIsLike(false)
  }

  return (
    <>
      <div className="col-12 h-100 border-bottom pt-2 timeline__post">
        <Link to={`/u/${item.user?.id}`}>
          <div className="timeline__post-header d-inline">
            <img src={item.user?.profilePictureUrl} alt="" />
            <span className="fw-bold text-decoration-none">{item.user?.username}</span>
          </div>
        </Link>
        <img src={item.imageUrl} alt="" className="w-100 h-100 object-fit-contain mt-3" data-bs-toggle="modal" data-bs-target={`#postModal${item.id}`} />
        {isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, item.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, item.id)} style={{ cursor: 'pointer' }}></i>}
        <p className="fw-bold">
          {item.totalLikes === 0 ? (
            <>
              <span className="fw-normal">Be first to </span>like this
            </>
          ) : (
            <>{item.totalLikes} {item.totalLikes === 1 ? 'like' : 'likes'}</>
          )}{' '}
          
        </p>
        <p>
          <span className="fw-bold">{item.user?.username}</span> {item.caption}
        </p>
        {item.comments &&
          item.comments.map((comment, i) => {
            return (
              <>
                <p>
                  <span className="fw-bold">{comment.user.username}</span> {comment.comment}
                </p>
              </>
            )
          })}
        <p>ID Post: {item.id}</p>
      </div>
      <Modal item={item} />
    </>
  )
}
