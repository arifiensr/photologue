export default function Footer() {
  return (
    <>
      <section id="footer" className="footer fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center mb-2">
              <p className="text-primary">
                © 2023 - dibimbing Bootcamp Final Project by{' '}
                <a href="https://www.linkedin.com/in/arifiensr/" target="_blank" rel="noopener noreferrer">
                  <span className="fw-bold d-inline-flex align-items-center">
                    M. Arifien Syachrizal <i className="bx bxl-linkedin-square ps-1 fs-5"></i>
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
