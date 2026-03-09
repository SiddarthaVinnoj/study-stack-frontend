import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
  const myCourses = user ? allCourses[user.id] || [] : [];
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />

      <div className="filtered">
        <h2 style={{ color: "white", marginBottom: "20px" }}>My Courses</h2>

        {myCourses.length === 0 ? (
          <p style={{ color: "white" }}>No courses enrolled yet</p>
        ) : (
          <div className="cards">
            {myCourses.map((course) => {
              const allProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
              const userProgress = allProgress[user.id] || {};
              const completedLessons = userProgress[course.id] || [];
              const progressPercentage = course.lessons ? Math.round((completedLessons.length / course.lessons.length) * 100): 0;
              return (
                <div className="card" key={course.id} style={{height:"24rem"}}>
                  <img src={course.image} className="card-img-top" alt={course.title} />
                  <div className="card-body">
                    <h5 style={{ color: "white", fontWeight: "600" }}>{course.title}</h5>
                    <p style={{ color: "grey", fontSize: "14px" }}>Instructor: {course.instructor}</p>
                    <div className="progress" style={{ height: "10px", marginBottom: "10px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${progressPercentage}%`,
                          backgroundColor: "#e85d26"
                        }}
                        aria-valuenow={progressPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <small style={{ color: "white" }}>{progressPercentage}% completed</small>
                    <Link to={`/course/${course.id}`}>
                      <button
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#e85d26",
                          border: "#e85d26",
                          fontWeight: "600",
                          width: "100%",
                          marginTop: "5px"
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