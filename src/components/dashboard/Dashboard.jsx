import { useContext, useEffect, useState } from 'react'
import './dashboard.scss'
import psApi from '../../api/psApi'
import Sidebar from '../sidebar/Sidebar'
import TimelinePost from '../post/TimelinePost'
import { GlobalContext } from '../../config/GlobalState'

export default function Dashboard() {
  const [explorePost, setExplorerPost] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const [loadMore, setLoadMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useContext(GlobalContext)
  let size = 10

  // ! Blocked User
  const blockedUser = ['a54c59e7-a1b6-4ac4-ae7b-9885a98ed869', '5b7a6783-2071-4e9f-9b8e-8e7fc4a981d4']

  async function getExplorePost(size) {
    const explorePost = await psApi.getExplorePost(token, { params: { size: size, page: 1 } })
    const filteredExplorePost = explorePost.data.posts.filter((post) => !blockedUser.includes(post.userId))
    setExplorerPost(filteredExplorePost)
    console.log(explorePost)
    setIsLoading(false)
    return explorePost.data.totalItems
  }

  async function getFollowingPost(size) {
    const followingPost = await psApi.getFollowingPost(token, { params: { size: size, page: 1 } })
    setFollowingPost(followingPost.data.posts)
    setIsLoading(false)
    return followingPost.data.totalItems
  }

  async function loadMoreData() {
    size += 5
    if (size <= maxFollowingPost) {
      getFollowingPost(size)
      setLoadMore(true)
    } else setLoadMore(false)
  }

  useEffect(() => {
    getExplorePost(10)
    var maxFollowingPost = getFollowingPost(10)
  }, [])

  return (
    <section id="dashboard" className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-12 p-0 col-xl-8">
            <div className="p-0 dashboard__main">
              <nav className="dashboard__main-nav sticky-top">
                <div className="nav nav-tabs justify-content-evenly" id="nav-tab" role="tablist">
                  <button className="nav-link active w-50 fw-bold" id="nav-explore-tab" data-bs-toggle="tab" data-bs-target="#nav-explore" type="button" role="tab" aria-controls="nav-explore" aria-selected="true">
                    Explore
                  </button>
                  <button className="nav-link w-50 fw-bold" id="nav-following-tab" data-bs-toggle="tab" data-bs-target="#nav-following" type="button" role="tab" aria-controls="nav-following" aria-selected="false">
                    Following
                  </button>
                </div>
              </nav>
              {isLoading ? (
                <>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary m-5" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="tab-content dashboard__main-post" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-explore" role="tabpanel" aria-labelledby="nav-explore-tab" tabIndex={0}>
                      {explorePost &&
                        explorePost.map((post, i) => {
                          return <TimelinePost key={i} post={post} />
                        })}
                    </div>
                    <div className="tab-pane fade" id="nav-following" role="tabpanel" aria-labelledby="nav-following-tab" tabIndex={0}>
                      {followingPost &&
                        followingPost.map((post, i) => {
                          return <TimelinePost key={i} post={post} />
                        })}
                    </div>
                  </div>
                  {loadMore ? (
                    <div className="dashboard__main-loadmore d-flex justify-content-center align-items-center">
                      <span>Load more...</span>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
          <div className="col-4 p-0 d-flex justify-content-start d-none d-xl-flex">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  )
}
