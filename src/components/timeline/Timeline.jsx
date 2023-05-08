import { useEffect, useState } from 'react'
import './timeline.scss'
import psApi from '../../api/psApi'

export default function Timeline() {
  const [explorePost, setExplorerPost] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    async function getExplorePost() {
      const explorePost = await psApi.getExplorePost(token, { params: { size: 10, page: 1 } })
      setExplorerPost(explorePost.data.posts)
    }
    getExplorePost()

    async function getFollowingPost() {
      const followingPost = await psApi.getFollowingPost(token, { params: { size: 10, page: 1 } })
      setFollowingPost(followingPost.data.posts)
    }
    getFollowingPost()
  }, [])

  return (
    <section id="timeline" className="timeline">
      <div className="container">
        <div className="row">
          <div className="col-12 border border-1 border-black rounded shadow p-0">
            <>
              <nav className="">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-explore-tab" data-bs-toggle="tab" data-bs-target="#nav-explore" type="button" role="tab" aria-controls="nav-explore" aria-selected="true">
                    Explore
                  </button>
                  <button className="nav-link" id="nav-following-tab" data-bs-toggle="tab" data-bs-target="#nav-following" type="button" role="tab" aria-controls="nav-following" aria-selected="false">
                    Following
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-explore" role="tabpanel" aria-labelledby="nav-explore-tab" tabIndex={0}>
                  {explorePost && (
                    <>
                      <div className="container">
                        <div className="row">
                          {explorePost.map((item, i) => {
                            console.log(item)
                            return (
                              <div key={i} className="col-12 h-100 border-bottom pt-2 timeline__post">
                                <div className="timeline__post-header d-inline">
                                  <img src={item.user?.profilePictureUrl} alt=""/>
                                  <span className="fw-bold">{item.user?.username}</span>
                                </div>
                                <img src={item.imageUrl} alt="" className="w-100 h-100 object-fit-contain mt-3" />
                                <p>
                                  {item.totalLikes} Likes {item.isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, item.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, item.id)} style={{ cursor: 'pointer' }}></i>}
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
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="tab-pane fade" id="nav-following" role="tabpanel" aria-labelledby="nav-following-tab" tabIndex={0}>
                  {followingPost && (
                    <>
                      <div className="container">
                        <div className="row">
                          {followingPost.map((item, i) => {
                            console.log(item)
                            return (
                              <div key={i} className="col-12 h-100">
                                <img src={item.imageUrl} alt="" className="w-100 h-100 object-fit-contain" />
                                <p>
                                  {item.totalLikes} Likes {item.isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, item.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, item.id)} style={{ cursor: 'pointer' }}></i>}
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
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </section>
  )
}
