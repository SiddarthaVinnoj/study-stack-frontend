import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Admin() {
  const apiUrl =  import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await axios.get(`${apiUrl}/courses`);
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (window.confirm("Delete this course?")) {
      await axios.delete(`${apiUrl}/courses/${id}`);
      fetchCourses();
    }
  };

  return (
    <>
      <Navbar />

      <div className="container" style={{ marginTop: "100px" }}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Dashboard</h2>

        <Link to="/addcourse">
          <button
            className="btn"
            style={{
              backgroundColor: "#e85d26",
              color: "white",
              fontWeight: 600,
              marginBottom: "20px"
            }}
          >
            Add Course
          </button>
        </Link>

        <div className="row">

          {courses.map((course) => (
            <div className="col-md-4" key={course.id}>

              <div className="card admin-card">

                <img src={course.image} alt={course.title} />

                <div className="card-body">
                  <h5 style={{ color: "white", fontWeight: 600 }}>{course.title}</h5>
                  <p style={{ color: "grey" }}>{course.instructor}</p>

                  <Link to={`/editcourse/${course.id}`}>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#4f46e5",
                        color: "white",
                        fontWeight: 600
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#e85d26",
                      color: "white",
                      fontWeight: 600,
                      marginLeft: "10px"
                    }}
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Admin;