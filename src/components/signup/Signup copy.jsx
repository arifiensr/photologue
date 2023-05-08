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
                  <input ref={registerNameRef} type="text" className="form-control" placeholder="Name" id="floatingName" required/>
                  <label htmlFor="floatingName">Name</label>
                </div>
                <div className="mb-2">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input ref={registerUsernameRef} type="text" className="form-control" placeholder="Username" required/>
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input ref={registerEmailRef} type="email" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input ref={registerPasswordRef} type="password" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="repeatPassword" className="form-label">
                    Repeat Password
                  </label>
                  <input ref={registerPasswordRepeatRef} type="password" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="profilePictureUrl" className="form-label">
                    Profile Picture URL
                  </label>
                  <input ref={registerProfilePictureUrlRef} type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input ref={registerPhoneNumberRef} type="number" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <input ref={registerBioRef} type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input ref={registerWebsiteRef} type="text" className="form-control" />
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
