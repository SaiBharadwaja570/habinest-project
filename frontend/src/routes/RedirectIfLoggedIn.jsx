// src/routes/RedirectIfLoggedIn.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RedirectIfLoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken"); // or whatever token you use
    if (token) {
      navigate("/profile"); // or dashboard or homepage
    }
  }, [navigate]);

  return children;
};

export default RedirectIfLoggedIn;
