import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// ICONS
import { FaBook, FaBrain, FaLaptopCode, FaBolt } from "react-icons/fa";

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // --- Loader states ---
  const [showLoader, setShowLoader] = useState(true); // true initially to show loader on page load
  const [progress, setProgress] = useState(0);
  const [loaderTextIndex, setLoaderTextIndex] = useState(0);

  const loaderSteps = [
    { text: "Preparing courses..." },
    { text: "Loading your skills..." },
    { text: "Stacking knowledge..." },
    { text: "Almost ready!" },
  ];

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        // Simulate loader animation for 1.5 sec even if API is fast
        setProgress(0);
        setLoaderTextIndex(0);
        const interval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 5;
            if (next >= 100) clearInterval(interval);
            return next;
          });
          setLoaderTextIndex((prev) => (prev + 1) % loaderSteps.length);
        }, 75);

        setTimeout(() => {
          setShowLoader(false);
        }, 1500);
      }
    };
    getCourses();
  }, []);

  const filteredByCategory =
    filterCourse === "All"
      ? courses
      : courses.filter((item) => item.category === filterCourse);

  const filteredBySearch = filteredByCategory.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.instructor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Handle enroll with loader ---
  const handleEnroll = (courseId) => {
    setShowLoader(true);
    setProgress(0);
    setLoaderTextIndex(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) clearInterval(interval);
        return next;
      });
      setLoaderTextIndex((prev) => (prev + 1) % loaderSteps.length);
    }, 75);

    // Simulate short load before navigating
    setTimeout(() => {
      setShowLoader(false);
      navigate(`/course/${courseId}`);
    }, 1000);
  };

  // --- Loader JSX ---
  if (showLoader) {
    const step = loaderSteps[loaderTextIndex];
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* ICONS ROW */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "40px",
            marginBottom: "30px",
            color: "#e85d26",
          }}
        >
          <FaBook className="loader-icon" />
          <FaBrain className="loader-icon" />
          <FaLaptopCode className="loader-icon" />
          <FaBolt className="loader-icon" />
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "40%",
            height: "15px",
            border: "2px solid white",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "white",
              borderRadius: "10px",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* TEXT BELOW */}
        <h2 style={{ fontSize: "22px", textAlign: "center" }}>{step.text}</h2>

        {/* ICONS DANCE ANIMATION */}
        <style>
          {`
            .loader-icon {
              display: inline-block;
              animation: dance 0.6s ease-in-out infinite alternate;
            }
            .loader-icon:nth-child(2) { animation-delay: 0.1s; }
            .loader-icon:nth-child(3) { animation-delay: 0.2s; }
            .loader-icon:nth-child(4) { animation-delay: 0.3s; }

            @keyframes dance {
              0% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(10deg); }
              100% { transform: translateY(0) rotate(-10deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // --- Main content ---
  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingLeft: "20px",
        }}
      >
        {/* SEARCH BAR CENTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
            marginTop: "-40px",
          }}
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "400px",
              padding: "10px",
              border: "1px solid #e85d26",
              borderRadius: "6px 0 0 6px",
              backgroundColor: "#111",
              color: "white",
              outline: "none",
            }}
          />

          <button
            style={{
              backgroundColor: "#e85d26",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "0 6px 6px 0",
              cursor: "pointer",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                color: "white",
                fontWeight: "600",
                backgroundColor: "#e85d26",
              }}
            ></i>
          </button>
        </div>

        <div className="offcanvas-body" style={{ marginLeft: "10%" }}>
          <h1 style={{ fontWeight: "600" }}>
            All <span style={{ color: "#e85d26" }}>Courses</span>
          </h1>
          <p>
            Browse our full library of expert-led courses. Filter by category to
            find exactly what you need.
          </p>

          {/* Category Filter */}
          <div className="filter-container" style={{ marginLeft: "-20px" }}>
            <div className="filter-dropdown">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                {[
                  "All",
                  "Frontend",
                  "Backend",
                  "Database",
                  "Fullstack",
                  "Programming",
                  "AI",
                  "DevOps",
                  "Mobile",
                  "System Design",
                  "Security",
                  "Design",
                  "Testing",
                  "Career",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h2
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Showing:{" "}
          <span style={{ color: "#e85d26" }}>{filteredBySearch.length}</span>{" "}
          Courses
        </h2>

        <div className="container d-flex flex-wrap gap-4 justify-content-center mt-4">
          {filteredBySearch.length > 0 ? (
            filteredBySearch.map((item) => (
              <div
                className="card"
                key={item._id}
                style={{
                  width: "18rem",
                  backgroundColor: "#111",
                  color: "white",
                  border: "1px solid #333",
                }}
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">By: {item.instructor}</p>
                  <p className="card-text">Duration: {item.duration}</p>

                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#e85d26",
                      color: "white",
                      fontWeight: "600",
                      border: "none",
                      width: "100%",
                    }}
                    onClick={() => handleEnroll(item._id)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                color: "white",
                textAlign: "center",
                width: "100%",
                marginTop: "20px",
              }}
            >
              No courses found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;