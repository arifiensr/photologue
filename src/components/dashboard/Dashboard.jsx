import { useEffect, useState } from 'react'
import './dashboard.scss'
import psApi from '../../api/psApi'
import Sidebar from '../sidebar/Sidebar'
import TimelinePost from '../post/TimelinePost'

export default function Dashboard() {
  const [explorePost, setExplorerPost] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const token = JSON.parse(localStorage.getItem('token'))

  const database = ['a54c59e7-a1b6-4ac4-ae7b-9885a98ed869']

  useEffect(() => {
    async function getExplorePost() {
      const explorePost = await psApi.getExplorePost(token, { params: { size: 20, page: 1 } })
      const filteredExplorePost = explorePost.data.posts.filter((post) => !database.includes(post.userId))
      // console.log(filteredExplorePost)
      setExplorerPost(filteredExplorePost)
    }
    getExplorePost()

    async function getFollowingPost() {
      const followingPost = await psApi.getFollowingPost(token, { params: { size: 30, page: 1 } })
      setFollowingPost(followingPost.data.posts)
    }
    getFollowingPost()
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
