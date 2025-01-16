import React from 'react';
import { BrowserRouter, Routes, Route , Outlet} from 'react-router';
import {LoginPage , Navbar , Footer , SignupPage} from './components';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
