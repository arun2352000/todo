import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Header.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  return (
    <nav>
      <div>
        <h1>Todo List</h1>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/signin")}>Sign In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;