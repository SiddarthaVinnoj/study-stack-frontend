import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddCourse() {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState({
    title: "",
    instructor: "",
    duration: "",
    rating: "",
    category: "",
    description: "",
    image: "",
    video: "",
    lessons: []
  });

  // handle course fields
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // handle lesson fields
  const handleLessonChange = (index, e) => {
    const newLessons = [...course.lessons];
    newLessons[index][e.target.name] = e.target.value;
    setCourse({ ...course, lessons: newLessons });
  };

  // add lesson
  const addLesson = () => {
    setCourse({
      ...course,
      lessons: [
        ...course.lessons,
        {
          lessonId: Date.now(),
          title: "",
          duration: "",
          video: ""
        }
      ]
    });
  };

  // remove lesson
  const removeLesson = (index) => {
    const newLessons = [...course.lessons];
    newLessons.splice(index, 1);
    setCourse({ ...course, lessons: newLessons });
  };

  // validation
  const validateCourse = () => {

    if (
      !course.title.trim() ||
      !course.instructor.trim() ||
      !course.duration.trim() ||
      !course.category.trim() ||
      !course.description.trim()
    ) {
      toast.error("Please fill all course fields");
      return false;
    }

    const rating = parseFloat(course.rating);

    if (isNaN(rating) || rating < 0 || rating > 5) {
      toast.error("Rating must be between 0 and 5");
      return false;
    }

    if (!/^https?:\/\/.+/.test(course.image)) {
      toast.error("Invalid Image URL");
      return false;
    }

    if (course.video && !/^https?:\/\/.+/.test(course.video)) {
      toast.error("Invalid Course Video URL");
      return false;
    }

    for (let i = 0; i < course.lessons.length; i++) {

      const lesson = course.lessons[i];

      if (!lesson.title.trim() || !lesson.duration.trim() || !lesson.video.trim()) {
        toast.error(`Please fill Lesson ${i + 1}`);
        return false;
      }

      if (!/^https?:\/\/.+/.test(lesson.video)) {
        toast.error(`Invalid video URL for Lesson ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  // submit course
  const submitCourse = async () => {

    if (!validateCourse()) return;

    try {

      await axios.post(
        `${apiUrl}/api/courses`,
        {
          ...course,
          rating: Number(course.rating)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Course added successfully");

      navigate("/admin");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Error adding course"
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="addcourse-container">
        <div className="addcourse-card">

          {/* Course Info */}
          <div className="course-info">

            <h3>Add Course</h3>

            <input
              className="input-field"
              name="title"
              placeholder="Title"
              value={course.title}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="instructor"
              placeholder="Instructor"
              value={course.instructor}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="duration"
              placeholder="Duration"
              value={course.duration}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="rating"
              placeholder="Rating (0-5)"
              value={course.rating}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="category"
              placeholder="Category"
              value={course.category}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="image"
              placeholder="Image URL"
              value={course.image}
              onChange={handleChange}
            />

            <input
              className="input-field"
              name="video"
              placeholder="Course Preview Video URL"
              value={course.video}
              onChange={handleChange}
            />

            <textarea
              className="textarea-field"
              name="description"
              placeholder="Description"
              value={course.description}
              onChange={handleChange}
            />

          </div>

          {/* Lessons Section */}
          <div className="lesson-section">

            <h3>Lessons</h3>

            {course.lessons.map((lesson, index) => (

              <div className="lesson-card" key={lesson.lessonId}>

                <input
                  className="input-field"
                  name="title"
                  placeholder="Lesson Title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(index, e)}
                />

                <input
                  className="input-field"
                  name="duration"
                  placeholder="Duration"
                  value={lesson.duration}
                  onChange={(e) => handleLessonChange(index, e)}
                />

                <input
                  className="input-field"
                  name="video"
                  placeholder="Video URL"
                  value={lesson.video}
                  onChange={(e) => handleLessonChange(index, e)}
                />

                <button
                  type="button"
                  className="btn remove-btn"
                  onClick={() => removeLesson(index)}
                >
                  Remove
                </button>

              </div>
            ))}

            <button
              type="button"
              className="btn add-lesson-btn"
              onClick={addLesson}
            >
              Add Lesson
            </button>

            <button
              type="button"
              className="btn submit-btn"
              onClick={submitCourse}
            >
              Submit Course
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

export default AddCourse;