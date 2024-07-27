import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Components/Login/LoginForm/Form";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/ProfilePage/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
