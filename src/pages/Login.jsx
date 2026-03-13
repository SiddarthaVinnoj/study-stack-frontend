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

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          paddingTop: "80px",
          marginTop:'-90px'
        }}
      >

        <h1 style={{fontWeight:"700",marginBottom:"10px"}}>
          Welcome back
        </h1>

        <p style={{color:"#aaa",marginBottom:"40px"}}>
          Login to continue learning on <span style={{color:"#e85d26"}}>StudyStack</span>
        </p>


        <form
          onSubmit={handleLogin}
          style={{
            width:"320px",
            display:"flex",
            flexDirection:"column",
            gap:"25px"
          }}
        >

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              background:"transparent",
              border:"none",
              borderBottom:"1px solid #444",
              padding:"10px 0",
              color:"white",
              outline:"none",
              fontSize:"15px"
            }}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              background:"transparent",
              border:"none",
              borderBottom:"1px solid #444",
              padding:"10px 0",
              color:"white",
              outline:"none",
              fontSize:"15px"
            }}
          />

          {/* Button */}
          <button
            type="submit"
            style={{
              marginTop:"10px",
              padding:"12px",
              background:"#e85d26",
              border:"none",
              borderRadius:"6px",
              color:"white",
              fontWeight:"600",
              cursor:"pointer",
              transition:"0.3s"
            }}
          >
            Login
          </button>

          <p style={{textAlign:"center",color:"#aaa"}}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color:"#e85d26",
                textDecoration:"none",
                fontWeight:"600"
              }}
            >
              Signup
            </Link>
          </p>

        </form>

      </div>
    </>
  );
}

export default Login;