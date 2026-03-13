import React from "react";
import { Link } from "react-router-dom";

function Level() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg,#000,#0d0d0d)",
        padding: "40px 20px 100px 20px", // reduced top padding
        textAlign: "center",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "#e85d26",
          filter: "blur(200px)",
          opacity: "0.15",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "700" }}>
          Ready to <span style={{ color: "#e85d26" }}>level up</span>
        </h1>

        <h1 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "15px" }}>
          your career?
        </h1>

        <p style={{ color: "#bbb" }}>
          Join <span style={{ color: "#e85d26" }}>12,000+</span> developers learning with StudyStack.
        </p>

        <p style={{ color: "#bbb", marginBottom: "25px" }}>
          Start today — free for your first course.
        </p>

        <Link to="/login">
          <button
            style={{
              padding: "12px 30px",
              backgroundColor: "#e85d26",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
              marginBottom:"15px"
            }}
          >
            Get Started Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Level;