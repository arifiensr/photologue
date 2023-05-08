import { useRef } from 'react'
import psApi from '../../api/psApi'
import './signup.scss'

export default function Signup() {
  const registerNameRef = useRef()
  const registerUsernameRef = useRef()
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()
  const registerPasswordRepeatRef = useRef()
  const registerProfilePictureUrlRef = useRef()
  const registerPhoneNumberRef = useRef()
  const registerBioRef = useRef()
  const registerWebsiteRef = useRef()

  async function handleRegister(e) {
    e.preventDefault()
    const data = {
      name: registerNameRef.current.value,
      username: registerUsernameRef.current.value,
      email: registerEmailRef.current.value,
      password: registerPasswordRef.current.value,
      passwordRepeat: registerPasswordRepeatRef.current.value,
      profilePictureUrl: registerProfilePictureUrlRef.current.value,
      phoneNumber: registerPhoneNumberRef.current.value,
      bio: registerBioRef.current.value,
      website: registerWebsiteRef.current.value,
    }

    const register = await psApi.registerUser(data)
    console.log(register)
  }

  return (
    <>
      <section id="signup" className="signup">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Sign Up</h3>
              <form className="signup__form">
                <div className="form-floating mb-2">
                  <input ref={registerNameRef} type="text" className="form-control" placeholder="Name" id="floatingName" required />
                  <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerUsernameRef} type="text" className="form-control" placeholder="Username" id="floatingUsername" required />
                  <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerEmailRef} type="text" className="form-control" placeholder="Email" id="floatingEmail" required />
                  <label htmlFor="floatingEmail">Email</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerPasswordRef} type="text" className="form-control" placeholder="Password" id="floatingPassword" required />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerPasswordRepeatRef} type="text" className="form-control" placeholder="PasswordRepeat" id="floatingPasswordRepeat" required />
                  <label htmlFor="floatingPasswordRepeat">Password Repeat</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerProfilePictureUrlRef} type="text" className="form-control" placeholder="ProfilePictureUrl" id="floatingProfilePictureUrl" required />
                  <label htmlFor="floatingProfilePictureUrl">Profile Picture URL</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerPhoneNumberRef} type="text" className="form-control" placeholder="PhoneNumber" id="floatingPhoneNumber" required />
                  <label htmlFor="floatingPhoneNumber">Phone Number</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerBioRef} type="text" className="form-control" placeholder="Bio" id="floatingBio" required />
                  <label htmlFor="floatingBio">Bio</label>
                </div>
                <div className="form-floating mb-2">
                  <input ref={registerWebsiteRef} type="text" className="form-control" placeholder="Website" id="floatingWebsite" required />
                  <label htmlFor="floatingWebsite">Website</label>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-primary" onClick={handleRegister}>
                    Sign Up
                  </button>
                  <button className="btn btn-secondary ms-2 login-button">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
