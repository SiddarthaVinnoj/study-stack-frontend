import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const apiUrl =  import.meta.env.VITE_API_URL;
  const [course, setCourse] = useState([]);
  const [filterCourse, setFilterCourse] = useState("All");
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses`);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, []);
  const filteredByCategory =
    filterCourse === "All" ? course : course.filter((item) => item.category === filterCourse);
    const filteredBySearch = filteredByCategory.filter((item) =>
    item.title.toLowerCase().includes(searchQuery) ||
    item.instructor.toLowerCase().includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", paddingTop: "20px", paddingLeft: "20px" }}>
        <div className="offcanvas-body">
          <h1 style={{ fontWeight: "600" }}>All <span style={{ color: "#e85d26" }}>Courses</span></h1>
          <p>Browse our full library of expert-led courses. Filter by category</p>
          <p>to find exactly what you need.</p>

        <div className="filter-container">
  <div className="filter-dropdown">
    <select
      value={filterCourse}
      onChange={(e) => setFilterCourse(e.target.value)}
    >
      {["All","Frontend","Backend","Database","Fullstack","Programming","AI","DevOps","Mobile","System Design","Security","Design","Testing","Career"].map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
</div>
        </div>

        <h2 style={{ color: "white", marginTop: "20px", textAlign: "center", fontWeight: "600" }}>
          Showing: <span style={{ color: "#e85d26" }}>{filterCourse} Courses</span>
        </h2>

        <div className="container d-flex flex-wrap gap-4 justify-content-center mt-4" style={{ marginLeft: "60px" }}>
          {filteredBySearch.length > 0 ? (
            filteredBySearch.map((item) => (
              <div className="card" key={item.id} style={{ backgroundColor: "black", color: "white" }}>
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">By : {item.instructor}</p>
                  <p className="card-text">Duration : {item.duration}</p>
                  <Link to={`/course/${item.id}`}>
                    <button className="btn btn-primary" style={{ backgroundColor: "#e85d26", color: "white", fontWeight: "600", border: "#e85d26" }}>
                      Enroll
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "white", textAlign:"center", width:"100%", marginTop:"20px" }}>
              No courses found for "{searchQuery}"
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;