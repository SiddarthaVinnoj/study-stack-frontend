import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Courses() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {

    const getCourse = async () => {

      try {

        const res = await axios.get(`${apiUrl}/api/courses/${id}`);
        setCourse(res.data);

      } catch (error) {

        console.log("Error fetching course:", error);
        toast.error("Failed to load course");

      }

    };

    getCourse();

  }, [id]);

  // ENROLL
  const handleEnroll = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    let allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
    let userCourses = allCourses[user._id] || [];

    const alreadyEnrolled = userCourses.find((c) => c._id === course._id);

    if (alreadyEnrolled) {
      toast.info("You are already enrolled in this course");
      return;
    }

    userCourses.push(course);
    allCourses[user._id] = userCourses;

    localStorage.setItem("myCourses", JSON.stringify(allCourses));

    toast.success("Enrolled successfully!");

  };

  // PLAY LESSON
  const handlePlay = (lessonId) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
    const userCourses = allCourses[user._id] || [];

    const enrolled = userCourses.find((c) => c._id === course._id);

    if (!enrolled) {
      toast.error("Please enroll in the course first");
      return;
    }

    navigate(`/play/${course._id}/${lessonId}`);

    const allProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    const userProgress = allProgress[user._id] || {};
    const courseProgress = userProgress[course._id] || [];

    if (!courseProgress.includes(lessonId)) {

      courseProgress.push(lessonId);

      userProgress[course._id] = courseProgress;
      allProgress[user._id] = userProgress;

      localStorage.setItem("courseProgress", JSON.stringify(allProgress));

    }

  };

  if (!course)
    return (
      <h2 style={{ color: "white", marginTop: "50px", textAlign: "center" }}>
        Loading...
      </h2>
    );

  const user = JSON.parse(localStorage.getItem("user"));

  const allProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
  const userProgress = user ? allProgress[user._id] || {} : {};

  const completedLessons = userProgress[course._id] || [];

  const progressPercentage = course.lessons?.length
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

  return (
    <>
      <Navbar />

      <div className="course-card">

        <div className="image">
          <img src={course.image} alt={course.title} />
        </div>

        <div className="details">

          <h1>{course.title}</h1>

          <p><b>Instructor:</b> {course.instructor}</p>

          <p>{course.description}</p>

          <p><b>Duration:</b> {course.duration}</p>

          <p><b>Rating:</b> {course.rating}</p>

          <button
            onClick={handleEnroll}
            className="btn btn-primary"
            style={{
              backgroundColor: "#e85d26",
              color: "white",
              fontWeight: "600",
              border: "#e85d26",
              marginBottom: "10px"
            }}
          >
            Enroll
          </button>

          {progressPercentage > 0 && (

            <>
              <div className="progress" style={{ height: "12px", marginBottom: "10px" }}>

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

              <small style={{ color: "white" }}>
                {progressPercentage}% completed
              </small>
            </>

          )}

        </div>

      </div>

      <div style={{ marginLeft: "30px", marginTop: "20px" }}>

        <h2 style={{ color: "white" }}>What you will learn...</h2>

        <table className="lesson-table">

          <thead>

            <tr>
              <th>Lesson</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {course.lessons?.map((lesson) => (

              <tr key={lesson.lessonId}>

                <td>{lesson.title}</td>

                <td>{lesson.duration}</td>

                <td>

                  <button
                    onClick={() => handlePlay(lesson.lessonId)}
                    className="btn btn-success"
                    style={{
                      backgroundColor: "#e85d26",
                      color: "white",
                      fontWeight: "600",
                      border: "#e85d26"
                    }}
                  >
                    Play
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );

}

export default Courses;