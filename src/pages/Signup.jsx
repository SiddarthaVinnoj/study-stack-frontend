import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const userURL =  import.meta.env.VITE_USER_URL;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {

      const res = await axios.get(`${userURL}/user?email=${email.trim()}`);

      if (res.data.length > 0) {
        toast.error("Email already exists");
        return;
      }

      const result = {
        id: id.trim(),
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phone: phone.trim()
      };
      await axios.post(`${userURL}/user`, result);
      toast.success("Signup successful");
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/login");

    } catch (err) {

      toast.error("Failed: " + err.message);

    }
  };

  return (
    <>
    <Navbar />
    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>

        <div>
          <label>UserName</label>
          <input type="text" placeholder="Enter your username" required value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" placeholder="Enter your phone number" required maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)}  />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
    </>
  );
}

export default Signup;