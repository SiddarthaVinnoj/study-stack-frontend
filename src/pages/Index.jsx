import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Featured from '../components/Featured';
import Level from '../components/Level';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Index() {
  // --- Typewriter messages ---
  const messages = [
    "WELCOME TO STUDYSTACK",
    "LEARN. GROW. SUCCEED.",
    "STACK YOUR KNOWLEDGE STEP BY STEP",
    "DISCOVER HIGH-QUALITY COURSES"
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = 50; // faster typing speed
    const pause = 1000; // pause before deleting

    const handleTyping = () => {
      const currentMessage = messages[messageIndex];

      if (!deleting) {
        setDisplayedText(currentMessage.slice(0, letterIndex + 1));
        if (letterIndex + 1 === currentMessage.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setLetterIndex(letterIndex + 1);
        }
      } else {
        setDisplayedText(currentMessage.slice(0, letterIndex - 1));
        if (letterIndex - 1 === 0) {
          setDeleting(false);
          setMessageIndex((messageIndex + 1) % messages.length);
          setLetterIndex(0);
        } else {
          setLetterIndex(letterIndex - 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [letterIndex, deleting, messageIndex, messages]);

  return (
    <>
      <Navbar />

      <div className='home' style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px",
        flexWrap: "wrap",
        gap: "20px"
      }}>

        {/* LEFT CONTENT */}
        <div className='home-detail' style={{ maxWidth: "600px", flex: "1 1 400px" }}>
          
          {/* ROTATING TYPEWRITER WELCOME MESSAGE */}
          <p className="welcome-text" style={{
            fontSize: "19px",
            fontWeight: "bold",
            color: "grey",
            marginBottom: "15px",
            minHeight: "30px"
          }}>
            {displayedText}
          </p>

          <h1 className="home-title" style={{ fontSize: "2rem", lineHeight: "1.2" }}>
            Best Online Education Expertise
          </h1>

          <p className="home-subtitle" style={{ fontSize: "1rem", marginTop: "15px", lineHeight: "1.5" }}>
            Your all-in-one platform to learn, grow, and succeed.
            Discover high-quality courses, build real-world skills,
            and stack your knowledge step by step.
          </p>

          <div className="home-stats" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-chalkboard"></i>
              <span>No. of Courses: <span className="highlight-text">30</span></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-person-chalkboard"></i>
              <span>No. of Instructors: <span className="highlight-text">29</span></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-list"></i>
              <span>No. of Categories: <span className="highlight-text">13</span></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-clock"></i>
              <span>Total Duration: <span className="highlight-text">225 Hours</span></span>
            </div>
          </div>

          <div className="home-buttons" style={{ marginTop: "25px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Link to="/login">
              <button className='home-btn'>Get Started Now</button>
            </Link>
            <Link to="/course">
              <button className='home-btn2'>Explore Courses</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE TECH ORBIT */}
        <div className="tech-orbit" style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div className="orbit" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            <img src="https://www.svgrepo.com/show/452092/react.svg" className="tech-logo react" alt="react" style={{ width: "60px", height: "60px" }} />
            <img src="https://www.svgrepo.com/show/452075/node-js.svg" className="tech-logo node" alt="node" style={{ width: "60px", height: "60px" }} />
            <img src="https://www.svgrepo.com/show/452091/python.svg" className="tech-logo python" alt="python" style={{ width: "60px", height: "60px" }} />
            <img src="https://www.svgrepo.com/show/331488/mongodb.svg" className="tech-logo mongo" alt="mongo" style={{ width: "60px", height: "60px" }} />
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