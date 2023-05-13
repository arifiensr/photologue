import Navbar from '../components/navbar/Navbar'
import Timeline from '../components/dashboard/Dashboard'
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Profile from '../components/profile/Profile'
import EditProfile from '../components/profile/EditProfile'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../config/GlobalState'
import Auth from './Auth'
import NavbarMobile from '../components/navbar/NavbarMobile'
import CreatePost from '../components/post/CreatePost'

export default function Home() {
  const { isLogin } = useContext(GlobalContext)

  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    let mybutton = document.getElementById('back-to-top-button')

    window.onscroll = function () {
      scrollFunction()
    }

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = 'block'
      } else {
        mybutton.style.display = 'none'
      }
    }
  }, [])

  return (
    <>
      <section id="homepage" className="homepage min-vh-100">
        {!isLogin ? (
          <Auth />
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-sm-1 col-xl-3 d-flex justify-content-end p-0 d-none d-sm-flex">
                  <Navbar />
                </div>
                <div className="col-12 col-sm-11 col-xl-9 p-0">
                  <Outlet />
                </div>
                <div className="col-12 d-flex d-sm-none">
                  <NavbarMobile />
                </div>
              </div>
            </div>
            <button onClick={topFunction} id="back-to-top-button" title="Go to top">
              <i className='bx bx-chevron-up'></i>
            </button>
            <CreatePost />
          </>
        )}
      </section>
    </>
  )
}
