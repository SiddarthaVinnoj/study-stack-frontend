import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState("All");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {

    const getCourses = async () => {

      try {

        const response = await axios.get(`${apiUrl}/api/courses`);

        setCourses(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    getCourses();

  }, []);

  const filteredByCategory =
    filterCourse === "All"
      ? courses
      : courses.filter((item) => item.category === filterCourse);

  const filteredBySearch = filteredByCategory.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery) ||
    item.instructor?.toLowerCase().includes(searchQuery) ||
    item.category?.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          paddingTop: "20px",
          paddingLeft: "20px",
        }}
      >
        <div className="offcanvas-body">

          <h1 style={{ fontWeight: "600" }}>
            All <span style={{ color: "#e85d26" }}>Courses</span>
          </h1>

          <p>
            Browse our full library of expert-led courses. Filter by category
            to find exactly what you need.
          </p>

          {/* Category Filter */}
          <div className="filter-container">
            <div className="filter-dropdown">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                {[
                  "All",
                  "Frontend",
                  "Backend",
                  "Database",
                  "Fullstack",
                  "Programming",
                  "AI",
                  "DevOps",
                  "Mobile",
                  "System Design",
                  "Security",
                  "Design",
                  "Testing",
                  "Career",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h2
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Showing:{" "}
          <span style={{ color: "#e85d26" }}>
            {filteredBySearch.length}
          </span>{" "}
          Courses
        </h2>

        {/* Loading */}
        {loading ? (
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            Loading courses...
          </h3>
        ) : (
          <div
            className="container d-flex flex-wrap gap-4 justify-content-center mt-4"
          >
            {filteredBySearch.length > 0 ? (
              filteredBySearch.map((item) => (

                <div
                  className="card"
                  key={item._id}
                  style={{
                    width: "18rem",
                    backgroundColor: "#111",
                    color: "white",
                    border: "1px solid #333",
                  }}
                >
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <div className="card-body">

                    <h5 className="card-title">{item.title}</h5>

                    <p className="card-text">
                      By: {item.instructor}
                    </p>

                    <p className="card-text">
                      Duration: {item.duration}
                    </p>

                    <Link to={`/course/${item._id}`}>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#e85d26",
                          color: "white",
                          fontWeight: "600",
                          border: "none",
                        }}
                      >
                        Enroll
                      </button>
                    </Link>

                  </div>

                </div>

              ))
            ) : (
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                No courses found for "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;