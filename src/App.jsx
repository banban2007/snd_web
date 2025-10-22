// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />

        <Route path="/register" element={<Register />} />
        <Route path="/email" element={<Email />} />
        <Route path="/forgot" element={<ResetPassword />} />

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/product" element={<Product />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment_type" element={<PaymentType />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Header />
    </Router>
  );
};

export default App;
