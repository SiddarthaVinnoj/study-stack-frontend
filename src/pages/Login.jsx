import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";


function Login() {
const userURL = import.meta.env.VITE_USER_URL;
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${userURL}/user?email=${email.trim()}`);

      if (res.data.length === 0) {
        toast.error("User not found");
        return;
      }

      const user = res.data[0];

      if (user.password === password.trim()) {
        toast.success("Login Successful");
        localStorage.setItem("user", JSON.stringify(user));
        if (user.email === adminEmail && user.password === adminPassword) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Login Failed: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleLogin}>
          <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
            Login
          </h2>

          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;