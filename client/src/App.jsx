import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate , useLocation } from "react-router-dom";
import { LoginPage, Sidebar, Footer, SignupPage, Homescreen, Settings , NotFound , CreatePost } from "./components";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

// Protected Route Component
const ProtectedRoute = ({ children, loggedInUser }) => {
  return loggedInUser ? children : <Navigate to="/" />;
};

// Layout Component
const Layout = ({ loggedInUser }) => {

  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    if (loggedInUser && (location.pathname === "/" || location.pathname === "/signup")) {
      navigate("/homescreen"); // Redirect only from login or signup
    }
  }, [loggedInUser, location.pathname, navigate]); 

  return (
    <div className={` ${loggedInUser ? "flex flex-col md:flex-row md:flex w-full " : ""}`}>

      {loggedInUser && 
      <div className="md:w-1/12 xl:w-1/6"> 
        <Sidebar />
      </div>} {/* Show Sidebar only when logged in */}
      <div className={loggedInUser ? "w-full min-h-screen md:w-11/12 xl:w-5/6" : ""}>
        <main>
          <Outlet /> {/* Renders nested routes */}
        </main>
        <Footer className=""/>
      </div>
    </div>
  );
};

function App() {
  const loggedInUser = useSelector((state) => state.User.loggedInUser);

  useEffect(() => {
    const checkHeartbeat = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/heartbeat`);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error checking heartbeat:', error);
      }
    };

    const interval = setInterval(checkHeartbeat, 2 * 60 * 1000); // 2 minutes
    return () => clearInterval(interval);
  }, []);
  

  return (
    <Routes>

      {/* Layout wraps all routes */}
      <Route path="/" element={<Layout loggedInUser={loggedInUser} />}>
        <Route index element={<LoginPage />} /> {/* Default route */}
        <Route path="signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="homescreen" element={<ProtectedRoute loggedInUser={loggedInUser}><Homescreen /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute loggedInUser={loggedInUser}><Settings /></ProtectedRoute>} />
        <Route path="createPost" element={<ProtectedRoute loggedInUser={loggedInUser}><CreatePost /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  );
}
