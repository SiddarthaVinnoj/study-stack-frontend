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

      <div
        style={{
          padding: "40px",
          marginTop: "80px",
          minHeight: "100vh"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >
          <h2 style={{ color: "white", fontWeight: "600" }}>
            Admin Dashboard
          </h2>

          <Link to="/addcourse">
            <button
              style={{
                background: "#e85d26",
                color: "white",
                border: "none",
                padding: "8px 18px",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              + Add Course
            </button>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "25px"
          }}
        >

          {courses.map((course) => (

            <div
              key={course._id}
              style={{
                background: "#1e293b",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                transition: "0.3s"
              }}
            >

              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>

                <h5
                  style={{
                    color: "white",
                    fontWeight: "600",
                    marginBottom: "5px"
                  }}
                >
                  {course.title}
                </h5>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    marginBottom: "15px"
                  }}
                >
                  {course.instructor}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>

                  <Link to={`/editcourse/${course._id}`}>
                    <button
                      style={{
                        background: "#4f46e5",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    style={{
                      background: "#e85d26",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      fontWeight: "500",
                      cursor: "pointer"
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