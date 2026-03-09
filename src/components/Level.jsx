import React from 'react'
import { Link } from 'react-router-dom'

function Level() {
  return (
    <div className='level'>
      <h1 style={{fontWeight:"600"}}>Ready to <span style={{color:"#e85d26"}}>level up</span></h1>
      <h1>your career?</h1>
      <p>Join 12,000+ developers learning with StudyStack. Start</p>
      <p>today — free for your first course.</p>
      <Link to="/login">
        <button className='home-btn'>Get Started Now</button>
      </Link>
    </div>
  )
}

export default Level
