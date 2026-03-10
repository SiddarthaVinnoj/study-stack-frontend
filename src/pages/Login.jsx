import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Login() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${apiUrl}/api/auth/login`,{
        email: email.trim(),
        password: password.trim()
      });

      const { token, user } = res.data;

      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(user));

      toast.success("Login Successful");

      if(user.email === adminEmail){
        navigate("/admin");
      }else{
        navigate("/");
      }

    } catch (err) {

      toast.error(err.response?.data?.message || "Login failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-container">

        <form className="signup-form" onSubmit={handleLogin}>

          <h2 style={{color:"white",textAlign:"center",marginBottom:"20px"}}>
            Login
          </h2>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
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