import { useRef, useState } from 'react'
import psApi from '../../api/psApi'
import './signup.scss'

export default function Signup() {
  const defaultImageUrl = 'https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png'
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(defaultImageUrl)

  const registerNameRef = useRef()
  const registerUsernameRef = useRef()
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()
  const registerPasswordRepeatRef = useRef()
  const registerPhoneNumberRef = useRef()
  const registerBioRef = useRef()
  const registerWebsiteRef = useRef()

  function handleImages(e) {
    if (e.target.files[0].size < 1024 * 1024) {
      setImages(e.target.files[0])
      setImagesPreview(URL.createObjectURL(e.target.files[0]))
    } else {
      alert('File is to big! Max size is 1MB.')
    }
  }

  async function handleRegister(e) {
    e.preventDefault()

    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJhNTRjNTllNy1hMWI2LTRhYzQtYWU3Yi05ODg1YTk4ZWQ4NjkiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTY4MTAxMzEzN30.AxhIjhRXMoFoxldGOqwLur6jNBC-mx9-Ig18RWfYkLM'

    let imageUrl = { url: defaultImageUrl }
    if (images) {
      const formData = new FormData()
      formData.append('image', images)

      imageUrl = await psApi.uploadImage(formData, tempToken)
    }

    const data = {
      name: registerNameRef.current.value,
      username: registerUsernameRef.current.value,
      email: registerEmailRef.current.value,
      password: registerPasswordRef.current.value,
      passwordRepeat: registerPasswordRepeatRef.current.value,
      profilePictureUrl: imageUrl.url,
      phoneNumber: registerPhoneNumberRef.current.value,
      bio: registerBioRef.current.value,
      website: registerWebsiteRef.current.value,
    }

    const register = await psApi.registerUser(data)
    alert(register.message)

    const formSignup = document.getElementById('auth__form-signup')
    const formLogin = document.getElementById('auth__form-login')
    formLogin.style.left = '0%'
    formLogin.style.right = '0%'
    formSignup.style.left = '100%'
    formSignup.style.right = '-100%'
  }

  return (
    <>
      <section id="signup" className="signup mb-sm-0">
        <div className="signup__wrap">
          <div className="signup__wrap-title d-flex flex-column justify-content-center align-items-center">
            <p className="text-primary fw-bold fs-2 m-0">Sign Up</p>
            <img src={imagesPreview} alt="" />
            <div className="input-upload">
              <label htmlFor="chooseImage" className="form-label">
                <i className="bx bxs-cloud-upload"></i> Choose Image
              </label>
              <input id="chooseImage" type="file" accept="image/*" onChange={(e) => handleImages(e)} className="form-control" required />
            </div>
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
