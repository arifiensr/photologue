export default function Footer() {
  return (
    <>
      <section id="footer" className="footer fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 bg-secondary d-flex justify-content-center align-items-center py-2">
              <p className="text-primary text-center">
                © 2023 - <a href="https://dibimbing.id/" target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">dibimbing.id</a> Bootcamp Final Project by{' '}
                <a href="https://arifiensr.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <span className="fw-bold d-inline-flex align-items-center">
                    M. Arifien Syachrizal
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
