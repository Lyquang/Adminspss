import React, { useEffect, useState } from "react";
import axios from "axios";
import "./nav.css";

function NavNotice() {
  const [numOfRequest0, setNumOfRequest0] = useState(0);

  useEffect(() => {
    // Gọi API để lấy số yêu cầu in ấn
    const fetchNumOfRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
          console.error("Token is missing. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8080/admin/getOverall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lấy `numOfRequest0` từ response và cập nhật state
        setNumOfRequest0(response.data.numOfRequest0 || 0);
      } catch (error) {
        console.error("Error fetching overall data:", error.response?.data || error.message);
      }
    };

    fetchNumOfRequests();
  }, []);

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">{numOfRequest0}</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          Bảng thông báo
          <a href="yeucau">
            <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
          </a>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notifications-item">
          <i className="bi bi-exclamation-circle text-primary"></i>
          <div>
            <h4>Yêu cầu in ấn</h4>
            <p>Bạn có {numOfRequest0} yêu cầu in ấn đang chờ.</p>
          </div>
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
