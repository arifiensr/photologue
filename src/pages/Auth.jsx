import { useEffect } from 'react'
import Login from '../components/login/Login'
import SignUp from '../components/signup/Signup'
import mockupImage from '../assets/images/landingpage/mockup.png'
import './auth.scss'
import Footer from '../components/footer/Footer'

export default function Auth() {
  useEffect(() => {
    const loginButton = document.querySelector('.login-button')
    const signupButton = document.querySelector('.signup-button')
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
    <>
      <section id="auth" className="auth">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="container">
                <div className="row">
                  <div className="col-12 auth__mockup"></div>
                </div>
              </div>
            </div>
            <div className="col-6 auth__form rounded shadow">
              <div className="auth__form-login m-3" id="auth__form-login">
                <Login />
              </div>
              <div className="auth__form-signup m-3" id="auth__form-signup">
                <SignUp />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  )
}
