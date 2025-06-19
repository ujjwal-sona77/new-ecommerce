import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const n = useNavigate();
  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      n("/home");
    } else {
      n("/login");
    }
  }, []);
  return (
    <>
      <h1>App</h1>
    </>
  );
};

export default App;
