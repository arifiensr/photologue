import { useEffect, useRef, useState } from 'react'
import psApi from '../api/psApi'
import { Link } from 'react-router-dom'

export default function ApiTest() {
  const isLogin = JSON.parse(localStorage.getItem('token'))
  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))

  const [login, setLogin] = useState(false)
  const [loggedUser, setLoggedUser] = useState([])
  const [explorePost, setExplorerPost] = useState([])
  const [followingPost, setFollowingPost] = useState([])
  const [userById, setUserById] = useState([])
  const [postById, setPostById] = useState([])
  const [postsByUserId, setPostsByUserId] = useState([])
  const [images, setImages] = useState(null)

  const loginEmailRef = useRef(user ? user.email : null)
  const loginPasswordRef = useRef()

  const loggedNameRef = useRef(user ? user.name : null)
  const loggedUsernameRef = useRef(user ? user.username : null)
  const loggedEmailRef = useRef(user ? user.email : null)
  const loggedProfilePictureUrlRef = useRef(user ? user.profilePictureUrl : null)
  const loggedPhoneNumberRef = useRef(user ? user.phoneNumber : null)
  const loggedBioRef = useRef(user ? user.bio : null)
  const loggedWebsiteRef = useRef(user ? user.website : null)

  const getUserByIdRef = useRef()

  const createPostImageUrlRef = useRef()
  const createPostCaptionRef = useRef()

  const updatePostIdRef = useRef()
  const updatePostImageUrlRef = useRef()
  const updatePostCaptionRef = useRef()

  const deletePostIdRef = useRef()

  const getPostByIdRef = useRef()
  const getPostByUserIdRef = useRef()

  const createCommentPostIdRef = useRef()
  const createCommentRef = useRef()

  async function handleLogin(e) {
    e.preventDefault()

    const [email, password] = [loginEmailRef.current.value, loginPasswordRef.current.value]

    // * API Login User
    const login = await psApi.loginUser(email, password)
    localStorage.setItem('token', JSON.stringify(login.token))

    const token = login.token

    // * API Get Logged User

    const loggedUserData = await psApi.getLoggedUser(token)

    loggedNameRef.current = loggedUserData.data.name
    loggedUsernameRef.current = loggedUserData.data.username
    loggedEmailRef.current = loggedUserData.data.email
    loggedProfilePictureUrlRef.current = loggedUserData.data.profilePictureUrl
    loggedPhoneNumberRef.current = loggedUserData.data.phoneNumber
    loggedBioRef.current = loggedUserData.data.bio
    loggedWebsiteRef.current = loggedUserData.data.website

    localStorage.setItem('user', JSON.stringify(loggedUserData.data))
    // console.log(loggedUserData.data)
    setLoggedUser(loggedUserData.data)

    // * API Get My Following

    const myFollowingData = await psApi.getMyFollowing(token, { params: { size: 10, page: 1 } })
    // console.log(myFollowingData.data.users)

    setLogin(true)

    // window.location.reload()
  }

  async function handleEditData(e) {
    e.preventDefault()

    // const user = JSON.parse(localStorage.getItem('user'))

    // * API Update User Profile

    const data = {
      name: loggedNameRef.current.value,
      username: loggedUsernameRef.current.value,
      email: loggedEmailRef.current.value,
      profilePictureUrl: loggedProfilePictureUrlRef.current.value,
      phoneNumber: loggedPhoneNumberRef.current.value,
      bio: loggedBioRef.current.value,
      website: loggedWebsiteRef.current.value,
    }

    // console.log(nameRef.current.value)
    const updateUserProfile = await psApi.updateUserProfile(data, token)
    // console.log(updateUserProfile)

    // * Update User Data
    const loggedUser = await psApi.getLoggedUser(token)
    localStorage.setItem('user', JSON.stringify(loggedUser.data))
  }

  async function handleLogout(e) {
    e.preventDefault()

    // * API Logout User
    const logout = await psApi.logoutUser(token)
    // console.log(logout)
    localStorage.clear()
    window.location.reload()
  }

  async function getUserById(e) {
    e.preventDefault()

    // * API Get User by ID
    const userId = getUserByIdRef.current.value
    const dataUser = await psApi.getUserById(userId, token)

    // * API Get Following by User ID
    const followingByUserIdData = await psApi.getFollowingByUserId(userId, token, { params: { size: 10, page: 1 } })

    // * API Get Followers by User ID
    const followersByUserIdData = await psApi.getFollowersByUserId(userId, token, { params: { size: 10, page: 1 } })

    const combines = dataUser.data
    combines.following = followingByUserIdData.data.users
    combines.followers = followersByUserIdData.data.users
    // const combines = await [dataUser.data, {followers: followingByUserIdData.data.users}]
    // const results = await Promise.all(combines)
    // dataUser.data = [...dataUser.data, {followers: followingByUserIdData.data.users}]
    // console.log(followingByUserIdData)
    // console.log(combines)
    setUserById(combines)
  }

  async function followUser(e, id) {
    e.preventDefault()

    const data = {
      userIdFollow: id,
    }
    const responseFollow = await psApi.followUser(data, token)
    // console.log(responseFollow)

    // * Update User Data
    const loggedUser = await psApi.getLoggedUser(token)
    localStorage.setItem('user', JSON.stringify(loggedUser.data))
  }

  async function unfollowUser(e, id) {
    e.preventDefault()

    const responseUnfollow = await psApi.unfollowUser(id, token)
    // console.log(responseUnfollow)

    // * Update User Data
    const loggedUser = await psApi.getLoggedUser(token)
    localStorage.setItem('user', JSON.stringify(loggedUser.data))
  }

  function handleImages(e) {
    setImages(e.target.files[0])
  }

  async function createPost(e) {
    e.preventDefault()

    // console.log(images)

    const formData = new FormData()
    formData.append('image', images)

    // console.log(Object.fromEntries(formData))

    const imageUrl = await psApi.uploadImage(formData, token)
    // console.log(imageUrl)

    const data = {
      imageUrl: imageUrl.url,
      caption: createPostCaptionRef.current.value,
    }

    const newPost = await psApi.createPost(data, token)
    console.log(newPost)
  }

  async function updatePost(e) {
    e.preventDefault()

    const postId = updatePostIdRef.current.value
    const data = {
      imageUrl: updatePostImageUrlRef.current.value,
      caption: updatePostCaptionRef.current.value,
    }

    const editPost = await psApi.updatePost(postId, data, token)
    console.log(editPost)
  }

  async function deletePost(e) {
    e.preventDefault()

    const postId = deletePostIdRef.current.value

    const deletePost = await psApi.deletePost(postId, token)
    console.log(deletePost)
  }

  async function getPostById(e, id) {
    e.preventDefault()
    // const postId = getPostByIdRef.current.value
    const postId = id

    const getPostId = await psApi.getPostById(postId, token)
    console.log(getPostId.data)
    setPostById(getPostId.data)
  }

  async function likePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const like = await psApi.likePost(data, token)
    console.log(like)

    setLogin(true)
  }

  async function unlikePost(e, id) {
    e.preventDefault()

    const data = {
      postId: id,
    }

    const unlike = await psApi.unlikePost(data, token)
    console.log(unlike)
  }

  async function getPostByUserId(e) {
    e.preventDefault()

    const userId = getPostByUserIdRef.current.value

    const getPostUserId = await psApi.getPostByUserId(userId, token, { params: { size: 10, page: 1 } })
    // console.log(getPostUserId)
    setPostsByUserId(getPostUserId.data.posts)
  }

  async function createComment(e) {
    e.preventDefault()

    const data = {
      postId: createCommentPostIdRef.current.value,
      comment: createCommentRef.current.value,
    }

    const createComment = await psApi.createComment(data, token)
    console.log(createComment)

    // getPostByIdRef.current = createCommentPostIdRef.current.value
    getPostById(e, data.postId)
  }

  useEffect(() => {
    async function getExplorePost() {
      const explorePost = await psApi.getExplorePost(token, { params: { size: 10, page: 1 } })
      setExplorerPost(explorePost.data.posts)
      // console.log(explorePost.data.posts)
    }
    getExplorePost()

    async function getFollowingPost() {
      const followingPost = await psApi.getFollowingPost(token, { params: { size: 10, page: 1 } })
      setFollowingPost(followingPost.data.posts)
    }
    getFollowingPost()
  }, [])

  return (
    <>
      {!isLogin ? (
        <>
          <div className="container mt-4">
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="mb-3">
                    <label htmlFor="inputEmailLogin" className="form-label">
                      Email address
                    </label>
                    <input ref={loginEmailRef} type="email" className="form-control" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPasswordLogin" className="form-label">
                      Password
                    </label>
                    <input ref={loginPasswordRef} type="password" className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                    Submit
                  </button>
                  <Link to={'signup'}>
                    <button className="btn btn-secondary ms-2">Sign Up</button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <div className="row">
              <div className="col-12">
                {/* Accordion Start */}
                <div className="accordion" id="accordionExample">
                  {/* Accordion Item 1 Logged User */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Logged User
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {user ? (
                          <>
                            <div className="container mt-4">
                              <div className="row">
                                <div className="col-3 h-100">
                                  <img src={user.profilePictureUrl} className="w-100 h-100 object-fit-contain" alt="" />
                                  <p>ID: {user.id}</p>
                                  <p>Name: {user.name}</p>
                                  <p>Username: {user.username}</p>
                                  <p>Email: {user.email}</p>
                                  <p>Phone Number: {user.phoneNumber}</p>
                                  <p>Bio: {user.bio}</p>
                                  <p>Website: {user.website}</p>
                                  <p>Followers: {user.totalFollowers}</p>
                                  <p>Following: {user.totalFollowing}</p>
                                  <p>Profile Picture URL: {user.profilePictureUrl}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 2 Edit User Data */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Edit User Data
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">
                                    Name
                                  </label>
                                  <input ref={loggedNameRef} defaultValue={loggedNameRef.current} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="username" className="form-label">
                                    Username
                                  </label>
                                  <input ref={loggedUsernameRef} defaultValue={loggedUsernameRef.current} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">
                                    Email
                                  </label>
                                  <input ref={loggedEmailRef} defaultValue={loggedEmailRef.current} type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="profilePictureUrl" className="form-label">
                                    Profile Picture URL
                                  </label>
                                  <input ref={loggedProfilePictureUrlRef} defaultValue={loggedProfilePictureUrlRef.current} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="phoneNumber" className="form-label">
                                    Phone Number
                                  </label>
                                  <input ref={loggedPhoneNumberRef} defaultValue={loggedPhoneNumberRef.current} type="number" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="bio" className="form-label">
                                    Bio
                                  </label>
                                  <input ref={loggedBioRef} defaultValue={loggedBioRef.current} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="website" className="form-label">
                                    Website
                                  </label>
                                  <input ref={loggedWebsiteRef} defaultValue={loggedWebsiteRef.current} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleEditData}>
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 3 Get User By ID  */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Get User By ID
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">
                                    User ID
                                  </label>
                                  <input ref={getUserByIdRef} type="text" className="form-control" id="id-input" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={getUserById}>
                                  Submit
                                </button>
                                {userById.length !== 0 ? (
                                  <>
                                    <div className="container mt-4">
                                      <div className="row">
                                        <div className="col-3 h-100">
                                          <img src={userById.profilePictureUrl} className="w-100 h-100 object-fit-contain" alt="" />
                                          <p>ID: {userById.id}</p>
                                          <p>Name: {userById.name}</p>
                                          <p>Username: {userById.username}</p>
                                          <p>Email: {userById.email}</p>
                                          <p>Phone Number: {userById.phoneNumber}</p>
                                          <p>Bio: {userById.bio}</p>
                                          <p>Website: {userById.website}</p>
                                          <p>Followers: {userById.totalFollowers}</p>
                                          <p>Following: {userById.totalFollowing}</p>
                                          <p>Profile Picture URL: {userById.profilePictureUrl}</p>
                                          <button className="btn btn-primary" onClick={(e) => followUser(e, userById.id)}>
                                            Follow
                                          </button>
                                          <button className="btn btn-danger" onClick={(e) => unfollowUser(e, userById.id)}>
                                            Unfollow
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 4 Explore Post */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Explore Post
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {explorePost && (
                          <>
                            <div className="container">
                              <div className="row">
                                <h1>Explore Post</h1>
                                {explorePost.map((item, i) => {
                                  // console.log(item)
                                  return (
                                    <div key={i} className="col-6 h-100">
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
                  </div>

                  {/* Accordion Item 5 Following Post */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        Following Post
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {followingPost && (
                          <>
                            <div className="container">
                              <div className="row">
                                <h1>Following Post</h1>
                                {followingPost.map((item, i) => {
                                  return (
                                    <div key={i} className="col-6 h-100">
                                      <img src={item.imageUrl} alt="" className="w-100 h-100 object-fit-contain" />
                                      <p>
                                        {item.totalLikes} Likes {item.isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, item.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, item.id)} style={{ cursor: 'pointer' }}></i>}
                                      </p>
                                      <p>
                                        <span className="fw-bold">{item.user?.username}</span> {item.caption}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 6 Create Post */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        Create Post
                      </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="imageUrl" className="form-label">
                                    Image URL
                                  </label>
                                  <input ref={createPostImageUrlRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="chooseImage" className="form-label">
                                    Choose Image
                                  </label>
                                  <input type="file" accept="image/*" onChange={handleImages} className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="caption" className="form-label">
                                    Caption
                                  </label>
                                  <input ref={createPostCaptionRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={createPost}>
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 7 Update Post */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        Update Post
                      </button>
                    </h2>
                    <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="postId" className="form-label">
                                    Post ID
                                  </label>
                                  <input ref={updatePostIdRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="imageUrl" className="form-label">
                                    Image URL
                                  </label>
                                  <input ref={updatePostImageUrlRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="caption" className="form-label">
                                    Caption
                                  </label>
                                  <input ref={updatePostCaptionRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={updatePost}>
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 8 Delete Post */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        Delete Post
                      </button>
                    </h2>
                    <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="postId" className="form-label">
                                    Post ID
                                  </label>
                                  <input ref={deletePostIdRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={(e) => deletePost(e)}>
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 9 Get Post By ID */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                        Get Post By ID
                      </button>
                    </h2>
                    <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="postId" className="form-label">
                                    Post ID
                                  </label>
                                  <input ref={getPostByIdRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={(e) => getPostById(e, getPostByIdRef.current.value)}>
                                  Submit
                                </button>
                              </form>
                              {postById.length !== 0 ? (
                                <>
                                  <div className="container mt-4">
                                    <div className="row">
                                      <div className="col-3 h-100">
                                        <img src={postById.imageUrl} className="w-100 h-100 object-fit-contain" alt="" />
                                        <p>Likes</p>
                                        <p>
                                          <span className="fw-bold">{postById.user?.username}</span> {postById.caption}
                                        </p>
                                        {postById.comments &&
                                          postById.comments.map((comment, i) => {
                                            return (
                                              <>
                                                <p>
                                                  <span className="fw-bold">{comment.user?.username}</span> {comment.comment}
                                                </p>
                                              </>
                                            )
                                          })}
                                        <p>ID: {postById.id}</p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 10 Get Post By User ID */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                        Get Post By User ID
                      </button>
                    </h2>
                    <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="postId" className="form-label">
                                    User ID
                                  </label>
                                  <input ref={getPostByUserIdRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={getPostByUserId}>
                                  Submit
                                </button>
                              </form>
                            </div>
                            {postsByUserId.length !== 0 ? (
                              <>
                                {postsByUserId.map((item, i) => {
                                  return (
                                    <div key={i} className="col-6 h-100 mt-3">
                                      <img src={item.imageUrl} alt="" className="w-100 h-100 object-fit-contain" />
                                      <p>
                                        {item.totalLikes} Likes {item.isLike ? <i className="bx bxs-heart" onClick={(e) => unlikePost(e, item.id)} style={{ cursor: 'pointer' }}></i> : <i className="bx bx-heart" onClick={(e) => likePost(e, item.id)} style={{ cursor: 'pointer' }}></i>}
                                      </p>
                                      <p>
                                        <span className="fw-bold">{item.user?.username}</span> {item.caption}
                                      </p>
                                      <p>ID Post: {item.id}</p>
                                      {console.log(item)}
                                    </div>
                                  )
                                })}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 11 Create Comment */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                        Create Comment
                      </button>
                    </h2>
                    <div id="collapseEleven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="postId" className="form-label">
                                    Post ID
                                  </label>
                                  <input ref={createCommentPostIdRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="comment" className="form-label">
                                    Comment
                                  </label>
                                  <input ref={createCommentRef} type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={createComment}>
                                  Submit
                                </button>
                              </form>
                            </div>
                            {postById.length !== 0 ? (
                              <>
                                <div className="container mt-4">
                                  <div className="row">
                                    <div className="col-3 h-100">
                                      <img src={postById.imageUrl} className="w-100 h-100 object-fit-contain" alt="" />
                                      <p>Likes</p>
                                      <p>
                                        <span className="fw-bold">{postById.user.username}</span> {postById.caption}
                                      </p>
                                      {postById.comments &&
                                        postById.comments.map((comment, i) => {
                                          return (
                                            <>
                                              <p>
                                                <span className="fw-bold">{comment.user.username}</span> {comment.comment}
                                              </p>
                                            </>
                                          )
                                        })}
                                      <p>ID: {postById.id}</p>

                                      {/* {console.log(postById)} */}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Accordion End */}

                <div className="mt-3 text-end">
                  <button type="submit" className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
