import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Play() {

  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getCourse = async () => {

      try {

        const res = await axios.get(`${apiUrl}/api/courses/${courseId}`);

        const courseData = res.data;

        setCourse(courseData);

        const selectedLesson = courseData.lessons?.find(
          (l) => String(l.lessonId) === String(lessonId)
        );

        setLesson(selectedLesson);

      } catch (error) {

        console.log("Error loading lesson:", error);

      } finally {

        setLoading(false);

      }

    };

    getCourse();

  }, [courseId, lessonId]);

  if (loading)
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );

  if (!lesson || !course)
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Lesson not found
      </h2>
    );

  const embedUrl = lesson.video?.includes("watch?v=")
    ? lesson.video.replace("watch?v=", "embed/")
    : lesson.video;

  return (
    <div className="play-container">

      <div className="video-section">

        <h2 className="lesson-title">{lesson.title}</h2>

        <iframe
          width="100%"
          height="500"
          src={embedUrl}
          title={lesson.title}
          allowFullScreen
        ></iframe>

      </div>

      <div className="lesson-list">

        <h3>Lessons</h3>

        <ul>

          {course.lessons?.map((l) => (

            <li
              key={l.lessonId}
              className={
                String(l.lessonId) === String(lessonId)
                  ? "active"
                  : ""
              }
            >

              <Link to={`/play/${courseId}/${l.lessonId}`}>
                {l.title}
              </Link>

            </li>

          ))}

        </ul>

        <button
          className="back-btn"
          onClick={() => navigate(`/course/${courseId}`)}
        >
          Back to Course
        </button>

      </div>

    </div>
  );

}

export default Play;