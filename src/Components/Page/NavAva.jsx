import React from "react";
import profileImg from "../images/user.png";

function NavAva() {
  return (
    <li className="nav-item dropdown pe-3">
      <a
        href="#"
        className="nav-link nav-profile d-flex align-items-center pe-0"
        data-bs-toggle="dropdown"
        style={{ color: "black" }}
      >
        <img src={profileImg} alt="Profile" className="rounded-circle" />
        <span
          className="d-none d-md-block dropdown-toggle ps-2"
          style={{ color: "black" }}
        >
          Admin
        </span>
      </a>

      <ul
        className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
        style={{ color: "black" }}
      >
        <li className="dropdown-header" style={{ color: "black" }}>
          <h6 style={{ color: "black" }}>Admin</h6>
          <span style={{ color: "black" }}>Wed developer</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        
        <li>
        <a
            href="user"
            className="dropdown-item d-flex align-items-center"
            style={{ color: "black" }}
          >
            <i className="bi bi-person-circle" style={{ color: "black" }}></i>
            <span style={{ color: "black" }}>Thông tin</span>
          </a>
          <a
            href="/"
            className="dropdown-item d-flex align-items-center"
            style={{ color: "black" }}
          >
            <i className="bi bi-box-arrow-right" style={{ color: "black" }}></i>
            <span style={{ color: "black" }}>Đăng xuất</span>
          </a>


        </li>
      </ul>
    </li>
  );
}

export default NavAva;
