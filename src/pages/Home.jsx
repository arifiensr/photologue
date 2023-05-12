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

export default function Home() {
  const { isLogin } = useContext(GlobalContext)

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
                <div className='col-12 d-flex d-d-sm-none'>
                  <NavbarMobile />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
