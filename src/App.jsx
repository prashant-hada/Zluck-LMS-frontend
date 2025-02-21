// import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login"
import Register from "./pages/Resgister"
import Home from "./pages/Home"
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* Protected Route */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App