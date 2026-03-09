import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function EditCourse() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ lessons: [] });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${apiUrl}/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        toast.error("Failed to fetch course");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, e) => {
    const newLessons = [...course.lessons];
    newLessons[index][e.target.name] = e.target.value;
    setCourse({ ...course, lessons: newLessons });
  };

  const addLesson = () => {
    setCourse({
      ...course,
      lessons: [
        ...course.lessons,
        { lessonId: Date.now(), title: "", duration: "", video: "" },
      ],
    });
  };

  const removeLesson = (index) => {
    const newLessons = [...course.lessons];
    newLessons.splice(index, 1);
    setCourse({ ...course, lessons: newLessons });
  };

  const updateCourse = async () => {
    if (!course.title || !course.instructor || !course.category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.put(`${apiUrl}/courses/${id}`, course);
      toast.success("Course updated successfully");
      navigate("/admin");
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="editcourse-container">
        <div className="editcourse-card">
          <div className="course-info">
            <h3>Edit Course</h3>
            <input className="input-field" name="title" placeholder="Title" value={course.title || ""} onChange={handleChange} />
            <input className="input-field" name="instructor" placeholder="Instructor" value={course.instructor || ""} onChange={handleChange} />
            <input className="input-field" name="duration" placeholder="Duration" value={course.duration || ""} onChange={handleChange} />
            <input className="input-field" name="rating" placeholder="Rating" value={course.rating || ""} onChange={handleChange} />
            <input className="input-field" name="category" placeholder="Category" value={course.category || ""} onChange={handleChange} />
            <input className="input-field" name="image" placeholder="Image URL" value={course.image || ""} onChange={handleChange} />
            <textarea className="textarea-field" name="description" placeholder="Description" value={course.description || ""} onChange={handleChange}/>
          </div>
          <div className="lesson-section">
            <h3>Lessons</h3>
            {course.lessons.map((lesson, index) => (
              <div className="lesson-card" key={lesson.lessonId}>
                <input className="input-field" name="title" placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, e)} />
                <input className="input-field" name="duration" placeholder="Duration" value={lesson.duration} onChange={(e) => handleLessonChange(index, e)}/>
                <input className="input-field" name="video" placeholder="Video URL" value={lesson.video} onChange={(e) => handleLessonChange(index, e)} />
                <button type="button" className="btn remove-btn" onClick={() => removeLesson(index)}> Remove</button>
              </div>
            ))}

            <button type="button" className="btn add-lesson-btn" onClick={addLesson} > Add Lesson</button>
            <button type="button" className="btn submit-btn" onClick={updateCourse}> Update Course</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .editcourse-container {
          display: flex;
          justify-content: center;
          padding: 40px;
          background-color: #111;
        }
        .editcourse-card {
          display: flex;
          gap: 40px;
          background-color: #1c1c1c;
          padding: 30px;
          border-radius: 12px;
          width: 100%;
          max-width: 1200px;
          flex-wrap: wrap;
        }
        .course-info,
        .lesson-section {
          flex: 1;
          min-width: 300px;
        }
        h3 {
          color: #e85d26;
          margin-bottom: 15px;
        }
        .input-field,
        .textarea-field {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #444;
          background-color: #111;
          color: white;
        }
        .textarea-field {
          height: 100px;
          resize: none;
        }
        .lesson-card {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #444;
          border-radius: 8px;
          background-color: #222;
        }
        .lesson-card input {
          margin-bottom: 8px;
        }
        .btn {
          padding: 8px 15px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 10px;
          transition: 0.3s;
        }
        .add-lesson-btn {
          background-color: #4f46e5;
          color: white;
          margin-top: 10px;
        }
        .submit-btn {
          background-color: #e85d26;
          color: white;
          margin-top: 10px;
        }
        .remove-btn {
          background-color: #ff4d4f;
          color: white;
        }
        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}

export default EditCourse;