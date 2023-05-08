import Navbar from '../components/navbar/Navbar'
import Timeline from '../components/timeline/Timeline'
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'

export default function Home() {
  return (
    <>
      <section id="homepage" className="homepage">
        <div className="container mt-5">
          <div className="row">
            <div className="col-3">
              <Navbar />
            </div>
            <div className="col-6">
              <Timeline />
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
