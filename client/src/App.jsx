import React from 'react';
import { BrowserRouter, Routes, Route , Outlet} from 'react-router';
import {LoginPage , Navbar , Footer , SignupPage , Homescreen} from './components';
import {ToastContainer } from 'react-toastify';

// Define a Layout component to wrap Navbar, main content, and Footer
const Layout = () => {
  return (
    <>
      <Navbar /> {/* Always visible */}
      <main>
        <Outlet /> {/* Render content inside here */}
      </main>
      <Footer /> {/* Always visible */}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define Layout and nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} /> {/* Default route inside Layout */}
          <Route path="signup" element={<SignupPage />} />
          <Route path="homescreen" element={<Homescreen />} />
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
