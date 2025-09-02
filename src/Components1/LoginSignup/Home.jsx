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
