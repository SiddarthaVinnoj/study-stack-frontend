import React from 'react';
import Navbar from '../components/Navbar';
import Featured from '../components/Featured';
import Level from '../components/Level';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Index() {
  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='home-detail'>
          <p className="welcome-text">WELCOME TO STUDYSTACK</p>
          <h1 className="home-title">Best Online Education Expertise</h1>
          <p className="home-subtitle">
            Your all-in-one platform to learn, grow, and succeed. Discover high-quality courses, build real-world skills, and stack your knowledge step by step.
          </p>

          <div className="home-stats">
            <div>
              <i className="fa-solid fa-chalkboard"></i>
              <span>No. of Courses: <span className="highlight-text">30</span></span>
            </div>
            <div>
              <i className="fa-solid fa-person-chalkboard"></i>
              <span>No. of Instructors: <span className="highlight-text">29</span></span>
            </div>
            <div>
              <i className="fa-solid fa-list"></i>
              <span>No. of Categories: <span className="highlight-text">13</span></span>
            </div>
            <div>
              <i className="fa-solid fa-clock"></i>
              <span>Total Duration: <span className="highlight-text">225 Hours</span></span>
            </div>
          </div>

          <div className="home-buttons">
            <Link to="/login">
              <button className='home-btn'>Get Started Now</button>
            </Link>
            <Link to="/course">
              <button className='home-btn2'>Explore Courses</button>
            </Link>
          </div>
        </div>
      </div>
      <Featured />
      <Level />
      <Footer />
    </>
  );
}

export default Index;