import psApi from '../api/psApi'

export default async function getLoggedUser() {
  // * API Get Logged User
  const loggedUser = await psApi.getLoggedUser(login.token)

  // * API Get Followers and Following by User ID
  const followingByUserId = await psApi.getFollowingByUserId(loggedUser.data.id, login.token, { params: { size: 10, page: 1 } })
  const followersByUserId = await psApi.getFollowersByUserId(loggedUser.data.id, login.token, { params: { size: 10, page: 1 } })

  loggedUser.data.following = followingByUserId.data.users
  loggedUser.data.followers = followersByUserId.data.users
  loggedUser.data.followingId = followingByUserId.data.users.map((user) => user.id)

  localStorage.setItem('loggedUser', JSON.stringify(loggedUser.data))
  setLoggedUser(loggedUser.data)
}