import React from "react";
import "./App.css"
// import {Route} from "react-router-dom";
// import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from "./components/Errrorpage";
import Logout from "./components/Logout";
function App(){
  return(
    <>
      <Navbar />
       
      <Routes>
      
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<Errorpage />} />
      
    </Routes>
    
   
      
    </>
  )
}
export default App;