import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (

   <div className="navbar">
    <nav className="nav"   style={{ padding: "10px", background: "#f5f5f5" }}>
      <Link to="/home" style={{ marginRight: "15px" }}>Home</Link>
      {!token ? (<Link to="/">Login</Link>) :
       ( <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/";}}>Logout</button> )}
    </nav>
   </div>
  );
};

export default Navbar;

Samajh gaya 👍 tumhare Loginsignup component ke andar abhi sirf UI hai, koi authentication aur navigation ka logic nahi hai.
Main tumhe step by step samjhata hoon kaise signup + login authentication add karna hai aur login hone ke baad navbar + React Router navigation karna hai.

🔹 Step 1: React Router Setup

Sabse pehle App.js me routes set karo:

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginsignup from "./pages/Loginsignup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Loginsignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

🔹 Step 2: Navbar Component

src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav style={{ padding: "10px", background: "#f5f5f5" }}>
      <Link to="/home" style={{ marginRight: "15px" }}>Home</Link>
      {!token ? (
        <Link to="/">Login</Link>
      ) : (
        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;

🔹 Step 3: Backend API Example (Node + Express + MongoDB)

Tumhara backend pehle se bana hai ya banana hai?
Agar tum MongoDB use kar rahe ho toh backend mai routes kuch aise hone chahiye:

// signup
POST http://localhost:5000/api/auth/signup
body: { name, email, password }

// login
POST http://localhost:5000/api/auth/login
body: { email, password }

// return -> JWT token

🔹 Step 4: LoginSignup Component (with Auth + Navigation)

Ab tumhare existing Loginsignup.js ko modify karte hain:

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginsignup.css";

import person from "../assets/icons8-person-50.png";
import email from "../assets/icons8-email-50.png";
import password from "../assets/icons8-password-50.png";

const Loginsignup = () => {
  const [action, setAction] = useState("SignUp");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let url =
        action === "SignUp"
          ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home"); // navigate to home after login/signup
      } else {
        alert(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={person} alt="" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input">
          <img src={email} alt="" />
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <img src={password} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
      </div>

      {action === "SignUp" ? null : (
        <div className="forgot-password">
          Forgot Password ? <span>Click Here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("SignUp")}
        >
          SignUp
        </div>
        <div
          className={action === "SignUp" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      <button className="submit" onClick={handleSubmit}>
        {action}
      </button>
    </div>
  );
};

export default Loginsignup;

🔹 Step 5: Protected Home Page

src/pages/Home.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // agar token nahi hai to login page pe bhej do
    }
  }, [navigate]);

  return <h1>Welcome to Home Page 🎉</h1>;
};

export default Home;


👉 Ab jab user login/signup karega to JWT token localStorage me store hoga, aur successful login ke baad Home page pe navigate karega + Navbar pe Logout button dikhai dega.

Kya mai tumhe iska backend (Express + MongoDB) bhi pura likh kar du taki frontend ke sath connect ho jaye?