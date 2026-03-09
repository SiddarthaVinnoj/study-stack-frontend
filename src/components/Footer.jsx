import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="footer">
  <div className="footer-container">

    <div className="footer-section">
      <h3 className="footer-logo">Studystack</h3>
      <p>Learn modern technologies from industry experts.  
      Build skills that help you grow in your career.</p>
    </div>

    <div className="footer-section">
      <h4>Courses</h4>
      <ul>
        <li>Frontend</li>
        <li>Backend</li>
        <li>Fullstack</li>
        <li>AI & ML</li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Company</h4>
      <ul>
        <li>About</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Contact</li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Follow Us</h4>
      <div className="social">
        <i className="fa-brands fa-github"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 Studystack. All rights reserved.
  </div>
</footer>
    </div>
  )
}

export default Footer
