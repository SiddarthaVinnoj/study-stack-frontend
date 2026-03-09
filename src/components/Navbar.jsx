import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const adminEmail =  import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword =  import.meta.env.VITE_ADMIN_PASSWORD;
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")); 

  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`${location.pathname}?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className='navbar'>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"  style={{ fontSize: "25px" }}>
            <span style={{ color: "#e85d26" }}>Study</span>
            <span style={{ color: "white" }}>Stack</span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
             <input className="form-control me-2" type="search" placeholder="Search courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{backgroundColor: "black", color: "white", border: "1px solid #e85d26", borderRadius: "5px 0 0 5px", padding: "6px 10px", }}/>
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ backgroundColor: "#e85d26", color: "white", marginLeft: "-5px", border: "#e85d26" }}
              >
                Search
              </button>
            </form>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color: "white" }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/course" className="nav-link" style={{ color: "white" }}>Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/mycourses" className="nav-link" style={{ color: "white" }}>My Courses</Link>
              </li>

              {user ? (
                <>
                  {user.email === adminEmail && user.password === adminPassword && (
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link" style={{ color: "white" }}>Admin</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" style={{ color: "white" }}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link" style={{ color: "white" }}>SignUp</Link>
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