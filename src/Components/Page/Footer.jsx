import React from "react";
import "./Footer.scss";
// import hcmutLogo from "../images/HCMUT.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <div>Liên lạc qua:</div>
        <div>contact@hcmut.com.edu</div>
        <div>(434) 546-4356</div>
      </div>

      <div className="divider"></div>

      <div className="quick-links">
        <div>About Ho Chi Minh City University of Technology</div>
        <a href="https://hcmut.edu.vn/" className="">HCMUT</a>
      </div>

      <div className="divider"></div>

      <div className="brand-info">
        {/* Uncomment and adjust the logo source when ready */}
        {/* <img className="logo" src={hcmutLogo} alt="HCMUT Logo" /> */}
        {/* <div>© 2020 Lift Media. All rights reserved.</div> */}
        <div>HCMUT SSPS</div>
      </div>
    </footer>
  );
};

export default Footer;
