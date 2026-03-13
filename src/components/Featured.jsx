import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Featured() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/courses`);
        setCourses(res.data);
      } catch (error) {
        console.log("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
        Loading Courses...
      </div>
    );
  }

  return (
    <div className="feature" style={{ backgroundColor: "black", padding: "60px 0" }}>
      {/* Internal responsive CSS */}
      <style>
        {`
          @media (max-width: 1024px) {
            .feature .container {
              gap: 20px;
              justify-content: space-around;
              margin-left: 0;
            }
            .feature .card {
              width: 220px;
            }
          }

          @media (max-width: 768px) {
            .feature .container {
              flex-direction: column;
              align-items: center;
              gap: 15px;
            }
            .feature .card {
              width: 90%;
              max-width: 300px;
            }
          }

          @media (max-width: 480px) {
            .feature-body h1 {
              font-size: 1.8rem;
              text-align: center;
            }
            .feature-body p {
              font-size: 0.9rem;
              text-align: center;
            }
            .feature .card-body h5 {
              font-size: 1rem;
            }
            .feature .card-body p {
              font-size: 0.85rem;
            }
            .feature > a > button {
              width: 80%;
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      <div className="feature-body">
        <h1 style={{ textAlign: "center", color: "white", fontWeight: "600" }}>
          Featured <span style={{ color: "#e85d26" }}>Courses</span>
        </h1>
        <p style={{ textAlign: "center", color: "white" }}>
          Handpicked by our team — the most popular, highest-rated courses
        </p>
        <p style={{ textAlign: "center", color: "white" }}>on the platform.</p>
      </div>

      <div className="container d-flex justify-content-center flex-wrap" style={{ marginTop: "40px", gap: "25px", marginLeft: "90px" }}>
        {courses
          .filter((item) => item.rating >= 4.5)
          .map((item) => (
            <div className="card" key={item._id || item.id} style={{ width: "260px", backgroundColor: "black", color: "white", border: "1px solid #222" }}>
              <img src={item.image} className="card-img-top" alt={item.title} style={{ height: "160px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p style={{ color: "grey", marginBottom: "5px" }}>By : {item.instructor}</p>
                <p style={{ color: "grey" }}>Duration : {item.duration}</p>
                <Link to={`/course/${item._id || item.id}`}>
                  <button className="btn" style={{ backgroundColor: "#e85d26", color: "white", border: "none", fontWeight: "600", width: "100%" }}>
                    Enroll
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/course">
          <button className="btn" style={{ backgroundColor: "black", color: "white", border: "1px solid grey", padding: "10px 25px" }}>
            Explore more Courses
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;