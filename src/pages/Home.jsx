import Navbar from '../components/navbar/Navbar'
import Timeline from '../components/timeline/Timeline'
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import { Link, Route, Routes } from 'react-router-dom'
import Profile from '../components/profile/Profile'
import EditProfile from '../components/profile/EditProfile'

export default function Home() {
  return (
    <>
      <section id="homepage" className="homepage">
        <div className="container mt-5">
          <div className="row">
            <div className="col-3">
              <Navbar />
              <Link to={'/test'}>Test</Link>
            </div>
            <div className="col-6">
              <Routes>
                <Route index element={<Timeline />} />
                <Route path="/test" element={<Sidebar />} />
                <Route path="/u/:id" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
              </Routes>
              {/* <Timeline /> */}
            </div>
            <div className="col-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
