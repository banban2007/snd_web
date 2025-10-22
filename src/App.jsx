// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Register";
import Email from "./pages/Email";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Product from "./pages/Product";
import Delivery from "./pages/Delivery";
import PaymentType from "./pages/Payment_Type";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import Invoice from "./pages/Invoice";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ResetPassword />} />
        <Route path="/email" element={<Email />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/about" element={token ? <About /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/profile/edit/:id" element={token ? <EditProfile /> : <Navigate to="/login" replace />} />
        <Route path="/product" element={token ? <Product /> : <Navigate to="/login" replace />} />
        <Route path="/delivery" element={token ? <Delivery /> : <Navigate to="/login" replace />} />
        <Route path="/payment_type" element={token ? <PaymentType /> : <Navigate to="/login" replace />} />
        <Route path="/payment" element={token ? <Payment /> : <Navigate to="/login" replace />} />
        <Route path="/tracking" element={token ? <Tracking /> : <Navigate to="/login" replace />} />
        <Route path="/invoice" element={token ? <Invoice /> : <Navigate to="/login" replace />} />
        <Route path="/privacy" element={token ? <Privacy /> : <Navigate to="/login" replace />} />

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
