import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate , useLocation } from "react-router-dom";
import { LoginPage, Sidebar, Footer, SignupPage, Homescreen, Settings , NotFound , CreatePost } from "./components";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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
    <div className={` ${loggedInUser ? "flex w-full" : ""}`}>

      {loggedInUser && 
      <div className="w-1/5"> 
        <Sidebar/>
      </div>} {/* Show Sidebar only when logged in */}
      <div className={loggedInUser ? "w-full min-h-screen" : ""}>
        <main>
          <Outlet /> {/* Renders nested routes */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  const loggedInUser = useSelector((state) => state.User.loggedInUser);
  

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
