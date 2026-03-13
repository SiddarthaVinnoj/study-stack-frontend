import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/auth/register`, {
        username: username.trim(),
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim(),
        phonenumber: phone.trim(),
      });

      toast.success("Signup Successful");

      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="signup-container"
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          paddingTop: "80px",
          marginTop: "-50px",
          padding: "clamp(20px, 5vw, 40px)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="signup-content"
          style={{
            width: "100%",
            maxWidth: "clamp(300px, 90vw, 320px)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "700",
              marginBottom: "clamp(10px, 2vw, 15px)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              color: "white",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#aaa",
              marginBottom: "clamp(25px, 4vw, 40px)",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
              lineHeight: "1.5",
            }}
          >
            Join{" "}
            <span style={{ color: "#e85d26", fontWeight: "600" }}>
              StudyStack
            </span>{" "}
            and start learning today
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(18px, 3vw, 22px)",
            }}
          >
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                padding: "clamp(10px, 2vw, 12px) 0",
                color: "white",
                outline: "none",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                padding: "clamp(10px, 2vw, 12px) 0",
                color: "white",
                outline: "none",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                padding: "clamp(10px, 2vw, 12px) 0",
                color: "white",
                outline: "none",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                padding: "clamp(10px, 2vw, 12px) 0",
                color: "white",
                outline: "none",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />

            {/* Phone */}
            <input
              type="text"
              placeholder="Phone number"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #444",
                padding: "clamp(10px, 2vw, 12px) 0",
                color: "white",
                outline: "none",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                marginTop: "clamp(10px, 2vw, 15px)",
                padding: "clamp(12px, 2.5vw, 14px)",
                background: "#e85d26",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "clamp(0.95rem, 2.5vw, 1rem)",
                transition: "all 0.3s ease",
                width: "100%",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ff7038";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#e85d26";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p
              style={{
                textAlign: "center",
                color: "#aaa",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                marginTop: "clamp(15px, 3vw, 20px)",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#e85d26",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#ff7038")}
                onMouseOut={(e) => (e.target.style.color = "#e85d26")}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;