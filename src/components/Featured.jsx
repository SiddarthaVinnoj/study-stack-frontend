import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
function Featured() {
  const apiUrl = import.meta.env.VITE_API_URL;
     const[course, setCourse] = useState([]);
    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await axios.get(`${apiUrl}/courses`);
                setCourse(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCourse();
    },[])
  return (
    <>
    <div className='feature' style={{ backgroundColor: "black"}}>
  
  <div className='feature-body'>
    <h1 style={{ textAlign: "center",color: "white" , fontWeight:"600"}}>
      Featured <span style={{color:"#e85d26"}}>Courses</span>
    </h1>
    <p style={{ textAlign: "center", color: "white" }}>
      Handpicked by our team — the most popular, highest-rated courses
    </p>
    <p style={{ textAlign: "center", color: "white" }}>
      on the platform.
    </p>
  </div>

  <div className="container d-flex justify-content-center  flex-wrap" style={{marginLeft:"60px"}}>
    {course.map((item) => {
      if(item.rating >= 4.8){
        return (
      <div className="card" key={item.id} style={{backgroundColor:"black", color:"white", marginLeft:"20px"}}>
        <img src={item.image} className="card-img-top" alt={item.title} />

        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text" style={{color:"grey"}}>By : {item.instructor}</p>
          <p className="card-text" style={{color:"grey"}}>Duration : {item.duration}</p>

          <Link to={`/course/${item.id}`}>
            <button className="btn btn-primary" style={{backgroundColor:"#e85d26", color:"white" , border:"#e85d26" , fontWeight:"600"}}>Enroll</button>
          </Link>
        </div>

      </div>
)}})}
  </div>
 <Link to="/course">
  <button className="btn " style={{ backgroundColor: "black", color: "white", border: "1px solid grey", marginLeft: "44%" , marginTop: "40px" }}>
    Explore more Courses
  </button>
  </Link>
</div>
    </>
  )
}

export default Featured
