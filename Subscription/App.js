import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Heading from "./Components/Heading";
import Button from "./Components/Button";
import ArticleList from "./Components/ArticleList";
import TutorialList from "./Components/TutorialList";
import Footer from "./Components/Footer";
import Email from "./Components/email";

import Login from "./Components/auth/components/Login/Login";
import Signup from "./Components/auth/components/Signup/Signup";
import { auth } from "./Components/auth/components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import NewPost from "./Components/NewPost/NewPost";
import Plans from "./Components/Plans.jsx"; // ✅ Correct path for Plans component

function HomePage() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user ? user.displayName || user.email : "");
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="Container">
      <Navbar />
      <Banner />

      <div className="home-auth">
        {userName ? (
          <>
            <p>Welcome, {userName}!</p>
            <button onClick={handleLogout}>Signout</button>
            <button onClick={() => navigate("/new-post")}>Create New Post</button>
            <button onClick={() => navigate("/plans")}>View Plans</button> {/* ✅ Navigate to Plans */}
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>

      <div className="heading">
        <Heading title="Featured Articles" />
      </div>
      <ArticleList />
      <div className="button">
        <Button name="See all articles" />
      </div>

      <div className="heading2">
        <Heading title="Featured Tutorials" />
      </div>
      <TutorialList />
      <div className="button2">
        <Button name="See all tutorials" />
      </div>

      <div className="email">
        <Email />
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/plans" element={<Plans />} /> {/* ✅ Plans Route */}
    </Routes>
  );
}

export default App;
