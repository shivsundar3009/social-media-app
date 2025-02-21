import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate , useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode } from "jwt-decode";
import { LoginPage, Sidebar, Footer, SignupPage, Homescreen, Settings , NotFound , CreatePost, UserProfile, MessagingScreen } from "./components";
import { ToastContainer , toast} from "react-toastify";
import { useSelector , useDispatch} from "react-redux";
import { logout , fetchUser } from "./redux/features/userSlice";
import axios from "axios";
import { date } from "zod";


// Protected Route Component
const ProtectedRoute = ({ children, loggedInUser }) => {

  console.log('logged in user 1', loggedInUser);

  // console.log("inside protected route");
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  console.log('token from protectec ROUTe 2: ', token);
    // console.log("current time1: ", Date.now());

  // If user is not logged in (Redux state check)
  if (!loggedInUser) {

    // console.log("noLoggedInuser Inside protected route");
    // toast.error("You must be logged in!");
    // toast.error("You must be logged in!");
    return <Navigate to="/" replace />;
  }

  // If token is missing, force logout
  // if (!token) {

  //   console.log("no token Inside protected route 3");
  //   toast.error("No Token! Please log in again.");
  //   dispatch(logout()); // Reset Redux state
  //   return <Navigate to="/" replace />;
  // }

  // Check if token is expired
  // try {
  //   const decodedToken = jwtDecode(token);
  //   const currentTime = Date.now() / 1000; // Convert to seconds

  //   console.log('decoded token 4: ', decodedToken);
  //   // console.log("current time2: ", currentTime);

  //   // console.log("token expired or NOT" , decodedToken.exp < currentTime);

  //   if (decodedToken.exp < currentTime) {
  //     console.log('tokenExpired INSIDE protected routen 5');
  //     toast.error("Session expired! Please log in again.");
  //     Cookies.remove("token"); // Remove expired token
  //     dispatch(logout()); // Reset Redux state
  //     return <Navigate to="/" replace />;
  //   }
  // } catch (error) {
  //   console.log("error in jwtDecode inside protected route 6", error);
  //   toast.error("Invalid session! Please log in again.");
  //   Cookies.remove("token");
  //   dispatch(logout());
  //   return <Navigate to="/" replace />;
  // }

  return children;
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
  const dispatch = useDispatch();


  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/signup") {
      dispatch(fetchUser());
    }
  }, [dispatch, location.pathname]);

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
        <Route path="messagingScreen" element={<ProtectedRoute loggedInUser={loggedInUser}><MessagingScreen /></ProtectedRoute>} />
        <Route path="userProfile/:userId" element={<ProtectedRoute loggedInUser={loggedInUser}><UserProfile /></ProtectedRoute>} />


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
