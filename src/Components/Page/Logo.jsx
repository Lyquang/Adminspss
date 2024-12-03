import React from 'react'
import './Logo.css'
import HCMUT from '../images/HCMUT.png'

function Logo() {
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    }

  return (
    <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
        <img src={HCMUT} alt="Logo" />
        <span className="d-none d-lg-block">HCMUT SSPS</span>
        </a>
        {/* <i class="bi bi-layout-text-sidebar-reverse toggle-sidebar-btn"
        onClick={handleToggleSidebar}
        ></i> */}
    </div>
  )
}

export default Logo