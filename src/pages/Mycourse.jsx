import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id || user.id : null;

  const allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
  const myCourses = userId ? allCourses[userId] || [] : [];

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [userId, navigate]);

  const allProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
  const userProgress = userId ? allProgress[userId] || {} : {};

  return (
    <>
      <Navbar />

      <div
        className="filtered mycourses-container"
        style={{
          padding: "40px",
          minHeight: "100vh",
          marginTop: "80px"
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "30px",
            fontWeight: "600"
          }}
        >
          My Courses
        </h2>

        {myCourses.length === 0 ? (
          <p style={{ color: "#cbd5f5" }}>No courses enrolled yet</p>
        ) : (
          <div
            className="cards"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "25px"
            }}
          >
            {myCourses.map((course) => {
              const completedLessons = userProgress[course._id] || [];
              const progressPercentage = course.lessons?.length
                ? Math.round(
                    (completedLessons.length / course.lessons.length) * 100
                  )
                : 0;

              return (
                <div
                  className="card"
                  key={course._id}
                  style={{
                    width: "18rem",
                    background: "#1e293b",
                    border: "none",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                    transition: "0.3s"
                  }}
                >
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt={course.title}
                    style={{
                      height: "160px",
                      objectFit: "cover"
                    }}
                  />

                  <div className="card-body">
                    <h5
                      style={{
                        color: "white",
                        fontWeight: "600"
                      }}
                    >
                      {course.title}
                    </h5>

                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        marginBottom: "12px"
                      }}
                    >
                      Instructor: {course.instructor}
                    </p>

                    <div
                      style={{
                        background: "#334155",
                        height: "8px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginBottom: "8px"
                      }}
                    >
                      <div
                        style={{
                          width: `${progressPercentage}%`,
                          height: "100%",
                          background: "#e85d26"
                        }}
                      />
                    </div>

                    <small style={{ color: "#cbd5f5" }}>
                      {progressPercentage}% completed
                    </small>

                    <Link to={`/course/${course._id}`}>
                      <button
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          padding: "8px",
                          background: "#e85d26",
                          border: "none",
                          borderRadius: "6px",
                          color: "white",
                          fontWeight: "600",
                          transition: "0.2s"
                        }}
                      >
                        Continue Learning
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default MyCourses;