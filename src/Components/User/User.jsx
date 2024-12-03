import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";

const User = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }


        const userId = localStorage.getItem("user_id");
    const response = await axios.get(`http://localhost:8080/admin/${userId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


        console.log("User data:", response.data);
        setUser(response.data); // Adjust based on actual response structure
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <h2 className="header-title">THÔNG TIN TÀI KHOẢN</h2>
      <div className="user-info">
        <div className="user-details">
          <p>
            <strong>Tên tài khoản:</strong> {user.namee}
          </p>
          <p>
            <strong>Email:</strong> {user.email }
          </p>
        </div>
      </div>
    </>
  );
};

export default User;
