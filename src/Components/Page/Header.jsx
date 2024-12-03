import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";
import Nav from "./Nav.jsx";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex algin-items-center">
       <Logo /> 
    {/* <SearchBar /> */}
      <Nav />
    </header>
  );
}

export default Header;
