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
    alert(register.message)
  }

  return (
    <>
      <section id="signup" className="signup">
        <div className="signup__wrap">
          <div className="signup__wrap-title d-flex justify-content-center">
            <p className="text-primary fw-bold fs-2">Sign Up</p>
          </div>
          <form className="signup__wrap-form">
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-id-card"></i>
              </span>
              <input ref={registerNameRef} type="text" autoComplete="new-password" required />
              <label>Name</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-user"></i>
              </span>
              <input ref={registerUsernameRef} type="text" autoComplete="new-password" required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-envelope"></i>
              </span>
              <input ref={registerEmailRef} type="email" autoComplete="new-password" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <input ref={registerPasswordRef} type="password" autoComplete="new-password" required />
              <label>Password</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-lock-alt"></i>
              </span>
              <input ref={registerPasswordRepeatRef} type="password" autoComplete="new-password" required />
              <label>Repeat Password</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-user-circle"></i>
              </span>
              <input ref={registerProfilePictureUrlRef} type="text" autoComplete="new-password" required />
              <label>Profile Picture URL</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-phone"></i>
              </span>
              <input ref={registerPhoneNumberRef} type="number" autoComplete="new-password" required />
              <label>Phone Number</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bxs-notepad"></i>
              </span>
              <input ref={registerBioRef} type="text" autoComplete="new-password" required />
              <label>Bio</label>
            </div>
            <div className="input-box">
              <span className="input-box__icon">
                <i className="bx bx-globe"></i>
              </span>
              <input ref={registerWebsiteRef} type="text" autoComplete="new-password" required />
              <label>Website</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 p-2 mt-3" onClick={handleRegister}>
              Sign Up
            </button>
            <div className="register d-flex justify-content-center mt-4">
              <p>
                Already have an account?{' '}
                <a href="#" className="text-decoration-none fw-bold login-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
