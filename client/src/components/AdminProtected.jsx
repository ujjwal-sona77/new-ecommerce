import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const getEmailFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  const email_Token = getEmailFromToken();
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/user/getUser/${email_Token}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner component
  }

  if (user.admin) {
    return <Outlet />; //
  } else {
    alert("Something went wrong. Please try again");
    return <Navigate to="/home" />;
  }
};

export default AdminAuth;
