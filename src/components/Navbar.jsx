import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "black" }}>
        <div className="container-fluid nav-responsive">
          
          <Link to="/" className="navbar-brand" style={{ fontSize: "25px" }}>
            <span style={{ color: "#e85d26" }}>Study</span>
            <span style={{ color: "white" }}>Stack</span>
          </Link>

          <button 
            className="mobile-menu-toggle hamburger"
            onClick={toggleMenu}
            style={{
              display: "block",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "5px"
            }}
          >
            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'active' : ''}`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-nav" style={{ 
              display: "flex", 
              gap: "20px", 
              margin: "0",
              listStyle: "none",
              flexDirection: isMenuOpen ? "column" : "row",
              position: isMenuOpen ? "absolute" : "static",
              top: isMenuOpen ? "100%" : "auto",
              right: isMenuOpen ? "0" : "auto",
              background: isMenuOpen ? "black" : "transparent",
              padding: isMenuOpen ? "20px" : "0",
              minWidth: "200px",
              boxShadow: isMenuOpen ? "0 4px 10px rgba(0,0,0,0.3)" : "none",
              zIndex: 1000
            }}>

              <li className="nav-item">
                <Link 
                  to="/" 
                  className="nav-link" 
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  to="/course" 
                  className="nav-link" 
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  to="/mycourses" 
                  className="nav-link" 
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Courses
                </Link>
              </li>

              {user ? (
                <>
                  {user.email === adminEmail && (
                    <li className="nav-item">
                      <Link 
                        to="/admin" 
                        className="nav-link" 
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="nav-link"
                      style={{
                        color: "white",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "none"
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link 
                      to="/login" 
                      className="nav-link" 
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link 
                      to="/signup" 
                      className="nav-link" 
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;