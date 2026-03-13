import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Courses() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState([]);
  const [currentLessonTitle, setCurrentLessonTitle] = useState("");

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user._id || user.id : null;
  };

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

  const handleEnroll = () => {
    const userId = getUserId();
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
    const userCourses = Array.isArray(allCourses[userId]) ? allCourses[userId] : [];

    if (userCourses.find((c) => c._id === course._id)) {
      toast.info("You are already enrolled in this course");
      return;
    }

    userCourses.push(course);
    allCourses[userId] = userCourses;
    localStorage.setItem("myCourses", JSON.stringify(allCourses));
    toast.success("Enrolled successfully!");
  };

  const handlePlay = (lessonId) => {
    const userId = getUserId();
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const allCourses = JSON.parse(localStorage.getItem("myCourses")) || {};
    const userCourses = Array.isArray(allCourses[userId]) ? allCourses[userId] : [];

    if (!userCourses.find((c) => c._id === course._id)) {
      toast.error("Please enroll first");
      return;
    }

    const allProgress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    const userProgress = allProgress[userId] || {};
    const courseProgress = userProgress[course._id] || [];

    if (!courseProgress.includes(lessonId)) {
      courseProgress.push(lessonId);
      userProgress[course._id] = courseProgress;
      allProgress[userId] = userProgress;
      localStorage.setItem("courseProgress", JSON.stringify(allProgress));
    }

    navigate(`/play/${course._id}/${lessonId}`);
  };

  const handleShowNotes = (lessonId, lessonTitle) => {
    const userId = getUserId();
    const allNotes = JSON.parse(localStorage.getItem("lessonNotes")) || {};
    const userNotes = allNotes[userId]?.[course._id]?.[lessonId] || [];
    setCurrentNotes(userNotes);
    setCurrentLessonTitle(lessonTitle);
    setShowNotes(true);
  };

  if (!course)
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );

  const userId = getUserId();

  return (
    <>
      <Navbar />

      {/* Course Header */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          padding: "40px",
          color: "white"
        }}
      >
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: "380px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
        />

        <div>
          <h1 style={{ fontWeight: "600" }}>{course.title}</h1>

          <p style={{ color: "#94a3b8" }}>
            <b>Instructor:</b> {course.instructor}
          </p>

          <p style={{ marginTop: "10px", maxWidth: "600px" }}>
            {course.description}
          </p>

          <p>
            <b>Duration:</b> {course.duration}
          </p>

          <p>
            <b>Rating:</b> ⭐ {course.rating}
          </p>

          <button
            onClick={handleEnroll}
            style={{
              marginTop: "15px",
              padding: "10px 22px",
              background: "#e85d26",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Enroll Course
          </button>
        </div>
      </div>

      {/* Lessons Section */}
      <div style={{ padding: "0 40px 40px 40px" }}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          What you will learn
        </h2>

        <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#1e293b",
    borderRadius: "8px",
    overflow: "hidden",
    tableLayout: "fixed"
  }}
>
  <thead>
    <tr style={{ background: "#0f172a", color: "white" }}>
      <th style={{ padding: "12px", textAlign: "left", width: "50%" }}>Lesson</th>
      <th style={{ padding: "12px", textAlign: "center", width: "15%" }}>Duration</th>
      <th style={{ padding: "12px", textAlign: "center", width: "15%" }}>Action</th>
      <th style={{ padding: "12px", textAlign: "center", width: "20%" }}>Notes</th>
    </tr>
  </thead>

  <tbody>
    {course.lessons?.map((lesson) => {
      const userNotes = userId
        ? JSON.parse(localStorage.getItem("lessonNotes"))?.[userId]?.[course._id]?.[lesson.lessonId] || []
        : [];

      return (
        <tr key={lesson.lessonId} style={{ borderBottom: "1px solid #334155", color: "white" }}>
          <td style={{ padding: "12px", textAlign: "left" }}>{lesson.title}</td>

          <td style={{ padding: "12px", textAlign: "center" }}>
            {lesson.duration}
          </td>

          <td style={{ padding: "12px", textAlign: "center" }}>
            <button
              onClick={() => handlePlay(lesson.lessonId)}
              style={{
                background: "#e85d26",
                border: "none",
                padding: "6px 14px",
                borderRadius: "4px",
                color: "white",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Play
            </button>
          </td>

          <td style={{ padding: "12px", textAlign: "center" }}>
            {userNotes.length > 0 ? (
              <button
                onClick={() => handleShowNotes(lesson.lessonId, lesson.title)}
                style={{
                  background: "#475569",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                View Notes ({userNotes.length})
              </button>
            ) : (
              "-"
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
      </div>

      {/* Notes Modal */}
      {showNotes && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => setShowNotes(false)}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "8px",
              width: "400px",
              maxHeight: "80%",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "white", marginBottom: "15px", paddingLeft:'5px', paddingTop:'5px'}}>
              Notes: {currentLessonTitle}
            </h3>

            <ul>
              {currentNotes.map((note, idx) => (
                <li
                  key={idx}
                  style={{ color: "#e2e8f0", marginBottom: "8px"}}
                >
                  [{new Date(note.time * 1000).toISOString().substr(14, 5)}]{" "}
                  {note.text}
                </li>
              ))}
            </ul>

            <button
              style={{
                marginTop: "15px",
                padding: "6px 14px",
                background: "#e85d26",
                border: "none",
                borderRadius: "4px",
                color: "white"
              }}
              onClick={() => setShowNotes(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Courses;