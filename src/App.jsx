import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Play from './pages/Play'
import Index from './pages/Index'
import { ToastContainer } from 'react-toastify';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Mycourse from './pages/Mycourse'
import PrivateRoute from './components/PrivateRoute'
import Admin from "./pages/Admin";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
function App() {
  return (
    <>
    <ToastContainer  position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "10px",
          padding: "12px"
        }}></ToastContainer>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/course' element={<Home />} />
      <Route path='/course/:id' element={<Courses />}/>
      <Route path="/play/:courseId/:lessonId" element={<Play />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mycourses' element={<PrivateRoute><Mycourse /></PrivateRoute>} />
      <Route path="/admin" element={<Admin/>}/>
<Route path="/addcourse" element={<AddCourse/>}/>
<Route path="/editcourse/:id" element={<EditCourse/>}/>
    </Routes>
    </>
  )
}

export default App
