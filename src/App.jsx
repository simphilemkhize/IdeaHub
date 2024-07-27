import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Components/Login/LoginForm/Form";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/ProfilePage/Profile";
import CreateProfile from "./Pages/CreateProfile/CreateProfile";
import BusinessPosts from "./Pages/BusinessPosts/BusinessPosts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/businessposts" element={<BusinessPosts />} />


          <Route path="/createprofile" element={<CreateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
