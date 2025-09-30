import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./auth/components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="nav">
      {/* Left section */}
      <div className="nav-left">
        <h3>DEV@Deakin 2025</h3>
      </div>

      {/* Center section with search bar, new post button, and plans button */}
      <div className="nav-center">
        <input type="text" id="search-bar" placeholder="Search..." />
        {userName && (
          <>
            <Link to="/new-post">
              <button className="newpost-btn">New Post</button>
            </Link>
            <Link to="/plans">
              <button className="plans-btn">Plans</button>
            </Link>
          </>
        )}
      </div>

      {/* Right section with login/signout */}
      <div className="nav-right">
        {userName ? (
          <button onClick={handleLogout}>Signout</button>
        ) : (
          <Link to="/login">
            <h3>Login</h3>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
