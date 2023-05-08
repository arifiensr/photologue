import psApi from '../../api/psApi'
import './navbar.scss'

export default function Navbar() {
  async function logout(e) {
    try {
      e.preventDefault()
      const token = JSON.parse(localStorage.getItem('token'))

      // * API Logout User
      await psApi.logoutUser(token)
      localStorage.clear()
      window.location.reload()
    } catch (err) {
      alert(`${err.response.data.message}`)
    }
  }
  return (
    <>
      <section id="" className="">
        <div className="container">
          <div className="row">
            <div className="col-12 border border-black rounded shadow w-100">
              <ul className="list-unstyled">
                <li>Home</li>
                <li>Explore</li>
                <li>Profile</li>
                <li>Create Post</li>
                <li>
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
