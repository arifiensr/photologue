import { useEffect } from 'react'
import Login from '../components/login/Login'
import SignUp from '../components/signup/Signup'
import mockupImage from '../assets/images/landingpage/mockup.png'
import './auth.scss'
import Footer from '../components/footer/Footer'

export default function Auth() {
  useEffect(() => {
    const loginButton = document.querySelector('.login-link')
    const signupButton = document.querySelector('.register-link')
    const formLogin = document.getElementById('auth__form-login')
    const formSignup = document.getElementById('auth__form-signup')

    signupButton.addEventListener('click', (e) => {
      e.preventDefault()
      formLogin.style.left = '-100%'
      formLogin.style.right = '100%'
      formSignup.style.left = '0%'
      formSignup.style.right = '0%'
    })

    loginButton.addEventListener('click', (e) => {
      e.preventDefault()
      formLogin.style.left = '0%'
      formLogin.style.right = '0%'
      formSignup.style.left = '100%'
      formSignup.style.right = '-100%'
    })
  }, [])
  return (
      <section id="auth" className="auth min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 auth__form rounded shadow">
              <div className="auth__form-login" id="auth__form-login">
                <Login />
              </div>
              <div className="auth__form-signup overflow-auto" id="auth__form-signup">
                <SignUp />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
  )
}
