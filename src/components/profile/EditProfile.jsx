import { useContext, useRef } from 'react'
import './editprofile.scss'
import { GlobalContext } from '../../config/GlobalState'
import psApi from '../../api/psApi'

export default function EditProfile() {
  const token = JSON.parse(localStorage.getItem('token'))
  const { loggedUser, setLoggedUser } = useContext(GlobalContext)

  const loggedNameRef = useRef(loggedUser ? loggedUser.name : null)
  const loggedUsernameRef = useRef(loggedUser ? loggedUser.username : null)
  const loggedEmailRef = useRef(loggedUser ? loggedUser.email : null)
  const loggedProfilePictureUrlRef = useRef(loggedUser ? loggedUser.profilePictureUrl : null)
  const loggedPhoneNumberRef = useRef(loggedUser ? loggedUser.phoneNumber : null)
  const loggedBioRef = useRef(loggedUser ? loggedUser.bio : null)
  const loggedWebsiteRef = useRef(loggedUser ? loggedUser.website : null)

  async function editProfile(e) {
    try {
      e.preventDefault()

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
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser.data))
      setLoggedUser(loggedUser.data)
      alert('Edit Profile Success')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <section id="editprofile" className="editprofile min-vh-100">
      <div className="container">
        <div className="row">
          <div className="col-12 border border-1 border-black rounded shadow py-3">
            <h3>Edit Profile</h3>
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
              <button type="submit" className="btn btn-primary" onClick={editProfile}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
