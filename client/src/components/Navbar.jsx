import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/auth", {
            headers: { "x-auth-token": token },
          });
          setUser(res.data);
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TodoApp</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Welcome, {user.username}</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
