import React from "react";
import "./nav.css";
import NavNotice from "./NavNotice";
import NavAva from "./NavAva";

function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex algin-items-center">
        <NavNotice />
        <NavAva />
      </ul>
    </nav>
  );
}

export default Nav;
