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

      const updateUserProfile = await psApi.updateUserProfile(data, token)

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
      <div className="editprofile__wrap">
          <div className="editprofile__wrap-title d-flex justify-content-center">
            <p className="text-primary fw-bold fs-2">Edit Profile</p>
          </div>
          <form className="editprofile__wrap-form">
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-id-card"></i>
              </span>
              <input ref={loggedNameRef} defaultValue={loggedUser.name} type="text" autoComplete="new-password" required />
              <label>Name</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-user"></i>
              </span>
              <input ref={loggedUsernameRef} defaultValue={loggedUser.username} type="text" autoComplete="new-password" required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-envelope"></i>
              </span>
              <input ref={loggedEmailRef} defaultValue={loggedUser.email} type="email" autoComplete="new-password" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-user-circle"></i>
              </span>
              <input ref={loggedProfilePictureUrlRef} defaultValue={loggedUser.profilePictureUrl} type="text" autoComplete="new-password" required />
              <label>Profile Picture URL</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-phone"></i>
              </span>
              <input ref={loggedPhoneNumberRef} defaultValue={loggedUser.phoneNumber} type="number" autoComplete="new-password" required />
              <label>Phone Number</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-notepad"></i>
              </span>
              <input ref={loggedBioRef} defaultValue={loggedUser.bio} type="text" autoComplete="new-password" required />
              <label>Bio</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bx-globe"></i>
              </span>
              <input ref={loggedWebsiteRef} defaultValue={loggedUser.website} type="text" autoComplete="new-password" required />
              <label>Website</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 p-2 mt-3" onClick={editProfile}>
              Submit
            </button>
          </form>
        </div>
    </section>
  )
}
