import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Play() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const apiUrl =  import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(`${apiUrl}/courses/${courseId}`);
        setCourse(res.data);

        const selectedLesson = res.data.lessons.find(
          (l) => l.lessonId === Number(lessonId)
        );
        setLesson(selectedLesson);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [courseId, lessonId]);

  if (!lesson || !course)
    return <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  return (
    <div className="play-container">
      <div className="video-section">
        <h2 className="lesson-title">{lesson.title}</h2>
        <iframe
          width="100%"
          height="500"
          src={lesson.video.replace("watch?v=", "embed/")}
          title={lesson.title}
          allowFullScreen
        ></iframe>
      </div>
      <div className="lesson-list">
        <h3>Lessons</h3>
        <ul>
          {course.lessons.map((l) => (
            <li key={l.lessonId} className={l.lessonId === Number(lessonId) ? "active" : ""}>
              <Link to={`/play/${courseId}/${l.lessonId}`}>{l.title}</Link>
            </li>
          ))}
        </ul>
        <button className="back-btn" onClick={() => navigate(`/course/${courseId}`)}>
         Back to Course
        </button>
      </div>
    </div>
  );
}

export default Play;