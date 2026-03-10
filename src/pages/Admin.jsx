import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/courses`);
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {

    if (!window.confirm("Delete this course?")) return;

    try {

      await axios.delete(`${apiUrl}/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Course deleted successfully");

      fetchCourses();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Error deleting course"
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="container" style={{ marginTop: "100px" }}>

        <h2 style={{ color: "white", marginBottom: "20px" }}>
          Admin Dashboard
        </h2>

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

            <div className="col-md-4" key={course._id}>

              <div className="card admin-card">

                <img src={course.image} alt={course.title} />

                <div className="card-body">

                  <h5 style={{ color: "white", fontWeight: 600 }}>
                    {course.title}
                  </h5>

                  <p style={{ color: "grey" }}>
                    {course.instructor}
                  </p>

                  <Link to={`/editcourse/${course._id}`}>
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
                    onClick={() => deleteCourse(course._id)}
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