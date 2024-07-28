import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { GridLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Login from "./Pages/LoginPage/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/ProfilePage/Profile";
import CreateProfile from "./Pages/CreateProfile/CreateProfile";
import BusinessPosts from "./Pages/BusinessPosts/BusinessPosts";
import ProtectedRoute from "./Components/Login/LoginForm/ProtectedRoute"; // Make sure to create this component
import { useAuth } from "./Components/Login/AuthContext"; // Custom Auth Context (if you have one)
import JobPosts from "./Pages/JobPosts/JobPosts";
import SignupPage from "./Pages/ProfilePage/SignupPage/SignupPage";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { signOut } = useAuth();
  const { isAuthenticated } = useAuth0();
  const { isAuthenticated: isAuthenticatedCustom } = useAuth(); // If using custom auth context
  localStorage.removeItem("isAuthenticated");

  return (
    <Link
      to="/"
      className="absolute bottom-0 left-4 w-3/4 px-4 py-3 text-center bg-red-600 text-white font-bold text-sm rounded-lg mb-4"
      onClick={() => {
        if (isAuthenticated) {
          logout({ returnTo: window.location.origin });
        } else {
          signOut();
        }
      }}
    >
      Logout
    </Link>
  );
};

export function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAuthenticated: isAuthenticatedCustom, user } = useAuth(); // If using custom auth context
  const [color, setColor] = useState("#224d8f");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color={color} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <div
          className={`bg-gray-100 text-white w-1/4 flex flex-col pl-4 max-w-64 relative ${
            !isAuthenticated && !isAuthenticatedCustom && "hidden"
          }`}
        >
          <div className="px-6 py-3 text-xl font-bold text-black mt-10 mb-10">
            {activeMenuItem}
          </div>
          <Link
            to="/dashboard"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Dashboard"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Profile"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Profile")}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>

          {user?.user_type === "business_owner" && (
            <Link
              to="/businessposts"
              className={`flex items-center justify-start px-4 py-3 ${
                activeMenuItem === "BusinessPosts"
                  ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                  : "text-gray-700 font-bold text-sm"
              }`}
              onClick={() => handleMenuItemClick("BusinessPosts")}
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Business Posts
            </Link>
          )}

          {user?.user_type === "job_seeker" && (
            <Link
              to="/jobposts"
              className={`flex items-center justify-start px-4 py-3 ${
                activeMenuItem === "JobPosts"
                  ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                  : "text-gray-700 font-bold text-sm"
              }`}
              onClick={() => handleMenuItemClick("JobPosts")}
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Job Posts
            </Link>
          )}

          <LogoutButton />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated || isAuthenticatedCustom ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/createprofile"
              element={<ProtectedRoute element={<CreateProfile />} />}
            />
            {user?.user_type === "business_owner" && (
              <Route
                path="/businessposts"
                element={<ProtectedRoute element={<BusinessPosts />} />}
              />
            )}
            {user?.user_type === "job_seeker" && (
              <Route
                path="/jobposts"
                element={<ProtectedRoute element={<JobPosts />} />}
              />
            )}
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
