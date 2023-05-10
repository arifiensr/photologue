import './sidebar.scss'
import GLightbox from 'glightbox'

export default function Sidebar() {
  const lightbox = GLightbox({
    moreLength: 0,
    // touchNavigation: true,
    // loop: true,
    // autoplayVideos: true,
  })

  return (
    <>
      <section id="sidebar" className="sidebar">
        <div className="container">
          <div className="row">
            <div className="col-12 border border-black rounded shadow">
              <h1>Suggestion</h1>
              <ul>
                <li>1</li>
                <li>2</li>
              </ul>
              {/* <a href="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80" data-title="My title" data-description=".custom-desc1" data-desc-position="left" data-type="image" data-effect="fade" data-width="900px" data-height="auto" data-zoomable="true" data-draggable="true" className="glightbox">
                <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="image" />
              </a> */}

              <div className="glightbox-desc custom-desc1">
                <p>The content of this div will be used as the slide description</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
                <p>You can add links and any HTML you want</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
