import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        color: "#ccc",
        padding: "60px 10%",
        borderTop: "1px solid #222"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px"
        }}
      >
        {/* Logo Section */}
        <div style={{ maxWidth: "300px" }}>
          <h3
            style={{
              color: "#e85d26",
              fontWeight: "700",
              marginBottom: "10px"
            }}
          >
            StudyStack
          </h3>

          <p style={{ color: "#999", lineHeight: "1.6" }}>
            Learn modern technologies from industry experts.
            Build real-world skills and grow your career
            with high quality courses.
          </p>
        </div>

        {/* Courses */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Courses</h4>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li style={{ cursor: "pointer" }}>Frontend</li>
            <li style={{ cursor: "pointer" }}>Backend</li>
            <li style={{ cursor: "pointer" }}>Fullstack</li>
            <li style={{ cursor: "pointer" }}>AI & ML</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Company</h4>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li style={{ cursor: "pointer" }}>About</li>
            <li style={{ cursor: "pointer" }}>Careers</li>
            <li style={{ cursor: "pointer" }}>Blog</li>
            <li style={{ cursor: "pointer" }}>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Follow Us</h4>

          <div style={{ display: "flex", gap: "20px", fontSize: "22px" }}>
            <i
              className="fa-brands fa-github"
              style={{ cursor: "pointer", transition: "0.3s" }}
            ></i>

            <i
              className="fa-brands fa-linkedin"
              style={{ cursor: "pointer", transition: "0.3s" }}
            ></i>

            <i
              className="fa-brands fa-twitter"
              style={{ cursor: "pointer", transition: "0.3s" }}
            ></i>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop: "1px solid #222",
          marginTop: "40px",
          paddingTop: "20px",
          textAlign: "center",
          color: "#777"
        }}
      >
        © 2026 <span style={{ color: "#e85d26" }}>StudyStack</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;