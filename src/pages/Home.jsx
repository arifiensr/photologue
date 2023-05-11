import Navbar from '../components/navbar/Navbar'
import Timeline from '../components/timeline/Timeline'
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Profile from '../components/profile/Profile'
import EditProfile from '../components/profile/EditProfile'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../config/GlobalState'
import Auth from './Auth'

export default function Home() {
  const { isLogin } = useContext(GlobalContext)



  return (
    <>
      <section id="homepage" className="homepage">
        {!isLogin ? (
          <Auth />
        ) : (
          <>
            <div className="container mt-5">
              <div className="row">
                <div className="col-3">
                  <Navbar />
                  <Sidebar />
                  <Link to={'/test'}>Test</Link>
                </div>
                <div className="col-9">
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
