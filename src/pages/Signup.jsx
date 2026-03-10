import React,{useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [username,setUsername] = useState("");
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(phone.length !== 10){
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {

      await axios.post(`${apiUrl}/api/auth/register`,{
        username: username.trim(),
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim(),
        phonenumber: phone.trim()
      });

      toast.success("Signup Successful");

      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/login");

    } catch(err){

      toast.error(err.response?.data?.message || "Signup failed");

    }

  };

  return (
    <>
    <Navbar />

    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>

        <div>
          <label>UserName</label>
          <input
            type="text"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            required
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            required
            maxLength={10}
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
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